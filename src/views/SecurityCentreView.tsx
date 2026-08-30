import React from 'react';
import { useInstitution } from '../context/InstitutionContext';
import {
  ShieldAlert,
  Key,
  Smartphone,
  Laptop,
  CheckCircle,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Lock
} from 'lucide-react';

export const SecurityCentreView: React.FC = () => {
  const { activePersona, activeInstitution } = useInstitution();

  return (
    <div className="p-8 space-y-6 text-slate-900 max-w-7xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">Security Centre</h1>
        <p className="text-xs text-slate-500 mt-1">
          Cryptographic token health • MFA device registration • Institutional session posture
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Signatory MFA Status */}
        <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-950">Step-Up MFA Posture</h3>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-full text-xs font-mono font-bold">
              ENFORCED ✓
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Key className="w-4 h-4 text-amber-600" />
                <span className="font-semibold text-slate-900">FIDO2 Hardware Key</span>
              </div>
              <span className="text-[#05362a] font-bold">Active</span>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-slate-900">Institutional Authenticator</span>
              </div>
              <span className="text-[#05362a] font-bold">Paired</span>
            </div>
          </div>
        </div>

        {/* Registered Workstations */}
        <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-950">Authorized Workstations</h3>
            <span className="text-xs text-slate-400 font-mono">1 Device</span>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs space-y-1">
            <div className="flex items-center space-x-2 text-slate-900 font-bold">
              <Laptop className="w-4 h-4 text-[#05362a]" />
              <span>Treasury Trading Terminal (WIN-DESK-8812)</span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              IP: 192.168.10.45 • Mutual TLS Certificate Valid
            </div>
          </div>
        </div>

        {/* Security Audit Score */}
        <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-950">Security Index</h3>
            <span className="text-2xl font-black font-mono text-[#05362a]">99.8%</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            All high-value operations and official correspondence adhere to CBN Cybersecurity Framework & National Institutional Mandate guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};
