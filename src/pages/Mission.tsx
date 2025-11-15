import { BlogPost } from '@/components/blog-post'
import { Card } from '@/components/ui/card'

const blogPosts = [
  {
    id: 'master-plan',
    title: 'Project Chiranjiv: Our Master Plan',
    subtitle: "From India to the world — building the planet's most inclusive genomic platform.",
    date: '2025',
    content: `## 1. Why We Exist

Your DNA is the most personal data you'll ever own.
Yet today, understanding it is expensive, fragmented, and often locked behind corporate paywalls in other countries.

We founded Chiranjiv on a simple belief:
**"Everyone deserves free, lifetime access to their own genome — and that right should start in India."**

India's 1.4 billion people represent the most genetically diverse population on Earth.
By beginning here, we're not only empowering individuals with knowledge of their biology — we're laying the foundation for a global genomic commons that belongs to humanity, not a handful of corporations.

## 2. The Problem

- Genome sequencing is still unaffordable for most people (₹1 lakh or more).
- Data from Indian and Global South populations is missing from global research.
- Most genomic companies keep user data proprietary, with vague consent and little transparency.

This leaves entire populations under-represented in drug discovery, preventive medicine, and nutrition science.
Chiranjiv aims to change that — ethically, at scale, and starting right here.

## 3. The Plan

**Phase 1 — Free Access for Every Individual**
We provide free DNA collection kits and full-genome sequencing for early participants.
Your data is encrypted, stored in India, and co-governed by you.
You can access it, delete it, or choose how it's used. Always.

**Phase 2 — Personalized Insights That Work for You**
From your genome, we generate actionable reports: nutrition, fitness, longevity, and preventive-health guidance.
Many are free; premium options are affordable.
Our focus: insights that improve your life — not extract your data.

**Phase 3 — The Indian Genome Cloud**
As participation grows, anonymized data (with your consent) fuels breakthroughs in drug discovery, AI health models, and public-health policy.
All usage is logged, reviewed by an independent ethics board, and stored within Indian data centers.

**Phase 4 — Global Expansion**
Once the model is proven and trusted in India, we will extend the platform worldwide — creating a privacy-first, ethically sourced, global genomic infrastructure.
An Indian innovation, shared with the world.

## 4. How We Sustain It

1. Falling sequencing costs make free access feasible.
2. Optional premium reports and supplement subscriptions fund operations.
3. Research partnerships with pharma, biotech, and universities generate sustainable revenue under strict data-use policies.

**No personal data is sold. Ever.**
We grow through trust, transparency, and technology — not exploitation.

## 5. Our Core Principles

1. **Your data, your control.**
2. **Transparency by design:** every access logged, every consent revocable.
3. **Data stays sovereign:** stored within India, governed by Indian law.
4. **Science for all:** insights and innovations flow back to society.
5. **Built in India, open to the world.**

## 6. The Future We See

Imagine a world where:
- Preventive healthcare is tailored to your exact genome.
- Nutrition companies craft food around your biology.
- Pharma researchers design drugs that work for our genetic diversity.
- Nations collaborate on genomic research without giving up data sovereignty.

That future starts in India — but it doesn't end here.

## 7. Join the Founding Wave

By joining Chiranjiv today, you become part of a movement to democratize genomics for the entire planet.
You'll help prove that large-scale scientific progress can be free, ethical, and globally inclusive — with India leading the way.

**"Your DNA. Your Future. Free Forever."**
From India — for the world.

— The Chiranjiv Founding Team`,
  },
]

export default function Mission() {
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
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-foreground mb-4 text-balance tracking-tight leading-[1.1]">
            Our Mission
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-balance font-light">
            Building the future of genomics, one person at a time
          </p>
        </div>

        {/* Mission Content Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {blogPosts.map((post) => (
              <BlogPost 
                key={post.id} 
                title={post.title} 
                subtitle={post.subtitle} 
                date={post.date} 
                content={post.content}
                variant="embedded"
              />
            ))}
          </Card>
        </div>
      </div>
    </section>
  )
}


