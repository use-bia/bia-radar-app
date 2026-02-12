import { GlassButton } from "@/components/GlassCard";
import { m } from "@/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import {
  BatteryIcon,
  ChevronRightIcon,
  CloudDownloadIcon,
  Volume2Icon,
  WifiIcon,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/dashboard/status/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full space-y-6">
      {/* NEW SECTION: My Device */}
      <section
        className="w-full space-y-6"
        aria-label={m.my_device?.() ?? "My Device"}
      >
        <h2 className="text-muted uppercase tracking-[0.4em] text-sm">
          {/* Assuming you have this key, otherwise hardcode or use a fallback */}
          {m.my_device?.() ?? "My Device"}
        </h2>

        {/* Grid Layout for the cards */}
        <div className="grid grid-rows-4 grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {/* 1. Find Device (Big Card) */}
          <FindDeviceTrigger />

          {/* 2. Software Update (Wide Button) */}
          <div className="col-span-2 row-span-1 w-full h-full">
            <SoftwareUpdateTrigger />
          </div>

          {/* 3. Battery Status */}
          <StatusTrigger
            icon={BatteryIcon}
            value="84%"
            label={m.battery()}
            ariaLabel={`${m.battery()} 84%`}
            variant="accent"
          />

          {/* 4. Connection Status */}
          <StatusTrigger
            icon={WifiIcon}
            value={m.premium()}
            label={m.connection()}
            ariaLabel={`${m.connection()} ${m.premium()}`}
            variant="default"
          />
        </div>
      </section>
    </div>
  );
}

// --- Sub-Components ---

function FindDeviceTrigger() {
  return (
    <GlassButton
      className="aspect-square col-span-2 row-span-2 flex flex-col items-center justify-center text-center group"
      onClick={() => console.log("Emit Sound")}
      aria-label={`${m.find_bia_radar()}. ${m.use_this_button_to_emit_a_sound()}`}
    >
      {/* UPDATED STYLE: Border accent, accent text, slight background */}
      <div className="w-40 h-40 rounded-full border border-accent bg-accent/5 flex items-center justify-center mb-6 md:mb-10 text-muted-foreground group-hover:bg-secondary/50 transition-colors">
        <Volume2Icon className="w-16 h-16 text-accent" />
      </div>

      <div className="space-y-4 px-4">
        <h2 className="text-2xl">{m.find_bia_radar()}</h2>
        <p className="text-muted">{m.use_this_button_to_emit_a_sound()}</p>
      </div>
    </GlassButton>
  );
}

function SoftwareUpdateTrigger() {
  return (
    <GlassButton
      className="w-full h-full"
      onClick={() => console.log("Open Update Dialog")}
    >
      <div className="flex w-full justify-between items-center p-4 gap-4">
        <div
          className="bg-surface-secondary p-4 rounded-4xl text-muted"
          aria-hidden="true"
        >
          <CloudDownloadIcon />
        </div>

        <div className="w-full text-left">
          <h3 className="text-lg">{m.software_update()}</h3>
          <p className="text-muted text-sm uppercase tracking-widest">
            V2.4.1 {m.available()}
          </p>
        </div>

        <ChevronRightIcon className="text-muted" aria-hidden="true" />
      </div>
    </GlassButton>
  );
}

interface StatusTriggerProps {
  icon: LucideIcon;
  value: string;
  label: string;
  ariaLabel: string;
  variant?: "default" | "accent";
}

function StatusTrigger({
  icon: Icon,
  value,
  label,
  ariaLabel,
  variant = "default",
}: StatusTriggerProps) {
  const isAccent = variant === "accent";

  return (
    <GlassButton
      className="col-span-1 row-span-1 aspect-square h-full"
      onClick={() => console.log("Open Status Details")}
      aria-label={ariaLabel}
    >
      <div className="flex flex-col p-4 gap-4 h-full justify-center items-center w-full">
        <Icon
          className={`w-10 h-10 ${isAccent ? "text-accent" : "text-muted"}`}
          aria-hidden="true"
        />
        <div className="text-center">
          <p className="text-2xl">{value}</p>
          <p className="text-sm text-muted uppercase">{label}</p>
        </div>
      </div>
    </GlassButton>
  );
}
