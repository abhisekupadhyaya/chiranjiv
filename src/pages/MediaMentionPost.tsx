import { useParams, Link } from 'react-router-dom'
import { mediaMentions } from '@/data/media'
import { Badge } from '@/components/ui/badge'

export default function MediaMentionPost() {
  const { slug } = useParams()
  const media = mediaMentions.find((m) => m.slug === slug)

  if (!media) {
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

        <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="mb-8">
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary-600/70 mb-4">Media Mentions</p>
              <Link
                to="/media-mentions"
                className="text-sm font-medium text-neutral-500 hover:text-neutral-200 transition-colors hover:underline"
              >
                ← Back to Media Mentions
              </Link>
            </div>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl font-light text-neutral-200">Media mention not found</h1>
            </div>
          </div>
        </section>
      </main>
    )
  }

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

  const getCoverageCtaLabel = () => {
    if (!media.externalUrl) return 'View Full Coverage'
    if (media.externalUrl.includes('boldsky.com')) return 'Read Full Article on Boldsky'
    if (media.platform === 'article') return 'Read Full Article'
    return 'View Full Coverage'
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

      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* Breadcrumb */}
          <div className="mb-8">
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary-600/70 mb-4">Media Mentions</p>
            <Link
              to="/media-mentions"
              className="text-sm font-medium text-neutral-500 hover:text-neutral-200 transition-colors hover:underline"
            >
              ← Back to Media Mentions
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Badge className={`${getPlatformBadgeColor(media.platform)} border font-medium`}>
                  {getPlatformLabel(media.platform)}
                </Badge>
                <span className="text-sm text-neutral-500 font-light">{media.date}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-200 mb-4 text-balance leading-tight">
                {media.title}
              </h1>
            </div>

            {/* Hero Image */}
            {media.heroImage && (
              <div className="mb-8 overflow-hidden rounded-2xl border border-white/40 shadow-lg">
                <img 
                  src={media.heroImage}
                  alt={media.title}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {/* Event Details */}
            {media.eventDetails && (
              <div className="mb-8 rounded-2xl border border-white/40 bg-white/40 backdrop-blur-md p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-medium text-neutral-200 mb-4">Event Details</h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {media.eventDetails.location && (
                    <div>
                      <dt className="text-sm font-medium text-neutral-500 mb-1">Location</dt>
                      <dd className="text-base text-neutral-600">{media.eventDetails.location}</dd>
                    </div>
                  )}
                  {media.eventDetails.attendees && (
                    <div>
                      <dt className="text-sm font-medium text-neutral-500 mb-1">Attendees</dt>
                      <dd className="text-base text-neutral-600">{media.eventDetails.attendees}</dd>
                    </div>
                  )}
                  {media.eventDetails.duration && (
                    <div>
                      <dt className="text-sm font-medium text-neutral-500 mb-1">Duration</dt>
                      <dd className="text-base text-neutral-600">{media.eventDetails.duration}</dd>
                    </div>
                  )}
                  {media.eventDetails.organizer && (
                    <div>
                      <dt className="text-sm font-medium text-neutral-500 mb-1">Organizer</dt>
                      <dd className="text-base text-neutral-600">{media.eventDetails.organizer}</dd>
                    </div>
                  )}
                  {media.eventDetails.speaker && (
                    <div>
                      <dt className="text-sm font-medium text-neutral-500 mb-1">Speaker</dt>
                      <dd className="text-base text-neutral-600">{media.eventDetails.speaker}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {/* Full Content */}
            {media.fullContent && (
              <div className="prose prose-lg max-w-none mb-8">
                <div className="rounded-2xl border border-white/40 bg-white/40 backdrop-blur-md p-6 sm:p-8">
                  <div className="space-y-4">
                    {media.fullContent.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* External Link */}
            {media.externalUrl && (
              <div className="mb-8 p-6 rounded-2xl border border-white/40 bg-white/40 backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.16em] text-neutral-500 mb-3">
                  External Coverage
                </p>
                <a
                  href={media.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline text-lg font-medium inline-flex items-center gap-2"
                >
                  {getCoverageCtaLabel()}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}

            {/* Tags */}
            {media.tags && media.tags.length > 0 && (
              <div className="mt-8">
                <div className="flex flex-wrap gap-2">
                  {media.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="bg-white/20 border-white/30 text-neutral-600"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
