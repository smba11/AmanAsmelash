import * as React from "react"
import { ImagePlus } from "lucide-react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const gallerySlots = Array.from({ length: 12 }).map((_, index) => `Project screenshot ${String(index + 1).padStart(2, "0")}`)

export function ProjectGallery() {
  return (
    <section id="gallery" className="mx-auto grid min-h-screen max-w-6xl place-items-center px-5 py-24">
      <div className="grid w-full gap-10 md:grid-cols-[0.72fr_1.28fr] md:items-center">
        <div>
          <p className="font-mono text-sm text-primary">&gt; gallery</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">A place for the project screenshots.</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Drop in previews here later and the section will already have a clean scrollable frame ready for them.
          </p>
        </div>

        <ScrollArea className="h-[34rem] rounded-md border bg-background/72 shadow-[0_24px_70px_hsl(var(--foreground)/0.08)] backdrop-blur">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Gallery slots</h4>
            <div className="grid gap-4 sm:grid-cols-2">
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
    </section>
  )
}
