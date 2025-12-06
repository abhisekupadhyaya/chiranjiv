import { Card } from '@/components/ui/card'

export function WhyFree() {
  const features = [
    {
      title: "Built by Scientists & Experts",
      description: "Founded by longevity experts and genomic researchers with decades of experience."
    },
    {
      title: "India-First Genomic Database",
      description: "Building the largest repository of Indian genetic data for better health insights."
    },
    {
      title: "End-to-End Encryption",
      description: "Your genetic data is encrypted from collection until it reaches your dashboard."
    },
    {
      title: "Data Stored in India",
      description: "All data stored exclusively in India, ensuring data sovereignty and compliance."
    }
  ];

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background elements matching other sections */}
      <div className="absolute inset-0 bg-gradient-to-tl from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Centered Header */}
          <div className="mb-12 text-center md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-foreground mb-4 text-balance tracking-tight leading-[1.1]">
              Why Is This <span className="text-primary font-normal">₹1.5 Lakh</span> Test Free?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mx-auto max-w-2xl text-pretty leading-relaxed font-light">
              Because India deserves to be represented in global health science.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 items-stretch">
            
            {/* Left Column: Manifesto Card */}
            <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Card className="relative h-full overflow-hidden rounded-3xl border border-border/50 bg-card/80 p-8 sm:p-10 shadow-xl glass-backdrop backdrop-blur-md group">
                {/* Background Accents */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
                
                <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                  <div>
                    <h3 className="mb-6 text-2xl sm:text-3xl font-light leading-tight text-foreground text-balance">
                      We're building the <span className="font-normal text-primary">largest Indian genomic reference database</span>.
                    </h3>
                    <p className="text-lg leading-relaxed text-muted-foreground font-light">
                      Early users get full access at no cost — including lifetime wellness insights.
                    </p>
                  </div>

                  <div className="space-y-8 mt-auto">
                    {/* Trust Signals Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 pt-4 border-t border-border/30">
                      {[
                        { title: "No Ads", desc: "Your data is never sold" },
                        { title: "No Insurance", desc: "No third-party sharing" },
                        { title: "No Hidden Fees", desc: "Always transparent" }
                      ].map((item) => (
                        <div key={item.title} className="relative">
                          <h4 className="text-base font-medium text-foreground">{item.title}</h4>
                          <p className="mt-1 text-sm text-muted-foreground font-light">{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border/30 pt-6 text-center">
                      <p className="text-base font-medium text-primary/80 tracking-wide">
                        Just science-backed wellness for everyone.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column: Feature Grid */}
            <div className="grid gap-5 sm:grid-cols-2 content-center">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
                  style={{ animationDelay: `${(index + 1) * 150}ms` }}
                >
                  <Card className="group h-full relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-background/40 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    <div className="relative z-10">
                      <h3 className="mb-2 text-lg font-medium text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground font-light">
                        {feature.description}
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
