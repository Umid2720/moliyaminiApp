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

// Render Questions
function renderStep() {
  const container = document.getElementById("step-content");
  const progressWrapper = document.getElementById("progress-wrapper");
  const stepLabel = document.getElementById("step-label");
  const stepPercent = document.getElementById("step-percent");
  const progressFill = document.getElementById("progress-fill");
  const sectionIndicator = document.getElementById("section-indicator");
  const statusBadge = document.getElementById("status-badge");

  // Step 0: Welcome / Savol 1
  // If we are at the interstitial screen (between question 4 and 5)
  if (state.isTransitionScreen) {
    progressWrapper.style.display = "flex";
    stepLabel.innerHTML = `Oraliq bosqich`;
    stepPercent.innerHTML = `45%`;
    progressFill.style.width = `45%`;
    sectionIndicator.innerHTML = `💡 Infratuzilma baholandi → Moliyaviy qismga o'tish`;

    container.innerHTML = `
      <div class="interstitial-screen">
        <div class="interstitial-icon-ring">🎯</div>
        <h2 class="interstitial-title">Tushunarli! Biznes holati qayd etildi.</h2>
        <p class="interstitial-desc">
          Biznes tizimi va sotuv infratuzilmangiz dastlabki tahlildan o'tkazildi. Endi moliyaviy maqsadlar va reklama byudjetini hisoblaymiz. 👇
        </p>

        <div class="interstitial-points">
          <div class="interstitial-point">
            <span>✅</span>
            <span>Tizim xavf darajasi hisobga olinadi</span>
          </div>
          <div class="interstitial-point">
            <span>📈</span>
            <span>Talab qilinadigan lidlar aniq hisoblanadi</span>
          </div>
          <div class="interstitial-point">
            <span>💰</span>
            <span>Platformangiz bo'yicha real byudjet chiqadi</span>
          </div>
        </div>

        <div class="nav-actions" style="width: 100%; margin-top: 10px;">
          <button class="btn btn-secondary" onclick="goBackFromInterstitial()">← Orqaga</button>
          <button class="btn btn-primary" onclick="continueToFinance()">Moliyaviy maqsadlarga o'tish →</button>
        </div>
      </div>
    `;
    return;
  }

  // Quiz Steps (1 to 9)
  if (state.currentStep >= 1 && state.currentStep <= 9) {
    progressWrapper.style.display = "flex";
    const percent = Math.round((state.currentStep / 9) * 100);
    stepLabel.innerHTML = `${state.currentStep}-savol / 9`;
    stepPercent.innerHTML = `${percent}%`;
    progressFill.style.width = `${percent}%`;

    if (state.currentStep <= 4) {
      sectionIndicator.innerHTML = `1-qism: Biznes holati va infratuzilma`;
      statusBadge.innerHTML = `Infratuzilma auditi`;
    } else {
      sectionIndicator.innerHTML = `2-qism: Moliyaviy va Marketing maqsadlari`;
      statusBadge.innerHTML = `Moliyaviy hisob-kitob`;
    }
  } else if (state.currentStep === 10) {
    // Result screen
    progressWrapper.style.display = "none";
    statusBadge.innerHTML = `Audit yakunlandi`;
    renderAuditResult();
    return;
  }

  // Step 1: Siz biznes egasimisiz?
  if (state.currentStep === 1) {
    container.innerHTML = `
      <div class="step-container">
        <div class="step-header">
          <span class="step-badge">1-savol</span>
          <h2 class="step-title">Siz biznes egasimisiz?</h2>
          <p class="step-desc">Biznesdagi rolingiz auditi to'g'ri shakllantirishga yordam beradi.</p>
        </div>

        <div class="options-list">
          <div class="option-item ${state.answers.isOwner.includes("ta'sischi") ? "selected" : ""}" onclick="selectAnswer('isOwner', 'Ha, ta\\'sischi / biznes egasiman')">
            <div class="option-icon">👑</div>
            <div class="option-content">
              <span class="option-title">Ha, ta'sischi / biznes egasiman</span>
              <span class="option-subtitle">Asosiy qarorlarni o'zim qabul qilaman</span>
            </div>
            <div class="radio-circle"><span class="radio-dot"></span></div>
          </div>

          <div class="option-item ${state.answers.isOwner.includes("Boshqaruvchi") ? "selected" : ""}" onclick="selectAnswer('isOwner', 'Boshqaruvchi / CEO / Bosh direktor')">
            <div class="option-icon">👔</div>
            <div class="option-content">
              <span class="option-title">Boshqaruvchi / CEO / Direktor</span>
              <span class="option-subtitle">Kompaniya operatsion faoliyatini boshqaraman</span>
            </div>
            <div class="radio-circle"><span class="radio-dot"></span></div>
          </div>

          <div class="option-item ${state.answers.isOwner.includes("boshlayapman") ? "selected" : ""}" onclick="selectAnswer('isOwner', 'Startap / Endi biznes boshlayapman')">
            <div class="option-icon">🚀</div>
            <div class="option-content">
              <span class="option-title">Endi biznes boshlayapman</span>
              <span class="option-subtitle">Startap bosqichida yoki yangi yo'nalish</span>
            </div>
            <div class="radio-circle"><span class="radio-dot"></span></div>
          </div>
        </div>

        <div class="nav-actions">
          <button class="btn btn-primary" onclick="nextStep()">Keyingisi →</button>
        </div>
      </div>
    `;
    return;
  }

  // Step 2: CRM tizimi bormi?
  if (state.currentStep === 2) {
    container.innerHTML = `
      <div class="step-container">
        <div class="step-header">
          <span class="step-badge">2-savol</span>
          <h2 class="step-title">Sizda CRM tizimi mavjudmi?</h2>
          <p class="step-desc">CRM tizimi lidlar yo'qolishining oldini oladi va reklama samaradorligini oshiradi.</p>
        </div>

        <div class="options-list">
          <div class="option-item ${state.answers.hasCrm === "ha" ? "selected" : ""}" onclick="selectAnswer('hasCrm', 'ha')">
            <div class="option-icon">⚡</div>
            <div class="option-content">
              <span class="option-title">Ha, CRM tizimi bor</span>
              <span class="option-subtitle">AmoCRM, Bitrix24 yoki maxsus tizim o'rnatilgan (0% yo'qotish)</span>
            </div>
            <div class="radio-circle"><span class="radio-dot"></span></div>
          </div>

          <div class="option-item ${state.answers.hasCrm === "excel" ? "selected" : ""}" onclick="selectAnswer('hasCrm', 'excel')">
            <div class="option-icon">📋</div>
            <div class="option-content">
              <span class="option-title">Excel yoki Google Sheets da yuritiladi</span>
              <span class="option-subtitle">Qisman nazorat mavjud (+10% yo'qotish xavfi)</span>
            </div>
            <div class="radio-circle"><span class="radio-dot"></span></div>
          </div>

          <div class="option-item ${state.answers.hasCrm === "yoq" ? "selected" : ""}" onclick="selectAnswer('hasCrm', 'yoq')">
            <div class="option-icon">❌</div>
            <div class="option-content">
              <span class="option-title">Yo'q, CRM mavjud emas</span>
              <span class="option-subtitle">Mijozlar Telegram chat yoki daftarda (+20% jarima)</span>
            </div>
            <div class="radio-circle"><span class="radio-dot"></span></div>
          </div>
        </div>

        <div class="nav-actions">
          <button class="btn btn-secondary" onclick="prevStep()">← Orqaga</button>
          <button class="btn btn-primary" onclick="nextStep()">Keyingisi →</button>
        </div>
      </div>
    `;
    return;
  }

  // Step 3: Alohida sotuv bo'limi bormi?
  if (state.currentStep === 3) {
    container.innerHTML = `
      <div class="step-container">
        <div class="step-header">
          <span class="step-badge">3-savol</span>
          <h2 class="step-title">Alohida sotuv bo'limi (Menejerlar) bormi?</h2>
          <p class="step-desc">Menejerlar mavjudligi kiruvchi lidlarga tezkor javob berishni ta'minlaydi.</p>
        </div>

        <div class="options-list">
          <div class="option-item ${state.answers.salesTeam === "ha" ? "selected" : ""}" onclick="selectAnswer('salesTeam', 'ha')">
            <div class="option-icon">👥</div>
            <div class="option-content">
              <span class="option-title">Ha, professional sotuv bo'limi bor</span>
              <span class="option-subtitle">Alohida menejerlar faqat sotuv bilan shug'ullanadi (0% jarima)</span>
            </div>
            <div class="radio-circle"><span class="radio-dot"></span></div>
          </div>

          <div class="option-item ${state.answers.salesTeam === "operator" ? "selected" : ""}" onclick="selectAnswer('salesTeam', 'operator')">
            <div class="option-icon">🤝</div>
            <div class="option-content">
              <span class="option-title">Operator / Administrator sotadi</span>
              <span class="option-subtitle">Boshqa ishlar bilan birga qo'ng'iroqlarga javob beradi (+10%)</span>
            </div>
            <div class="radio-circle"><span class="radio-dot"></span></div>
          </div>

          <div class="option-item ${state.answers.salesTeam === "ozim" ? "selected" : ""}" onclick="selectAnswer('salesTeam', 'ozim')">
            <div class="option-icon">🧑‍💻</div>
            <div class="option-content">
              <span class="option-title">Yo'q, barchasini o'zim sotaman</span>
              <span class="option-subtitle">Vaqt yetishmasligi tufayli lidlar kuyib ketadi (+20% jarima)</span>
            </div>
            <div class="radio-circle"><span class="radio-dot"></span></div>
          </div>
        </div>

        <div class="nav-actions">
          <button class="btn btn-secondary" onclick="prevStep()">← Orqaga</button>
          <button class="btn btn-primary" onclick="nextStep()">Keyingisi →</button>
        </div>
      </div>
    `;
    return;
  }

  // Step 4: Ijtimoiy tarmoqlar (Upakovka)
  if (state.currentStep === 4) {
    container.innerHTML = `
      <div class="step-container">
        <div class="step-header">
          <span class="step-badge">4-savol</span>
          <h2 class="step-title">Ijtimoiy tarmoqlaringiz holati? (Upakovka)</h2>
          <p class="step-desc">Profilning ishonchli va chiroyli ko'rinishi reklama konversiyasini oshiradi.</p>
        </div>

        <div class="options-list">
          <div class="option-item ${state.answers.packaging === "zor" ? "selected" : ""}" onclick="selectAnswer('packaging', 'zor')">
            <div class="option-icon">🌟</div>
            <div class="option-content">
              <span class="option-title">Zo'r holatda</span>
              <span class="option-subtitle">Sifatli vizual, faol Reels/Stories, isbotlar va mijoz sharhlari</span>
            </div>
            <div class="radio-circle"><span class="radio-dot"></span></div>
          </div>

          <div class="option-item ${state.answers.packaging === "ortacha" ? "selected" : ""}" onclick="selectAnswer('packaging', 'ortacha')">
            <div class="option-icon">⚖️</div>
            <div class="option-content">
              <span class="option-title">O'rtacha holatda</span>
              <span class="option-subtitle">Postlar vaqti-vaqti bilan chiqadi, lekin yagona uslub yo'q (+5%)</span>
            </div>
            <div class="radio-circle"><span class="radio-dot"></span></div>
          </div>

          <div class="option-item ${state.answers.packaging === "yomon" ? "selected" : ""}" onclick="selectAnswer('packaging', 'yomon')">
            <div class="option-icon">❌</div>
            <div class="option-content">
              <span class="option-title">Yomon yoki umuman yuritilmaydi</span>
              <span class="option-subtitle">Eski postlar, tashlandiq sahifa yoki sifatsiz kontent (+15%)</span>
            </div>
            <div class="radio-circle"><span class="radio-dot"></span></div>
          </div>
        </div>

        <div class="nav-actions">
          <button class="btn btn-secondary" onclick="prevStep()">← Orqaga</button>
          <button class="btn btn-primary" onclick="proceedFromStep4()">Moliyaviy qismga o'tish →</button>
        </div>
      </div>
    `;
    return;
  }

  // Step 5: Biznesingiz qaysi sohada?
  if (state.currentStep === 5) {
    container.innerHTML = `
      <div class="step-container">
        <div class="step-header">
          <span class="step-badge">5-savol</span>
          <h2 class="step-title">Biznesingiz qaysi sohada?</h2>
          <p class="step-desc">Soha bo'yicha lidlar narxi (benchmark) va chek ko'rsatkichlari farqlanadi.</p>
        </div>

        <div class="options-grid">
          ${INDUSTRIES.map(item => `
            <div class="grid-option ${state.answers.industry === item.id ? "selected" : ""}" onclick="selectAnswer('industry', '${item.id}')">
              <div class="option-icon">${item.icon}</div>
              <div class="option-title">${item.title}</div>
              <span class="option-badge">${item.subtitle}</span>
            </div>
          `).join("")}
        </div>

        <div class="nav-actions">
          <button class="btn btn-secondary" onclick="prevStep()">← Orqaga</button>
          <button class="btn btn-primary" onclick="nextStep()">Keyingisi →</button>
        </div>
      </div>
    `;
    return;
  }

  // Step 6: Asosiy reklama platformangiz?
  if (state.currentStep === 6) {
    const platforms = [
      { id: "Instagram", name: "Instagram & Facebook", cpl: "$0.8 - $1.5", icon: "📸" },
      { id: "Telegram", name: "Telegram Ads & Kanallar", cpl: "$0.6 - $1.2", icon: "✈️" },
      { id: "Google", name: "Google & YouTube", cpl: "$1.2 - $2.4", icon: "🔍" },
      { id: "TikTok", name: "TikTok Ads", cpl: "$0.5 - $1.1", icon: "🎵" }
    ];

    container.innerHTML = `
      <div class="step-container">
        <div class="step-header">
          <span class="step-badge">6-savol</span>
          <h2 class="step-title">Asosiy reklama platformangiz?</h2>
          <p class="step-desc">Byudjet hisobi ushbu platformadagi o'rtacha lid narxi (CPL benchmark) asosida belgilanadi.</p>
        </div>

        <div class="options-list">
          ${platforms.map(p => `
            <div class="option-item ${state.answers.platform === p.id ? "selected" : ""}" onclick="selectAnswer('platform', '${p.id}')">
              <div class="option-icon">${p.icon}</div>
              <div class="option-content">
                <span class="option-title">${p.name}</span>
                <span class="option-subtitle">Lid narxi benchmarki: <strong>${p.cpl}</strong></span>
              </div>
              <div class="radio-circle"><span class="radio-dot"></span></div>
            </div>
          `).join("")}
        </div>

        <div class="nav-actions">
          <button class="btn btn-secondary" onclick="prevStep()">← Orqaga</button>
          <button class="btn btn-primary" onclick="nextStep()">Keyingisi →</button>
        </div>
      </div>
    `;
    return;
  }

  // Step 7: Oylik DAROMAD maqsadingiz? ($ da, masalan 10000)
  if (state.currentStep === 7) {
    const presets = [3000, 5000, 10000, 20000, 50000, 100000];
    container.innerHTML = `
      <div class="step-container">
        <div class="step-header">
          <span class="step-badge">7-savol</span>
          <h2 class="step-title">Oylik DAROMAD maqsadingiz? ($ da)</h2>
          <p class="step-desc">Oyiga qancha umumiy tushum / daromad qilishni maqsad qilgansiz?</p>
        </div>

        <div class="input-display-card">
          <div class="input-display-label">Oylik daromad maqsadi</div>
          <div class="input-display-value-wrap">
            <span class="currency-symbol">$</span>
            <input type="number" id="revenue-input" class="input-large-text" value="${state.answers.targetRevenue}" oninput="handleRevenueInput(this.value)" min="500" max="500000" step="500">
          </div>

          <div class="input-slider-wrap">
            <input type="range" class="custom-slider" id="revenue-slider" min="1000" max="50000" step="500" value="${state.answers.targetRevenue}" oninput="handleRevenueSlider(this.value)">
          </div>
        </div>

        <div class="chips-row">
          ${presets.map(val => `
            <button class="chip-btn ${state.answers.targetRevenue === val ? "active" : ""}" onclick="setRevenuePreset(${val})">$${val.toLocaleString()}</button>
          `).join("")}
        </div>

        <div class="nav-actions">
          <button class="btn btn-secondary" onclick="prevStep()">← Orqaga</button>
          <button class="btn btn-primary" onclick="nextStep()">Keyingisi →</button>
        </div>
      </div>
    `;
    return;
  }

  // Step 8: O'rtacha chek qancha? ($ da)
  if (state.currentStep === 8) {
    const presets = [20, 40, 60, 100, 250, 500];
    const calc = calculateAudit(state.answers);

    container.innerHTML = `
      <div class="step-container">
        <div class="step-header">
          <span class="step-badge">8-savol</span>
          <h2 class="step-title">O'rtacha chek qancha? ($ da)</h2>
          <p class="step-desc">Bitta mijoz sizga o'rtacha qancha pul to'laydi?</p>
        </div>

        <div class="input-display-card">
          <div class="input-display-label">Bitta buyurtma o'rtacha narxi</div>
          <div class="input-display-value-wrap">
            <span class="currency-symbol">$</span>
            <input type="number" id="check-input" class="input-large-text" value="${state.answers.averageCheck}" oninput="handleCheckInput(this.value)" min="5" max="10000" step="5">
          </div>

          <div class="input-slider-wrap">
            <input type="range" class="custom-slider" id="check-slider" min="10" max="500" step="5" value="${state.answers.averageCheck}" oninput="handleCheckSlider(this.value)">
          </div>
        </div>

        <div class="chips-row">
          ${presets.map(val => `
            <button class="chip-btn ${state.answers.averageCheck === val ? "active" : ""}" onclick="setCheckPreset(${val})">$${val}</button>
          `).join("")}
        </div>

        <div class="live-funnel-hint">
          <div class="hint-stat">
            <span class="hint-val">${calc.neededCustomers} ta</span>
            <span class="hint-desc">Mijoz kerak bo'ladi</span>
          </div>
          <div style="color: var(--text-dim);">•</div>
          <div class="hint-stat">
            <span class="hint-val">$${(calc.targetRevenue).toLocaleString()}</span>
            <span class="hint-desc">Umumiy maqsad</span>
          </div>
        </div>

        <div class="nav-actions">
          <button class="btn btn-secondary" onclick="prevStep()">← Orqaga</button>
          <button class="btn btn-primary" onclick="nextStep()">Keyingisi →</button>
        </div>
      </div>
    `;
    return;
  }

  // Step 9: Sotuv konversiyasi necha foiz?
  if (state.currentStep === 9) {
    const presets = [
      { rate: 10, label: "10% (Boshlang'ich)" },
      { rate: 20, label: "20% (O'rtacha)" },
      { rate: 30, label: "30% (Yaxshi)" },
      { rate: 40, label: "40% (Top daraja)" }
    ];
    const calc = calculateAudit(state.answers);

    container.innerHTML = `
      <div class="step-container">
        <div class="step-header">
          <span class="step-badge">9-savol (Yakuniy)</span>
          <h2 class="step-title">Sotuv konversiyasi necha foiz?</h2>
          <p class="step-desc">100 ta murojaatdan (lid) o'rtacha nechtasi to'lov qiladi?</p>
        </div>

        <div class="input-display-card">
          <div class="input-display-label">Sotuv konversiyasi</div>
          <div class="input-display-value-wrap">
            <input type="number" id="conv-input" class="input-large-text" value="${state.answers.conversionRate}" oninput="handleConvInput(this.value)" min="1" max="100" step="1">
            <span class="percent-symbol">%</span>
          </div>

          <div class="input-slider-wrap">
            <input type="range" class="custom-slider" id="conv-slider" min="5" max="60" step="1" value="${state.answers.conversionRate}" oninput="handleConvSlider(this.value)">
          </div>
        </div>

        <div class="chips-row">
          ${presets.map(item => `
            <button class="chip-btn ${state.answers.conversionRate === item.rate ? "active" : ""}" onclick="setConvPreset(${item.rate})">${item.label}</button>
          `).join("")}
        </div>

        <div class="live-funnel-hint">
          <div class="hint-stat">
            <span class="hint-val">${calc.neededLeads} ta</span>
            <span class="hint-desc">Kerakli lidlar</span>
          </div>
          <div style="color: var(--text-dim);">→</div>
          <div class="hint-stat">
            <span class="hint-val">${calc.neededCustomers} ta</span>
            <span class="hint-desc">Xarid qiluvchi mijoz</span>
          </div>
        </div>

        <div class="nav-actions">
          <button class="btn btn-secondary" onclick="prevStep()">← Orqaga</button>
          <button class="btn btn-emerald" onclick="finishAudit()">📊 Hisobotni ko'rish</button>
        </div>
      </div>
    `;
    return;
  }
}

