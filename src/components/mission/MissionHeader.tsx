interface MissionHeaderProps {
  title: string
  subtitle: string
  date: string
}

export function MissionHeader({ title, subtitle, date }: MissionHeaderProps) {
  return (
    <div className="mb-10 pb-8 border-b border-border/50">
      <p className="text-sm font-medium text-primary mb-3 uppercase tracking-wider">
        {date}
      </p>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4 text-balance leading-tight">
        {title}
      </h2>
      <p className="text-lg sm:text-xl text-muted-foreground text-balance leading-relaxed font-light">
        {subtitle}
      </p>
    </div>
  )
}

