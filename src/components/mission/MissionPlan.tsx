import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { MissionSectionIntro } from "@/components/mission/MissionSectionIntro";
import { planPhases } from "@/components/mission/content";

export function MissionPlan() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [railMetrics, setRailMetrics] = useState({ top: 0, height: 0, stops: [] as number[] });
  const railContainerRef = useRef<HTMLDivElement | null>(null);
  const phaseRefs = useRef<Array<HTMLElement | null>>([]);
  const phaseIds = useMemo(() => planPhases.map((_, idx) => `mission-phase-${idx}`), []);

  useEffect(() => {
    const elements = phaseRefs.current.filter((node): node is HTMLElement => node !== null);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const index = Number((visibleEntries[0].target as HTMLElement).dataset.phaseIndex ?? "0");
          setActiveIndex((prev) => (prev === index ? prev : index));
        }
      },
      {
        root: null,
        // Narrow center band so phase changes happen near viewport midpoint.
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0],
      }
    );

    elements.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    const updateRailMetrics = () => {
      const container = railContainerRef.current;
      const first = phaseRefs.current[0];
      const last = phaseRefs.current[phaseRefs.current.length - 1];
      if (!container || !first || !last) return;

      const containerRect = container.getBoundingClientRect();
      const firstRect = first.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();

      // Rail should start at top of first card and end at midpoint of last card.
      const top = firstRect.top - containerRect.top;
      const bottom = lastRect.top - containerRect.top + lastRect.height / 2;
      const stops = phaseRefs.current.map((node) => {
        if (!node) return top;
        const rect = node.getBoundingClientRect();
        return rect.top - containerRect.top + rect.height / 2;
      });
      setRailMetrics({
        top,
        height: Math.max(bottom - top, 0),
        stops,
      });
    };

    updateRailMetrics();
    window.addEventListener("resize", updateRailMetrics);

    return () => {
      window.removeEventListener("resize", updateRailMetrics);
    };
  }, []);

  const firstStop = railMetrics.stops[0] ?? railMetrics.top;
  const activeStop = Math.max(railMetrics.stops[activeIndex] ?? firstStop, firstStop);
  const animatedHeight = Math.max(activeStop - railMetrics.top, 0);
  const railTop = Math.round(railMetrics.top);
  const railLeft = 14;
  const fillHeight = Math.round(animatedHeight);

  return (
    <section className="mb-24">
      <MissionSectionIntro eyebrow="Our Roadmap" title="3. The Plan" />

      <div ref={railContainerRef} className="relative pl-10">
        <div
          className="pointer-events-none absolute w-[3px] rounded-b bg-primary-500/15"
          style={{
            left: railLeft,
            top: railTop,
            height: `${railMetrics.height}px`,
          }}
        />
        <div
          className="pointer-events-none absolute w-[3px] rounded-b bg-gradient-to-b from-primary-500 to-secondary-500 transition-[height] duration-300 ease-out"
          style={{ left: railLeft, top: railTop, minHeight: 0, height: `${fillHeight}px` }}
        />
        <div className="space-y-4">
          {planPhases.map((phase, idx) => {
            const cleanedTitle = phase.title.replace(/^Phase\s+\d+\s+—\s+/, "");
            return (
              <article
                key={phase.title}
                id={phaseIds[idx]}
                data-phase-index={idx}
                ref={(node) => {
                  phaseRefs.current[idx] = node;
                }}
                className="relative scroll-mt-28 overflow-hidden rounded-2xl border border-white/40 bg-white/40 p-5 shadow-lg shadow-black/5 backdrop-blur-md sm:p-6"
              >
                <div className="pointer-events-none absolute -left-[34px] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-primary-500/35 bg-white" />
                <div className="relative min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-700">{`Phase ${idx + 1}`}</p>
                  <h3 className="mt-1 text-lg font-semibold leading-snug text-neutral-200 sm:text-xl">{cleanedTitle}</h3>
                </div>

                <p className="mt-4 leading-relaxed text-neutral-500">{phase.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
