import { Card } from '@/components/ui/card'

export function IndiaToWorld() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 text-balance">From India, to the World</h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">We&apos;re starting with India because it&apos;s the world&apos;s most genetically diverse nation — and the most underrepresented in global genomic databases.</p>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">Today, 86% of genomic research is based on European ancestry. That means health insights for most Indians are built on incomplete data.</p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed"><strong className="text-foreground">Chiranjiv changes that.</strong> We&apos;re building the largest Indian genomic reference database — and making it accessible to everyone.</p>
            </div>
            <div className="space-y-4">
              <Card className="p-6 bg-card border-border hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">1.4 Billion People</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">India represents 18% of humanity, but less than 2% of genomic research</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-card border-border hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">4,600+ Ethnic Groups</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">India&apos;s genetic diversity rivals entire continents — and we&apos;re mapping it all</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-card border-border hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Global Impact</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Building India&apos;s genomic infrastructure benefits South Asia and the world</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


