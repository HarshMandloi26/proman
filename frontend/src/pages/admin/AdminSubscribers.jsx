import { useEffect, useState } from "react";
import api from "../../api/apiClient";

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSubscribers = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/subscribers");
      setSubscribers(res.data || []);
    } catch (err) {
      console.error("Error loading subscribers", err);
      setError("Failed to load subscribers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscribers();
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-[#111827]">
          Newsletter subscribers
        </h2>
        <p className="text-xs sm:text-sm text-[#6B7280]">
          Users who opted in to receive ProMan product and PPM updates.
        </p>
      </div>

      <div className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden shadow-sm">
        <div className="border-b border-[#E2E8F0] px-4 py-3 flex items-center justify-between text-xs text-[#6B7280]">
          <span>Subscriber list</span>
          <span>
            {loading ? "Loading…" : `${subscribers.length} total`}
          </span>
        </div>
        {error && (
          <p className="text-xs text-red-600 px-4 py-2">{error}</p>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm">
            <thead className="bg-[#F9FAFB] text-[#6B7280]">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Email</th>
                <th className="px-4 py-2 text-left font-medium">Joined</th>
                <th className="px-4 py-2 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr
                  key={s._id}
                  className="border-t border-[#E2E8F0] hover:bg-[#F9FAFB] transition"
                >
                  <td className="px-4 py-2 text-[#2563EB]">{s.email}</td>
                  <td className="px-4 py-2 text-[#9CA3AF]">
                    {s.createdAt ? s.createdAt.slice(0, 10) : "-"}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-[11px]">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
              {!loading && subscribers.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-4 text-center text-[#6B7280]"
                  >
                    No subscribers yet. When someone joins the newsletter,
                    they’ll appear here.
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
