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
    <main className="pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">Chiranjiv Blog</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Insights on genomics, ancestry, and the future of personalized health in India.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group h-full">
              <article className="h-full flex flex-col bg-card border border-border rounded-xl p-6 sm:p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                  <time>{post.date}</time>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors text-balance">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4 text-pretty flex-1">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-primary font-medium">
                  Read more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}


