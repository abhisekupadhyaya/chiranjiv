import { memo } from "react";
import { Button } from "@/components/ui/button";

export const HowItWorks = memo(function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Request Access",
      description: "Sign up and secure your spot for a free genome test. No payment, no commitment — just your interest.",
      barColor: "bg-primary-600",
      numberColorClass: "text-primary-600",
    },
    {
      number: "02",
      title: "At-Home Sample Collection",
      description: "We send a professional to your home to collect a simple saliva sample. Takes under 5 minutes, completely non-invasive.",
      barColor: "bg-secondary-600",
      numberColorClass: "text-secondary-600",
    },
    {
      number: "03",
      title: "Get Your Insights",
      description: "Receive your personalized DNA report in the Chiranjiv app — covering metabolism, fitness, sleep, immunity, and more.",
      barColor: "bg-accent-500",
      numberColorClass: "text-accent-500",
    },
    {
      number: "04",
      title: "Lifetime Updates",
      description: "Your genome doesn't change — but science does. As new research links gene variants to conditions, your report updates automatically. What's unknown today becomes an insight tomorrow.",
      barColor: "bg-purple-500",
      numberColorClass: "text-purple-500",
    },
  ];

  return (
    <section id="how-it-works" className="relative pt-4 pb-12 sm:pt-8 sm:pb-20 overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary-300/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/4" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Centered Header */}
        <div className="mb-6 text-center md:mb-8">
          <h2 className="mb-4 text-3xl font-medium tracking-tight text-neutral-200 sm:text-4xl lg:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground sm:text-xl">
            Four simple steps to unlock your genetic insights
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/30 bg-white/20 p-5 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-white/50 hover:bg-white/30 hover:shadow-xl hover:shadow-black/10 sm:p-6"
            >
              {/* Top Color Band */}
              <div className={`absolute inset-x-0 top-0 h-2 ${step.barColor}`} />
              <div className="absolute inset-x-0 top-2 h-px bg-gradient-to-r from-transparent via-neutral-200/20 to-transparent opacity-50" />

              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative z-10 flex flex-col h-full pt-2">
                <div className="mb-2 flex min-h-[2.75rem] items-start gap-2.5">
                  <span className={`font-mono text-xl font-black tracking-tight ${step.numberColorClass} transition-all duration-300 group-hover:opacity-90`}>
                    {step.number}
                  </span>
                  <h3 className="text-lg font-semibold text-neutral-200 leading-tight">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-10 flex justify-center sm:mt-16">
          <Button 
            size="lg" 
            className="h-12 px-8 text-base"
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Request Access
          </Button>
        </div>

      </div>
    </section>
  );
});
