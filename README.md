# 📊 Marketing & Budjet Auditi — Telegram Mini App (shadcn/ui Rebuild)

Ushbu loyiha biznes egalari, tadbirkorlar va marketologlar uchun mo'ljallangan zamonaviy **Telegram Mini App & Web Kalkulyator**. U orqali foydalanuvchi o'z biznesining sotuv infratuzilmasini baholaydi va aniq formula asosida reklama byudjetini hisoblab oladi.

Yangi versiya to'liq **React + TypeScript + Tailwind CSS + shadcn/ui** komponentlari asosida zamonaviy dizayn va yuqori tezlikda qaytadan ishlab chiqilgan.

---

## 🌟 Asosiy Imkoniyatlar

1. **9 Bosqichli Interaktiv Savolnoma**:
   - **1-qism: Biznes Infratuzilmasi**: Biznesdagi rol, CRM tizimi mavjudligi, sotuv bo'limi holati, ijtimoiy tarmoqlar (upakovka).
   - **Oraliq o'tish (Checkpoint Card)**: Biznes holati dastlabki xulosasi va keyingi bosqichga tayyorgarlik.
   - **2-qism: Moliyaviy va Marketing Maqsadlar**: Soha tanlovi, reklama platformasi (Instagram, Telegram, Google, TikTok), oylik daromad maqsadi ($), o'rtacha chek ($), sotuv konversiyasi (%).
2. **Matematik Aniq Hisob-kitob (Formula bo'yicha 100% mos)**:
   - **Kerakli mijozlar soni** = `Daromad Maqsadi / O'rtacha Chek` (masalan: `$10,000 / $60 = 167 ta mijoz`).
   - **Kerakli lidlar (Funnel)** = `Mijozlar / Konversiya` (masalan: `167 / 30% = 557 ta lid`).
   - **Samaradorlik jarimasi (Penalty)**:
     - CRM yo'qligi: `+20%` (Excel/Sheets: `+10%`)
     - Sotuvchilar yo'qligi: `+20%` (Operator sotadi: `+10%`)
     - Sifatsiz upakovka: `+15%` (O'rtacha: `+5%`)
   - **Reklama Byudjeti**:
     - Minimal byudjet: `neededLeads * minCpl * jarima`
     - Optimal byudjet: `neededLeads * maxCpl * jarima`
3. **Zamonaviy shadcn/ui Dizayn Tizimi**:
   - shadcn/ui Card, Button, Badge, Progress, Slider, Switch, Alert komponentlari.
   - Dark mode glassmorphism, neon ambient orblar va mobil qurilmalarga 100% moslashuvchan responsiv interfeys.
4. **Interaktiv Jonli Simulyator (What-If Simulator)**:
   - Foydalanuvchi "CRM tizimini qo'shish" yoki "Sotuv menejerini yollash" switch'larini yoqishi bilan uning byudjeti qancha tejalishini jonli ko'rsatadi.
5. **Telegram Integratsiyasi**:
   - `Telegram.WebApp.HapticFeedback` tebranishlari (har bir harakatda sezilarli taktil reaksiya).
   - Natijani Telegram botga yuborish (`sendData`) yoki bitta tugma bilan nusxalash va ulashish (`shareUrl`).
   - Bayramona g'alaba effekti (Canvas Confetti).

---

## 🚀 Loyihani Ishga Tushirish

### 1. Mahalliy muhitda (Local dev)
```bash
# Kutubxonalarni o'rnatish
npm install

# Mahalliy serverni ishga tushirish
npm run dev
```
Brauzerda ochiladi: `http://localhost:5173/`

### 2. Ishlab chiqarish (Production Build)
```bash
npm run build
```
Natija `dist/` papkasida yaratiladi. Buni istalgan xostingga (Vercel, Netlify, Cloudflare Pages, GitHub Pages) bir necha soniyada yuklash mumkin.

---

## 🤖 Telegram Botga Ulash (BotFather orqali)

1. Telegramda `@BotFather` ga kiring.
2. `/newapp` buyrug'ini yuboring.
3. Botingizni tanlang.
4. Mini app nomi va tavsifini kiriting.
5. Saytingiz URL manzilini kiriting (masalan, `https://sizning-domen.vercel.app` yoki test uchun `ngrok http 5173`).
6. Tayyor! Endi foydalanuvchilar botingizdagi WebApp menyusi orqali to'g'ridan-to'g'ri ilovani ochishlari mumkin.

---

## 📁 Loyiha Strukturasi
```
moliyaminiApp/
├── src/
│   ├── components/
│   │   ├── ui/               # shadcn/ui komponentlari (button, card, slider, switch, etc.)
│   │   ├── Header.tsx        # Telegram brand header va status badge
│   │   ├── ProgressHeader.tsx # Step va progress indikatori
│   │   ├── QuizQuestion.tsx  # 9 ta savol, slaydlar va tezkor qiymatlar
│   │   ├── InterstitialStep.tsx # Bosqichlar orasidagi oraliq xulosa
│   │   └── AuditResult.tsx   # To'liq hisobot, voronka, byudjet va What-If simulyator
│   ├── lib/
│   │   ├── calculator.ts     # Matematik audit va byudjet hisob-kitob yadrosi
│   │   ├── constants.ts      # Platforma CPL benchmarklari va sohalar bazasi
│   │   ├── telegram.ts       # Telegram SDK, Haptic va ulashish xizmatlari
│   │   └── utils.ts          # shadcn cn() va formatlash utilitalari
│   ├── types/
│   │   └── index.ts          # TypeScript interfeyslari
│   ├── App.tsx               # Asosiy React komponenti
│   ├── main.tsx              # React DOM render
│   └── index.css             # Tailwind CSS va shadcn/ui o'zgaruvchilari
├── bot_example.py            # Python aiogram orqali Telegram bot namunasi
├── package.json              # Paketlar va skriptlar
├── tailwind.config.js        # Tailwind va shadcn konfiguratsiyasi
├── tsconfig.json             # TypeScript konfiguratsiyasi
├── vite.config.ts            # Vite sozlamalari
└── README.md                 # Hujjatlar
```

---

## 🛠 Texnologiyalar Steki

- **Frontend**: React 19, TypeScript, [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: Tailwind CSS, CSS Variables, Radix UI Primitives, Lucide Icons
- **Tooling & Bundler**: [Vite](https://vitejs.dev/)
- **Effektlar**: Canvas Confetti, CSS Animations
- **Telegram Integratsiyasi**: Telegram WebApp SDK, Python (aiogram 3.x)
