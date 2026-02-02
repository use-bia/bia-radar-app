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
import {
  CircleIcon,
  MonitorPlayIcon,
  RadioIcon,
  SettingsIcon,
  XIcon,
} from "lucide-react";
import { Button, CloseButton, Tooltip } from "@heroui/react";
import SidebarItem from "@/components/SidebarItem";
import { useAudio } from "@/hooks/useAudio";
import { useMemo } from "react";
import FloatingNavBarItem from "@/components/FloatingNavBarItem";
import DownloadBanner from "@/components/DownloadBanner";

const options = linkOptions([
  {
    to: "/dashboard/status",
    label: m.status(),
    icon: <RadioIcon aria-hidden="true" className="w-6 h-6" />,
    activeOptions: {
      exact: false,
    },
  },
  {
    to: "/dashboard/guides",
    label: m.video_guide(),
    icon: <MonitorPlayIcon aria-hidden="true" className="w-6 h-6" />,
    activeOptions: {
      exact: false,
    },
  },
  {
    to: "/dashboard/adjusts",
    label: m.settings(),
    icon: <SettingsIcon aria-hidden="true" className="w-6 h-6" />,
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
  const isDownloadAvailable = true; // TODO: Replace with real logic

  const currentOption = useMemo(
    () => options.find((option) => location.pathname.startsWith(option.to)),
    [location.pathname],
  );

  return (
    <div className="flex min-h-dvh h-full relative isolate bg-background">
      {/* Desktop Menu */}
      <nav className="hidden md:flex flex-col sticky top-0 h-screen w-full max-w-2xs lg:max-w-xs xl:max-w-sm border-r bg-background pt-8 px-8 lg:px-12">
        <h2 className="text-3xl font-semibold tracking-tight">
          {m.bia_radar()}
        </h2>

        <div className="mt-3 w-fit">
          <Tooltip>
            <Tooltip.Trigger>
              <div className="flex items-center gap-2 font-semibold text-muted w-fit">
                <CircleIcon className="fill-accent w-3 h-3 text-accent" />
                <span>{m.connected()}</span>
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content showArrow placement="right">
              <Tooltip.Arrow />
              {m.device_connected_last_seen({ time: "2" })}
            </Tooltip.Content>
          </Tooltip>
        </div>

        <div className="mt-17 flex flex-col h-full w-full gap-2">
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
                    <span className="ml-2" />
                    {label}
                  </SidebarItem>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <main className="relative w-full min-h-dvh flex flex-col justify-center">
        {/* 1. The Banner (Notification Layer) */}
        {isDownloadAvailable && <DownloadBanner className="z-1" />}

        <div className="z-1 px-8 sm:px-12 md:px-6 pt-8 w-full h-full max-w-5xl mx-auto">
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
          {/* Footer acts like a padding at the bottom to ensure no content is not hidden behind the fixed bottom nav */}
          <div className="h-36 md:h-10" aria-hidden="true" />
        </div>
        <AmbientBackground />
      </main>

      {/* Mobile Menu Button (Keep standard Button here as it is an action, not a link yet) */}
      <nav className="md:hidden fixed bottom-6 left-0 right-0 z-50 w-full justify-center flex px-6">
        <div className="flex border gap-4 mx-auto bg-surface/70 justify-center rounded-full p-2 shadow-xl backdrop-blur-lg high-contrast:bg-surface high-contrast:backdrop-blur-none">
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
                aria-label={label}
              >
                {({ isActive }) => (
                  <Tooltip>
                    <Tooltip.Trigger>
                      <FloatingNavBarItem isActive={isActive}>
                        {icon}
                      </FloatingNavBarItem>
                    </Tooltip.Trigger>

                    <Tooltip.Content>
                      <Tooltip.Arrow />
                      {label}
                    </Tooltip.Content>
                  </Tooltip>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
