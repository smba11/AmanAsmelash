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
        default: "text-[#fff8ea] duration-300 hover:scale-105",
        secondary: "text-[#fff8ea] duration-300 hover:scale-105",
        ghost: "text-[#fff8ea] duration-300 hover:scale-105",
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
        "relative isolate overflow-hidden rounded-full border border-[#fff8ea]/35 bg-[#050505]/92 shadow-[0_18px_34px_rgba(0,0,0,0.28),0_3px_10px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,248,234,0.72),inset_0_-12px_22px_rgba(255,248,234,0.08),inset_0_0_18px_rgba(255,248,234,0.12)] backdrop-blur-md before:pointer-events-none before:absolute before:inset-[1px] before:-z-10 before:rounded-full before:bg-[radial-gradient(circle_at_50%_0%,rgba(255,248,234,0.22),transparent_36%),linear-gradient(180deg,rgba(255,248,234,0.13),rgba(255,248,234,0.02)_46%,rgba(0,0,0,0.34))] after:pointer-events-none after:absolute after:inset-x-7 after:top-1.5 after:h-px after:rounded-full after:bg-[#fff8ea]/70 dark:border-[#fff8ea]/28 dark:bg-[#050505]/92 dark:shadow-[0_18px_34px_rgba(0,0,0,0.34),0_3px_10px_rgba(0,0,0,0.22),inset_0_1px_1px_rgba(255,248,234,0.68),inset_0_-12px_22px_rgba(255,248,234,0.08),inset_0_0_18px_rgba(255,248,234,0.12)]",
        liquidButtonVariants({ variant, size, className }),
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { LiquidButton, liquidButtonVariants }
