import { MissionSectionIntro } from "@/components/mission/MissionSectionIntro";
import { futureVision } from "@/components/mission/content";

export function MissionFuture() {
  return (
    <section className="mb-24">
      <MissionSectionIntro eyebrow={futureVision.eyebrow} title={futureVision.title} />
      <div className="relative overflow-hidden rounded-2xl border border-primary-500/15 bg-primary-500/5 p-8 md:p-10">
        <div className="absolute -mr-32 -mt-32 right-0 top-0 h-64 w-64 rounded-full bg-primary-500 opacity-5" />
        <p className="mb-8 text-xl font-medium leading-relaxed text-neutral-300">{futureVision.intro}</p>
        <div className="grid gap-x-10 gap-y-6 md:grid-cols-2">
          {futureVision.items.map((item) => (
            <div key={item} className="flex items-start gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-500/15 text-sm font-bold text-primary-600 ring-1 ring-primary-500/20">
                ✓
              </div>
              <p className="text-base leading-relaxed text-neutral-500">{item}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-lg font-semibold text-primary-600">{futureVision.outro}</p>
      </div>
    </section>
  );
}
