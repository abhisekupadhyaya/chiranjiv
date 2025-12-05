import { useParams, Link } from 'react-router-dom'
import { blogPosts } from '@/data/blog'
import { BlogPost } from '@/components/BlogPost'

export default function Blog() {
  const { slug } = useParams()

  if (slug) {
    const post = blogPosts.find((p) => p.slug === slug)

    if (!post) {
      return (
        <section className="relative pt-24 sm:pt-32 pb-20 sm:pb-28 overflow-hidden bg-background">
          <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl font-light text-foreground mb-4">Post not found</h1>
              <Link
                to="/blog"
                className="text-primary hover:underline"
              >
                ← Back to Blog
              </Link>
            </div>
          </div>
        </section>
      )
    }

    return (
      <section className="relative pt-24 sm:pt-32 pb-20 sm:pb-28 overflow-hidden bg-background">
        <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary/70 mb-4">Chiranjiv Blog</p>
            <Link
              to="/blog"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:underline"
            >
              ← Back to Blog
            </Link>
          </div>
          <div className="max-w-4xl mx-auto">
            <BlogPost title={post.title} date={post.date} content={post.content} />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative pt-24 sm:pt-32 pb-20 sm:pb-28 overflow-hidden bg-background">
      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-medium tracking-tight text-neutral-200 sm:text-5xl md:text-6xl mb-6">
            Chiranjiv Blog
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 text-balance leading-relaxed font-light">
            Insights on genomics, ancestry, and the future of personalized health in India
          </p>
        </div>

        {/* Posts List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group block">
              <article className="glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl p-8 sm:p-10 shadow-lg hover:shadow-2xl hover:scale-[1.01] hover:border-primary/50 transition-all duration-300 bg-white">
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
