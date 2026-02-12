import type { ComponentProps, FunctionComponent, ReactNode } from "react";
import { Surface, type CardProps } from "@heroui/react";
import { cn } from "@heroui/react";

interface GlassCardProps extends CardProps {
  children: ReactNode;
  className?: string;
}

export const GlassCard: FunctionComponent<GlassCardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Surface
      {...props}
      variant="default"
      className={cn(
        "bg-surface/70 border shadow-lg p-6 rounded-(--glass-radius)",
        className,
      )}
    >
      {children}
    </Surface>
  );
};

// New Component: Interactive version of the GlassCard
interface GlassButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
}

export const GlassButton: FunctionComponent<GlassButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(
        // Base Layout
        "flex items-center w-full text-left transition-all",
        // Glass Styles
        "bg-surface/70 border shadow-lg p-6 rounded-(--glass-radius)",
        // Interactive States
        "hover:bg-surface/90 active:scale-[0.99]",
        // Accessibility Focus Ring (Critical for navigation)
        "outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
