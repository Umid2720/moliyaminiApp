declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        sendData: (data: string) => void;
        openTelegramLink: (url: string) => void;
        openLink: (url: string) => void;
        HapticFeedback?: {
          impactOccurred: (
            style: "light" | "medium" | "heavy" | "rigid" | "soft"
          ) => void;
          notificationOccurred: (
            type: "error" | "success" | "warning"
          ) => void;
          selectionChanged: () => void;
        };
        initDataUnsafe?: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
          };
        };
        colorScheme?: "light" | "dark";
        themeParams?: Record<string, string>;
      };
    };
  }
}

export const getTelegramWebApp = () => {
  if (typeof window !== "undefined" && window.Telegram?.WebApp) {
    return window.Telegram.WebApp;
  }
  return null;
};

export const initTelegramApp = () => {
  const tg = getTelegramWebApp();
  if (tg) {
    try {
      tg.ready();
      tg.expand();
    } catch (e) {
      console.warn("Telegram WebApp init error", e);
    }
  }
};

export const triggerHaptic = (
  type: "light" | "medium" | "heavy" | "success" | "warning" | "error" = "light"
) => {
  const tg = getTelegramWebApp();
  try {
    if (tg?.HapticFeedback) {
      if (type === "success" || type === "warning" || type === "error") {
        tg.HapticFeedback.notificationOccurred(type);
      } else {
        tg.HapticFeedback.impactOccurred(type);
      }
    } else if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(type === "heavy" ? 40 : 15);
    }
  } catch (err) {
    // ignore
  }
};

export const shareAuditReport = (text: string) => {
  const tg = getTelegramWebApp();

  // Try sendData first if inside Mini App bot conversation
  if (tg && typeof tg.sendData === "function") {
    try {
      tg.sendData(text);
      return { success: true, method: "sendData" as const };
    } catch (e) {
      console.warn("sendData failed, trying link share", e);
    }
  }

  // Fallback to Telegram share link
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(text)}`;
  if (tg?.openTelegramLink) {
    tg.openTelegramLink(shareUrl);
  } else if (typeof window !== "undefined") {
    window.open(shareUrl, "_blank");
  }

  return { success: true, method: "shareLink" as const };
};

