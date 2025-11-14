import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '@/components/hero'
import { Waitlist } from '@/components/waitlist'
import { PriorityQueue } from '@/components/priority-queue'
import { ChooseYourStep } from '@/components/choose-your-step'
import { HowItWorks } from '@/components/how-it-works'
import { WhyChiranjiv } from '@/components/why-chiranjiv'
import { IndiaToWorld } from '@/components/india-to-world'
import { PrivacyTrust } from '@/components/privacy-trust'

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
    <div className="home-edge">
      <Hero />
      <Waitlist />
      <PriorityQueue />
      <ChooseYourStep />
      <HowItWorks />
      <WhyChiranjiv />
      <IndiaToWorld />
      <PrivacyTrust />
    </div>
  )
}


