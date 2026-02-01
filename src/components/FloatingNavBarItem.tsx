import { cn } from "@heroui/react";
import type { FunctionComponent, ReactNode } from "react";

interface FloatingNavBarItemProps {
  isActive: boolean;
  children: ReactNode;
  className?: string;
}

const FloatingNavBarItem: FunctionComponent<FloatingNavBarItemProps> = ({
  isActive,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "px-12 h-15 flex items-center justify-center rounded-full transition-colors duration-200 select-none",
        "group-focus-visible:ring-2 group-focus-visible:ring-focus group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background",
        isActive
          ? "bg-surface-overlay text-accent opacity-100"
          : "text-foreground/70 hover:bg-default-100 hover:text-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default FloatingNavBarItem;
