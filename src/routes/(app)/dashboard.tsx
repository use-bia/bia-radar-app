import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-black">
      <h1 className="text-white">Hello "/app/"!</h1>
      <Outlet />
    </div>
  );
}
