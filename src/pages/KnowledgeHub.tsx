import { Link } from 'react-router-dom'

export default function KnowledgeHub() {
  const posts = [
    {
      slug: 'from-fog-to-focus-fads1',
      title: 'From Fog to Focus: One DNA Insight',
      excerpt:
        'She ate clean and tried everything right—until one DNA insight revealed why her body needed something different.',
      date: 'Jan 2026',
      readTime: '3 min read',
    },
    {
      slug: 'fto-appetite-control',
      title: 'The FTO Effect: Appetite, Decoded',
      excerpt:
        'Despite eating well, hunger always won—until his genome explained why.',
      date: 'Jan 2026',
      readTime: '2 min read',
    },
    {
      slug: 'apoe-cognitive-health',
      title: 'Thinking Long-Term: A Head Start on Brain Health',
      excerpt:
        'A genetic signal helped him think decades ahead—before problems began.',
      date: 'Jan 2026',
      readTime: '2 min read',
    },
    {
      slug: 'sirt1-nampt-training-style',
      title: 'Why Consistency Worked Better Than Intensity',
      excerpt:
        'Hard workouts weren\'t the answer—steady habits were.',
      date: 'Jan 2026',
      readTime: '2 min read',
    },
    {
      slug: 'tcf7l2-slc30a8-glucose',
      title: 'Prevention Before Problems',
      excerpt:
        'His numbers looked fine—but DNA told a quieter story.',
      date: 'Jan 2026',
      readTime: '2 min read',
    },
    {
      slug: 'comt-stress-response',
      title: 'Why Pressure Drained Him Faster',
      excerpt:
        'Productive on the outside, exhausted on the inside—DNA explained why.',
      date: 'Jan 2026',
      readTime: '3 min read',
    },
    {
      slug: 'dao-histamine-food-sensitivity',
      title: 'When Healthy Food Didn\'t Feel Easy',
      excerpt:
        'Nutritious meals kept backfiring—until her genome added context.',
      date: 'Jan 2026',
      readTime: '3 min read',
    },
    {
      slug: 'pnpla3-fatty-liver-risk',
      title: 'Normal Weight, Unexpected Liver Signals',
      excerpt:
        'Fit on the outside, but his liver told a different story.',
      date: 'Jan 2026',
      readTime: '2 min read',
    },
  ]

  const featuredArticle = {
    title: "India's Moment in Genomics: How Chiranjiv Is Enabling Precision Medicine",
    excerpt: "How genetic research's European bias affects Indian healthcare—and why Chiranjiv is building India-first precision medicine with representative genetic data.",
    date: 'Jan 15, 2026',
    readTime: '4 min read',
    platform: 'Medium',
    url: 'https://medium.com/@chiranjivhealth/indias-moment-in-genomics-how-chiranjiv-is-enabling-precision-medicine-ce5df573a33a',
    tags: ['Genomics', 'Precision Medicine', 'Indian Genetics']
  }

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

      <section className="relative pt-24 sm:pt-32 pb-20 sm:pb-28">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-10 sm:mb-14">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-neutral-200 mb-4 text-balance leading-[1.1]">
              Knowledge Hub
            </h1>
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-lg sm:text-xl text-neutral-600 text-pretty leading-relaxed font-light">
                Every body is different. These stories show how small genetic insights can add clarity to everyday choices—what we eat, how we move, how we recover, and how we manage stress.
              </p>
              <p className="text-lg sm:text-xl text-neutral-600 text-pretty leading-relaxed font-light">
                Not predictions. Not prescriptions. Just perspective—helping you understand your biology a little better, one story at a time.
              </p>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="flex flex-wrap gap-6 max-w-7xl mx-auto">
            {posts.map((post) => (
              <Link key={post.slug} to={`/knowledge-hub/${post.slug}`} className="group block w-full md:w-[calc(50%-0.75rem)]">
                <article className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/40 p-8 sm:p-10 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/60 hover:shadow-xl hover:shadow-black/10 h-full">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
                  
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-500 mb-4 font-light">
                    <time>{post.date}</time>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-light text-neutral-200 mb-4 group-hover:text-primary-600 transition-colors text-balance leading-tight tracking-tight">
                    {post.title}
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-600 mb-6 leading-relaxed font-light">{post.excerpt}</p>
                  <div className="text-sm font-medium text-primary-600">
                    Read article →
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Featured Article Section */}
          <div className="mt-16 sm:mt-20 max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-200">
                Featured Article
              </h2>
              <p className="text-base text-neutral-600 mt-2">
                Deep dives into genomics and precision medicine
              </p>
            </div>
            
            <a
              href={featuredArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <article className="relative overflow-hidden rounded-2xl border border-primary-600/30 bg-gradient-to-br from-primary-600/5 to-accent-600/5 p-8 sm:p-10 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary-600/50 hover:shadow-xl hover:shadow-primary-600/10">
                {/* Content */}
                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-500 mb-4 font-light">
                  <time>{featuredArticle.date}</time>
                  <span>•</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium text-neutral-200 mb-4 group-hover:text-primary-600 transition-colors text-balance leading-tight">
                  {featuredArticle.title}
                </h3>
                
                <p className="text-base sm:text-lg text-neutral-600 mb-6 leading-relaxed font-light">
                  {featuredArticle.excerpt}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredArticle.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-white/20 text-neutral-600 text-xs border border-white/30">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-medium text-primary-600">
                  Read full article
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </article>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
