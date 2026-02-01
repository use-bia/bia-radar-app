// src/components/ui/GlassCard.tsx
import type { FunctionComponent, ReactNode } from "react";
import { Card, type CardProps } from "@heroui/react";
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
    <Card
      {...props}
      className={cn(
        "bg-surface/30 backdrop-blur-3xl border shadow-lg",
        "rounded-[2rem]",
        className,
      )}
    >
      <Card.Content className="p-6 overflow-visible">{children}</Card.Content>
    </Card>
  );
};
