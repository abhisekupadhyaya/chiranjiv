import { Card } from '@/components/ui/card'

type TeamMember = {
  name: string
  role: string
  bio: string
  imageSrc: string
  linkedin: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Ashish Chordia',
    role: 'Advisor',
    bio: 'Founder, board member at LG Ads; built global CTV company on track to $1B+ revenue & IPO. Now focused on global generational opportunities where AI and healthcare intersect.',
    imageSrc: '/team/ashish.jpeg',
    linkedin: 'https://www.linkedin.com/in/ashishchordia',
  },
  {
    name: 'Hemant Jain',
    role: 'Co-Founder & Technology Lead',
    bio: 'A serial entrepreneur with 25+ years of experience across the US and India, spanning multiple industry verticals. An alum of IIT Delhi and IIM Calcutta, Hemant is passionate about changing the face of healthcare in India through technology, data, and genomics-driven innovation.',
    imageSrc: '/team/hemant.jpeg',
    linkedin: 'https://www.linkedin.com/in/hemantrjain',
  },
  {
    name: 'Prahalad Simha',
    role: 'Advisor',
    bio: 'A serial entrepreneur with a special interest in genomics, life sciences, and deep tech, Prahalad created his first genomics company in the early 2000s followed by another venture in manufacturing. An alum of IIM Bangalore, he brings a strong strategic and operational lens to building next-generation health and science ventures.',
    imageSrc: '/team/prahalad.png',
    linkedin: 'https://www.linkedin.com/in/prahaladsimha',
  },
  {
    name: 'Chandra Manglani',
    role: 'Advisor',
    bio: 'An IIT Delhi alum with 25+ years of experience leading advanced computational and EDA software development across global semiconductor organizations. He has built and led high-performance engineering teams, architected complex algorithmic systems, and shaped long-term technology strategy in the computational software space. An AI/ML enthusiast and lifelong learner, Chandra is passionate about leveraging computational innovation to transform healthcare through genomics-driven wellness solutions.',
    imageSrc: '/team/chandra.jpeg',
    linkedin: 'https://www.linkedin.com/in/chandramanglani',
  },
  {
    name: 'Dr. Smita Agrawal, PhD',
    role: 'Strategic Advisor',
    bio: 'Dr. Smita Agrawal is a seasoned genomics and precision medicine leader with over two decades of experience driving innovation at the intersection of data, biology, and healthcare technology. As a former Senior Director at ConcertAI, she led the creation of a flagship clinico-genomic data product that powered cutting-edge oncology research and real-world evidence generation. She previously held leadership positions at Strand Life Sciences and performed fundamental life sciences research at Genentech, the University of Minnesota, and UC Berkeley. Dr. Agrawal holds a Ph.D. in Chemical Engineering from UC Berkeley and a B.Tech. from IIT Kanpur. She advises on strategies integrating genomics, real-world data, and AI to advance personalized medicine and data-driven healthcare innovation.',
    imageSrc: '/team/smita.jpeg',
    linkedin: 'https://www.linkedin.com/in/smita-agrawal',
  },
]

export default function Team() {
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

      <section className="relative pt-24 sm:pt-32 pb-20 sm:pb-28">
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-medium tracking-tight text-neutral-200 sm:text-5xl md:text-6xl">
              Our Team
            </h1>
          </div>

          <div className="space-y-20">
            {/* Mission & initiative narrative */}
            <section className="mx-auto max-w-4xl">
              <Card className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/50 p-6 shadow-lg shadow-black/5 backdrop-blur-md sm:p-8 md:p-10">
                {/* Glass highlight effect on top edge */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
                
                <div className="space-y-4">
                  <p className="text-base font-light leading-relaxed text-neutral-600 sm:text-lg">
                    At Chiranjiv, our founding team comprises experienced serial entrepreneurs, health tech innovators, genome science experts, and passionate advocates for accessible healthcare. United by a shared vision, we are dedicated to democratizing genomic-driven wellness for all Indians.
                  </p>
                  <p className="text-base font-light leading-relaxed text-neutral-600 sm:text-lg">
                    We believe everyone deserves the opportunity to take control of their health. To accelerate this mission, we are launching a special initiative: top referring users will receive complimentary full genetic sequencing and a personalized suite of wellness reports. This initiative empowers individuals to understand their unique genetic makeup, make informed health decisions, and lead healthier, longer lives.
                  </p>
                  <p className="text-base font-light leading-relaxed text-neutral-600 sm:text-lg">
                    Together, we are ushering in a new era of preventive healthcare—where knowledge, innovation, and accessibility come together for the benefit of everyone.
                  </p>
                </div>
              </Card>
            </section>

            {/* Team Members */}
            <section className="space-y-10">
              <div className="space-y-2" />
              <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {teamMembers.map((member) => (
                  <Card
                    key={member.name}
                    className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-white/40 bg-white/40 p-8 sm:p-9 md:p-10 text-center shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/60 hover:shadow-xl hover:shadow-black/10"
                  >
                    {/* Glass highlight effect on top edge */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />

                    <div className="relative mb-6 h-28 w-28 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-full border border-border/70 bg-gradient-to-tr from-primary/10 via-background to-secondary/10 shadow-md">
                      <img
                        src={member.imageSrc}
                        alt={member.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>

                    <h3 className="mb-4 text-lg font-semibold tracking-tight text-neutral-200 sm:text-xl">
                      {member.name}
                    </h3>

                    <p className="min-h-[140px] flex-1 text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
                      {member.bio}
                    </p>

                    <div className="mt-4 shrink-0">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/60 px-3 py-1.5 text-[11px] font-medium text-foreground shadow-sm transition-colors hover:border-primary hover:bg-primary/5"
                      >
                        <span>View LinkedIn</span>
                        <span aria-hidden="true" className="text-[9px]">
                          ↗
                        </span>
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}
