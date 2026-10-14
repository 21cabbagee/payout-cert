import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ContractorVault } from './components/ContractorVault';
import { TaxTreatyMatrix } from './components/TaxTreatyMatrix';
import { PricingSection } from './components/PricingSection';
import { Footer } from './components/Footer';
import { W8BENWizardModal } from './components/W8BENWizardModal';
import { W8BENViewerModal } from './components/W8BENViewerModal';
import { CABModal } from './components/CABModal';
import OutcomeChart from './components/OutcomeChart';
import { MOCK_CONTRACTORS } from './data/mockContractors';
import { Check, ShieldCheck } from 'lucide-react';

export default function App() {
  const [contractors, setContractors] = useState(MOCK_CONTRACTORS);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [cabOpen, setCabOpen] = useState(false);
  const [viewerContractor, setViewerContractor] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleCopyIntakeLink = () => {
    const intakeUrl = `${window.location.origin}${window.location.pathname}#/onboard/apex-digital`;
    navigator.clipboard.writeText(intakeUrl).then(() => {
      setCopiedLink(true);
      showToast("Contractor onboarding portal link copied to clipboard!");
      setTimeout(() => setCopiedLink(false), 2500);
    }).catch(() => {
      setCopiedLink(true);
      showToast("Contractor onboarding portal link copied!");
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleCompleteWizard = (newContractor) => {
    setContractors([newContractor, ...contractors]);
    showToast(`Form W-8BEN certified for ${newContractor.fullName} (0% Withholding)`);
    // Automatically open the IRS viewer for inspection!
    setViewerContractor(newContractor);
  };

  const handleScrollToVault = () => {
    const el = document.getElementById('vault-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToTreaty = () => {
    const el = document.getElementById('treaty-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-emerald-500/40 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main App Layout */}
      <Header
        onOpenWizard={() => setWizardOpen(true)}
        onOpenCAB={() => setCabOpen(true)}
        onScrollToVault={handleScrollToVault}
        onScrollToTreaty={handleScrollToTreaty}
      />

      <main className="flex-1">
        <Hero
          onOpenWizard={() => setWizardOpen(true)}
          onOpenCAB={() => setCabOpen(true)}
          onScrollToVault={handleScrollToVault}
          onScrollToTreaty={handleScrollToTreaty}
        />

        {/* Julien Bek $1:$6 Economic Engine / Larry Ellison SLA Proof */}
        <OutcomeChart onCtaClick={() => setCabOpen(true)} />

        <ContractorVault
          contractors={contractors}
          onViewW8BEN={(c) => setViewerContractor(c)}
          onOpenWizard={() => setWizardOpen(true)}
          onCopyIntakeLink={handleCopyIntakeLink}
          copiedLink={copiedLink}
        />

        <TaxTreatyMatrix
          onOpenWizard={() => setWizardOpen(true)}
        />

        <PricingSection
          onOpenWizard={() => setWizardOpen(true)}
          onOpenCAB={() => setCabOpen(true)}
        />
      </main>

      <Footer
        onOpenWizard={() => setWizardOpen(true)}
        onOpenCAB={() => setCabOpen(true)}
        onScrollToVault={handleScrollToVault}
        onScrollToTreaty={handleScrollToTreaty}
      />

      {/* Modals */}
      <W8BENWizardModal
        isOpen={wizardOpen}
        onClose={() => setWizardOpen(false)}
        onComplete={handleCompleteWizard}
      />

      <W8BENViewerModal
        contractor={viewerContractor}
        isOpen={!!viewerContractor}
        onClose={() => setViewerContractor(null)}
      />

      <CABModal
        isOpen={cabOpen}
        onClose={() => setCabOpen(false)}
      />
    </div>
  );
}
