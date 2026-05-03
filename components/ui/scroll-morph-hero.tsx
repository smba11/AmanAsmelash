"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { portfolioProjects } from "@/src/projects"

export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip"

interface FlipCardProps {
  project: (typeof portfolioProjects)[number]
  index: number
  total: number
  phase: AnimationPhase
  target: { x: number; y: number; rotation: number; scale: number; opacity: number }
}

const IMG_WIDTH = 92
const IMG_HEIGHT = 130
const MAX_SCROLL = 1300
const RELEASE_SCROLL = MAX_SCROLL - 40
const MORPH_END = 360

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t
function FlipCard({ project, index, target }: FlipCardProps) {
  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 15,
      }}
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="group cursor-pointer"
    >
      <motion.a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="relative block h-full w-full overflow-hidden rounded-xl bg-gray-200 shadow-lg outline-none ring-primary/40 transition-shadow focus-visible:ring-4"
        transition={{ duration: 0.35, type: "spring", stiffness: 260, damping: 22 }}
        whileHover={{ scale: 1.18, y: -14 }}
        whileFocus={{ scale: 1.18, y: -14 }}
      >
        <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent transition-colors group-hover:from-black/82" />
        <div className="absolute inset-x-2 bottom-2 text-white drop-shadow">
          <p className="mb-1 text-[6px] font-bold uppercase tracking-[0.16em] text-primary">{project.category}</p>
          <p className="line-clamp-2 text-[8px] font-bold leading-tight">{project.title}</p>
          <span className="mt-1.5 inline-flex rounded-full border border-white/45 px-2 py-0.5 text-[7px] font-semibold opacity-0 transition-opacity group-hover:opacity-100">
            Open
          </span>
        </div>
      </motion.a>
    </motion.div>
  )
}

