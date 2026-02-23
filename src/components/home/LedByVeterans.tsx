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
    <section className="py-8 border-y border-neutral-1100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold text-neutral-700 uppercase tracking-widest mb-6">
          Led by veterans from
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-10">
          {institutions.map(({ name, logo, label }) => (
            <div key={name} className="flex items-center gap-2.5">
              <img
                src={logo}
                alt={name}
                loading="lazy"
                className={
                  label === undefined
                    ? "h-8 md:h-10 w-auto object-contain max-w-[120px]"
                    : "w-8 h-8 md:w-10 md:h-10 object-contain"
                }
              />
              {label !== undefined && (
                <span className="text-lg md:text-xl font-bold text-neutral-200">
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
