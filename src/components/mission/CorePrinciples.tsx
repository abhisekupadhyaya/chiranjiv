export function CorePrinciples() {
  const principles = [
    { number: '1.', text: 'Your data, your control.' },
    { number: '2.', text: 'Transparency by design: every access logged, every consent revocable.' },
    { number: '3.', text: 'Data stays sovereign: stored within India, governed by Indian law.' },
    { number: '4.', text: 'Science for all: insights and innovations flow back to society.' },
    { number: '5.', text: 'Built in India, open to the world.' },
  ]

  return (
    <section className="mb-12">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-light text-foreground mb-4">
          4. Our Core Principles
        </h3>
      </div>
      <div className="space-y-4 text-muted-foreground leading-relaxed font-light">
        {principles.map((principle, index) => (
          <p key={index} className="flex gap-3">
            <span className="text-primary font-semibold flex-shrink-0">
              {principle.number}
            </span>
            <span className="font-light text-foreground/90">
              {principle.text}
            </span>
          </p>
        ))}
      </div>
    </section>
  )
}

