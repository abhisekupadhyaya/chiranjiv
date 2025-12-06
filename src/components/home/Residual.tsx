import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Activity, Layout, Clock } from "lucide-react"

export function Residual() {
  return (
    <>
      {/* Cards Grid Section */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {/* Card 1 */}
        <Card className="group relative overflow-hidden rounded-2xl border-neutral-1000 bg-white p-6 shadow-soft transition-all hover:shadow-lift sm:p-8">
          <CardHeader>
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-300/20 text-primary-600">
              <Activity className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg font-semibold text-neutral-200">Primary Green</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600">
              The core brand signal. Used for primary actions, growth, and positive states.
            </p>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="group relative overflow-hidden rounded-2xl border-neutral-1000 bg-white p-6 shadow-soft transition-all hover:shadow-lift sm:p-8">
          <CardHeader>
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-300/20 text-secondary-600">
              <Layout className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg font-semibold text-neutral-200">Secondary Blue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600">
              For trust, data density, navigation, and deep links.
            </p>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="group relative overflow-hidden rounded-2xl border-neutral-1000 bg-white p-6 shadow-soft transition-all hover:shadow-lift sm:p-8">
          <CardHeader>
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500/20 text-accent-500">
              <Clock className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg font-semibold text-neutral-200">Accent Teal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600">
                A bridge color. Used sparingly for special emphasis and data visualization.
            </p>
          </CardContent>
        </Card>
      </section>
      
      {/* Example Form Section */}
      <section className="mt-16 rounded-3xl border border-neutral-1000 bg-white p-6 shadow-sm sm:mt-24 sm:p-10">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="mb-6 text-2xl font-semibold text-neutral-200">Join the waitlist</h2>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="h-12 w-full flex-1 rounded-xl border-neutral-1000 bg-neutral-1200 px-4 text-neutral-200 placeholder:text-neutral-800 focus-visible:ring-2 focus-visible:ring-primary-400/20 focus-visible:border-primary-400"
              />
              <Button size="lg" className="h-12 w-full px-8 sm:w-auto">Subscribe</Button>
            </div>
            <p className="mt-4 text-sm text-neutral-600">
              No spam. Unsubscribe at any time.
            </p>
          </div>
      </section>
    </>
  )
}
