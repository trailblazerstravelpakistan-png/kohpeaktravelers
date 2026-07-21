import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
// Supports both the new publishable key (sb_publishable_...) and the legacy anon key.
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

const TABLE = "koh_peaks_enquiries";

export type EnquiryStatus = "new" | "in_progress" | "resolved" | "archived";

export type Enquiry = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  destination: string | null;
  travel_month: string | null;
  travelers: string | null;
  reference: string | null;
  message: string | null;
  payment_proof?: string | null;
  payment_proof_name?: string | null;
  status: EnquiryStatus;
  source: string;
  created_at: string;
};

export type EnquiryInput = {
  name: string;
  phone?: string;
  email?: string;
  destination?: string;
  month?: string;
  travelers?: string;
  reference?: string;
  message?: string;
  payment_proof?: string;
  payment_proof_name?: string;
};

let cachedClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "Missing Supabase config. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local."
    );
  }
  if (!cachedClient) {
    cachedClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storageKey: "kohpeaks-admin-auth",
      },
    });
  }
  return cachedClient;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

function normalizeStatus(value: string): EnquiryStatus {
  return String(value || "").toLowerCase().replace(/\s+/g, "_") as EnquiryStatus;
}

// ------------------------------------------------------------
// PUBLIC — website contact form
// ------------------------------------------------------------
export async function submitEnquiry(payload: EnquiryInput): Promise<{ ok: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    // Site works before Supabase is wired; log for the developer.
    console.warn("Supabase not configured — enquiry was not saved.");
    return { ok: true };
  }
  if (!payload.name) {
    return { ok: false, error: "Name is required." };
  }

  try {
    const supabase = getSupabase();
    
    // Attempt insert with payment_proof fields
    const insertObj: Record<string, unknown> = {
      name: payload.name,
      phone: payload.phone || null,
      email: payload.email || null,
      destination: payload.destination || null,
      travel_month: payload.month || null,
      travelers: payload.travelers || null,
      reference: payload.reference || null,
      message: payload.message || null,
      payment_proof: payload.payment_proof || null,
      payment_proof_name: payload.payment_proof_name || null,
      status: "new",
      source: "website",
    };

    let { error } = await supabase.from(TABLE).insert(insertObj);

    if (error && (error.message?.includes("payment_proof") || error.code === "PGRST204")) {
      // If payment_proof column doesn't exist in Supabase DB, fallback to embedding in message
      delete insertObj.payment_proof;
      delete insertObj.payment_proof_name;
      if (payload.payment_proof) {
        insertObj.message = `${payload.message || ""}\n\n--- PAYMENT PROOF ATTACHED ---\nFile: ${payload.payment_proof_name || "Payment_Proof"}\n${payload.payment_proof}`.trim();
      }
      const retry = await supabase.from(TABLE).insert(insertObj);
      error = retry.error;
    }

    if (error) {
      console.error("koh_peaks_enquiries insert:", error.message);
      return { ok: false, error: "Could not save your enquiry. Please call us." };
    }
    return { ok: true };
  } catch (err) {
    console.error(err);
    return { ok: false, error: "Network error. Please try again." };
  }
}

// ------------------------------------------------------------
// ADMIN — auth
// ------------------------------------------------------------
export async function adminSignIn(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabase();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    const msg = error.message || "";
    if (/email not confirmed/i.test(msg)) {
      return { ok: false, error: "User exists but email is not confirmed. In Supabase → Authentication → Users, confirm the user (or recreate with Auto Confirm on)." };
    }
    if (/invalid login credentials/i.test(msg)) {
      return { ok: false, error: "Invalid credentials — this user may not exist yet. Create it in Supabase → Authentication → Users → Add user." };
    }
    return { ok: false, error: msg };
  }
  return { ok: true };
}

export async function adminSignOut(): Promise<void> {
  const supabase = getSupabase();
  await supabase.auth.signOut();
}

export async function getAdminSession() {
  const supabase = getSupabase();
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// ------------------------------------------------------------
// ADMIN — data
// ------------------------------------------------------------
export async function fetchEnquiries(): Promise<Enquiry[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) throw new Error("Could not load enquiries.");
  return (data as Enquiry[]) || [];
}

export async function adminUpdateStatus(id: string, status: string): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase.from(TABLE).update({ status: normalizeStatus(status) }).eq("id", id);
  if (error) throw new Error("Could not update status.");
}

export async function adminDeleteEnquiry(id: string): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw new Error("Could not delete enquiry.");
}
