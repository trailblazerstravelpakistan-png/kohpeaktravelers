"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  adminSignIn,
  adminSignOut,
  getAdminSession,
  fetchEnquiries,
  adminUpdateStatus,
  adminDeleteEnquiry,
  isSupabaseConfigured,
  type Enquiry,
  type EnquiryStatus,
} from "../../lib/supabase";
import "./admin.css";

const STATUSES: EnquiryStatus[] = ["new", "in_progress", "resolved", "archived"];
const STATUS_LABEL: Record<EnquiryStatus, string> = {
  new: "New",
  in_progress: "In Progress",
  resolved: "Resolved",
  archived: "Archived",
};

function waHref(phone: string) {
  const digits = phone.replace(/\D/g, "").replace(/^0/, "92");
  return `https://wa.me/${digits}`;
}

export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const configured = isSupabaseConfigured();

  useEffect(() => {
    if (!configured) { setReady(true); return; }
    getAdminSession()
      .then((session) => setAuthed(Boolean(session)))
      .catch(() => setAuthed(false))
      .finally(() => setReady(true));
  }, [configured]);

  if (!ready) return <div className="adm-login-wrap"><div className="adm-loading" style={{ color: "#fff" }}>Loading…</div></div>;

  if (!configured) {
    return (
      <div className="adm-login-wrap">
        <div className="adm-login">
          <div className="adm-login-brand"><img src="/images/logo-light.png" alt="Koh Peaks" /><div><strong>Koh Peaks</strong><small>Admin Panel</small></div></div>
          <p className="adm-login-sub">Supabase is not configured. Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> to <code>.env.local</code>, then reload.</p>
        </div>
      </div>
    );
  }

  return authed ? <Dashboard onSignOut={() => setAuthed(false)} /> : <Login onSignedIn={() => setAuthed(true)} />;
}

function Login({ onSignedIn }: { onSignedIn: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true); setError("");
    const result = await adminSignIn(email, password);
    setBusy(false);
    if (result.ok) onSignedIn();
    else setError(result.error || "Login failed.");
  }

  return (
    <div className="adm-login-wrap">
      <form className="adm-login" onSubmit={submit}>
        <div className="adm-login-brand"><img src="/images/logo-light.png" alt="Koh Peaks" /><div><strong>Koh Peaks</strong><small>Admin Panel</small></div></div>
        <h1>Sign in</h1>
        <p className="adm-login-sub">Enter your credentials to view enquiries.</p>
        <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" /></label>
        <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" /></label>
        {error && <p className="adm-error">{error}</p>}
        <button className="adm-btn adm-btn-gold" type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign In"}</button>
      </form>
    </div>
  );
}

