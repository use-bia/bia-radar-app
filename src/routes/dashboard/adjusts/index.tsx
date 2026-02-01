import { m } from "@/paraglide/messages";
import { Button } from "@heroui/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/adjusts/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      Hello "/dashboard/adjusts"!
      <Button
        variant="danger-soft"
        size="lg"
        onClick={() => {
          navigate({ to: "/connect" });
        }}
      >
        {m.disconnect()}
      </Button>
    </div>
  );
}
