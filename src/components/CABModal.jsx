import React, { useState } from 'react';
import { X, Sparkles, CheckCircle, ShieldCheck, Send, MessageSquare } from 'lucide-react';

export function CABModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    agencyName: '',
    contactName: '',
    email: '',
    contractorCount: '10-25',
    paymentRails: 'Wise',
    currentStorage: 'Google Drive / Email PDFs'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-border bg-gradient-to-r from-amber-950/40 via-surface to-surface flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">Customer Advisory Board (CAB)</h3>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  70% Lifetime Discount
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Join 10 digital agency founders shaping the future of unbundled compliance.
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

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white">Application Received!</h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Thanks for applying, <strong className="text-white">{formData.contactName}</strong>. We've reserved one of the 10 CAB slots for <strong className="text-amber-400">{formData.agencyName}</strong> at the lifetime $19/mo rate. Our founding engineer will reach out within 2 hours to coordinate your agency's automated roster setup.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Outreach Pitch Script Card */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 leading-relaxed">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px] mb-1 uppercase tracking-wider">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Founders Invitation Script</span>
              </div>
              <p className="italic text-slate-300">
                "We are building PayoutCert with 10 agency owners who want audit-proof international contractor tax compliance without paying $40/month per freelancer to Deel. Joining our CAB secures a 70% lifetime platform discount ($19/mo flat) and complete automated setup for your current roster."
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Digital Agency Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Digital Studio"
                  value={formData.agencyName}
                  onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Founder / Finance Lead Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Work Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="sarah@agency.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Current Overseas Contractors
                </label>
                <select
                  value={formData.contractorCount}
                  onChange={(e) => setFormData({ ...formData, contractorCount: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-amber-500"
                >
                  <option value="1-5">1 – 5 contractors</option>
                  <option value="5-15">5 – 15 contractors</option>
                  <option value="15-30">15 – 30 contractors</option>
                  <option value="30+">30+ contractors</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Primary Payout Rail
                </label>
                <select
                  value={formData.paymentRails}
                  onChange={(e) => setFormData({ ...formData, paymentRails: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-amber-500"
                >
                  <option value="Wise">Wise (TransferWise)</option>
                  <option value="Payoneer">Payoneer</option>
                  <option value="Revolut">Revolut Business</option>
                  <option value="Crypto">Crypto (USDC/USDT)</option>
                  <option value="BankWire">Direct SWIFT Bank Wire</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                How do you currently collect W-8BEN forms?
              </label>
              <select
                value={formData.currentStorage}
                onChange={(e) => setFormData({ ...formData, currentStorage: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-amber-500"
              >
                <option value="Google Drive / Email PDFs">Unencrypted email PDFs saved in Google Drive / Dropbox</option>
                <option value="Deel / Rippling">Paying $40/mo per contractor to Deel / Rippling</option>
                <option value="None / Missing">We haven't collected them yet (at risk of 30% audit penalty)</option>
                <option value="Notion / Manual Docs">Notion database / manual paperwork</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Claim 70% Discount ($19/mo Lifetime Slot)</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
