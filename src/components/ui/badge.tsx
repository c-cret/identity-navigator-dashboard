
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Neuro brand specific badge variants
        access: "border-transparent bg-neuro-access text-white hover:bg-neuro-access/80",
        assets: "border-transparent bg-neuro-assets text-white hover:bg-neuro-assets/80",
        pay: "border-transparent bg-neuro-pay text-neuro-text hover:bg-neuro-pay/80",
        admin: "border-transparent bg-neuro-admin text-white hover:bg-neuro-admin/80",
        "outline-access": "border-neuro-access text-neuro-access",
        "outline-assets": "border-neuro-assets text-neuro-assets",
        "outline-pay": "border-neuro-pay text-neuro-pay",
        "outline-admin": "border-neuro-admin text-neuro-admin",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
