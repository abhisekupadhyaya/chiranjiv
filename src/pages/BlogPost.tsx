import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { BlogPost as Post } from '@/components/blog-post'

export default function BlogPost() {
  const { slug } = useParams()
  if (slug === 'why-23andme-cant-tell-indian-ancestry') {
    const blogPost = {
      title:
        "Why 23andMe Can't Tell You You're Maharashtrian, Punjabi, or Tamil — and Why Chiranjiv Can",
      date: '2025',
      content: `## 1. The Missing Map of India's DNA

If you've ever done a 23andMe or AncestryDNA test and seen the result "100% Indian," you've probably wondered why it feels so vague.

India is home to **more than 4,000 ethnic and linguistic groups**, yet these global platforms can't tell you if you have roots in Maharashtra, Punjab, or Tamil Nadu.

It's not because your DNA lacks the information — **it's because the reference maps they use don't.**

India is among the most genetically diverse yet least genetically mapped countries in the world. Western ancestry databases are rich in European and North American genomes, but have only a few hundred Indian samples — too little to capture our immense diversity.

---

## 2. Why Western Databases Fall Short

23andMe and other ancestry platforms work by comparing your genome to their internal reference datasets — the "known populations" that define categories like "French," "Italian," or "Japanese."

When there are too few Indian reference samples, their algorithms lump everyone into a single **"South Asian"** or **"Indian"** category.

This means a Maharashtrian, a Punjabi, and a Tamil person might all get the same ancestry result — even though their regional genetic profiles differ as much as Northern vs. Southern Europeans.

**The issue isn't your DNA — it's the missing data.**

---

## 3. India's Genetic Mosaic

India's genetic structure is incredibly rich:

- Thousands of years of migration and endogamy created **hundreds of distinct sub-populations**
- Major ancestral streams — **Indo-Aryan, Dravidian, Austroasiatic, Tibeto-Burman** — overlap and blend in unique regional ways
- Even within a single state, genetic patterns shift every few hundred kilometers

This complexity means that to truly understand Indian ancestry, you need **millions of reference genomes** from across all castes, regions, and linguistic groups.

---

## 4. Why India Is Underrepresented

The reason is simple but structural:

- Genome sequencing in India has been **expensive and fragmented**
- Global genomics companies have historically focused on Western customers
- Indian data-sharing laws and privacy frameworks limited open exchange
- Large-scale efforts like the GenomeIndia Project (10,000 individuals) are only now taking shape

So while Europe has biobanks with over **500,000 sequenced genomes**, India is still in the tens of thousands.

---

## 5. Where Chiranjiv Comes In

**Project Chiranjiv was built to fill this gap — ethically, transparently, and at scale.**

By offering free full-genome sequencing across India, Chiranjiv will build the world's most detailed reference map of Indian sub-populations.

Our mission is to make genomic knowledge truly representative — capturing the genetic signatures of Maharashtrians, Punjabis, Tamils, and every other region and community.

With enough data, Chiranjiv can:

- Identify regional ancestry patterns
- Discover new health insights
- Train AI models that actually reflect Indian biology

---

## 6. Beyond Ancestry — Toward Health and Discovery

Chiranjiv isn't just about telling you where you're from — it's about using that information to improve your health and wellness:

- **Nutrition and supplement plans** based on your genetic metabolism
- **Early risk prediction** for region-specific diseases
- **Precision medicine** that reflects your ancestry and environment

Every person who participates helps make the picture clearer for the next generation — and for the world.

---

## 7. From India, for the World

The ultimate goal isn't to build an Indian database just for India — **it's to create the world's most inclusive, privacy-first genomic platform.**

When India leads in genomic diversity, global science benefits.

So the next time a global ancestry site tells you "100% Indian," remember: **it's not the whole story.**

Chiranjiv's mission is to write that missing chapter — with India's diversity at its core, and the world in mind.

---

**Your DNA. Your Future. Free Forever.**`,
    }
    return (
      <div className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Blog</span>
          </Link>
          <Post title={blogPost.title} date={blogPost.date} content={blogPost.content} />
        </div>
      </div>
    )
  }
  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Blog</span>
        </Link>
        <h1 className="text-2xl font-semibold text-foreground">Post not found</h1>
      </div>
    </div>
  )
}


