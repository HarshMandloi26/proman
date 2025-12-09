// src/pages/admin/AdminLogin.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // If already logged in, go straight to admin
  useEffect(() => {
    const isAdmin = localStorage.getItem("proman_admin") === "true";
    if (isAdmin) {
      navigate("/admin/projects", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demo credentials
    const DEMO_EMAIL = "admin@proman.com";
    const DEMO_PASSWORD = "Admin@123";

    if (form.email === DEMO_EMAIL && form.password === DEMO_PASSWORD) {
      localStorage.setItem("proman_admin", "true");
      navigate("/admin/projects", { replace: true });
    } else {
      setError("Invalid email or password. Try the demo credentials below.");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-[#0073E6] flex items-center justify-center text-white font-bold shadow-md shadow-[#0073E6]/30">
            P
          </div>
          <div>
            <h1 className="text-base font-semibold text-[#111827]">
              ProMan Admin Login
            </h1>
            <p className="text-xs text-[#6B7280]">
              Sign in to manage projects, clients and leads.
            </p>
          </div>
        </div>

        <form className="space-y-3 text-sm" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="block text-[11px] font-medium text-[#4B5563]">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@proman.com"
              required
              className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0073E6]/60 focus:border-[#0073E6]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-medium text-[#4B5563]">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Admin@123"
              required
              className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0073E6]/60 focus:border-[#0073E6]"
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-full bg-[#0073E6] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#0073E6]/40 hover:shadow-lg hover:shadow-[#0073E6]/60 hover:-translate-y-0.5 active:translate-y-0 transition"
          >
            Log in
          </button>
        </form>

        <div className="mt-4 rounded-lg bg-[#F3F6FB] border border-[#E2E8F0] px-3 py-2 text-[11px] text-[#4B5563]">
          <p className="font-medium text-[#111827] mb-1">Demo credentials</p>
          <p>Email: <span className="font-mono">admin@proman.com</span></p>
          <p>Password: <span className="font-mono">Admin@123</span></p>
        </div>
      </div>
    </div>
  );
}
