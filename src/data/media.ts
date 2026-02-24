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
    id: '2',
    slug: 'boldsky-your-wellness-lies-in-your-genes',
    title: 'Your Wellness Lies in Your Genes? How Chiranjiv Is Changing the Future of India’s Health System',
    description: 'Boldsky features Chiranjiv\'s population-scale genomics vision for India, highlighting how preventive, personalized healthcare can be guided by DNA insights.',
    date: 'February 2026',
    platform: 'article',
    thumbnailUrl: '/media/chiranjiv-boldsky-genes.webp',
    heroImage: '/media/chiranjiv-boldsky-genes.webp',
    externalUrl: 'https://www.boldsky.com/health/your-wellness-lies-in-your-genes-how-chiranjiv-is-changing-the-future-of-indias-health-system-167983.html',
    tags: ['article', 'boldsky', 'genomics', 'preventive-care', 'personalized-health'],
    fullContent: `This Boldsky feature explores how Chiranjiv is helping shift Indian healthcare from reactive treatment toward predictive, preventive, and personalized care through genomics.

The article highlights Chiranjiv’s mission to build a large indigenous genomic database, improve India-relevant health insights, and enable tailored wellness guidance through whole-genome analysis and AI-powered interpretation.

It also emphasizes the larger public-health opportunity: using earlier genetic risk awareness for lifestyle diseases such as diabetes, obesity, and cardiovascular conditions to support proactive interventions before symptoms appear.`
  },
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
