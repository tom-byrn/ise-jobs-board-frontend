import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const niceLinkVariants = cva(
  "group relative inline-flex border border-black focus:outline-none w-full sm:w-auto",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:translate-x-0.5 hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        xl: "h-12 px-12 text-lg",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface NiceLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
  VariantProps<typeof niceLinkVariants> {
  asChild?: boolean;
}

const NiceLink = React.forwardRef<HTMLAnchorElement, NiceLinkProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return (
      <Comp
        className={cn(niceLinkVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
NiceLink.displayName = "NiceLink";

export { NiceLink, niceLinkVariants as niceLinkVariants };
