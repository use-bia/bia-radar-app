import { Card, Link } from "@heroui/react";
import { createFileRoute } from "@tanstack/react-router";
import { BadgeDollarSign } from "lucide-react";

export const Route = createFileRoute("/(app)/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-black">
      <Card className="w-[400px]">
        <BadgeDollarSign
          aria-label="Badge dollar sign icon"
          className="text-primary size-6"
          role="img"
        />
        <Card.Header>
          <Card.Title>Become an Acme Creator!</Card.Title>
          <Card.Description>
            Visit the Acme Creator Hub to sign up today and start earning
            credits from your fans and followers.
          </Card.Description>
        </Card.Header>
        <Card.Footer>
          <Link
            aria-label="Go to Acme Creator Hub (opens in new tab)"
            href="https://heroui.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Creator Hub
            <Link.Icon aria-hidden="true" />
          </Link>
        </Card.Footer>
      </Card>
    </div>
  );
}
