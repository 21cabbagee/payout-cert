import React from 'react';
import { Shield, CheckCircle2, AlertTriangle, ArrowRight, FileText, Lock, Globe2, Zap } from 'lucide-react';

export function Hero({ onOpenWizard, onOpenCAB, onScrollToVault, onScrollToTreaty }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-border/60">
      {/* Background glow & subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[250px] bg-blue-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Slug & Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-300 text-xs font-mono shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Target Canonical:</span>
            <span className="text-amber-400 font-semibold">/tools/w8ben-contractor-tax-compliance</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Unbundle Compliance from $50/mo EOR Lock-In</span>
          </div>
        </div>

        {/* Mandatory SEO H1 */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Instant W-8BEN Generator & Tax Compliance Vault for Remote Teams
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Pay international contractors directly via <span className="text-white font-medium">Wise, Payoneer, Revolut, or Crypto</span> without paying $40/mo per seat to Deel. Automatically collect, validate, and store audit-proof IRS Form W-8BEN certifications with statutory 0% tax treaty validation.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onOpenWizard}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 font-bold text-sm sm:text-base hover:from-amber-400 hover:to-amber-500 transition-all shadow-xl shadow-amber-500/25 active:scale-95 flex items-center justify-center gap-2 group"
            >
              <span>Certify Contractor in 60s</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={onScrollToVault}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm sm:text-base transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Explore Agency Vault</span>
            </button>

            <button
              onClick={onOpenCAB}
              className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <span>Join CAB ($19/mo Lifetime)</span>
            </button>
          </div>

          {/* Value Prop Contrast Callout */}
          <div className="mt-10 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30">
              <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>The $30,000 Audit Liability</span>
              </div>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                Without verified W-8BEN records, the IRS holds your agency liable for <strong className="text-white">30% backup withholding</strong> on all overseas payouts, plus retroactive failure-to-withhold penalties.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>The PayoutCert Solution</span>
              </div>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                Instant IRS treaty lookup validates <strong className="text-white">0% withholding rates</strong>. Plain-English questionnaire generates compliant PDF artifacts with SHA-256 seals in under 60 seconds.
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics Strip */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-lg bg-surface/50 border border-border/50">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">0%</div>
            <div className="text-xs text-slate-400 mt-1">Withholding Tax Rate Claimed</div>
          </div>

          <div className="p-3 rounded-lg bg-surface/50 border border-border/50">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">3 Years</div>
            <div className="text-xs text-slate-400 mt-1">IRS Statutory Validity Window</div>
          </div>

          <div className="p-3 rounded-lg bg-surface/50 border border-border/50">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono">60 Sec</div>
            <div className="text-xs text-slate-400 mt-1">Contractor Intake Completion</div>
          </div>

          <div className="p-3 rounded-lg bg-surface/50 border border-border/50">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">$1.416B</div>
            <div className="text-xs text-slate-400 mt-1">Agency Market Opportunity</div>
          </div>
        </div>
      </div>
    </section>
  );
}
