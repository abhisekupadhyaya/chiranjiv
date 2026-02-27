import { MissionNumberedCard } from "@/components/mission/MissionNumberedCard";
import { MissionSectionIntro } from "@/components/mission/MissionSectionIntro";
import { principles } from "@/components/mission/content";

export function MissionPrinciples() {
  return (
    <section className="mb-24">
      <MissionSectionIntro eyebrow="What We Stand For" title="What We Stand For" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
        {principles.map((principle) => (
          <MissionNumberedCard
            key={principle.number}
            number={principle.number}
            title={principle.title}
            description={principle.description}
            accent={principle.accent}
            compact
          />
        ))}
      </div>
    </section>
  );
}
