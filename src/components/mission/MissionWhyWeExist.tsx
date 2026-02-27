import { whyWeExist } from "@/components/mission/content";

export function MissionWhyWeExist() {
  return (
    <section className="mb-24">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-primary-600">{whyWeExist.eyebrow}</h2>
      </header>

      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-1100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
          <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-primary-500 to-primary-300" />
          <div className="pl-2">
            <p className="mb-6 text-base leading-relaxed text-neutral-500">{whyWeExist.summary}</p>
            <blockquote className="border-l-0 pl-0">
              <p className="text-base font-semibold italic leading-relaxed text-primary-600">&quot;{whyWeExist.quote}&quot;</p>
            </blockquote>
          </div>
        </div>

        <div className="space-y-6 text-lg leading-relaxed text-neutral-500">
          <p>{whyWeExist.context}</p>
        </div>
      </div>
    </section>
  );
}
