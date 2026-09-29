# 📊 Marketing & Budjet Auditi — Telegram Mini App

Ushbu loyiha biznes egalari, tadbirkorlar va marketologlar uchun mo'ljallangan zamonaviy **Telegram Mini App & Web Kalkulyator**. U orqali foydalanuvchi o'z biznesining sotuv infratuzilmasini baholaydi va aniq formula asosida reklama byudjetini hisoblab oladi.

---

## 🌟 Asosiy Imkoniyatlar

1. **9 Bosqichli Interaktiv Savolnoma**:
   - **1-qism: Biznes Infratuzilmasi**: Biznesdagi rol, CRM tizimi mavjudligi, sotuv bo'limi holati, ijtimoiy tarmoqlar (upakovka).
   - **Oraliq o'tish (Checkpoint)**: Biznes holati xulosasi.
   - **2-qism: Moliyaviy va Marketing Maqsadlar**: Soha tanlovi, reklama platformasi, oylik daromad maqsadi ($), o'rtacha chek ($), sotuv konversiyasi (%).
2. **Matematik Aniq Hisob-kitob (Prompt bo'yicha 100% mos)**:
   - **Kerakli mijozlar soni** = `Daromad Maqsadi / O'rtacha Chek` (masalan: `$10,000 / $60 = 167 ta mijoz`).
   - **Kerakli lidlar (Funnel)** = `Mijozlar / Konversiya` (masalan: `167 / 30% = 557 ta lid`).
   - **Samaradorlik jarimasi (Penalty)**:
     - CRM yo'qligi: `+20%`
     - Sotuvchilar yo'qligi (o'zim sotaman): `+20%`
     - Sifatsiz upakovka: `+15%`
   - **Reklama Byudjeti**:
     - Minimal byudjet: `557 lid * $0.80 (min CPL) * 1.40 (jarima) = $624`
     - Optimal byudjet: `557 lid * $1.50 (max CPL) * 1.40 (jarima) = $1,170`
3. **Zamonaviy Glassmorphism UI**:
   - Qorong'i (Dark Theme) neon neon elementlar, dinamik yorug'lik effektlari (Ambient glow).
   - Mobil ekranlarga (iOS va Android Telegram in-app browser) 100% moslashuvchan.
4. **Interaktiv Jonli Simulyator (What-If Simulator)**:
   - Foydalanuvchi "CRM tizimini qo'shish" yoki "Sotuv menejerini yollash" switch'larini yoqishi bilan uning byudjeti qancha tejalishini jonli ko'rsatadi.
5. **Telegram Integratsiyasi**:
   - `Telegram.WebApp.HapticFeedback` tebranishlari.
   - Natijani Telegram botga yuborish yoki bitta tugma bilan nusxalash/ulashish.

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
Natija `dist/` papkasida yaratiladi. Buni istalgan bepul xostingga (Vercel, Netlify, Cloudflare Pages, GitHub Pages) bir necha soniyada yuklash mumkin.

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
├── index.html        # Asosiy HTML, Telegram SDK va shriftlar
├── style.css         # Glassmorphism dizayn, mobil moslashuv va animatsiyalar
├── app.js            # Audit formulalari, 9 savol logikasi va Telegram integratsiyasi
├── bot_example.py    # Python aiogram orqali Telegram bot namunasi
├── package.json      # Vite konfiguratsiyasi
└── README.md         # To'liq qo'llanma
```
