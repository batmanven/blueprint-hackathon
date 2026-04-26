# Project Story: AarogyaRaksha — AI Layer for Healthcare Affordability

## Inspiration

55 million Indians. That's how many families fall into poverty every single year because of medical expenses. I watched it happen to people around me — families selling land, taking loans at 18% interest, children dropping out of school because dad had a heart attack and the hospital bill was ₹18 lakhs.

The crazy part? The government built everything we need — PM-JAY gives ₹5 lakh coverage, Jan Aushadhi has 2,000+ generic medicines at 90% off, CGHS rate cards exist to benchmark fair prices. But nobody knows. The information doesn't reach the people who need it most.

That's when it hit me: **we don't have a healthcare access problem in India. We have a healthcare *awareness* problem.**

So I asked myself: what if we built the intelligence layer that sits on top of India's health DPI — the invisible bridge between government infrastructure and ordinary families? Not another telemedicine app. Not another appointment booker. Something that actually protects families from going broke.

AarogyaRaksha was born.

---

## What It Does

AarogyaRaksha is an AI-powered financial shield for Indian families. We solve three massive problems with **5 core modules + 1 intelligence dashboard**:

---

### 1. Scheme Matcher (AI Scheme Discovery)
**Problem:** 200+ government health schemes exist but citizens don't know what they qualify for.

**What we do:**
- Answer 8 questions (name, age, state, income, category, occupation, medical conditions)
- Our AI matches you to schemes worth up to ₹5 lakh coverage
- Shows eligibility confidence, benefits, documents required, application steps
- Direct links to official government portals

**Features:**
- ABHA ID auto-link option for instant profile sync
- Multi-state scheme database (Central + 15 major states)
- Document checklist generator
- Application step-by-step guide

---

### 2. Bill Auditor (Hospital Bill Analysis)
**Problem:** Hospitals markup consumables 1000-1500% — ₹800 for saline that costs ₹50.

**What we do:**
- Upload hospital bill (photo/PDF)
- Vision AI reads every line item
- Compares against CGHS rate benchmarks
- Flags overcharging with severity rating

**Features:**
- Client-side OCR + Gemini Vision
- Red/Yellow/Green flagging for each item
- Consumer rights guidance
- Potential savings calculation
- Audit report generation

---

### 3. Medicine Optimizer (Generic Drug Finder)
**Problem:** Branded medicines cost 5-10x more than generic equivalents.

**What we do:**
- Search any branded medicine
- Find PMBJP (Jan Aushadhi) generic alternative
- Show price comparison with savings %
- Calculate monthly/yearly savings

**Features:**
- 2,000+ medicine database
- Real-time price comparison
- Animated savings counter
- Dosage information
- Category grouping (diabetes, BP, cholesterol, antibiotics)

**Demo searches that work:** Telma 40, Lipitor, Augmentin, Metformin

---

### 4. Expense Planner (Medical Cost Estimator)
**Problem:** No tools help families plan for medical treatment costs proactively.

**What we do:**
- Select condition/procedure
- AI estimates total cost (consultation + tests + procedure + medicines + follow-ups)
- Shows public vs private hospital cost comparison
- Cross-references government scheme coverage

**Features:**
- City-tier cost multipliers (Metro vs Tier-2 vs Tier-3)
- Public vs private hospital comparison
- Condition-based risk scoring
- Scheme coverage gap analysis

---

### 5. Emergency Fund Calculator (Health Shield Target)
**Problem:** Zero financial preparedness for medical emergencies.

**What we do:**
- Enter family profile (age, income, family size, pre-existing conditions, insurance status)
- AI calculates recommended emergency health fund
- Creates personalized micro-savings plan
- Shows risk score with breakdown

**Features:**
- Age/family/condition/insurance risk scoring
- 36-month savings plan
- Breakdown: hospitalization (50%), medicines (25%), diagnostics (15%), contingency (10%)
- Risk level: Low/Medium/High

---

### 6. Analytics Dashboard (Savings Intelligence)
**What we do:**
- Track savings over time
- Expense breakdown visualization
- Mutual fund automation for health shield

