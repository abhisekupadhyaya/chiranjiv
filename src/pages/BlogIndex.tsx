import { Link } from 'react-router-dom'

export default function BlogIndex() {
  const posts = [
    {
      slug: 'indian-nutrigenomics-pharmacogenomics',
      title:
        'Your DNA Blueprint for Nutrition, Fitness & Low Inflammation: Why Indians Need Indian-Specific Nutrigenomics & Pharmacogenomics',
      excerpt:
        'Most DNA diet and drug reports are based on Western genetics. This piece explains how Indian-focused nutrigenomics and pharmacogenomics can personalize your nutrition, exercise, and medication for lower inflammation and healthier aging.',
      date: '2025',
      readTime: '6 min read',
    },
    {
      slug: 'indian-genome-testing-disease-prevention',
      title:
        'Genomics for a Longer, Fitter Life: Why Indian Genome Testing Outperforms Western Models for Disease Prevention',
      excerpt:
        'Western genomic models miss millions of Indian genetic variants. Learn how Indian genome testing can better predict disease risk, guide prevention, and build a more accurate blueprint for long-term health.',
      date: '2025',
      readTime: '5 min read',
    },
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
            Chiranjiv Blog
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed font-light max-w-2xl mx-auto">
            Insights on genomics, ancestry, and the future of personalized health in India
          </p>
        </div>

        {/* Posts List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group block">
              <article className="glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl p-8 sm:p-10 shadow-lg hover:shadow-2xl hover:scale-[1.01] hover:border-primary/50 transition-all duration-300">
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


