interface PhaseProps {
  number: number
  title: string
  children: React.ReactNode
}

function Phase({ number, title, children }: PhaseProps) {
  return (
    <div className="bg-primary/5 rounded-lg p-5 border-l-4 border-primary">
      <h4 className="text-lg font-semibold text-primary mb-3">
        Phase {number} — {title}
      </h4>
      <div className="space-y-2 text-muted-foreground font-light">
        {children}
      </div>
    </div>
  )
}

export function ThePlan() {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-light text-foreground mb-4">
          3. The Plan
        </h3>
      </div>
      <div className="space-y-4 text-muted-foreground leading-relaxed font-light">
        <Phase number={1} title="Free Genome Testing and Health reports for Early Registrants">
          <p>We provide free DNA collection kits and full-genome sequencing for early participants.</p>
          <p>Your data is encrypted, stored in India, and co-governed by you.</p>
          <p>You can access it, delete it, or choose how it's used. Always.</p>
        </Phase>

        <Phase number={2} title="Personalized Insights That Work for You">
          <p>From your genome, we generate actionable reports: nutrition, fitness, longevity, and preventive-health guidance.</p>
          <p>Many are free; premium options are affordable.</p>
          <p>Our focus: insights that improve your life — not extract your data.</p>
        </Phase>

        <Phase number={3} title="The Indian Genome Cloud">
          <p>As participation grows, anonymized data (with your consent) fuels breakthroughs in drug discovery, AI health models, and public-health policy.</p>
          <p>All usage is logged, reviewed by an independent ethics board, and stored within Indian data centers.</p>
        </Phase>

        <Phase number={4} title="Global Expansion">
          <p>Once the model is proven and trusted in India, we will extend the platform worldwide — creating a privacy-first, ethically sourced, global genomic infrastructure.</p>
          <p>An Indian innovation, shared with the world.</p>
        </Phase>
      </div>
    </section>
  )
}