export default function IntroAnimation() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter")
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    }

    const observer = new ResizeObserver(handleResize)
    observer.observe(containerRef.current)

    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    })

    return () => observer.disconnect()
  }, [])

  const virtualScroll = useMotionValue(0)
  const scrollRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      const wantsPastEnd = scrollRef.current >= RELEASE_SCROLL && e.deltaY > 0
      const wantsBeforeStart = scrollRef.current <= 0 && e.deltaY < 0

      if (wantsPastEnd || wantsBeforeStart) {
        return
      }

      e.preventDefault()
      const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL)
      scrollRef.current = newScroll
      virtualScroll.set(newScroll)
    }

    let touchStartY = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY
      const deltaY = touchStartY - touchY
      touchStartY = touchY

      const wantsPastEnd = scrollRef.current >= RELEASE_SCROLL && deltaY > 0
      const wantsBeforeStart = scrollRef.current <= 0 && deltaY < 0

      if (wantsPastEnd || wantsBeforeStart) {
        return
      }

      e.preventDefault()
      const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL)
      scrollRef.current = newScroll
      virtualScroll.set(newScroll)
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    container.addEventListener("touchstart", handleTouchStart, { passive: false })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      container.removeEventListener("wheel", handleWheel)
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
    }
  }, [virtualScroll])

  const morphProgress = useTransform(virtualScroll, [0, MORPH_END], [0, 1])
  const smoothMorph = useSpring(morphProgress, { stiffness: 58, damping: 19 })
  const browseProgress = useTransform(virtualScroll, [MORPH_END, MAX_SCROLL], [0, 1])
  const smoothBrowse = useSpring(browseProgress, { stiffness: 70, damping: 22 })
  useEffect(() => {
    const timer1 = setTimeout(() => setIntroPhase("line"), 260)
    const timer2 = setTimeout(() => setIntroPhase("circle"), 1050)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const projects = portfolioProjects
  const totalProjects = projects.length

  const scatterPositions = useMemo(() => {
    return projects.map(() => ({
      x: (Math.random() - 0.5) * 1500,
      y: (Math.random() - 0.5) * 1000,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    }))
  }, [projects])

  const [morphValue, setMorphValue] = useState(0)
  const [browseValue, setBrowseValue] = useState(0)

  useEffect(() => {
    const unsubscribeMorph = smoothMorph.on("change", setMorphValue)
    const unsubscribeBrowse = smoothBrowse.on("change", setBrowseValue)
    return () => {
      unsubscribeMorph()
      unsubscribeBrowse()
    }
  }, [smoothBrowse, smoothMorph])

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden bg-background">
      <div className="absolute inset-0 bg-background" />
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center [perspective:1000px]">
        <div className="absolute left-6 top-6 z-20 md:left-10 md:top-10">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Aman Asmelash</p>
        </div>

        <div className="pointer-events-none absolute top-1/2 z-0 flex -translate-y-1/2 flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(10px)" }
            }
            transition={{ duration: 1 }}
            className="max-w-52 text-lg font-medium leading-tight tracking-tight text-foreground md:max-w-72 md:text-2xl"
          >
            Scroll through the projects.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.5 - morphValue } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-3 text-[10px] font-bold tracking-[0.18em] text-muted-foreground"
          >
            SCROLL OR SWIPE
          </motion.p>
        </div>

        <div
          className="pointer-events-none absolute left-1/2 top-[28%] z-10 w-[min(86vw,34rem)] -translate-x-1/2 text-center"
          style={{
            opacity: Math.max(0, Math.min(1, (morphValue - 0.42) / 0.24)),
            transform: `translate(-50%, ${12 - Math.max(0, Math.min(1, (morphValue - 0.42) / 0.24)) * 12}px)`,
            transition: "opacity 160ms ease, transform 160ms ease",
          }}
        >
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary">selected work</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-foreground md:text-5xl">Projects you can open, inspect, and play with.</h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground md:text-base">
            Move through the card arc, hover to enlarge a project, and jump straight into the live build or repo.
          </p>
        </div>

        <div className="relative flex h-full w-full items-center justify-center">
          {projects.map((project, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 }

            if (introPhase === "scatter") {
              target = scatterPositions[i]
            } else if (introPhase === "line") {
              const lineSpacing = 108
              const lineTotalWidth = totalProjects * lineSpacing
              const lineX = i * lineSpacing - lineTotalWidth / 2
              target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 }
            } else {
              const isMobile = containerSize.width < 768
              const minDimension = Math.min(containerSize.width, containerSize.height)
              const circleRadius = Math.min(minDimension * 0.35, 350)
              const circleAngle = (i / totalProjects) * 360
              const circleRad = (circleAngle * Math.PI) / 180
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius,
                rotation: circleAngle + 90,
              }

              const arcRadius = Math.min(containerSize.width * (isMobile ? 0.88 : 0.55), containerSize.height * (isMobile ? 0.98 : 0.78))
              const arcApexY = containerSize.height * (isMobile ? 0.22 : 0.18)
              const arcCenterY = arcApexY + arcRadius
              const step = isMobile ? 19 : 16
              const visibleLimit = isMobile ? 76 : 72
              const centeredIndex = browseValue * Math.max(totalProjects - 1, 1)
              const relativeIndex = i - centeredIndex
              const currentArcAngle = -90 + relativeIndex * step
              const arcRad = (currentArcAngle * Math.PI) / 180
              const distanceFromCenter = Math.abs(relativeIndex)
              const visibleOpacity = Math.max(0.18, 1 - Math.max(0, Math.abs(currentArcAngle + 90) - visibleLimit) / 28)

              const arcPos = {
                x: Math.cos(arcRad) * arcRadius,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: (isMobile ? 1.08 : 1.32) * Math.max(0.82, 1 - distanceFromCenter * 0.035),
              }

              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(1, arcPos.scale, morphValue),
                opacity: lerp(1, visibleOpacity, morphValue),
              }
            }

            return <FlipCard key={project.id} project={project} index={i} total={totalProjects} phase={introPhase} target={target} />
          })}
        </div>
      </div>
    </div>
  )
}
