import type { FunctionComponent } from "react";
import { useAudioSettings } from "@/contexts/AudioSettingsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAudio } from "@/hooks/useAudio";
import { m } from "@/paraglide/messages";
import { Button, Tooltip } from "@heroui/react";
import {
  DownloadIcon,
  MoonIcon,
  SunIcon,
  Volume2Icon,
  VolumeOffIcon,
} from "lucide-react";

interface HeaderButtonsProps {}

const HeaderButtons: FunctionComponent<HeaderButtonsProps> = () => {
  const { theme, toggle } = useTheme();
  const playToggle = useAudio("toggle_theme");
  const playDownload = useAudio("download_app");
  const { enabled: enabledAudio, toggle: toggleAudio } = useAudioSettings();
  const isDownloadAvailable = true;

  // 1. Mobile (default): h-12 w-12 (Large), px-0 (Icon Only look)
  // 2. Desktop (sm:):    h-10 (Medium), w-auto (Text fits), px-4 (Standard padding)
  const responsiveBtnClass =
    "h-12 w-12 min-w-0 px-0 lg:h-10 lg:w-auto lg:px-4 border";

  // Text hidden on mobile, visible on md+
  const responsiveTextClass = "hidden lg:inline-block ml-2";

  return (
    <div className="flex gap-2">
      <Tooltip>
        <Button
          variant="primary"
          // We don't set 'size' or 'isIconOnly' props here;
          // we control them via className for full responsiveness.
          className={responsiveBtnClass}
          onClick={() => {
            playDownload();
          }}
          aria-label={m.download_app()}
          isDisabled={!isDownloadAvailable}
        >
          <DownloadIcon size={20} />
          <span className={responsiveTextClass}>{m.download_app()}</span>
        </Button>
        <Tooltip.Content>
          <Tooltip.Arrow />
          {m.download_app()}
        </Tooltip.Content>
      </Tooltip>

      <Tooltip>
        <Button
          variant="tertiary"
          className={responsiveBtnClass}
          onClick={() => {
            toggle();
            playToggle();
          }}
          aria-label={m.toggle_theme_to({
            theme: theme === "light" ? m.dark_mode() : m.light_mode(),
          })}
          aria-pressed={theme === "dark"}
        >
          {theme === "light" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          <span className={responsiveTextClass}>
            {theme === "light" ? m.dark_mode() : m.light_mode()}
          </span>
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
