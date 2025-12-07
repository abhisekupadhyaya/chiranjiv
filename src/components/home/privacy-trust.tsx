"use client"

import { Card } from "@/components/ui/card"

const privacyFeatures = [
  {
    title: "End-to-End Encryption",
    description:
      "Your genetic data is encrypted from the moment it leaves our lab until it reaches your secure dashboard.",
  },
  {
    title: "Indian Data Centers",
    description:
      "All data stored exclusively in India, complying with local regulations and ensuring data sovereignty.",
  },
  {
    title: "User-Controlled Access",
    description: "You decide who sees your data.",
  },
  {
    title: "Anonymous Research",
    description: "Contribute to research without revealing your identity. Your data helps science, not advertisers.",
  },
]

export function PrivacyTrust() {
  const animationDelays = ['[animation-delay:150ms]', '[animation-delay:300ms]', '[animation-delay:450ms]', '[animation-delay:600ms]']

  return (
    <section id="privacy" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
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
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-foreground mb-12 sm:mb-16 text-balance tracking-tight leading-[1.1] text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            Your Privacy is Our Priority
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {privacyFeatures.map((feature, index) => (
              <Card
                key={index}
                className={`relative glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 ${animationDelays[index]}`}
              >
                <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl font-light tracking-tight text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-foreground/90 font-light leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
