import { Card } from '@/components/ui/card'

interface BlogPostProps {
  title: string
  subtitle?: string
  date?: string
  content: string
}

export function BlogPost({ title, subtitle, date, content }: BlogPostProps) {
  const parseContent = (text: string) => {
    const sections = text.split(/(?=^## \d+\.)/gm).filter(Boolean)
    return sections.map((section, index) => {
      const lines = section.trim().split('\n')
      const titleMatch = lines[0].match(/^## (\d+\.\s+.+)$/)
      const sectionTitle = titleMatch ? titleMatch[1] : null
      const sectionContent = titleMatch ? lines.slice(1).join('\n') : section
      return (
        <section key={index} className="mb-12 last:mb-0">
          {sectionTitle && (
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{sectionTitle}</h3>
            </div>
          )}
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            {sectionContent.split('\n\n').map((paragraph, pIndex) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <p key={pIndex} className="text-lg font-semibold text-foreground/90 italic">
                    {paragraph.replace(/\*\*/g, '')}
                  </p>
                )
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n- ').map((item) => item.replace(/^- /, ''))
                return (
                  <ul key={pIndex} className="space-y-3 ml-4">
                    {items.map((item, iIndex) => (
                      <li key={iIndex} className="flex gap-3">
                        <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )
              }
              if (/^\*\*Phase \d+/.test(paragraph)) {
                const [titleLine, ...rest] = paragraph.split('\n')
                const phaseTitle = titleLine.replace(/\*\*/g, '')
                return (
                  <div key={pIndex} className="bg-primary/5 rounded-lg p-5 border-l-4 border-primary">
                    <h4 className="text-lg font-bold text-primary mb-3">{phaseTitle}</h4>
                    <div className="space-y-2 text-muted-foreground">
                      {rest.map((line, lIndex) => (
                        <p key={lIndex}>{line}</p>
                      ))}
                    </div>
                  </div>
                )
              }
              if (/^\d+\.\s+\*\*/.test(paragraph)) {
                return (
                  <p key={pIndex} className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">{paragraph.match(/^(\d+\.)/)?.[1]}</span>
                    <span className="font-medium text-foreground/90">{paragraph.replace(/^\d+\.\s+/, '').replace(/\*\*/g, '')}</span>
                  </p>
                )
              }
              return (
                <p key={pIndex} className="text-base leading-relaxed">
                  {paragraph.split(/(\*\*.*?\*\*)/).map((part, partIndex) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return (
                        <strong key={partIndex} className="font-semibold text-foreground">
                          {part.replace(/\*\*/g, '')}
                        </strong>
                      )
                    }
                    return part
                  })}
                </p>
              )
            })}
          </div>
        </section>
      )
    })
  }

  return (
    <Card className="p-6 sm:p-10 lg:p-14 bg-card border-border hover:border-primary/30 transition-all duration-300 shadow-lg">
      <article className="max-w-3xl mx-auto">
        <div className="mb-10 pb-8 border-b border-border/50">
          {date && <p className="text-sm font-medium text-primary mb-3 uppercase tracking-wider">{date}</p>}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance leading-tight">
            {title}
          </h2>
          {subtitle && <p className="text-lg sm:text-xl text-muted-foreground text-balance leading-relaxed">{subtitle}</p>}
        </div>
        <div className="prose-custom">{parseContent(content)}</div>
      </article>
    </Card>
  )
}


