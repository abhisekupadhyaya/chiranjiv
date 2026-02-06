export interface MediaMention {
  id: string
  slug: string
  title: string
  description: string  // Short summary for listing page
  date: string
  platform: 'article' | 'workshop' | 'event' | 'press'
  thumbnailUrl?: string  // For listing page thumbnail
  externalUrl?: string  // For articles/external content
  tags?: string[]
  
  // Detail page fields
  fullContent?: string  // Full article content with line breaks
  heroImage?: string  // Main hero image for detail page
  eventDetails?: {
    location?: string
    attendees?: string
    duration?: string
    organizer?: string
    speaker?: string
  }
}

export const mediaMentions: MediaMention[] = [
  {
    id: '1',
    slug: 'health-awareness-workshop',
    title: 'Awareness Session on Genome Studies at DM Hospitals',
    description: 'Awareness session on genome studies conducted by Ms. Atreyee Bose at DM Hospitals, highlighting the importance of genome research and Indian body composition in shaping the future of healthcare.',
    date: '06 January 2026',
    platform: 'workshop',
    thumbnailUrl: '/media/workshop-thumbnail.jpg',
    heroImage: '/media/workshop-hero.jpg',
    tags: ['workshop', 'community', 'health-education', 'genomics'],
    externalUrl: 'https://www.dmhospitals.com/home/event-details/T0002/EVNT0000000000000292',
    fullContent: `Chiranjiv was pleased to participate in an Awareness Session on Genome Studies organized by DM Hospitals on 06 January 2026. The session, conducted by Ms. Atreyee Bose, highlighted the importance of genome research, Indian body composition, and its crucial role in shaping the future of healthcare.

The program saw enthusiastic participation from hospital HODs, resident doctors, technicians, and staff, reinforcing a shared commitment to continuous learning and scientific advancement. Chiranjiv sincerely thanks DM Hospitals for the invitation and the opportunity to engage with their medical community through this meaningful knowledge-sharing session.`,
    eventDetails: {
      location: 'DM Hospitals, Seminar Hall',
      attendees: 'Hospital HODs, resident doctors, technicians, and staff',
      speaker: 'Ms. Atreyee Bose (Chiranjiv)',
      organizer: 'DM Hospitals'
    }
  }
]
