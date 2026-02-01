import { GlassCard } from "@/components/GlassCard";
import { Button, Card } from "@heroui/react";
import { createFileRoute } from "@tanstack/react-router";
import { Volume2Icon } from "lucide-react";

export const Route = createFileRoute("/dashboard/status/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <GlassCard className="aspect-square col-span-2">
        <div className="flex flex-col items-center justify-center h-full">
          <Button
            isIconOnly
            variant="secondary"
            className="w-40 h-40 rounded-full border"
          >
            <Volume2Icon className="w-16 h-16" />
          </Button>
          <div className="flex flex-col items-center mt-10 text-center space-y-4">
            <h3 className="text-2xl">Localizar BIA-RADAR</h3>
            <p className="text-muted">
              Use este botão para emitir um sinal sonoro no dispositivo.
            </p>
          </div>
        </div>
      </GlassCard>
      <Card className="p-6 col-span-2 md:col-span-1">
        <Card.Title>Welcome to your dashboard</Card.Title>
        <Card.Content>
          This is the main area where you can view and manage your data.
        </Card.Content>
      </Card>
    </div>
  );
}
