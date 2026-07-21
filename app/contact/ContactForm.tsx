"use client";

import { useState } from "react";
import { submitEnquiry } from "../../lib/supabase";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
  });
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);

  function handleCopyAccount() {
    navigator.clipboard.writeText("3353499000006743");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files[0]) {
      setProofFile(files[0]);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setErrorMsg("");

    let paymentProofBase64 = "";
    let paymentProofName = "";
    if (proofFile) {
      try {
        paymentProofBase64 = await fileToBase64(proofFile);
        paymentProofName = proofFile.name;
      } catch (e) {
        console.error("Error reading file:", e);
      }
    }

    const result = await submitEnquiry({
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      destination: String(data.get("destination") || ""),
      month: String(data.get("month") || ""),
      travelers: String(data.get("travelers") || ""),
      reference: String(data.get("reference") || ""),
      message: String(data.get("message") || ""),
      payment_proof: paymentProofBase64,
      payment_proof_name: paymentProofName,
    });

    if (result.ok) {
      setStatus("sent");
      setProofFile(null);
      form.reset();
    } else {
      setStatus("error");
      setErrorMsg(result.error || "Something went wrong.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {/* Official Bank Account Details Banner */}
      <div className="bank-details-card">
        <div className="bank-details-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Bank Account Details for Payment
        </div>
        <div className="bank-details-grid">
          <div className="bank-field">
            <small>Bank Name</small>
            <strong>FAYSAL BANK</strong>
          </div>
          <div className="bank-field">
            <small>Account Title</small>
            <strong>KOH PEAKS TOURS & TRAILS</strong>
          </div>
        </div>
        <div className="bank-account-num">
          <div>
            <small style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: 10, textTransform: "uppercase" }}>Account Number</small>
            <code>3353499000006743</code>
          </div>
          <button type="button" className="copy-btn" onClick={handleCopyAccount}>
            {copied ? "Copied!" : "Copy Number"}
          </button>
        </div>
      </div>

      <div className="field-row">
        <label>
          Full Name
          <input name="name" required placeholder="Your name" />
        </label>
        <label>
          Phone / WhatsApp
          <input name="phone" required placeholder="03XX XXXXXXX" />
        </label>
      </div>

      <div className="field-row">
        <label>
          Email Address
          <input name="email" type="email" required placeholder="you@example.com" />
        </label>
        <label>
          Preferred Destination
          <select name="destination" defaultValue="">
            <option value="" disabled>Select a destination</option>
            <option>Swat, Kalam & Malam Jabba</option>
            <option>Hunza & Khunjerab Pass</option>
            <option>Mushkpuri Top</option>
            <option>Kumrat & Jahaz Banda</option>
            <option>Custom journey</option>
          </select>
        </label>
      </div>

      <div className="field-row">
        <label>
          Travel Month
          <input name="month" type="month" />
        </label>
        <label>
          Travelers
          <select name="travelers" defaultValue="2">
            <option value="1">1 Traveler</option>
            <option value="2">2 Travelers</option>
            <option value="4">3–4 Travelers</option>
            <option value="6">5–8 Travelers</option>
            <option value="9">9+ Travelers</option>
          </select>
        </label>
      </div>

      <label>
        Reference <span className="optional-tag">(optional)</span>
        <input name="reference" placeholder="Who referred you, or how you heard about us" />
      </label>

      {/* Payment Proof Attachment Section */}
      <div className="file-upload-box">
        <label style={{ display: "block", marginBottom: 4 }}>
          Attach Payment Proof <span className="optional-tag">(optional / screenshot or receipt)</span>
        </label>
        {!proofFile ? (
          <label className="file-upload-dropzone">
            <input
              type="file"
              accept="image/*,.pdf"
              className="file-upload-input"
              onChange={handleFileChange}
            />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <div className="file-upload-info">
              <strong>Click to upload payment screenshot or receipt</strong>
              <small>Supports PNG, JPG, JPEG, PDF (Max 5MB)</small>
            </div>
          </label>
        ) : (
          <div className="file-selected-badge">
            <span>📎 {proofFile.name} ({(proofFile.size / 1024).toFixed(1)} KB)</span>
            <button type="button" onClick={() => setProofFile(null)}>Remove</button>
          </div>
        )}
      </div>

      <label>
        Tell Us About Your Trip
        <textarea name="message" rows={4} required placeholder="Dates, interests, preferred pace or anything else we should know..."></textarea>
      </label>

      <button className="button button-gold" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send Trip Enquiry"}
      </button>

      {status === "sent" && (
        <p className="form-success" role="status">
          Thank you! Your enquiry & payment details have been received. Our team will contact you shortly.
        </p>
      )}
      {status === "error" && (
        <p className="form-error" role="alert">
          {errorMsg} You can also call us at +92 335 4020394.
        </p>
      )}
    </form>
  );
}
