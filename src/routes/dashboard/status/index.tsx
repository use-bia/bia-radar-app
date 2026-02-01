import { GlassCard } from "@/components/GlassCard";
import { Card } from "@heroui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/status/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <GlassCard>asdf</GlassCard>
      <Card className="mt-6 p-6">
        <Card.Title>Welcome to your dashboard</Card.Title>
        <Card.Content>
          This is the main area where you can view and manage your data.
        </Card.Content>
      </Card>
    </div>
  );
}
