import { Link } from 'react-router-dom'

export default function LHPostIndex() {
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

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-foreground mb-4 text-balance tracking-tight leading-[1.1]">
            Learning Hub
          </h1>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-lg sm:text-xl text-muted-foreground text-pretty leading-relaxed font-light">
              Every body is different. These stories show how small genetic insights can add clarity to everyday choices—what we eat, how we move, how we recover, and how we manage stress.
            </p>
            <p className="text-lg sm:text-xl text-muted-foreground text-pretty leading-relaxed font-light">
              Not predictions. Not prescriptions. Just perspective—helping you understand your biology a little better, one story at a time.
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {posts.map((post) => (
            <Link key={post.slug} to={`/learning-hub/${post.slug}`} className="group block">
              <article className="glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl p-8 sm:p-10 shadow-lg hover:shadow-2xl hover:scale-[1.01] hover:border-primary/50 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground mb-4 font-light">
                  <time>{post.date}</time>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-light text-foreground mb-4 group-hover:text-primary transition-colors text-balance leading-tight tracking-tight">
                  {post.title}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed font-light">{post.excerpt}</p>
                <div className="text-sm font-medium text-primary">
                  Read article →
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

