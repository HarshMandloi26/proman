import { Routes, Route, NavLink } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminClients from "./pages/admin/AdminClients";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminSubscribers from "./pages/admin/AdminSubscribers";
import AdminLogin from "./pages/admin/AdminLogin"; // ✅ add this

function App() {
  const navLinkClass =
    "px-3 py-2 rounded-full text-sm font-medium transition";

  return (
    <div className="min-h-screen bg-[#F3F6FB] text-[#111827]">
      {/* header stays the same */}
      <header className="border-b border-[#E2E8F0] bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#0073E6] flex items-center justify-center text-white font-bold shadow-md shadow-[#0073E6]/30">
              P
            </div>
            <div>
              <p className="font-semibold text-sm tracking-wide text-[#111827]">
                ProMan
              </p>
              <p className="text-xs text-[#6B7280]">
                Project Portfolio Management
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-3 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${navLinkClass} ${
                  isActive
                    ? "bg-[#0073E6] text-white"
                    : "text-[#4B5563] hover:bg-[#E5F0FF]"
                }`
              }
            >
              Landing
            </NavLink>
            <NavLink
              to="/admin/login"
              className={({ isActive }) =>
                `${navLinkClass} ${
                  isActive
                    ? "bg-[#0073E6] text-white"
                    : "text-[#4B5563] hover:bg-[#E5F0FF]"
                }`
              }
            >
              Admin
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* ✅ new login route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ✅ protected admin area */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="projects" element={<AdminProjects />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="subscribers" element={<AdminSubscribers />} />
          </Route>
        </Routes>
      </main>

      <footer className="border-t border-[#E2E8F0] bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between gap-2 text-xs text-[#6B7280]">
          <p>© {new Date().getFullYear()} ProMan. All rights reserved.</p>
          <p className="text-right">
            Inspired by{" "}
            <span className="font-semibold text-[#0073E6]">
              modern PPM platforms
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
