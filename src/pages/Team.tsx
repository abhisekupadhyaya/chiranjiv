import { Card } from '@/components/ui/card'

export default function Team() {
  return (
    <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
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

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-foreground mb-4 text-balance tracking-tight leading-[1.1]">
            Our Team
          </h1>
        </div>

        {/* Team Content Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                At Chiranjiv, our founding team comprises experienced serial entrepreneurs, health tech innovators, genome science experts, and passionate advocates for accessible healthcare. United by a shared vision, we are dedicated to democratizing genomic-driven wellness for all Indians.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                We believe everyone deserves the opportunity to take control of their health. To accelerate this mission, we are launching a special initiative: top referring users will receive complimentary full genetic sequencing and a personalized suite of wellness reports. This initiative empowers individuals to understand their unique genetic makeup, make informed health decisions, and lead healthier, longer lives.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                Together, we are ushering in a new era of preventive healthcare—where knowledge, innovation, and accessibility come together for the benefit of everyone.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

