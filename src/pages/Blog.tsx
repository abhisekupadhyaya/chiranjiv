import { useMemo } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { insights, type InsightCategory } from '@/data/insights'
import { BlogPost } from '@/components/BlogPost'

export default function Blog() {
  const { slug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentCategory = (searchParams.get('category') || 'all').toLowerCase()
  const categories: Array<{ value: 'all' | InsightCategory; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'articles', label: 'Articles' },
    { value: 'research', label: 'Research' },
    { value: 'explainers', label: 'Explainers' },
    { value: 'videos', label: 'Videos' },
    { value: 'company-updates', label: 'Company Updates' },
  ]

  const selectedCategory = categories.some((item) => item.value === currentCategory)
    ? (currentCategory as 'all' | InsightCategory)
    : 'all'

  const filteredInsights = useMemo(() => {
    if (selectedCategory === 'all') return insights
    return insights.filter((item) => item.category === selectedCategory)
  }, [selectedCategory])

  const setCategory = (value: 'all' | InsightCategory) => {
    if (value === 'all') {
      setSearchParams({})
      return
    }
    setSearchParams({ category: value })
  }

  if (slug) {
    const post = insights.find((p) => p.slug === slug)

    if (!post) {
      return (
        <main className="relative w-full min-h-screen overflow-hidden">
          {/* Background Elements */}
          <div className="fixed inset-0 z-0 bg-gradient-to-br from-primary/2 via-secondary/2 to-accent/2 pointer-events-none" />
          <div className="fixed top-1/4 left-[60%] w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[200px] animate-float pointer-events-none z-0" />
          <div 
            className="fixed bottom-1/4 right-0 w-[50rem] h-[50rem] bg-primary/10 rounded-full blur-[200px] animate-float pointer-events-none z-0"
            style={{ animationDelay: '2s' }} 
          />
          
          <section className="relative pt-24 sm:pt-32 pb-20 sm:pb-28">
            <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-2xl font-light text-neutral-200 mb-4">Post not found</h1>
                <Link
                  to="/learn/insights"
                  className="text-primary-600 hover:underline"
                >
                  ← Back to Insights
                </Link>
              </div>
            </div>
          </section>
        </main>
      )
    }

    return (
      <main className="relative w-full min-h-screen overflow-hidden">
        {/* Background Elements */}
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-primary/2 via-secondary/2 to-accent/2 pointer-events-none" />
        <div className="fixed top-1/4 left-[60%] w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[200px] animate-float pointer-events-none z-0" />
        <div 
          className="fixed bottom-1/4 right-0 w-[50rem] h-[50rem] bg-primary/10 rounded-full blur-[200px] animate-float pointer-events-none z-0"
          style={{ animationDelay: '2s' }} 
        />

        <section className="relative pt-24 sm:pt-32 pb-20 sm:pb-28">
          <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary-600/70 mb-4">Learn</p>
              <Link
                to="/learn/insights"
                className="text-sm font-medium text-neutral-500 hover:text-neutral-200 transition-colors hover:underline"
              >
                ← Back to Insights
              </Link>
            </div>
            <div className="max-w-4xl mx-auto">
              {post.content ? (
                <>
                  <BlogPost title={post.title} date={post.date} content={post.content} references={post.references} />
                  <div className="mt-10 flex justify-center">
                    <Link
                      to="/signup"
                      className="inline-flex items-center rounded-xl bg-primary-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                    >
                      Join Early Access
                    </Link>
                  </div>
                </>
              ) : (
                <article className="rounded-2xl border border-white/40 bg-white/40 p-8 sm:p-10 shadow-lg shadow-black/5 backdrop-blur-md">
                  <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary-600 mb-3">External Article</p>
                  <h1 className="text-2xl sm:text-3xl font-medium text-neutral-200 mb-4">{post.title}</h1>
                  <p className="text-base text-neutral-600 mb-6 leading-relaxed">{post.excerpt}</p>
                  {post.externalUrl && (
                    <a
                      href={post.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary-600 hover:underline font-medium"
                    >
                      Read full article
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </article>
              )}
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-primary/2 via-secondary/2 to-accent/2 pointer-events-none" />
      <div className="fixed top-1/4 left-[60%] w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[200px] animate-float pointer-events-none z-0" />
      <div 
        className="fixed bottom-1/4 right-0 w-[50rem] h-[50rem] bg-primary/10 rounded-full blur-[200px] animate-float pointer-events-none z-0"
        style={{ animationDelay: '2s' }} 
      />

      <section className="relative pt-24 sm:pt-32 pb-20 sm:pb-28">
        <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-medium tracking-tight text-neutral-200 sm:text-5xl md:text-6xl mb-6">
              Insights
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 text-balance leading-relaxed font-light">
              Research, explainers, and updates on genomics and preventive health in India.
            </p>
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setCategory(item.value)}
                className={`rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                  selectedCategory === item.value
                    ? 'border-primary-600 bg-primary-600 text-white'
                    : 'border-white/40 bg-white/40 text-neutral-600 hover:border-primary-600/40 hover:text-primary-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Posts List */}
          <div className="flex flex-wrap gap-6 max-w-7xl mx-auto">
            {filteredInsights.map((post) => (
              post.externalUrl ? (
                <a
                  key={post.slug}
                  href={post.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-full md:w-[calc(50%-0.75rem)]"
                >
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
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-primary-600">
                      Read article
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </article>
                </a>
              ) : (
              <Link key={post.slug} to={`/learn/insights/${post.slug}`} className="group block w-full md:w-[calc(50%-0.75rem)]">
                <article className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/40 p-8 sm:p-10 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/60 hover:shadow-xl hover:shadow-black/10 h-full">
                  {/* Glass highlight effect on top edge */}
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
              )
            ))}
          </div>
          {filteredInsights.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-neutral-500">No insights found in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
