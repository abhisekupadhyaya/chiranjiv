"use client"

import { Card } from "@/components/ui/card"

export function IndiaToWorld() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      
      {/* Floating animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" 
        style={{ animationDelay: '2s' }}
      />
      <div 
        className="absolute top-1/2 right-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" 
        style={{ animationDelay: '4s' }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="flex flex-col justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-foreground mb-6 sm:mb-8 text-balance tracking-tight leading-[1.1]">
                From India, to the World
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed font-light">
                We're starting with India because it's the world's most genetically diverse nation and the most
                underrepresented in global genomic databases.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed font-light">
                Today, 86% of genomic research is based on European ancestry. That means health insights for most
                Indians are built on incomplete data.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                <strong className="text-foreground font-medium">Chiranjiv changes that.</strong> We're building the largest Indian
                genomic reference database — and making it accessible to everyone.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Card className="relative glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl p-5 sm:p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 [animation-delay:150ms]">
                <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h3 className="text-3xl sm:text-4xl font-extralight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-3">
                    1.4 Billion People
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
                    India represents 18% of humanity, but less than 2% of genomic research
                  </p>
                </div>
              </Card>

              <Card className="relative glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl p-5 sm:p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 [animation-delay:300ms]">
                <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h3 className="text-3xl sm:text-4xl font-extralight bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">
                    4,600+ Ethnic Groups
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
                    India's genetic diversity rivals entire continents and we're mapping it all
                  </p>
                </div>
              </Card>

              <Card className="relative glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl p-5 sm:p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 [animation-delay:450ms]">
                <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h3 className="text-3xl sm:text-4xl font-extralight bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-3">
                    Global Impact
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
                    Building India's genomic infrastructure benefits South Asia and the world
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
