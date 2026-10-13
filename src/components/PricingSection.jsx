import React from 'react';
import { Check, Sparkles, Shield, ArrowRight, Zap } from 'lucide-react';

export function PricingSection({ onOpenWizard, onOpenCAB }) {
  return (
    <section id="pricing-section" className="py-16 sm:py-24 border-t border-border/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Transparent Flat-Fee Compliance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Stop Paying Per-Seat Ransoms to EOR Platforms
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Deel and Rippling charge $35–$50/contractor/month just to store a PDF. PayoutCert gives you standalone, audit-proof W-8BEN certification for a flat agency subscription.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Tier 1: Sandbox */}
          <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border flex flex-col justify-between hover:border-slate-700 transition-all shadow-sm">
            <div>
              <div className="text-sm font-semibold text-slate-300">Developer Sandbox</div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white font-mono">$0</span>
                <span className="text-xs text-slate-400">/forever</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Test the W-8BEN questionnaire and verify tax treaty rates for 1 international contractor.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1 active Form W-8BEN verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Real-time tax treaty rate lookup</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Standard IRS PDF format preview</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Client-side JSON audit export</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenWizard}
              className="mt-8 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
            >
              Start Free Form
            </button>
          </div>

          {/* Tier 2: CAB Partner (Highlighted) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-amber-950/40 via-surface to-surface border-2 border-amber-500/60 flex flex-col justify-between relative shadow-xl shadow-amber-500/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3" />
              <span>Customer Advisory Board (70% Off)</span>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-amber-300">CAB Design Partner</span>
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded">
                  Limited to 10 Agencies
                </span>
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white font-mono">$19</span>
                <span className="text-xs text-slate-400">/month (Lifetime Locked)</span>
              </div>
              <p className="text-xs text-amber-200/80 mt-2">
                Help guide our roadmap. Get complete automated setup for your current contractor roster.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-semibold text-white">Unlimited contractor verifications</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>3-year statutory expiration tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>One-click CPA 1042-S audit CSV export</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Branded intake portal for freelancers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-amber-300 font-medium">Concierge migration from Google Drive/Email</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenCAB}
              className="mt-8 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/25 active:scale-95"
            >
              Apply for CAB Membership
            </button>
          </div>

          {/* Tier 3: Agency Scale */}
          <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border flex flex-col justify-between hover:border-slate-700 transition-all shadow-sm">
            <div>
              <div className="text-sm font-semibold text-slate-300">Agency Scale</div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white font-mono">$59</span>
                <span className="text-xs text-slate-400">/month ($708/yr)</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Complete compliance vault for agencies managing 5 to 50+ cross-border freelancers.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Unlimited international contractors</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Automated 90-day renewal notifications</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Multi-admin agency permissions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>CPA audit packet with SHA-256 seals</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Custom contractor intake URL slug</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenCAB}
              className="mt-8 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
            >
              Get Started ($59/mo Flat)
            </button>
          </div>
        </div>

        {/* Comparison Callout */}
        <div className="mt-12 text-center text-xs text-slate-400">
          <p>
            Have 20 international contractors? <strong className="text-white">Deel charges $800/month ($9,600/year)</strong>. <strong className="text-amber-400">PayoutCert is $59/month ($708/year)</strong>. Zero per-head markup.
          </p>
        </div>
      </div>
    </section>
  );
}
