export type Accent = "primary" | "secondary" | "amber" | "violet" | "teal";
export type PhaseState = "solid" | "medium" | "light" | "outline";

export const missionHero = {
  badge: "Project Chiranjiv: Our Master Plan",
  title: "Building the planet's most inclusive genomic platform.",
  subtitle: "From India to the world.",
};

export const whyWeExist = {
  eyebrow: "Why We Exist",
  title: "Why We Exist",
  summary:
    "Your DNA is the most personal data you'll ever own. Yet today, understanding it is expensive, fragmented, and often locked behind corporate paywalls in other countries.",
  quote:
    "Everyone deserves a personalised health, wellness and longevity plan based on their own genome, and that right should start in India.",
  context:
    "India's 1.4 billion people represent the most genetically diverse population on Earth. By beginning here, we're empowering individuals with knowledge of their biology and laying the foundation for a global genomic commons that belongs to humanity, not a handful of corporations.",
};

export const problemItems = [
  {
    number: "01",
    title: "Sequence Unaffordability",
    description: "Genome sequencing is still unaffordable for most people (₹1 lakh or more).",
    accent: "primary" as Accent,
  },
  {
    number: "02",
    title: "Missing Data",
    description: "Data from Indian and Global South populations is missing from global research.",
    accent: "secondary" as Accent,
  },
  {
    number: "03",
    title: "Proprietary Silos",
    description: "Companies keep user data proprietary, with vague consent and little transparency.",
    accent: "amber" as Accent,
  },
  {
    number: "04",
    title: "Under-representation",
    description: "Entire populations are left behind in drug discovery and nutrition science.",
    accent: "violet" as Accent,
  },
];

export const planPhases = [
  {
    title: "Phase 1 — Free Genome Testing for Early Registrants",
    description:
      "We provide free DNA collection kits and full-genome sequencing for early participants. Your data is encrypted, stored in India, and co-governed by you. Access it, delete it, or choose how it's used. Always.",
    state: "solid" as PhaseState,
  },
  {
    title: "Phase 2 — Personalized Insights That Work for You",
    description:
      "From your genome, we generate actionable reports: nutrition, fitness, longevity, and preventive-health guidance. Our focus: insights that improve your life — not extract your data.",
    state: "medium" as PhaseState,
  },
  {
    title: "Phase 3 — The Indian Genome Cloud",
    description:
      "As participation grows, anonymized data fuels breakthroughs in drug discovery, AI health models, and public-health policy. All usage is reviewed by an independent ethics board.",
    state: "light" as PhaseState,
  },
  {
    title: "Phase 4 — Global Expansion",
    description:
      "An Indian innovation, shared with the world. Once proven in India, we will extend the platform worldwide — creating a privacy-first, ethically sourced, global genomic infrastructure.",
    state: "outline" as PhaseState,
  },
];

export const principles = [
  {
    number: "01",
    title: "Control",
    description: "Your data, your control.",
    accent: "primary" as Accent,
  },
  {
    number: "02",
    title: "Design",
    description: "Transparency by design.",
    accent: "secondary" as Accent,
  },
  {
    number: "03",
    title: "Sovereignty",
    description: "Sovereign data storage.",
    accent: "amber" as Accent,
  },
  {
    number: "04",
    title: "Society",
    description: "Science for all.",
    accent: "violet" as Accent,
  },
  {
    number: "05",
    title: "Open",
    description: "Built in India, open worldwide.",
    accent: "teal" as Accent,
  },
];

export const futureVision = {
  eyebrow: "Our Vision",
  title: "Our Vision",
  intro: "Imagine a world where:",
  items: [
    "Preventive healthcare is tailored to your exact genome.",
    "Nutrition companies craft food around your biology.",
    "Pharma researchers design drugs that work for our genetic diversity.",
    "Nations collaborate on genomic research without giving up data sovereignty.",
  ],
  outro: "That future starts in India — but it doesn't end here.",
};

export const missionCta = {
  badge: "Now Recruiting Phase 1",
  title: "Join the Founding Wave.",
  description:
    "By joining Chiranjiv today, you become part of a movement to democratize genomics for the entire planet.",
  buttonLabel: "Apply for access",
  buttonTo: "/signup",
  footer: "From India — For the world",
};
