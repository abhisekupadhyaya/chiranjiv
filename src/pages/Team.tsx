import { Card } from '@/components/ui/card'

type TeamMember = {
  name: string
  role: string
  bio: string
  imageSrc: string
  linkedin: string
}

const founders: TeamMember[] = [
  {
    name: 'Hemant Jain',
    role: 'Co-Founder & Technology Lead',
    bio: 'Serial entrepreneur and technologist leading product and engineering at Chiranjiv, with deep experience building and scaling data-driven platforms.',
    imageSrc: '/team/hemant.jpeg',
    linkedin: 'https://www.linkedin.com/in/hemantrjain',
  },
]

const advisors: TeamMember[] = [
  {
    name: 'Ashish Chordia',
    role: 'Advisor',
    bio: 'Entrepreneur and product leader with experience building and scaling technology companies across analytics, media, and consumer internet.',
    imageSrc: '/team/ashish.jpeg',
    linkedin: 'https://www.linkedin.com/in/ashishchordia',
  },
  {
    name: 'Prahalad Simha',
    role: 'Advisor',
    bio: 'Business and product advisor supporting Chiranjiv on strategy, partnerships, and go-to-market for genomics-led health offerings.',
    imageSrc: '/team/prahalad.png',
    linkedin: 'https://www.linkedin.com/in/prahaladsimha',
  },
  {
    name: 'Chandra Manglani',
    role: 'Advisor',
    bio: 'Operator and advisor with experience across finance and operations, guiding Chiranjiv on building a resilient and scalable business.',
    imageSrc: '/team/chandra.jpeg',
    linkedin: 'https://www.linkedin.com/in/chandramanglani',
  },
  {
    name: 'Smita Agrawal',
    role: 'Strategic Advisor',
    bio: 'Technology executive and board advisor with global leadership experience across product and engineering, helping shape Chiranjiv’s long-term vision.',
    imageSrc: '/team/smita.jpeg',
    linkedin: 'https://www.linkedin.com/in/smita-agrawal',
  },
]

export default function Team() {
  return (
    <section className="relative pt-24 sm:pt-32 pb-20 sm:pb-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />

      {/* Floating animated orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="pointer-events-none absolute top-1/2 right-1/3 h-72 w-72 rounded-full bg-accent/10 blur-3xl animate-float"
        style={{ animationDelay: '4s' }}
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-extralight leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Our Team
          </h1>
        </div>

        <div className="space-y-20">
          {/* Mission & initiative narrative */}
          <section className="mx-auto max-w-4xl">
            <Card className="glass-backdrop rounded-3xl border border-border/40 bg-background/60 p-6 shadow-md backdrop-blur-sm sm:p-8 md:p-10">
              <div className="space-y-4">
                <p className="text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
                  At Chiranjiv, our founding team comprises experienced serial entrepreneurs, health tech innovators, genome science experts, and passionate advocates for accessible healthcare. United by a shared vision, we are dedicated to democratizing genomic-driven wellness for all Indians.
                </p>
                <p className="text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
                  We believe everyone deserves the opportunity to take control of their health. To accelerate this mission, we are launching a special initiative: top referring users will receive complimentary full genetic sequencing and a personalized suite of wellness reports. This initiative empowers individuals to understand their unique genetic makeup, make informed health decisions, and lead healthier, longer lives.
                </p>
                <p className="text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
                  Together, we are ushering in a new era of preventive healthcare—where knowledge, innovation, and accessibility come together for the benefit of everyone.
                </p>
              </div>
            </Card>
          </section>

          {/* Founders */}
          <section className="space-y-8">
            <div className="space-y-2" />
            <div className="space-y-8">
              {founders.map((member) => (
                <Card
                  key={member.name}
                  className="group flex flex-col gap-6 rounded-3xl border border-border/40 bg-background/60 p-6 shadow-md backdrop-blur-sm transition-shadow duration-300 hover:border-primary/40 hover:shadow-xl sm:p-8"
                >
                  <div className="flex flex-col items-center gap-6 md:flex-row md:items-center">
                    <div className="flex shrink-0 justify-center md:justify-start">
                      <div className="relative h-32 w-32 overflow-hidden rounded-full border border-border/70 bg-gradient-to-tr from-primary/10 via-background to-secondary/10 shadow-md sm:h-36 sm:w-36">
                        <img
                          src={member.imageSrc}
                          alt={member.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      </div>
                    </div>

                    <div className="flex-1 space-y-4 text-center md:text-left">
                      <div>
                        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                          {member.name}
                        </h2>
                        <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">
                          {member.role}
                        </p>
                      </div>

                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {member.bio}
                      </p>

                      <div className="mt-2 flex justify-center md:justify-start">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/60 px-4 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:border-primary hover:bg-primary/5"
                        >
                          <span>View LinkedIn</span>
                          <span aria-hidden="true" className="text-[10px]">
                            ↗
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Advisors */}
          <section className="space-y-6">
            <div className="space-y-2" />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {advisors.map((member) => (
                <Card
                  key={member.name}
                  className="group flex h-full flex-col items-center rounded-3xl border border-border/40 bg-background/60 p-6 text-center shadow-md backdrop-blur-sm transition-shadow duration-300 hover:border-primary/40 hover:shadow-xl"
                >
                  <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border border-border/70 bg-gradient-to-tr from-primary/10 via-background to-secondary/10 shadow-md sm:h-24 sm:w-24">
                    <img
                      src={member.imageSrc}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>

                  <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
                    {member.role}
                  </p>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>

                  <div className="mt-4">
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
  )
}

