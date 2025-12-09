import { Card } from "@/components/ui/card"

export default function Mission() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      {/* Fixed Full-Screen Background Overlay - Very Subtle Tint */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-primary/2 via-secondary/2 to-accent/2 pointer-events-none" />
      
      {/* Floating Blobs - Vibrant and Distinct */}
      <div className="fixed top-1/4 left-[60%] w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[200px] animate-float pointer-events-none z-0" />
      <div 
        className="fixed bottom-1/4 right-0 w-[50rem] h-[50rem] bg-primary/10 rounded-full blur-[200px] animate-float pointer-events-none z-0"
        style={{ animationDelay: '2s' }} 
      />

      <section className="relative pt-24 sm:pt-32 pb-20 sm:pb-28">
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-medium tracking-tight text-neutral-200 sm:text-5xl md:text-6xl mb-6">
              Our Mission
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 text-balance leading-relaxed font-light">
              Building the future of genomics, one person at a time
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <Card className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/50 p-6 shadow-lg shadow-black/5 backdrop-blur-md sm:p-8 md:p-10">
              {/* Glass highlight effect on top edge */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
              
              <div className="space-y-16">
                
                {/* Mission Header inside Card */}
                <div className="border-b border-neutral-1000/50 pb-10">
                  <p className="text-sm font-medium text-primary-600 mb-3 uppercase tracking-wider">
                    2025
                  </p>
                  <h2 className="text-3xl font-medium tracking-tight text-neutral-200 mb-4 sm:text-4xl">
                    Project Chiranjiv: Our Master Plan
                  </h2>
                  <p className="text-lg text-neutral-600 font-light leading-relaxed sm:text-xl">
                    From India to the world — building the planet's most inclusive genomic platform.
                  </p>
                </div>

                {/* 1. Why We Exist */}
                <section>
                  <h2 className="text-2xl font-semibold text-neutral-200 mb-6">1. Why We Exist</h2>
                  <div className="space-y-4 text-base font-light leading-relaxed text-neutral-600">
                    <p>
                      Your DNA is the most personal data you'll ever own.
                    </p>
                    <p>
                      Yet today, understanding it is expensive, fragmented, and often locked behind corporate paywalls in other countries.
                    </p>
                    <p>
                      We founded Chiranjiv on a simple belief:
                    </p>
                    <p className="font-medium text-neutral-200">
                      Everyone deserves a personalised health, wellness and longevity plan based on their own genome, and that right should start in India.
                    </p>
                    <p>
                      India's 1.4 billion people represent the most genetically diverse population on Earth.
                    </p>
                    <p>
                      By beginning here, we're not only empowering individuals with knowledge of their biology — we're laying the foundation for a global genomic commons that belongs to humanity, not a handful of corporations.
                    </p>
                  </div>
                </section>

                {/* 2. The Problem */}
                <section>
                  <h2 className="text-2xl font-semibold text-neutral-200 mb-6">2. The Problem</h2>
                  <div className="space-y-4 text-base font-light leading-relaxed text-neutral-600">
                    <ul className="list-disc list-outside ml-6 space-y-2">
                      <li>Genome sequencing is still unaffordable for most people (₹1 lakh or more).</li>
                      <li>Data from Indian and Global South populations is missing from global research.</li>
                      <li>Most genomic companies keep user data proprietary, with vague consent and little transparency.</li>
                    </ul>
                    <p>
                      This leaves entire populations under-represented in drug discovery, preventive medicine, and nutrition science.
                    </p>
                    <p>
                      Chiranjiv aims to change that — ethically, at scale, and starting right here.
                    </p>
                  </div>
                </section>

                {/* 3. The Plan */}
                <section>
                  <h2 className="text-2xl font-semibold text-neutral-200 mb-6">3. The Plan</h2>
                  <div className="space-y-8 text-base font-light leading-relaxed text-neutral-600">
                    
                    <div className="pl-6 border-l-2 border-primary-300/30">
                      <h3 className="text-lg font-medium text-primary-600 mb-3">Phase 1 — Free Genome Testing and Health reports for Early Registrants</h3>
                      <div className="space-y-2">
                        <p>We provide free DNA collection kits and full-genome sequencing for early participants.</p>
                        <p>Your data is encrypted, stored in India, and co-governed by you.</p>
                        <p>You can access it, delete it, or choose how it's used. Always.</p>
                      </div>
                    </div>

                    <div className="pl-6 border-l-2 border-primary-300/30">
                      <h3 className="text-lg font-medium text-primary-600 mb-3">Phase 2 — Personalized Insights That Work for You</h3>
                      <div className="space-y-2">
                        <p>From your genome, we generate actionable reports: nutrition, fitness, longevity, and preventive-health guidance.</p>
                        <p>Many are free; premium options are affordable.</p>
                        <p>Our focus: insights that improve your life — not extract your data.</p>
                      </div>
                    </div>

                    <div className="pl-6 border-l-2 border-primary-300/30">
                      <h3 className="text-lg font-medium text-primary-600 mb-3">Phase 3 — The Indian Genome Cloud</h3>
                      <div className="space-y-2">
                        <p>As participation grows, anonymized data (with your consent) fuels breakthroughs in drug discovery, AI health models, and public-health policy.</p>
                        <p>All usage is logged, reviewed by an independent ethics board, and stored within Indian data centers.</p>
                      </div>
                    </div>

                    <div className="pl-6 border-l-2 border-primary-300/30">
                      <h3 className="text-lg font-medium text-primary-600 mb-3">Phase 4 — Global Expansion</h3>
                      <div className="space-y-2">
                        <p>Once the model is proven and trusted in India, we will extend the platform worldwide — creating a privacy-first, ethically sourced, global genomic infrastructure.</p>
                        <p>An Indian innovation, shared with the world.</p>
                      </div>
                    </div>

                  </div>
                </section>

                {/* 4. Core Principles */}
                <section>
                  <h2 className="text-2xl font-semibold text-neutral-200 mb-6">4. Our Core Principles</h2>
                  <div className="space-y-4 text-base font-light leading-relaxed text-neutral-600">
                    <div className="space-y-3">
                      <p className="flex gap-3">
                        <span className="font-semibold text-primary-600 flex-shrink-0">1.</span>
                        <span>Your data, your control.</span>
                      </p>
                      <p className="flex gap-3">
                        <span className="font-semibold text-primary-600 flex-shrink-0">2.</span>
                        <span>Transparency by design: every access logged, every consent revocable.</span>
                      </p>
                      <p className="flex gap-3">
                        <span className="font-semibold text-primary-600 flex-shrink-0">3.</span>
                        <span>Data stays sovereign: stored within India, governed by Indian law.</span>
                      </p>
                      <p className="flex gap-3">
                        <span className="font-semibold text-primary-600 flex-shrink-0">4.</span>
                        <span>Science for all: insights and innovations flow back to society.</span>
                      </p>
                      <p className="flex gap-3">
                        <span className="font-semibold text-primary-600 flex-shrink-0">5.</span>
                        <span>Built in India, open to the world.</span>
                      </p>
                    </div>
                  </div>
                </section>

                {/* 5. The Future We See */}
                <section>
                  <h2 className="text-2xl font-semibold text-neutral-200 mb-6">5. The Future We See</h2>
                  <div className="space-y-4 text-base font-light leading-relaxed text-neutral-600">
                    <p>Imagine a world where:</p>
                    <ul className="list-disc list-outside ml-6 space-y-2">
                      <li>Preventive healthcare is tailored to your exact genome.</li>
                      <li>Nutrition companies craft food around your biology.</li>
                      <li>Pharma researchers design drugs that work for our genetic diversity.</li>
                      <li>Nations collaborate on genomic research without giving up data sovereignty.</li>
                    </ul>
                    <p>
                      That future starts in India — but it doesn't end here.
                    </p>
                  </div>
                </section>

                {/* 6. Join the Founding Wave */}
                <section className="mt-8">
                  <h2 className="text-2xl font-semibold text-neutral-200 mb-6">6. Join the Founding Wave</h2>
                  <div className="space-y-6 text-base font-light leading-relaxed text-neutral-600">
                    <p>
                      By joining Chiranjiv today, you become part of a movement to democratize genomics for the entire planet.
                    </p>
                    <p>
                      You'll help prove that large-scale scientific progress can be inclusive, ethical, and outcome of that can be personalised — with India leading the way.
                    </p>
                    <blockquote className="text-lg font-medium text-neutral-400 italic pl-4 border-l-4 border-primary-300/50 my-6">
                      "Decrypt your DNA for a fitter, healthier, better you."
                    </blockquote>
                    <div className="mt-4">
                      <p>From India — for the world.</p>
                      <p className="mt-2 text-neutral-400">— The Chiranjiv Founding Team</p>
                    </div>
                  </div>
                </section>

              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
