import { useEffect, useState } from "react";
import api from "../../api/apiClient";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/contacts");
      setContacts(res.data || []);
    } catch (err) {
      console.error("Error loading contacts", err);
      setError("Failed to load contacts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-[#111827]">
          Contact submissions
        </h2>
        <p className="text-xs sm:text-sm text-[#6B7280]">
          Leads that filled out the contact form on your landing page.
        </p>
      </div>

      <div className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden shadow-sm">
        <div className="border-b border-[#E2E8F0] px-4 py-3 flex items-center justify-between text-xs text-[#6B7280]">
          <span>Recent inquiries</span>
          <span>
            {loading ? "Loading…" : `${contacts.length} total`}
          </span>
        </div>
        {error && (
          <p className="text-xs text-red-600 px-4 py-2">{error}</p>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm">
            <thead className="bg-[#F9FAFB] text-[#6B7280]">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Name</th>
                <th className="px-4 py-2 text-left font-medium">Email</th>
                <th className="px-4 py-2 text-left font-medium">Mobile</th>
                <th className="px-4 py-2 text-left font-medium">City</th>
                <th className="px-4 py-2 text-left font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr
                  key={c._id}
                  className="border-t border-[#E2E8F0] hover:bg-[#F9FAFB] transition"
                >
                  <td className="px-4 py-2">{c.fullName}</td>
                  <td className="px-4 py-2 text-[#2563EB]">{c.email}</td>
                  <td className="px-4 py-2">{c.mobile}</td>
                  <td className="px-4 py-2 text-[#6B7280]">{c.city}</td>
                  <td className="px-4 py-2 text-[#9CA3AF]">
                    {c.createdAt ? c.createdAt.slice(0, 10) : "-"}
                  </td>
                </tr>
              ))}
              {!loading && contacts.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-4 text-center text-[#6B7280]"
                  >
                    No inquiries yet. When someone submits the form, it will
                    show up here.
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
