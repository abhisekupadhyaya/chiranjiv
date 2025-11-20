export function TheProblem() {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-light text-foreground mb-4">
          2. The Problem
        </h3>
      </div>
      <div className="space-y-4 text-muted-foreground leading-relaxed font-light">
        <ul className="space-y-3 ml-4">
          <li className="flex gap-3">
            <span className="text-primary mt-1.5 flex-shrink-0">•</span>
            <span>Genome sequencing is still unaffordable for most people (₹1 lakh or more).</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary mt-1.5 flex-shrink-0">•</span>
            <span>Data from Indian and Global South populations is missing from global research.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary mt-1.5 flex-shrink-0">•</span>
            <span>Most genomic companies keep user data proprietary, with vague consent and little transparency.</span>
          </li>
        </ul>
        <p className="text-base leading-relaxed">
          This leaves entire populations under-represented in drug discovery, preventive medicine, and nutrition science.
        </p>
        <p className="text-base leading-relaxed">
          Chiranjiv aims to change that — ethically, at scale, and starting right here.
        </p>
      </div>
    </section>
  )
}

