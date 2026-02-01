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
    <div className="absolute top-0 right-0 p-6 gap-2 flex z-50">
      <Tooltip>
        <Tooltip.Trigger>
          <Button
            variant="tertiary"
            onClick={() => {
              toggle();
              playToggle();
            }}
            aria-label={m.toggle_theme()}
          >
            {theme === "light" ? <SunIcon /> : <MoonIcon />}
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Arrow />
          {m.toggle_theme()}
        </Tooltip.Content>
      </Tooltip>
      <Tooltip>
        <Tooltip.Trigger>
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
        </Tooltip.Trigger>
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
