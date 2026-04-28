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
        default: "text-foreground duration-300 hover:scale-105 dark:text-foreground",
        secondary: "text-foreground duration-300 hover:scale-105 dark:text-foreground",
        ghost: "text-muted-foreground duration-300 hover:scale-105 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground",
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
        "relative isolate overflow-hidden rounded-full border border-white/35 bg-white/15 shadow-[0_10px_24px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.72),inset_0_-10px_18px_rgba(255,255,255,0.08),inset_0_0_16px_rgba(255,255,255,0.12)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-[1px] before:-z-10 before:rounded-full before:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.34),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.04)_52%,rgba(255,255,255,0.12))] after:pointer-events-none after:absolute after:inset-x-6 after:top-1.5 after:h-px after:rounded-full after:bg-white/70 dark:border-white/18 dark:bg-white/8 dark:shadow-[0_14px_28px_rgba(0,0,0,0.28),0_3px_10px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.42),inset_0_-10px_18px_rgba(255,255,255,0.06),inset_0_0_16px_rgba(255,255,255,0.08)]",
        liquidButtonVariants({ variant, size, className }),
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { LiquidButton, liquidButtonVariants }
