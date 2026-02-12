import { GlassButton } from "@/components/GlassCard"; // Import the new button
import { m } from "@/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronRightIcon, ShieldCheckIcon } from "lucide-react";
import { useState } from "react";
import { HeightControl } from "./-HeightControl"; // Import new component
import { HandSelector, Hand, type HandOption } from "./-HandSelector"; // Import new component

export const Route = createFileRoute("/dashboard/adjusts/")({
  component: RouteComponent,
});

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
      {/* Personalization Section */}
      <section className="w-full space-y-6" aria-label={m.personalization()}>
        <h2 className="text-muted uppercase tracking-[0.4em] text-sm">
          {m.personalization()}
        </h2>

        {/* Height Component */}
        <HeightControl
          height={height}
          setHeight={setHeight}
          min={MIN_HEIGHT_CM}
          max={MAX_HEIGHT_CM}
        />

        {/* Hand Selector Component */}
        <HandSelector
          selected={selectedHand}
          onChange={setSelectedHand}
          options={handOptions}
        />
      </section>

      {/* Hardware Section */}
      <section className="w-full space-y-6" aria-label={m.hardware()}>
        <h2 className="text-muted uppercase tracking-[0.4em] text-sm">
          {m.hardware()}
        </h2>

        {/* ACCESSIBILITY WIN: 
           Using GlassButton here makes this a navigable, interactive element.
           Screen readers will read the inner text automatically.
        */}
        <GlassButton
          className="col-span-2 row-span-1 w-full"
          onClick={() => console.log("Run auto test")} // Add your handler here
          aria-label={m.sensor_auto_test()} // Fallback label if text is complex
        >
          <div className="flex w-full justify-between items-center md:p-4 gap-4">
            <div
              className="bg-surface-secondary p-4 rounded-4xl text-muted"
              aria-hidden="true"
            >
              <ShieldCheckIcon />
            </div>

            <div className="w-full text-left">
              <h3 className="text-lg font-semibold">{m.sensor_auto_test()}</h3>
              {/* Optional: Add description text here for clarity */}
            </div>

            <ChevronRightIcon className="text-muted" aria-hidden="true" />
          </div>
        </GlassButton>
      </section>
    </div>
  );
}
