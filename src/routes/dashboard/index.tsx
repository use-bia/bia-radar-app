// src/routes/dashboard/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { GlassCard } from "@/components/ui/GlassCard";
import { Card } from "@heroui/react";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  return (
    <div>
      <GlassCard className="">asdf</GlassCard>
      <Card className="mt-6 p-6">
        <Card.Title>Welcome to your dashboard</Card.Title>
        <Card.Content>
          This is the main area where you can view and manage your data.
        </Card.Content>
      </Card>
    </div>
  );
}
