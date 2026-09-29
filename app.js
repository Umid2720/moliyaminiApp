/**
 * Moliya & Marketing Auditi - Telegram Mini App Logic
 * Designed for High-Converting Business Decision Support
 */

// Initialize Telegram WebApp SDK if present
const tg = window.Telegram?.WebApp;
if (tg) {
  try {
    tg.ready();
    tg.expand();
  } catch (e) {
    console.warn("Telegram WebApp initialization error:", e);
  }
}

// Sound / Haptic trigger helper
function triggerHaptic(type = "light") {
  try {
    if (tg?.HapticFeedback) {
      if (type === "success") tg.HapticFeedback.notificationOccurred("success");
      else if (type === "warning") tg.HapticFeedback.notificationOccurred("warning");
      else tg.HapticFeedback.impactOccurred(type);
    } else if (navigator.vibrate) {
      navigator.vibrate(20);
    }
  } catch (e) {
    // ignore
  }
}

// Application State
const state = {
  currentStep: 0, // 0 to 9, plus divider interstitial
  isTransitionScreen: false,
  answers: {
    isOwner: "Ha, ta'sischi / biznes egasiman",
    hasCrm: "yoq", // 'ha' | 'excel' | 'yoq'
    salesTeam: "ozim", // 'ha' | 'ozim' | 'operator'
    packaging: "zor", // 'zor' | 'ortacha' | 'yomon'
    industry: "Xizmat ko'rsatish",
    platform: "Instagram",
    targetRevenue: 10000,
    averageCheck: 60,
    conversionRate: 30
  }
};

// Platform CPL Benchmarks Database
const PLATFORM_BENCHMARKS = {
  Instagram: { name: "Instagram & Facebook", minCpl: 0.8, maxCpl: 1.5, icon: "📸" },
  Telegram: { name: "Telegram (Ads & Kanallar)", minCpl: 0.6, maxCpl: 1.2, icon: "✈️" },
  Google: { name: "Google & YouTube Ads", minCpl: 1.2, maxCpl: 2.4, icon: "🔍" },
  TikTok: { name: "TikTok Ads", minCpl: 0.5, maxCpl: 1.1, icon: "🎵" },
  Multichannel: { name: "Multi-kanal (Kombinatsiya)", minCpl: 0.8, maxCpl: 1.6, icon: "🎯" }
};

// Industry Presets
const INDUSTRIES = [
  { id: "Xizmat ko'rsatish", title: "Xizmat ko'rsatish", icon: "🛠️", subtitle: "B2B / B2C xizmatlar" },
  { id: "Savdo / Do'kon", title: "Savdo / E-commerce", icon: "🛍️", subtitle: "Chakana va ulgurji" },
  { id: "Ishlab chiqarish", title: "Ishlab chiqarish", icon: "🏭", subtitle: "Zavod va sexlar" },
  { id: "Ta'lim / Kurslar", title: "Ta'lim / O'quv markaz", icon: "🎓", subtitle: "Kurslar va maktablar" },
  { id: "IT / Startap", title: "IT / Startap", icon: "💻", subtitle: "Dasturlar va texnologiya" },
  { id: "Go'zallik & Salomatlik", title: "Go'zallik & Salomatlik", icon: "💅", subtitle: "Klinika va salonlar" },
  { id: "Qurilish & Ko'chmas mulk", title: "Qurilish & Moliya", icon: "🏢", subtitle: "Ko'chmas mulk va remonta" },
  { id: "Boshqa soha", title: "Boshqa soha", icon: "📦", subtitle: "Boshqa faoliyat turlari" }
];
