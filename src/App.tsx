import React, { useState, useEffect } from "react";
import { Answers } from "@/types";
import { INITIAL_ANSWERS } from "@/lib/constants";
import { initTelegramApp, triggerHaptic } from "@/lib/telegram";
import { Header } from "@/components/Header";
import { ProgressHeader } from "@/components/ProgressHeader";
import { QuizQuestion } from "@/components/QuizQuestion";
import { InterstitialStep } from "@/components/InterstitialStep";
import { AuditResult } from "@/components/AuditResult";

export function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isInterstitial, setIsInterstitial] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);

  // Initialize Telegram WebApp SDK
  useEffect(() => {
    initTelegramApp();
  }, []);

  // Update specific answer field
  const handleUpdateAnswer = <K extends keyof Answers>(
    key: K,
    value: Answers[K]
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Step navigation handlers
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

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && currentStep >= 1 && currentStep <= 8 && !isInterstitial) {
        handleNext();
      } else if (e.key === "Escape" && currentStep > 1) {
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
    <div className="relative min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-white">
      {/* Dynamic ambient lighting / glow orbs */}
      <div className="glow-orb top-[-100px] left-[-100px] h-[350px] w-[350px] bg-blue-600/15" />
      <div className="glow-orb top-[40%] right-[-100px] h-[400px] w-[400px] bg-indigo-600/10" />
      <div className="glow-orb bottom-[-50px] left-[20%] h-[300px] w-[300px] bg-cyan-600/10" />

      {/* Main container */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-xl flex-col">
        {/* Header */}
        <Header currentStep={currentStep} isInterstitial={isInterstitial} />

        {/* Progress bar */}
        <ProgressHeader
          currentStep={currentStep}
          isInterstitial={isInterstitial}
        />

        {/* Dynamic Step Content */}
        <main className="flex-1 px-4 py-3">
          {isInterstitial ? (
            <InterstitialStep
              onBack={handleInterstitialBack}
              onContinue={handleInterstitialContinue}
            />
          ) : currentStep <= 9 ? (
            <QuizQuestion
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
              answers={answers}
              onUpdateAnswer={handleUpdateAnswer}
              onRestart={handleRestart}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

