import { Suspense, lazy } from "react"
import { Hero } from "@/components/home/Hero"

// Lazy load components to improve initial page load
const DNAStory = lazy(() => 
  import("@/components/home/DNAStory").then(module => ({ default: module.DNAStory }))
)

const GenomicStats = lazy(() => 
  import("@/components/home/GenomicStats").then(module => ({ default: module.GenomicStats }))
)

const Insights = lazy(() => 
  import("@/components/home/Insights").then(module => ({ default: module.Insights }))
)


const WhyFree = lazy(() => 
  import("@/components/home/WhyFree").then(module => ({ default: module.WhyFree }))
)

const TrustFeatures = lazy(() => 
  import("@/components/home/TrustFeatures").then(module => ({ default: module.TrustFeatures }))
)

const HowItWorks = lazy(() => 
  import("@/components/home/HowItWorks").then(module => ({ default: module.HowItWorks }))
)

const YourDNA = lazy(() => 
  import("@/components/home/YourDNA").then(module => ({ default: module.YourDNA }))
)

function Home() {
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

      {/* Content Container */}
      <div className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Hero />
        </div>
        <Suspense fallback={<div className="py-16 sm:py-24 text-center text-foreground">Loading...</div>}>
          <DNAStory />
          <GenomicStats />
          <Insights />
          <WhyFree />
          <TrustFeatures />
          <HowItWorks />
          <YourDNA />
        </Suspense>
      </div>
    </main>
  )
}

export default Home
