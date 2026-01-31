import { useAudioSettings } from "@/contexts/AudioSettingsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAudio } from "@/hooks/useAudio";
import { m } from "@/paraglide/messages";
import { Button } from "@heroui/react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { MoonIcon, SunIcon, Volume2Icon, VolumeOffIcon } from "lucide-react";

export const Route = createFileRoute("/(app)")({
  component: RouteComponent,
});

function RouteComponent() {
  const { theme, toggle } = useTheme();
  const playToggle = useAudio("toggle_theme");
  const { enabled: enabledAudio, toggle: toggleAudio } = useAudioSettings();

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
      <Button
        variant="tertiary"
        onClick={() => {
          toggleAudio();
        }}
        aria-label={m.en_dis_sounds({
          status: enabledAudio ? m.disable() : m.enable(),
        })}
      >
        {enabledAudio ? <Volume2Icon /> : <VolumeOffIcon />}
      </Button>

      <Outlet />
    </div>
  );
}
