import { Button } from "@heroui/react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/AmbientBackground"; // Checked path
import FixedTogglers from "@/components/FixedTogglers";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-dvh relative isolate bg-background">
      {/* Added bg-background to prevent transparency issues */}
      {/* Sidebar - Removed AmbientBackground from here */}
      <nav className="hidden md:flex h-full w-full max-w-xs lg:max-w-sm border-r bg-background border-border backdrop-blur-md p-6 z-20">
        <span className="text-stone-400 font-medium">Ondas</span>
      </nav>
      {/* Mobile Menu */}
      <nav className="md:hidden fixed bottom-6 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
        <div className="pointer-events-auto">
          <Button
            variant="outline"
            className="font-semibold shadow-lg backdrop-blur-md bg-background/80"
          >
            Menu
          </Button>
        </div>
      </nav>
      {/* Main Content Area */}
      <main className="relative w-full h-full overflow-y-auto overflow-x-hidden">
        <div className="relative z-1 p-6 md:p-10 max-w-2xl mx-auto pb-32 md:pb-0">
          <FixedTogglers />
          <Outlet />
        </div>
        <AmbientBackground />
      </main>
    </div>
  );
}
