import { Card } from '@/components/ui/card'

const queueFeatures = [
  { title: '2,000 Founding Genomes', description: 'Join the first wave of Indians to get full-genome sequencing', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
  )},
  { title: 'Priority Support', description: 'Direct line to our genomics team for questions and insights', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
  )},
  { title: 'Data Co-Ownership', description: 'You co-own the collective genomic database we build together', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  )},
  { title: 'Lifetime Updates', description: 'Get new insights as genomic science evolves with continuous updates', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
  )},
]

export function PriorityQueue() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">Limited Time Offer</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Join the Founding Genome Wave</h2>
            <p className="text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed max-w-3xl mx-auto">Early Access members get lifetime benefits, co-ownership rights, and priority access to all future features.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {queueFeatures.map((feature, index) => (
              <Card key={index} className="p-6 bg-card hover:shadow-lg transition-all duration-300 border-border group hover:border-primary/50">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Worth ₹1,50,000. Yours for ₹0.</h3>
                <p className="text-sm sm:text-base text-muted-foreground">Full genome sequencing + lifetime health insights + data co-ownership</p>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">FREE</div>
                <div className="text-xs sm:text-sm text-muted-foreground">No credit card required</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


