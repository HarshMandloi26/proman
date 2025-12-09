import { useState } from "react";
import api from "../api/apiClient";

export default function ReviewForm({ onSuccess }) {
  const [form, setForm] = useState({ name: "", rating: 5, description: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setMessage("");
    setError("");
  };

  const handleRatingChange = (value) => {
    setForm((prev) => ({ ...prev, rating: value }));
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      setMessage("");
      setError("");

      const payload = {
        name: form.name,
        description: form.description,
        rating: Number(form.rating),
      };

      const res = await api.post("/clients/public-review", payload);

      setMessage("Thanks! Your review has been added 🎉");
      setForm({ name: "", rating: 5, description: "" });

      if (onSuccess) onSuccess(res.data);
    } catch (err) {
      console.error("Error submitting review", err);
      setError("Could not submit review. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <form
        onSubmit={handleSubmit}
        className="space-y-3 text-sm rounded-2xl border border-[#E2E8F0] bg-[#F9FAFB] px-4 py-4 shadow-sm"
      >
        <div className="space-y-1.5">
          <label className="block text-[11px] font-medium text-[#4B5563]">
            Your name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0073E6]/60 focus:border-[#0073E6]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-medium text-[#4B5563]">
            Rating
          </label>
          <div className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-white px-3 py-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className={`text-lg ${
                    star <= form.rating ? "text-[#FBBF24]" : "text-[#E5E7EB]"
                  } hover:scale-110 transition`}
                >
                  ★
                </button>
              ))}
            </div>
            <span className="text-[11px] text-[#6B7280]">
              {form.rating} / 5
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-medium text-[#4B5563]">
            Your review
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="Share how ProMan helped you manage your projects…"
            required
            className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0073E6]/60 focus:border-[#0073E6]"
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          className="w-full inline-flex items-center justify-center rounded-full bg-[#0073E6] px-4 py-2 text-xs font-medium text-white shadow shadow-[#0073E6]/40 hover:shadow-lg hover:shadow-[#0073E6]/60 hover:-translate-y-0.5 active:translate-y-0 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {sending ? "Submitting…" : "Submit review"}
        </button>

        {message && <p className="text-xs text-[#059669] mt-1">{message}</p>}
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      </form>
    </div>
  );
}
