import type { FunctionComponent, ReactNode } from "react";
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
