type MissionSectionIntroProps = {
  eyebrow: string;
  title?: string;
  description?: string;
};

export function MissionSectionIntro({ eyebrow, description }: MissionSectionIntroProps) {
  return (
    <div className="mb-10">
      <h2 className="mb-4 text-3xl font-semibold tracking-tight text-primary-600">{eyebrow}</h2>
      {description ? <p className="max-w-3xl text-neutral-500 leading-relaxed">{description}</p> : null}
    </div>
  );
}
