import { Answers, AuditCalculationResult } from "@/types";
import { PLATFORM_BENCHMARKS } from "./constants";

export function calculateAudit(answers: Answers): AuditCalculationResult {
  const targetRevenue = Number(answers.targetRevenue) || 10000;
  const averageCheck = Number(answers.averageCheck) || 60;
  const conversionRate = Number(answers.conversionRate) || 30;

  // 1. Kerakli mijozlar soni: Daromad Maqsadi / O'rtacha Chek
  const neededCustomers = Math.ceil(targetRevenue / averageCheck);

  // 2. Kerakli lidlar: Mijozlar / (Konversiya / 100)
  const neededLeads = Math.ceil(neededCustomers / (conversionRate / 100));

  // 3. Samaradorlik jarimalari
  let crmPenalty = 0;
  if (answers.hasCrm === "yoq") crmPenalty = 0.2;
  else if (answers.hasCrm === "excel") crmPenalty = 0.1;

  let salesPenalty = 0;
  if (answers.salesTeam === "ozim") salesPenalty = 0.2;
  else if (answers.salesTeam === "operator") salesPenalty = 0.1;

  let packagingPenalty = 0;
  if (answers.packaging === "yomon") packagingPenalty = 0.15;
  else if (answers.packaging === "ortacha") packagingPenalty = 0.05;

  const totalPenaltyPercent = Math.round(
    (crmPenalty + salesPenalty + packagingPenalty) * 100
  );
  const penaltyMultiplier = 1 + totalPenaltyPercent / 100;

  // 4. Platforma lid benchmarki
  const bench =
    PLATFORM_BENCHMARKS[answers.platform] || PLATFORM_BENCHMARKS.Instagram;
  const minCpl = bench.minCpl;
  const maxCpl = bench.maxCpl;

  // 5. Byudjetlar (jarimalar bilan)
  const minBudget = Math.round(neededLeads * minCpl * penaltyMultiplier);
  const maxBudget = Math.round(neededLeads * maxCpl * penaltyMultiplier);

  // Jarimasiz asosiy byudjet va tejamkorlik
  const baseMinBudget = Math.round(neededLeads * minCpl);
  const baseMaxBudget = Math.round(neededLeads * maxCpl);
  const potentialSavings = maxBudget - baseMaxBudget;

  // 6. Xavf darajasi
  let riskLevel: "low" | "medium" | "high" = "low";
  let riskLabel = "Past (Xavfsiz)";
  let riskScore = 90;

  if (totalPenaltyPercent >= 35) {
    riskLevel = "high";
    riskLabel = "Yuqori xavf";
    riskScore = 45;
  } else if (totalPenaltyPercent >= 15) {
    riskLevel = "medium";
    riskLabel = "O'rtacha xavf";
    riskScore = 70;
  }

  // 7. Matn ko'rinishida chiqarish
  const crmDisplay =
    answers.hasCrm === "ha"
      ? "✅ Ha, CRM bor"
      : answers.hasCrm === "excel"
      ? "⚠️ Excel / Sheets"
      : "❌ Yo'q";

  const salesDisplay =
    answers.salesTeam === "ha"
      ? "✅ Ha, jamoa bor"
      : answers.salesTeam === "operator"
      ? "⚠️ Operator sotadi"
      : "❌ Yo'q, o'zim sotaman";

  const packDisplay =
    answers.packaging === "zor"
      ? "✅ Ha, zo'r holatda"
      : answers.packaging === "ortacha"
      ? "⚠️ O'rtacha"
      : "❌ Yomon / Yo'q";

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
    bench,
  };
}

export function generateReportSummaryText(
  answers: Answers,
  calc: AuditCalculationResult
): string {
  return `📊 MARKETING & BUDJET AUDITI

🏥 Biznes holati:
• 📂 CRM: ${calc.crmDisplay}
• 👥 Sotuv bo‘limi: ${calc.salesDisplay}
• 📱 Ijtimoiy tarmoq: ${calc.packDisplay}
• ⚠️ Xavf darajasi: ${
    calc.riskLevel === "high"
      ? "🔴 Yuqori"
      : calc.riskLevel === "medium"
      ? "🟡 O'rtacha"
      : "🟢 Past"
  } (${calc.riskScore}% samaradorlik)

🎯 Moliyaviy maqsad:
• Oylik daromad: $${calc.targetRevenue.toLocaleString()}
• O‘rtacha chek: $${calc.averageCheck}
• Kerakli mijozlar soni: ${calc.neededCustomers} ta

📈 Funnel hisob-kitobi:
• Sotuv konversiyasi: ${calc.conversionRate}%
• Kerakli lidlar: ${calc.neededLeads} ta
• Formula: $${calc.targetRevenue} / $${calc.averageCheck} / ${
    calc.conversionRate
  }%

💰 Reklama byudjeti:
• Platforma: ${calc.bench.name}
• Lid narxi: $${calc.minCpl} - $${calc.maxCpl} (Benchmark)
• Minimal byudjet: $${calc.minBudget.toLocaleString()}
• Optimal byudjet: $${calc.maxBudget.toLocaleString()}

${
  calc.totalPenaltyPercent > 0
    ? `⚠️ Muhim ogohlantirishlar (Samaradorlik jarimasi):
${
  answers.hasCrm === "yoq"
    ? "❌ CRM yo'qligi sababli yo'qotishlar (+20%)\n"
    : answers.hasCrm === "excel"
    ? "⚠️ Excel / Sheets orqali boshqaruv (+10%)\n"
    : ""
}${
        answers.salesTeam === "ozim"
          ? "❌ Sotuvchilar yo'qligi sababli past konversiya (+20%)\n"
          : answers.salesTeam === "operator"
          ? "⚠️ Administrator sotuv qiladi (+10%)\n"
          : ""
      }${
        answers.packaging === "yomon"
          ? "❌ Ijtimoiy tarmoq upakovkasi zaif (+15%)\n"
          : ""
      }Tizim to'liq bo'lmagani sababli real byudjet +${
        calc.totalPenaltyPercent
      }% ga ortishi mumkin (Ortiqcha sarf: ~$${calc.potentialSavings}).
`
    : "🎉 Sizda tizimli biznes: jarimalar mavjud emas (0%)\n"
}
✅ Tavsiyalar:
1. CRM tizimi (AmoCRM / Bitrix24) o'rnating — byudjetni 20% gacha tejaydi.
2. Lidlar kuyib ketmasligi uchun alohida sotuv menejeri yollang.
3. Reklamani kichik sinov byudjeti ($100-$150) bilan boshlab, real CPL ni aniqlang.
4. Profil upakovkasi va mijozlar sharhlarini kuchaytiring.`;
}

