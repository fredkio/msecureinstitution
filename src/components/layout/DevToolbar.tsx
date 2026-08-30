import React from 'react';
import { useInstitution } from '../../context/InstitutionContext';
import { InstitutionId, PersonaId } from '../../types/institution';
import { Eye, ArrowLeftRight, FlaskConical, RotateCcw, ShieldCheck, UserCheck } from 'lucide-react';

export const DevToolbar: React.FC = () => {
  const {
    activeInstitutionId,
    activePersonaId,
    availablePersonasInActiveInst,
    switchInstitution,
    switchPersona,
    switchCounterpartyPerspective,
    setIsScenarioLabOpen,
    resetAllState
  } = useInstitution();

  const getCounterpartySuggestion = () => {
    switch (activeInstitutionId) {
      case 'MERIDIAN_BANK':
        return { label: 'Summit Bank', instId: 'SUMMIT_BANK' as InstitutionId, personaId: 'ngozi_umeh' as PersonaId };
      case 'SUMMIT_BANK':
        return { label: 'Meridian Bank', instId: 'MERIDIAN_BANK' as InstitutionId, personaId: 'tunde_adebayo' as PersonaId };
      case 'HORIZON_MFB':
        return { label: 'Meridian Bank', instId: 'MERIDIAN_BANK' as InstitutionId, personaId: 'chika_eze' as PersonaId };
      case 'FRSA':
        return { label: 'Meridian Bank', instId: 'MERIDIAN_BANK' as InstitutionId, personaId: 'ibrahim_musa' as PersonaId };
    }
  };

  const counterparty = getCounterpartySuggestion();

  return (
    <header role="region" aria-label="Prototype testing control bar" className="bg-[#03261e] text-emerald-100 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-3 border-b border-emerald-800/40 z-40 select-none">
      <div className="flex items-center space-x-2">
        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-mono font-bold uppercase rounded border border-emerald-500/30 text-[10px] tracking-wider flex items-center gap-1">
          <Eye className="w-3 h-3 text-emerald-400" /> PROTOTYPE CONTROL BAR
        </span>
        <span className="text-emerald-300/70 hidden lg:inline text-[11px]">
          Live switcher for participating institutions & multi-tier personas
        </span>
      </div>

      <div className="flex items-center flex-wrap gap-2">
        {/* VIEW AS INSTITUTION */}
        <div className="flex items-center bg-[#06382c] border border-emerald-700/50 rounded-lg px-2 py-1 shadow-inner">
          <label htmlFor="dev-institution-select" className="text-emerald-300/80 font-semibold mr-1.5 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] uppercase tracking-wide">INSTITUTION:</span>
          </label>
          <select
            id="dev-institution-select"
            value={activeInstitutionId}
            onChange={(e) => switchInstitution(e.target.value as InstitutionId)}
            className="bg-transparent text-white font-medium focus:outline-none cursor-pointer pr-1 text-xs"
          >
            <option value="MERIDIAN_BANK" className="bg-[#06382c] text-white">Meridian Bank Plc (Commercial Bank)</option>
            <option value="SUMMIT_BANK" className="bg-[#06382c] text-white">Summit Bank Plc (Commercial Bank)</option>
            <option value="HORIZON_MFB" className="bg-[#06382c] text-white">Horizon Microfinance Bank (OFI)</option>
            <option value="FRSA" className="bg-[#06382c] text-white">Federal Revenue Services Agency (MDA)</option>
          </select>
        </div>

        {/* VIEW AS USER */}
        <div className="flex items-center bg-[#06382c] border border-emerald-700/50 rounded-lg px-2 py-1 shadow-inner">
          <label htmlFor="dev-persona-select" className="text-emerald-300/80 font-semibold mr-1.5 flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] uppercase tracking-wide">USER:</span>
          </label>
          <select
            id="dev-persona-select"
            value={activePersonaId}
            onChange={(e) => switchPersona(e.target.value as PersonaId)}
            className="bg-transparent text-white font-medium focus:outline-none cursor-pointer pr-1 text-xs"
          >
            {availablePersonasInActiveInst.map((p) => (
              <option key={p.id} value={p.id} className="bg-[#06382c] text-white">
                {p.name} — {p.title} {p.tradeLimitNgn ? `(Limit: ₦${(p.tradeLimitNgn/1e9).toFixed(1)}B)` : ''}
              </option>
            ))}
          </select>
        </div>

        {/* FAST COUNTERPARTY PERSPECTIVE SWITCH */}
        <button
          onClick={() => switchCounterpartyPerspective(counterparty.instId, counterparty.personaId)}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-700/40 hover:bg-emerald-700/60 text-emerald-100 border border-emerald-600/50 rounded-lg font-medium transition cursor-pointer text-xs"
          title={`Jump to ${counterparty.label}`}
        >
          <ArrowLeftRight className="w-3.5 h-3.5 text-emerald-300" />
          <span>VIEW COUNTERPARTY ({counterparty.label})</span>
        </button>

        {/* SCENARIO LAB TRIGGER */}
        <button
          onClick={() => setIsScenarioLabOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg font-semibold transition cursor-pointer text-xs"
        >
          <FlaskConical className="w-3.5 h-3.5 text-amber-400" />
          <span>SCENARIO LAB</span>
        </button>

        {/* RESET STATE */}
        <button
          onClick={resetAllState}
          className="p-1 text-emerald-400 hover:text-emerald-100 hover:bg-[#06382c] rounded-lg transition cursor-pointer"
          title="Reset all demo data"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
