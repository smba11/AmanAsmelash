import { Code2, Network } from "lucide-react"
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline"
import { Button } from "@/components/ui/button"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import IntroAnimation from "@/components/ui/scroll-morph-hero"
import { portfolioProjects } from "@/src/projects"

const timelineData = portfolioProjects.map((project) => ({
  id: project.id,
  title: project.title,
  date: project.year,
  content: project.description,
  category: project.category,
  icon: project.icon,
  link: project.link,
  image: project.image,
  relatedIds: project.relatedIds,
  status: project.status,
  energy: project.energy,
}))

export default function App() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="https://github.com/smba11/AmanAsmelash" className="font-semibold">
            Aman Asmelash
          </a>
          <nav className="flex items-center gap-2" aria-label="Primary navigation">
            <Button asChild variant="ghost" size="sm">
              <a href="#projects">Projects</a>
            </Button>
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

      <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-20">
        <div>
          <p className="font-mono text-sm text-primary">&gt; project launcher</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-none md:text-7xl">
            Aman Asmelash builds web projects with motion and purpose.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            A React, TypeScript, Tailwind, and shadcn-style portfolio for exploring tools, games,
            experiments, and portfolio work from GitHub.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LiquidButton
              size="xl"
              className="text-primary-foreground"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Code2 data-icon="inline-start" />
              View Projects
            </LiquidButton>
            <Button asChild variant="outline">
              <a href="https://www.linkedin.com/in/aman-asmelash-7727472b3/" target="_blank" rel="noreferrer">
                <Network data-icon="inline-start" />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>

        <div>
          <div className="h-[420px] overflow-hidden rounded-lg border border-border bg-card md:h-[560px]">
            <IntroAnimation />
          </div>
        </div>
      </section>

      <section id="projects" className="min-h-screen px-3 py-3 md:px-5 md:py-5">
        <RadialOrbitalTimeline timelineData={timelineData} />
      </section>
    </main>
  )
}
