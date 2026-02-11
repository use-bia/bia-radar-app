import { GlassCard } from "@/components/GlassCard";
import { Button, Card } from "@heroui/react";
import { createFileRoute } from "@tanstack/react-router";
import { BatteryIcon, ChevronRightIcon, CloudDownloadIcon, Volume2Icon } from "lucide-react";

export const Route = createFileRoute("/dashboard/status/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <GlassCard className="aspect-square col-span-2 row-span-2">
        <div className="flex flex-col items-center justify-center h-full">
          <Button
            isIconOnly
            variant="secondary"
            className="w-40 h-40 rounded-full border"
          >
            <Volume2Icon className="w-16 h-16" />
          </Button>
          <div className="flex flex-col items-center mt-6 md:mt-10 text-center space-y-4">
            <h2 className="text-2xl">Localizar BIA-RADAR</h2>
            <p className="text-muted">
              Use este botão para emitir um sinal sonoro no dispositivo.
            </p>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="col-span-2 row-span-1 w-full h-full">
        <div className="flex w-full justify-between items-center p-4 gap-4">
          <div className="bg-surface-secondary p-4 rounded-4xl text-muted">
            <CloudDownloadIcon />
          </div>

          <div className="w-full">
            <h3>Atualização de Software</h3>
            <p className="text-muted text-sm uppercase tracking-widest">V2.4.1 Disponível</p>
          </div>
          <ChevronRightIcon className="text-muted"/>
        </div>
      </GlassCard>
      <GlassCard className="col-span-1 row-span-1 aspect-square">
        <div className="flex flex-col p-4 gap-4 h-full justify-center items-center">
          <BatteryIcon className="text-accent w-10 h-10"/>
          <p className="text-2xl">
            84%
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
