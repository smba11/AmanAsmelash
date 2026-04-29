"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const liquidButtonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border text-sm font-semibold outline-none transition-[background-color,border-color,box-shadow,color,transform] disabled:pointer-events-none disabled:opacity-50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-primary/45 bg-secondary text-secondary-foreground hover:border-primary/65 hover:bg-secondary/80",
        secondary: "border-border bg-background text-foreground hover:border-primary/45 hover:bg-secondary/80",
        ghost: "border-border bg-background text-foreground hover:border-primary/40 hover:bg-secondary/75",
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
        liquidButtonVariants({ variant, size, className }),
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { LiquidButton, liquidButtonVariants }
