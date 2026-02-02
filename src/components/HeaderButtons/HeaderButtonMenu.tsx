import { useAudio } from "@/hooks/useAudio";
import { useTheme, type ContrastColor } from "@/contexts/ThemeContext";
import { Description, Dropdown, Header, Label, Separator } from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";
import {
  CircleIcon,
  LogOutIcon,
  MoonStarIcon,
  PaletteIcon,
  SunIcon,
  Volume2Icon,
  VolumeOffIcon,
} from "lucide-react";
import type { FunctionComponent } from "react";
import { useAudioSettings } from "@/contexts/AudioSettingsContext";
import { m } from "@/paraglide/messages";

// --- Configuration ---

interface HighContrastOption {
  id: string;
  label: string;
  colorValue: ContrastColor;
  iconColorClass: string;
  group: "dark-bg" | "light-bg";
}

const HIGH_CONTRAST_OPTIONS: HighContrastOption[] = [
  {
    id: "white-on-black",
    label: "White on black",
    colorValue: "white",
    iconColorClass: "fill-white",
    group: "dark-bg",
  },
  {
    id: "yellow-on-black",
    label: "Yellow on black",
    colorValue: "yellow",
    iconColorClass: "fill-yellow-500",
    group: "dark-bg",
  },
  {
    id: "amber-on-black",
    label: "Amber on black",
    colorValue: "amber",
    iconColorClass: "fill-amber-500",
    group: "dark-bg",
  },
  {
    id: "green-on-black",
    label: "Green on black",
    colorValue: "green",
    iconColorClass: "fill-green-500",
    group: "dark-bg",
  },
  {
    id: "black-on-white",
    label: "Black on white",
    colorValue: "black",
    iconColorClass: "fill-black",
    group: "light-bg",
  },
];

// --- Component ---

interface HeaderButtonMenuProps {
  children: React.ReactNode;
}

const HeaderButtonMenu: FunctionComponent<HeaderButtonMenuProps> = ({
  children,
}) => {
  const playOpenDialog = useAudio("open_dialog");
  const playCloseDialog = useAudio("close_dialog");
  const playToggle = useAudio("toggle_theme");
  const navigate = useNavigate();
  const { enabled: enabledAudio, toggle: toggleAudio } = useAudioSettings();

  const { setTheme, setContrastColor } = useTheme();

  const handleMenuAction = (key: React.Key) => {
    // REMOVED: playToggle() from here to prevent double sounds
    const actionKey = key.toString();

    // 1. Check if the action matches one of our high contrast options
    const contrastOption = HIGH_CONTRAST_OPTIONS.find(
      (opt) => opt.id === actionKey,
    );

    if (contrastOption) {
      playToggle(); // Play ONLY for high contrast changes
      setTheme("high-contrast");
      setContrastColor(contrastOption.colorValue);
      return;
    }

    // 2. Handle standard actions
    switch (actionKey) {
      case "light-mode":
        playToggle(); // Play ONLY for light mode
        setTheme("light");
        break;
      case "dark-mode":
        playToggle(); // Play ONLY for dark mode
        setTheme("dark");
        break;
      case "delete-file":
        // No sound played here (or you can add a specific logout sound)
        navigate({ to: "/connect" });
        break;
      // "toggle-audio" falls through to default because it's handled via onClick,
      // avoiding the double sound issue.
      default:
        console.log(`Unknown action: ${actionKey}`);
    }
  };

  return (
    <Dropdown
      onOpenChange={(isOpen) => {
        if (isOpen) {
          playOpenDialog();
        } else {
          playCloseDialog();
        }
      }}
    >
      {children}
      <Dropdown.Popover className="border">
        {/* Main Menu */}
        <Dropdown.Menu onAction={handleMenuAction}>
          <Dropdown.Section>
            <Header>Geral</Header>
            <Dropdown.Item
              id="toggle-audio"
              textValue="Toggle audio"
              onClick={() => {
                toggleAudio(); // This handles its own sound
              }}
              aria-label={m.en_dis_sounds({
                status: enabledAudio ? m.disable() : m.enable(),
              })}
              aria-pressed={enabledAudio}
            >
              {!enabledAudio ? (
                <Volume2Icon className="size-4 shrink-0 text-muted" />
              ) : (
                <VolumeOffIcon className="size-4 shrink-0 text-muted" />
              )}
              <Label>
                {enabledAudio ? m.disable() : m.enable()} {m.sounds()}
              </Label>
            </Dropdown.Item>
          </Dropdown.Section>
          <Dropdown.Section>
            <Header>Opções de tema</Header>
            <Dropdown.Item id="dark-mode" textValue="Dark mode">
              <MoonStarIcon className="size-4 shrink-0 text-muted" />
              <Label>Dark mode</Label>
            </Dropdown.Item>

            <Dropdown.Item id="light-mode" textValue="Light mode">
              <SunIcon className="size-4 shrink-0 text-muted" />
              <Label>Light mode</Label>
            </Dropdown.Item>

            {/* High Contrast Submenu */}
            <Dropdown.SubmenuTrigger>
              <Dropdown.Item id="share" textValue="Share">
                <div className="flex h-8 items-start justify-center pt-px">
                  <PaletteIcon className="size-4 shrink-0 text-muted" />
                </div>
                <div className="flex flex-col">
                  <Label>High contrast mode</Label>
                  <Description>
                    Change the high contrast theme color
                  </Description>
                </div>
                <Dropdown.SubmenuIndicator />
              </Dropdown.Item>

              <Dropdown.Popover className="border">
                {/* Nested Menu (Must also receive handleMenuAction) */}
                <Dropdown.Menu onAction={handleMenuAction}>
                  {/* Dark Background Section */}
                  <Dropdown.Section>
                    <Header>Dark background</Header>
                    {HIGH_CONTRAST_OPTIONS.filter(
                      (opt) => opt.group === "dark-bg",
                    ).map((option) => (
                      <Dropdown.Item
                        key={option.id}
                        id={option.id}
                        textValue={option.label}
                      >
                        <CircleIcon
                          className={`size-3 ${option.iconColorClass}`}
                        />
                        <Label>{option.label}</Label>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Section>

                  <Separator />

                  {/* Light Background Section */}
                  <Dropdown.Section>
                    <Header>Light background</Header>
                    {HIGH_CONTRAST_OPTIONS.filter(
                      (opt) => opt.group === "light-bg",
                    ).map((option) => (
                      <Dropdown.Item
                        key={option.id}
                        id={option.id}
                        textValue={option.label}
                      >
                        <CircleIcon
                          className={`size-3 ${option.iconColorClass}`}
                        />
                        <Label>{option.label}</Label>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Section>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown.SubmenuTrigger>
          </Dropdown.Section>

          <Separator />

          <Dropdown.Section>
            <Header>Meu dispositivo</Header>
            <Dropdown.Item
              id="delete-file"
              textValue="Delete file"
              variant="danger"
              className="text-danger"
            >
              <div className="flex h-8 items-start justify-center pt-px">
                <LogOutIcon className="size-4 shrink-0 text-danger" />
              </div>
              <div className="flex flex-col">
                <Label>Desconectar</Label>
                <Description>Desconectar dispositivo e sair</Description>
              </div>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};

export default HeaderButtonMenu;
