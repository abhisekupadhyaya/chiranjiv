import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function BlogIndex() {
  const posts = [
    {
      slug: 'why-23andme-cant-tell-indian-ancestry',
      title: "Why 23andMe Can't Tell You You're Maharashtrian, Punjabi, or Tamil — and Why Chiranjiv Can",
      excerpt:
        "India is home to more than 4,000 ethnic and linguistic groups, yet global platforms can't tell you if you have roots in Maharashtra, Punjab, or Tamil Nadu. Here's why.",
      date: '2025',
      readTime: '5 min read',
    },
  ]
  return (
    <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">Chiranjiv Blog</h1>
          <p className="text-lg sm:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Insights on genomics, ancestry, and the future of personalized health in India
          </p>
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group block">
              <article className="bg-card border border-border rounded-2xl p-8 sm:p-10 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                  <time className="font-medium">{post.date}</time>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors text-balance leading-tight">
                  {post.title}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-primary font-semibold">
                  Read full article
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}