**Features:**
- Monthly savings chart (area graph)
- Expense category pie chart
- "Automate Savings" button integration
- Risk score visualization

---

### Summary Table

| Module | Input | Output | Savings Potential |
|--------|-------|-------|---------------|
| Scheme Matcher | 8 questions | Schemes worth ₹5L | Unlock free coverage |
| Bill Auditor | Upload bill photo | Flagged overcharges | ₹10,000-20,000/bill |
| Medicine Optimizer | Medicine name | Generic alternative | ₹9,000+/year |
| Expense Planner | Condition selected | Cost estimate | Plan ahead |
| Emergency Fund | Family profile | Fund target | Financial preparedness |
| Analytics | Usage data | Savings tracking | Behavioral change |

---

## How We Built It

**Tech Stack:**
- Frontend: React 18 + Vite + Tailwind CSS + Framer Motion
- Backend: Node.js + Express + MongoDB Atlas
- AI Engine: Google Gemini 2.0 Flash (Vision + Structured Output)
- OCR: Tesseract.js (client-side, privacy-preserving)

**Architecture:**

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │ Scheme   │  │  Bill    │  │ Medicine │  │ Expense  │  │ │
│  │ Matcher  │  │ Auditor  │  │ Optimizer│  │ Planner  │  │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘ │
└───────┼─────────────┼─────────────┼─────────────┼────────┘
        │             │             │             │
        ▼             ▼             ▼             ▼
┌─────────────────────────────────────────────────────────────┐
│              Backend API (Express + Gemini AI)              │
│  ┌────────────────────────────────────────────���─────────┐  │
│  │  Gemini Service (Structured Output + Vision)        │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │ Schemes  │  │ CGHS     │  │ Medicines│  │ Disease  │  │
│  │ (200+)   │  │ Benchmarks│ │ (2,000+) │  │ Costs    │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Data Curation (The Moat):**
- 200+ government health schemes (Central + 15 major states)
- 2,100+ Jan Aushadhi medicine prices
- CGHS rate benchmarks for 1,500+ procedures
- Disease cost profiles (cancer, diabetes, heart, cataract)

**Design Philosophy:**
- Dark mode default (premium, reduces eye strain)
- Glassmorphism cards with animated borders
- Hindi/English toggle with Noto Sans Devanagari
- Mobile-first responsive

---

## Challenges We Ran Into

**Challenge 1: AI Output Consistency**
Gemini is powerful but sometimes creative with JSON structure. We needed strict schemas for bill analysis results. Solution: used Zod validation + retry logic with fallback prompts.

**Challenge 2: Data Gap**
The schemes database had 2,000+ entries but missing state-specific schemes for tier-2/3 states. Solution: curated additional 50+ schemes manually from government portals and validated with NHA guidelines.

**Challenge 3: Client-Side OCR**
Hospital bills are messy — crumpled paper, handwriting, different formats. Tesseract.js alone wasn't enough. Solution: combined Tesseract extraction with Gemini Vision for superior accuracy.

**Challenge 4: The "Missing Middle" Problem**
PM-JAY targets the poorest. The middle class (₹5-25 lakh income) falls through the cracks — too rich for PM-JAY, too poor for private insurance. Solution: focused on uncovering state-specific schemes and medicine cost optimization as the primary value props for this segment.

---

## Accomplishments That We're Proud Of

| Achievement | Impact |
|-------------|--------|
| 5 working AI modules | Complete end-to-end user flows |
| Curated 2,000+ scheme database | Covers Central + 15 major states |
| Vision-based bill analysis | Real-world overcharging detection |
| Medicine optimizer live | Showing 70-90% savings on common drugs |
| Hindi/English i18n | Accessible to 140 crore Indians |
| Premium UI design | Intercom-inspired trust-building aesthetic |
| Working demo | Deployable TODAY, not just a pitch |

**The Demo Moments:**
- Search "Lipitor" → See ₹450 vs ₹34 → Watch savings counter animate to ₹9,000+/year
- Upload hospital bill → AI flags 5 red-flagged items → "Your bill is inflated by ₹15,420"
- Answer 8 questions → "You're eligible for 4 schemes worth ₹7.5 lakhs"

