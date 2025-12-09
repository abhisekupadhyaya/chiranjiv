import { memo } from "react";
import { Button } from "@/components/ui/button";

export const HowItWorks = memo(function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Join the Waitlist",
      description: "Secure your free genome test."
    },
    {
      number: "02",
      title: "At-Home Sample Collection",
      description: "We send a professional to collect your saliva sample."
    },
    {
      number: "03",
      title: "Get Your Insights",
      description: "Receive your personalized DNA report in the Chiranjiv app."
    }
  ];

  return (
    <section className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Centered Header */}
        <div className="mb-16 text-center md:mb-24">
          <h2 className="mb-4 text-3xl font-medium tracking-tight text-neutral-200 sm:text-4xl lg:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground sm:text-xl">
            Three simple steps to unlock your genetic insights
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/30 bg-white/20 p-8 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-white/50 hover:bg-white/30 hover:shadow-xl hover:shadow-black/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Large Number */}
                <span className="mb-6 font-mono text-6xl font-bold tracking-tighter bg-gradient-to-br from-primary-500 to-secondary-500 bg-clip-text text-transparent opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 group-hover:from-primary-400 group-hover:to-secondary-400 origin-left">
                  {step.number}
                </span>
                
                <h3 className="mb-3 text-xl font-semibold text-neutral-200">
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-16 flex justify-center sm:mt-24">
          <Button size="lg" className="h-12 px-8 text-base">
            Join Early Access
          </Button>
        </div>

      </div>
    </section>
  );
});
