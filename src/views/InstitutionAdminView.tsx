import React, { useState } from 'react';
import { useInstitution } from '../context/InstitutionContext';
import { PersonaId } from '../types/institution';
import {
  Users2,
  ShieldCheck,
  KeyRound,
  UserCheck,
  UserX,
  Plus,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Lock,
  Search
} from 'lucide-react';

export const InstitutionAdminView: React.FC = () => {
  const {
    activeInstitution,
    availablePersonasInActiveInst,
    proposeSensitiveAccess,
    suspendUser,
    reactivateUser,
    activePersona
  } = useInstitution();

  const [adminTab, setAdminTab] = useState<'USERS' | 'ACCESS_REVIEW' | 'LIMITS'>('USERS');
  const [selectedUserForLimit, setSelectedUserForLimit] = useState<PersonaId>('tunde_adebayo');
  const [newLimitNgn, setNewLimitNgn] = useState('5000000000');

  const handleProposeLimitChange = (e: React.FormEvent) => {
    e.preventDefault();
    const user = availablePersonasInActiveInst.find(p => p.id === selectedUserForLimit);
    proposeSensitiveAccess({
      targetPersonaId: selectedUserForLimit,
      targetPersonaName: user?.name || 'Tunde Adebayo',
      changeType: 'INCREASE_TRADE_LIMIT',
      details: `Propose adjustment of trading limit to ₦${(parseFloat(newLimitNgn)/1e9).toFixed(1)} Billion based on executive treasury mandate.`
    });
  };

  return (
    <div className="p-8 space-y-6 text-slate-900 max-w-7xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">Administration & Governance</h1>
          <p className="text-xs text-slate-500 mt-1">
            Identity lifecycle (Joiner / Mover / Leaver) • Access certification • Dual-control threshold management
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setAdminTab('USERS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              adminTab === 'USERS' ? 'bg-[#05362a] text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            User Registry
          </button>
          <button
            onClick={() => setAdminTab('ACCESS_REVIEW')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              adminTab === 'ACCESS_REVIEW' ? 'bg-[#05362a] text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Access Certification
          </button>
          <button
            onClick={() => setAdminTab('LIMITS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              adminTab === 'LIMITS' ? 'bg-[#05362a] text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Limits & Dual Control
          </button>
        </div>
      </div>

      {adminTab === 'USERS' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-900">
              Authorized Institution Personnel ({availablePersonasInActiveInst.length})
            </h3>
            <span className="text-xs text-slate-400">Privacy Notice: Admins cannot view private message content</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-6">USER & ROLE</th>
                  <th className="py-3 px-4">DEPARTMENT / TEAM</th>
                  <th className="py-3 px-4">ENTITLEMENTS</th>
                  <th className="py-3 px-4">AUTHORITY LIMIT</th>
                  <th className="py-3 px-6 text-right">LIFECYCLE ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {availablePersonasInActiveInst.map((persona) => (
                  <tr key={persona.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900">{persona.name}</div>
                      <div className="text-[11px] text-slate-500">{persona.email}</div>
                    </td>

                    <td className="py-4 px-4 text-slate-700">
                      <div className="font-medium">{persona.department}</div>
                      <div className="text-[11px] text-slate-400">{persona.team}</div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-[10px] text-slate-700 font-bold font-mono">
                        {persona.roleType}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-mono font-bold text-[#05362a]">
                      {persona.tradeLimitNgn ? `₦${(persona.tradeLimitNgn/1e9).toFixed(1)}B` : 'N/A'}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => suspendUser(persona.id)}
                        className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-[11px] font-bold transition cursor-pointer"
                      >
                        Suspend (Leaver)
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {adminTab === 'ACCESS_REVIEW' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Periodic Access Certification</h3>
              <p className="text-xs text-slate-500 mt-0.5">Quarterly compliance attestation of financial authorizations</p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-full text-xs font-mono font-bold">
              Q3 2026 AUDIT CYCLE: OPEN
            </span>
          </div>

          <div className="space-y-3">
            {availablePersonasInActiveInst.map((persona) => (
              <div key={persona.id} className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{persona.name} — {persona.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                    Services: {persona.allowedServices.join(', ')}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#05362a] border border-emerald-300 rounded-xl font-bold text-xs transition cursor-pointer">
                    Keep Access (Certified ✓)
                  </button>
                  <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer">
                    Modify
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {adminTab === 'LIMITS' && (
        <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-6 shadow-sm max-w-xl">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Propose Authority Limit Modification (Dual Control)</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Admin A creates proposal → Admin B (Checker) approves in Requests & Approvals queue.
            </p>
          </div>

          <form onSubmit={handleProposeLimitChange} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Select Dealer</label>
              <select
                value={selectedUserForLimit}
                onChange={(e) => setSelectedUserForLimit(e.target.value as PersonaId)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
              >
                {availablePersonasInActiveInst.filter(p => p.canTrade).map(p => (
                  <option key={p.id} value={p.id}>{p.name} (Current: ₦{((p.tradeLimitNgn||0)/1e9).toFixed(1)}B)</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Proposed Face Value Limit (NGN)</label>
              <input
                type="number"
                value={newLimitNgn}
                onChange={(e) => setNewLimitNgn(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono text-sm"
              />
              <div className="text-slate-500 font-mono mt-1">≈ ₦{(parseFloat(newLimitNgn)/1e9).toFixed(1)} Billion</div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#05362a] hover:bg-emerald-900 text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Submit to Maker-Checker Queue</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
