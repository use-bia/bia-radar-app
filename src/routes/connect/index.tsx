import DownloadBanner from "@/components/DownloadBanner";
import HeaderButtons from "@/components/HeaderButtons/HeaderButtons";
import { useAudio } from "@/hooks/useAudio";
import { m } from "@/paraglide/messages.js";
import { Button, Spinner } from "@heroui/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { RadioIcon } from "lucide-react";

export const Route = createFileRoute("/connect/")({
  component: RouteComponent,
  loader: () => <Spinner size="md" />,
});

function RouteComponent() {
  const navigate = useNavigate();
  const playDeviceConnected = useAudio("device_connected");

  return (
    <div className="w-full min-h-dvh flex flex-col items-center">
      <div className="w-full mb-4">
        <DownloadBanner />
        <div className="w-full flex justify-end p-4">
          <HeaderButtons />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-12"
        >
          <div className="w-32 h-32 rounded-full border border-accent-soft-hover flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full border-t-2 border-accent animate-spin-slow" />
            <RadioIcon className="text-accent" size={32} />
          </div>
        </motion.div>

        <h1 className="text-3xl font-light tracking-widest text-center uppercase">
          {m.bia_radar()}
        </h1>
        <p className="text-muted text-[10px] font-bold uppercase tracking-[0.6em] mt-4 text-center">
          {m.synchronizing_hardware()}
        </p>
      </div>

      <div className="w-full max-w-sm pb-12 px-3 flex flex-col space-y-4">
        <Button
          variant="primary"
          className="w-full font-bold h-14 capitalize"
          size="lg"
          onClick={() => {
            playDeviceConnected();
            navigate({ to: "/dashboard" });
          }}
        >
          {m.connect_via_bluetooth()}
        </Button>
        <Button
          variant="secondary"
          className="w-full font-bold h-14 capitalize"
          size="lg"
          onClick={() => {
            playDeviceConnected();
            navigate({ to: "/dashboard" });
          }}
        >
          {m.connect_via_usb()}
        </Button>
      </div>
    </div>
  );
}
