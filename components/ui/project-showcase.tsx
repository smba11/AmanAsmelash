"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { portfolioProjects } from "@/src/projects"

export function ProjectShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    setIsVisible(false)
  }

  return (
    <section ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full px-6 py-16">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Selected Work</p>
          <h2 className="mt-3 max-w-xl text-4xl font-semibold leading-tight text-foreground md:text-6xl">
            All projects, built as a browsable portfolio surface.
          </h2>
        </div>
        <p className="hidden max-w-xs text-sm leading-6 text-muted-foreground md:block">
          Hover a project for a visual preview, then open the repo when something catches your eye.
        </p>
      </div>

      <div
        className="pointer-events-none fixed z-50 hidden overflow-hidden rounded-xl shadow-2xl md:block"
        style={{
          left: containerRef.current?.getBoundingClientRect().left ?? 0,
          top: containerRef.current?.getBoundingClientRect().top ?? 0,
          transform: `translate3d(${smoothPosition.x + 24}px, ${smoothPosition.y - 110}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative h-[180px] w-[280px] overflow-hidden rounded-xl bg-secondary">
          {portfolioProjects.map((project, index) => (
            <img
              key={project.title}
              src={project.image}
              alt=""
              className="absolute inset-0 size-full object-cover transition-all duration-500 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                scale: hoveredIndex === index ? 1 : 1.1,
                filter: hoveredIndex === index ? "none" : "blur(10px)",
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </div>
      </div>

      <div>
        {portfolioProjects.map((project, index) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="group block"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative border-t border-border py-5 transition-all duration-300 ease-out">
              <div
                className={`absolute inset-0 -mx-4 rounded-lg bg-secondary/50 px-4 transition-all duration-300 ease-out ${
                  hoveredIndex === index ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
              />

              <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="inline-flex items-center gap-2">
                    <h3 className="text-lg font-medium tracking-tight text-foreground">
                      <span className="relative">
                        {project.title}
                        <span
                          className={`absolute -bottom-0.5 left-0 h-px bg-foreground transition-all duration-300 ease-out ${
                            hoveredIndex === index ? "w-full" : "w-0"
                          }`}
                        />
                      </span>
                    </h3>

                    <ArrowUpRight
                      className={`size-4 text-muted-foreground transition-all duration-300 ease-out ${
                        hoveredIndex === index
                          ? "translate-x-0 translate-y-0 opacity-100"
                          : "-translate-x-2 translate-y-2 opacity-0"
                      }`}
                    />
                  </div>

                  <p
                    className={`mt-1 text-sm leading-relaxed transition-all duration-300 ease-out ${
                      hoveredIndex === index ? "text-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {project.description}
                  </p>
                </div>

                <span
                  className={`font-mono text-xs tabular-nums text-muted-foreground transition-all duration-300 ease-out ${
                    hoveredIndex === index ? "text-foreground/60" : ""
                  }`}
                >
                  {project.year}
                </span>
              </div>
            </div>
          </a>
        ))}

        <div className="border-t border-border" />
      </div>
    </section>
  )
}
