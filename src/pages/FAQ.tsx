import { Card } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqs = [
  { 
    question: 'Why is this free?', 
    answer: "We are offering early registrants and champions (top referrers) free testing and insights, We want to enroll enough champions of our cause and give them incentive to lead this revolution. Even after the first phase, the testing will be heavily subsidised as we believe genomic data is too important to ask users to pay huge sums for. We want to build the largest Indian genomic database — which benefits everyone, including you. We will sustain ourselves through ethical research partnerships and optional premium features for users (coming soon).",
    category: 'basics'
  },
  { 
    question: 'How accurate is the test?', 
    answer: 'We use clinical-grade whole genome sequencing (WGS), the gold standard in genomics. This reads all 3 billion base pairs of your DNA — far more comprehensive than ancestry or genotyping tests.',
    category: 'basics'
  },
  { 
    question: 'What can I learn from my genome?', 
    answer: "You'll get insights into disease risks (e.g., heart disease, diabetes), drug responses, carrier status for genetic conditions, ancestry, and wellness traits (e.g., nutrition, fitness). We'll keep updating your dashboard as science evolves.",
    category: 'basics'
  },
  { 
    question: 'Is this only for Indians?', 
    answer: "We're starting with India because it's the most genetically diverse and underrepresented population. But we plan to expand globally. If you're of Indian descent living abroad, you're welcome to join!",
    category: 'basics'
  },
  { 
    question: 'How is my data protected?', 
    answer: 'Your genome is encrypted end-to-end, stored in Indian data centers, and accessible only by you. We never sell or share your data with third parties. You can revoke research consent or delete your data anytime.',
    category: 'governance'
  },
  { 
    question: "What does 'co-ownership' mean?", 
    answer: "As a Founding Genome Member, you co-own the collective Indian genomic database we're building. You'll have a say in how it's used, and if it generates value (e.g., through licensing to ethical researchers), you share in that value.",
    category: 'governance'
  },
]

export default function FAQ() {
  return (
    <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      
      {/* Floating animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" 
        style={{ animationDelay: '2s' }}
      />
      <div 
        className="absolute top-1/2 right-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" 
        style={{ animationDelay: '4s' }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 backdrop-blur-sm border border-border/50 mb-5 sm:mb-7">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-glow" />
            <span className="text-[11px] sm:text-xs font-light text-muted-foreground tracking-wide">
              Answers for Founding Genome Members
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-foreground mb-4 text-balance tracking-tight leading-[1.1]">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed font-light max-w-2xl mx-auto">
            Everything you need to know about Project Chiranjiv
          </p>
        </div>

        {/* FAQ Content Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
              {faqs.map((faq, index) => {
                const isFirstInCategory = index === 0 || faqs[index - 1].category !== faq.category
                const categoryLabel = faq.category === 'basics' ? 'The Basics' : 'Governance & Data'
                
                return (
                  <div key={index}>
                    {isFirstInCategory && index > 0 && (
                      <div className="pt-4 pb-2 border-t border-border/30 mt-2">
                        <h3 className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.2em] text-primary/70 px-4">
                          {categoryLabel}
                        </h3>
                      </div>
                    )}
                    {isFirstInCategory && index === 0 && (
                      <div className="pb-2">
                        <h3 className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.2em] text-primary/70 px-4">
                          {categoryLabel}
                        </h3>
                      </div>
                    )}
                    <AccordionItem 
                      value={`item-${index}`}
                      className="border-0"
                    >
                      <AccordionTrigger 
                        className="px-4 sm:px-5 py-4 hover:bg-muted/40 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:no-underline"
                      >
                        <span className="text-base sm:text-lg font-medium text-foreground tracking-tight text-left pr-4">
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 sm:px-5 pb-4 sm:pb-5">
                        <div className="border-t border-border/40 mt-1 pt-3">
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
                            {faq.answer}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                )
              })}
            </Accordion>
          </Card>
        </div>
      </div>
    </section>
  )
}

