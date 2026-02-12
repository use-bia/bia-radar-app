import { GlassCard } from "@/components/GlassCard";
import { m } from "@/paraglide/messages";
import { Button, cn, Input, InputGroup, Label, Slider } from "@heroui/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ChevronRightIcon,
  HandIcon,
  RulerIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/adjusts/")({
  component: RouteComponent,
});

enum Hand {
  LEFT = "left",
  RIGHT = "right",
  OTHER = "other",
}

type HandOption = {
  label: string;
  value: Hand;
};

const handOptions: HandOption[] = [
  { label: m.left(), value: Hand.LEFT },
  { label: m.other(), value: Hand.OTHER },
  { label: m.right(), value: Hand.RIGHT },
];

const MIN_HEIGHT_CM = 0;
const MAX_HEIGHT_CM = 250;

function RouteComponent() {
  const [height, setHeight] = useState<number>(175);
  const [selectedHand, setSelectedHand] = useState<HandOption>(handOptions[2]);
  return (
    <div className="w-full space-y-16">
      <div className="w-full space-y-6">
        <h2 className="text-muted uppercase tracking-[0.4em] text-sm">
          {m.personalization()}
        </h2>
        <GlassCard className="w-full h-full flex items-center justify-center">
          <div className="w-full md:p-4 flex flex-col gap-8">
            <div className="flex w-full align-middle items-center justify-between">
              <div className="flex gap-6 items-center">
                <div className="h-fit p-3 bg-surface-secondary aspect-square rounded-4xl flex ">
                  <RulerIcon aria-hidden="true" className="text-muted" />
                </div>
                <h3 className="text-lg">Sua Altura</h3>
              </div>
              <InputGroup aria-label={m.height_cm()}>
                <InputGroup.Input
                  className="text-accent text-3xl font-semibold"
                  type="number"
                  defaultValue={175}
                  value={height}
                  step={5}
                  max={MAX_HEIGHT_CM}
                  min={MIN_HEIGHT_CM}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= MIN_HEIGHT_CM && value <= MAX_HEIGHT_CM) {
                      setHeight(value);
                    }
                  }}
                />
                <InputGroup.Suffix className="text-base">cm</InputGroup.Suffix>
              </InputGroup>
            </div>
            <div className="mt-4 flex flex-col w-full">
              <Slider
                className="w-full"
                value={height}
                step={5}
                onChange={(value) =>
                  setHeight(Array.isArray(value) ? value[0] : value)
                }
                maxValue={MAX_HEIGHT_CM}
                minValue={MIN_HEIGHT_CM}
              >
                <Slider.Track>
                  <Slider.Fill />
                  <Slider.Thumb />
                </Slider.Track>
              </Slider>
              <div className="text-sm text-muted mt-2 flex justify-between">
                <p>{MIN_HEIGHT_CM}cm</p>
                <p>{MAX_HEIGHT_CM / 100}m</p>
              </div>
            </div>
          </div>
        </GlassCard>
        <GlassCard className=" w-full h-full flex items-center justify-center">
          <div className="w-full md:p-4 flex flex-col gap-8">
            <div className="flex gap-6 items-center">
              <div className="h-fit p-3 bg-surface-secondary aspect-square rounded-4xl flex ">
                <HandIcon aria-hidden="true" className="text-muted" />
              </div>
              <h3 className="text-lg">Mão principal</h3>
            </div>
            <div className="flex justify-between gap-2 sm:gap-4 md:gap-6 h-20">
              {handOptions.map((option) => (
                <Button
                  key={option.value}
                  variant="outline"
                  className={cn(
                    "w-full h-full text-xl font-semibold pb-2 rounded-4xl",
                    selectedHand.value === option.value &&
                      "border-accent text-accent bg-accent/5",
                  )}
                  onClick={() => setSelectedHand(option)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
      <div className="w-full space-y-6">
        <h2 className="text-muted uppercase tracking-[0.4em] text-sm">
          {m.hardware()}
        </h2>
        <GlassCard className="col-span-2 row-span-1 w-full h-full flex items-center justify-center">
          <div className="flex w-full justify-between items-center md:p-4 gap-4">
            <div className="bg-surface-secondary p-4 rounded-4xl text-muted">
              <ShieldCheckIcon />
            </div>

            <div className="w-full">
              <h3 className="text-lg">Autoteste do Sensor</h3>
            </div>
            <ChevronRightIcon className="text-muted" />
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
