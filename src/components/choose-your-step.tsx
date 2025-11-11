import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ChooseYourStep() {
  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <section className="relative py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-balance">Choose Your First Step</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-lg p-8 border border-border/50 hover:shadow-xl transition-shadow">
            <div className="absolute top-6 right-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">LIMITED EARLY ACCESS</span>
            </div>
            <div className="mb-6">
              <div className="w-full h-32 mb-6 rounded-lg bg-gradient-to-br from-indigo-50 to-teal-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-white rounded-full shadow-md flex items-center justify-center">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Genome collection kit</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Basic Health & Ancestry Report</h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg text-muted-foreground line-through">₹25,000</span>
                <span className="text-xl font-bold text-indigo-600">Free for Early Access Members</span>
              </div>
              <p className="text-muted-foreground mb-6">Start with core ancestry and foundational wellness insights. A perfect on-ramp to your genome.</p>
            </div>
            <ul className="space-y-3 mb-8">
              {['Ancestry overview (India + global context)','Foundational wellness markers (non-diagnostic)','Starter nutrition pointers','Data ownership & control dashboard','Downloadable summary (PDF)'].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button onClick={scrollToWaitlist} className="w-full">Earn Early Access</Button>
          </div>
          <div className="relative bg-white rounded-2xl shadow-lg p-8 border border-border/50 hover:shadow-xl transition-shadow">
            <div className="absolute top-6 right-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">Coming in cohorts</span>
            </div>
            <div className="mb-6">
              <div className="w-full h-32 mb-6 rounded-lg bg-gradient-to-br from-violet-50 to-teal-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-white rounded-full shadow-md flex items-center justify-center">
                    <svg className="w-8 h-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Personalized report preview</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Advanced Ancestry & Personalized Health</h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold">₹40,000</span>
              </div>
              <p className="text-muted-foreground mb-6">Go deeper with regional ancestry resolution and personalized health guidance calibrated for Indian genomes.</p>
            </div>
            <ul className="space-y-3 mb-8">
              {['Fine-grained regional ancestry (as references expand)','Personalized nutrition plan & metabolism insights','Fitness & recovery tendencies','Early risk indicators (non-diagnostic)','Medication & sensitivity flags (where supported)','Priority updates as new models launch','Export to your healthcare provider'].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full bg-transparent">See What&apos;s Included</Button>
          </div>
        </div>
        <div className="mt-12 max-w-4xl mx-auto space-y-2 text-center text-sm text-muted-foreground">
          <p>• No cost for early participants; limited slots based on queue position.</p>
          <p>• Reports are non-diagnostic and for informational purposes.</p>
          <p>• Availability may vary by region as cohorts open.</p>
        </div>
      </div>
    </section>
  )
}


