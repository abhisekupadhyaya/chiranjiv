import { Card } from '@/components/ui/card'

const privacyFeatures = [
  { title: 'End-to-End Encryption', description: 'Your genetic data is encrypted from the moment it leaves our lab until it reaches your secure dashboard.', icon: '🔐', color: 'from-blue-500 to-indigo-600', bgColor: 'bg-blue-50' },
  { title: 'Indian Data Centers', description: 'All data stored exclusively in India, complying with local regulations and ensuring data sovereignty.', icon: '🇮🇳', color: 'from-orange-500 to-amber-600', bgColor: 'bg-orange-50' },
  { title: 'User-Controlled Access', description: 'You decide who sees your data. Grant or revoke access to healthcare providers anytime.', icon: '👤', color: 'from-purple-500 to-violet-600', bgColor: 'bg-purple-50' },
  { title: 'Anonymous Research', description: 'Contribute to research without revealing your identity. Your data helps science, not advertisers.', icon: '🔬', color: 'from-teal-500 to-cyan-600', bgColor: 'bg-teal-50' },
]

export function PrivacyTrust() {
  return (
    <section id="privacy" className="py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 text-balance">Your Privacy is Our Priority</h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">We believe your genetic information is the most personal data you have. That&apos;s why we&apos;ve built Chiranjiv with privacy and security at its core.</p>
              <div className="space-y-4">
                {['User-Consented Sharing','Transparent Practices','Right to Delete'].map((title, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {i === 0 && 'Any data sharing only happens with your explicit consent. You\'re always in control.'}
                        {i === 1 && 'Clear, jargon-free privacy policies. You always know what\'s happening with your data.'}
                        {i === 2 && 'Request complete deletion of your data anytime, no questions asked.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {privacyFeatures.map((feature, index) => (
                <Card key={index} className={`p-6 ${feature.bgColor} border-2 border-transparent hover:border-primary/30 hover:shadow-xl transition-all duration-300 group`}>
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <div className={`h-1 w-12 bg-gradient-to-r ${feature.color} rounded-full mb-3`} />
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


