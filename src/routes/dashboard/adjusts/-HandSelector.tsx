import { GlassCard } from "@/components/GlassCard";
import { Button, cn } from "@heroui/react";
import { HandIcon } from "lucide-react";
import { m } from "@/paraglide/messages";
import { useId } from "react";

// Move enums/types to a shared types file preferably, or keep here
export enum Hand {
  LEFT = "left",
  RIGHT = "right",
  OTHER = "other",
}

export type HandOption = { label: string; value: Hand };

interface HandSelectorProps {
  selected: HandOption;
  onChange: (option: HandOption) => void;
  options: HandOption[];
}

export const HandSelector = ({
  selected,
  onChange,
  options,
}: HandSelectorProps) => {
  const labelId = useId();

  return (
    <GlassCard className="w-full flex items-center justify-center">
      <div
        className="w-full md:p-4 flex flex-col gap-8"
        role="radiogroup" // Semantic role
        aria-labelledby={labelId}
      >
        <div className="flex gap-6 items-center">
          <div
            className="h-fit p-3 bg-surface-secondary aspect-square rounded-4xl flex"
            aria-hidden="true"
          >
            <HandIcon className="text-muted" />
          </div>
          <h3 id={labelId} className="text-lg">
            {m.principal_hand()}
          </h3>
        </div>

        <div className="flex justify-between gap-2 sm:gap-4 md:gap-6 h-20">
          {options.map((option) => {
            const isSelected = selected.value === option.value;
            return (
              <Button
                key={option.value}
                variant="outline"
                // ARIA: Tells screen reader this is the selected item
                aria-checked={isSelected}
                className={cn(
                  "w-full h-full text-xl font-semibold pb-2 rounded-4xl",
                  "focus-visible:ring-2 focus-visible:ring-accent", // Focus visibility
                  isSelected && "border-accent text-accent bg-accent/5",
                )}
                onClick={() => onChange(option)}
              >
                {option.label}
              </Button>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
};
