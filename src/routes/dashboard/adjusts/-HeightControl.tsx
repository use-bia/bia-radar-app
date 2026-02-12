import { GlassCard } from "@/components/GlassCard";
import { InputGroup, Slider } from "@heroui/react";
import { RulerIcon } from "lucide-react";
import { m } from "@/paraglide/messages"; // Assuming path
import { useId } from "react";

interface HeightControlProps {
  height: number;
  setHeight: (val: number) => void;
  min: number;
  max: number;
}

export const HeightControl = ({
  height,
  setHeight,
  min,
  max,
}: HeightControlProps) => {
  const labelId = useId();

  const handleChange = (val: number | number[]) => {
    const newValue = Array.isArray(val) ? val[0] : val;
    if (newValue >= min && newValue <= max) setHeight(newValue);
  };

  return (
    <GlassCard className="w-full flex items-center justify-center">
      <div className="w-full md:p-4 flex flex-col gap-8">
        <div className="flex w-full align-middle items-center justify-between">
          <div className="flex gap-6 items-center">
            <div
              className="h-fit p-3 bg-surface-secondary aspect-square rounded-4xl flex"
              aria-hidden="true"
            >
              <RulerIcon className="text-muted" />
            </div>
            {/* ID used to link controls to this text */}
            <h3 id={labelId} className="text-lg">
              {m.your_height()}
            </h3>
          </div>
          <InputGroup>
            <InputGroup.Input
              className="text-accent text-3xl font-semibold"
              type="number"
              value={height}
              step={1} // Easier for screen readers than 5
              max={max}
              min={min}
              // Accessibility: Links input to "Your height"
              aria-labelledby={labelId}
              onChange={(e) => handleChange(Number(e.target.value))}
            />
            <InputGroup.Suffix className="text-base">cm</InputGroup.Suffix>
          </InputGroup>
        </div>

        <div className="mt-4 flex flex-col w-full">
          <Slider
            className="w-full"
            value={height}
            step={5}
            onChange={handleChange}
            maxValue={max}
            minValue={min}
            aria-labelledby={labelId} // Accessibility link
          >
            <Slider.Track>
              <Slider.Fill />
              <Slider.Thumb aria-label={m.height_cm()} />
            </Slider.Track>
          </Slider>

          {/* Hidden from screen readers as they get the value from the slider/input, 
              but visible for low vision users */}
          <div
            className="text-sm text-muted mt-2 flex justify-between"
            aria-hidden="true"
          >
            <p>{min}cm</p>
            <p>{max / 100}m</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
