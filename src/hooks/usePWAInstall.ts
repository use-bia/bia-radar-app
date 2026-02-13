import { pwaInstallHandler } from "pwa-install-handler";
import { useCallback, useSyncExternalStore, useMemo } from "react";

export const usePWAInstall = () => {
  // 1. Subscribe to the library's updates
  const subscribe = useCallback((callback: () => void) => {
    pwaInstallHandler.addListener(callback);
    return () => {
      pwaInstallHandler.removeListener(callback);
    };
  }, []);

  // 2. Snapshot: Returns the current installability status
  // We return a simple boolean here to ensure referential stability
  const getSnapshot = useCallback(() => {
    return pwaInstallHandler.canInstall();
  }, []);

  // 3. Server Snapshot: Always false during SSR
  const getServerSnapshot = useCallback(() => false, []);

  // 4. Get the current state
  const canInstall = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // 5. Wrap the install action
  const promptInstall = useCallback(async () => {
    if (canInstall) {
      // The library handles the native prompt or the manual instructions
      const result = await pwaInstallHandler.install();
      return result;
    }
    return false;
  }, [canInstall]);

  // 6. Derive "installType" to maintain backward compatibility with your UI
  // If the library has a captured event, it's "native".
  // If it can install but has no event (like iOS), it's "manual".
  const installType = useMemo(() => {
    if (!canInstall) return null;
    return pwaInstallHandler.getEvent()
      ? ("native" as const)
      : ("manual" as const);
  }, [canInstall]);

  return {
    isInstallAvailable: canInstall,
    installType,
    promptInstall,
  };
};
