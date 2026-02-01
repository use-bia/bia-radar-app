import {
  createFileRoute,
  Link,
  linkOptions,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { AmbientBackground } from "@/components/AmbientBackground";
import FixedTogglers from "@/components/FixedTogglers";
import { m } from "@/paraglide/messages";
import { PlayIcon, RadioIcon, SettingsIcon } from "lucide-react";
import { Button } from "@heroui/react";
import SidebarItem from "@/components/SidebarItem";
import { useAudio } from "@/hooks/useAudio";

const options = linkOptions([
  {
    to: "/dashboard/status",
    label: "Status",
    icon: <RadioIcon aria-hidden="true" className="mr-2 w-6 h-6" />,
    activeOptions: {
      exact: false,
    },
  },
  {
    to: "/dashboard/guides",
    label: "Guias em vídeo",
    icon: <PlayIcon aria-hidden="true" className="mr-2 w-6 h-6" />,
    activeOptions: {
      exact: false,
    },
  },
  {
    to: "/dashboard/adjusts",
    label: "Ajustes",
    icon: <SettingsIcon aria-hidden="true" className="mr-2 w-6 h-6" />,
    activeOptions: {
      exact: false,
    },
  },
]);

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const playSwitchTabs = useAudio("switch_tabs");
  const location = useLocation();

  return (
    <div className="flex h-dvh relative isolate bg-background">
      {/* Desktop Menu */}
      <nav className="hidden md:flex flex-col h-full w-full max-w-xs lg:max-w-sm border-r bg-background pt-8 px-12">
        <h2 className="text-2xl font-semibold tracking-tight">
          {m.bia_radar()}
        </h2>

        <div className="mt-10 flex flex-col w-full gap-2">
          {options.map(({ to, label, icon }, index) => {
            const isActive = location.pathname.startsWith(to);
            return (
              <Link
                key={index}
                to={to}
                preload="intent"
                onClick={() => {
                  if (!isActive) playSwitchTabs();
                }}
                aria-current={isActive ? "page" : undefined}
              >
                {({ isActive }) => (
                  <SidebarItem isActive={isActive}>
                    {icon}
                    {label}
                  </SidebarItem>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Menu Button (Keep standard Button here as it is an action, not a link yet) */}
      <nav className="md:hidden fixed bottom-6 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
        <div className="pointer-events-auto">
          <Button className="font-semibold shadow-lg backdrop-blur-md bg-background/80">
            Menu
          </Button>
        </div>
      </nav>

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
