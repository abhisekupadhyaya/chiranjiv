import { Hero } from '@/components/hero'
import { Waitlist } from '@/components/waitlist'
import { PriorityQueue } from '@/components/priority-queue'
import { ChooseYourStep } from '@/components/choose-your-step'
import { HowItWorks } from '@/components/how-it-works'
import { WhyChiranjiv } from '@/components/why-chiranjiv'
import { IndiaToWorld } from '@/components/india-to-world'
import { PrivacyTrust } from '@/components/privacy-trust'
import { FAQ } from '@/components/faq'

export default function Home() {
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
      <FAQ />
    </div>
  )
}


