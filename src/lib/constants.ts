import { IndustryItem, PlatformBenchmark } from "@/types";

export const PLATFORM_BENCHMARKS: Record<string, PlatformBenchmark> = {
  Instagram: {
    id: "Instagram",
    name: "Instagram & Facebook",
    minCpl: 0.8,
    maxCpl: 1.5,
    icon: "📸",
  },
  Telegram: {
    id: "Telegram",
    name: "Telegram (Ads & Kanallar)",
    minCpl: 0.6,
    maxCpl: 1.2,
    icon: "✈️",
  },
  Google: {
    id: "Google",
    name: "Google & YouTube Ads",
    minCpl: 1.2,
    maxCpl: 2.4,
    icon: "🔍",
  },
  TikTok: {
    id: "TikTok",
    name: "TikTok Ads",
    minCpl: 0.5,
    maxCpl: 1.1,
    icon: "🎵",
  },
  Multichannel: {
    id: "Multichannel",
    name: "Multi-kanal (Kombinatsiya)",
    minCpl: 0.8,
    maxCpl: 1.6,
    icon: "🎯",
  },
};

export const INDUSTRIES: IndustryItem[] = [
  {
    id: "Xizmat ko'rsatish",
    title: "Xizmat ko'rsatish",
    icon: "🛠️",
    subtitle: "B2B / B2C xizmatlar",
  },
  {
    id: "Savdo / Do'kon",
    title: "Savdo / E-commerce",
    icon: "🛍️",
    subtitle: "Chakana va ulgurji",
  },
  {
    id: "Ishlab chiqarish",
    title: "Ishlab chiqarish",
    icon: "🏭",
    subtitle: "Zavod va sexlar",
  },
  {
    id: "Ta'lim / Kurslar",
    title: "Ta'lim / O'quv markaz",
    icon: "🎓",
    subtitle: "Kurslar va maktablar",
  },
  {
    id: "IT / Startap",
    title: "IT / Startap",
    icon: "💻",
    subtitle: "Dasturlar va texnologiya",
  },
  {
    id: "Go'zallik & Salomatlik",
    title: "Go'zallik & Salomatlik",
    icon: "💅",
    subtitle: "Klinika va salonlar",
  },
  {
    id: "Qurilish & Ko'chmas mulk",
    title: "Qurilish & Moliya",
    icon: "🏢",
    subtitle: "Ko'chmas mulk va remont",
  },
  {
    id: "Boshqa soha",
    title: "Boshqa soha",
    icon: "📦",
    subtitle: "Boshqa faoliyat turlari",
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

