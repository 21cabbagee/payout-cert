import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Globe2, 
  FileText, 
  Lock, 
  AlertCircle, 
  PenTool, 
  Sparkles,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TAX_TREATY_TABLE } from '../data/taxTreatyTable';
import { assembleW8BENForm } from '../engine/w8benGenerator';

export function W8BENWizardModal({ isOpen, onClose, onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    citizenship: 'United Kingdom',
    countryCode: 'GB',
    address: '',
    city: '',
    postalCode: '',
    dob: '',
    ftin: '',
    noFtinCheckbox: false,
    sameMailingAddress: true,
    treatyAccepted: true,
    perjuryAccepted: false,
    signature: '',
  });

  if (!isOpen) return null;

  const currentTreaty = TAX_TREATY_TABLE[formData.countryCode] || {
    country: formData.citizenship,
    hasTreaty: false,
    treatyArticle: "Non-US Source Services (IRC § 861/862)",
    withholdingRate: "0%",
    defaultRate: "30%",
    conditionsText: "Services performed 100% outside the United States without a US permanent establishment."
  };

  const handleCountryChange = (e) => {
    const code = e.target.value;
    const treaty = TAX_TREATY_TABLE[code];
    setFormData(prev => ({
      ...prev,
      countryCode: code,
      citizenship: treaty ? treaty.country : code
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.signature || !formData.perjuryAccepted) {
      alert("Please accept the certification and provide an electronic signature.");
      return;
    }

    const formArtifact = await assembleW8BENForm(formData);

    // Create a new contractor entry for the vault
    const newContractor = {
      id: `cont_${Date.now()}`,
      certId: formArtifact.certId,
      fullName: formData.fullName,
      email: formData.email || `${formData.fullName.toLowerCase().replace(/\s+/g, '.')}@contractor.io`,
      citizenship: formData.citizenship,
      countryCode: formData.countryCode,
      ftin: formData.ftin || "N/A (Exempt)",
      treatyArticle: formArtifact.partII.line10_articleAndParagraph,
      incomeType: formArtifact.partII.line10_typeOfIncome,
      withholdingRate: formArtifact.partII.line10_rateOfWithholding,
      certifiedDate: formArtifact.certifiedDate,
      expiresAt: formArtifact.expiresAt,
      daysRemaining: 1095,
      status: 'valid',
      lifetimePaidUSD: 0,
      sha256Seal: formArtifact.sha256Seal,
      fullArtifact: formArtifact
    };

    // Confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }

    onComplete(newContractor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-border bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">IRS Form W-8BEN Guided Onboarding</h3>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  Step {step} of 4
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Certifying foreign tax status to establish 0% statutory withholding.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="grid grid-cols-4 border-b border-border/80 bg-slate-900/30 text-center text-xs">
          <div className={`py-2 font-medium ${step >= 1 ? 'text-amber-400 border-b-2 border-amber-500' : 'text-slate-500'}`}>
            1. Identity
          </div>
          <div className={`py-2 font-medium ${step >= 2 ? 'text-amber-400 border-b-2 border-amber-500' : 'text-slate-500'}`}>
            2. Address & TIN
          </div>
          <div className={`py-2 font-medium ${step >= 3 ? 'text-amber-400 border-b-2 border-amber-500' : 'text-slate-500'}`}>
            3. Tax Treaty
          </div>
          <div className={`py-2 font-medium ${step >= 4 ? 'text-amber-400 border-b-2 border-amber-500' : 'text-slate-500'}`}>
            4. E-Signature
          </div>
        </div>

        {/* Modal Form Content */}
        <div className="p-6">
          {/* STEP 1: Identity */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/30 text-xs text-slate-300 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  IRS Form W-8BEN Part I: As an independent contractor, you must enter your legal individual name as recorded on your passport or tax declaration.
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Full Legal Name (Beneficial Owner) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Alexander Jones"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Contractor Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="contractor@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Country of Citizenship / Residence *
                  </label>
                  <select
                    value={formData.countryCode}
                    onChange={handleCountryChange}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  >
                    {Object.entries(TAX_TREATY_TABLE).map(([code, item]) => (
                      <option key={code} value={code}>
                        {item.country} ({item.withholdingRate} Treaty Rate)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Date of Birth (IRS Form Line 8) *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  >
                  </input>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Address & Tax Numbers */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Permanent Foreign Street Address (Line 3) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 42 Shoreditch High Street, Flat 3B"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                />
                <span className="text-[11px] text-slate-500">
                  Must NOT be a P.O. Box or in-care-of address per IRS instructions.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">City / Town *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. London"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Postal / ZIP Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. E1 6JJ"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Foreign Tax Identifying Number (FTIN) — Line 6a *
                </label>
                <input
                  type="text"
                  placeholder={
                    formData.countryCode === 'GB' ? 'e.g. UK National Insurance / UTR: QQ123456A' :
                    formData.countryCode === 'DE' ? 'e.g. Steuer-ID: 12 345 678 901' :
                    formData.countryCode === 'IN' ? 'e.g. PAN Number: ABCDE1234F' :
                    'Enter your home country national tax identification number'
                  }
                  value={formData.ftin}
                  onChange={(e) => setFormData({ ...formData, ftin: e.target.value })}
                  disabled={formData.noFtinCheckbox}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 disabled:opacity-50"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="noFtin"
                  checked={formData.noFtinCheckbox}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setFormData({
                      ...formData,
                      noFtinCheckbox: checked,
                      ftin: checked ? '' : formData.ftin
                    });
                  }}
                  className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="noFtin" className="text-xs text-slate-400 cursor-pointer">
                  Check here if a foreign TIN is not legally required by your local government (Line 6b)
                </label>
              </div>
            </div>
          )}

          {/* STEP 3: Tax Treaty Benefits Claim */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-amber-400" />
                    <span className="font-semibold text-white text-sm">
                      US – {currentTreaty.country} Tax Treaty Determination
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    {currentTreaty.withholdingRate} Withholding
                  </span>
                </div>

                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">IRS Form W-8BEN Line 9:</span>
                    <span className="font-semibold text-white">{currentTreaty.country}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Applicable Treaty Article (Line 10):</span>
                    <span className="font-mono text-amber-300">{currentTreaty.treatyArticle}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Statutory Rate without Treaty:</span>
                    <span className="line-through text-red-400">30% (IRS IRC § 1441)</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Certified Treaty Rate:</span>
                    <span className="font-bold text-emerald-400">0% Withholding</span>
                  </div>
                </div>

                <div className="mt-4 p-2.5 rounded bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 font-mono">
                  {currentTreaty.conditionsText}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="treatyAffirmation"
                  checked={formData.treatyAccepted}
                  onChange={(e) => setFormData({ ...formData, treatyAccepted: e.target.checked })}
                  className="mt-0.5 rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                />
                <label htmlFor="treatyAffirmation" className="text-xs text-slate-300 cursor-pointer">
                  <strong>Treaty Article 7/15 Affirmation:</strong> I certify that I am a tax resident of {currentTreaty.country}, and I perform independent contractor freelance services with zero permanent establishment or fixed base within the United States.
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: Certification & Electronic Signature */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-white flex items-center gap-1.5 text-xs uppercase tracking-wider text-amber-400">
                  <Lock className="w-3.5 h-3.5" />
                  <span>IRS Part III: Certification Under Penalties of Perjury</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Under penalties of perjury, I declare that I have examined the information on this form and to the best of my knowledge and belief it is true, correct, and complete. I further certify under penalties of perjury that:
                </p>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-400">
                  <li>I am the individual that is the beneficial owner of all the income to which this form relates.</li>
                  <li>The person named on line 1 of this form is not a U.S. citizen or green card resident.</li>
                  <li>The income to which this form relates is not effectively connected with the conduct of a trade or business in the United States.</li>
                </ul>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded bg-amber-500/10 border border-amber-500/30">
                <input
                  type="checkbox"
                  id="perjury"
                  required
                  checked={formData.perjuryAccepted}
                  onChange={(e) => setFormData({ ...formData, perjuryAccepted: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="perjury" className="text-xs font-medium text-amber-200 cursor-pointer">
                  I accept and acknowledge the declaration under penalties of perjury.
                </label>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Electronic Signature (Type Your Legal Name) *
                </label>
                <div className="relative">
                  <PenTool className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Type your exact legal name"
                    value={formData.signature}
                    onChange={(e) => setFormData({ ...formData, signature: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              {formData.signature && (
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Signature Preview</span>
                    <span className="font-serif italic text-lg text-amber-300 font-bold tracking-wide">
                      {formData.signature}
                    </span>
                  </div>
                  <div className="text-right text-[10px] font-mono text-slate-400">
                    <div>Date: {new Date().toISOString().split('T')[0]}</div>
                    <div className="text-emerald-400">Valid 3 Full Years</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-border bg-slate-900/60 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => {
                if (step === 1 && (!formData.fullName || !formData.dob)) {
                  alert("Please enter full legal name and date of birth.");
                  return;
                }
                if (step === 2 && (!formData.address || !formData.city || (!formData.ftin && !formData.noFtinCheckbox))) {
                  alert("Please complete the address and provide a foreign TIN (or check exemption).");
                  return;
                }
                setStep(step + 1);
              }}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors flex items-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2.5 text-xs font-bold rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Certify & Stamp IRS W-8BEN</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
