import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Answers, AuditCalculationResult } from "@/types";
import { calculateAudit, generateReportSummaryText } from "@/lib/calculator";
import { shareAuditReport, triggerHaptic } from "@/lib/telegram";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Share2,
  Copy,
  RotateCcw,
  Zap,
  Target,
  Users,
  ShieldCheck,
  Building2,
  Check,
} from "lucide-react";

interface AuditResultProps {
  answers: Answers;
  onUpdateAnswer: <K extends keyof Answers>(key: K, value: Answers[K]) => void;
  onRestart: () => void;
}

export const AuditResult: React.FC<AuditResultProps> = ({
  answers,
  onUpdateAnswer,
  onRestart,
}) => {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const calc: AuditCalculationResult = calculateAudit(answers);

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const handleCopy = () => {
    triggerHaptic("success");
    const text = generateReportSummaryText(answers, calc);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      showToast("✅ Hisobot matni nusxalandi!");
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleShareTelegram = () => {
    triggerHaptic("medium");
    const text = generateReportSummaryText(answers, calc);
    shareAuditReport(text);
    showToast("Telegramga yo'naltirilmoqda...");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // What-If Simulator switches
  const handleCrmToggle = (checked: boolean) => {
    triggerHaptic("light");
    onUpdateAnswer("hasCrm", checked ? "ha" : "yoq");
  };

  const handleSalesToggle = (checked: boolean) => {
    triggerHaptic("light");
    onUpdateAnswer("salesTeam", checked ? "ha" : "ozim");
  };

  const riskBadgeVariants = {
    low: "success" as const,
    medium: "warning" as const,
    high: "destructive" as const,
  };

  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-slate-900 border border-primary/40 px-4 py-2 text-xs font-semibold text-white shadow-2xl backdrop-blur-md animate-fade-in">
          {toastMessage}
        </div>
      )}

      {/* Hero Header */}
      <div className="text-center pt-2 pb-1">
        <Badge variant="blue" className="mb-2 py-1 px-3">
          <Sparkles className="mr-1.5 h-3.5 w-3.5" />
          Marketing & Byudjet Auditi
        </Badge>
        <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
          Biznes Auditi Xulosasi
        </h2>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
          Sizning biznesingiz va maqsadlaringiz asosidagi matematik aniq hisob-kitob
        </p>
      </div>

      {/* Risk Meter Card */}
      <Card
        className={`border ${
          calc.riskLevel === "high"
            ? "border-red-500/40 bg-gradient-to-r from-red-950/30 to-card/90"
            : calc.riskLevel === "medium"
            ? "border-amber-500/40 bg-gradient-to-r from-amber-950/30 to-card/90"
            : "border-emerald-500/40 bg-gradient-to-r from-emerald-950/30 to-card/90"
        }`}
      >
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              Tizim Xavf Darajasi:
            </div>
            <div className="text-lg font-bold text-white flex items-center gap-2">
              <Badge variant={riskBadgeVariants[calc.riskLevel]} className="text-xs">
                {calc.riskLabel}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-white">{calc.riskScore}%</div>
            <div className="text-[10px] text-muted-foreground uppercase font-semibold">
              Samaradorlik
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 1: Biznes Holati */}
      <Card>
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Building2 className="h-4 w-4 text-primary" />
            Biznes infratuzilmasi holati
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-1 space-y-2.5 text-xs">
          <div className="flex items-center justify-between rounded-lg bg-secondary/30 p-2.5">
            <span className="text-muted-foreground font-medium">CRM tizimi:</span>
            <span className={`font-semibold ${answers.hasCrm === "ha" ? "text-emerald-400" : answers.hasCrm === "excel" ? "text-amber-400" : "text-red-400"}`}>
              {calc.crmDisplay}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-secondary/30 p-2.5">
            <span className="text-muted-foreground font-medium">Sotuv bo‘limi:</span>
            <span className={`font-semibold ${answers.salesTeam === "ha" ? "text-emerald-400" : answers.salesTeam === "operator" ? "text-amber-400" : "text-red-400"}`}>
              {calc.salesDisplay}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-secondary/30 p-2.5">
            <span className="text-muted-foreground font-medium">Upakovka (Sotsial tarmoq):</span>
            <span className={`font-semibold ${answers.packaging === "zor" ? "text-emerald-400" : answers.packaging === "ortacha" ? "text-amber-400" : "text-red-400"}`}>
              {calc.packDisplay}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Moliyaviy Maqsad */}
      <Card>
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Target className="h-4 w-4 text-emerald-400" />
            Moliyaviy maqsad
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-1 space-y-2.5 text-xs">
          <div className="flex items-center justify-between rounded-lg bg-secondary/30 p-2.5">
            <span className="text-muted-foreground font-medium">Oylik daromad maqsadi:</span>
            <span className="text-sm font-bold text-emerald-400">
              ${calc.targetRevenue.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-secondary/30 p-2.5">
            <span className="text-muted-foreground font-medium">O‘rtacha chek:</span>
            <span className="text-sm font-bold text-white">${calc.averageCheck}</span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-blue-500/10 border border-blue-500/20 p-2.5">
            <span className="text-blue-300 font-medium">Kerakli mijozlar soni:</span>
            <span className="text-sm font-black text-cyan-400">{calc.neededCustomers} ta mijoz</span>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Funnel Voronka */}
      <Card>
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <TrendingUp className="h-4 w-4 text-indigo-400" />
            Sotuv Funneli (Voronka)
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-1 space-y-3">
          {/* Visual Funnel */}
          <div className="space-y-2 rounded-xl bg-secondary/40 p-3">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-muted-foreground">Kiruvchi lidlar</span>
                <span className="text-blue-400">{calc.neededLeads} ta</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "100%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-muted-foreground">Sotuv konversiyasi</span>
                <span className="text-indigo-400">{calc.conversionRate}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${Math.min(calc.conversionRate, 100)}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-muted-foreground">Yakuniy xarid qiluvchilar</span>
                <span className="text-emerald-400">{calc.neededCustomers} ta</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{
                    width: `${Math.min((calc.neededCustomers / calc.neededLeads) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border/40 bg-secondary/20 p-2.5 text-[11px] text-muted-foreground text-center font-mono">
            📐 Formula: ${calc.targetRevenue} / ${calc.averageCheck} / {calc.conversionRate}% = <strong className="text-white">{calc.neededLeads} ta lid</strong>
          </div>
        </CardContent>
      </Card>

      {/* Card 4: Reklama Byudjeti */}
      <Card className="border-primary/30">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              Reklama byudjeti ({calc.bench.name})
            </div>
            <Badge variant="blue" className="text-[10px]">
              Lid: ${calc.minCpl} - ${calc.maxCpl}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-1 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border/60 bg-secondary/30 p-3 text-center">
              <span className="text-[11px] font-semibold text-muted-foreground block mb-1">
                Minimal byudjet
              </span>
              <span className="text-xl font-extrabold text-white block">
                ${calc.minBudget.toLocaleString()}
              </span>
              <span className="text-[10px] text-muted-foreground mt-0.5 block">
                ~${Math.round(calc.minBudget / 30)} / kun
              </span>
            </div>

            <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-center shadow-md shadow-emerald-500/10">
              <span className="text-[11px] font-semibold text-emerald-300 block mb-1">
                Optimal byudjet
              </span>
              <span className="text-xl font-black text-emerald-400 block">
                ${calc.maxBudget.toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-400/80 mt-0.5 block">
                ~${Math.round(calc.maxBudget / 30)} / kun
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 5: Ogohlantirishlar & Samaradorlik jarimasi */}
      {calc.totalPenaltyPercent > 0 ? (
        <Card className="border-red-500/40 bg-red-950/20">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2 text-sm font-bold text-red-300">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              Samaradorlik jarimasi: +{calc.totalPenaltyPercent}%
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-1 space-y-2 text-xs">
            {answers.hasCrm === "yoq" && (
              <div className="flex items-start gap-2 text-red-200">
                <span className="text-sm">❌</span>
                <div>
                  <strong>CRM yo'qligi sababli yo'qotishlar (+20%)</strong> — mijozlar esdan chiqadi yoki kech javob beriladi.
                </div>
              </div>
            )}
            {answers.hasCrm === "excel" && (
              <div className="flex items-start gap-2 text-amber-200">
                <span className="text-sm">⚠️</span>
                <div>
                  <strong>Excelda yuritish xavfi (+10%)</strong> — qo'lda boshqaruvda lidlar nazoratsiz qolishi mumkin.
                </div>
              </div>
            )}
            {answers.salesTeam === "ozim" && (
              <div className="flex items-start gap-2 text-red-200">
                <span className="text-sm">❌</span>
                <div>
                  <strong>Sotuvchilar yo'qligi sababli past konversiya (+20%)</strong> — o'zingiz barcha lidlarga ulgurmaysiz.
                </div>
              </div>
            )}
            {answers.salesTeam === "operator" && (
              <div className="flex items-start gap-2 text-amber-200">
                <span className="text-sm">⚠️</span>
                <div>
                  <strong>Professional sotuvchi yo'qligi (+10%)</strong> — administrator faqat ma'lumot beradi, sotmaydi.
                </div>
              </div>
            )}
            {answers.packaging === "yomon" && (
              <div className="flex items-start gap-2 text-red-200">
                <span className="text-sm">❌</span>
                <div>
                  <strong>Upakovka yomonligi (+15%)</strong> — profil ishonchsiz ko'rinadi, lidlar qimmatlashadi.
                </div>
              </div>
            )}

            <div className="mt-2 rounded-lg bg-red-500/20 border border-red-500/30 p-2 text-red-200 font-medium">
              Sizda tizim to'liq bo'lmagani sababli real byudjet <strong>+{calc.totalPenaltyPercent}% ga qimmatroq</strong> tushishi mumkin (Ortiqcha xarajat: ~${calc.potentialSavings}).
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-emerald-500/40 bg-emerald-950/20">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Ajoyib infratuzilma! Jarimalar yo'q (0%)
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-1 text-xs text-emerald-200/90 leading-relaxed">
            Sizda CRM va alohida sotuv jamoasi mavjud bo‘lgani sababli reklama byudjetingiz maksimal darajada tejamkor va samarali sarflanadi.
          </CardContent>
        </Card>
      )}

      {/* Card 6: Interactive What-If Simulator */}
      <Card className="border-indigo-500/40 bg-gradient-to-b from-indigo-950/30 to-card/90">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Zap className="h-4 w-4 text-yellow-400" />
            Jonli Simulyator: "Tizim qilsak nima bo'ladi?"
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Tugmalarni yoqib ko‘ring — CRM va sotuvchini yoqsangiz byudjet qancha tejalishini hisoblang:
          </p>
        </CardHeader>
        <CardContent className="p-4 pt-1 space-y-3">
          <div className="space-y-2.5 rounded-xl bg-secondary/40 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white">
                CRM tizimini o'rnatish (-20%)
              </span>
              <Switch
                checked={answers.hasCrm === "ha"}
                onCheckedChange={handleCrmToggle}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white">
                Sotuv menejerini yollash (-20%)
              </span>
              <Switch
                checked={answers.salesTeam === "ha"}
                onCheckedChange={handleSalesToggle}
              />
            </div>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-300">
              Tejaladigan mablag':
            </span>
            <span className="text-sm font-black text-emerald-400">
              ${calc.potentialSavings.toLocaleString()} / oyiga
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Card 7: Tavsiyalar */}
      <Card>
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Ekspert tavsiyalari
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-1 space-y-2.5 text-xs">
          <div className="flex items-start gap-3 rounded-lg bg-secondary/30 p-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-[11px]">
              1
            </span>
            <div className="text-muted-foreground">
              <strong className="text-white">CRM tizimi (AmoCRM / Bitrix24) o'rnating</strong> — bu byudjetni 20% gacha tejaydi va har bir lidni nazoratda ushlaydi.
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg bg-secondary/30 p-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-[11px]">
              2
            </span>
            <div className="text-muted-foreground">
              <strong className="text-white">Alohida sotuv menejeri yollang</strong> — lidlar tezkor qayta ishlanishi hisobiga konversiya 2 barobargacha oshadi.
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg bg-secondary/30 p-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-[11px]">
              3
            </span>
            <div className="text-muted-foreground">
              <strong className="text-white">Reklamani test summasi bilan boshlang</strong> — dastlab $100-$150 sinov byudjeti bilan real CPL ni aniqlab oling.
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg bg-secondary/30 p-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-[11px]">
              4
            </span>
            <div className="text-muted-foreground">
              <strong className="text-white">Profil vizualini yangilang</strong> — profilingizga mijozlar ishonadigan keyslar va videolavhalar joylang.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        <Button
          variant="emerald"
          size="lg"
          onClick={handleShareTelegram}
          className="w-full text-base font-bold shadow-xl shadow-emerald-500/25"
        >
          <Share2 className="mr-2 h-5 w-5" />
          Hisobotni Telegramda yuborish
        </Button>

        <Button
          variant="secondary"
          size="lg"
          onClick={handleCopy}
          className="w-full font-semibold"
        >
          {copied ? (
            <>
              <Check className="mr-2 h-5 w-5 text-emerald-400" />
              Nusxalandi!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-5 w-5" />
              Hisobot matnini nusxalash
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            triggerHaptic("light");
            onRestart();
          }}
          className="w-full font-semibold text-muted-foreground hover:text-white"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Qayta hisoblash
        </Button>
      </div>
    </div>
  );
};

