import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface PolicyLayoutProps {
  title: string
  effectiveDate?: string
  lastUpdated: string
  children: React.ReactNode
}

export function PolicyLayout({ title, effectiveDate, lastUpdated, children }: PolicyLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <Link to="/">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">{title}</h1>
            {effectiveDate && (
              <p className="text-sm text-muted-foreground">
                <strong>Effective Date:</strong> {effectiveDate}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              <strong>Last Updated:</strong> {lastUpdated}
            </p>
          </div>
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">{children}</div>
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Questions about this document? Contact us at{' '}
              <a href="mailto:privacy@chiranjiv.com" className="text-primary hover:underline">
                privacy@chiranjiv.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


