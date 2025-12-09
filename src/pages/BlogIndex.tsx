import { Link } from 'react-router-dom'

export default function BlogIndex() {
  const posts = [
    {
      slug: 'genomic-architecture-wellness',
      title:
        'Genomic Architecture of Wellness: Evidence for Precision Nutrition, Metabolism, and Lifestyle Modulation',
      excerpt:
        'Advances in human genomics have clarified that variability in wellness traits—nutrient metabolism, diet responsiveness, and cardiometabolic risk—is deeply rooted in genetic architecture. Precision nutrition and personalized lifestyle interventions represent the next evolution in preventive health.',
      date: '2025',
      readTime: '4 min read',
    },
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
    <main className="relative w-full min-h-screen overflow-hidden">
      {/* Fixed Full-Screen Background Overlay - Very Subtle Tint */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-primary/2 via-secondary/2 to-accent/2 pointer-events-none" />
      
      {/* Floating Blobs - Vibrant and Distinct */}
      <div className="fixed top-1/4 left-[60%] w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[200px] animate-float pointer-events-none z-0" />
      <div 
        className="fixed bottom-1/4 right-0 w-[50rem] h-[50rem] bg-primary/10 rounded-full blur-[200px] animate-float pointer-events-none z-0"
        style={{ animationDelay: '2s' }} 
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-24 sm:pt-32 pb-16 sm:pb-24">
        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-neutral-200 mb-4 text-balance tracking-tight leading-[1.1]">
            Chiranjiv Blog
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 text-pretty leading-relaxed font-light max-w-2xl mx-auto">
            Insights on genomics, ancestry, and the future of personalized health in India
          </p>
        </div>

        {/* Posts List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {posts.map((post) => (
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
    </main>
  )
}
