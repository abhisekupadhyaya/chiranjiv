import { MissionNumberedCard } from "@/components/mission/MissionNumberedCard";
import { MissionSectionIntro } from "@/components/mission/MissionSectionIntro";
import { problemItems } from "@/components/mission/content";

export function MissionProblem() {
  return (
    <section className="mb-24">
      <MissionSectionIntro eyebrow="The Challenge" title="The Challenge" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {problemItems.map((item) => (
          <MissionNumberedCard
            key={item.number}
            number={item.number}
            title={item.title}
            description={item.description}
            accent={item.accent}
          />
        ))}
      </div>
    </section>
  );
}
