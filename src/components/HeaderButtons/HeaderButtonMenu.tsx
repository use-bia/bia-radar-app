import { useAudio } from "@/hooks/useAudio";
import { Description, Dropdown, Header, Label, Separator } from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";
import {
  CircleIcon,
  LogOutIcon,
  MoonStarIcon,
  PaletteIcon,
  SunIcon,
} from "lucide-react";
import type { FunctionComponent } from "react";

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
        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
          <Dropdown.Section>
            <Header>Opções de tema</Header>
            <Dropdown.Item id="dark-mode" textValue="Dark mode">
              <MoonStarIcon className="size-4 shrink-0 text-muted" />
              <Label>Dark mode</Label>
            </Dropdown.Item>
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
                <Dropdown.Menu>
                  <Dropdown.Section>
                    <Header>Dark background</Header>
                    <Dropdown.Item
                      id="white-on-black"
                      textValue="White on black"
                    >
                      <CircleIcon className="size-3 fill-white" />
                      <Label>White on black</Label>
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="yellow-on-black"
                      textValue="Yellow on black"
                    >
                      <CircleIcon className="size-3 fill-yellow-500" />
                      <Label>Yellow on black</Label>
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="amber-on-black"
                      textValue="Amber on black"
                    >
                      <CircleIcon className="size-3 fill-amber-500" />
                      <Label>Amber on black</Label>
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="green-on-black"
                      textValue="Green on black"
                    >
                      <CircleIcon className="size-3 fill-green-500" />
                      <Label>Green on black</Label>
                    </Dropdown.Item>
                  </Dropdown.Section>
                  <Separator />
                  <Dropdown.Section>
                    <Header>Light background</Header>
                    <Dropdown.Item
                      id="black-on-white"
                      textValue="Black on white"
                    >
                      <CircleIcon className="size-3 fill-black" />
                      <Label>Black on white</Label>
                    </Dropdown.Item>
                  </Dropdown.Section>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown.SubmenuTrigger>
            <Dropdown.Item id="light-mode" textValue="Light mode">
              <SunIcon className="size-4 shrink-0 text-muted" />
              <Label>Light mode</Label>
            </Dropdown.Item>
          </Dropdown.Section>
          <Separator />
          <Dropdown.Section>
            <Header>Danger zone</Header>
            <Dropdown.Item
              id="delete-file"
              textValue="Delete file"
              variant="danger"
              onAction={() => {
                playToggle();
                navigate({ to: "/connect" });
              }}
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