We've seen similar platforms in the healthcare space — everything solves for *access* (booking appointments, teleconsultation). We solve for *affordability*. That's the gap.

---

## What We Learned

**Lesson 1: The DPI Opportunity**
India has built incredible DPI infrastructure (UPI, ONDC, ABDM) but nobody built the citizen-facing intelligence layer on top. That's where the real value is.

**Lesson 2: Information is Currency**
Families don't need more hospitals. They need to know what's already free. Scheme awareness alone can unlock ₹5 lakh coverage. Medicine switching can save ₹9,000/year. Bill auditing can recover ₹15,000+ in markups.

**Lesson 3: Boring Wins**
Price comparison, bill verification, scheme eligibility — these aren't sexy. But they affect 140 crore Indians daily. The most sustainable startup ideas solve boring structural problems.

**Lesson 4: Cross-Domain is Key**
Healthcare × FinTech × DPI. The intersection is where innovation happens. Judges noticed.

---

## Built With

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI Framework |
| Vite | 8.x | Build Tool & Dev Server |
| TypeScript | 6.x | Type Safety |
| Tailwind CSS | 4.x | Styling |
| Framer Motion | 12.x | Animations |
| Radix UI | 1.x | Accessible Components |
| Recharts | 3.x | Data Visualization |
| Lucide React | 1.x | Icons |
| Axios | 1.x | HTTP Client |
| React Router DOM | 7.x | Routing |
| React Query | 5.x | Server State Management |
| jsPDF | 4.x | PDF Generation |
| Sonner | 2.x | Toast Notifications |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 22.x | Runtime |
| Express | 5.x | Web Framework |
| Mongoose | 9.x | ODM for MongoDB |
| JSON Web Token (JWT) | 9.x | Authentication |
| bcryptjs | 3.x | Password Hashing |
| Multer | 2.x | File Upload |
| Helmet | 8.x | Security Headers |
| CORS | 2.x | Cross-Origin Requests |
| Zod | 4.x | Schema Validation |
| Morgan | 1.x | Request Logging |

### AI & Vision

| Technology | Version | Purpose |
|------------|---------|---------|
| Google Gemini 2.0 Flash | Latest | AI Reasoning & Structured Output |
| Gemini Vision API | Latest | Multimodal Image Analysis |

### Database

| Technology | Purpose |
|------------|---------|
| MongoDB Atlas | Primary Database (Cloud) |
| Mongoose ODM | Schema Modeling |

### Data Sources (Curated)

| Data | Records | Source |
|------|---------|--------|
| Government Health Schemes | 200+ | PM-JAY, NHA, State Portals |
| Jan Aushadhi Medicines | 2,100+ | PMBJP Official List |
| CGHS Rate Benchmarks | 1,500+ | CGHS Rate Card 2024 |
| Disease Cost Profiles | 50+ | NSS, NIH Studies |

---

## What's Next for AarogyaRaksha

**Phase 1: Launch (BluePrint 2026)**
- Deploy frontend to Vercel
- Seed 200+ schemes database
- Live bill auditor demo to showcase

**Phase 2: Expand Intelligence**
- Add ABHA ID integration for auto-eligibility
- Build disease-specific cost calculators
- Push notification alerts for scheme deadlines

**Phase 3: Network Effects**
- Partner with Jan Aushadhi Kendras for store locator
- Integrate with NHA for PM-JAY verification
- Build employer wellness plans (B2B2C)

**Phase 4: Scale**
- Hindi expansion to all 22 scheduled languages
- Voice-first interface for rural adoption
-whatsapp Integration for accessibility

---

> **The Vision:** Every Indian family has a financial shield against medical bankruptcy — not through insurance, but through information.

> **The Mission:** Turn India's health DPI into actual protection for 140 crore people.

> **The Tagline:** Healthcare should never break a family. We make sure it doesn't.

---

*Built for BluePrint 2026 | April 2026*