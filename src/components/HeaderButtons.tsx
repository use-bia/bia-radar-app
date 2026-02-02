import type { FunctionComponent } from "react";
import { useAudioSettings } from "@/contexts/AudioSettingsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAudio } from "@/hooks/useAudio";
import { m } from "@/paraglide/messages";
import { Button, Tooltip } from "@heroui/react";
import {
  MoonIcon,
  SunIcon,
  ContrastIcon,
  Volume2Icon,
  VolumeOffIcon,
} from "lucide-react";

interface HeaderButtonsProps {}

const HeaderButtons: FunctionComponent<HeaderButtonsProps> = () => {
  const { theme, toggle } = useTheme();
  const playToggle = useAudio("toggle_theme");
  const { enabled: enabledAudio, toggle: toggleAudio } = useAudioSettings();

  // 1. Mobile (default): h-12 w-12 (Large), px-0 (Icon Only look)
  // 2. Desktop (sm:):    h-10 (Medium), w-auto (Text fits), px-4 (Standard padding)
  const responsiveBtnClass =
    "h-12 w-12 min-w-0 px-0 lg:h-10 lg:w-auto lg:px-4 border";

  // Text hidden on mobile, visible on md+
  const responsiveTextClass = "hidden lg:inline-block ml-2";

  // Helpers to determine the label and icon for the NEXT state
  // Cycle: Light -> Dark -> High Contrast -> Light
  const getNextThemeLabel = () => {
    if (theme === "light") return m.dark_mode();
    if (theme === "dark") return m.high_contrast();
    return m.light_mode();
  };

  const getNextThemeIcon = () => {
    if (theme === "light") return <MoonIcon size={20} />;
    if (theme === "dark") return <ContrastIcon size={20} />;
    return <SunIcon size={20} />;
  };

  return (
    <div className="flex gap-2">
      <Tooltip>
        <Button
          variant="tertiary"
          className={responsiveBtnClass}
          onClick={() => {
            toggle();
            playToggle();
          }}
          aria-label={m.toggle_theme_to({
            theme: getNextThemeLabel(),
          })}
        >
          {getNextThemeIcon()}
          <span className={responsiveTextClass}>{getNextThemeLabel()}</span>
        </Button>
        <Tooltip.Content>
          <Tooltip.Arrow />
          {m.toggle_theme_to({
            theme: getNextThemeLabel(),
          })}
        </Tooltip.Content>
      </Tooltip>

      <Tooltip>
        <Button
          variant="tertiary"
          className={responsiveBtnClass}
          onClick={() => {
            toggleAudio();
          }}
          aria-label={m.en_dis_sounds({
            status: enabledAudio ? m.disable() : m.enable(),
          })}
          aria-pressed={enabledAudio}
        >
          {enabledAudio ? (
            <Volume2Icon size={20} />
          ) : (
            <VolumeOffIcon size={20} />
          )}
          <span className={responsiveTextClass}>
            {enabledAudio ? m.disable() : m.enable()} {m.sounds()}
          </span>
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

export default HeaderButtons;
