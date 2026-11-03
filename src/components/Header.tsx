import React from "react";
import { Badge } from "@/components/ui/badge";
import { getTelegramWebApp } from "@/lib/telegram";
import { Sparkles, BarChart3 } from "lucide-react";

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

  let statusText = "Tahlil jarayoni";
  let statusVariant: "default" | "secondary" | "success" | "blue" = "blue";

  if (currentStep === 10) {
    statusText = "Audit yakunlandi";
    statusVariant = "success";
  } else if (isInterstitial) {
    statusText = "Oraliq xulosa";
    statusVariant = "secondary";
  } else if (currentStep <= 4) {
    statusText = "Infratuzilma auditi";
    statusVariant = "blue";
  } else {
    statusText = "Moliyaviy hisob-kitob";
    statusVariant = "default";
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md px-4 py-3">
      <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 text-white shadow-md shadow-blue-500/25">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-bold tracking-tight text-white">
                Moliya & Marketing
              </h1>
              {userName && (
                <span className="text-xs font-medium text-muted-foreground">
                  • {userName}
                </span>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground">
              Biznes & Byudjet Kalkulyatori
            </p>
          </div>
        </div>

        <Badge variant={statusVariant} className="flex items-center gap-1.5 py-1 px-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
          </span>
          <span className="text-[11px]">{statusText}</span>
        </Badge>
      </div>
    </header>
  );
};