function Dashboard({ onSignOut }: { onSignOut: () => void }) {
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | EnquiryStatus>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    fetchEnquiries()
      .then((data) => { setRows(data); setError(""); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rows.length, new: 0, in_progress: 0, resolved: 0, archived: 0 };
    rows.forEach((r) => { c[r.status] = (c[r.status] || 0) + 1; });
    return c;
  }, [rows]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (!q) return true;
      return [r.name, r.phone, r.email, r.destination, r.message, r.reference]
        .filter(Boolean).some((v) => String(v).toLowerCase().includes(q));
    });
  }, [rows, query, filter]);

  async function changeStatus(id: string, status: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: status as EnquiryStatus } : r)));
    try { await adminUpdateStatus(id, status); } catch { load(); }
  }

  async function remove(id: string) {
    if (!confirm("Delete this enquiry permanently?")) return;
    setRows((prev) => prev.filter((r) => r.id !== id));
    try { await adminDeleteEnquiry(id); } catch { load(); }
  }

  async function signOut() { await adminSignOut(); onSignOut(); }

  return (
    <div className="adm-root">
      <aside className="adm-sidebar">
        <div className="adm-brand"><img src="/images/logo-light.png" alt="Koh Peaks" /><div><strong>Koh Peaks</strong><small>Admin</small></div></div>
        <nav className="adm-nav">
          <div className="adm-nav-label">Enquiries</div>
          <button className={`adm-nav-link ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All<span className="adm-nav-count">{counts.all}</span></button>
          {STATUSES.map((s) => (
            <button key={s} className={`adm-nav-link ${filter === s ? "active" : ""}`} onClick={() => setFilter(s)}>
              {STATUS_LABEL[s]}<span className="adm-nav-count">{counts[s] || 0}</span>
            </button>
          ))}
        </nav>
        <div className="adm-sidebar-footer"><button className="adm-btn adm-btn-ghost" onClick={signOut}>Sign Out</button></div>
      </aside>

      <main className="adm-main">
        <div className="adm-inner">
          <div className="adm-page-header">
            <h1>Enquiries</h1>
            <p>Contact form submissions from the website.</p>
          </div>

          <div className="adm-stats">
            <div className="adm-stat"><strong>{counts.all}</strong><span>Total</span></div>
            <div className="adm-stat gold"><strong>{counts.new || 0}</strong><span>New</span></div>
            <div className="adm-stat"><strong>{counts.resolved || 0}</strong><span>Resolved</span></div>
          </div>

          <div className="adm-card">
            <div className="adm-card-head">
              <h2>{filter === "all" ? "All Enquiries" : STATUS_LABEL[filter]} <span className="muted">({visible.length})</span></h2>
              <div className="adm-toolbar">
                <input className="adm-input" placeholder="Search name, phone, email…" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button className="adm-btn" onClick={load} disabled={loading}>{loading ? "…" : "Refresh"}</button>
              </div>
            </div>

            {error && <p className="adm-error" style={{ margin: 16 }}>{error}</p>}
            {loading ? <div className="adm-loading">Loading enquiries…</div> : (
              visible.length === 0 ? <div className="adm-empty">No enquiries found.</div> : (
                <div className="adm-table-wrap">
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Destination</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visible.map((r) => (
                        <FragmentRow
                          key={r.id}
                          r={r}
                          open={openId === r.id}
                          onToggle={() => setOpenId(openId === r.id ? null : r.id)}
                          onStatus={changeStatus}
                          onRemove={remove}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function FragmentRow({ r, open, onToggle, onStatus, onRemove }: {
  r: Enquiry;
  open: boolean;
  onToggle: () => void;
  onStatus: (id: string, status: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <>
      <tr className="adm-row-main" onClick={onToggle}>
        <td className="adm-name"><strong>{r.name}</strong><small>{new Date(r.created_at).toLocaleString()}</small></td>
        <td data-label="Phone">{r.phone || "—"}</td>
        <td data-label="Destination">{r.destination || "—"}</td>
        <td data-label="Date">{new Date(r.created_at).toLocaleDateString()}</td>
        <td data-label="Status">
          <select className={`adm-status ${r.status}`} value={r.status} onClick={(e) => e.stopPropagation()} onChange={(e) => onStatus(r.id, e.target.value)}>
            {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
          </select>
        </td>
      </tr>
      {open && (
        <tr>
          <td className="adm-detail-cell" colSpan={5}>
            <div className="adm-detail">
              <div className="adm-detail-grid">
                <div><small>Email</small><span>{r.email || "—"}</span></div>
                <div><small>Travel Month</small><span>{r.travel_month || "—"}</span></div>
                <div><small>Travelers</small><span>{r.travelers || "—"}</span></div>
                <div><small>Destination</small><span>{r.destination || "—"}</span></div>
                <div><small>Reference</small><span>{r.reference || "—"}</span></div>
                <div><small>Source</small><span>{r.source}</span></div>
              </div>
              {r.message && <p className="adm-message">{r.message}</p>}
              <div className="adm-detail-actions">
                {r.payment_proof && (
                  <a className="adm-btn adm-btn-gold adm-btn-sm" href={r.payment_proof} target="_blank" rel="noopener">
                    📄 View Payment Proof ({r.payment_proof_name || "File"})
                  </a>
                )}
                {r.phone && <a className="adm-btn adm-btn-gold adm-btn-sm" href={waHref(r.phone)} target="_blank" rel="noopener">WhatsApp</a>}
                {r.email && <a className="adm-btn adm-btn-sm" href={`mailto:${r.email}`}>Email</a>}
                <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => onRemove(r.id)}>Delete</button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
