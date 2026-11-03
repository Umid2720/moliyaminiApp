import React from "react";
import { Answers, CrmStatus, SalesStatus, PackagingStatus } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { triggerHaptic } from "@/lib/telegram";
import { calculateAudit } from "@/lib/calculator";
import { INDUSTRIES, PLATFORM_BENCHMARKS } from "@/lib/constants";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Crown,
  Briefcase,
  Rocket,
  Zap,
  FileSpreadsheet,
  XCircle,
  Users,
  Headset,
  User,
  Sparkles,
  Scale,
  DollarSign,
  Percent,
  Calculator,
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

  // Helper for single choice selection with haptic feedback
  const handleSelect = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    triggerHaptic("light");
    onUpdateAnswer(key, value);
  };

  // STEP 1: Business role
  if (step === 1) {
    const roles = [
      {
        id: "Ha, ta'sischi / biznes egasiman",
        title: "Ha, ta'sischi / biznes egasiman",
        desc: "Asosiy qarorlarni o'zim qabul qilaman",
        icon: <Crown className="h-5 w-5 text-amber-400" />,
      },
      {
        id: "Boshqaruvchi / CEO / Bosh direktor",
        title: "Boshqaruvchi / CEO / Direktor",
        desc: "Kompaniya operatsion faoliyatini boshqaraman",
        icon: <Briefcase className="h-5 w-5 text-blue-400" />,
      },
      {
        id: "Startap / Endi biznes boshlayapman",
        title: "Endi biznes boshlayapman",
        desc: "Startap bosqichida yoki yangi yo'nalish",
        icon: <Rocket className="h-5 w-5 text-indigo-400" />,
      },
    ];

    return (
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="blue">1-savol</Badge>
          </div>
          <CardTitle>Siz biznes egasimisiz?</CardTitle>
          <CardDescription>
            Biznesdagi rolingiz auditni to‘g‘ri shakllantirishga yordam beradi.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {roles.map((item) => {
            const isSelected = answers.isOwner === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleSelect("isOwner", item.id)}
                className={`group flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10 shadow-md shadow-primary/10 ring-1 ring-primary"
                    : "border-border/60 bg-secondary/30 hover:border-border hover:bg-secondary/60"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-xl border ${isSelected ? "bg-primary/20 border-primary/40" : "bg-secondary/80 border-border/50"}`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {item.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </div>
                <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                  isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30"
                }`}>
                  {isSelected && <CheckCircle className="h-3.5 w-3.5" />}
                </div>
              </div>
            );
          })}
        </CardContent>
        <CardFooter className="pt-2">
          <Button
            variant="glow"
            className="w-full"
            onClick={() => {
              triggerHaptic("medium");
              onNext();
            }}
          >
            Keyingisi
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // STEP 2: CRM
  if (step === 2) {
    const crmOptions: {
      id: CrmStatus;
      title: string;
      desc: string;
      badge: string;
      badgeVariant: "success" | "warning" | "destructive";
      icon: React.ReactNode;
    }[] = [
      {
        id: "ha",
        title: "Ha, CRM tizimi bor",
        desc: "AmoCRM, Bitrix24 yoki maxsus tizim o‘rnatilgan",
        badge: "0% yo'qotish",
        badgeVariant: "success",
        icon: <Zap className="h-5 w-5 text-emerald-400" />,
      },
      {
        id: "excel",
        title: "Excel yoki Google Sheets da",
        desc: "Qisman nazorat mavjud, qo‘lda kiritiladi",
        badge: "+10% yo'qotish xavfi",
        badgeVariant: "warning",
        icon: <FileSpreadsheet className="h-5 w-5 text-amber-400" />,
      },
      {
        id: "yoq",
        title: "Yo'q, CRM mavjud emas",
        desc: "Mijozlar Telegram chat yoki daftarda saqlanadi",
        badge: "+20% jarima",
        badgeVariant: "destructive",
        icon: <XCircle className="h-5 w-5 text-red-400" />,
      },
    ];

    return (
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="blue">2-savol</Badge>
          </div>
          <CardTitle>Sizda CRM tizimi mavjudmi?</CardTitle>
          <CardDescription>
            CRM tizimi lidlar yo‘qolishining oldini oladi va byudjetni tejaydi.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {crmOptions.map((opt) => {
            const isSelected = answers.hasCrm === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => handleSelect("hasCrm", opt.id)}
                className={`flex flex-col gap-2 rounded-xl border p-4 cursor-pointer transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10 shadow-md shadow-primary/10 ring-1 ring-primary"
                    : "border-border/60 bg-secondary/30 hover:border-border hover:bg-secondary/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl border bg-secondary/80 border-border/50">
                      {opt.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {opt.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {opt.desc}
                      </div>
                    </div>
                  </div>
                  <div className={`h-5 w-5 shrink-0 rounded-full border flex items-center justify-center ${
                    isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30"
                  }`}>
                    {isSelected && <CheckCircle className="h-3.5 w-3.5" />}
                  </div>
                </div>
                <div className="pl-12">
                  <Badge variant={opt.badgeVariant} className="text-[10px]">
                    {opt.badge}
                  </Badge>
                </div>
              </div>
            );
          })}
        </CardContent>
        <CardFooter className="flex gap-2 pt-2">
          <Button
            variant="secondary"
            onClick={() => {
              triggerHaptic("light");
              onPrev();
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Orqaga
          </Button>
          <Button
            variant="glow"
            className="flex-1"
            onClick={() => {
              triggerHaptic("medium");
              onNext();
            }}
          >
            Keyingisi
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // STEP 3: Sales team
  if (step === 3) {
    const salesOptions: {
      id: SalesStatus;
      title: string;
      desc: string;
      badge: string;
      badgeVariant: "success" | "warning" | "destructive";
      icon: React.ReactNode;
    }[] = [
      {
        id: "ha",
        title: "Ha, sotuv bo'limi bor",
        desc: "Alohida menejerlar faqat sotuv bilan shug'ullanadi",
        badge: "0% jarima",
        badgeVariant: "success",
        icon: <Users className="h-5 w-5 text-emerald-400" />,
      },
      {
        id: "operator",
        title: "Operator / Administrator sotadi",
        desc: "Boshqa ishlar bilan birga mijozlarga javob beradi",
        badge: "+10% yo'qotish",
        badgeVariant: "warning",
        icon: <Headset className="h-5 w-5 text-amber-400" />,
      },
      {
        id: "ozim",
        title: "Yo'q, barchasini o'zim sotaman",
        desc: "Vaqt yetishmasligi tufayli lidlar javobsiz qolishi mumkin",
        badge: "+20% jarima",
        badgeVariant: "destructive",
        icon: <User className="h-5 w-5 text-red-400" />,
      },
    ];

    return (
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="blue">3-savol</Badge>
          </div>
          <CardTitle>Alohida sotuv bo'limi bormi?</CardTitle>
          <CardDescription>
            Menejerlar kiruvchi lidlarga tezkor javob berish va konversiyani oshirish uchun javobgar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {salesOptions.map((opt) => {
            const isSelected = answers.salesTeam === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => handleSelect("salesTeam", opt.id)}
                className={`flex flex-col gap-2 rounded-xl border p-4 cursor-pointer transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10 shadow-md shadow-primary/10 ring-1 ring-primary"
                    : "border-border/60 bg-secondary/30 hover:border-border hover:bg-secondary/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl border bg-secondary/80 border-border/50">
                      {opt.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {opt.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {opt.desc}
                      </div>
                    </div>
                  </div>
                  <div className={`h-5 w-5 shrink-0 rounded-full border flex items-center justify-center ${
                    isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30"
                  }`}>
                    {isSelected && <CheckCircle className="h-3.5 w-3.5" />}
                  </div>
                </div>
                <div className="pl-12">
                  <Badge variant={opt.badgeVariant} className="text-[10px]">
                    {opt.badge}
                  </Badge>
                </div>
              </div>
            );
          })}
        </CardContent>
        <CardFooter className="flex gap-2 pt-2">
          <Button
            variant="secondary"
            onClick={() => {
              triggerHaptic("light");
              onPrev();
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Orqaga
          </Button>
          <Button
            variant="glow"
            className="flex-1"
            onClick={() => {
              triggerHaptic("medium");
              onNext();
            }}
          >
            Keyingisi
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // STEP 4: Packaging / Sotsial tarmoqlar
  if (step === 4) {
    const packOptions: {
      id: PackagingStatus;
      title: string;
      desc: string;
      badge: string;
      badgeVariant: "success" | "warning" | "destructive";
      icon: React.ReactNode;
    }[] = [
      {
        id: "zor",
        title: "Zo'r holatda (Ishonchli)",
        desc: "Sifatli vizual, faol Reels/Stories, isbotlar va mijoz sharhlari",
        badge: "Maksimal konversiya (0%)",
        badgeVariant: "success",
        icon: <Sparkles className="h-5 w-5 text-emerald-400" />,
      },
      {
        id: "ortacha",
        title: "O'rtacha holatda",
        desc: "Postlar vaqti-vaqti bilan chiqadi, lekin yagona uslub yo'q",
        badge: "+5% jarima",
        badgeVariant: "warning",
        icon: <Scale className="h-5 w-5 text-amber-400" />,
      },
      {
        id: "yomon",
        title: "Yomon yoki umuman yuritilmaydi",
        desc: "Eski postlar, tashlandiq sahifa yoki sifatsiz kontent",
        badge: "+15% jarima",
        badgeVariant: "destructive",
        icon: <XCircle className="h-5 w-5 text-red-400" />,
      },
    ];

    return (
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="blue">4-savol</Badge>
          </div>
          <CardTitle>Ijtimoiy tarmoqlar holati? (Upakovka)</CardTitle>
          <CardDescription>
            Profilning ishonchli va chiroyli ko‘rinishi reklama bosgandan keyingi konversiyani belgilaydi.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {packOptions.map((opt) => {
            const isSelected = answers.packaging === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => handleSelect("packaging", opt.id)}
                className={`flex flex-col gap-2 rounded-xl border p-4 cursor-pointer transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10 shadow-md shadow-primary/10 ring-1 ring-primary"
                    : "border-border/60 bg-secondary/30 hover:border-border hover:bg-secondary/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl border bg-secondary/80 border-border/50">
                      {opt.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {opt.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {opt.desc}
                      </div>
                    </div>
                  </div>
                  <div className={`h-5 w-5 shrink-0 rounded-full border flex items-center justify-center ${
                    isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30"
                  }`}>
                    {isSelected && <CheckCircle className="h-3.5 w-3.5" />}
                  </div>
                </div>
                <div className="pl-12">
                  <Badge variant={opt.badgeVariant} className="text-[10px]">
                    {opt.badge}
                  </Badge>
                </div>
              </div>
            );
          })}
        </CardContent>
        <CardFooter className="flex gap-2 pt-2">
          <Button
            variant="secondary"
            onClick={() => {
              triggerHaptic("light");
              onPrev();
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Orqaga
          </Button>
          <Button
            variant="glow"
            className="flex-1"
            onClick={() => {
              triggerHaptic("medium");
              onStep4Proceed();
            }}
          >
            Moliyaviy qismga o‘tish
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // STEP 5: Industry Selection
  if (step === 5) {
    return (
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="blue">5-savol</Badge>
          </div>
          <CardTitle>Biznesingiz qaysi sohada?</CardTitle>
          <CardDescription>
            Soha bo‘yicha lidlar narxi (benchmark) va chek ko‘rsatkichlari farqlanadi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2.5">
            {INDUSTRIES.map((item) => {
              const isSelected = answers.industry === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect("industry", item.id)}
                  className={`flex flex-col items-start rounded-xl border p-3 cursor-pointer transition-all ${
                    isSelected
                      ? "border-primary bg-primary/15 ring-1 ring-primary shadow-md shadow-primary/10"
                      : "border-border/60 bg-secondary/30 hover:border-border hover:bg-secondary/60"
                  }`}
                >
                  <span className="text-2xl mb-1.5">{item.icon}</span>
                  <span className="text-xs font-bold text-white leading-tight">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-1">
                    {item.subtitle}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 pt-2">
          <Button
            variant="secondary"
            onClick={() => {
              triggerHaptic("light");
              onPrev();
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Orqaga
          </Button>
          <Button
            variant="glow"
            className="flex-1"
            onClick={() => {
              triggerHaptic("medium");
              onNext();
            }}
          >
            Keyingisi
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // STEP 6: Platform Selection
  if (step === 6) {
    const platforms = Object.values(PLATFORM_BENCHMARKS);

    return (
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="blue">6-savol</Badge>
          </div>
          <CardTitle>Asosiy reklama platformangiz?</CardTitle>
          <CardDescription>
            Byudjet hisobi ushbu platformadagi o‘rtacha lid narxi (CPL benchmark) asosida belgilanadi.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {platforms.map((p) => {
            const isSelected = answers.platform === p.id;
            return (
              <div
                key={p.id}
                onClick={() => handleSelect("platform", p.id || "Instagram")}
                className={`flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10 shadow-md shadow-primary/10 ring-1 ring-primary"
                    : "border-border/60 bg-secondary/30 hover:border-border hover:bg-secondary/60"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/80 border border-border/50 text-xl">
                    {p.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {p.name}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-xs text-muted-foreground">Lid narxi:</span>
                      <Badge variant="blue" className="text-[10px] py-0 px-1.5">
                        ${p.minCpl} - ${p.maxCpl}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                  isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30"
                }`}>
                  {isSelected && <CheckCircle className="h-3.5 w-3.5" />}
                </div>
              </div>
            );
          })}
        </CardContent>
        <CardFooter className="flex gap-2 pt-2">
          <Button
            variant="secondary"
            onClick={() => {
              triggerHaptic("light");
              onPrev();
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Orqaga
          </Button>
          <Button
            variant="glow"
            className="flex-1"
            onClick={() => {
              triggerHaptic("medium");
              onNext();
            }}
          >
            Keyingisi
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // STEP 7: Target Revenue
  if (step === 7) {
    const presets = [3000, 5000, 10000, 20000, 50000, 100000];

    return (
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="blue">7-savol</Badge>
          </div>
          <CardTitle>Oylik DAROMAD maqsadingiz? ($)</CardTitle>
          <CardDescription>
            Oyiga qancha umumiy savdo aylanmasi / tushum qilishni rejalashtirgansiz?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-2xl border border-border/80 bg-secondary/30 p-5 backdrop-blur-sm text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Oylik daromad maqsadi
            </span>
            <div className="mt-2 flex items-center justify-center gap-1">
              <span className="text-2xl font-bold text-emerald-400">$</span>
              <Input
                type="number"
                value={answers.targetRevenue}
                onChange={(e) => {
                  const val = Math.max(100, Number(e.target.value) || 0);
                  onUpdateAnswer("targetRevenue", val);
                }}
                min={500}
                max={500000}
                step={500}
                className="w-44 border-none bg-transparent text-center text-3xl font-extrabold text-white focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
              />
            </div>
            <div className="mt-5 px-2">
              <Slider
                value={[Math.min(answers.targetRevenue, 50000)]}
                onValueChange={(val) => {
                  onUpdateAnswer("targetRevenue", val[0]);
                }}
                min={1000}
                max={50000}
                step={500}
              />
              <div className="flex justify-between text-[11px] text-muted-foreground mt-1.5">
                <span>$1,000</span>
                <span>$25,000</span>
                <span>$50,000+</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs text-muted-foreground font-medium">Tezkor tanlov:</span>
            <div className="grid grid-cols-3 gap-2">
              {presets.map((val) => (
                <Button
                  key={val}
                  type="button"
                  variant={answers.targetRevenue === val ? "default" : "secondary"}
                  size="sm"
                  onClick={() => {
                    triggerHaptic("light");
                    onUpdateAnswer("targetRevenue", val);
                  }}
                  className="text-xs"
                >
                  ${val.toLocaleString()}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 pt-2">
          <Button
            variant="secondary"
            onClick={() => {
              triggerHaptic("light");
              onPrev();
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Orqaga
          </Button>
          <Button
            variant="glow"
            className="flex-1"
            onClick={() => {
              triggerHaptic("medium");
              onNext();
            }}
          >
            Keyingisi
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // STEP 8: Average Check
  if (step === 8) {
    const presets = [20, 40, 60, 100, 250, 500];

    return (
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="blue">8-savol</Badge>
          </div>
          <CardTitle>O'rtacha chek qancha? ($)</CardTitle>
          <CardDescription>
            Bitta mijoz sizga o‘rtacha qancha pul to‘laydi?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-2xl border border-border/80 bg-secondary/30 p-5 backdrop-blur-sm text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Bitta buyurtma o‘rtacha qiymati
            </span>
            <div className="mt-2 flex items-center justify-center gap-1">
              <span className="text-2xl font-bold text-blue-400">$</span>
              <Input
                type="number"
                value={answers.averageCheck}
                onChange={(e) => {
                  const val = Math.max(5, Number(e.target.value) || 0);
                  onUpdateAnswer("averageCheck", val);
                }}
                min={5}
                max={10000}
                step={5}
                className="w-36 border-none bg-transparent text-center text-3xl font-extrabold text-white focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
              />
            </div>
            <div className="mt-5 px-2">
              <Slider
                value={[Math.min(answers.averageCheck, 500)]}
                onValueChange={(val) => {
                  onUpdateAnswer("averageCheck", val[0]);
                }}
                min={10}
                max={500}
                step={5}
              />
              <div className="flex justify-between text-[11px] text-muted-foreground mt-1.5">
                <span>$10</span>
                <span>$250</span>
                <span>$500+</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs text-muted-foreground font-medium">Tezkor tanlov:</span>
            <div className="grid grid-cols-3 gap-2">
              {presets.map((val) => (
                <Button
                  key={val}
                  type="button"
                  variant={answers.averageCheck === val ? "default" : "secondary"}
                  size="sm"
                  onClick={() => {
                    triggerHaptic("light");
                    onUpdateAnswer("averageCheck", val);
                  }}
                  className="text-xs"
                >
                  ${val}
                </Button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border/40 bg-secondary/20 p-3 flex items-center justify-around text-center">
            <div>
              <div className="text-base font-bold text-cyan-400">{calc.neededCustomers} ta</div>
              <div className="text-[11px] text-muted-foreground">Mijoz kerak</div>
            </div>
            <span className="text-muted-foreground">•</span>
            <div>
              <div className="text-base font-bold text-white">${calc.targetRevenue.toLocaleString()}</div>
              <div className="text-[11px] text-muted-foreground">Umumiy maqsad</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 pt-2">
          <Button
            variant="secondary"
            onClick={() => {
              triggerHaptic("light");
              onPrev();
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Orqaga
          </Button>
          <Button
            variant="glow"
            className="flex-1"
            onClick={() => {
              triggerHaptic("medium");
              onNext();
            }}
          >
            Keyingisi
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // STEP 9: Conversion Rate (Final)
  if (step === 9) {
    const presets = [
      { rate: 10, label: "10% (Boshlang'ich)" },
      { rate: 20, label: "20% (O'rtacha)" },
      { rate: 30, label: "30% (Yaxshi)" },
      { rate: 40, label: "40% (Top daraja)" },
    ];

    return (
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple">9-savol (Yakuniy)</Badge>
          </div>
          <CardTitle>Sotuv konversiyasi necha foiz?</CardTitle>
          <CardDescription>
            100 ta murojaatdan (lid) o‘rtacha nechtasi xarid qiladi?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-2xl border border-border/80 bg-secondary/30 p-5 backdrop-blur-sm text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Sotuv konversiyasi
            </span>
            <div className="mt-2 flex items-center justify-center gap-1">
              <Input
                type="number"
                value={answers.conversionRate}
                onChange={(e) => {
                  let val = Number(e.target.value) || 1;
                  if (val > 100) val = 100;
                  if (val < 1) val = 1;
                  onUpdateAnswer("conversionRate", val);
                }}
                min={1}
                max={100}
                step={1}
                className="w-28 border-none bg-transparent text-center text-3xl font-extrabold text-white focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
              />
              <span className="text-2xl font-bold text-purple-400">%</span>
            </div>
            <div className="mt-5 px-2">
              <Slider
                value={[Math.min(answers.conversionRate, 60)]}
                onValueChange={(val) => {
                  onUpdateAnswer("conversionRate", val[0]);
                }}
                min={5}
                max={60}
                step={1}
              />
              <div className="flex justify-between text-[11px] text-muted-foreground mt-1.5">
                <span>5%</span>
                <span>30%</span>
                <span>60%+</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs text-muted-foreground font-medium">Standart darajalar:</span>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((item) => (
                <Button
                  key={item.rate}
                  type="button"
                  variant={answers.conversionRate === item.rate ? "default" : "secondary"}
                  size="sm"
                  onClick={() => {
                    triggerHaptic("light");
                    onUpdateAnswer("conversionRate", item.rate);
                  }}
                  className="text-xs"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border/40 bg-secondary/20 p-3 flex items-center justify-around text-center">
            <div>
              <div className="text-base font-bold text-blue-400">{calc.neededLeads} ta</div>
              <div className="text-[11px] text-muted-foreground">Kerakli lidlar</div>
            </div>
            <span className="text-muted-foreground">→</span>
            <div>
              <div className="text-base font-bold text-emerald-400">{calc.neededCustomers} ta</div>
              <div className="text-[11px] text-muted-foreground">Xarid qiluvchi mijoz</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 pt-2">
          <Button
            variant="secondary"
            onClick={() => {
              triggerHaptic("light");
              onPrev();
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Orqaga
          </Button>
          <Button
            variant="emerald"
            className="flex-1 font-bold shadow-lg shadow-emerald-500/25"
            onClick={() => {
              triggerHaptic("success");
              onFinish();
            }}
          >
            <Calculator className="mr-2 h-4 w-4" />
            Hisobotni ko‘rish
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return null;
};

