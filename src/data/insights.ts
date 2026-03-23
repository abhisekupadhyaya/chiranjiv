import { blogPosts } from '@/data/blog'
import type { Reference } from '@/components/BlogPost'

export type InsightCategory = 'articles' | 'research' | 'explainers' | 'videos' | 'company-updates'
export type InsightFormat = 'article' | 'video' | 'social' | 'podcast'

export interface InsightItem {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: InsightCategory
  format?: InsightFormat
  content?: string
  references?: Reference[]
  externalUrl?: string
  duration?: string
  thumbnailUrl?: string
}

const blogCategoryMap: Record<string, InsightCategory> = {
  'genomic-architecture-wellness': 'research',
  'indian-nutrigenomics-pharmacogenomics': 'explainers',
  'indian-genome-testing-disease-prevention': 'articles',
  'why-23andme-cant-tell-indian-ancestry': 'articles',
}

const mappedBlogInsights: InsightItem[] = blogPosts.map((post) => ({
  ...post,
  category: blogCategoryMap[post.slug] ?? 'articles',
  format: 'article',
}))

const knowledgeHubInsights: InsightItem[] = [
  {
    slug: 'from-fog-to-focus-fads1',
    title: 'From Fog to Focus: One DNA Insight',
    excerpt:
      'She ate clean and tried everything right until one DNA insight revealed why her body needed something different.',
    date: 'Jan 2026',
    readTime: '3 min read',
    category: 'explainers',
    format: 'article',
    content: `A single genetic clue can sometimes explain years of unanswered questions.

At 22, Aradhya should have been full of energy. But long hours in the studio left her dealing with aching joints, a constant sense of inflammation, and a persistent mental fog that dulled her creativity. She tried what many of us would do - cleaned up her diet, added more nuts and seeds for omega-3s, and focused on "eating better". But nothing seemed to shift.

Then she saw her genomic nutrition report.

It highlighted a common variation in her FADS1 gene, a gene involved in converting plant-based omega-3s (like those from flax or chia) into the long-chain forms EPA and DHA, that the brain and joints rely on. Research shows that some FADS1 variants are associated with lower conversion efficiency, meaning certain individuals may benefit more from direct dietary or supplemental sources of EPA/DHA.

With that insight, Aradhya decided to try adding a marine omega-3 supplement a few times a week-something she hadn't considered before. Over the next few weeks, she began to notice gentle changes: clearer focus during long painting sessions, lighter-feeling joints, and a general sense of balance returning. Nothing dramatic - just a subtle shift that felt right for her body.

That's the value of small, personalized insights. They help you make choices that fit you.

**Disclaimer:** Genetic insights are not diagnostic and do not predict your health outcomes with certainty. They highlight potential tendencies that may influence how your body responds to nutrition or lifestyle factors. Individual results vary, and symptoms like fatigue, joint discomfort, or mental fog can have many causes. Please consult a qualified healthcare professional for medical advice, diagnosis, or treatment.`,
  },
  {
    slug: 'fto-appetite-control',
    title: 'The FTO Effect: Appetite, Decoded',
    excerpt:
      'Despite eating well, hunger always won until his genome explained why.',
    date: 'Jan 2026',
    readTime: '2 min read',
    category: 'explainers',
    format: 'article',
    content: `A single genetic clue can sometimes explain years of unanswered questions.

Samarth ate sensibly and stayed active, and yet his weight kept creeping up. What bothered him most wasn't effort, but the constant hunger and strong cravings, especially for calorie-dense foods. It felt like a battle he kept losing.

His genomic report finally offered context.

Samarth carried moderate-risk variants in the FTO gene, which research has linked to higher appetite and weaker satiety signals. In simple terms, his biology may have been nudging him to eat a bit more - and feel less full, without him realizing why.

With that insight, Samarth didn't chase extreme diets. He made small, targeted changes: prioritizing protein, staying consistent with exercise, eating more mindfully, and experimenting with time-restricted eating to smooth appetite swings. Over time, the noise quieted - fewer cravings, steadier energy, and progress that finally felt sustainable.

That's the value of DNA-based insight - helping you work with your biology.

**Disclaimer:** Genetic variants such as those in the FTO gene indicate tendencies, not certainties. Outcomes depend on lifestyle, environment, and health factors. Please consult a qualified healthcare professional for medical or dietary advice.`,
  },
  {
    slug: 'apoe-cognitive-health',
    title: 'Thinking Long-Term: A Head Start on Brain Health',
    excerpt:
      'A genetic signal helped him think decades ahead before problems began.',
    date: 'Jan 2026',
    readTime: '2 min read',
    category: 'explainers',
    format: 'article',
    content: `Cognitive health wasn't something Chaitanya worried about. Focus was sharp, memory felt strong, and work was demanding but manageable.

His genomic report suggested something worth paying attention to: A variant in APOE (epsilon3/epsilon4) - a gene associated with lipid transport and long-term brain health - indicated a moderately elevated lifetime risk for cognitive decline. Not a diagnosis. Not a certainty. But a signal that lifestyle choices would matter more.

Chaitanya treated it like a long-term investment. He prioritized aerobic exercise, protected sleep, stayed mentally engaged through learning and social activity, and kept cardiovascular risk factors in check. There was no immediate change - and that was the point. These were choices designed to compound quietly over decades.

Genetics didn't tell Chaitanya what will happen. But it helped him decide what to do early when choices matter most!

**Disclaimer:** Genetic insights highlight tendencies, not outcomes. Health and wellness results depend on a combination of lifestyle, environment, and individual health factors. Please consult a qualified healthcare professional before making any medical, dietary, or lifestyle decisions.`,
  },
  {
    slug: 'sirt1-nampt-training-style',
    title: 'Why Consistency Worked Better Than Intensity',
    excerpt:
      'Hard workouts were not the answer. Steady habits were.',
    date: 'Jan 2026',
    readTime: '2 min read',
    category: 'explainers',
    format: 'article',
    content: `For years, Devdutt approached fitness in bursts - intense workouts when motivation was high, followed by long gaps when life got busy. Progress felt uneven. Some weeks were energizing; others left him drained.

His genomic report offered an explanation.

Variants linked to energy metabolism and mitochondrial efficiency - including markers in SIRT1 and NAMPT, suggested that his body adapts best to regular, moderate effort rather than sporadic high intensity. These genes influence how efficiently cells produce and recycle energy, especially during endurance activity.

Instead of pushing harder, Devdutt changed how he trained. He committed to steady cardio most days of the week, paired with light resistance training twice weekly. Nothing extreme, just consistency.

Within months, endurance improved. Recovery felt easier. Exercise stopped feeling like a struggle and became sustainable.

That's what happens when training aligns with biology.

**Disclaimer:** Genetic variants such as SIRT1 and NAMPT are associated with exercise adaptation tendencies but do not determine outcomes. Training response depends on multiple factors, including lifestyle and health status.`,
  },
  {
    slug: 'tcf7l2-slc30a8-glucose',
    title: 'Prevention Before Problems',
    excerpt:
      'His numbers looked fine, but DNA told a quieter story.',
    date: 'Jan 2026',
    readTime: '2 min read',
    category: 'explainers',
    format: 'article',
    content: `Srinivas had always thought of himself as metabolically healthy. His weight was stable, and routine blood tests looked fine.

His genomic report revealed a quieter signal.

Variants in genes such as TCF7L2 and SLC30A8, both linked to glucose regulation and insulin response, suggested a higher long-term risk for metabolic imbalance - even in people who appear healthy early on. These variants don't cause disease, but they do influence how the body handles blood sugar over time.

Instead of waiting for numbers to worsen, Srinivas made small, proactive changes. He paid attention to his meal timing, avoided refined-carb snacking - especially late evenings. He added short walks after dinner, kept strength training consistent, and began monitoring fasting glucose and HbA1c annually.

Nothing dramatic changed overnight. But something important did: the trajectory.

Genomic insight didn't predict a problem - it offered a head start on prevention.

**Disclaimer:** Variants in genes such as TCF7L2 and SLC30A8 are associated with increased Type 2 diabetes risk in both men and women. However, how this risk manifests depends on age, lifestyle, body composition, and hormonal factors.`,
  },
  {
    slug: 'comt-stress-response',
    title: 'Why Pressure Drained Him Faster',
    excerpt:
      'Productive on the outside, exhausted on the inside. DNA explained why.',
    date: 'Jan 2026',
    readTime: '3 min read',
    category: 'explainers',
    format: 'article',
    content: `Rohit was known as dependable. He handled complex projects, tight timelines, and long workdays without complaint. But privately, sustained pressure took a toll. After weeks of back-to-back deadlines, he felt mentally foggy, irritable, and unusually exhausted - long after the workday ended.

What confused him was that he was doing many of the "right things." He exercised regularly, tried to stay productive with task lists and productivity apps, and even pushed himself harder during stressful weeks, assuming discipline would build resilience. Instead, the harder he pushed, the more drained he felt.

His genomic report offered a possible explanation.

Rohit carried a common variant in the COMT gene, which plays a role in how the brain clears dopamine and stress-related neurotransmitters. In simple terms, this can influence how long mental stimulation and stress signals linger in the system. It didn't mean he couldn't perform under pressure, but it suggested that recovery mattered more for him than constant intensity.

With that insight, Rohit made a few small changes. He shortened high-focus work blocks instead of stretching them endlessly, added brief walks between meetings, and replaced intense late-evening workouts with lighter movement on high-stress days. Most importantly, he stopped equating longer hours with better output.

Over time, work felt more sustainable. His focus during the day improved, evenings felt calmer, and stress no longer carried over as heavily from one week to the next.

This is how genomic insight adds clarity-not instructions.

**Disclaimer:** Genetic insights highlight tendencies, not certainties. Stress response and cognitive performance vary based on lifestyle, environment, and individual health factors. This information is for awareness only and should not be taken as medical or psychological advice. Please consult a qualified professional before making changes related to stress management, mental health, or lifestyle routines.`,
  },
  {
    slug: 'dao-histamine-food-sensitivity',
    title: "When Healthy Food Didn't Feel Easy",
    excerpt:
      'Nutritious meals kept backfiring until her genome added context.',
    date: 'Jan 2026',
    readTime: '3 min read',
    category: 'explainers',
    format: 'article',
    content: `Sohini prided herself on eating well. Her meals were home-cooked, balanced, and full of foods most people would call healthy - spinach, tomatoes, fermented dishes, even carefully saved leftovers. Yet, every now and then, she felt off. Some meals left her bloated or restless, and at times she noticed flushing, headaches, or a vague sense of unease.

What made it frustrating was the inconsistency. The same food felt fine one day and uncomfortable the next. She tried cutting things out at random, assuming it was stress or digestion, but patterns remained unclear. Effort alone wasn't giving her answers.

Her genomic report offered a possible lens.

Sohini carried a common variant in the DAO gene, which helps break down histamine from foods. In simple terms, this can influence how efficiently the body processes histamine-rich or histamine-releasing foods. It didn't mean she had an allergy, or that she needed to avoid entire food groups, but it suggested her tolerance threshold might be lower, especially with aged, fermented, or reheated foods.

Instead of strict elimination, Sohini made a few gentle adjustments. She focused on food freshness, rotated ingredients more often, spaced out certain foods rather than stacking them in one meal, and noticed how stress and sleep affected her reactions.

Over time, meals became more predictable. Discomfort didn't vanish completely, but it was easier to anticipate and easier to manage. Food felt nourishing again, not confusing.

This is how genomic insight adds clarity, not instructions.

**Disclaimer:** Genetic insights highlight tendencies, not certainties. Variants related to histamine processing do not diagnose food allergies or intolerances. Food responses vary based on diet, gut health, lifestyle, and environmental factors. This information is for educational purposes only-please consult a qualified healthcare professional before making dietary or health-related changes.`,
  },
  {
    slug: 'pnpla3-fatty-liver-risk',
    title: 'Normal Weight, Unexpected Liver Signals',
    excerpt:
      'Fit on the outside, but his liver told a different story.',
    date: 'Jan 2026',
    readTime: '2 min read',
    category: 'explainers',
    format: 'article',
    content: `Ravi had never worried about his liver. He wasn't overweight, didn't drink much, and stayed reasonably active. Routine tests always came back "mostly normal." So when a scan hinted at early fatty changes, it felt confusing.

He assumed fatty liver was a problem for someone else.

Ravi cleaned up his diet-less oil, fewer sweets-but the concern lingered. Effort alone didn't explain the disconnect between his lifestyle and the finding.

His genomic report highlighted a variant in PNPLA3, a gene associated with how the liver stores and processes fat. Research shows certain variants can increase fatty liver risk independent of body weight-something seen frequently in South Asian populations.

This didn't mean disease was inevitable. It explained why Ravi's liver might be more sensitive to refined carbohydrates and prolonged inactivity, even without visible weight gain.

Ravi made small, targeted changes: reducing sugary snacks and late-night carbs, increasing protein, adding regular walks, and monitoring liver markers periodically.

Follow-ups were reassuring. More importantly, the uncertainty eased.

Genomic insight offered perspective, and helped Ravi listen better to his body.

**Disclaimer:** PNPLA3 variants indicate susceptibility, not disease. Fatty liver risk depends on diet, activity, and metabolic health. This content is educational and not a medical diagnosis. Consult a healthcare professional for screening and management advice.`,
  },
  {
    slug: 'indias-moment-in-genomics',
    title: "India's Moment in Genomics: How Chiranjiv Is Enabling Precision Medicine",
    excerpt:
      "How genetic research's European bias affects Indian healthcare and why Chiranjiv is building India-first precision medicine with representative genetic data.",
    date: 'Jan 2026',
    readTime: '4 min read',
    category: 'company-updates',
    format: 'article',
    externalUrl:
      'https://medium.com/@chiranjivhealth/indias-moment-in-genomics-how-chiranjiv-is-enabling-precision-medicine-ce5df573a33a',
  },
]

export const insights: InsightItem[] = [...mappedBlogInsights, ...knowledgeHubInsights]
