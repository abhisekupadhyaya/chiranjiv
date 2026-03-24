export interface MediaMention {
  id: string
  slug: string
  publication: string
  publicationLogo: string
  coverImage?: string
  headline: string
  excerpt: string
  date: string
  type: 'article' | 'video' | 'social' | 'podcast'
  ctaLabel: string
  externalUrl: string
}

export const mediaMentions: MediaMention[] = [
  {
    id: '1',
    slug: 'onmanorama-health-genes-coverage',
    publication: 'Onmanorama',
    publicationLogo: '/media/logos/onmanorama.svg',
    coverImage: '/media/Techspectations_Hemant_Jain_english.jpeg',
    headline: 'Is your health written in your genes? Chiranjiv seeks to redefine India’s healthcare',
    excerpt:
      'Chiranjiv is building India’s largest genetic database to shift healthcare from reactive treatment to predictive, personalized prevention.',
    date: 'Mar 2026',
    type: 'article',
    ctaLabel: 'Read Coverage',
    externalUrl:
      'https://www.onmanorama.com/health/healthcare/2026/03/19/chiranjiv-genomics-dna-preventive-healthcare-india-genetics.html',
  },
  {
    id: '2',
    slug: 'youtube-techspectations-future-jobs-ai',
    publication: 'YouTube (Manorama Online)',
    publicationLogo: '/media/logos/youtube.svg',
    coverImage: '/media/TechspectaionsPanelTopic.jpeg',
    headline:
      'Electricians May Earn More Than Engineers! | Future Jobs & AI Debate at Techspectations 2026',
    excerpt:
      'A discussion on future careers and AI where emerging fields like genomics and preventive healthcare are part of the evolving conversation.',
    date: 'Mar 2026',
    type: 'video',
    ctaLabel: 'Watch',
    externalUrl: 'https://www.youtube.com/watch?v=wybFNAOYX4I',
  },
  {
    id: '4',
    slug: 'boldsky-your-wellness-lies-in-your-genes',
    publication: 'Boldsky',
    publicationLogo: '/media/logos/boldsky.svg',
    coverImage: '/media/chiranjiv-boldsky-genes.webp',
    headline:
      'Your Wellness Lies in Your Genes? How Chiranjiv Is Changing the Future of India’s Health System',
    excerpt:
      'Chiranjiv is building a large-scale genomic database to shift India’s healthcare from reactive treatment to personalized, preventive care using DNA insights.',
    date: 'Feb 2026',
    type: 'article',
    ctaLabel: 'Read Coverage',
    externalUrl: 'https://www.boldsky.com/health/your-wellness-lies-in-your-genes-how-chiranjiv-is-changing-the-future-of-indias-health-system-167983.html',
  },
  {
    id: '5',
    slug: 'founders-corner-podcast-ep1',
    publication: 'YouTube (Chiranjiv)',
    publicationLogo: '/media/logos/youtube.svg',
    coverImage: "/media/Founder's Corner Podcast.jpeg",
    headline: "Founder’s Corner Podcast Ep.1 | Chiranjiv’s Mission & Startup Journey",
    excerpt:
      'A deep dive into Chiranjiv’s vision, mission, and journey, exploring how genomics can transform preventive healthcare and decision-making.',
    date: 'Mar 2026',
    type: 'podcast',
    ctaLabel: 'Watch',
    externalUrl: 'https://www.youtube.com/watch?v=n2mfYVtb8K8',
  },
  {
    id: '6',
    slug: 'manoramaonline-genomic-health-india',
    publication: 'Manorama Online',
    publicationLogo: '/media/logos/manorama.svg',
    coverImage: '/media/Techspectations_Hemant_Jain_malayanam.jpeg',
    headline: 'Chiranjiv: A new era of genomic health in India',
    excerpt:
      'Chiranjiv is leading a shift in Indian healthcare from symptom-based treatment to DNA-driven, personalized and preventive care by building one of the country’s largest genomic databases.',
    date: 'Mar 2026',
    type: 'article',
    ctaLabel: 'Read Coverage',
    externalUrl: 'https://www.manoramaonline.com/technology/science/2026/03/20/chiranjiv-genomic-health-india.html',
  },
  {
    id: '7',
    slug: 'linkedin-aipod-startup-showcase',
    publication: 'LinkedIn (M.D. Ramaswami / AIPod)',
    publicationLogo: '/media/logos/linkedin.svg',
    coverImage: "/media/Founder's Corner Podcast.jpeg",
    headline: 'AIPod Startup Showcase featuring Chiranjiv',
    excerpt:
      'Chiranjiv is featured as part of AIPod’s startup showcase, highlighting its role in shaping the future of healthcare through genomics and AI-led innovation.',
    date: 'Mar 2026',
    type: 'social',
    ctaLabel: 'View Post',
    externalUrl:
      'https://www.linkedin.com/posts/m-d-ramaswami_aipod-aipodstartups-startupshowcase-activity-7427205746875973632-9nj2/?utm_source=share&utm_medium=member_ios&rcm=ACoAAAAmcy8BDFZHifnkC2L1H2s1ioqRB-nKUFs&skipRedirect=true',
  },
]
