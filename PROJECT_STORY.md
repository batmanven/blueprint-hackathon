# Project Story: AarogyaRaksha — AI Layer for Healthcare Affordability

## Inspiration
55 million Indians fall into poverty yearly due to medical expenses. PM-JAY offers ₹5L coverage, Jan Aushadhi has 2,000+ medicines at 90% off — but nobody knows. **The problem isn't healthcare access, it's awareness.** AarogyaRaksha is the intelligence layer on India's health DPI.

---

## What It Does

| Module | What It Does |
|--------|--------------|
| **Scheme Matcher** | 8 questions → AI matches schemes worth ₹5L coverage |
| **Bill Auditor** | Upload bill → Vision AI flags overcharging vs CGHS rates |
| **Medicine Optimizer** | Search branded drug → Find generic, save ₹9,000+/yr |
| **Expense Planner** | Select procedure → Estimate costs (public vs private) |
| **Emergency Fund** | Family profile → Calculate target savings |
| **Analytics Dashboard** | Track savings, visualize expenses |

---

## How We Built It

- **Frontend:** React 18 + Vite + Tailwind CSS + Framer Motion
- **Backend:** Node.js + Express + MongoDB Atlas
- **AI:** Google Gemini 2.0 Flash + Vision for bill analysis
- **OCR:** Tesseract.js (client-side)

**Data:** 200+ government schemes, 2,100+ Jan Aushadhi medicines, 1,500+ CGHS rates

---

## Challenges

1. **AI Consistency** → Zod validation + retry logic
2. **Data Gaps** → Curated 50+ state-specific schemes manually
3. **Messy Bills** → Combined Tesseract + Gemini Vision
4. **"Missing Middle"** → Focused on state schemes + medicine savings

---

## Accomplishments

| Achievement |
|-------------|
| 5 working AI modules |
| 200+ schemes database |
| 70-90% medicine savings |
| Hindi/English i18n |
| Working deployable demo |

---

## What We Learned

1. **DPI Opportunity:** India built infrastructure (UPI, ONDC, ABDM) — nobody built the intelligence layer on top.
2. **Information is Currency:** Knowing what's free saves families ₹5L+ coverage and ₹9,000+/year on medicines.
3. **Boring Wins:** Price comparison and bill verification affect 140 crore Indians daily.
4. **Cross-Domain:** Healthcare × FinTech × DPI = innovation.

---

## What's Next

- **Phase 1:** Deploy to Vercel, seed schemes database
- **Phase 2:** ABHA integration, disease calculators, notifications
- **Phase 3:** Partner with Jan Aushdhi Kendras, NHA verification
- **Phase 4:** 22 languages, voice-first interface, WhatsApp integration

---

> **Vision:** Every Indian family has a financial shield against medical bankruptcy — through information.
> **Mission:** Turn India's health DPI into actual protection for 140 crore people.
> **Tagline:** Healthcare should never break a family.

---

*Built for BluePrint 2026 | April 2026*
