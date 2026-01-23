import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function ChiefScientificOfficer() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-primary/2 via-secondary/2 to-accent/2 pointer-events-none" />
      
      {/* Floating animated orbs */}
      <div className="fixed top-1/4 left-[60%] w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[200px] animate-float pointer-events-none z-0" />
      <div 
        className="fixed bottom-1/4 right-0 w-[50rem] h-[50rem] bg-primary/10 rounded-full blur-[200px] animate-float pointer-events-none z-0"
        style={{ animationDelay: '2s' }} 
      />

      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* Hero Section */}
          <div className="text-center mb-10 sm:mb-14">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-neutral-200 mb-4 text-balance leading-[1.1]">
              Chief Scientific Officer
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 text-pretty leading-relaxed font-light max-w-2xl mx-auto">
              Genomics, Bioinformatics & AI • Leadership
            </p>
          </div>

          {/* Content Card */}
          <div className="max-w-4xl mx-auto">
            <Card className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/50 p-6 sm:p-8 md:p-10 shadow-lg shadow-black/5 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
              
              <div className="space-y-10">
                {/* Role Overview */}
                <section>
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-primary-600/50 to-transparent" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-light text-neutral-200 mb-4">
                      Role Overview
                    </h3>
                  </div>
                  <div className="space-y-4 text-neutral-600 leading-relaxed font-light">
                    <p>
                      A Chief Scientific Officer at Chiranjiv shall lead the scientific, bioinformatics, and AI strategy for large-scale Indian genomics, with 15+ years of experience and a strong record in similar leadership roles.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-primary-600/70">
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
                      <div className="h-px flex-1 bg-gradient-to-r from-primary-600/50 to-transparent" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-light text-neutral-200 mb-4">
                      Key Responsibilities
                    </h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-3 text-neutral-600 leading-relaxed font-light marker:text-primary-600/70">
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
                      <div className="h-px flex-1 bg-gradient-to-r from-primary-600/50 to-transparent" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-light text-neutral-200 mb-4">
                      Required Experience & Qualifications
                    </h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-3 text-neutral-600 leading-relaxed font-light marker:text-primary-600/70">
                    <li><strong className="font-semibold text-neutral-200">15+ years of experience</strong> in genomics, bioinformatics, computational biology, or related fields, with significant time in leadership / principal scientist / CSO-equivalent roles.</li>
                    <li><strong className="font-semibold text-neutral-200">PhD in Bioinformatics, Computational Biology, Genomics, Human Genetics</strong>, or closely related discipline (exceptional MS with strong track record may be considered).</li>
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
                      <div className="h-px flex-1 bg-gradient-to-r from-primary-600/50 to-transparent" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-light text-neutral-200 mb-4">
                      Skills & Mindset
                    </h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-3 text-neutral-600 leading-relaxed font-light marker:text-primary-600/70">
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
                      <div className="h-px flex-1 bg-gradient-to-r from-primary-600/50 to-transparent" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-light text-neutral-200 mb-4">
                      What Chiranjiv Offers
                    </h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-3 text-neutral-600 leading-relaxed font-light marker:text-primary-600/70">
                    <li>Opportunity to shape the scientific backbone of a platform aiming to be the largest Indian genomic reference database with real-world consumer impact.</li>
                    <li>Close partnership with founding team across science, product, and strategy; ability to build and mentor a world-class scientific and bioinformatics team.</li>
                  </ul>
                </section>

                {/* CTA */}
                <div className="pt-8 border-t border-neutral-1000/30 flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <Link to="/careers" className="text-sm font-medium text-neutral-500 hover:text-neutral-200 transition-colors">
                    ← Back to Roles
                  </Link>
                  <Button asChild className="bg-primary-600 text-white hover:bg-primary-600/90 w-full sm:w-auto px-8">
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
    </main>
  )
}
