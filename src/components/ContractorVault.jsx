import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Download, 
  FileText, 
  Printer, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  ExternalLink, 
  Plus, 
  ShieldCheck, 
  DollarSign, 
  Copy, 
  Check, 
  Building2,
  FileSpreadsheet
} from 'lucide-react';
import { exportCPAManifestCSV, downloadCertificateJSON } from '../engine/w8benGenerator';

export function ContractorVault({ 
  contractors, 
  onViewW8BEN, 
  onOpenWizard, 
  onCopyIntakeLink, 
  copiedLink 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Filter contractors
  const filteredContractors = contractors.filter(c => {
    const matchesSearch = 
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.citizenship.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.ftin.toLowerCase().includes(searchTerm.toLowerCase());

    if (statusFilter === 'ALL') return matchesSearch;
    if (statusFilter === 'VALID') return matchesSearch && c.status === 'valid';
    if (statusFilter === 'EXPIRING_SOON') return matchesSearch && (c.status === 'expiring_soon' || c.daysRemaining <= 90);
    return matchesSearch;
  });

  // Calculate vault stats
  const totalContractors = contractors.length;
  const totalVerified = contractors.filter(c => c.status === 'valid').length;
  const expiringCount = contractors.filter(c => c.status === 'expiring_soon' || c.daysRemaining <= 90).length;
  const totalPayoutsProtected = contractors.reduce((acc, c) => acc + (c.lifetimePaidUSD || 0), 0);
  const totalTaxWithholdingSaved = totalPayoutsProtected * 0.30;

  return (
    <section id="vault-section" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Digital Agency Compliance Dashboard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            IRS Audit Vault & Expiration Tracker
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Centralized repository of verified Form W-8BEN certifications. Tracks 3-year statutory expiration dates through Dec 31 of year + 3 with one-click CPA 1042-S audit packet export.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onCopyIntakeLink()}
            className="px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
            title="Generate frictionless onboarding link for overseas contractors"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Intake Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-amber-400" />
                <span>Copy Intake Link</span>
              </>
            )}
          </button>

          <button
            onClick={() => exportCPAManifestCSV(contractors)}
            className="px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
            title="Download CSV manifest ready for IRS Form 1042-S filing"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export 1042-S CPA CSV</span>
          </button>

          <button
            onClick={onOpenWizard}
            className="px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Contractor</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-surface border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Active Roster</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">{totalContractors}</div>
          <div className="text-[11px] text-slate-400 mt-1">Cross-border independent freelancers</div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Certified 0% Withholding</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-400 font-mono">
            {totalVerified} <span className="text-sm font-normal text-slate-400">/ {totalContractors}</span>
          </div>
          <div className="text-[11px] text-emerald-400/80 mt-1">Treaty verified with valid FTIN</div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">30% Backup Tax Avoided</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-amber-400 font-mono">
            ${totalTaxWithholdingSaved.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Against ${(totalPayoutsProtected).toLocaleString()} lifetime payouts
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Expiring Within 90 Days</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">
            <span className={expiringCount > 0 ? "text-amber-400" : "text-slate-300"}>{expiringCount}</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {expiringCount > 0 ? "Requires re-certification notice" : "All forms up to date"}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-t-xl bg-surface border-t border-x border-border flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search contractor, country, FTIN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        {/* Status filter tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
              statusFilter === 'ALL'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({contractors.length})
          </button>
          <button
            onClick={() => setStatusFilter('VALID')}
            className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
              statusFilter === 'VALID'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Certified 0% ({contractors.filter(c => c.status === 'valid').length})
          </button>
          <button
            onClick={() => setStatusFilter('EXPIRING_SOON')}
            className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
              statusFilter === 'EXPIRING_SOON'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Expiring Soon ({expiringCount})
          </button>
        </div>
      </div>

      {/* Contractors Table */}
      <div className="overflow-x-auto border border-border rounded-b-xl bg-surface/80">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-border bg-slate-900/60 text-slate-400 uppercase font-mono tracking-wider text-[11px]">
              <th className="py-3 px-4">Contractor & Country</th>
              <th className="py-3 px-4">Tax ID (FTIN)</th>
              <th className="py-3 px-4">Treaty Article</th>
              <th className="py-3 px-4 text-center">Withholding Rate</th>
              <th className="py-3 px-4">3-Yr Validity Window</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-right">IRS Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {filteredContractors.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  No contractor tax records found matching your filters.
                </td>
              </tr>
            ) : (
              filteredContractors.map((contractor) => (
                <tr key={contractor.id} className="hover:bg-slate-900/40 transition-colors">
                  {/* Name & Country */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white text-sm">{contractor.fullName}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <span>{contractor.citizenship}</span>
                      <span>•</span>
                      <span className="font-mono text-slate-500">{contractor.email}</span>
                    </div>
                  </td>

                  {/* Foreign Tax ID */}
                  <td className="py-3.5 px-4 font-mono text-slate-300">
                    <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-700/60 text-[11px]">
                      {contractor.ftin}
                    </span>
                  </td>

                  {/* Treaty Article */}
                  <td className="py-3.5 px-4">
                    <div className="text-slate-200 font-medium">{contractor.treatyArticle}</div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[200px]" title={contractor.incomeType}>
                      {contractor.incomeType}
                    </div>
                  </td>

                  {/* Withholding Rate */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 font-mono">
                      {contractor.withholdingRate}
                    </span>
                    <div className="text-[10px] text-slate-500 line-through mt-0.5">30% standard</div>
                  </td>

                  {/* Validity Window & Days Remaining */}
                  <td className="py-3.5 px-4 min-w-[170px]">
                    <div className="flex items-center justify-between text-[11px] text-slate-300 font-mono">
                      <span>Valid to: {contractor.expiresAt}</span>
                      <span className={contractor.daysRemaining <= 90 ? 'text-amber-400 font-bold' : 'text-slate-400'}>
                        {contractor.daysRemaining}d left
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1.5">
                      <div 
                        className={`h-full rounded-full ${
                          contractor.daysRemaining <= 90 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(100, Math.max(5, (contractor.daysRemaining / 1095) * 100))}%` }}
                      />
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4 text-center">
                    {contractor.status === 'valid' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        <span>Valid 0%</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-950/60 text-amber-300 border border-amber-500/30">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>Re-Certify</span>
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onViewW8BEN(contractor)}
                        className="px-2.5 py-1 text-xs font-medium rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-all flex items-center gap-1 active:scale-95"
                        title="View Official IRS Form W-8BEN (Rev. October 2021)"
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-400" />
                        <span>View W-8BEN</span>
                      </button>

                      <button
                        onClick={() => downloadCertificateJSON(contractor)}
                        className="p-1 text-slate-400 hover:text-slate-200 rounded hover:bg-slate-800 transition-colors"
                        title="Download JSON Audit Record"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
        <div>
          Showing {filteredContractors.length} of {contractors.length} registered contractors.
        </div>
        <div className="font-mono">
          Statutory Rule: Treas. Reg. § 1.1441-1(e)(4)(ii) (3 full calendar years validity)
        </div>
      </div>
    </section>
  );
}
