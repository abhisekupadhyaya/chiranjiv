import { useParams, Link } from 'react-router-dom'
import { blogPosts } from '@/data/blog'
import { BlogPost } from '@/components/BlogPost'

export default function Blog() {
  const { slug } = useParams()

  if (slug) {
    const post = blogPosts.find((p) => p.slug === slug)

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
                  to="/blog"
                  className="text-primary-600 hover:underline"
                >
                  ← Back to Blog
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
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary-600/70 mb-4">Chiranjiv Blog</p>
              <Link
                to="/blog"
                className="text-sm font-medium text-neutral-500 hover:text-neutral-200 transition-colors hover:underline"
              >
                ← Back to Blog
              </Link>
            </div>
            <div className="max-w-4xl mx-auto">
              <BlogPost title={post.title} date={post.date} content={post.content} />
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
                <article className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/40 p-8 sm:p-10 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/60 hover:shadow-xl hover:shadow-black/10">
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
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
