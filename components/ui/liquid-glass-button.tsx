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
        default: "bg-transparent text-primary duration-300 hover:scale-105",
        secondary: "bg-transparent text-foreground duration-300 hover:scale-105",
        ghost: "bg-transparent text-muted-foreground duration-300 hover:scale-105 hover:text-foreground",
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
        "relative isolate overflow-hidden rounded-full border border-white/25 bg-white/10 shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.65),inset_0_0_6px_6px_rgba(0,0,0,0.08),0_0_16px_rgba(255,255,255,0.18)] backdrop-blur-md before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.42),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04))] after:pointer-events-none after:absolute after:inset-x-3 after:top-1 after:h-px after:rounded-full after:bg-white/45 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.55),inset_0_0_6px_6px_rgba(255,255,255,0.08),0_0_14px_rgba(0,0,0,0.15)]",
        liquidButtonVariants({ variant, size, className }),
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { LiquidButton, liquidButtonVariants }
