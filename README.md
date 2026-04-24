# AarogyaRaksha (आरोग्यरक्षा)

### The Intelligence Layer for India's Health Digital Public Infrastructure (DPI)

---

## Strategic Vision

AarogyaRaksha is a high-fidelity financial advocacy platform engineered to eliminate medical bankruptcy in India. While the existing Digital Public Infrastructure (DPI) stack—including ABDM, PM-JAY, and NHCX—has established the foundational data exchange protocols, AarogyaRaksha serves as the citizen-facing intelligence layer. It translates complex government frameworks into actionable, life-saving financial guidance, functioning effectively as the "Intelligence Layer of Healthcare Finance."

**The Problem:** Catastrophic healthcare expenses push approximately 55 million Indians below the poverty line annually. One in three families faces the burden of medical debt due to informational asymmetry and high out-of-pocket (OOP) expenditure.

**The Solution:** A comprehensive AI-driven financial shield that optimizes drug costs, audits hospital billing integrity, and automates government scheme discovery through deep DPI integration.

---

## Core Infrastructure Modules

### 1. AI Scheme Matcher (DPI Gateway)

The Scheme Matcher utilizes Gemini AI reasoning to cross-reference citizen profiles against a repository of over 200 Central and State health schemes.

- **ABDM Integration**: Simulates deep integration with ABHA (Ayushman Bharat Health Account) to auto-populate eligibility parameters.
- **Intelligent Advocacy**: Provides plain-language explanations of eligibility criteria and automated document checklists.
- **High-Fidelity Gateway**: Features a cinematic "Intelligent Reveal" sequence that visualizes the multi-step matching process.

### 2. Hospital Bill Integrity Engine

A multimodal vision system designed to audit hospital bills for inflation and unbundled charges.

- **CGHS Benchmarking**: Automates line-item comparison against national CGHS (Central Government Health Scheme) rate cards.
- **Revenue Cycle Audit**: Detects phantom charges and aggressive hospital markups, particularly on surgical consumables.
- **Dispute Resolution Reporting**: Generates professional, industrial-grade audit reports (PDF) to empower citizens to challenge inflated billing.

### 3. Pharmaceutical Optimizer (PMBJP Connect)

An optimization engine that maps branded drug prescriptions to high-quality PMBJP (Pradhan Mantri Bhartiya Janaushadhi Pariyojana) generic alternatives.

- **Dynamic Cost Analysis**: Performs real-time calculations of projected savings over monthly and annual treatment cycles.
- **Network Integration**: Integrated directory of over 18,000 PMBJP Kendras nationwide with localized store discovery.

### 4. Medical Actuarial Planner

A predictive financial unit that simulates future healthcare capital requirements.

- **Scenario Simulation**: Uses AI to model 10,000+ critical health scenarios based on patient history and actuarial risk.
- **Capital Shield Target**: Calculates a recommended "Healthcare Financial Shield" target—a liquidity buffer designed to mitigate medical risk.

---

## Technical Architecture

The platform is built on a modern, high-performance stack designed for scale and data integrity.

- **Frontend**: React 18 / Vite / Tailwind CSS v4 / Framer Motion.
- **Design System**: A custom "Intercom-inspired" premium UI focusing on clarity, trust, and sophisticated animations.
- **Backend**: Node.js / Express / MongoDB Atlas.
- **AI Core**: Google Gemini 2.0 Flash (Multimodal Vision and Structured Output Reasoning).
- **DPI Simulation**: Mocked ABHA Gateway and National Health Authority (NHA) benchmark engines.

---

## Implementation Philosophy

### 1. Intelligent Reveal

A design pattern used across the platform where complex AI analysis is presented through cinematic, multi-step gateways. This builds user trust by visualizing the underlying "system intelligence" (OCR, Benchmarking, Policy Matching).

### 2. Frictionless Advocacy

The platform minimizes user friction by automating data ingestion from bills and ABHA IDs, ensuring that sophisticated financial protection is accessible regardless of technical literacy.

---

## Deployment & Setup

1. **Repository Configuration**

   ```bash
   git clone https://github.com/batmanven/blueprint-hackathon.git
   cd blueprint-hackathon
   npm install
   ```

2. **Environment Variables**
   Configure `.env` files in both `/frontend` and `/backend` directories:

   ```env
   PORT=5001
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_signing_key
   GEMINI_API_KEY=your_gemini_api_key
   VITE_API_URL=http://localhost:5001/api
   ```

3. **Development Cycle**

   ```bash
   # Start Backend Services
   cd backend && npm start

   # Start Frontend Application
   cd frontend && npm run dev
   ```

---

## Impact Projection

At scale, AarogyaRaksha aims to achieve the following:

- **₹40,000 Crore** in potential annual savings through generic medicine substitution.
- **40% Average Reduction** in out-of-pocket medical expenditure via billing audits.
- **Universal Awareness** of life-saving government health schemes for all integrated users.

---

_"Because healthcare should never break a family."_
