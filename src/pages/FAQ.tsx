import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqs = [
  {
    question: 'What is genome sequencing?',
    answer: 'Genome sequencing is a technology that reads your entire DNA, revealing your unique genetic makeup. This information can provide important insights into your health, traits, and disease risks.',
    category: 'sequencing_basics'
  },
  {
    question: 'How is genome sequencing different from ancestry or trait tests?',
    answer: 'Genome sequencing analyzes all your DNA, whereas ancestry or trait tests look at selected portions. Genome sequencing provides much more detailed and actionable health information.',
    category: 'sequencing_basics'
  },
  {
    question: 'What is genetic information used for?',
    answer: 'It can help predict disease risk, guide lifestyle choices, inform family planning, and help healthcare providers personalize medical care.',
    category: 'sequencing_basics'
  },
  {
    question: 'How can genome sequencing help improve my health?',
    answer: 'It identifies genetic risks for certain diseases, shows how you might respond to medications, and suggests preventive lifestyle changes, all based on your unique biology.',
    category: 'health_wellness'
  },
  {
    question: 'Can genome sequencing increase my lifespan?',
    answer: 'Knowledge of your risks enables early interventions, which may help prevent disease and promote a longer, healthier life.',
    category: 'health_wellness'
  },
  {
    question: 'How does genome sequencing enable personalized medicine?',
    answer: 'It helps doctors select the most effective treatments and drugs for you, while minimizing side effects, based on your genetic profile.',
    category: 'personalized_medicine'
  },
  {
    question: 'Are genetic recommendations accurate and useful?',
    answer: 'While genetics provides important probabilities, insights are best used together with personal health history and lifestyle factors.',
    category: 'personalized_medicine'
  },
  {
    question: 'What is exome sequencing?',
    answer: 'Exome sequencing looks at only the protein-coding regions of genes (about 1–2% of DNA), where many disease-causing mutations occur.',
    category: 'exome_vs_wgs'
  },
  {
    question: 'What is whole genome sequencing (WGS)?',
    answer: 'WGS reads your entire DNA, including coding and non-coding regions, providing the most comprehensive DNA analysis available.',
    category: 'exome_vs_wgs'
  },
  {
    question: 'How does WGS differ from exome sequencing?',
    answer: 'WGS captures all genetic information—both within and outside genes—offering more complete insights. Exome sequencing is limited to a small part of the genome.',
    category: 'exome_vs_wgs'
  },
  {
    question: 'What added value does whole genome sequencing provide?',
    answer: 'It detects rare or complex genetic variations, regulatory genome regions, and markers influencing drug responses or wellness—insights often missed by exome or targeted tests.',
    category: 'exome_vs_wgs'
  },
  {
    question: 'Is all my DNA relevant for health, or just the exome?',
    answer: 'Many important genetic changes lie outside the exome, affecting regulation of genes, disease risks, and drug responses.',
    category: 'exome_vs_wgs'
  },
  {
    question: 'Why is having my whole genome sequenced important for my children and descendants?',
    answer: 'Your genetic information helps identify hereditary risks that might affect your family and future generations, enabling better health planning.',
    category: 'future_generations'
  },
  {
    question: 'Will sequencing my genome now help my family in the future?',
    answer: 'Yes. Your genome data remains useful for life; as science advances, new disease links or insights can be identified from your existing results.',
    category: 'future_generations'
  },
  {
    question: 'Is whole genome sequencing a one-time investment?',
    answer: 'Once your genome is sequenced, your data remains valid for life and can be re-analyzed whenever new discoveries arise.',
    category: 'future_generations'
  },
  { 
    question: 'Why is this free for early users?', 
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
  // Merged governance, process_privacy, and long_term_value into a single bottom category
  { 
    question: 'How is my data protected?', 
    answer: 'Your genome is encrypted end-to-end, stored in Indian data centers, and accessible only by you. We never sell or share your data with third parties. You can revoke research consent or delete your data anytime.',
    category: 'process_privacy'
  },
  { 
    question: "What does 'co-ownership' mean?", 
    answer: "As a Founding Genome Member, you co-own the collective Indian genomic database we're building. You'll have a say in how it's used, and if it generates value (e.g., through licensing to ethical researchers), you share in that value.",
    category: 'process_privacy'
  },
  {
    question: 'How is my genome sequenced?',
    answer: 'Typically, you provide a saliva or blood sample, which is processed in a lab to read and interpret your DNA.',
    category: 'process_privacy'
  },
  {
    question: 'How is my data protected?',
    answer: 'We use strict encryption and privacy controls. Only you control who accesses or shares your genomic data.',
    category: 'process_privacy'
  },
  {
    question: 'Can my results be shared with my doctor?',
    answer: 'Yes, with your permission, your data can be securely shared with healthcare providers for more informed medical care.',
    category: 'process_privacy'
  },
  {
    question: 'Could my genetic data affect insurance or employment?',
    answer: 'Most countries have laws protecting against genetic discrimination, but you should always check your local regulations.',
    category: 'process_privacy'
  },
  {
    question: 'Can children get genome sequencing?',
    answer: 'Yes, but parental consent is required, and results need expert medical interpretation.',
    category: 'process_privacy'
  },
  {
    question: 'Will I get updated information as research advances?',
    answer: 'Yes. New health discoveries can add value to your original genome data without needing additional testing.',
    category: 'process_privacy'
  },
  {
    question: 'Can I use my genetic data for future planning?',
    answer: 'Absolutely. Insights about inherited conditions, carrier status, and personal traits can help with family planning, proactive health management, and monitoring.',
    category: 'process_privacy'
  },
]

const categoryLabels: Record<string, string> = {
  basics: 'Our Offerings',
  sequencing_basics: 'Understanding Genome Sequencing Basics',
  health_wellness: 'Health, Longevity & Wellness',
  personalized_medicine: 'Personalized Medicine',
  exome_vs_wgs: 'Exome vs. Whole Genome Sequencing',
  future_generations: 'Importance for Future Generations',
  process_privacy: 'Process, Privacy & Data Use',
}

export default function FAQ() {
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

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16">
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-200 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-neutral-600 font-light">
            Everything you need to know about Project Chiranjiv
          </p>
        </div>

        {/* Content Card */}
        <Card className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/50 p-6 sm:p-10 shadow-lg shadow-black/5 backdrop-blur-md">
          {/* Glass highlight effect on top edge */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
          
          <div className="space-y-8">
            <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
              {faqs.map((faq, index) => {
                const isFirstInCategory = index === 0 || faqs[index - 1].category !== faq.category
                const categoryLabel = categoryLabels[faq.category] ?? faq.category
                
                return (
                  <div key={index}>
                    {isFirstInCategory && (
                      <div className={`pb-4 ${index > 0 ? 'pt-8 mt-4' : ''}`}>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-600 mb-2">
                          {categoryLabel}
                        </h3>
                      </div>
                    )}
                    <AccordionItem 
                      value={`item-${index}`}
                      className="border-none"
                    >
                      <AccordionTrigger 
                        className="py-4 hover:no-underline text-left text-base font-medium text-neutral-200"
                      >
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-neutral-600 leading-relaxed font-light">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                )
              })}
            </Accordion>
          </div>
        </Card>
      </div>
    </main>
  )
}
