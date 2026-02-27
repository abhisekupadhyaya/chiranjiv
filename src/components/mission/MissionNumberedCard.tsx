import type { Accent } from "@/components/mission/content";

type MissionNumberedCardProps = {
  number: string;
  title: string;
  description: string;
  accent: Accent;
  compact?: boolean;
};

const accentToTopBar: Record<Accent, string> = {
  primary: "from-primary-500 to-primary-300",
  secondary: "from-secondary-500 to-secondary-300",
  amber: "from-amber-500 to-amber-300",
  violet: "from-violet-500 to-violet-300",
  teal: "from-teal-500 to-teal-300",
};

const accentToNumber: Record<Accent, string> = {
  primary: "text-primary-500",
  secondary: "text-secondary-500",
  amber: "text-amber-500",
  violet: "text-violet-500",
  teal: "text-teal-500",
};

export function MissionNumberedCard({
  number,
  title,
  description,
  accent,
  compact = false,
}: MissionNumberedCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/40 bg-white/40 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/60 hover:shadow-xl hover:shadow-black/10 ${
        compact ? "p-5" : "p-6"
      }`}
    >
      <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${accentToTopBar[accent]}`} />
      <div className={`mb-3 mt-1 font-mono text-2xl font-black tracking-tight ${accentToNumber[accent]}`}>{number}</div>
      <h3 className={`mb-2 font-semibold text-neutral-200 ${compact ? "text-base" : "text-lg"}`}>{title}</h3>
      <p className={`text-neutral-600 leading-relaxed ${compact ? "text-xs font-medium" : "text-sm"}`}>{description}</p>
    </div>
  );
}
