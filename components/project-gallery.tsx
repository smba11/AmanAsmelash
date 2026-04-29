import * as React from "react"
import { ImagePlus, X } from "lucide-react"

import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const gallerySlots = Array.from({ length: 12 }).map((_, index) => `Project screenshot ${String(index + 1).padStart(2, "0")}`)

interface ProjectGalleryProps {
  onClose: () => void
}

export function ProjectGallery({ onClose }: ProjectGalleryProps) {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/96 px-4 py-6" role="dialog" aria-modal="true" aria-labelledby="gallery-title">
      <div className="w-full max-w-6xl rounded-md border bg-background">
        <div className="flex items-start justify-between gap-5 border-b px-5 py-4">
          <div>
            <p className="font-mono text-xs text-primary">&gt; gallery</p>
            <h2 id="gallery-title" className="mt-2 text-2xl font-semibold leading-tight md:text-4xl">
              Project screenshot gallery
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Placeholder slots for the screenshots you want to add later.
            </p>
          </div>
          <LiquidButton type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close gallery">
            <X data-icon="inline-start" />
          </LiquidButton>
        </div>

        <ScrollArea className="h-[min(70vh,42rem)] bg-background">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Gallery slots</h4>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallerySlots.map((slot) => (
                <React.Fragment key={slot}>
                  <div className="group overflow-hidden rounded-md border bg-secondary/60">
                    <div className="grid aspect-[46/65] place-items-center p-5 text-center">
                      <div>
                        <ImagePlus className="mx-auto mb-3 text-muted-foreground" aria-hidden="true" />
                        <p className="text-sm font-medium">{slot}</p>
                        <p className="mt-1 text-xs text-muted-foreground">Add image later</p>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-1 sm:hidden" />
                </React.Fragment>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
