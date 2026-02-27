import type { PhaseState } from "@/components/mission/content";

type MissionTimelineItemProps = {
  id?: string;
  title: string;
  description: string;
  state: PhaseState;
  isActive?: boolean;
  isLast?: boolean;
};

const markerByState: Record<PhaseState, string> = {
  solid: "bg-primary-500",
  medium: "bg-primary-500 opacity-60",
  light: "bg-primary-500 opacity-30",
  outline: "border-4 border-primary-500 bg-white",
};

export function MissionTimelineItem({
  id,
  title,
  description,
  state,
  isActive = false,
  isLast = false,
}: MissionTimelineItemProps) {
  return (
    <div
      id={id}
      className={`relative ml-4 scroll-mt-28 border-l-4 border-primary-500/20 pl-12 transition-colors ${
        isActive ? "border-primary-500/40" : ""
      } ${isLast ? "" : "pb-12"}`}
    >
      <div className={`absolute -left-[14px] top-0 h-6 w-6 rounded-full ${markerByState[state]}`} />
      <h3 className="mb-3 text-2xl font-semibold text-neutral-200">{title}</h3>
      <p className="max-w-3xl leading-relaxed text-neutral-500">{description}</p>
    </div>
  );
}
