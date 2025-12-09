import { useEffect, useState } from "react";
import api from "../../api/apiClient";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    tag: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/projects");
      setProjects(res.data || []);
    } catch (err) {
      console.error("Error loading projects", err);
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError("");
      const res = await api.post("/projects", form);
      setProjects((prev) => [res.data, ...prev]);
      setForm({ name: "", description: "", imageUrl: "", tag: "" });
    } catch (err) {
      console.error("Error creating project", err);
      setError("Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting project", err);
      alert("Could not delete project.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-[#111827]">
          Manage projects
        </h2>
        <p className="text-xs sm:text-sm text-[#6B7280]">
          These projects feed the “Key portfolio views” section on the landing
          page.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-[#F9FAFB] p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-[#111827] mb-3">
          Add new project
        </h3>
        {error && (
          <p className="text-xs text-red-600 mb-2">{error}</p>
        )}
        <form className="space-y-3 text-sm" onSubmit={handleSubmit}>
          {/* same UI as your old form, just using form state + handleSubmit */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="block text-[11px] text-[#4B5563] font-medium">
                Project name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="e.g. Work Intake Board"
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0073E6]/60 focus:border-[#0073E6]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] text-[#4B5563] font-medium">
                Tag / Category
              </label>
              <input
                name="tag"
                value={form.tag}
                onChange={handleChange}
                placeholder="Tracking, Prioritization, Resources…"
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0073E6]/60 focus:border-[#0073E6]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] text-[#4B5563] font-medium">
              Short description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Explain what this view shows and why it matters."
              className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0073E6]/60 focus:border-[#0073E6]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] text-[#4B5563] font-medium">
              Image URL
            </label>
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0073E6]/60 focus:border-[#0073E6]"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-1 inline-flex items-center rounded-full bg-[#0073E6] px-4 py-2 text-xs font-medium text-white shadow shadow-[#0073E6]/40 hover:shadow-lg hover:shadow-[#0073E6]/60 hover:-translate-y-0.5 active:translate-y-0 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save project"}
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden shadow-sm">
        <div className="border-b border-[#E2E8F0] px-4 py-3 flex items-center justify-between text-xs text-[#6B7280]">
          <span>Recent projects</span>
          <span>{loading ? "Loading…" : `${projects.length} total`}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm">
            <thead className="bg-[#F9FAFB] text-[#6B7280]">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Name</th>
                <th className="px-4 py-2 text-left font-medium">Tag</th>
                <th className="px-4 py-2 text-left font-medium">Created</th>
                <th className="px-4 py-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr
                  key={p._id}
                  className="border-t border-[#E2E8F0] hover:bg-[#F9FAFB] transition"
                >
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2 text-[#6B7280]">{p.tag}</td>
                  <td className="px-4 py-2 text-[#9CA3AF]">
                    {p.createdAt ? p.createdAt.slice(0, 10) : "-"}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="rounded-lg border border-red-300 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && projects.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-4 text-center text-[#6B7280]"
                  >
                    No projects yet. Create your first one using the form above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
