import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, TrendingUp, DollarSign, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { triggerHaptic } from "@/lib/telegram";
import { playAppleSound } from "@/lib/sound";

interface InterstitialStepProps {
  onBack: () => void;
  onContinue: () => void;
}

export const InterstitialStep: React.FC<InterstitialStepProps> = ({
  onBack,
  onContinue,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -15 }}
      transition={{ type: "spring", damping: 26, stiffness: 260 }}
    >
      <Card className="apple-card overflow-hidden">
        <CardHeader className="text-center p-6 pb-4">
          {/* Apple Concentric Glow Ring */}
          <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 opacity-25 blur-xl animate-pulse" />
            <div className="relative flex h-18 w-18 items-center justify-center rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-[1px] shadow-xl shadow-blue-500/25">
              <div className="flex h-full w-full items-center justify-center rounded-3xl bg-[#0a0f1d]">
                <ShieldCheck className="h-9 w-9 text-cyan-300 stroke-[2.2]" />
              </div>
            </div>
          </div>

          <CardTitle className="text-2xl font-black tracking-tight text-white md:text-3xl">
            Tushunarli! Infratuzilma qayd etildi
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground/90 mt-2 max-w-sm mx-auto leading-relaxed">
            Biznes tizimingiz dastlabki tahlildan o‘tkazildi. Endi moliyaviy maqsadlar va reklama byudjetini hisoblaymiz.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 pt-1 space-y-3">
          <div className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-md">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Tizim xavf darajasi</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                CRM, sotuvchilar va upakovka holatiga ko‘ra aniq jarimalar hisobga olinadi.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-md">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Lidlar konversiyasi</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                Daromad maqsadiga erishish uchun qancha lid va mijoz kerakligi hisoblanadi.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-md">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <DollarSign className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Real reklama byudjeti</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                Tanlangan platforma benchmarki bo‘yicha minimal va optimal byudjet chiqadi.
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-3 p-6 pt-3">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              playAppleSound("tap");
              triggerHaptic("light");
              onBack();
            }}
            className="px-5"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="glow"
            size="lg"
            className="flex-1 text-[15px] font-bold shadow-xl shadow-blue-500/30"
            onClick={() => {
              playAppleSound("tap");
              triggerHaptic("medium");
              onContinue();
            }}
          >
            Moliyaviy maqsadlarga o‘tish
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
