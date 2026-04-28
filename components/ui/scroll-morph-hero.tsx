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
const MAX_SCROLL = 3000
const RELEASE_SCROLL = MAX_SCROLL - 40

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t
const wrap = (value: number, length: number) => ((value % length) + length) % length

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
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl bg-gray-200 shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent transition-colors group-hover:from-black/20" />
          <div className="absolute bottom-1.5 left-1.5 right-1.5 truncate text-[7px] font-bold text-white drop-shadow">
            {project.title}
          </div>
        </div>

        <div
          className="absolute inset-0 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-white/35 bg-neutral-950 p-4 shadow-[0_18px_30px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.26)]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="text-center text-white">
            <p className="mb-2 text-[8px] font-bold uppercase tracking-widest text-primary">{project.category}</p>
            <p className="mb-3 line-clamp-2 text-[9px] font-semibold leading-tight">{project.title}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/35 px-3 py-1 text-[10px] font-semibold text-white underline-offset-4 hover:bg-white hover:text-neutral-950"
            >
              Open
            </a>
          </div>
        </div>
      </motion.div>
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

  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1])
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 })
  const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360])
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 })
  const mouseX = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const relativeX = e.clientX - rect.left
      const normalizedX = (relativeX / rect.width) * 2 - 1
      mouseX.set(normalizedX * 100)
    }
    container.addEventListener("mousemove", handleMouseMove)
    return () => container.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX])

  useEffect(() => {
    const timer1 = setTimeout(() => setIntroPhase("line"), 500)
    const timer2 = setTimeout(() => setIntroPhase("circle"), 2500)
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
  const [rotateValue, setRotateValue] = useState(0)
  const [parallaxValue, setParallaxValue] = useState(0)

  useEffect(() => {
    const unsubscribeMorph = smoothMorph.on("change", setMorphValue)
    const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue)
    const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue)
    return () => {
      unsubscribeMorph()
      unsubscribeRotate()
      unsubscribeParallax()
    }
  }, [smoothMorph, smoothMouseX, smoothScrollRotate])

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden bg-[#FAFAFA]">
      <div className="flex h-full w-full flex-col items-center justify-center [perspective:1000px]">
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
            className="max-w-52 text-lg font-medium leading-tight tracking-tight text-gray-800 md:max-w-72 md:text-2xl"
          >
            Scroll through the projects.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.5 - morphValue } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-3 text-[10px] font-bold tracking-[0.18em] text-gray-500"
          >
            SCROLL OR SWIPE
          </motion.p>
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

              const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5)
              const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1)
              const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25)
              const arcCenterY = arcApexY + arcRadius
              const spreadAngle = isMobile ? 100 : 130
              const startAngle = -90 - spreadAngle / 2
              const step = spreadAngle / totalProjects
              const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1)
              const carouselOffset = scrollProgress * totalProjects
              const wrappedIndex = wrap(i - carouselOffset, totalProjects)
              const currentArcAngle = startAngle + wrappedIndex * step
              const arcRad = (currentArcAngle * Math.PI) / 180

              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: isMobile ? 1.18 : 1.5,
              }

              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(1, arcPos.scale, morphValue),
                opacity: 1,
              }
            }

            return <FlipCard key={project.id} project={project} index={i} total={totalProjects} phase={introPhase} target={target} />
          })}
        </div>
      </div>
    </div>
  )
}
