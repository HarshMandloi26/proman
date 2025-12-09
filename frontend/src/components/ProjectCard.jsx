export default function ProjectCard({ project }) {
  return (
    <article className="group rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden hover:border-[#0073E6] hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0073E6]/15 transition transform">
      <div className="overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.name}
          className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4 space-y-2">
        {project.tag && (
          <span className="inline-flex items-center rounded-full bg-[#E5F0FF] text-[#1D4ED8] border border-[#BFDBFE] px-2 py-0.5 text-[10px] uppercase tracking-wide">
            {project.tag}
          </span>
        )}
        <h3 className="text-sm sm:text-base font-semibold text-[#111827]">
          {project.name}
        </h3>
        <p className="text-xs sm:text-sm text-[#4B5563] line-clamp-3">
          {project.description}
        </p>
        <button className="mt-1 inline-flex items-center text-xs text-[#0073E6] group-hover:text-[#1D4ED8] transition">
          View details <span className="ml-1 text-sm">↗</span>
        </button>
      </div>
    </article>
  );
}
