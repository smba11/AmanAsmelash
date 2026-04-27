import { Code2, Network } from "lucide-react"
import { Button } from "@/components/ui/button"
import IntroAnimation from "@/components/ui/scroll-morph-hero"

export default function App() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-border/40 bg-background/50 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="https://github.com/smba11/AmanAsmelash" className="font-semibold">
            Aman Asmelash
          </a>
          <nav className="flex items-center gap-2" aria-label="Primary navigation">
            <Button asChild variant="ghost" size="sm">
              <a href="https://www.linkedin.com/in/aman-asmelash-7727472b3/" target="_blank" rel="noreferrer">
                <Network data-icon="inline-start" />
                LinkedIn
              </a>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <a href="https://github.com/smba11" target="_blank" rel="noreferrer">
                <Code2 data-icon="inline-start" />
                GitHub
              </a>
            </Button>
          </nav>
        </div>
      </header>

      <section className="h-screen w-full">
        <IntroAnimation />
      </section>
    </main>
  )
}
