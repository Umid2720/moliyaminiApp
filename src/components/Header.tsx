import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { getTelegramWebApp } from "@/lib/telegram";
import { isSoundEnabled, toggleSound, playAppleSound } from "@/lib/sound";
import { Sparkles, BarChart3, Volume2, VolumeX, ShieldCheck } from "lucide-react";

interface HeaderProps {
  currentStep: number;
  isInterstitial: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  isInterstitial,
}) => {
  const tg = getTelegramWebApp();
  const userName = tg?.initDataUnsafe?.user?.first_name;
  const [soundOn, setSoundOn] = useState<boolean>(isSoundEnabled());

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  let statusText = "Tahlil jarayoni";
  let statusVariant: "default" | "secondary" | "success" | "blue" = "blue";

  if (currentStep === 10) {
    statusText = "Audit tayyor";
    statusVariant = "success";
  } else if (isInterstitial) {
    statusText = "Oraliq xulosa";
    statusVariant = "secondary";
  } else if (currentStep <= 4) {
    statusText = "Infratuzilma";
    statusVariant = "blue";
  } else {
    statusText = "Moliyaviy hisob";
    statusVariant = "default";
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#060913]/75 backdrop-blur-2xl px-4 py-3">
      <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#090d1a]/80 backdrop-blur-md">
              <BarChart3 className="h-5 w-5 text-cyan-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold tracking-tight text-white">
                Moliya & Audit
              </span>
              {userName && (
                <span className="text-[11px] font-medium text-muted-foreground/80">
                  • {userName}
                </span>
              )}
            </div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
              Apple-Grade Audit System
            </p>
          </div>
        </div>

        {/* Action pills: Sound toggle & status badge */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSoundToggle}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all hover:bg-white/10 hover:text-white active:scale-90"
            title={soundOn ? "Ovozni o'chirish" : "Ovozni yoqish"}
          >
            {soundOn ? (
              <Volume2 className="h-4 w-4 text-blue-400" />
            ) : (
              <VolumeX className="h-4 w-4 text-muted-foreground/60" />
            )}
          </button>

          <Badge
            variant={statusVariant}
            className="flex items-center gap-1.5 py-1 px-2.5 text-[11px] font-semibold border-white/10 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
            </span>
            <span>{statusText}</span>
          </Badge>
        </div>
      </div>
    </header>
  );
};
