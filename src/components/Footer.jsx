import React from 'react';
import { ShieldCheck, Lock, ExternalLink } from 'lucide-react';

export function Footer({ onOpenWizard, onOpenCAB, onScrollToVault, onScrollToTreaty }) {
  return (
    <footer className="border-t border-border bg-slate-950 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
              <span className="font-bold text-lg text-white font-sans">
                Payout<span className="text-amber-400">Cert</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Standalone tax treaty validation and W-8BEN compliance vault for agencies paying international contractors without full-suite EOR lock-in.
            </p>
            <div className="text-[10px] text-slate-500 font-mono">
              OMB No. 1545-1621 • IRS Rev. Oct 2021
            </div>
          </div>

          {/* Product links */}
          <div>
            <div className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3">
              Platform Features
            </div>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={onOpenWizard} className="hover:text-amber-400 transition-colors">
                  Interactive W-8BEN Wizard
                </button>
              </li>
              <li>
                <button onClick={onScrollToVault} className="hover:text-amber-400 transition-colors">
                  Agency Contractor Vault
                </button>
              </li>
              <li>
                <button onClick={onScrollToTreaty} className="hover:text-amber-400 transition-colors">
                  Bilateral Treaty Matrix (0% Rate)
                </button>
              </li>
              <li>
                <button onClick={onScrollToVault} className="hover:text-amber-400 transition-colors">
                  CPA 1042-S CSV Audit Export
                </button>
              </li>
            </ul>
          </div>

          {/* Long-Tail SEO Keywords */}
          <div>
            <div className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3">
              High-Intent Solutions
            </div>
            <ul className="space-y-2 text-[11px]">
              <li>
                <span className="text-slate-300 hover:text-amber-400 cursor-pointer">
                  W-8BEN validator for digital agencies
                </span>
              </li>
              <li>
                <span className="text-slate-300 hover:text-amber-400 cursor-pointer">
                  invoice tax withholding calculator overseas contractors
                </span>
              </li>
              <li>
                <span className="text-slate-300 hover:text-amber-400 cursor-pointer">
                  generate localized freelancer payout agreement
                </span>
              </li>
              <li>
                <span className="text-slate-300 hover:text-amber-400 cursor-pointer">
                  W-8BEN online generator for international developers
                </span>
              </li>
            </ul>
          </div>

          {/* Pricing & CAB */}
          <div>
            <div className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3">
              Partnership & Governance
            </div>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={onOpenCAB} className="text-amber-400 hover:underline font-medium">
                  Customer Advisory Board ($19/mo Lifetime)
                </button>
              </li>
              <li>
                <span className="text-slate-400">Target TAM: $1.416B (2M digital agencies)</span>
              </li>
              <li>
                <span className="text-slate-400">Statutory 3-Year Expiration Notifications</span>
              </li>
              <li>
                <span className="text-slate-400">Cryptographic SHA-256 Audit Trail</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer (Out of scope clarifications) */}
        <div className="pt-6 border-t border-slate-900 text-[10px] text-slate-500 leading-relaxed space-y-2">
          <p>
            <strong>Regulatory Scope Disclaimer:</strong> PayoutCert is a tax compliance technology portal and document vault. We provide self-certified foreign status documentation collection under U.S. Treasury Regulation § 1.1441-1(e)(4)(ii). PayoutCert does not engage in direct currency exchange or money movement (agencies disburse payments directly via their preferred rails such as Wise, Payoneer, Revolut, or Crypto). PayoutCert does not act as an Employer of Record (EOR) entity sponsor and does not provide localized health insurance or equipment management.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2">
            <div>
              © 2026 PayoutCert Inc. All rights reserved. Built for independent agencies and global contractors.
            </div>
            <div className="font-mono text-slate-600 mt-1 sm:mt-0">
              IRS Treas. Reg. § 1.1441-1(e)(4)(ii) • SHA-256 Verified
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
