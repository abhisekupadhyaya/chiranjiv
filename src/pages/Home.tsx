import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '@/components/home/hero'
import { FeaturesMarquee } from '@/components/home/features-marquee'
import { DNAStory } from '@/components/home/dna-story'
import { ChooseYourStep } from '@/components/home/choose-your-step'
import { Waitlist } from '@/components/home/waitlist'
import { HowItWorks } from '@/components/home/how-it-works'
import { WhyChiranjiv } from '@/components/home/why-chiranjiv'
import { WhyFree } from '@/components/home/why-free'
import { IndiaToWorld } from '@/components/home/india-to-world'
import { PrivacyTrust } from '@/components/home/privacy-trust'
import { YourDNA } from '@/components/home/your-dna'
import { FloatingCta } from '@/components/home/floating-cta'

export default function Home() {
  const location = useLocation()
  const [showFloatingCta, setShowFloatingCta] = useState(false)

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

  useEffect(() => {
    // Show floating CTA as soon as user starts scrolling
    const handleScroll = () => {
      // Show CTA if page is scrolled down at all
      if (window.scrollY > 0) {
        setShowFloatingCta(true)
      } else {
        setShowFloatingCta(false)
      }
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll)
    
    // Check initial scroll position
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="home-edge relative pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-gradient-to-b from-background via-background to-background/95">
      <Hero />
      <FeaturesMarquee />
      <DNAStory />
      <ChooseYourStep />
      <Waitlist />
      <WhyChiranjiv />
      <WhyFree />
      <HowItWorks />
      <IndiaToWorld />
      <PrivacyTrust />
      <YourDNA />
      <FloatingCta show={showFloatingCta} />
    </div>
  )
}


