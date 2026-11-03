import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, TrendingUp, DollarSign, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { triggerHaptic } from "@/lib/telegram";

interface InterstitialStepProps {
  onBack: () => void;
  onContinue: () => void;
}

export const InterstitialStep: React.FC<InterstitialStepProps> = ({
  onBack,
  onContinue,
}) => {
  return (
    <Card className="animate-fade-in border-border/80 bg-card/85">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-500/20 to-indigo-500/30 border border-blue-500/40 text-blue-400 shadow-lg shadow-blue-500/10">
          <ShieldCheck className="h-8 w-8 text-blue-400" />
        </div>
        <CardTitle className="text-xl md:text-2xl text-white">
          Tushunarli! Biznes holati qayd etildi
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
          Biznes tizimi va sotuv infratuzilmangiz dastlabki tahlildan o‘tkazildi.
          Endi moliyaviy maqsadlar va reklama byudjetini hisoblaymiz.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="rounded-xl border border-border/50 bg-secondary/40 p-3.5 flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-emerald-500/20 p-1.5 text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Tizim xavf darajasi</div>
            <div className="text-xs text-muted-foreground">
              CRM, sotuvchilar va upakovka holatiga ko‘ra samaradorlik jarimasi aniqlanadi
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border/50 bg-secondary/40 p-3.5 flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-blue-500/20 p-1.5 text-blue-400">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Lidlar konversiyasi</div>
            <div className="text-xs text-muted-foreground">
              Daromad maqsadingizga erishish uchun qancha lid va mijoz kerakligi hisoblanadi
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border/50 bg-secondary/40 p-3.5 flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-indigo-500/20 p-1.5 text-indigo-400">
            <DollarSign className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Real reklama byudjeti</div>
            <div className="text-xs text-muted-foreground">
              Tanlangan platforma benchmarklari bo‘yicha minimal va optimal byudjet chiqadi
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-2 pt-2">
        <Button
          variant="secondary"
          onClick={() => {
            triggerHaptic("light");
            onBack();
          }}
          className="w-full sm:w-auto"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Orqaga
        </Button>
        <Button
          variant="glow"
          onClick={() => {
            triggerHaptic("medium");
            onContinue();
          }}
          className="w-full flex-1"
        >
          Moliyaviy maqsadlarga o‘tish
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

