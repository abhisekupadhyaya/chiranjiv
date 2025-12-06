import { Hero } from "@/components/home/Hero"
import { Residual } from "@/components/home/Residual"

function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
      <Hero />
      <Residual />
    </main>
  )
}

export default Home
