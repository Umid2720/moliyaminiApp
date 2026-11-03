import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-2xl text-[15px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 border border-blue-400/30",
        destructive:
          "bg-rose-600 text-white shadow-md hover:bg-rose-500 border border-rose-400/30",
        outline:
          "border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] text-white/90 backdrop-blur-xl shadow-sm hover:border-white/25",
        secondary:
          "bg-white/[0.08] hover:bg-white/[0.13] text-white border border-white/15 backdrop-blur-2xl shadow-sm hover:border-white/25",
        ghost: "hover:bg-white/10 text-white/80 hover:text-white",
        link: "text-blue-400 underline-offset-4 hover:underline",
        emerald:
          "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-extrabold shadow-xl shadow-emerald-500/30 hover:brightness-110 border border-emerald-400/40 relative overflow-hidden",
        glow:
          "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-bold shadow-xl shadow-blue-600/30 hover:brightness-110 border border-blue-400/40 relative overflow-hidden",
      },
      size: {
        default: "h-12 min-h-[48px] px-5 py-3 text-sm",
        sm: "h-9 min-h-[36px] px-3.5 py-1.5 text-xs rounded-xl",
        lg: "h-14 min-h-[56px] px-6 py-4 text-[15px] font-bold rounded-2xl",
        xl: "h-16 min-h-[62px] px-8 py-4 text-base font-extrabold rounded-2xl",
        icon: "h-11 w-11 min-h-[44px] min-w-[44px] rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
