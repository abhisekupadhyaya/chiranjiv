import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { missionCta } from "@/components/mission/content";

export function MissionCTA() {
  return (
    <section className="mb-10">
      <div className="relative overflow-hidden rounded-2xl border border-neutral-1100 bg-white p-10 text-center shadow-lg md:p-14">
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-300" />
        <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-600/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-600">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
          </span>
          {missionCta.badge}
        </span>
        <h2 className="mb-5 text-4xl font-medium tracking-tight text-neutral-200">{missionCta.title}</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-neutral-500">{missionCta.description}</p>
        <Link to={missionCta.buttonTo}>
          <Button className="px-10 py-3.5 text-base font-semibold shadow-md transition-all hover:scale-[1.02] hover:shadow-lg">
            {missionCta.buttonLabel}
          </Button>
        </Link>
        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-700">{missionCta.footer}</p>
      </div>
    </section>
  );
}
