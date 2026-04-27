import { Code2, Network } from "lucide-react"
import { Button } from "@/components/ui/button"
import IntroAnimation from "@/components/ui/scroll-morph-hero"
import { ThemeSwitch } from "@/components/ui/theme-switch-button"

export default function App() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-border/40 bg-background/50 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="https://github.com/smba11/AmanAsmelash" className="font-semibold">
            Aman Asmelash
          </a>
          <nav className="flex items-center gap-2" aria-label="Primary navigation">
            <ThemeSwitch className="border border-border bg-background/70 text-foreground" />
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

      <section className="mx-auto grid min-h-screen max-w-6xl place-items-center px-5 py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-sm text-primary">&gt; selected links</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">The cards are the index.</h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Scroll through the arc, pick a project, and use the back face of each card to jump into the live build or repo.
          </p>
        </div>
      </section>
    </main>
  )
}