// -------------------------------------------------------------
// AUDIT REPORT RENDERING (Exact Match with user specifications)
// -------------------------------------------------------------
function renderAuditResult() {
  const container = document.getElementById("step-content");
  const calc = calculateAudit(state.answers);

  triggerHaptic("success");

  container.innerHTML = `
    <div class="report-container">
      <!-- Report Header -->
      <div class="report-hero">
        <span class="report-badge">📊 Marketing & Budjet Auditi</span>
        <h1 class="report-main-title">Biznes Auditi Xulosasi</h1>
        <p class="report-subtitle">Sizning biznesingiz va maqsadlaringiz asosidagi hisob-kitob</p>
      </div>

      <!-- Risk Meter Card -->
      <div class="risk-card risk-${calc.riskLevel}">
        <div class="risk-info">
          <span class="risk-tag">⚠️ Tizim Xavf Darajasi:</span>
          <span class="risk-level-name">
            ${calc.riskLevel === "high" ? "🔴 Yuqori xavf" : (calc.riskLevel === "medium" ? "🟡 O'rtacha xavf" : "🟢 Past / Xavfsiz")}
          </span>
        </div>
        <div class="risk-score-badge">
          <div class="risk-score-num">${calc.riskScore}%</div>
          <div class="risk-score-sub">Samaradorlik</div>
        </div>
      </div>

      <!-- Card 1: Biznes Holati -->
      <div class="audit-card">
        <div class="audit-card-header">
          <span style="font-size: 18px;">🏥</span>
          <h3 class="audit-card-title">Biznes holati</h3>
        </div>

        <div class="metric-row">
          <span class="metric-label">📂 CRM tizimi:</span>
          <span class="metric-val ${state.answers.hasCrm === "ha" ? "highlight-green" : "highlight-rose"}">${calc.crmDisplay}</span>
        </div>

        <div class="metric-row">
          <span class="metric-label">👥 Sotuv bo‘limi:</span>
          <span class="metric-val ${state.answers.salesTeam === "ha" ? "highlight-green" : "highlight-rose"}">${calc.salesDisplay}</span>
        </div>

        <div class="metric-row">
          <span class="metric-label">📱 Ijtimoiy tarmoq (Upakovka):</span>
          <span class="metric-val ${state.answers.packaging === "zor" ? "highlight-green" : ""}">${calc.packDisplay}</span>
        </div>
      </div>

      <!-- Card 2: Moliyaviy Maqsad -->
      <div class="audit-card">
        <div class="audit-card-header">
          <span style="font-size: 18px;">🎯</span>
          <h3 class="audit-card-title">Moliyaviy maqsad</h3>
        </div>

        <div class="metric-row">
          <span class="metric-label">Oylik daromad maqsadi:</span>
          <span class="metric-val highlight-green">$${calc.targetRevenue.toLocaleString()}</span>
        </div>

        <div class="metric-row">
          <span class="metric-label">O‘rtacha chek:</span>
          <span class="metric-val">$${calc.averageCheck}</span>
        </div>

        <div class="metric-row">
          <span class="metric-label">Kerakli mijozlar soni:</span>
          <span class="metric-val highlight-blue"><strong>${calc.neededCustomers} ta</strong></span>
        </div>
      </div>

      <!-- Card 3: Funnel hisob-kitobi -->
      <div class="audit-card">
        <div class="audit-card-header">
          <span style="font-size: 18px;">📈</span>
          <h3 class="audit-card-title">Funnel (Voronka) hisob-kitobi</h3>
        </div>

        <div class="funnel-visual">
          <div class="funnel-step">
            <div class="funnel-bar-container">
              <div class="funnel-bar-fill fill-leads" style="width: 100%;"></div>
              <div class="funnel-bar-text">
                <span>Kiruvchi lidlar</span>
                <span>${calc.neededLeads} ta</span>
              </div>
            </div>
          </div>

          <div class="funnel-step">
            <div class="funnel-bar-container">
              <div class="funnel-bar-fill fill-conv" style="width: ${calc.conversionRate}%;"></div>
              <div class="funnel-bar-text">
                <span>Sotuv konversiyasi</span>
                <span>${calc.conversionRate}%</span>
              </div>
            </div>
          </div>

          <div class="funnel-step">
            <div class="funnel-bar-container">
              <div class="funnel-bar-fill fill-clients" style="width: ${(calc.neededCustomers / calc.neededLeads * 100).toFixed(0)}%;"></div>
              <div class="funnel-bar-text">
                <span>Yakuniy mijozlar</span>
                <span>${calc.neededCustomers} ta</span>
              </div>
            </div>
          </div>
        </div>

        <div class="metric-row" style="margin-top: 4px;">
          <span class="metric-label">Sotuv konversiyasi:</span>
          <span class="metric-val">${calc.conversionRate}%</span>
        </div>

        <div class="metric-row">
          <span class="metric-label">Kerakli lidlar:</span>
          <span class="metric-val highlight-blue"><strong>${calc.neededLeads} ta</strong></span>
        </div>

        <div class="funnel-formula-box">
          📐 Formula: $${calc.targetRevenue} / $${calc.averageCheck} / ${calc.conversionRate}% = ${calc.neededLeads} ta lid
        </div>
      </div>

      <!-- Card 4: Reklama Byudjeti -->
      <div class="audit-card">
        <div class="audit-card-header">
          <span style="font-size: 18px;">💰</span>
          <h3 class="audit-card-title">Reklama byudjeti</h3>
        </div>

        <div class="metric-row">
          <span class="metric-label">Asosiy platforma:</span>
          <span class="metric-val">${calc.bench.name}</span>
        </div>

        <div class="metric-row">
          <span class="metric-label">Lid narxi (Benchmark):</span>
          <span class="metric-val">$${calc.minCpl} - $${calc.maxCpl}</span>
        </div>

        <div class="budget-hero-box">
          <div class="budget-hero-col">
            <span class="budget-hero-label">Minimal byudjet</span>
            <span class="budget-hero-amount">$${calc.minBudget.toLocaleString()}</span>
            <span class="budget-hero-sub">~$${Math.round(calc.minBudget / 30)} / kun</span>
          </div>
          <div class="budget-hero-col">
            <span class="budget-hero-label">Optimal byudjet</span>
            <span class="budget-hero-amount optimal">$${calc.maxBudget.toLocaleString()}</span>
            <span class="budget-hero-sub">~$${Math.round(calc.maxBudget / 30)} / kun</span>
          </div>
        </div>
      </div>

      <!-- Card 5: Muhim ogohlantirishlar (Samaradorlik jarimasi) -->
      ${calc.totalPenaltyPercent > 0 ? `
        <div class="penalty-card">
          <div class="audit-card-header" style="border-bottom-color: rgba(239,68,68,0.2);">
            <span style="font-size: 18px;">⚠️</span>
            <h3 class="audit-card-title" style="color: #fca5a5;">Muhim ogohlantirishlar (Samaradorlik jarimasi):</h3>
          </div>

          ${state.answers.hasCrm === "yoq" ? `
            <div class="penalty-item">
              <span>❌</span>
              <div><strong>CRM yo'qligi sababli yo'qotishlar (+20%)</strong> — mijozlar esdan chiqadi yoki kech javob beriladi.</div>
            </div>
          ` : (state.answers.hasCrm === "excel" ? `
            <div class="penalty-item">
              <span>⚠️</span>
              <div><strong>Excelda yuritish xavfi (+10%)</strong> — qo'lda boshqaruv xatolari.</div>
            </div>
          ` : "")}

          ${state.answers.salesTeam === "ozim" ? `
            <div class="penalty-item">
              <span>❌</span>
              <div><strong>Sotuvchilar yo'qligi sababli past konversiya (+20%)</strong> — o'zingiz ulgurmaysiz.</div>
            </div>
          ` : (state.answers.salesTeam === "operator" ? `
            <div class="penalty-item">
              <span>⚠️</span>
              <div><strong>Professional sotuvchi yo'qligi (+10%)</strong> — faqat administrator javob bermoqda.</div>
            </div>
          ` : "")}

          ${state.answers.packaging === "yomon" ? `
            <div class="penalty-item">
              <span>❌</span>
              <div><strong>Upakovka yomonligi (+15%)</strong> — sahifa ishonch uyg'otmaydi, lidlar qimmatlashadi.</div>
            </div>
          ` : ""}

          <div class="penalty-callout">
            Sizda tizim to'liq bo'lmagani uchun real byudjet <strong>+${calc.totalPenaltyPercent}% ga qimmatroq</strong> tushishi mumkin (Ortiqcha sarf: ~$${calc.potentialSavings}).
          </div>
        </div>
      ` : `
        <div class="audit-card" style="border-color: rgba(16,185,129,0.3); background: rgba(16,185,129,0.06);">
          <div class="audit-card-header">
            <span style="font-size: 18px;">🎉</span>
            <h3 class="audit-card-title" style="color: var(--accent-emerald);">Ajoyib tizim! Jarimalar yo'q (0%)</h3>
          </div>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.45;">
            Sizda CRM hamda sotuv bo'limi mavjud bo'lgani sababli reklama byudjetingiz maksimal darajada tejamkor ishlaydi!
          </p>
        </div>
      `}

      <!-- Card 6: Tavsiyalar -->
      <div class="audit-card">
        <div class="audit-card-header">
          <span style="font-size: 18px;">✅</span>
          <h3 class="audit-card-title">Tavsiyalar</h3>
        </div>

        <div class="recommendations-list">
          <div class="rec-item">
            <span class="rec-badge">1</span>
            <div>
              <strong>CRM tizimi (AmoCRM / Bitrix24) o'rnating</strong> — bu byudjetni 20% tejaydi va har bir lidni nazoratda ushlaydi.
            </div>
          </div>

          <div class="rec-item">
            <span class="rec-badge">2</span>
            <div>
              <strong>Lidlar kuyib ketmasligi uchun alohida sotuv menejeri yollang</strong> — bu konversiyani 2 barobargacha oshiradi.
            </div>
          </div>

          <div class="rec-item">
            <span class="rec-badge">3</span>
            <div>
              <strong>Reklamani kichik summa (Test) bilan boshlang</strong> — dastlab $100-$150 sinov byudjeti bilan real CPL ni aniqlab oling.
            </div>
          </div>

          <div class="rec-item">
            <span class="rec-badge">4</span>
            <div>
              <strong>Ijtimoiy tarmoq vizualini yangilang</strong> — profilingizga mijozlar ishonadigan keyslar va sharhlar joylang.
            </div>
          </div>
        </div>
      </div>

      <!-- Card 7: Interactive What-If Simulator -->
      <div class="simulator-box">
        <div class="sim-header">
          <span class="sim-title">⚡ Jonli Simulyator: "Tizim qilsak nima bo'ladi?"</span>
        </div>
        <p style="font-size: 12px; color: var(--text-muted); line-height: 1.4;">
          Quyidagi tugmalarni yoqib ko'ring — CRM va sotuvchini ishga tushirsangiz byudjet qanchaga qisqarishini jonli hisoblang:
        </p>

        <div class="sim-toggles">
          <div class="sim-toggle-row">
            <span>CRM tizimini o'rnatish (-20%)</span>
            <label class="switch">
              <input type="checkbox" id="sim-crm" ${state.answers.hasCrm === "ha" ? "checked" : ""} onchange="toggleSimCrm(this.checked)">
              <span class="slider-round"></span>
            </label>
          </div>

          <div class="sim-toggle-row">
            <span>Sotuv menejerini yollash (-20%)</span>
            <label class="switch">
              <input type="checkbox" id="sim-sales" ${state.answers.salesTeam === "ha" ? "checked" : ""} onchange="toggleSimSales(this.checked)">
              <span class="slider-round"></span>
            </label>
          </div>
        </div>

        <div class="sim-savings-display" id="sim-savings-info">
          <span>Tejaladigan mablag':</span>
          <span id="sim-savings-sum">$${calc.potentialSavings.toLocaleString()} / oyiga</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="report-actions">
        <button class="btn btn-emerald" onclick="shareToTelegram()">
          <span>📤</span>
          <span>Hisobotni Telegramda yuborish</span>
        </button>

        <button class="btn btn-secondary" onclick="copyReportText()">
          <span>📋</span>
          <span>Hisobot matnini nusxalash</span>
        </button>

        <button class="btn btn-secondary" onclick="restartAudit()">
          <span>🔄</span>
          <span>Qayta hisoblash</span>
        </button>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// USER INTERACTION HANDLERS
// -------------------------------------------------------------
function selectAnswer(key, value) {
  triggerHaptic("light");
  state.answers[key] = value;
  renderStep();
}

function nextStep() {
  triggerHaptic("medium");
  if (state.currentStep < 9) {
    state.currentStep++;
    renderStep();
  }
}

function prevStep() {
  triggerHaptic("light");
  if (state.currentStep > 1) {
    state.currentStep--;
    renderStep();
  }
}

function proceedFromStep4() {
  triggerHaptic("medium");
  state.isTransitionScreen = true;
  renderStep();
}

function goBackFromInterstitial() {
  triggerHaptic("light");
  state.isTransitionScreen = false;
  state.currentStep = 4;
  renderStep();
}

function continueToFinance() {
  triggerHaptic("medium");
  state.isTransitionScreen = false;
  state.currentStep = 5;
  renderStep();
}

function finishAudit() {
  triggerHaptic("success");
  state.currentStep = 10;
  renderStep();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function restartAudit() {
  triggerHaptic("light");
  state.currentStep = 1;
  state.isTransitionScreen = false;
  renderStep();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Revenue handlers
function handleRevenueInput(val) {
  const num = parseInt(val) || 1000;
  state.answers.targetRevenue = num;
  const slider = document.getElementById("revenue-slider");
  if (slider) slider.value = Math.min(num, 50000);
}

function handleRevenueSlider(val) {
  const num = parseInt(val);
  state.answers.targetRevenue = num;
  const inp = document.getElementById("revenue-input");
  if (inp) inp.value = num;
}

function setRevenuePreset(val) {
  triggerHaptic("light");
  state.answers.targetRevenue = val;
  renderStep();
}

// Average Check handlers
function handleCheckInput(val) {
  const num = parseInt(val) || 10;
  state.answers.averageCheck = num;
  const slider = document.getElementById("check-slider");
  if (slider) slider.value = Math.min(num, 500);
  updateLiveFunnelStep8();
}

function handleCheckSlider(val) {
  const num = parseInt(val);
  state.answers.averageCheck = num;
  const inp = document.getElementById("check-input");
  if (inp) inp.value = num;
  updateLiveFunnelStep8();
}

function setCheckPreset(val) {
  triggerHaptic("light");
  state.answers.averageCheck = val;
  renderStep();
}

function updateLiveFunnelStep8() {
  const calc = calculateAudit(state.answers);
  const hintVal = document.querySelector(".live-funnel-hint .hint-val");
  if (hintVal) hintVal.innerText = `${calc.neededCustomers} ta`;
}

// Conversion Rate handlers
function handleConvInput(val) {
  let num = parseInt(val) || 10;
  if (num < 1) num = 1;
  if (num > 100) num = 100;
  state.answers.conversionRate = num;
  const slider = document.getElementById("conv-slider");
  if (slider) slider.value = Math.min(num, 60);
  updateLiveFunnelStep9();
}

function handleConvSlider(val) {
  const num = parseInt(val);
  state.answers.conversionRate = num;
  const inp = document.getElementById("conv-input");
  if (inp) inp.value = num;
  updateLiveFunnelStep9();
}

function setConvPreset(rate) {
  triggerHaptic("light");
  state.answers.conversionRate = rate;
  renderStep();
}

function updateLiveFunnelStep9() {
  const calc = calculateAudit(state.answers);
  const hintVals = document.querySelectorAll(".live-funnel-hint .hint-val");
  if (hintVals && hintVals.length >= 2) {
    hintVals[0].innerText = `${calc.neededLeads} ta`;
    hintVals[1].innerText = `${calc.neededCustomers} ta`;
  }
}

// Simulator Toggles
  toggleSimSales,
  shareToTelegram,
  copyReportText
});

// App Start
window.addEventListener("DOMContentLoaded", () => {
  state.currentStep = 1;
  renderStep();
});
