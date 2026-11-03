import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Answers, AuditCalculationResult } from "@/types";
import { calculateAudit, generateReportSummaryText } from "@/lib/calculator";
import { shareAuditReport, triggerHaptic } from "@/lib/telegram";
import { playAppleSound } from "@/lib/sound";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
  ShieldCheck,
  Building2,
  Check,
  Coins,
  ArrowUpRight,
  Flame,
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
  const [islandNotification, setIslandNotification] = useState<string | null>(null);

  const calc: AuditCalculationResult = calculateAudit(answers);

  // Confetti burst on report render
  useEffect(() => {
    try {
      playAppleSound("success");
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.55 },
        colors: ["#3b82f6", "#10b981", "#8b5cf6", "#ec4899", "#f59e0b"],
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const showIslandToast = (msg: string) => {
    setIslandNotification(msg);
    setTimeout(() => {
      setIslandNotification(null);
    }, 2800);
  };

  const handleCopy = () => {
    playAppleSound("tap");
    triggerHaptic("success");
    const text = generateReportSummaryText(answers, calc);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      showIslandToast("Hisobot matni nusxalandi");
      setTimeout(() => setCopied(false), 2600);
    });
  };

  const handleShareTelegram = () => {
    playAppleSound("tap");
    triggerHaptic("medium");
    const text = generateReportSummaryText(answers, calc);
    shareAuditReport(text);
    showIslandToast("Telegram chat ochilmoqda...");
  };

  // What-If Simulator
  const handleCrmToggle = (checked: boolean) => {
    playAppleSound("toggle");
    triggerHaptic("light");
    onUpdateAnswer("hasCrm", checked ? "ha" : "yoq");
  };

  const handleSalesToggle = (checked: boolean) => {
    playAppleSound("toggle");
    triggerHaptic("light");
    onUpdateAnswer("salesTeam", checked ? "ha" : "ozim");
  };

  return (
    <div className="space-y-4 pb-14">
      {/* Apple Dynamic Island Floating Pill Notification */}
      <AnimatePresence>
        {islandNotification && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-14 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full dynamic-island px-4 py-2 text-xs font-semibold text-white shadow-2xl"
          >
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{islandNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="text-center pt-2 pb-1"
      >
        <Badge
          variant="blue"
          className="mb-2 py-1 px-3 text-[11px] font-semibold border-white/10 shadow-sm"
        >
          <Sparkles className="mr-1.5 h-3.5 w-3.5 text-cyan-300" />
          Biznes Auditi Yakunlandi
        </Badge>
        <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
          Biznes Auditi Xulosasi
        </h2>
        <p className="text-xs text-muted-foreground/80 mt-1 max-w-sm mx-auto">
          Sizning ko‘rsatkichlaringiz va maqsadlaringiz asosidagi matematik tahlil
        </p>
      </motion.div>

      {/* Apple Fitness Activity Ring / Risk Meter Card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div
          className={`apple-card p-5 ${
            calc.riskLevel === "high"
              ? "border-rose-500/30 bg-gradient-to-r from-rose-950/25 to-[#0b1020]"
              : calc.riskLevel === "medium"
              ? "border-amber-500/30 bg-gradient-to-r from-amber-950/25 to-[#0b1020]"
              : "border-emerald-500/30 bg-gradient-to-r from-emerald-950/25 to-[#0b1020]"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-white" />
                Tizim Samaradorligi
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    calc.riskLevel === "high"
                      ? "destructive"
                      : calc.riskLevel === "medium"
                      ? "warning"
                      : "success"
                  }
                  className="text-xs font-bold py-1 px-2.5"
                >
                  {calc.riskLabel}
                </Badge>
              </div>
            </div>

            {/* Apple Activity Ring Simulation */}
            <div className="relative flex h-16 w-16 items-center justify-center">
              <svg className="h-16 w-16 -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="5"
                  fill="transparent"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke={
                    calc.riskLevel === "high"
                      ? "#f43f5e"
                      : calc.riskLevel === "medium"
                      ? "#f59e0b"
                      : "#10b981"
                  }
                  strokeWidth="5"
                  strokeDasharray={163.3}
                  strokeDashoffset={163.3 * (1 - calc.riskScore / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute text-center">
                <span className="font-mono text-sm font-black text-white">
                  <AnimatedCounter value={calc.riskScore} suffix="%" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card 1: Biznes Holati */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Card className="apple-card">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <Building2 className="h-4 w-4 text-blue-400" />
              Infratuzilma ko'rsatkichlari
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-1 space-y-2 text-xs">
            <div className="flex items-center justify-between rounded-xl bg-white/[0.04] p-3 border border-white/5">
              <span className="text-muted-foreground font-medium">CRM tizimi:</span>
              <span className={`font-semibold ${answers.hasCrm === "ha" ? "text-emerald-400" : answers.hasCrm === "excel" ? "text-amber-400" : "text-rose-400"}`}>
                {calc.crmDisplay}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-white/[0.04] p-3 border border-white/5">
              <span className="text-muted-foreground font-medium">Sotuv bo‘limi:</span>
              <span className={`font-semibold ${answers.salesTeam === "ha" ? "text-emerald-400" : answers.salesTeam === "operator" ? "text-amber-400" : "text-rose-400"}`}>
                {calc.salesDisplay}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-white/[0.04] p-3 border border-white/5">
              <span className="text-muted-foreground font-medium">Upakovka (Sotsial tarmoq):</span>
              <span className={`font-semibold ${answers.packaging === "zor" ? "text-emerald-400" : answers.packaging === "ortacha" ? "text-amber-400" : "text-rose-400"}`}>
                {calc.packDisplay}
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Card 2: Moliyaviy Maqsad & Kerakli Mijozlar */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="apple-card">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <Target className="h-4 w-4 text-emerald-400" />
              Moliyaviy maqsad
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-1 space-y-2 text-xs">
            <div className="flex items-center justify-between rounded-xl bg-white/[0.04] p-3 border border-white/5">
              <span className="text-muted-foreground font-medium">Oylik tushum maqsadi:</span>
              <span className="text-sm font-black text-emerald-400 font-mono">
                $<AnimatedCounter value={calc.targetRevenue} />
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-white/[0.04] p-3 border border-white/5">
              <span className="text-muted-foreground font-medium">O‘rtacha chek:</span>
              <span className="text-sm font-bold text-white font-mono">${calc.averageCheck}</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-blue-500/10 border border-blue-500/30 p-3 shadow-inner">
              <span className="text-blue-300 font-semibold">Kerakli mijozlar soni:</span>
              <span className="text-base font-black text-cyan-300 font-mono">
                <AnimatedCounter value={calc.neededCustomers} suffix=" ta mijoz" />
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Card 3: Funnel Voronka Vizualizatsiyasi */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <Card className="apple-card">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-indigo-400" />
              Sotuv Voronkasi (Funnel)
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-1 space-y-3">
            <div className="space-y-2.5 rounded-2xl bg-white/[0.04] p-3.5 border border-white/5">
              {/* Funnel Step 1: Leads */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-muted-foreground">Kiruvchi lidlar</span>
                  <span className="text-blue-400 font-mono font-bold">
                    <AnimatedCounter value={calc.neededLeads} suffix=" ta" />
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-white/[0.06] overflow-hidden p-[1px]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-sm shadow-blue-500/50"
                  />
                </div>
              </div>

              {/* Funnel Step 2: Conversion */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-muted-foreground">Sotuv konversiyasi</span>
                  <span className="text-indigo-400 font-mono font-bold">
                    {calc.conversionRate}%
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-white/[0.06] overflow-hidden p-[1px]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(calc.conversionRate, 100)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-400 shadow-sm shadow-indigo-500/50"
                  />
                </div>
              </div>

              {/* Funnel Step 3: Paying Customers */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-muted-foreground">Xarid qiluvchi mijozlar</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    <AnimatedCounter value={calc.neededCustomers} suffix=" ta" />
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-white/[0.06] overflow-hidden p-[1px]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min((calc.neededCustomers / calc.neededLeads) * 100, 100)}%`,
                    }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm shadow-emerald-500/50"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-[11px] text-muted-foreground text-center font-mono">
              📐 Formula: ${calc.targetRevenue} / ${calc.averageCheck} / {calc.conversionRate}% = <strong className="text-white">{calc.neededLeads} ta lid</strong>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Card 4: Apple Card Style Reklama Byudjeti */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="apple-card border-blue-500/30 overflow-hidden">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <Coins className="h-4 w-4 text-emerald-400" />
                Reklama byudjeti ({calc.bench.name})
              </div>
              <Badge variant="blue" className="text-[10px] font-mono py-0 px-2">
                Lid: ${calc.minCpl} - ${calc.maxCpl}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-1 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {/* Minimal Budget */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                <span className="text-[11px] font-medium text-muted-foreground block mb-1">
                  Minimal byudjet
                </span>
                <span className="text-2xl font-black text-white font-mono block">
                  $<AnimatedCounter value={calc.minBudget} />
                </span>
                <span className="text-[10px] text-muted-foreground/80 mt-1 block">
                  ~${Math.round(calc.minBudget / 30)} / kun
                </span>
              </div>

              {/* Optimal Budget */}
              <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-emerald-500/15 to-emerald-950/30 p-4 text-center shadow-lg shadow-emerald-500/10">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-[11px] font-bold text-emerald-300">
                    Optimal byudjet
                  </span>
                  <Flame className="h-3 w-3 text-amber-400" />
                </div>
                <span className="text-2xl font-black text-emerald-400 font-mono block">
                  $<AnimatedCounter value={calc.maxBudget} />
                </span>
                <span className="text-[10px] text-emerald-300/80 mt-1 block">
                  ~${Math.round(calc.maxBudget / 30)} / kun
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Card 5: Jarimalar & Ogohlantirish */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        {calc.totalPenaltyPercent > 0 ? (
          <Card className="apple-card border-rose-500/35 bg-gradient-to-r from-rose-950/20 to-[#0e0b14]">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-300">
                <AlertTriangle className="h-4 w-4 text-rose-400" />
                Samaradorlik jarimasi: +{calc.totalPenaltyPercent}%
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-2 text-xs text-rose-100/90">
              {answers.hasCrm === "yoq" && (
                <div className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <div>
                    <strong>CRM yo'qligi sababli yo'qotishlar (+20%)</strong> — kiruvchi mijozlar esdan chiqadi yoki kech javob beriladi.
                  </div>
                </div>
              )}
              {answers.hasCrm === "excel" && (
                <div className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <div>
                    <strong>Excelda yuritish xavfi (+10%)</strong> — qo‘lda boshqaruv tufayli lidlar nazoratdan chiqadi.
                  </div>
                </div>
              )}
              {answers.salesTeam === "ozim" && (
                <div className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <div>
                    <strong>Sotuvchilar yo'qligi (+20%)</strong> — boshqa ishlar tufayli mijozlar sovib qoladi.
                  </div>
                </div>
              )}
              {answers.salesTeam === "operator" && (
                <div className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <div>
                    <strong>Professional sotuvchi yo'qligi (+10%)</strong> — administrator faqat konsultatsiya beradi, sotmaydi.
                  </div>
                </div>
              )}
              {answers.packaging === "yomon" && (
                <div className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <div>
                    <strong>Upakovka yomonligi (+15%)</strong> — profil ishonchsiz ko‘rinib, reklama narxi qimmatlashadi.
                  </div>
                </div>
              )}

              <div className="mt-2 rounded-xl bg-rose-500/15 border border-rose-500/25 p-2.5 text-rose-200 font-medium">
                Tizim to‘liq bo‘lmagani uchun real byudjet <strong>+{calc.totalPenaltyPercent}% ga ortiqcha</strong> bo‘lishi mumkin (Kutilayotgan ortiqcha sarf: ~${calc.potentialSavings}).
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="apple-card border-emerald-500/35 bg-gradient-to-r from-emerald-950/20 to-[#091515]">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Mukammal infratuzilma (0% jarima)
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-1 text-xs text-emerald-200/90 leading-relaxed">
              Sizda CRM va sotuv bo‘limi mavjud bo‘lgani sababli reklama byudjetingiz maksimal darajada tejamkor va samarador sarflanadi.
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Card 6: Interactive Live What-If Simulator */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="apple-card border-indigo-500/35 bg-gradient-to-b from-[#11172f]/80 to-[#0b0e1b]">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-300">
              <Zap className="h-4 w-4 text-amber-400" />
              Jonli Simulyator: "Tizim qilsak nima bo'ladi?"
            </div>
            <p className="text-[11px] text-muted-foreground/80 mt-0.5">
              Quyidagi switchlarni yoqib ko‘ring — byudjet qancha tejalishini real vaqt rejimida hisoblang:
            </p>
          </CardHeader>
          <CardContent className="p-4 pt-1 space-y-3">
            <div className="space-y-2.5 rounded-2xl bg-white/[0.04] p-3.5 border border-white/5">
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

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 flex items-center justify-between shadow-inner">
              <span className="text-xs font-bold text-emerald-300">
                Tejaladigan mablag':
              </span>
              <span className="text-sm font-black text-emerald-400 font-mono">
                <AnimatedCounter value={calc.potentialSavings} prefix="$" suffix=" / oyiga" />
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Card 7: Ekspert Tavsiyalari */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <Card className="apple-card">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Strategik Tavsiyalar
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-1 space-y-2 text-xs">
            <div className="flex items-start gap-3 rounded-xl bg-white/[0.03] p-3 border border-white/5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 font-mono font-bold text-[11px]">
                1
              </span>
              <div className="text-muted-foreground">
                <strong className="text-white">CRM tizimi o‘rnating</strong> — bu byudjetni 20% gacha tejaydi va har bir lidni nazoratda ushlaydi.
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl bg-white/[0.03] p-3 border border-white/5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 font-mono font-bold text-[11px]">
                2
              </span>
              <div className="text-muted-foreground">
                <strong className="text-white">Alohida sotuvchi yollang</strong> — lidlar tezkor qayta ishlanishi hisobiga sotuv konversiyasi 2 barobargacha oshadi.
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl bg-white/[0.03] p-3 border border-white/5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 font-mono font-bold text-[11px]">
                3
              </span>
              <div className="text-muted-foreground">
                <strong className="text-white">Test byudjeti bilan boshlang</strong> — dastlab $100-$150 sinov byudjeti bilan real CPL ni o‘lchab oling.
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl bg-white/[0.03] p-3 border border-white/5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 font-mono font-bold text-[11px]">
                4
              </span>
              <div className="text-muted-foreground">
                <strong className="text-white">Sahifa upakovkasini kuchaytiring</strong> — keyslar, jonli sharhlar va aniq taklif joylang.
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-3 pt-3"
      >
        <Button
          variant="emerald"
          size="lg"
          onClick={handleShareTelegram}
          className="w-full text-base font-extrabold shadow-2xl shadow-emerald-500/30"
        >
          <Share2 className="h-5 w-5" />
          Hisobotni Telegramda yuborish
        </Button>

        <Button
          variant="secondary"
          size="lg"
          onClick={handleCopy}
          className="w-full text-[15px] font-bold"
        >
          {copied ? (
            <>
              <Check className="h-5 w-5 text-emerald-400" />
              Hisobot matni nusxalandi!
            </>
          ) : (
            <>
              <Copy className="h-5 w-5 text-white/80" />
              Hisobot matnini nusxalash
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            playAppleSound("tap");
            triggerHaptic("light");
            onRestart();
          }}
          className="w-full text-[14px] font-semibold text-white/80 hover:text-white"
        >
          <RotateCcw className="h-4 w-4 text-white/60" />
          Boshidan qayta hisoblash
        </Button>
      </motion.div>
    </div>
  );
};
