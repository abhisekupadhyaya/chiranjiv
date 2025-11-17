import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '@/components/home/hero'
import { ChooseYourStep } from '@/components/home/choose-your-step'
import { Waitlist } from '@/components/home/waitlist'
import { HowItWorks } from '@/components/home/how-it-works'
import { WhyChiranjiv } from '@/components/home/why-chiranjiv'
import { IndiaToWorld } from '@/components/home/india-to-world'
import { PrivacyTrust } from '@/components/home/privacy-trust'
import { FloatingCta } from '@/components/home/floating-cta'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    // Handle hash scrolling when component mounts or hash changes
    const hash = location.hash || window.location.hash
    if (hash) {
      const hashId = hash.replace('#', '')
      const element = document.getElementById(hashId)
      if (element) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 150)
      }
    }
  }, [location.hash, location.pathname])

  return (
    <div className="home-edge relative pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-gradient-to-b from-background via-background to-background/95">
      <Hero />
      <Waitlist />
      <ChooseYourStep />
      <WhyChiranjiv />
      <HowItWorks />
      <IndiaToWorld />
      <PrivacyTrust />
      <FloatingCta />
    </div>
  )
}


