import { memo } from "react";

export const LifeOS = memo(function LifeOS() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background decorative elements matching the home section language */}
      <div className="absolute top-1/3 right-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-primary-300/5 blur-[100px] translate-x-1/3" />
      <div className="absolute bottom-0 left-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-secondary-300/5 blur-[100px] -translate-x-1/3 translate-y-1/3" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <span className="text-primary-500 font-bold tracking-widest uppercase text-xs mb-3 block">
              Your LIFE OS
            </span>
            <h2 className="mb-4 text-3xl font-medium tracking-tight text-neutral-200 sm:text-4xl lg:text-5xl">
              Your Genome, Made Simple.
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-foreground sm:text-xl">
              LifeOS™ is your personal dashboard that turns complex genetic data into{" "}
              <span className="font-semibold text-neutral-200">clear, actionable insights</span> — so you
              understand what works for your body without needing a PhD to read it.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-foreground font-medium">
                <span className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-500 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  ✓
                </span>
                Interactive metabolic & cognitive risk monitoring
              </li>
              <li className="flex items-center gap-3 text-foreground font-medium">
                <span className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-500 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  ✓
                </span>
                Personalized longevity & recovery protocols
              </li>
              <li className="flex items-center gap-3 text-foreground font-medium">
                <span className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-500 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  ✓
                </span>
                Plain-English explanations of what each gene variant means for you
              </li>
            </ul>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-secondary-400/15 to-primary-500/10 blur-[50px] opacity-35" />
            <div className="relative w-full max-w-[480px] mx-auto hover:scale-[1.01] transition-transform duration-500">
              <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" className="w-full drop-shadow-2xl rounded-[24px]">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0B1221" />
                    <stop offset="100%" stopColor="#0F1A2E" />
                  </linearGradient>
                  <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4CAF50" />
                    <stop offset="100%" stopColor="#388E3C" />
                  </linearGradient>
                  <linearGradient id="chartFill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#4CAF50" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="400" height="320" rx="20" fill="url(#bgGrad)" stroke="#1E293B" strokeWidth="1" />
                <g transform="translate(14,20)">
                  <rect x="0" y="0" width="24" height="280" rx="12" fill="#152033" />
                  <g transform="translate(7,20)" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round">
                    <rect x="0" y="0" width="4" height="4" rx="1" />
                    <rect x="6" y="0" width="4" height="4" rx="1" />
                    <rect x="0" y="6" width="4" height="4" rx="1" />
                    <rect x="6" y="6" width="4" height="4" rx="1" />
                  </g>
                </g>
                <text x="60" y="35" fontFamily="sans-serif" fontSize="12" fontWeight="600" fill="white" opacity="0.9">
                  Health Dashboard
                </text>
                <g transform="translate(220,110)">
                  <g transform="translate(-100,10)">
                    <circle cx="0" cy="0" r="28" stroke="#1E293B" strokeWidth="3" fill="none" />
                    <circle
                      cx="0"
                      cy="0"
                      r="28"
                      stroke="#46A0D2"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="130"
                      strokeDashoffset="40"
                      strokeLinecap="round"
                      transform="rotate(-90)"
                    />
                    <text x="0" y="2" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="white">
                      A-
                    </text>
                    <text x="0" y="42" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fill="#94A3B8">
                      Cognition
                    </text>
                  </g>
                  <g filter="url(#glow)">
                    <circle cx="0" cy="0" r="50" stroke="#1E293B" strokeWidth="6" fill="none" />
                    <circle
                      cx="0"
                      cy="0"
                      r="50"
                      stroke="url(#greenGrad)"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray="314"
                      strokeDashoffset="47"
                      strokeLinecap="round"
                      transform="rotate(-90)"
                    />
                    <text x="0" y="5" textAnchor="middle" fontFamily="sans-serif" fontSize="28" fontWeight="700" fill="white">
                      85
                    </text>
                    <text x="0" y="20" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fontWeight="500" fill="#4CAF50" opacity="0.9">
                      Wellness Score
                    </text>
                  </g>
                  <g transform="translate(100,10)">
                    <circle cx="0" cy="0" r="28" stroke="#1E293B" strokeWidth="3" fill="none" />
                    <circle
                      cx="0"
                      cy="0"
                      r="28"
                      stroke="#388E3C"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="175"
                      strokeDashoffset="140"
                      strokeLinecap="round"
                      transform="rotate(-90)"
                    />
                    <text x="0" y="2" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="white">
                      Low
                    </text>
                    <text x="0" y="42" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fill="#94A3B8">
                      Ca. Risk
                    </text>
                  </g>
                </g>
                <g transform="translate(60,200)">
                  <text x="0" y="0" fontFamily="sans-serif" fontSize="9" fill="#94A3B8" fontWeight="500">
                    Energy Levels Trend <tspan fill="#475569" fontWeight="400">(7 Days)</tspan>
                  </text>
                  <g transform="translate(0,10)">
                    <line x1="0" y1="0" x2="310" y2="0" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2 2" />
                    <line x1="0" y1="25" x2="310" y2="25" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2 2" />
                    <line x1="0" y1="50" x2="310" y2="50" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2 2" />
                    <path d="M0,40 C40,35 80,45 120,20 C160,-5 200,30 240,15 C280,5 310,20 310,20 V60 H0 Z" fill="url(#chartFill)" />
                    <path
                      d="M0,40 C40,35 80,45 120,20 C160,-5 200,30 240,15 C280,5 310,20 310,20"
                      fill="none"
                      stroke="#4CAF50"
                      strokeWidth="2"
                      strokeLinecap="round"
                      filter="url(#glow)"
                    />
                  </g>
                </g>
                <g transform="translate(60,285)">
                  <text x="0" y="-8" fontFamily="sans-serif" fontSize="9" fill="#94A3B8" fontWeight="500">
                    Gene Insights
                  </text>
                  <rect x="0" y="0" width="130" height="20" rx="6" fill="#1E293B" stroke="#334155" strokeWidth="0.5" />
                  <text x="10" y="13" fontFamily="sans-serif" fontSize="9" fill="#4CAF50">
                    #APOE4
                  </text>
                  <text x="58" y="13" fontFamily="sans-serif" fontSize="8" fill="#94A3B8">
                    Alzheimer's Risk
                  </text>
                  <rect x="140" y="0" width="145" height="20" rx="6" fill="#1E293B" stroke="#334155" strokeWidth="0.5" />
                  <text x="150" y="13" fontFamily="sans-serif" fontSize="9" fill="#4CAF50">
                    #MTHFR
                  </text>
                  <text x="200" y="13" fontFamily="sans-serif" fontSize="8" fill="#94A3B8">
                    B-Vitamin Processing
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
