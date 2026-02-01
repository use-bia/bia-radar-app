import type { FunctionComponent } from "react";
import { useAudioSettings } from "@/contexts/AudioSettingsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAudio } from "@/hooks/useAudio";
import { m } from "@/paraglide/messages";
import { Button, Tooltip } from "@heroui/react";
import { MoonIcon, SunIcon, Volume2Icon, VolumeOffIcon } from "lucide-react";

interface FixedTogglersProps {}

const FixedTogglers: FunctionComponent<FixedTogglersProps> = () => {
  const { theme, toggle } = useTheme();
  const playToggle = useAudio("toggle_theme");
  const { enabled: enabledAudio, toggle: toggleAudio } = useAudioSettings();

  return (
    <div className="flex gap-2">
      <Tooltip>
        <Button
          isIconOnly
          size="lg"
          variant="tertiary"
          onClick={() => {
            toggle();
            playToggle();
          }}
          aria-label={m.toggle_theme_to({
            theme: theme === "light" ? m.dark_mode() : m.light_mode(),
          })}
          aria-pressed={theme === "dark"}
        >
          {theme === "light" ? <SunIcon /> : <MoonIcon />}
        </Button>
        <Tooltip.Content>
          <Tooltip.Arrow />
          {m.toggle_theme_to({
            theme: theme === "light" ? m.dark_mode() : m.light_mode(),
          })}
        </Tooltip.Content>
      </Tooltip>
      <Tooltip>
        <Button
          isIconOnly
          size="lg"
          variant="tertiary"
          onClick={() => {
            toggleAudio();
          }}
          aria-label={m.en_dis_sounds({
            status: enabledAudio ? m.disable() : m.enable(),
          })}
          aria-pressed={enabledAudio}
        >
          {enabledAudio ? <Volume2Icon /> : <VolumeOffIcon />}
        </Button>
        <Tooltip.Content>
          <Tooltip.Arrow />
          {m.en_dis_sounds({
            status: enabledAudio ? m.disable() : m.enable(),
          })}
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
};

export default FixedTogglers;
