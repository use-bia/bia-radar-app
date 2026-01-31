import { useTheme } from "@/contexts/ThemeContext";
import { useAudio } from "@/hooks/useAudio";
import { m } from "@/paraglide/messages";
import { Button } from "@heroui/react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { MoonIcon, SunIcon } from "lucide-react";

export const Route = createFileRoute("/(app)")({
  component: RouteComponent,
});

function RouteComponent() {
  const { theme, toggle } = useTheme();
  const playToggle = useAudio("toggle_theme");

  return (
    <div>
      <h1>Route</h1>
      <Button
        variant="tertiary"
        onClick={() => {
          toggle();
          playToggle();
        }}
        aria-label={m.toggle_theme()}
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </Button>
      <Outlet />
    </div>
  );
}
