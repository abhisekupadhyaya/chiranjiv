const features = [
  {
    title: "Personalized Fitness & Nutrition Insights",
    description: "Tailored recommendations based on your unique genetic profile",
    barColor: "bg-primary-600",
  },
  {
    title: "Your Energy, Metabolism & Recovery Decoded",
    description: "Understand your body's energy patterns and optimize performance",
    barColor: "bg-accent-500",
  },
  {
    title: "Genetics-Based Sleep & Stress Guidance",
    description: "Improve sleep quality with science-backed personalized strategies",
    barColor: "bg-secondary-600",
  },
  {
    title: "Immunity & Inflammation Tendencies",
    description: "Proactive insights to strengthen your immune system",
    barColor: "bg-primary-600",
  },
  {
    title: "Family Health Insights",
    description: "Understand genetic patterns across your family",
    barColor: "bg-accent-500",
  },
  {
    title: "Lifetime Data Control",
    description: "Your data, your rules - complete ownership and privacy",
    barColor: "bg-secondary-600",
  },
]

export function Insights() {
  return (
    <section className="bg-neutral-1200/50 py-16 sm:py-24 relative">
      {/* Subtle background blobs for glass effect depth */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary-300/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-secondary-300/10 rounded-full blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/40 p-6 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/60 hover:shadow-xl hover:shadow-black/10 sm:p-8"
            >
              {/* Glass highlight effect on top edge */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
              
              <div className={`mb-6 h-2 w-12 rounded-full ${feature.barColor} bg-gradient-to-r from-transparent via-white/20 to-transparent`} />
              
              <h3 className="mb-3 text-lg font-semibold leading-tight text-neutral-200 group-hover:text-neutral-100 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed group-hover:text-neutral-500 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
