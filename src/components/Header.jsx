import React from 'react';
import { ShieldCheck, FileCheck, Users, ExternalLink, Sparkles, BookOpen } from 'lucide-react';

export function Header({ onOpenWizard, onOpenCAB, onScrollToVault, onScrollToTreaty }) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-1 ring-amber-400/30">
            <ShieldCheck className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-white font-sans">
                Payout<span className="text-amber-400">Cert</span>
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-mono">
                IRS Rev. Oct 2021
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Cross-Border Contractor Tax & W-8BEN Vault
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button 
            onClick={onScrollToVault}
            className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
          >
            <Users className="w-4 h-4 text-slate-400" />
            Compliance Vault
          </button>
          <button 
            onClick={onScrollToTreaty}
            className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            Tax Treaty Matrix
          </button>
          <button 
            onClick={onOpenCAB}
            className="text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1.5 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            CAB Partner (70% Off)
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenWizard}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all shadow-md shadow-amber-500/20 active:scale-95 flex items-center gap-1.5"
          >
            <FileCheck className="w-4 h-4 text-slate-950" />
            <span>New W-8BEN</span>
          </button>
        </div>
      </div>
    </header>
  );
}
