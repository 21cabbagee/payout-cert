import React, { useState } from 'react';
import { TrendingUp, FileText, Zap, DollarSign, Clock, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

/**
 * OutcomeChart for PayoutCert (Bklit UI + Julien Bek $1:$6 Sequoia Framework + Larry Ellison ROI Engine)
 * Compares $49/seat/mo Deel/Remote EOR tax lock-ins & international tax attorney retainers ($6 layer)
 * with Autonomous W-8BEN Tax Compliance & Treaty Verification Vault ($1 software layer).
 */
export default function OutcomeChart({
  serviceName = "Autonomous International Contractor W-8BEN Tax Compliance Vault",
  defaultContractors = 24,
  onCtaClick
}) {
  const [contractors, setContractors] = useState(defaultContractors);

  // Legacy EOR platform seat fees: $49/contractor/mo + $2,400/yr ($200/mo) tax counsel retainer
  const legacyServicesCost = (contractors * 49) + 200;
  // PayoutCert software fee: $29/mo flat unlimited + $0.50/contractor/mo
  const autoSoftwareCost = 29 + Math.round(contractors * 0.50);
  const netValueReclaimed = legacyServicesCost - autoSoftwareCost;
  const savingsPercent = Math.round(((legacyServicesCost - autoSoftwareCost) / legacyServicesCost) * 100);

  const maxCost = Math.max(legacyServicesCost, 1);
  const legacyBarHeight = 100;
  const autoBarHeight = Math.max(Math.round((autoSoftwareCost / maxCost) * 100), 5);

  return (
    <div className="relative rounded-2xl border border-amber-500/30 bg-slate-950/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden my-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border bg-slate-900 border-amber-500/40 text-amber-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            The Sequoia Equation: Software ($1) vs $49/mo EOR Seat Lock-Ins ($6)
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Remote Contractor Tax Economics: <span className="text-amber-400">{savingsPercent}% Compliance Cost Saved</span>
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Julien Bek Thesis: Unbundling tax compliance from bloated $49/seat EOR middlemen so you can pay contractors directly on Wise or crypto.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 border border-amber-500/30 rounded-xl p-3">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <div className="text-right">
            <div className="text-xs text-slate-400 font-mono">Net Monthly Savings</div>
            <div className="text-lg font-black text-amber-400 font-mono">
              +${netValueReclaimed.toLocaleString()}/mo
            </div>
          </div>
        </div>
      </div>

      {/* Slider Control */}
      <div className="my-6 bg-slate-900/60 rounded-xl p-4 border border-white/5">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Active International Contractors On Retainer:</span>
          </label>
          <span className="text-base font-bold text-amber-400 font-mono bg-amber-500/10 px-3 py-0.5 rounded-lg border border-amber-500/20">
            {contractors} Global Contractors
          </span>
        </div>
        <input
          type="range"
          min="3"
          max="80"
          value={contractors}
          onChange={(e) => setContractors(parseInt(e.target.value))}
          className="w-full accent-amber-400 bg-slate-800 rounded-lg cursor-pointer h-2"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>3 Seed Hires</span>
          <span>40 Scaled Engineering Team</span>
          <span>80+ Global Remote Workforce</span>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {/* Legacy Manual Services ($6) */}
        <div className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center">
                <Clock className="w-4 h-4 text-rose-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">Deel / Remote EOR Platforms</h4>
                <p className="text-xs text-rose-300/70">$49/seat/mo Lock-in & Withholding Risk</p>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold text-rose-400 bg-rose-500/10 px-2 py-1 rounded">
              The $6 Service Layer
            </span>
          </div>

          <div className="space-y-3 mb-6 text-xs text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">• EOR Platform Per-Seat Markup:</span>
              <span className="font-mono text-rose-400 font-bold">${(contractors * 49).toLocaleString()}/mo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">• Cross-Border Tax Counsel Retainer:</span>
              <span className="font-mono text-rose-400 font-bold">$200/mo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">• IRS 30% Withholding Risk:</span>
              <span className="font-mono text-rose-400 font-bold">Uncertified Liability</span>
            </div>
            <div className="border-t border-rose-500/20 pt-2 flex justify-between font-bold text-sm">
              <span className="text-white">Total Middleware Toll:</span>
              <span className="font-mono text-rose-400">${legacyServicesCost.toLocaleString()}/mo</span>
            </div>
          </div>

          {/* Bar visualization */}
          <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-rose-500/30">
            <div
              className="bg-gradient-to-r from-rose-600 to-rose-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${legacyBarHeight}%` }}
            />
          </div>
        </div>

        {/* PayoutCert Software Layer ($1) */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/15 p-5 relative overflow-hidden shadow-lg shadow-amber-500/5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">PayoutCert Direct Vault</h4>
                <p className="text-xs text-amber-300/80">Audit-Proof W-8BEN & Treaty Engine</p>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">
              The $1 Software Layer
            </span>
          </div>

          <div className="space-y-3 mb-6 text-xs text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">• Automated Tax Treaty Check (0% Rate):</span>
              <span className="font-mono text-amber-400 font-bold">Instant (68 Treaties)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">• Certified W-8BEN PDF Generation:</span>
              <span className="font-mono text-amber-400 font-bold">&lt; 60 seconds</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">• Software Fee (Zero Per-Seat Taxes):</span>
              <span className="font-mono text-amber-400 font-bold">${autoSoftwareCost.toLocaleString()}/mo</span>
            </div>
            <div className="border-t border-amber-500/20 pt-2 flex justify-between font-bold text-sm">
              <span className="text-white">Software Price:</span>
              <span className="font-mono text-amber-400">${autoSoftwareCost.toLocaleString()}/mo</span>
            </div>
          </div>

          {/* Bar visualization */}
          <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-amber-500/30">
            <div
              className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${autoBarHeight}%` }}
            />
          </div>
        </div>
      </div>

      {/* Larry Ellison Economic Guarantee Box */}
      <div className="rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-yellow-950/40 border border-amber-500/30 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>The Ellison SLA: 100% IRS Audit-Proof Guarantee</span>
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">Statutory Compliance</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              If the IRS ever challenges the validity of a W-8BEN executed through PayoutCert, our legal network defends the filing at zero cost to you.
            </p>
          </div>
        </div>

        <button
          onClick={onCtaClick}
          className="whitespace-nowrap px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
        >
          Certify First Contractor Free
        </button>
      </div>
    </div>
  );
}
