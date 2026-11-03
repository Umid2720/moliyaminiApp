import React from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressHeaderProps {
  currentStep: number;
  isInterstitial: boolean;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  currentStep,
  isInterstitial,
}) => {
  if (currentStep > 9) return null;

  let stepLabel = `${currentStep}-savol / 9`;
  let percent = Math.round((currentStep / 9) * 100);
  let sectionTitle =
    currentStep <= 4
      ? "1-qism: Biznes holati va infratuzilmasi"
      : "2-qism: Moliyaviy va Marketing maqsadlari";

  if (isInterstitial) {
    stepLabel = "Oraliq bosqich";
    percent = 45;
    sectionTitle = "💡 Infratuzilma baholandi → Moliyaviy qismga o'tish";
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-2 px-4 pt-4 pb-2">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-white/90">{stepLabel}</span>
        <span className="text-primary font-bold">{percent}%</span>
      </div>

      <Progress value={percent} className="h-2" />

      <div className="text-[11px] font-medium text-muted-foreground">
        {sectionTitle}
      </div>
    </div>
  );
};

