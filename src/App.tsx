import { Code2, Mail, Network } from "lucide-react"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
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
            <LiquidButton asChild variant="ghost" size="sm">
              <a href="https://www.linkedin.com/in/aman-asmelash-7727472b3/" target="_blank" rel="noreferrer">
                <Network data-icon="inline-start" />
                LinkedIn
              </a>
            </LiquidButton>
            <LiquidButton asChild variant="ghost" size="sm">
              <a href="https://github.com/smba11" target="_blank" rel="noreferrer">
                <Code2 data-icon="inline-start" />
                GitHub
              </a>
            </LiquidButton>
          </nav>
        </div>
      </header>

      <section className="h-screen w-full">
        <IntroAnimation />
      </section>

      <section id="about" className="mx-auto grid min-h-screen max-w-6xl place-items-center px-5 py-24">
        <div className="grid w-full gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="font-mono text-sm text-primary">&gt; about</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">I build small ideas until they feel real.</h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-muted-foreground">
            <p>
              I am Aman Asmelash, a developer who likes turning rough ideas into usable web experiences. My projects move between
              games, music tools, planning helpers, and experiments that help me sharpen the way products feel.
            </p>
            <p>
              This site is meant to be a living shelf for that work: quick to browse, visual first, and easy to keep adding to as
              the projects grow.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto grid min-h-screen max-w-6xl place-items-center px-5 py-24">
        <div className="w-full max-w-3xl">
          <p className="font-mono text-sm text-primary">&gt; contact</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">Want to build something or talk through an idea?</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Send me an email and I will get back to you when I can. I am always down to compare notes on projects, products, and
            what makes an interface feel sharp.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <LiquidButton asChild size="xl">
              <a href="mailto:simba.1w34@gmail.com">
                <Mail data-icon="inline-start" />
                Email me
              </a>
            </LiquidButton>
          </div>
        </div>
      </section>
    </main>
  )
}
