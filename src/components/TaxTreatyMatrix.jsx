import React, { useState } from 'react';
import { BookOpen, Search, Shield, DollarSign, Calculator, CheckCircle2, ArrowRight } from 'lucide-react';
import { TAX_TREATY_TABLE } from '../data/taxTreatyTable';

export function TaxTreatyMatrix({ onOpenWizard }) {
  const [search, setSearch] = useState('');
  const [contractorCount, setContractorCount] = useState(12);
  const [annualSpend, setAnnualSpend] = useState(120000);

  const treaties = Object.entries(TAX_TREATY_TABLE).filter(([code, item]) => {
    return (
      item.country.toLowerCase().includes(search.toLowerCase()) ||
      code.toLowerCase().includes(search.toLowerCase()) ||
      item.treatyArticle.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Calculate savings vs Deel and IRS backup tax
  const deelCostAnnual = contractorCount * 40 * 12; // $40/mo per seat
  const payoutCertCostAnnual = 708; // $59/mo flat
  const saasSavings = deelCostAnnual - payoutCertCostAnnual;
  const backupWithholdingAtRisk = annualSpend * 0.30; // 30% IRS statutory withholding

  return (
    <section id="treaty-section" className="py-14 sm:py-20 border-t border-border/80 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-medium mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>IRS Bilateral Tax Treaty Engine</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Reciprocal Tax Treaty Rates by Contractor Jurisdiction
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            US Internal Revenue Code § 1441 mandates a 30% tax withholding on cross-border payments unless justified by an active bilateral income tax treaty and an executed Form W-8BEN.
          </p>
        </div>

        {/* ROI & Withholding Calculator Card */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-surface via-slate-900 to-surface border border-border shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="w-full lg:w-1/2 space-y-5">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE ROI & WITHHOLDING LIABILITY CALCULATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                How much does unbundled compliance save your agency?
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-medium mb-1.5">
                    <span>Active Overseas Contractors:</span>
                    <span className="font-mono text-amber-400 font-bold">{contractorCount} freelancers</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="60"
                    value={contractorCount}
                    onChange={(e) => setContractorCount(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-medium mb-1.5">
                    <span>Estimated Annual Freelancer Spend (USD):</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      ${annualSpend.toLocaleString()} USD
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20000"
                    max="500000"
                    step="10000"
                    value={annualSpend}
                    onChange={(e) => setAnnualSpend(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Calculations Outcome */}
            <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30">
                <div className="text-xs text-red-300 font-medium">Potential IRS Audit Exposure</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-red-400 font-mono mt-1">
                  ${backupWithholdingAtRisk.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  30% statutory withholding penalty if W-8BEN forms are missing or unverified.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                <div className="text-xs text-emerald-300 font-medium">Annual SaaS Fee Savings</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono mt-1">
                  ${saasSavings.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  vs paying Deel $40/mo per seat (${deelCostAnnual.toLocaleString()} vs $708 flat).
                </div>
              </div>

              <div className="col-span-1 sm:col-span-2 p-3.5 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-between">
                <div className="text-xs text-slate-300">
                  <span className="text-white font-semibold">Net Result:</span> Zero withholding liability + Pay directly via Wise/Revolut.
                </div>
                <button
                  onClick={onOpenWizard}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1 shrink-0"
                >
                  <span>Certify Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="mb-4 flex items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search country (e.g. United Kingdom, Germany)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
          <div className="text-xs text-slate-400 font-mono hidden sm:block">
            {treaties.length} jurisdictions indexed
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-slate-900/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Contractor Country</th>
                <th className="py-3 px-4">Reciprocal Treaty Article</th>
                <th className="py-3 px-4 text-center">Certified Rate (W-8BEN)</th>
                <th className="py-3 px-4 text-center">Uncertified Rate</th>
                <th className="py-3 px-4">Foreign Tax ID (FTIN) Format</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {treaties.map(([code, item]) => (
                <tr key={code} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white flex items-center gap-2">
                      <span className="font-mono text-xs text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                        {code}
                      </span>
                      <span>{item.country}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300">
                    {item.treatyArticle}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                      {item.withholdingRate}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center line-through text-red-400 font-mono">
                    {item.defaultRate}
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                    {code === 'GB' && 'National Insurance / UTR'}
                    {code === 'DE' && 'Steuer-Identifikationsnummer (11 digits)'}
                    {code === 'CA' && 'Social Insurance Number (SIN)'}
                    {code === 'IN' && 'Permanent Account Number (PAN)'}
                    {code === 'FR' && 'Numéro SPI / Fiscal (13 digits)'}
                    {code === 'UA' && 'RNOCPP / Tax ID (10 digits)'}
                    {code === 'PH' && 'Taxpayer Identification Number (TIN)'}
                    {code === 'AU' && 'Tax File Number (TFN) / ABN'}
                    {code === 'JP' && 'My Number (12 digits)'}
                    {code === 'BR' && 'CPF (Cadastro de Pessoas Físicas)'}
                    {code === 'PL' && 'PESEL / NIP'}
                    {code === 'MX' && 'RFC (13 characters)'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
