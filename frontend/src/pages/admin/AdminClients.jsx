import { useEffect, useState } from "react";
import api from "../../api/apiClient";

export default function AdminClients() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    designation: "",
    imageUrl: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadClients = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/clients");
      setClients(res.data || []);
    } catch (err) {
      console.error("Error loading clients", err);
      setError("Failed to load clients.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError("");
      const res = await api.post("/clients", form);
      setClients((prev) => [res.data, ...prev]);
      setForm({ name: "", designation: "", imageUrl: "", description: "" });
    } catch (err) {
      console.error("Error creating client", err);
      setError("Failed to save client.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this client?")) return;
    try {
      await api.delete(`/clients/${id}`);
      setClients((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting client", err);
      alert("Could not delete client.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-[#111827]">
          Manage clients
        </h2>
        <p className="text-xs sm:text-sm text-[#6B7280]">
          These testimonials appear in the “Teams that trust ProMan” section.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-[#F9FAFB] p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-[#111827] mb-3">
          Add new client
        </h3>
        {error && (
          <p className="text-xs text-red-600 mb-2">{error}</p>
        )}
        <form className="space-y-3 text-sm" onSubmit={handleSubmit}>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="block text-[11px] text-[#4B5563] font-medium">
                Client name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Neha Sharma"
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#10B981]/60 focus:border-[#10B981]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] text-[#4B5563] font-medium">
                Role / company
              </label>
              <input
                name="designation"
                value={form.designation}
                onChange={handleChange}
                required
                placeholder="Head of PMO, Lumina"
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#10B981]/60 focus:border-[#10B981]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] text-[#4B5563] font-medium">
              Image URL (avatar)
            </label>
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#10B981]/60 focus:border-[#10B981]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] text-[#4B5563] font-medium">
              Short testimonial
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Add a short quote from the client."
              className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#10B981]/60 focus:border-[#10B981]"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center rounded-full bg-[#10B981] px-4 py-2 text-xs font-medium text-white shadow shadow-[#10B981]/40 hover:shadow-lg hover:shadow-[#10B981]/60 hover:-translate-y-0.5 active:translate-y-0 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save client"}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden shadow-sm">
        <div className="border-b border-[#E2E8F0] px-4 py-3 text-xs text-[#6B7280] flex items-center justify-between">
          <span>Clients</span>
          <span>{loading ? "Loading…" : `${clients.length} total`}</span>
        </div>
        <ul className="divide-y divide-[#E2E8F0] text-xs sm:text-sm">
          {clients.map((c) => (
            <li
              key={c._id}
              className="px-4 py-3 flex items-center justify-between hover:bg-[#F9FAFB] transition"
            >
              <div>
                <p className="text-[#111827]">{c.name}</p>
                <p className="text-[11px] text-[#6B7280]">{c.designation}</p>
              </div>
              <button
                onClick={() => handleDelete(c._id)}
                className="text-[11px] rounded-lg border border-[#E2E8F0] px-2 py-1 text-[#4B5563] hover:bg-[#F3F4F6]"
              >
                Remove
              </button>
            </li>
          ))}
          {!loading && clients.length === 0 && (
            <li className="px-4 py-4 text-center text-[#6B7280]">
              No clients yet. Add your first testimonial.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
