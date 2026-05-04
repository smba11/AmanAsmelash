import { useCallback, useState } from "react"
import { Code2, Images, Mail, Network } from "lucide-react"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import IntroAnimation from "@/components/ui/scroll-morph-hero"
import { ThemeSwitch } from "@/components/ui/theme-switch-button"
import { ProjectGallery } from "@/components/project-gallery"

export default function App() {
  const [galleryOpen, setGalleryOpen] = useState(false)
  const openGallery = useCallback(() => setGalleryOpen(true), [])
  const closeGallery = useCallback(() => setGalleryOpen(false), [])

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed left-0 right-0 top-0 z-40 border-b bg-background/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-5 md:py-4">
          <a href="https://github.com/smba11/AmanAsmelash" className="shrink-0 text-sm font-semibold sm:text-base md:text-lg">
            Aman Asmelash
          </a>
          <nav className="flex min-w-0 items-center gap-1.5 overflow-x-auto sm:gap-2" aria-label="Primary navigation">
            <ThemeSwitch className="size-8 shrink-0 border border-border bg-background/70 text-foreground md:size-9" />
            <LiquidButton type="button" variant="ghost" size="sm" onClick={openGallery} aria-label="Open gallery">
              <Images data-icon="inline-start" />
              <span className="hidden sm:inline">Gallery</span>
            </LiquidButton>
            <LiquidButton asChild variant="ghost" size="sm">
              <a href="https://www.linkedin.com/in/aman-asmelash-7727472b3/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Network data-icon="inline-start" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </LiquidButton>
            <LiquidButton asChild variant="ghost" size="sm">
              <a href="https://github.com/smba11" target="_blank" rel="noreferrer" aria-label="GitHub">
                <Code2 data-icon="inline-start" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </LiquidButton>
          </nav>
        </div>
      </header>

      <section className="h-screen w-full">
        <IntroAnimation />
      </section>

      <section id="about" className="mx-auto grid min-h-screen max-w-6xl place-items-center px-5 py-20 md:py-24">
        <div className="grid w-full gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="font-mono text-sm text-primary">&gt; about</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">I build small ideas until they feel real.</h2>
          </div>
          <div className="flex flex-col gap-5 text-base leading-7 text-muted-foreground md:gap-6 md:text-lg md:leading-8">
            <p>
              I am Aman Asmelash, a developer who likes turning rough ideas into usable web experiences. My projects move between
              games, music tools, planning helpers, and experiments that help me sharpen the way products feel.
            </p>
            <p>
              This site is meant to be a living shelf for that work: quick to browse, visual first, and easy to keep adding to as
              the projects grow.
            </p>
            <div>
              <LiquidButton type="button" variant="secondary" onClick={openGallery}>
                <Images data-icon="inline-start" />
                Open screenshot gallery
              </LiquidButton>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto grid min-h-screen max-w-6xl place-items-center px-5 py-20 md:py-24">
        <div className="w-full max-w-3xl">
          <p className="font-mono text-sm text-primary">&gt; contact</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">Want to build something or talk through an idea?</h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
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

      {galleryOpen ? <ProjectGallery onClose={closeGallery} /> : null}
    </main>
  )
}
