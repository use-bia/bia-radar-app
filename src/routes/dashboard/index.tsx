import { createFileRoute, redirect } from "@tanstack/react-router";
import { GlassCard } from "@/components/GlassCard";
import { Spinner } from "@heroui/react";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
  loader: () => {
    return redirect({ to: "/dashboard/status", replace: true });
  },
});

function DashboardIndex() {
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
