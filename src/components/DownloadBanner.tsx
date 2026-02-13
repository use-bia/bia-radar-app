import { useAudio } from "@/hooks/useAudio";
import { usePWAInstall } from "@/hooks/usePWAInstall"; // Import the new hook
import { m } from "@/paraglide/messages";
import { AlertDialog, Button, cn, Tooltip } from "@heroui/react";
import { DownloadIcon, XIcon } from "lucide-react";
import { useState, type FunctionComponent } from "react";

interface DownloadBannerProps {
  className?: string;
}

const DownloadBanner: FunctionComponent<DownloadBannerProps> = ({
  className,
}) => {
  // Use the custom hook
  const { isInstallAvailable, promptInstall } = usePWAInstall();

  // Local state for UI dismissal (user clicked X)
  const [isDismissed, setIsDismissed] = useState(false);

  const playDownload = useAudio("download_app");
  const playOpenDialog = useAudio("open_dialog");
  const playCloseDialog = useAudio("close_dialog");

  const handleDownloadClick = () => {
    playDownload();
    promptInstall();
  };

  // Don't render if browser says no (isInstallAvailable is false)
  // OR if user said no (isDismissed is true)
  if (!isInstallAvailable || isDismissed) {
    return null;
  }

  return (
    <aside
      role="status"
      aria-live="polite"
      className={cn(
        "bg-accent py-2 flex items-center text-accent-foreground gap-3 px-4 shadow-md",
        "high-contrast:bg-background high-contrast:border-b-4 high-contrast:text-foreground",
        className,
      )}
    >
      <div className="flex-1 hidden sm:block" aria-hidden="true" />

      <div className="flex gap-4 items-center justify-center">
        <p className=" font-medium">
          {m.you_are_eligible_to_download_the_app()}
        </p>
        <Button
          className={
            "bg-accent-button text-accent-button-foreground shadow-md hover:bg-accent-button/90"
          }
          size="md"
          onClick={handleDownloadClick}
        >
          <DownloadIcon className="mr-1" />
          <span>{m.download_app()}</span>
        </Button>
      </div>

      <div className="flex-1 flex justify-end">
        <AlertDialog
          onOpenChange={(isOpen) => {
            if (isOpen) {
              playOpenDialog();
            } else {
              playCloseDialog();
            }
          }}
        >
          <Tooltip>
            <Button
              variant="ghost"
              isIconOnly
              aria-label={m.ignore_download()}
              className="text-foreground"
            >
              <XIcon />
            </Button>

            <Tooltip.Content showArrow>
              <Tooltip.Arrow />
              {m.ignore_download()}
            </Tooltip.Content>
          </Tooltip>
          <AlertDialog.Backdrop isDismissable isKeyboardDismissDisabled>
            <AlertDialog.Container placement="center">
              <AlertDialog.Dialog className="sm:max-w-100 border">
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header>
                  <AlertDialog.Icon status="danger" />
                  <AlertDialog.Heading className="font-semibold">
                    {m.ignore_download()}
                  </AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <br />

                  <p className="text-center">
                    <b>{m.dismiss_download_message_1()}</b>
                  </p>
                  <br />
                  <p className="text-justify">
                    {m.dismiss_download_message_2()}
                  </p>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button slot="close" variant="tertiary">
                    {m.cancel()}
                  </Button>
                  <Button
                    slot="close"
                    variant="danger"
                    onClick={() => setIsDismissed(true)}
                  >
                    {m.ignore_download()}
                  </Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      </div>
    </aside>
  );
};

export default DownloadBanner;
