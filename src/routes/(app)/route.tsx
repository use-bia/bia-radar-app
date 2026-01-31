import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Route</h1>
      <Outlet />
    </div>
  );
}
