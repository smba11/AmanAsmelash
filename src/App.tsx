import { Code2, Network } from "lucide-react"
import { ProjectShowcase } from "@/components/ui/project-showcase"
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline"
import { Button } from "@/components/ui/button"
import { portfolioProjects } from "@/src/projects"

const timelineData = portfolioProjects.map((project) => ({
  id: project.id,
  title: project.title,
  date: project.year,
  content: project.description,
  category: project.category,
  icon: project.icon,
  relatedIds: project.relatedIds,
  status: project.status,
  energy: project.energy,
}))

export default function App() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="https://github.com/smba11/AmanAsmelash" className="flex items-center gap-3 font-semibold">
            <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground">A</span>
            <span>Aman Asmelash</span>
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

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:py-24">
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
            <Button asChild>
              <a href="https://github.com/smba11/AmanAsmelash" target="_blank" rel="noreferrer">
                <Code2 data-icon="inline-start" />
                Portfolio Repo
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://www.linkedin.com/in/aman-asmelash-7727472b3/" target="_blank" rel="noreferrer">
                <Network data-icon="inline-start" />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-3">
          <RadialOrbitalTimeline timelineData={timelineData} />
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-5xl px-5 pb-20">
        <ProjectShowcase />
      </section>
    </main>
  )
}
