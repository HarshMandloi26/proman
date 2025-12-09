import { useState } from "react";
import api from "../api/apiClient";

export default function ContactForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      setError("");
      setMessage("");

      await api.post("/contacts", form);

      setMessage("Thanks! We’ll get back to you within 1–2 business days.");
      setForm({ fullName: "", email: "", mobile: "", city: "" });
    } catch (err) {
      console.error("Error submitting contact form", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="space-y-3 text-sm" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-[11px] font-medium text-[#4B5563]">
            Full name
          </label>
          <input
            name="fullName"
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0073E6]/60 focus:border-[#0073E6]"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-[11px] font-medium text-[#4B5563]">
            Work email
          </label>
          <input
            name="email"
            type="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0073E6]/60 focus:border-[#0073E6]"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-[11px] font-medium text-[#4B5563]">
            Mobile number
          </label>
          <input
            name="mobile"
            placeholder="Your phone / WhatsApp"
            value={form.mobile}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0073E6]/60 focus:border-[#0073E6]"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-[11px] font-medium text-[#4B5563]">
            City
          </label>
          <input
            name="city"
            placeholder="Where are you based?"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0073E6]/60 focus:border-[#0073E6]"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center justify-center rounded-full bg-[#0073E6] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#0073E6]/40 hover:shadow-lg hover:shadow-[#0073E6]/60 hover:-translate-y-0.5 active:translate-y-0 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {sending ? "Submitting…" : "Submit inquiry"}
      </button>

      {message && (
        <p className="text-xs text-[#059669] mt-1">{message}</p>
      )}
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </form>
  );
}
