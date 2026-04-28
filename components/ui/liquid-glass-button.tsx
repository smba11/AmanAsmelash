"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const liquidButtonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-[color,box-shadow,transform] disabled:pointer-events-none disabled:opacity-50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "text-neutral-950 duration-300 hover:scale-105",
        secondary: "text-neutral-950 duration-300 hover:scale-105",
        ghost: "text-neutral-950 duration-300 hover:scale-105",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-10 px-5",
        lg: "h-12 px-7",
        xl: "h-14 px-10",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function LiquidButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof liquidButtonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(
        "relative isolate overflow-hidden rounded-full border border-black/45 bg-white/55 font-semibold shadow-[0_10px_22px_rgba(0,0,0,0.18),0_3px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-14px_24px_rgba(0,0,0,0.12),inset_0_0_18px_rgba(255,255,255,0.75)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-[1px] before:-z-10 before:rounded-full before:bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,255,255,0.56)_42%,rgba(230,230,230,0.36)_72%,rgba(255,255,255,0.72))] after:pointer-events-none after:absolute after:inset-x-7 after:top-1.5 after:h-px after:rounded-full after:bg-white/95 hover:bg-white/70 dark:border-white/55 dark:bg-white/65 dark:shadow-[0_12px_26px_rgba(0,0,0,0.32),0_4px_10px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-14px_24px_rgba(0,0,0,0.14),inset_0_0_18px_rgba(255,255,255,0.72)]",
        liquidButtonVariants({ variant, size, className }),
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { LiquidButton, liquidButtonVariants }
