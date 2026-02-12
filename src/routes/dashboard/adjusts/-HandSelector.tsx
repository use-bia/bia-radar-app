import { GlassCard } from "@/components/GlassCard";
import { cn } from "@heroui/react";
import { HandIcon } from "lucide-react";
import { m } from "@/paraglide/messages";
import { useId, useRef, type KeyboardEvent } from "react";

// Types
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
  const descriptionId = useId();

  // Refs to manage focus programmatically
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // KEYBOARD HANDLER: This is the magic that makes Arrow Keys work
  const handleKeyDown = (e: KeyboardEvent, currentIndex: number) => {
    let nextIndex = null;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      // Go to next, loop back to 0 if at end
      nextIndex = (currentIndex + 1) % options.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      // Go to previous, loop to end if at 0
      nextIndex = (currentIndex - 1 + options.length) % options.length;
    }

    if (nextIndex !== null) {
      // 1. Select the new option
      onChange(options[nextIndex]);
      // 2. Move focus to the new button immediately
      buttonRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <GlassCard className="w-full flex items-center justify-center">
      <div
        className="w-full md:p-4 flex flex-col gap-8"
        role="radiogroup" // Defines this area as a radio group
        aria-labelledby={labelId}
      >
        <div className="flex gap-6 items-center">
          {/* Icon Box */}
          <div
            className="h-fit p-3 bg-surface-secondary aspect-square rounded-4xl flex"
            aria-hidden="true"
          >
            <HandIcon className="text-muted" />
          </div>

          {/* Text Column */}
          <div className="flex flex-col justify-center">
            <h3 id={labelId} className="text-lg font-medium leading-tight">
              {m.principal_hand()}
            </h3>

            {/* Subtitle */}
            <p id={descriptionId} className="text-muted text-sm mt-1">
              {m.bia_utilizes_this_info_to_better_understand_your()}
            </p>
          </div>
        </div>

        <div className="flex justify-between gap-2 sm:gap-4 md:gap-6 h-20">
          {options.map((option, index) => {
            const isSelected = selected.value === option.value;

            return (
              <button
                key={option.value}
                // Assign ref so we can focus it programmatically
                ref={(el) => {
                  buttonRefs.current[index] = el;
                }}
                // ARIA Roles & States
                type="button"
                role="radio"
                aria-checked={isSelected}
                // ROVING TABINDEX:
                // Only the selected item is tabbable (0).
                // All others are removed from tab order (-1) but reachable via arrows.
                tabIndex={isSelected ? 0 : -1}
                // Events
                onClick={() => onChange(option)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={cn(
                  // Base Styles
                  "w-full h-full text-xl font-semibold pb-2 rounded-4xl transition-all cursor-pointer",
                  "border-2", // Explicit border width prevents layout shifts

                  // Focus Styles (High Visibility)
                  "outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",

                  // Selection Logic
                  isSelected
                    ? "border-accent text-accent bg-accent/5"
                    : "bg-transparent text-muted-foreground hover:bg-surface-secondary/50 hover:border-surface-secondary",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
};
