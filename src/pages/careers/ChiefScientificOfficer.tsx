import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function ChiefScientificOfficer() {
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
              We Are Hiring
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-foreground mb-4 text-balance tracking-tight leading-[1.1]">
            Chief Scientific Officer
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed font-light max-w-2xl mx-auto">
            Genomics, Bioinformatics & AI • Leadership
          </p>
        </div>

        {/* Content Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-10">
              {/* Role Overview */}
              <section>
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light text-foreground mb-4">
                    Role Overview
                  </h3>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed font-light">
                  <p>
                    A Chief Scientific Officer at Chiranjiv shall lead the scientific, bioinformatics, and AI strategy for large-scale Indian genomics, with 15+ years of experience and a strong record in similar leadership roles.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 marker:text-primary/70">
                    <li>Owns the scientific vision and rigor behind Chiranjiv's genomic analysis, health insights, and AI-driven personalization for Indian populations.</li>
                    <li>Senior leadership role, working directly with founders, product, engineering, and external partners (labs, clinicians, researchers).</li>
                    <li>Co-founder role can be considered for the right candidate.</li>
                  </ul>
                </div>
              </section>

              {/* Key Responsibilities */}
              <section>
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light text-foreground mb-4">
                    Key Responsibilities
                  </h3>
                </div>
                <ul className="list-disc pl-5 space-y-3 text-muted-foreground leading-relaxed font-light marker:text-primary/70">
                  <li>Define and continuously refine Chiranjiv's scientific and clinical strategy across genomics, bioinformatics pipelines, and AI/ML models.</li>
                  <li>Design, validate, and oversee genomic analysis pipelines (alignment, variant calling, annotation, QC) tailored to Indian populations and whole-genome data.</li>
                  <li>Lead development of scientific frameworks that convert genomic and phenotypic data into actionable, non-diagnostic wellness and risk insights.</li>
                  <li>Partner with AI/ML and engineering teams to build robust models and algorithms (risk stratification, trait prediction, ancestry, recommendations) and ensure they are scientifically sound and explainable.</li>
                  <li>Build and manage collaborations with academic institutions, hospitals, and research partners to grow the Indian genomic reference database.</li>
                  <li>Ensure scientific, ethical, and regulatory compliance for data use, research, and reporting, aligned with Indian regulations and global best practices.</li>
                </ul>
              </section>

              {/* Required Experience */}
              <section>
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light text-foreground mb-4">
                    Required Experience & Qualifications
                  </h3>
                </div>
                <ul className="list-disc pl-5 space-y-3 text-muted-foreground leading-relaxed font-light marker:text-primary/70">
                  <li><strong className="font-semibold text-foreground">15+ years of experience</strong> in genomics, bioinformatics, computational biology, or related fields, with significant time in leadership / principal scientist / CSO-equivalent roles.</li>
                  <li><strong className="font-semibold text-foreground">PhD in Bioinformatics, Computational Biology, Genomics, Human Genetics</strong>, or closely related discipline (exceptional MS with strong track record may be considered).</li>
                  <li>Demonstrated experience designing and operating large-scale genomic analysis systems (e.g., WGS/WES pipelines, GWAS, polygenic scores, ancestry inference).</li>
                  <li>
                    Strong background in bioinformatics tooling and languages:
                    <ul className="list-circle pl-5 mt-2 space-y-1">
                      <li>Proficiency with Python/R and common libraries for genomic and statistical analysis.</li>
                      <li>Familiarity with tools like BWA, GATK, bcftools, PLINK, Nextflow/Snakemake, etc.</li>
                    </ul>
                  </li>
                  <li>
                    Hands-on understanding of AI/ML methods used in genomics/health:
                    <ul className="list-circle pl-5 mt-2 space-y-1">
                      <li>Experience training or guiding ML models on biological/clinical data (e.g., risk scores, trait prediction, recommendation systems).</li>
                      <li>Comfort working with data scientists/ML engineers and reviewing model design, validation, and deployment decisions.</li>
                    </ul>
                  </li>
                </ul>
              </section>

              {/* Skills & Mindset */}
              <section>
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light text-foreground mb-4">
                    Skills & Mindset
                  </h3>
                </div>
                <ul className="list-disc pl-5 space-y-3 text-muted-foreground leading-relaxed font-light marker:text-primary/70">
                  <li>Deep scientific rigor with ability to simplify complex genetics and AI concepts into clear, user-friendly language for Indian consumers.</li>
                  <li>Strong understanding of population genetics and the challenges of translating Euro-centric genomic literature to Indian contexts.</li>
                  <li>Familiarity with data privacy and ethical frameworks for genomic research, including Indian data sovereignty, consent, and anonymized research use.</li>
                  <li>Builder mindset: excited to create India's genomic reference infrastructure and wellness products from early stage, not just join an established lab.</li>
                </ul>
              </section>

              {/* What We Offer */}
              <section>
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light text-foreground mb-4">
                    What Chiranjiv Offers
                  </h3>
                </div>
                <ul className="list-disc pl-5 space-y-3 text-muted-foreground leading-relaxed font-light marker:text-primary/70">
                  <li>Opportunity to shape the scientific backbone of a platform aiming to be the largest Indian genomic reference database with real-world consumer impact.</li>
                  <li>Close partnership with founding team across science, product, and strategy; ability to build and mentor a world-class scientific and bioinformatics team.</li>
                </ul>
              </section>

              {/* CTA */}
              <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <Link to="/careers" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  ← Back to Roles
                </Link>
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 btn-glow w-full sm:w-auto px-8">
                  <a href="mailto:careers@chiranjiv.com?subject=Application for Chief Scientific Officer Role">
                    Apply: careers@chiranjiv.com
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
