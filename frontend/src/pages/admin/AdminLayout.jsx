// src/pages/admin/AdminLayout.jsx
import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("proman_admin") === "true";

  // If not logged in, send to login page
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const linkClass =
    "flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-[#4B5563] hover:bg-[#E5F0FF] hover:text-[#111827] transition";

  const handleLogout = () => {
    localStorage.removeItem("proman_admin");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="grid md:grid-cols-[260px_minmax(0,1fr)] gap-4 mt-4">
      {/* Sidebar */}
      <aside className="rounded-2xl border border-[#E2E8F0] bg-white p-4 h-full shadow-sm flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-sm font-semibold text-[#111827]">
              ProMan admin
            </h3>
            <p className="text-[11px] text-[#6B7280]">
              Manage portfolio content and leads.
            </p>
          </div>
        </div>

        <nav className="space-y-1 text-xs mb-4">
          <NavLink
            to="/admin/projects"
            className={({ isActive }) =>
              `${linkClass} ${
                isActive
                  ? "bg-[#E5F0FF] text-[#111827] border border-[#BFDBFE]"
                  : ""
              }`
            }
          >
            <span className="text-[#0073E6]">▣</span> Projects
          </NavLink>
          <NavLink
            to="/admin/clients"
            className={({ isActive }) =>
              `${linkClass} ${
                isActive
                  ? "bg-[#E5F0FF] text-[#111827] border border-[#BFDBFE]"
                  : ""
              }`
            }
          >
            <span className="text-[#10B981]">◆</span> Clients
          </NavLink>
          <NavLink
            to="/admin/contacts"
            className={({ isActive }) =>
              `${linkClass} ${
                isActive
                  ? "bg-[#E5F0FF] text-[#111827] border border-[#BFDBFE]"
                  : ""
              }`
            }
          >
            <span className="text-[#0EA5E9]">✉</span> Contacts
          </NavLink>
          <NavLink
            to="/admin/subscribers"
            className={({ isActive }) =>
              `${linkClass} ${
                isActive
                  ? "bg-[#E5F0FF] text-[#111827] border border-[#BFDBFE]"
                  : ""
              }`
            }
          >
            <span className="text-[#F97316]">◎</span> Subscribers
          </NavLink>
        </nav>

        <div className="mt-auto space-y-3">
          <div className="rounded-xl border border-[#E2E8F0] bg-[#F3F6FB] px-3 py-2 text-[11px] text-[#4B5563]">
            <p className="font-medium text-[#111827] mb-1">Tip</p>
            <p>
              Use the admin area to control everything shown on the public
              ProMan landing page.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full inline-flex items-center justify-center rounded-full border border-[#E2E8F0] bg-white px-3 py-2 text-[11px] font-medium text-[#4B5563] hover:bg-[#F3F4F6] hover:border-[#CBD5E1] transition"
          >
            Log out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-6 shadow-sm">
        <Outlet />
      </main>
    </div>
  );
}
