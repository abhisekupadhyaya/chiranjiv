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
        </div>
      </section>
    </main>
  )
}
