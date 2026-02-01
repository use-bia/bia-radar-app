import { Button } from "@heroui/react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/AmbientBackground"; // Checked path
import FixedTogglers from "@/components/FixedTogglers";
import { m } from "@/paraglide/messages";
import { PlayIcon, RadioIcon, SettingsIcon } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-dvh relative isolate bg-background">
      {/* Desktop Menu */}
      <nav className="hidden md:flex flex-col h-full w-full max-w-xs lg:max-w-sm border-r bg-background pt-8 px-12">
        <h2 className="text-2xl font-semibold tracking-tight">
          {m.bia_radar()}
        </h2>

        <div className="mt-10 flex flex-col w-full gap-2">
          <Button
            className="-ml-3 pl-6 pr-12 h-15 font-bold"
            size="lg"
            variant="primary"
          >
            <RadioIcon className="mr-2 w-6 h-6" />
            Status
          </Button>
          <Button
            className="-ml-3 pl-6 pr-12 h-15 font-bold flex items-center"
            size="lg"
            variant="ghost"
          >
            <PlayIcon className="mr-3 w-5 h-5" />
            Guias em vídeo
          </Button>
          <Button
            className="-ml-3 pl-6 pr-12 h-15 font-bold flex items-center"
            size="lg"
            variant="ghost"
          >
            <SettingsIcon className="mr-3 w-5 h-5" />
            Ajustes
          </Button>
        </div>
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
