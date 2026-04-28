"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const liquidButtonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold outline-none transition-[color,box-shadow,filter,transform] disabled:pointer-events-none disabled:opacity-50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "text-neutral-950 duration-300 hover:scale-105",
        secondary: "text-neutral-950 duration-300 hover:scale-105",
        ghost: "text-neutral-950 duration-300 hover:scale-105",
      },
        size: {
        sm: "h-9 px-5 text-xs",
        default: "h-11 px-6",
        lg: "h-12 px-8",
        xl: "h-14 px-10 text-base",
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
        "relative isolate overflow-hidden rounded-full border border-black/55 bg-white/60 font-semibold shadow-[0_14px_28px_rgba(0,0,0,0.22),0_4px_9px_rgba(0,0,0,0.12),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.65),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.95),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.72),inset_0_0_6px_6px_rgba(255,255,255,0.28),inset_0_0_2px_2px_rgba(255,255,255,0.42)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.95),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.86),rgba(255,255,255,0.5)_44%,rgba(215,215,215,0.34)_72%,rgba(255,255,255,0.72))] after:pointer-events-none after:absolute after:inset-x-8 after:top-2 after:h-px after:rounded-full after:bg-white hover:brightness-110 active:brightness-95 dark:border-white/55 dark:bg-white/65 dark:shadow-[0_14px_28px_rgba(0,0,0,0.34),0_4px_9px_rgba(0,0,0,0.22),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.7),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.5),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.95),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.72),inset_0_0_6px_6px_rgba(255,255,255,0.24),inset_0_0_2px_2px_rgba(255,255,255,0.36)]",
        liquidButtonVariants({ variant, size, className }),
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { LiquidButton, liquidButtonVariants }
