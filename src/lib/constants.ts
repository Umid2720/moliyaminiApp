import { IndustryItem, PlatformBenchmark } from "@/types";

export const PLATFORM_BENCHMARKS: Record<string, PlatformBenchmark> = {
  Instagram: {
    id: "Instagram",
    name: "Instagram & Facebook",
    minCpl: 0.8,
    maxCpl: 1.5,
    icon: "camera",
  },
  Telegram: {
    id: "Telegram",
    name: "Telegram (Ads & Kanallar)",
    minCpl: 0.6,
    maxCpl: 1.2,
    icon: "send",
  },
  Google: {
    id: "Google",
    name: "Google & YouTube Ads",
    minCpl: 1.2,
    maxCpl: 2.4,
    icon: "search",
  },
  TikTok: {
    id: "TikTok",
    name: "TikTok Ads",
    minCpl: 0.5,
    maxCpl: 1.1,
    icon: "music",
  },
  Multichannel: {
    id: "Multichannel",
    name: "Multi-kanal (Kombinatsiya)",
    minCpl: 0.8,
    maxCpl: 1.6,
    icon: "layers",
  },
};

export const INDUSTRIES: IndustryItem[] = [
  {
    id: "Xizmat ko'rsatish",
    title: "Xizmat ko'rsatish",
    icon: "wrench",
    subtitle: "B2B / B2C xizmatlar",
  },
  {
    id: "Savdo / Do'kon",
    title: "Savdo / E-commerce",
    icon: "shopping-bag",
    subtitle: "Chakana va ulgurji savdo",
  },
  {
    id: "Ishlab chiqarish",
    title: "Ishlab chiqarish",
    icon: "factory",
    subtitle: "Zavod va ishlab chiqarish",
  },
  {
    id: "Ta'lim / Kurslar",
    title: "Ta'lim / O'quv markaz",
    icon: "graduation-cap",
    subtitle: "Kurslar va akademiyalar",
  },
  {
    id: "IT / Startap",
    title: "IT / Startap",
    icon: "laptop",
    subtitle: "Dasturiy yechimlar va SaaS",
  },
  {
    id: "Go'zallik & Salomatlik",
    title: "Go'zallik & Tibbiyot",
    icon: "heart-pulse",
    subtitle: "Klinika va salonlar",
  },
  {
    id: "Qurilish & Ko'chmas mulk",
    title: "Qurilish & Moliya",
    icon: "building-2",
    subtitle: "Ko'chmas mulk va remont",
  },
  {
    id: "Boshqa soha",
    title: "Boshqa soha",
    icon: "boxes",
    subtitle: "Nostandart faoliyatlar",
  },
];

export const INITIAL_ANSWERS = {
  isOwner: "Ha, ta'sischi / biznes egasiman",
  hasCrm: "yoq" as const,
  salesTeam: "ozim" as const,
  packaging: "zor" as const,
  industry: "Xizmat ko'rsatish",
  platform: "Instagram",
  targetRevenue: 10000,
  averageCheck: 60,
  conversionRate: 30,
};
