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
    <section className="py-5 sm:py-6 border-y border-neutral-1100/80 bg-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="mb-4 text-[11px] sm:text-xs font-semibold text-neutral-700 uppercase tracking-[0.2em]">
          Led by veterans from
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 md:gap-x-8">
          {institutions.map(({ name, logo, label }) => (
            <div key={name} className="flex items-center gap-2">
              <img
                src={logo}
                alt={name}
                loading="lazy"
                className={
                  label === undefined
                    ? "h-7 md:h-8 w-auto object-contain max-w-[104px]"
                    : "w-7 h-7 md:w-8 md:h-8 object-contain"
                }
              />
              {label !== undefined && (
                <span className="text-base md:text-lg font-semibold text-neutral-200">
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
