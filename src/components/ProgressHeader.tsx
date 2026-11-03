import React from "react";

interface ProgressHeaderProps {
  currentStep: number;
  isInterstitial: boolean;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  currentStep,
  isInterstitial,
}) => {
  if (currentStep > 9) return null;

  const totalSteps = 9;
  const activeStep = isInterstitial ? 4.5 : currentStep;
  const percent = isInterstitial ? 50 : Math.round((currentStep / totalSteps) * 100);

  const phaseTitle = isInterstitial
    ? "Oraliq tahlil: Infratuzilma baholandi"
    : currentStep <= 4
    ? "1-qism: Biznes holati va infratuzilmasi"
    : "2-qism: Moliyaviy va Marketing maqsadlari";

  return (
    <div className="mx-auto w-full max-w-xl px-4 pt-3 pb-2 space-y-2">
      {/* Top info row */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white/90">
            {isInterstitial ? "Oraliq bosqich" : `${currentStep}-bosqich`}
          </span>
          <span className="text-[10px] text-muted-foreground">
            ({totalSteps} tadan)
          </span>
        </div>
        <span className="font-mono text-xs font-bold text-blue-400">
          {percent}%
        </span>
      </div>

      {/* Segmented iOS style pill bar */}
      <div className="grid grid-cols-9 gap-1.5 h-1.5 w-full">
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const stepNum = idx + 1;
          const isCompleted = isInterstitial ? stepNum <= 4 : stepNum <= currentStep;
          const isCurrent = !isInterstitial && stepNum === currentStep;

          return (
            <div
              key={idx}
              className={`relative h-full rounded-full transition-all duration-300 ${
                isCompleted
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                  : isCurrent
                  ? "bg-blue-400/80 animate-pulse"
                  : "bg-white/[0.08]"
              }`}
            />
          );
        })}
      </div>

      {/* Subtitle */}
      <div className="text-[11px] font-medium text-muted-foreground/80 flex items-center justify-between">
        <span>{phaseTitle}</span>
        <span className="text-[10px] text-blue-400/80">
          {currentStep <= 4 ? "Tizim auditi" : "Byudjet hisobi"}
        </span>
      </div>
    </div>
  );
};
