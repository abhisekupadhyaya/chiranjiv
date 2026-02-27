const institutions = [
  { name: "IIT Bombay", logo: "/institutions/IIT-Bombay.webp", label: "IIT Bombay" },
  { name: "IIT Delhi", logo: "/institutions/IIT-Delhi.jpg", label: "IIT Delhi" },
  { name: "IIM Bangalore", logo: "/institutions/IIM-Bangalore.png", label: "IIM Bangalore" },
  { name: "IIM Calcutta", logo: "/institutions/IIM-Calcutta.png", label: "IIM Calcutta" },
  { name: "Wharton School", logo: "/institutions/wharton-logo.svg", label: undefined },
  { name: "UC Berkeley", logo: "/institutions/UC-Berkley.png", label: "UC Berkeley" },
] as const;

export function LedByVeterans() {
  return (
    <section className="py-4 border-y border-neutral-1100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="mb-3 text-xs font-semibold text-neutral-600 uppercase tracking-widest">
          Led by veterans from
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 md:gap-x-8">
          {institutions.map(({ name, logo, label }) => (
            <div key={name} className={label === undefined ? "flex items-center" : "flex items-center gap-1.5"}>
              <img
                src={logo}
                alt={name}
                loading="lazy"
                className={
                  label === undefined
                    ? "h-5 w-auto object-contain max-w-[90px] opacity-70"
                    : "w-6 h-6 object-contain"
                }
              />
              {label !== undefined && (
                <span className="text-sm font-semibold text-neutral-400">
                  {label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
