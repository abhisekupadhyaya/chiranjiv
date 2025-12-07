import Marquee from 'react-fast-marquee'

const features = [
  "Personalized fitness & nutrition insights",
  "Your energy, metabolism & recovery decoded",
  "Genetics-based sleep & stress guidance",
  "Immunity & inflammation tendencies",
  "Family health insights",
  "Lifetime data control"
]

export function FeaturesMarquee() {
  return (
    <section className="w-full border-y border-border/30 bg-background/60 backdrop-blur-sm py-1 sm:py-1 overflow-hidden">
      <div 
        className="w-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
        }}
      >
        <Marquee gradient={false} speed={35} className="py-1">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <span className="text-base sm:text-lg md:text-xl font-light tracking-wide text-foreground/90 mx-6 sm:mx-8 md:mx-12 whitespace-nowrap">
                {feature}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
