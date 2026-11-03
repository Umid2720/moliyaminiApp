import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Answers, CrmStatus, SalesStatus, PackagingStatus } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { triggerHaptic } from "@/lib/telegram";
import { playAppleSound } from "@/lib/sound";
import { calculateAudit } from "@/lib/calculator";
import { INDUSTRIES, PLATFORM_BENCHMARKS } from "@/lib/constants";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Crown,
  Briefcase,
  Rocket,
  Zap,
  FileSpreadsheet,
  AlertTriangle,
  Users2,
  Headphones,
  UserCheck,
  Sparkles,
  Layers,
  ShieldAlert,
  Wrench,
  ShoppingBag,
  Factory,
  GraduationCap,
  Laptop,
  HeartPulse,
  Building2,
  Boxes,
  Camera,
  Send,
  Search,
  Music2,
  Calculator,
  Flame,
  CheckCircle2,
} from "lucide-react";

interface QuizQuestionProps {
  step: number;
  answers: Answers;
  onUpdateAnswer: <K extends keyof Answers>(key: K, value: Answers[K]) => void;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
  onStep4Proceed: () => void;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  step,
  answers,
  onUpdateAnswer,
  onNext,
  onPrev,
  onFinish,
  onStep4Proceed,
}) => {
  const calc = calculateAudit(answers);

  const handleSelect = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    playAppleSound("tap");
    triggerHaptic("light");
    onUpdateAnswer(key, value);
  };

  const handleSliderTick = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    playAppleSound("tick");
    onUpdateAnswer(key, value);
  };

  // STEP 1: Siz biznes egasimisiz?
  if (step === 1) {
    const roles = [
      {
        id: "Ha, ta'sischi / biznes egasiman",
        title: "Ha, ta'sischi / biznes egasiman",
        desc: "Kompaniyaning asosiy egasi va strategik qarorlar qabul qiluvchi",
        icon: <Crown className="h-5 w-5 text-amber-300" />,
        gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
        border: "group-hover:border-amber-500/40",
      },
      {
        id: "Boshqaruvchi / CEO / Bosh direktor",
        title: "Boshqaruvchi / CEO / Direktor",
        desc: "Operatsion boshqaruv, jamoa va moliyaviy o'sishga mas'ul rahbar",
        icon: <Briefcase className="h-5 w-5 text-blue-300" />,
        gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
        border: "group-hover:border-blue-500/40",
      },
      {
        id: "Startap / Endi biznes boshlayapman",
        title: "Endi biznes boshlayapman",
        desc: "Startap bosqichida yoki yangi yo'nalishni ishga tushirish arafasida",
        icon: <Rocket className="h-5 w-5 text-purple-300" />,
        gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
        border: "group-hover:border-purple-500/40",
      },
    ];

    return (
      <motion.div
        key="step-1"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
      >
        <Card className="apple-card">
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="blue" className="text-[10px] py-0.5 px-2">1-bosqich</Badge>
              <span className="text-[11px] text-muted-foreground">Infratuzilma</span>
            </div>
            <CardTitle className="text-xl md:text-2xl text-white">
              Siz biznes egasimisiz?
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground/90 mt-1">
              Biznesdagi rolingiz audit xulosalarini to‘g‘ri shakllantirishga yordam beradi.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-5 pt-1 space-y-3">
            {roles.map((item) => {
              const isSelected = answers.isOwner === item.id;
              return (
                <motion.div
                  key={item.id}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleSelect("isOwner", item.id)}
                  className={`group relative flex items-center justify-between rounded-2xl p-4 cursor-pointer overflow-hidden transition-all ${
                    isSelected
                      ? "apple-card-selected"
                      : "apple-card-interactive"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} border border-white/10 shadow-sm`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {item.title}
                      </div>
                      <div className="text-xs text-muted-foreground/80 mt-0.5 line-clamp-1">
                        {item.desc}
                      </div>
                    </div>
                  </div>

                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-500 text-white shadow-md shadow-blue-500/40"
                      : "border-white/20 bg-white/5"
                  }`}>
                    {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </div>
                </motion.div>
              );
            })}
          </CardContent>

          <CardFooter className="p-5 pt-3">
            <Button
              variant="glow"
              size="lg"
              className="w-full text-[15px] font-bold shadow-lg shadow-blue-500/25"
              onClick={() => {
                playAppleSound("tap");
                triggerHaptic("medium");
                onNext();
              }}
            >
              Keyingi bosqich
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  // STEP 2: CRM tizimi
  if (step === 2) {
    const crmOptions: {
      id: CrmStatus;
      title: string;
      desc: string;
      badge: string;
      badgeVariant: "success" | "warning" | "destructive";
      icon: React.ReactNode;
      gradient: string;
    }[] = [
      {
        id: "ha",
        title: "Ha, CRM tizimi mavjud",
        desc: "AmoCRM, Bitrix24 yoki maxsus CRM orqali 100% nazorat qilinadi",
        badge: "0% yo'qotish (Optimal)",
        badgeVariant: "success",
        icon: <Zap className="h-5 w-5 text-emerald-300" />,
        gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      },
      {
        id: "excel",
        title: "Excel yoki Google Sheets da",
        desc: "Jadvallar orqali qisman nazorat mavjud, qo‘lda kiritiladi",
        badge: "+10% yo'qotish xavfi",
        badgeVariant: "warning",
        icon: <FileSpreadsheet className="h-5 w-5 text-amber-300" />,
        gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
      },
      {
        id: "yoq",
        title: "Yo'q, CRM mavjud emas",
        desc: "Mijozlar faqat Telegram chatda yoki qog‘oz daftarda",
        badge: "+20% jarima (Lidlar yo'qolishi)",
        badgeVariant: "destructive",
        icon: <AlertTriangle className="h-5 w-5 text-rose-300" />,
        gradient: "from-rose-500/20 via-red-500/10 to-transparent",
      },
    ];

    return (
      <motion.div
        key="step-2"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
      >
        <Card className="apple-card">
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="blue" className="text-[10px] py-0.5 px-2">2-bosqich</Badge>
              <span className="text-[11px] text-muted-foreground">Infratuzilma</span>
            </div>
            <CardTitle className="text-xl md:text-2xl text-white">
              Sizda CRM tizimi bormi?
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground/90 mt-1">
              CRM tizimi lidlar yo‘qolishining oldini oladi va reklama byudjetini tejaydi.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-5 pt-1 space-y-3">
            {crmOptions.map((opt) => {
              const isSelected = answers.hasCrm === opt.id;
              return (
                <motion.div
                  key={opt.id}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleSelect("hasCrm", opt.id)}
                  className={`group relative flex flex-col gap-2 rounded-2xl p-4 cursor-pointer transition-all ${
                    isSelected ? "apple-card-selected" : "apple-card-interactive"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${opt.gradient} border border-white/10 shadow-sm`}>
                        {opt.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {opt.title}
                        </div>
                        <div className="text-xs text-muted-foreground/80 mt-0.5">
                          {opt.desc}
                        </div>
                      </div>
                    </div>
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-500 text-white shadow-md shadow-blue-500/40"
                        : "border-white/20 bg-white/5"
                    }`}>
                      {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                  </div>
                  <div className="pl-14">
                    <Badge variant={opt.badgeVariant} className="text-[10px] py-0 px-2 font-medium">
                      {opt.badge}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </CardContent>

          <CardFooter className="flex gap-3 p-5 pt-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                playAppleSound("tap");
                triggerHaptic("light");
                onPrev();
              }}
              className="px-5"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="glow"
              size="lg"
              className="flex-1 text-[15px] font-bold shadow-lg shadow-blue-500/25"
              onClick={() => {
                playAppleSound("tap");
                triggerHaptic("medium");
                onNext();
              }}
            >
              Keyingi bosqich
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  // STEP 3: Sotuv bo'limi
  if (step === 3) {
    const salesOptions: {
      id: SalesStatus;
      title: string;
      desc: string;
      badge: string;
      badgeVariant: "success" | "warning" | "destructive";
      icon: React.ReactNode;
      gradient: string;
    }[] = [
      {
        id: "ha",
        title: "Ha, professional sotuv jamoasi bor",
        desc: "Alohida sotuv menejerlari faqat kiruvchi lidlarni yopish bilan band",
        badge: "0% jarima (Maksimal konversiya)",
        badgeVariant: "success",
        icon: <Users2 className="h-5 w-5 text-emerald-300" />,
        gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      },
      {
        id: "operator",
        title: "Operator yoki Administrator sotadi",
        desc: "Boshqa kundalik ishlar bilan parallel qo‘ng‘iroqlarga javob beradi",
        badge: "+10% yo'qotish xavfi",
        badgeVariant: "warning",
        icon: <Headphones className="h-5 w-5 text-amber-300" />,
        gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
      },
      {
        id: "ozim",
        title: "Yo'q, barchasini o'zim sotaman",
        desc: "Vaqt yetishmasligi tufayli lidlar sovib, javobsiz qolishi mumkin",
        badge: "+20% jarima (Past konversiya)",
        badgeVariant: "destructive",
        icon: <UserCheck className="h-5 w-5 text-rose-300" />,
        gradient: "from-rose-500/20 via-red-500/10 to-transparent",
      },
    ];

    return (
      <motion.div
        key="step-3"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
      >
        <Card className="apple-card">
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="blue" className="text-[10px] py-0.5 px-2">3-bosqich</Badge>
              <span className="text-[11px] text-muted-foreground">Infratuzilma</span>
            </div>
            <CardTitle className="text-xl md:text-2xl text-white">
              Alohida sotuv bo'limi bormi?
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground/90 mt-1">
              Menejerlar mavjudligi har bir lidga 1-3 daqiqada javob berishni ta’minlaydi.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-5 pt-1 space-y-3">
            {salesOptions.map((opt) => {
              const isSelected = answers.salesTeam === opt.id;
              return (
                <motion.div
                  key={opt.id}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleSelect("salesTeam", opt.id)}
                  className={`group relative flex flex-col gap-2 rounded-2xl p-4 cursor-pointer transition-all ${
                    isSelected ? "apple-card-selected" : "apple-card-interactive"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${opt.gradient} border border-white/10 shadow-sm`}>
                        {opt.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {opt.title}
                        </div>
                        <div className="text-xs text-muted-foreground/80 mt-0.5">
                          {opt.desc}
                        </div>
                      </div>
                    </div>
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-500 text-white shadow-md shadow-blue-500/40"
                        : "border-white/20 bg-white/5"
                    }`}>
                      {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                  </div>
                  <div className="pl-14">
                    <Badge variant={opt.badgeVariant} className="text-[10px] py-0 px-2 font-medium">
                      {opt.badge}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </CardContent>

          <CardFooter className="flex gap-3 p-5 pt-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                playAppleSound("tap");
                triggerHaptic("light");
                onPrev();
              }}
              className="px-5"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="glow"
              size="lg"
              className="flex-1 text-[15px] font-bold shadow-lg shadow-blue-500/25"
              onClick={() => {
                playAppleSound("tap");
                triggerHaptic("medium");
                onNext();
              }}
            >
              Keyingi bosqich
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  // STEP 4: Upakovka (Ijtimoiy tarmoqlar)
  if (step === 4) {
    const packOptions: {
      id: PackagingStatus;
      title: string;
      desc: string;
      badge: string;
      badgeVariant: "success" | "warning" | "destructive";
      icon: React.ReactNode;
      gradient: string;
    }[] = [
      {
        id: "zor",
        title: "Zo'r holatda (Brend darajasida)",
        desc: "Professional vizual, faol Reels/Stories, mijoz sharhlari va keyslar",
        badge: "0% jarima (Ishonch yuqori)",
        badgeVariant: "success",
        icon: <Sparkles className="h-5 w-5 text-emerald-300" />,
        gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      },
      {
        id: "ortacha",
        title: "O'rtacha holatda",
        desc: "Postlar chiqadi, lekin yagona brendbook va tizimli kontent yo'q",
        badge: "+5% jarima",
        badgeVariant: "warning",
        icon: <Layers className="h-5 w-5 text-amber-300" />,
        gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
      },
      {
        id: "yomon",
        title: "Yomon yoki umuman yuritilmaydi",
        desc: "Eski postlar, tashlandiq sahifa yoki sifatsiz havaskor rasmlar",
        badge: "+15% jarima (Lidlar qimmatlashadi)",
        badgeVariant: "destructive",
        icon: <ShieldAlert className="h-5 w-5 text-rose-300" />,
        gradient: "from-rose-500/20 via-red-500/10 to-transparent",
      },
    ];

    return (
      <motion.div
        key="step-4"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
      >
        <Card className="apple-card">
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="blue" className="text-[10px] py-0.5 px-2">4-bosqich</Badge>
              <span className="text-[11px] text-muted-foreground">Infratuzilma</span>
            </div>
            <CardTitle className="text-xl md:text-2xl text-white">
              Ijtimoiy tarmoqlar (Upakovka)?
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground/90 mt-1">
              Reklama ko‘rgan mijoz sahifangizga kirganda ishonch hosil qilishi kerak.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-5 pt-1 space-y-3">
            {packOptions.map((opt) => {
              const isSelected = answers.packaging === opt.id;
              return (
                <motion.div
                  key={opt.id}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleSelect("packaging", opt.id)}
                  className={`group relative flex flex-col gap-2 rounded-2xl p-4 cursor-pointer transition-all ${
                    isSelected ? "apple-card-selected" : "apple-card-interactive"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${opt.gradient} border border-white/10 shadow-sm`}>
                        {opt.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {opt.title}
                        </div>
                        <div className="text-xs text-muted-foreground/80 mt-0.5">
                          {opt.desc}
                        </div>
                      </div>
                    </div>
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-500 text-white shadow-md shadow-blue-500/40"
                        : "border-white/20 bg-white/5"
                    }`}>
                      {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                  </div>
                  <div className="pl-14">
                    <Badge variant={opt.badgeVariant} className="text-[10px] py-0 px-2 font-medium">
                      {opt.badge}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </CardContent>

          <CardFooter className="flex gap-2 p-5 pt-1">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                playAppleSound("tap");
                triggerHaptic("light");
                onPrev();
              }}
              className="px-4"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="glow"
              size="lg"
              className="flex-1 text-sm font-bold shadow-lg shadow-blue-500/25"
              onClick={() => {
                playAppleSound("tap");
                triggerHaptic("medium");
                onStep4Proceed();
              }}
            >
              Moliyaviy qismga o‘tish
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  // STEP 5: Soha tanlovi
  if (step === 5) {
    const iconMap: Record<string, React.ReactNode> = {
      wrench: <Wrench className="h-5 w-5 text-blue-300" />,
      "shopping-bag": <ShoppingBag className="h-5 w-5 text-emerald-300" />,
      factory: <Factory className="h-5 w-5 text-amber-300" />,
      "graduation-cap": <GraduationCap className="h-5 w-5 text-purple-300" />,
      laptop: <Laptop className="h-5 w-5 text-cyan-300" />,
      "heart-pulse": <HeartPulse className="h-5 w-5 text-rose-300" />,
      "building-2": <Building2 className="h-5 w-5 text-yellow-300" />,
      boxes: <Boxes className="h-5 w-5 text-slate-300" />,
    };

    return (
      <motion.div
        key="step-5"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
      >
        <Card className="apple-card">
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="blue" className="text-[10px] py-0.5 px-2">5-bosqich</Badge>
              <span className="text-[11px] text-muted-foreground">Bozor va Platforma</span>
            </div>
            <CardTitle className="text-xl md:text-2xl text-white">
              Biznesingiz qaysi sohada?
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground/90 mt-1">
              Har bir soha uchun o‘rtacha chek va lid narxi (benchmark) farqlanadi.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-5 pt-1">
            <div className="grid grid-cols-2 gap-2.5">
              {INDUSTRIES.map((item) => {
                const isSelected = answers.industry === item.id;
                return (
                  <motion.div
                    key={item.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelect("industry", item.id)}
                    className={`relative flex flex-col justify-between rounded-2xl p-3.5 cursor-pointer transition-all ${
                      isSelected
                        ? "apple-card-selected"
                        : "apple-card-interactive"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 shadow-sm">
                        {iconMap[item.icon] || <Boxes className="h-5 w-5" />}
                      </div>
                      <div className={`flex h-4 w-4 items-center justify-center rounded-full border transition-all ${
                        isSelected
                          ? "border-blue-400 bg-blue-500 text-white"
                          : "border-white/10 bg-transparent"
                      }`}>
                        {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-white leading-tight">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-muted-foreground/80 mt-0.5 line-clamp-1">
                        {item.subtitle}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>

          <CardFooter className="flex gap-3 p-5 pt-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                playAppleSound("tap");
                triggerHaptic("light");
                onPrev();
              }}
              className="px-5"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="glow"
              size="lg"
              className="flex-1 text-[15px] font-bold shadow-lg shadow-blue-500/25"
              onClick={() => {
                playAppleSound("tap");
                triggerHaptic("medium");
                onNext();
              }}
            >
              Keyingi bosqich
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  // STEP 6: Reklama platformasi
  if (step === 6) {
    const platforms = [
      {
        id: "Instagram",
        name: "Instagram & Facebook",
        cpl: "$0.80 - $1.50",
        icon: <Camera className="h-5 w-5 text-pink-300" />,
        gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
      },
      {
        id: "Telegram",
        name: "Telegram (Ads & Kanallar)",
        cpl: "$0.60 - $1.20",
        icon: <Send className="h-5 w-5 text-sky-300" />,
        gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
      },
      {
        id: "Google",
        name: "Google & YouTube Ads",
        cpl: "$1.20 - $2.40",
        icon: <Search className="h-5 w-5 text-amber-300" />,
        gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
      },
      {
        id: "TikTok",
        name: "TikTok Ads",
        cpl: "$0.50 - $1.10",
        icon: <Music2 className="h-5 w-5 text-cyan-300" />,
        gradient: "from-cyan-500/20 via-purple-500/10 to-transparent",
      },
      {
        id: "Multichannel",
        name: "Multi-kanal (Kombinatsiya)",
        cpl: "$0.80 - $1.60",
        icon: <Layers className="h-5 w-5 text-indigo-300" />,
        gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
      },
    ];

    return (
      <motion.div
        key="step-6"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
      >
        <Card className="apple-card">
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="blue" className="text-[10px] py-0.5 px-2">6-bosqich</Badge>
              <span className="text-[11px] text-muted-foreground">Bozor va Platforma</span>
            </div>
            <CardTitle className="text-xl md:text-2xl text-white">
              Asosiy reklama platformangiz?
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground/90 mt-1">
              Hisob-kitoblar tanlangan platformaning real bozor CPL benchmarki asosida shakllanadi.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-5 pt-1 space-y-2.5">
            {platforms.map((p) => {
              const isSelected = answers.platform === p.id;
              return (
                <motion.div
                  key={p.id}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleSelect("platform", p.id)}
                  className={`group relative flex items-center justify-between rounded-2xl p-3.5 cursor-pointer transition-all ${
                    isSelected ? "apple-card-selected" : "apple-card-interactive"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${p.gradient} border border-white/10 shadow-sm`}>
                      {p.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {p.name}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-muted-foreground">Lid narxi:</span>
                        <span className="font-mono text-[11px] font-bold text-cyan-300">
                          {p.cpl}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-500 text-white shadow-md shadow-blue-500/40"
                      : "border-white/20 bg-white/5"
                  }`}>
                    {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </div>
                </motion.div>
              );
            })}
          </CardContent>

          <CardFooter className="flex gap-3 p-5 pt-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                playAppleSound("tap");
                triggerHaptic("light");
                onPrev();
              }}
              className="px-5"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="glow"
              size="lg"
              className="flex-1 text-[15px] font-bold shadow-lg shadow-blue-500/25"
              onClick={() => {
                playAppleSound("tap");
                triggerHaptic("medium");
                onNext();
              }}
            >
              Keyingi bosqich
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  // STEP 7: Oylik Daromad Maqsadi
  if (step === 7) {
    const presets = [3000, 5000, 10000, 20000, 50000, 100000];

    return (
      <motion.div
        key="step-7"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
      >
        <Card className="apple-card">
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="blue" className="text-[10px] py-0.5 px-2">7-bosqich</Badge>
              <span className="text-[11px] text-muted-foreground">Moliyaviy maqsad</span>
            </div>
            <CardTitle className="text-xl md:text-2xl text-white">
              Oylik daromad maqsadingiz?
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground/90 mt-1">
              Oyiga qancha umumiy tushum / savdo aylanmasini maqsad qilgansiz?
            </CardDescription>
          </CardHeader>

          <CardContent className="p-5 pt-1 space-y-4">
            {/* Apple Style Numeric Input Box */}
            <div className="apple-card-metallic rounded-3xl p-6 text-center">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Oylik Tushum Maqsadi ($ USD)
              </span>

              <div className="mt-3 flex items-center justify-center gap-1.5">
                <span className="text-3xl font-extrabold text-emerald-400">$</span>
                <input
                  type="number"
                  value={answers.targetRevenue}
                  onChange={(e) => {
                    const val = Math.max(100, Number(e.target.value) || 0);
                    onUpdateAnswer("targetRevenue", val);
                  }}
                  className="w-48 bg-transparent text-center text-4xl font-black text-white focus:outline-none p-0"
                />
              </div>

              {/* Slider with Apple curve */}
              <div className="mt-6 px-1">
                <Slider
                  value={[Math.min(answers.targetRevenue, 50000)]}
                  onValueChange={(val) => {
                    handleSliderTick("targetRevenue", val[0]);
                  }}
                  min={1000}
                  max={50000}
                  step={500}
                />
                <div className="flex justify-between text-[11px] text-muted-foreground/80 mt-2 font-mono">
                  <span>$1,000</span>
                  <span>$25,000</span>
                  <span>$50,000+</span>
                </div>
              </div>
            </div>

            {/* Apple Segmented Preset Chips */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-medium text-muted-foreground">
                Tezkor variantlar:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {presets.map((val) => {
                  const isSelected = answers.targetRevenue === val;
                  return (
                    <motion.button
                      key={val}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        playAppleSound("tap");
                        triggerHaptic("light");
                        onUpdateAnswer("targetRevenue", val);
                      }}
                      className={`h-10 rounded-xl text-xs font-semibold transition-all ${
                        isSelected
                          ? "bg-blue-500 text-white shadow-md shadow-blue-500/30 border border-blue-400"
                          : "bg-white/[0.05] text-white/90 border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      ${val.toLocaleString()}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex gap-3 p-5 pt-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                playAppleSound("tap");
                triggerHaptic("light");
                onPrev();
              }}
              className="px-5"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="glow"
              size="lg"
              className="flex-1 text-[15px] font-bold shadow-lg shadow-blue-500/25"
              onClick={() => {
                playAppleSound("tap");
                triggerHaptic("medium");
                onNext();
              }}
            >
              Keyingi bosqich
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  // STEP 8: O'rtacha Chek
  if (step === 8) {
    const presets = [20, 40, 60, 100, 250, 500];

    return (
      <motion.div
        key="step-8"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
      >
        <Card className="apple-card">
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="blue" className="text-[10px] py-0.5 px-2">8-bosqich</Badge>
              <span className="text-[11px] text-muted-foreground">Moliyaviy maqsad</span>
            </div>
            <CardTitle className="text-xl md:text-2xl text-white">
              O'rtacha chek qancha? ($)
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground/90 mt-1">
              Bitta mijoz mahsulot yoki xizmatingiz uchun o‘rtacha qancha to‘laydi?
            </CardDescription>
          </CardHeader>

          <CardContent className="p-5 pt-1 space-y-4">
            <div className="apple-card-metallic rounded-3xl p-6 text-center">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Bitta Buyurtma Qiymati ($ USD)
              </span>

              <div className="mt-3 flex items-center justify-center gap-1.5">
                <span className="text-3xl font-extrabold text-blue-400">$</span>
                <input
                  type="number"
                  value={answers.averageCheck}
                  onChange={(e) => {
                    const val = Math.max(5, Number(e.target.value) || 0);
                    onUpdateAnswer("averageCheck", val);
                  }}
                  className="w-36 bg-transparent text-center text-4xl font-black text-white focus:outline-none p-0"
                />
              </div>

              <div className="mt-6 px-1">
                <Slider
                  value={[Math.min(answers.averageCheck, 500)]}
                  onValueChange={(val) => {
                    handleSliderTick("averageCheck", val[0]);
                  }}
                  min={10}
                  max={500}
                  step={5}
                />
                <div className="flex justify-between text-[11px] text-muted-foreground/80 mt-2 font-mono">
                  <span>$10</span>
                  <span>$250</span>
                  <span>$500+</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-medium text-muted-foreground">
                Tezkor variantlar:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {presets.map((val) => {
                  const isSelected = answers.averageCheck === val;
                  return (
                    <motion.button
                      key={val}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        playAppleSound("tap");
                        triggerHaptic("light");
                        onUpdateAnswer("averageCheck", val);
                      }}
                      className={`h-10 rounded-xl text-xs font-semibold transition-all ${
                        isSelected
                          ? "bg-blue-500 text-white shadow-md shadow-blue-500/30 border border-blue-400"
                          : "bg-white/[0.05] text-white/90 border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      ${val}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Live Funnel Calculation Preview */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 flex items-center justify-around text-center backdrop-blur-md">
              <div>
                <div className="text-base font-extrabold text-cyan-400">{calc.neededCustomers} ta</div>
                <div className="text-[10px] text-muted-foreground uppercase font-medium">Mijoz kerak</div>
              </div>
              <span className="text-muted-foreground/40">•</span>
              <div>
                <div className="text-base font-extrabold text-white">${calc.targetRevenue.toLocaleString()}</div>
                <div className="text-[10px] text-muted-foreground uppercase font-medium">Reja daromad</div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex gap-3 p-5 pt-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                playAppleSound("tap");
                triggerHaptic("light");
                onPrev();
              }}
              className="px-5"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="glow"
              size="lg"
              className="flex-1 text-[15px] font-bold shadow-lg shadow-blue-500/25"
              onClick={() => {
                playAppleSound("tap");
                triggerHaptic("medium");
                onNext();
              }}
            >
              Keyingi bosqich
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  // STEP 9: Sotuv Konversiyasi
  if (step === 9) {
    const presets = [
      { rate: 10, label: "10% (Boshlang'ich)" },
      { rate: 20, label: "20% (O'rtacha)" },
      { rate: 30, label: "30% (Yaxshi)" },
      { rate: 40, label: "40% (Top daraja)" },
    ];

    return (
      <motion.div
        key="step-9"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
      >
        <Card className="apple-card">
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="purple" className="text-[10px] py-0.5 px-2">9-bosqich (Yakuniy)</Badge>
              <span className="text-[11px] text-purple-300 font-medium">Audit xulosasi oldidan</span>
            </div>
            <CardTitle className="text-xl md:text-2xl text-white">
              Sotuv konversiyasi necha foiz?
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground/90 mt-1">
              Har 100 ta murojaatdan (lid) o‘rtacha nechtasi xarid qiluvchiga aylanadi?
            </CardDescription>
          </CardHeader>

          <CardContent className="p-5 pt-1 space-y-4">
            <div className="apple-card-metallic rounded-3xl p-6 text-center">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Sotuv Voronkasi Konversiyasi (%)
              </span>

              <div className="mt-3 flex items-center justify-center gap-1">
                <input
                  type="number"
                  value={answers.conversionRate}
                  onChange={(e) => {
                    let val = Number(e.target.value) || 1;
                    if (val > 100) val = 100;
                    if (val < 1) val = 1;
                    onUpdateAnswer("conversionRate", val);
                  }}
                  className="w-28 bg-transparent text-center text-4xl font-black text-white focus:outline-none p-0"
                />
                <span className="text-3xl font-extrabold text-purple-400">%</span>
              </div>

              <div className="mt-6 px-1">
                <Slider
                  value={[Math.min(answers.conversionRate, 60)]}
                  onValueChange={(val) => {
                    handleSliderTick("conversionRate", val[0]);
                  }}
                  min={5}
                  max={60}
                  step={1}
                />
                <div className="flex justify-between text-[11px] text-muted-foreground/80 mt-2 font-mono">
                  <span>5%</span>
                  <span>30%</span>
                  <span>60%+</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-medium text-muted-foreground">
                Standart bozor darajalari:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((item) => {
                  const isSelected = answers.conversionRate === item.rate;
                  return (
                    <motion.button
                      key={item.rate}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        playAppleSound("tap");
                        triggerHaptic("light");
                        onUpdateAnswer("conversionRate", item.rate);
                      }}
                      className={`h-10 rounded-xl text-xs font-semibold transition-all ${
                        isSelected
                          ? "bg-purple-600 text-white shadow-md shadow-purple-500/30 border border-purple-400"
                          : "bg-white/[0.05] text-white/90 border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Live Funnel Calculation Preview */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 flex items-center justify-around text-center backdrop-blur-md">
              <div>
                <div className="text-base font-extrabold text-blue-400">{calc.neededLeads} ta</div>
                <div className="text-[10px] text-muted-foreground uppercase font-medium">Kerakli lidlar</div>
              </div>
              <span className="text-muted-foreground/40">→</span>
              <div>
                <div className="text-base font-extrabold text-emerald-400">{calc.neededCustomers} ta</div>
                <div className="text-[10px] text-muted-foreground uppercase font-medium">To'lovchi mijoz</div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex gap-3 p-5 pt-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                playAppleSound("tap");
                triggerHaptic("light");
                onPrev();
              }}
              className="px-5"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="emerald"
              size="lg"
              className="flex-1 text-[15px] font-extrabold shadow-xl shadow-emerald-500/30"
              onClick={() => {
                playAppleSound("success");
                triggerHaptic("success");
                onFinish();
              }}
            >
              <Calculator className="h-5 w-5 mr-1" />
              Hisobotni hisoblash
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  return null;
};
