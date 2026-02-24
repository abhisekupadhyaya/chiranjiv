import { Link } from 'react-router-dom'
import { mediaMentions } from '@/data/media'
import { Badge } from '@/components/ui/badge'

export default function MediaMentions() {
  const getPlatformBadgeColor = (platform: string) => {
    switch (platform) {
      case 'workshop':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/20'
      case 'article':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      case 'event':
        return 'bg-green-500/10 text-green-600 border-green-500/20'
      case 'press':
        return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
      default:
        return 'bg-neutral-500/10 text-neutral-600 border-neutral-500/20'
    }
  }

  const getPlatformLabel = (platform: string) => {
    return platform.charAt(0).toUpperCase() + platform.slice(1)
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
              Media Mentions
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg sm:text-xl text-neutral-600 text-pretty leading-relaxed font-light">
                Stay updated with our workshops, interviews, and efforts to make genomic health accessible to all Indians.
              </p>
            </div>
          </div>

          {/* Media Grid */}
          <div className="flex flex-wrap gap-6 max-w-7xl mx-auto">
            {mediaMentions.map((media) => (
              <Link 
                key={media.id} 
                to={`/media-mentions/${media.slug}`} 
                className="group block w-full md:w-[calc(50%-0.75rem)]"
              >
                <article className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/40 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/60 hover:shadow-xl hover:shadow-black/10 h-full flex flex-col">
                  {/* Glass highlight effect on top edge */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
                  
                  {/* Thumbnail Image */}
                  {media.thumbnailUrl ? (
                    <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
                      <img
                        src={media.thumbnailUrl}
                        alt={media.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Subtle overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                    </div>
                  ) : (
                    <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/15 border-b border-white/30">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
                      <div className="relative h-full w-full flex items-end p-6">
                        <p className="text-sm sm:text-base font-medium tracking-wide text-neutral-200/90">
                          Media Coverage
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className={`${getPlatformBadgeColor(media.platform)} border font-medium`}>
                        {getPlatformLabel(media.platform)}
                      </Badge>
                      <span className="text-xs sm:text-sm text-neutral-500 font-light">{media.date}</span>
                    </div>
                    
                    <h2 className="text-xl sm:text-2xl font-light text-neutral-200 mb-3 group-hover:text-primary-600 transition-colors text-balance leading-tight tracking-tight">
                      {media.title}
                    </h2>
                    
                    <p className="text-sm sm:text-base text-neutral-600 mb-4 leading-relaxed font-light flex-1">
                      {media.description}
                    </p>
                    
                    <div className="text-sm font-medium text-primary-600 mt-auto">
                      View Coverage →
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Empty state if no media mentions */}
          {mediaMentions.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-neutral-500">No media mentions yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
