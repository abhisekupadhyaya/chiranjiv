import { Suspense, lazy } from "react"
import { Hero } from "@/components/home/Hero"

// Lazy load components to improve initial page load
const Insights = lazy(() => 
  import("@/components/home/Insights").then(module => ({ default: module.Insights }))
)

const GenomicStats = lazy(() => 
  import("@/components/home/GenomicStats").then(module => ({ default: module.GenomicStats }))
)

const DNAStory = lazy(() => 
  import("@/components/home/DNAStory").then(module => ({ default: module.DNAStory }))
)

const WhyFree = lazy(() => 
  import("@/components/home/WhyFree").then(module => ({ default: module.WhyFree }))
)

const HowItWorks = lazy(() => 
  import("@/components/home/HowItWorks").then(module => ({ default: module.HowItWorks }))
)

const YourDNA = lazy(() => 
  import("@/components/home/YourDNA").then(module => ({ default: module.YourDNA }))
)

function Home() {
  return (
    <main className="w-full pb-16 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Hero />
      </div>
      <Suspense fallback={<div className="py-16 sm:py-24 text-center text-foreground">Loading...</div>}>
        <Insights />
        <GenomicStats />
        <DNAStory />
        <WhyFree />
        <HowItWorks />
        <YourDNA />
      </Suspense>
    </main>
  )
}

export default Home
