export default function ClientCard({ client }) {
  const rating = client.rating || 5;
  const fullStars = "★★★★★".slice(0, Math.round(rating));

  return (
    <article className="group rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5 hover:border-[#0073E6] hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0073E6]/15 transition transform flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <img
          src={client.imageUrl}
          alt={client.name}
          className="h-12 w-12 rounded-full object-cover border border-[#E2E8F0] group-hover:border-[#0073E6] transition"
        />
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-[#111827]">
            {client.name}
          </h3>
          <p className="text-xs text-[#6B7280]">
            {client.designation || "Customer"}
          </p>
        </div>
      </div>
      <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
        {client.description}
      </p>
      <div className="mt-auto flex items-center justify-between text-[11px] text-[#6B7280]">
        <span>
          Rating: <span className="text-[#FBBF24]">{fullStars}</span>{" "}
          <span className="text-[#4B5563]">
            ({rating.toFixed ? rating.toFixed(1) : rating})
          </span>
        </span>
        <span className="group-hover:text-[#0073E6] transition">
          Verified customer
        </span>
      </div>
    </article>
  );
}
