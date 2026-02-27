import { missionHero } from "@/components/mission/content";

export function MissionHero() {
  return (
    <section className="mb-16">
      <div className="max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-600/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-600">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
          </span>
          {missionHero.badge}
        </div>
        <h1 className="mb-6 text-5xl font-medium leading-tight tracking-tight text-neutral-200 md:text-6xl">
          {missionHero.title}
        </h1>
        <p className="text-xl font-light leading-relaxed text-neutral-500">{missionHero.subtitle}</p>
      </div>
    </section>
  );
}
