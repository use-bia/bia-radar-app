import { createFileRoute, redirect } from "@tanstack/react-router";
import { Spinner } from "@heroui/react";
import { m } from "@/paraglide/messages.js";
import { GlassCard } from "@/components/GlassCard";

export const Route = createFileRoute("/")({
  component: App,
  loader: () => {
    return redirect({ to: "/connect", replace: true });
  },
});

function App() {
  return (
    <div className="p-12">
      <GlassCard>
        <div className="flex flex-col items-center gap-2">
          <Spinner size="md" />
          <span>{m.loading() + " " + m.dashboard()}</span>
        </div>
      </GlassCard>
    </div>
  );
}
