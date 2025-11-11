import { useState } from 'react'
import { Card } from '@/components/ui/card'

const faqs = [
  { question: 'Why is this free?', answer: "We believe genomic data is too important to be locked behind paywalls. By making it free, we're building the largest Indian genomic database — which benefits everyone, including you. We sustain ourselves through ethical research partnerships and optional premium features (coming soon)." },
  { question: 'How is my data protected?', answer: 'Your genome is encrypted end-to-end, stored in Indian data centers, and accessible only by you. We never sell or share your data with third parties. You can revoke research consent or delete your data anytime.' },
  { question: "What does 'co-ownership' mean?", answer: "As a Founding Genome Member, you co-own the collective Indian genomic database we're building. You'll have a say in how it's used, and if it generates value (e.g., through licensing to ethical researchers), you share in that value." },
  { question: 'How accurate is the test?', answer: 'We use clinical-grade whole genome sequencing (WGS), the gold standard in genomics. This reads all 3 billion base pairs of your DNA — far more comprehensive than ancestry or genotyping tests.' },
  { question: 'What can I learn from my genome?', answer: "You'll get insights into disease risks (e.g., heart disease, diabetes), drug responses, carrier status for genetic conditions, ancestry, and wellness traits (e.g., nutrition, fitness). We'll keep updating your dashboard as science evolves." },
  { question: 'Is this only for Indians?', answer: "We're starting with India because it's the most genetically diverse and underrepresented population. But we plan to expand globally. If you're of Indian descent living abroad, you're welcome to join!" },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Frequently Asked Questions</h2>
            <p className="text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed">Everything you need to know about Project Chiranjiv</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-card border-border overflow-hidden">
                <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground pr-4">{faq.question}</h3>
                  <svg className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5">
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


