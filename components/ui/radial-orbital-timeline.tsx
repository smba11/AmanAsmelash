"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, ExternalLink, Link, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TimelineItem {
  id: number
  title: string
  date: string
  content: string
  category: string
  icon: React.ElementType
  link: string
  image: string
  relatedIds: number[]
  status: "completed" | "in-progress" | "pending"
  energy: number
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[]
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})
  const [rotationAngle, setRotationAngle] = useState<number>(0)
  const [autoRotate, setAutoRotate] = useState<boolean>(true)
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({})
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1280
  const centerOffset = { x: 0, y: viewportWidth < 640 ? 96 : 0 }

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId)
    return currentItem ? currentItem.relatedIds : []
  }

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId)
    const totalNodes = timelineData.length
    const targetAngle = (nodeIndex / totalNodes) * 360

    setRotationAngle(270 - targetAngle)
  }

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({})
      setActiveNodeId(null)
      setPulseEffect({})
      setAutoRotate(true)
    }
  }

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev }
      Object.keys(newState).forEach((key) => {
        if (Number.parseInt(key) !== id) {
          newState[Number.parseInt(key)] = false
        }
      })

      newState[id] = !prev[id]

      if (!prev[id]) {
        setActiveNodeId(id)
        setAutoRotate(false)

        const relatedItems = getRelatedItems(id)
        const newPulseEffect: Record<number, boolean> = {}
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true
        })
        setPulseEffect(newPulseEffect)

        centerViewOnNode(id)
      } else {
        setActiveNodeId(null)
        setAutoRotate(true)
        setPulseEffect({})
      }

      return newState
    })
  }

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)))
      }, 50)
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer)
      }
    }
  }, [autoRotate])

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360
    const width = viewportWidth
    const radius = width < 640 ? 135 : width < 1024 ? 260 : 390
    const radian = (angle * Math.PI) / 180

    const x = radius * Math.cos(radian) + centerOffset.x
    const y = radius * Math.sin(radian) + centerOffset.y

    const zIndex = Math.round(100 + 50 * Math.cos(radian))
    const minOpacity = width < 640 ? 0.22 : 0.4
    const opacity = Math.max(minOpacity, Math.min(1, minOpacity + (1 - minOpacity) * ((1 + Math.sin(radian)) / 2)))

    return { x, y, zIndex, opacity }
  }

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false
    const relatedItems = getRelatedItems(activeNodeId)
    return relatedItems.includes(itemId)
  }

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "border-white bg-black text-white"
      case "in-progress":
        return "border-black bg-white text-black"
      case "pending":
        return "border-white/50 bg-black/40 text-white"
      default:
        return "border-white/50 bg-black/40 text-white"
    }
  }

  const activeItem = timelineData.find((item) => item.id === activeNodeId) ?? timelineData[0]

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-border bg-black"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <img src={activeItem.image} alt="" className="absolute inset-0 size-full object-cover opacity-15 blur-sm" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.18),transparent_34rem),linear-gradient(180deg,rgba(0,0,0,0.52),rgba(0,0,0,0.96))]" />
      <div className="pointer-events-none absolute left-6 top-6 z-30 max-w-xl md:left-10 md:top-10">
        <p className="font-mono text-sm text-primary">&gt; project wheel</p>
        <h2 className="mt-3 text-4xl font-semibold leading-none text-white md:text-6xl">Spin through the work.</h2>
        <p className="mt-4 max-w-md text-sm leading-6 text-white/60 md:text-base">
          Tap a card to lock onto it, see connected projects, and open the live build.
        </p>
      </div>
      <div className="relative flex min-h-screen w-full max-w-7xl items-center justify-center px-5">
        <div
          className="absolute flex size-full items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className="absolute z-10 hidden w-[22rem] rounded-lg border border-white/15 bg-black/45 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl md:block">
            <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
              <img src={activeItem.image} alt="" className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
              <Badge className="absolute left-3 top-3 border-white/20 bg-black/65 text-white">{activeItem.category}</Badge>
            </div>
            <h3 className="text-2xl font-semibold text-white">{activeItem.title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/65">{activeItem.content}</p>
            <div className="mt-5 flex items-center justify-between gap-3">
              <div className="text-xs font-mono text-white/50">{activeItem.date} / {activeItem.status}</div>
              <Button asChild size="sm" className="bg-white text-black hover:bg-white/90">
                <a href={activeItem.link} target="_blank" rel="noreferrer">
                  Open
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </Button>
            </div>
          </div>

          <div className="absolute size-[22rem] rounded-full border border-white/10 sm:size-[32rem] lg:size-[42rem]" />
          <div className="absolute size-[15rem] rounded-full border border-dashed border-white/10 sm:size-[23rem] lg:size-[31rem]" />

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length)
            const isExpanded = expandedItems[item.id]
            const isRelated = isRelatedToActive(item.id)
            const isPulsing = pulseEffect[item.id]
            const Icon = item.icon

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            }

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el
                }}
                className="absolute cursor-pointer transition-all duration-700"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleItem(item.id)
                }}
              >
                <div
                  className={`absolute -inset-1 rounded-full ${isPulsing ? "animate-pulse duration-1000" : ""}`}
                  style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                />

                <div
                  className={`group relative w-28 overflow-hidden rounded-lg border transition-all duration-300 sm:w-52 ${
                    isExpanded
                      ? "scale-110 border-primary bg-white text-black shadow-2xl shadow-primary/20"
                      : isRelated
                        ? "animate-pulse border-white bg-white/80 text-black"
                        : "border-white/20 bg-black/70 text-white shadow-xl shadow-black/30 backdrop-blur"
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={item.image} alt="" className="size-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
                      <span className="grid size-7 shrink-0 place-items-center rounded-md bg-white/90 text-black sm:size-8">
                        <Icon size={15} />
                      </span>
                      <span className="min-w-0 truncate text-xs font-semibold text-white sm:text-sm">{item.title}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 px-2 py-2 text-[10px] sm:px-3 sm:text-xs">
                    <span className={isExpanded ? "text-black/60" : "text-white/55"}>{item.category}</span>
                    <span className={isExpanded ? "text-black/60" : "text-white/55"}>{item.date}</span>
                  </div>
                </div>

                {isExpanded && (
                  <Card className="absolute left-1/2 top-36 w-72 -translate-x-1/2 overflow-visible border-white/30 bg-black/90 shadow-xl shadow-white/10 backdrop-blur-lg sm:w-80">
                    <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-white/50" />
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge className={`px-2 text-xs ${getStatusStyles(item.status)}`}>
                          {item.status === "completed" ? "COMPLETE" : item.status === "in-progress" ? "IN PROGRESS" : "PENDING"}
                        </Badge>
                        <span className="font-mono text-xs text-white/50">{item.date}</span>
                      </div>
                      <CardTitle className="mt-2 text-sm text-white">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/80">
                      <p>{item.content}</p>
                      <Button asChild className="mt-4 w-full bg-white text-black hover:bg-white/90">
                        <a href={item.link} target="_blank" rel="noreferrer">
                          Open project
                          <ExternalLink size={14} className="ml-1" />
                        </a>
                      </Button>

                      <div className="mt-4 border-t border-white/10 pt-3">
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="flex items-center">
                            <Zap size={10} className="mr-1" />
                            Energy Level
                          </span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                          <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-300" style={{ width: `${item.energy}%` }} />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 border-t border-white/10 pt-3">
                          <div className="mb-2 flex items-center">
                            <Link size={10} className="mr-1 text-white/70" />
                            <h4 className="text-xs font-medium uppercase tracking-wide text-white/70">Connected Nodes</h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId)
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="h-6 rounded-none border-white/20 bg-transparent px-2 py-0 text-xs text-white/80 transition-all hover:bg-white/10 hover:text-white"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleItem(relatedId)
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight size={8} className="ml-1 text-white/60" />
                                </Button>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
