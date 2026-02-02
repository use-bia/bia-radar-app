import { useAudio } from "@/hooks/useAudio";
import {
  Description,
  Dropdown,
  Header,
  Kbd,
  Label,
  Separator,
} from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";
import { LogOutIcon, PaletteIcon, SunIcon } from "lucide-react";
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
            <Header>Actions</Header>
            <Dropdown.Item id="new-file" textValue="New file">
              <div className="flex h-8 items-start justify-center pt-px">
                <SunIcon className="size-4 shrink-0 text-muted" />
              </div>
              <div className="flex flex-col">
                <Label>New file</Label>
                <Description>Create a new file</Description>
              </div>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>N</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="edit-file" textValue="Edit file">
              <div className="flex h-8 items-start justify-center pt-px">
                <SunIcon className="size-4 shrink-0 text-muted" />
              </div>
              <div className="flex flex-col">
                <Label>Edit file</Label>
                <Description>Make changes</Description>
              </div>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>E</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Section>
          <Separator />
          <Dropdown.Section>
            <Header>Opções de tema</Header>

            <Dropdown.SubmenuTrigger>
              <Dropdown.Item id="share" textValue="Share">
                <div className="flex h-8 items-start justify-center pt-px">
                  <PaletteIcon className="size-4 shrink-0 text-muted" />
                </div>
                <div className="flex flex-col">
                  <Label>Alto contraste</Label>
                  <Description>Alterar cor do tema alto contraste</Description>
                </div>
                <Dropdown.SubmenuIndicator />
              </Dropdown.Item>
              <Dropdown.Popover className="border">
                <Dropdown.Menu>
                  <Dropdown.Item id="whatsapp" textValue="WhatsApp">
                    <Label>Branco no fundo preto</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="telegram" textValue="Telegram">
                    <Label>Amarelo no fundo preto</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="discord" textValue="Discord">
                    <Label>Verde no fundo preto</Label>
                  </Dropdown.Item>
                  <Dropdown.SubmenuTrigger>
                    <Dropdown.Item id="email" textValue="Email">
                      <Label>Email</Label>
                      <Dropdown.SubmenuIndicator />
                    </Dropdown.Item>
                    <Dropdown.Popover>
                      <Dropdown.Menu>
                        <Dropdown.Item id="work" textValue="Work email">
                          <Label>Work email</Label>
                        </Dropdown.Item>
                        <Dropdown.Item id="personal" textValue="Personal email">
                          <Label>Personal email</Label>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Popover>
                  </Dropdown.SubmenuTrigger>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown.SubmenuTrigger>
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
