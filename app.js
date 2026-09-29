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

// Calculation Core Engine
function calculateAudit(answers) {
  const targetRevenue = Number(answers.targetRevenue) || 10000;
  const averageCheck = Number(answers.averageCheck) || 60;
  const conversionRate = Number(answers.conversionRate) || 30;

  // 1. Needed Customers: Target Revenue / Average Check
  const neededCustomers = Math.ceil(targetRevenue / averageCheck);

  // 2. Needed Leads: Needed Customers / (Conversion / 100)
  // Exact user formula: $10000 / $60 / 30% = 166.66 / 0.3 = 555.55 -> ~557
  const neededLeads = Math.ceil(neededCustomers / (conversionRate / 100));

  // 3. Efficiency Penalties
  let crmPenalty = 0;
  if (answers.hasCrm === "yoq") crmPenalty = 0.20;
  else if (answers.hasCrm === "excel") crmPenalty = 0.10;

  let salesPenalty = 0;
  if (answers.salesTeam === "ozim") salesPenalty = 0.20;
  else if (answers.salesTeam === "operator") salesPenalty = 0.10;

  let packagingPenalty = 0;
  if (answers.packaging === "yomon") packagingPenalty = 0.15;
  else if (answers.packaging === "ortacha") packagingPenalty = 0.05;

  const totalPenaltyPercent = Math.round((crmPenalty + salesPenalty + packagingPenalty) * 100);
  const penaltyMultiplier = 1 + (totalPenaltyPercent / 100);

  // 4. Platform Benchmark
  const bench = PLATFORM_BENCHMARKS[answers.platform] || PLATFORM_BENCHMARKS.Instagram;
  const minCpl = bench.minCpl;
  const maxCpl = bench.maxCpl;

  // 5. Budgets (with penalties)
  // Formula: neededLeads * cpl * penaltyMultiplier
  const minBudget = Math.round(neededLeads * minCpl * penaltyMultiplier);
  const maxBudget = Math.round(neededLeads * maxCpl * penaltyMultiplier);

  // Base budgets (without penalties, showing savings)
  const baseMinBudget = Math.round(neededLeads * minCpl);
  const baseMaxBudget = Math.round(neededLeads * maxCpl);
  const potentialSavings = maxBudget - baseMaxBudget;

  // 6. Risk Level
  let riskLevel = "low";
  let riskLabel = "Past (Xavfsiz)";
  let riskScore = 90;

  if (totalPenaltyPercent >= 35) {
    riskLevel = "high";
    riskLabel = "Yuqori";
    riskScore = 45;
  } else if (totalPenaltyPercent >= 15) {
    riskLevel = "medium";
    riskLabel = "O'rtacha";
    riskScore = 70;
  }

  // 7. Human readable business state
  const crmDisplay = answers.hasCrm === "ha" ? "✅ Ha, CRM bor" : (answers.hasCrm === "excel" ? "⚠️ Excel / Sheets" : "❌ Yo'q");
  const salesDisplay = answers.salesTeam === "ha" ? "✅ Ha, jamoa bor" : (answers.salesTeam === "operator" ? "⚠️ Operator sotadi" : "❌ Yo'q, o'zim sotaman");
  const packDisplay = answers.packaging === "zor" ? "✅ Ha, zo'r holatda" : (answers.packaging === "ortacha" ? "⚠️ O'rtacha" : "❌ Yomon / Yo'q");

  return {
    targetRevenue,
    averageCheck,
    neededCustomers,
    conversionRate,
    neededLeads,
    crmPenalty,
    salesPenalty,
    packagingPenalty,
    totalPenaltyPercent,
    penaltyMultiplier,
    minCpl,
    maxCpl,
    minBudget,
    maxBudget,
    baseMinBudget,
    baseMaxBudget,
    potentialSavings,
    riskLevel,
    riskLabel,
    riskScore,
    crmDisplay,
    salesDisplay,
    packDisplay,
    bench
  };
}

