import ProjectCard from "../components/ProjectCard";
import ClientCard from "../components/ClientCard";
import ContactForm from "../components/ContactForm";
import ReviewForm from "../components/ReviewForm";
import NewsletterForm from "../components/NewsletterForm";
import { useEffect, useState } from "react";
import api from "../api/apiClient";

export default function LandingPage() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [projectsRes, clientsRes] = await Promise.all([
          api.get("/projects"),
          api.get("/clients"),
        ]);

        setProjects(projectsRes.data || []);
        setClients(clientsRes.data || []);
      } catch (err) {
        console.error("Error loading landing data", err);
        setError("Unable to load data right now. Please refresh in a moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero (same as yours) */}
      <section className="grid gap-8 md:grid-cols-2 items-center">
        <div className="space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E5F0FF] px-3 py-1 text-[11px] font-medium text-[#1D4ED8]">
            PROJECT PORTFOLIO MANAGEMENT • PMO
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-[#111827]">
            Project portfolio management
            <span className="text-[#0073E6]"> made simple.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#4B5563] max-w-xl">
            ProMan helps you move beyond spreadsheets and gain clear visibility
            into projects, resources, and strategic priorities in one place.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-[#0073E6] px-5 py-2 text-sm font-medium text-white shadow-md shadow-[#0073E6]/40 hover:shadow-lg hover:shadow-[#0073E6]/50 hover:-translate-y-0.5 active:translate-y-0 transition">
              Get a demo
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-[#CBD5E1] bg-white px-5 py-2 text-sm font-medium text-[#111827] hover:bg-[#E5F0FF] transition">
              Watch overview video
            </button>
          </div>

          <ul className="mt-3 space-y-1.5 text-sm text-[#4B5563]">
            <li>
              • Centralize status reports and portfolio health in one tool.
            </li>
            <li>• Prioritize projects based on value, risk, and capacity.</li>
            <li>• Improve decision-making with clean, visual reporting.</li>
          </ul>
        </div>

        {/* Hero Preview (same as yours) */}
        <div className="relative">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#0073E61a] via-[#6366F11a] to-[#22C55E1a] blur-2xl" />
          <div className="relative rounded-3xl border border-[#E2E8F0] bg-white p-5 shadow-xl">
            <p className="text-xs uppercase tracking-wide text-[#6B7280] mb-2">
              PORTFOLIO SNAPSHOT
            </p>
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-[#E5F0FF] via-white to-[#ECFEFF] flex items-center justify-center">
              <div className="space-y-3 max-w-xs text-center text-xs sm:text-sm text-[#4B5563]">
                <p className="text-sm sm:text-base font-medium text-[#111827]">
                  See the whole portfolio at a glance.
                </p>
                <p>
                  Track projects by stage, risk, and value – all from a clean,
                  intuitive dashboard that teams actually like to use.
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs text-[#6B7280]">
              Built with React and Tailwind, powered by Node.js and MongoDB.
            </p>
          </div>
        </div>
      </section>
      <hr />

      {/* Project views */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#111827]">
              Key portfolio views
            </h2>
            <p className="text-sm text-[#4B5563]">
              From portfolio tracking to resource capacity, ProMan highlights
              the views PMOs use most often.
            </p>
          </div>
        </div>

        {loading && <p className="text-sm text-[#6B7280]">Loading projects…</p>}
        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
        {!loading && !error && projects.length === 0 && (
          <p className="text-sm text-[#6B7280]">
            No projects found. Add some from the admin panel.
          </p>
        )}
      </section>
      <hr />

      {/* Clients */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#111827]">
              Teams that trust ProMan
            </h2>
            <p className="text-sm text-[#4B5563]">
              PMO leaders and portfolio managers who moved beyond spreadsheets.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {clients.map((c) => (
            <ClientCard key={c._id} client={c} />
          ))}
        </div>
        {!loading && !error && clients.length === 0 && (
          <p className="text-sm text-[#6B7280]">
            No clients yet. Add testimonials from the admin panel or submit a
            review below.
          </p>
        )}

        {/* Review form */}
        <div className="mt-6 rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5 shadow-sm">
          <h3 className="text-sm sm:text-base font-semibold text-[#111827] mb-1">
            Share your experience with ProMan
          </h3>
          <p className="text-xs text-[#6B7280] mb-3">
            Tell us how ProMan helps you plan, track, or deliver projects. Your
            review will appear in the list above.
          </p>
          <ReviewForm
            onSuccess={(newClient) => {
              // Add the new review at the top
              setClients((prev) => [newClient, ...prev]);
            }}
          />
        </div>
      </section>
      <hr />


      {/* Contact & Newsletter (same UI, but forms will now hit backend) */}
      <section className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="rounded-3xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#111827]">
            Talk with us about your portfolio
          </h2>
          <p className="mt-1 mb-4 text-sm text-[#4B5563] max-w-md">
            Share a few details and we’ll walk you through how ProMan can help
            standardize portfolio management in your organization.
          </p>
          <ContactForm />
        </div>

        <div className="rounded-3xl border border-[#E2E8F0] bg-gradient-to-br from-white via-[#E5F0FF] to-[#ECFEFF] p-5 sm:p-6 shadow flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#111827]">
              Stay ahead with PPM best practices
            </h2>
            <p className="mt-1 mb-4 text-sm text-[#4B5563]">
              Get short, practical insights about portfolio management, work
              intake, prioritization, and PMO leadership.
            </p>
            <NewsletterForm />
          </div>
          <p className="mt-4 text-xs text-[#6B7280]">
            No spam. A few focused emails per month. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
