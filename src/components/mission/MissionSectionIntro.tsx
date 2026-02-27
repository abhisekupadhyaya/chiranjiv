type MissionSectionIntroProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function MissionSectionIntro({ eyebrow, title, description }: MissionSectionIntroProps) {
  return (
    <div className="mb-10">
      <span className="mb-3 block text-xs font-bold uppercase tracking-[0.25em] text-primary-500">
        {eyebrow}
      </span>
      <h2 className="mb-4 text-3xl font-semibold tracking-tight text-neutral-200">{title}</h2>
      {description ? <p className="max-w-3xl text-neutral-500 leading-relaxed">{description}</p> : null}
    </div>
  );
}
