import { cn } from "@heroui/react";
import type { FunctionComponent, ReactNode } from "react";

interface SidebarItemProps {
  isActive: boolean;
  children: ReactNode;
  className?: string;
}

const SidebarItem: FunctionComponent<SidebarItemProps> = ({
  isActive,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "-ml-3 pl-6 pr-12 h-15 flex items-center font-bold rounded-4xl transition-colors duration-200 select-none",
        "group-focus-visible:ring-2 group-focus-visible:ring-focus group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background",
        isActive
          ? "bg-accent text-accent-foreground opacity-100"
          : "text-foreground/70 hover:bg-default-100 hover:text-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default SidebarItem;
