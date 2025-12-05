import { Link } from 'react-router-dom'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"

interface PolicyLayoutProps {
  title: string
  lastUpdated: string
  category?: string
  children: React.ReactNode
}

export function PolicyLayout({ 
  title, 
  lastUpdated, 
  category,
  children
}: PolicyLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <Link to="/">
            <Button variant="ghost" className="pl-0 mb-6 hover:text-primary-600 hover:bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center">
            {category && (
              <Badge variant="secondary" className="mb-4 uppercase tracking-wider text-primary-600 bg-primary-50 hover:bg-primary-100 border-none">
                {category}
              </Badge>
            )}
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-4">
              {title}
            </h1>
            
            <p className="text-sm text-neutral-500">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </div>

        {/* Content Card */}
        <Card className="bg-white border-neutral-1000 p-6 sm:p-10 shadow-soft rounded-2xl">
          <div className="prose prose-neutral max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-neutral-600 prose-li:text-neutral-600 prose-strong:text-foreground">
            {children}
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-1000">
            <p className="text-sm text-neutral-600">
              Questions about this document? Contact us at{' '}
              <a href="mailto:support@chiranjiv.com" className="text-primary-600 hover:underline font-medium">
                support@chiranjiv.com
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
