import {
  createFileRoute,
  Link,
  linkOptions,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { AmbientBackground } from "@/components/AmbientBackground";
import HeaderButtons from "@/components/HeaderButtons";
import { m } from "@/paraglide/messages";
import { MonitorPlayIcon, RadioIcon, SettingsIcon } from "lucide-react";
import { Button } from "@heroui/react";
import SidebarItem from "@/components/SidebarItem";
import { useAudio } from "@/hooks/useAudio";
import { useMemo } from "react";

const options = linkOptions([
  {
    to: "/dashboard/status",
    label: m.status(),
    icon: <RadioIcon aria-hidden="true" className="mr-2 w-6 h-6" />,
    activeOptions: {
      exact: false,
    },
  },
  {
    to: "/dashboard/guides",
    label: m.video_guide(),
    icon: <MonitorPlayIcon aria-hidden="true" className="mr-2 w-6 h-6" />,
    activeOptions: {
      exact: false,
    },
  },
  {
    to: "/dashboard/adjusts",
    label: m.settings(),
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

  const currentOption = useMemo(
    () => options.find((option) => location.pathname.startsWith(option.to)),
    [location.pathname],
  );

  return (
    <div className="flex h-dvh relative isolate bg-background">
      {/* Desktop Menu */}
      <nav className="hidden md:flex flex-col h-full w-full max-w-xs xl:max-w-sm border-r bg-background pt-8 px-12">
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

      <main className="relative w-full min-h-dvh flex justify-center">
        <div className="z-1 px-8 sm:px-12 md:px-6 pt-10 w-full max-w-5xl">
          <header className="mb-8 flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold">{currentOption?.label}</h1>
              <p> Configsdkfjksdfjskldfjklsdfjkj </p>
            </div>
            <div>
              <HeaderButtons />
            </div>
          </header>

          <Outlet />
        </div>
        <AmbientBackground />
      </main>
    </div>
  );
}
