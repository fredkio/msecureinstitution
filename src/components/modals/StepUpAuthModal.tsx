import React, { useState } from 'react';
import { useInstitution } from '../../context/InstitutionContext';
import { ShieldCheck, Key, Lock, CheckCircle, AlertTriangle, X } from 'lucide-react';

export const StepUpAuthModal: React.FC = () => {
  const {
    isStepUpModalOpen,
    stepUpData,
    closeStepUpAuth,
    activePersona,
    activeInstitution
  } = useInstitution();

  const [pinCode, setPinCode] = useState('8832');

  if (!isStepUpModalOpen || !stepUpData) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    stepUpData.onConfirm();
    closeStepUpAuth();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 bg-[#05362a] text-white flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center font-bold text-emerald-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider">
                Step-Up Authentication Required
              </div>
              <h2 className="font-extrabold text-base text-white mt-0.5">{stepUpData.title}</h2>
            </div>
          </div>
          <button
            onClick={closeStepUpAuth}
            className="text-emerald-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleConfirm} className="p-6 space-y-5 text-xs text-slate-800">
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-600 leading-relaxed">
            {stepUpData.prompt}
          </div>

          <div className="space-y-2">
            <div className="font-bold text-slate-900">Signatory:</div>
            <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">{activePersona.name}</div>
                <div className="text-[11px] text-slate-500">{activePersona.title} ({activeInstitution.displayName})</div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-full font-bold text-[10px]">
                Authorized Signatory
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-slate-700 font-bold">Signatory Security PIN / Hardware Token</label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-slate-900 font-mono tracking-widest text-center text-sm font-bold focus:outline-none focus:border-[#05362a]"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={closeStepUpAuth}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition cursor-pointer"
            >
              Decline & Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#05362a] hover:bg-emerald-900 text-white font-bold rounded-xl shadow transition cursor-pointer"
            >
              Authorize & Sign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
