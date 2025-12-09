import { useState } from "react";
import api from "../api/apiClient";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      setMessage("");
      setError("");

      const res = await api.post("/subscribers", { email });

      if (res.data?.message === "Already subscribed") {
        setMessage("You’re already subscribed. Thanks for staying with us!");
      } else {
        setMessage("Subscribed! We’ll send you portfolio management insights soon.");
      }
      setEmail("");
    } catch (err) {
      console.error("Error subscribing", err);
      setError("Could not subscribe. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      className="flex flex-col sm:flex-row gap-2 text-sm"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        placeholder="Enter your work email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setMessage("");
          setError("");
        }}
        className="flex-1 rounded-full border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0073E6]/60 focus:border-[#0073E6]"
      />
      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center justify-center rounded-full bg-[#0073E6] px-4 py-2 text-sm font-medium text-white shadow-md shadow-[#0073E6]/40 hover:shadow-lg hover:shadow-[#0073E6]/60 hover:-translate-y-0.5 active:translate-y-0 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {sending ? "Subscribing…" : "Yes, send me updates"}
      </button>
      {message && (
        <p className="text-[11px] text-[#059669] sm:ml-1">{message}</p>
      )}
      {error && (
        <p className="text-[11px] text-red-600 sm:ml-1">{error}</p>
      )}
    </form>
  );
}
