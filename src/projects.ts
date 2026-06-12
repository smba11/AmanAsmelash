import type { ElementType } from "react"
import { BookOpen, Boxes, Music2, Radio, Zap } from "lucide-react"

export interface PortfolioProject {
  id: number
  title: string
  description: string
  year: string
  link: string
  image: string
  category: string
  icon: ElementType
  relatedIds: number[]
  status: "completed" | "in-progress" | "pending"
  energy: number
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: "Wiggler",
    description: "A playful motion-focused project with a compact experimental feel.",
    year: "2026",
    link: "https://github.com/smba11/Wiggler",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop",
    category: "Motion",
    icon: Zap,
    relatedIds: [3, 5],
    status: "completed",
    energy: 82,
  },
  {
    id: 2,
    title: "fullstackopen",
    description: "Coursework and practice exercises across modern full-stack web development.",
    year: "2025",
    link: "https://github.com/smba11/fullstackopen",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop",
    category: "Learning",
    icon: BookOpen,
    relatedIds: [4],
    status: "in-progress",
    energy: 74,
  },
  {
    id: 3,
    title: "smbamusic",
    description: "A music-flavored web app built around search, queueing, and embedded playback.",
    year: "2026",
    link: "https://github.com/smba11/smbamusic",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1600&auto=format&fit=crop",
    category: "Music",
    icon: Music2,
    relatedIds: [1, 5],
    status: "completed",
    energy: 76,
  },
  {
    id: 4,
    title: "chunkify",
    description: "A focused project for breaking ideas or inputs into cleaner, workable chunks.",
    year: "2026",
    link: "https://github.com/smba11/chunkify",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop",
    category: "Tooling",
    icon: Boxes,
    relatedIds: [2],
    status: "in-progress",
    energy: 86,
  },
  {
    id: 5,
    title: "imposter-online",
    description: "An online imposter-style party game experience for synced rooms and voting.",
    year: "2025",
    link: "https://github.com/smba11/imposter-online",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop",
    category: "Online Game",
    icon: Radio,
    relatedIds: [1, 3],
    status: "in-progress",
    energy: 100,
  },
]
