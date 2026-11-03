import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Answers } from "@/types";
import { INITIAL_ANSWERS } from "@/lib/constants";
import { initTelegramApp, triggerHaptic } from "@/lib/telegram";
import { playAppleSound } from "@/lib/sound";
import { Header } from "@/components/Header";
import { ProgressHeader } from "@/components/ProgressHeader";
import { QuizQuestion } from "@/components/QuizQuestion";
import { InterstitialStep } from "@/components/InterstitialStep";
import { AuditResult } from "@/components/AuditResult";

export function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isInterstitial, setIsInterstitial] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);

  useEffect(() => {
    initTelegramApp();
  }, []);

  const handleUpdateAnswer = <K extends keyof Answers>(
    key: K,
    value: Answers[K]
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < 9) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStep4Proceed = () => {
    setIsInterstitial(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInterstitialBack = () => {
    setIsInterstitial(false);
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInterstitialContinue = () => {
    setIsInterstitial(false);
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinish = () => {
    setCurrentStep(10);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRestart = () => {
    setIsInterstitial(false);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && currentStep >= 1 && currentStep <= 8 && !isInterstitial) {
        playAppleSound("tap");
        handleNext();
      } else if (e.key === "Escape" && currentStep > 1) {
        playAppleSound("tap");
        if (isInterstitial) {
          handleInterstitialBack();
        } else {
          handlePrev();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, isInterstitial]);

  return (
    <div className="relative min-h-screen bg-[#060913] text-foreground antialiased selection:bg-blue-500 selection:text-white overflow-hidden">
      {/* Apple dynamic ambient glow orbs */}
      <div className="ambient-mesh">
        <div className="ambient-orb-1" />
        <div className="ambient-orb-2" />
        <div className="ambient-orb-3" />
      </div>

      {/* Main app wrapper */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-xl flex-col">
        <Header currentStep={currentStep} isInterstitial={isInterstitial} />

        <ProgressHeader
          currentStep={currentStep}
          isInterstitial={isInterstitial}
        />

        <main className="flex-1 px-4 py-3">
          <AnimatePresence mode="wait">
            {isInterstitial ? (
              <InterstitialStep
                key="interstitial"
                onBack={handleInterstitialBack}
                onContinue={handleInterstitialContinue}
              />
            ) : currentStep <= 9 ? (
              <QuizQuestion
                key={`step-${currentStep}`}
                step={currentStep}
                answers={answers}
                onUpdateAnswer={handleUpdateAnswer}
                onNext={handleNext}
                onPrev={handlePrev}
                onFinish={handleFinish}
                onStep4Proceed={handleStep4Proceed}
              />
            ) : (
              <AuditResult
                key="audit-result"
                answers={answers}
                onUpdateAnswer={handleUpdateAnswer}
                onRestart={handleRestart}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
