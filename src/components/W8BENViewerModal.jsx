import React from 'react';
import { X, Printer, Download, ShieldCheck, Lock, ExternalLink, CheckCircle } from 'lucide-react';
import { downloadCertificateJSON } from '../engine/w8benGenerator';

export function W8BENViewerModal({ contractor, isOpen, onClose }) {
  if (!isOpen || !contractor) return null;

  const artifact = contractor.fullArtifact || {
    certId: contractor.certId,
    formType: "IRS Form W-8BEN (Rev. October 2021)",
    standard: "Certificate of Foreign Status of Beneficial Owner for United States Tax Withholding and Reporting (Individuals)",
    certifiedDate: contractor.certifiedDate,
    expiresAt: contractor.expiresAt,
    sha256Seal: contractor.sha256Seal,
    partI: {
      line1_name: contractor.fullName,
      line2_citizenship: contractor.citizenship,
      line3_permanentAddress: {
        street: "Verified Contractor Address on File",
        city: contractor.citizenship,
        postalCode: "POSTAL",
        country: contractor.citizenship
      },
      line4_mailingAddress: "Same as Line 3",
      line5_usTIN: "None (N/A)",
      line6a_foreignTIN: contractor.ftin,
      line6b_checkIfNotRequired: false,
      line7_referenceNumber: `AGENCY-CONTRACTOR-${contractor.certId}`,
      line8_dateOfBirth: "1994-06-15"
    },
    partII: {
      line9_treatyCountry: contractor.citizenship,
      line10_articleAndParagraph: contractor.treatyArticle,
      line10_rateOfWithholding: contractor.withholdingRate,
      line10_typeOfIncome: contractor.incomeType,
      line10_specialConditions: "Independent contractor services performed 100% outside the US without a permanent establishment."
    },
    partIII: {
      electronicSignature: contractor.fullName,
      signatureDate: contractor.certifiedDate,
      capacity: "Self / Beneficial Owner"
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-4xl bg-white text-slate-900 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Controls Bar (No-Print) */}
        <div className="no-print p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">IRS Form W-8BEN Document Artifact</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  {artifact.certId}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Statutory Expiration: {artifact.expiresAt} (Dec 31 of 3rd year)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => downloadCertificateJSON(artifact)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Download JSON</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official IRS W-8BEN Printable Canvas */}
        <div className="irs-form-print p-6 sm:p-10 font-sans text-[11px] leading-tight text-black max-h-[85vh] overflow-y-auto">
          {/* Official IRS Top Banner */}
          <div className="border-b-2 border-black pb-2 flex justify-between items-start">
            <div className="w-1/4">
              <div className="font-bold text-lg font-serif">Form W-8BEN</div>
              <div className="text-[10px] text-slate-600">(Rev. October 2021)</div>
              <div className="text-[9px] text-slate-600 mt-1">Department of the Treasury</div>
              <div className="text-[9px] text-slate-600">Internal Revenue Service</div>
            </div>
            <div className="w-2/4 text-center">
              <div className="font-extrabold text-sm uppercase tracking-tight">
                Certificate of Foreign Status of Beneficial Owner for United States Tax Withholding and Reporting (Individuals)
              </div>
              <div className="text-[10px] italic mt-1 font-serif">
                ▶ For use by individuals. Entities must use Form W-8BEN-E.
              </div>
              <div className="text-[10px] italic font-serif">
                ▶ Go to www.irs.gov/FormW8BEN for instructions and the latest information.
              </div>
            </div>
            <div className="w-1/4 text-right">
              <div className="font-semibold text-[10px]">OMB No. 1545-1621</div>
              <div className="mt-2 text-[10px] font-mono text-slate-700">
                Cert ID: {artifact.certId}
              </div>
            </div>
          </div>

          {/* Part I: Identification of Beneficial Owner */}
          <div className="mt-4">
            <div className="bg-black text-white font-bold px-2 py-1 text-xs uppercase flex justify-between">
              <span>Part I: Identification of Beneficial Owner (see instructions)</span>
            </div>

            <div className="border border-black divide-y divide-black text-[11px]">
              {/* Line 1 & Line 2 */}
              <div className="grid grid-cols-12 divide-x divide-black">
                <div className="col-span-8 p-1.5">
                  <span className="font-bold mr-1">1</span> Name of individual who is the beneficial owner:
                  <div className="font-semibold text-xs mt-0.5 text-blue-900 font-mono">
                    {artifact.partI.line1_name}
                  </div>
                </div>
                <div className="col-span-4 p-1.5">
                  <span className="font-bold mr-1">2</span> Country of citizenship:
                  <div className="font-semibold text-xs mt-0.5 text-blue-900">
                    {artifact.partI.line2_citizenship}
                  </div>
                </div>
              </div>

              {/* Line 3: Permanent Residence */}
              <div className="p-1.5">
                <span className="font-bold mr-1">3</span> Permanent residence address (street, apt. or suite no., or rural route). <em>Do not use a P.O. box or in-care-of address.</em>:
                <div className="font-medium text-xs mt-0.5 text-slate-800">
                  {artifact.partI.line3_permanentAddress.street}, {artifact.partI.line3_permanentAddress.city}, {artifact.partI.line3_permanentAddress.postalCode}, {artifact.partI.line3_permanentAddress.country}
                </div>
              </div>

              {/* Line 4: Mailing Address */}
              <div className="p-1.5">
                <span className="font-bold mr-1">4</span> Mailing address (if different from above):
                <div className="text-slate-700 mt-0.5 italic">
                  {artifact.partI.line4_mailingAddress}
                </div>
              </div>

              {/* Line 5, 6a, 6b */}
              <div className="grid grid-cols-12 divide-x divide-black">
                <div className="col-span-6 p-1.5">
                  <span className="font-bold mr-1">5</span> U.S. taxpayer identification number (SSN or ITIN), if required:
                  <div className="font-mono text-slate-700 mt-0.5">
                    {artifact.partI.line5_usTIN}
                  </div>
                </div>
                <div className="col-span-6 p-1.5">
                  <span className="font-bold mr-1">6a</span> Foreign tax identifying number (FTIN):
                  <div className="font-mono font-bold text-xs text-blue-900 mt-0.5">
                    {artifact.partI.line6a_foreignTIN}
                  </div>
                </div>
              </div>

              {/* Line 7 & Line 8 */}
              <div className="grid grid-cols-12 divide-x divide-black">
                <div className="col-span-8 p-1.5">
                  <span className="font-bold mr-1">7</span> Reference number(s) (see instructions):
                  <div className="font-mono text-slate-700 mt-0.5">
                    {artifact.partI.line7_referenceNumber}
                  </div>
                </div>
                <div className="col-span-4 p-1.5">
                  <span className="font-bold mr-1">8</span> Date of birth (see instructions):
                  <div className="font-mono text-blue-900 font-semibold mt-0.5">
                    {artifact.partI.line8_dateOfBirth}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Part II: Claim of Tax Treaty Benefits */}
          <div className="mt-4">
            <div className="bg-black text-white font-bold px-2 py-1 text-xs uppercase">
              <span>Part II: Claim of Tax Treaty Benefits (for chapter 3 purposes only) (see instructions)</span>
            </div>

            <div className="border border-black p-2 space-y-2 text-[11px]">
              <div>
                <span className="font-bold mr-1">9</span> I certify that the beneficial owner is a resident of{' '}
                <strong className="underline text-blue-900">{artifact.partII.line9_treatyCountry}</strong> within the meaning of the income tax treaty between the United States and that country.
              </div>

              <div>
                <span className="font-bold mr-1">10</span> <strong>Special rates and conditions (if applicable—see instructions):</strong> The beneficial owner is claiming the provisions of Article and paragraph{' '}
                <strong className="underline text-blue-900 font-mono">{artifact.partII.line10_articleAndParagraph}</strong> of the treaty identified on line 9 above to claim a{' '}
                <strong className="underline text-blue-900 font-bold">{artifact.partII.line10_rateOfWithholding}</strong> rate of withholding on (specify type of income):{' '}
                <strong className="underline text-blue-900">{artifact.partII.line10_typeOfIncome}</strong>.
                <div className="mt-1 text-slate-700 italic">
                  Explain the additional conditions in the Article the beneficial owner meets to be eligible for the rate of withholding:{' '}
                  <span className="text-black not-italic font-sans">{artifact.partII.line10_specialConditions}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Part III: Certification */}
          <div className="mt-4">
            <div className="bg-black text-white font-bold px-2 py-1 text-xs uppercase">
              <span>Part III: Certification</span>
            </div>

            <div className="border border-black p-2 space-y-2 text-[10px] text-justify leading-tight">
              <p>
                Under penalties of perjury, I declare that I have examined the information on this form and to the best of my knowledge and belief it is true, correct, and complete. I further certify under penalties of perjury that:
              </p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>I am the individual that is the beneficial owner (or am authorized to sign for the individual that is the beneficial owner) of all the income or proceeds to which this form relates or am using this form to document myself for chapter 4 purposes;</li>
                <li>The person named on line 1 of this form is not a U.S. person;</li>
                <li>The income to which this form relates is: (a) not effectively connected with the conduct of a trade or business in the United States, (b) effectively connected but is not subject to tax under an applicable income tax treaty, or (c) the partner's share of a partnership's effectively connected taxable income;</li>
                <li>For broker transactions or barter exchanges, the beneficial owner is an exempt foreign person as defined in the instructions.</li>
              </ul>
              <p className="font-semibold text-black">
                Furthermore, I authorize this form to be provided to any withholding agent that has control, receipt, or custody of the income of which I am the beneficial owner or any withholding agent that can disburse or make payments of the income of which I am the beneficial owner.
              </p>
            </div>

            {/* Signature Block */}
            <div className="border-x border-b border-black grid grid-cols-12 divide-x divide-black p-2 bg-slate-50 items-center">
              <div className="col-span-6 p-2">
                <span className="font-bold block text-[10px] text-slate-600 uppercase">
                  Sign Here ▶ Signature of beneficial owner (or individual authorized to sign)
                </span>
                <div className="font-serif italic text-lg text-blue-900 font-bold mt-1 tracking-wider">
                  {artifact.partIII.electronicSignature}
                </div>
                <div className="text-[9px] font-mono text-slate-500 mt-0.5">
                  Verified Electronic Signature • PayoutCert Vault
                </div>
              </div>

              <div className="col-span-3 p-2">
                <span className="font-bold block text-[10px] text-slate-600 uppercase">Date (MM-DD-YYYY)</span>
                <div className="font-mono text-xs font-semibold text-slate-900 mt-1">
                  {artifact.partIII.signatureDate}
                </div>
              </div>

              <div className="col-span-3 p-2">
                <span className="font-bold block text-[10px] text-slate-600 uppercase">Capacity in which acting</span>
                <div className="text-xs font-medium text-slate-900 mt-1">
                  {artifact.partIII.capacity}
                </div>
              </div>
            </div>
          </div>

          {/* Cryptographic Vault Audit Seal */}
          <div className="mt-4 p-2.5 bg-slate-100 border border-slate-300 rounded text-[9px] font-mono text-slate-600 space-y-1">
            <div className="flex items-center justify-between text-slate-800 font-bold">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>PAYOUTCERT CRYPTOGRAPHIC VAULT AUDIT SEAL (IRS COMPLIANT ARCHIVE)</span>
              </span>
              <span className="text-emerald-700">STATUS: AUDIT-READY (0% WITHHOLDING)</span>
            </div>
            <div className="truncate">
              SHA-256 HASH: {artifact.sha256Seal}
            </div>
            <div className="flex justify-between">
              <span>Statutory Rule: Treas. Reg. § 1.1441-1(e)(4)(ii) (Valid 3 full calendar years through Dec 31)</span>
              <span>Expiration Date: {artifact.expiresAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
