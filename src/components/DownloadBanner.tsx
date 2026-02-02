import { useAudio } from "@/hooks/useAudio";
import { m } from "@/paraglide/messages";
import { Button, cn } from "@heroui/react";
import { DownloadIcon, XIcon } from "lucide-react";
import type { FunctionComponent } from "react";

interface DownloadBannerProps {
  className?: string;
}

const DownloadBanner: FunctionComponent<DownloadBannerProps> = ({
  className,
}) => {
  const playDownload = useAudio("download_app");

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
          onClick={() => {
            playDownload();
          }}
        >
          <DownloadIcon className="mr-1" />
          <span>{m.download_app()}</span>
        </Button>
      </div>

      <div className="flex-1 flex justify-end">
        <Button
          variant="ghost"
          isIconOnly
          aria-label="Close notification"
          className="text-foreground"
        >
          <XIcon />
        </Button>
      </div>
    </aside>
  );
};

export default DownloadBanner;
