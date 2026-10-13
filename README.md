# PayoutCert

> **Standalone Tax Treaty Validation & W-8BEN Compliance Vault for Digital Agencies**

[![IRS Compliance](https://img.shields.io/badge/IRS%20Form-W--8BEN%20(Rev.%20Oct%202021)-amber.svg)](https://www.irs.gov/forms-pubs/about-form-w-8-ben)
[![Statutory Validity](https://img.shields.io/badge/Validity-3%20Full%20Calendar%20Years-emerald.svg)](https://www.irs.gov)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 1. Executive Summary & Problem Thesis
Digital agencies, media studios, and software consultancies hire specialized global freelancers and disburse payments directly via modern rails (**Wise, Payoneer, Revolut, Crypto**). 

However, under **US Internal Revenue Code § 1441 & § 1442**, US businesses are legally required to withhold a flat **30% backup tax** on all foreign disbursements unless they collect and maintain a verified foreign tax declaration (**IRS Form W-8BEN / W-8BEN-E**) establishing a reciprocal income tax treaty rate (typically **0%**).

### The Agency Pain Point
- **Legacy EOR Lock-In:** Platforms like Deel and Rippling bundle tax compliance into mandatory **$35–$50 per contractor per month** payroll suites. For an agency managing 20 freelancers, this represents **$9,600/year** in overhead simply to hold PDF declarations.
- **The Insecure Workaround:** Small agencies default to unencrypted email PDFs stored in Google Drive or Notion, failing statutory CPA audits and exposing contractor SSNs/FTINs to privacy breaches.
- **The PayoutCert Solution:** PayoutCert unbundles compliance from payment rails. Collect, validate, and store audit-proof IRS Form W-8BEN certifications in **under 60 seconds** for a flat agency subscription (**$59/month flat**).

---

## 2. Market Sizing & TAM Playbook
- **Target Audience:** 2,000,000 digital agencies, dev boutiques, and creative studios worldwide.
- **Pricing:** $59/month ($708/year) flat fee for contractor verification and audit-ready document storage.
- **Calculated TAM:** `2,000,000 × $708 = $1.416 Billion` (exceeds $1B venture threshold).
- **Early Disruption Indicator:** Remote contractor payroll is expanding globally, yet compliance remains locked inside expensive full-suite EOR software. Mid-market agencies are seeking to unbundle compliance verification from payment rail lock-in.

---

## 3. Black Car Scope (V1 MVP Architecture)

### Allowed Features (In-Scope)
1. **Contractor Intake Link:** Branded, frictionless web portal sent to international freelancers (`#/onboard/:agencySlug`).
2. **Interactive W-8BEN Wizard:**
   - Plain-English questionnaire translating IRS tax treaty terminology into accessible prompts.
   - Real-time bilateral tax treaty rate lookup table covering 12+ primary contractor jurisdictions.
   - Electronic signature collection with responsive mobile signature pad and typed script rendering.
3. **Automated IRS PDF & Document Assembly:**
   - Full replication of official **IRS Form W-8BEN (Rev. October 2021)**:
     - **Part I:** Beneficial Owner Identification (Lines 1–8: Legal name, Citizenship, Permanent address, Foreign TIN / Line 6b exemption, Date of birth).
     - **Part II:** Claim of Tax Treaty Benefits (Lines 9–10: Residency certification, Article & paragraph, 0% withholding rate, Business profits justification).
     - **Part III:** Certification under Penalties of Perjury.
   - Built-in browser printing stylesheet (`@media print`) rendering an authentic black-and-white IRS government document.
4. **Audit Vault & Expiration Tracker:**
   - Automated 3-year statutory expiration tracking through December 31 of year + 3 (**Treas. Reg. § 1.1441-1(e)(4)(ii)**).
   - Real-time countdowns and 90-day renewal warnings.
   - One-click **CPA 1042-S Audit Manifest CSV** export for annual tax filings.
   - Cryptographic **SHA-256 tamper-evident certification seal**.

### Strictly Out-of-Scope (Excluded by Design)
- ❌ No direct currency exchange or money movement (agencies pay directly via Wise, Payoneer, Revolut, Crypto).
- ❌ No full-time employee Employer of Record (EOR) entity sponsorship.
- ❌ No localized health insurance or equipment management modules.

---

## 4. Technical Architecture
```
payout-cert/
├── src/
│   ├── components/
│   │   ├── Header.jsx             # Top bar with compliance status & quick triggers
│   │   ├── Hero.jsx               # SEO H1, problem thesis, & core metrics strip
│   │   ├── ContractorVault.jsx    # Compliance roster, search, 1042-S CSV export
│   │   ├── W8BENWizardModal.jsx   # 4-step guided onboarding questionnaire
│   │   ├── W8BENViewerModal.jsx   # Official IRS Form W-8BEN print/save visualizer
│   │   ├── TaxTreatyMatrix.jsx    # Bilateral treaty lookup & ROI calculator
│   │   ├── PricingSection.jsx     # Flat-fee pricing vs Deel comparison
│   │   ├── CABModal.jsx           # Customer Advisory Board application modal
│   │   └── Footer.jsx             # SEO keywords & regulatory disclaimers
│   ├── data/
│   │   ├── taxTreatyTable.js      # Bilateral treaty articles & withholding rates
│   │   └── mockContractors.js     # Production-grade sample international roster
│   ├── engine/
│   │   └── w8benGenerator.js      # IRS W-8BEN assembler, SHA-256 seal, CSV exporter
│   ├── index.css                  # Tailored dark compliance theme + @media print
│   └── App.jsx                    # Root state management & modal routing
```

---

## 5. Getting Started

### Local Development
```bash
# Clone the repository
git clone https://github.com/21cabbagee/payout-cert.git
cd payout-cert

# Install dependencies
npm install

# Run Vite dev server
npm run dev

# Build production bundle
npm run build
```

---

## 6. Statutory Reference
- **IRS Form:** Form W-8BEN (Rev. October 2021)
- **OMB Control Number:** 1545-1621
- **Statutory Authority:** 26 U.S. Code § 1441, § 1442, § 6109
- **Validity Duration:** Treas. Reg. § 1.1441-1(e)(4)(ii) (Valid from execution date through December 31 of the third full calendar year thereafter).

---

## 7. Customer Advisory Board (CAB) Outreach Script
> *"We are building PayoutCert with 10 agency owners who want audit-proof international contractor tax compliance without paying $40/month per freelancer to Deel. Joining our CAB secures a 70% lifetime platform discount ($19/mo flat) and complete automated setup for your current roster."*
