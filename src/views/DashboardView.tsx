import React from 'react';
import { useInstitution } from '../context/InstitutionContext';
import { PersonaId } from '../types/institution';
import {
  TrendingUp,
  FolderLock,
  ScrollText,
  Ticket,
  Mail,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  Send,
  Calendar,
  CheckCircle,
  Building2,
  FileSpreadsheet,
  ArrowRight,
  Users,
  UserCheck,
  KeyRound,
  Lock,
  BadgeCheck
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    activeInstitution,
    activePersona,
    activePersonaId,
    availablePersonasInActiveInst,
    switchPersona,
    setActiveView,
    openComposer,
    marketQuotes,
    tradesList,
    casesList,
    formalMessages,
    correspondenceList
  } = useInstitution();

  const confirmedTrades = tradesList.filter(t => t.status === 'CONFIRMED' || t.status === 'SETTLED');
  const openCases = casesList.filter(c => c.status !== 'CLOSED');
  const pendingApprovals = tradesList.filter(t => t.status === 'PENDING_SUPERVISOR_APPROVAL');
  const activeCorrespondence = correspondenceList.filter(c => c.status !== 'CLOSED');

  const getRoleBadgeColor = (roleType: string) => {
    switch (roleType) {
      case 'DEALER':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'SUPERVISOR':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'OPERATIONS':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'GOVT_OFFICER':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'AUTHORIZER':
      case 'DIRECTOR':
        return 'bg-purple-50 text-purple-900 border-purple-200';
      case 'ADMIN':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="p-8 space-y-8 text-slate-900 max-w-7xl mx-auto overflow-y-auto">
      {/* Top Banner */}
      <div className="bg-[#05362a] text-white rounded-3xl p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold uppercase tracking-wide border border-emerald-400/30">
            <span>{activeInstitution.typeLabel}</span>
            <span>•</span>
            <span className="font-mono">{activeInstitution.rcNumber}</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">{activeInstitution.legalName}</h1>
          <p className="text-emerald-100/80 text-xs max-w-xl leading-relaxed">
            Active Persona: <strong className="text-white">{activePersona.name}</strong> — {activePersona.title} ({activePersona.department} / {activePersona.team})
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <button
            onClick={() => openComposer()}
            className="px-4 py-2.5 bg-[#10b981] hover:bg-[#059669] text-slate-950 font-bold text-xs rounded-xl shadow transition cursor-pointer flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>+ Universal Action</span>
          </button>
          <button
            onClick={() => setActiveView('directory')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition cursor-pointer flex items-center gap-1.5"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Network Directory</span>
          </button>
        </div>
      </div>

      {/* PROMINENT SECTION: ALL USERS & ROLES UNDER THIS INSTITUTION */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#05362a] flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-950">
                Institutional Personnel & Assigned Roles ({availablePersonasInActiveInst.length} Users)
              </h2>
              <p className="text-xs text-slate-500">
                Verified operators, dealers, operations officers, and executive signatories authorized for {activeInstitution.displayName}
              </p>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-[#05362a] border border-emerald-200 rounded-full text-xs font-mono font-bold">
            {activeInstitution.code} ENTITLEMENTS VERIFIED ✓
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">USER & IDENTITY</th>
                <th className="py-3 px-4">DEPARTMENT & TEAM</th>
                <th className="py-3 px-4">ASSIGNED ROLE</th>
                <th className="py-3 px-4">AUTHORITY / LIMIT</th>
                <th className="py-3 px-4">ENTITLED MODULES</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {availablePersonasInActiveInst.map((persona) => {
                const isCurrent = persona.id === activePersonaId;
                return (
                  <tr
                    key={persona.id}
                    className={`transition ${isCurrent ? 'bg-emerald-50/40 font-medium' : 'hover:bg-slate-50/80'}`}
                  >
                    {/* User & Identity */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs shadow-2xs shrink-0 ${
                          isCurrent
                            ? 'bg-[#05362a] text-white'
                            : 'bg-slate-100 text-slate-700 border border-slate-300'
                        }`}>
                          {persona.avatarInitials}
                        </div>
                        <div>
                          <div className="font-bold text-slate-950 flex items-center gap-1.5">
                            <span>{persona.name}</span>
                            {isCurrent && (
                              <span className="px-1.5 py-0.2 bg-emerald-100 text-[#05362a] rounded text-[9px] font-extrabold uppercase">
                                CURRENT
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 font-normal">{persona.title}</div>
                        </div>
                      </div>
                    </td>

                    {/* Department & Team */}
                    <td className="py-3.5 px-4">
                      <div className="text-slate-900 font-semibold">{persona.department}</div>
                      <div className="text-[11px] text-slate-500">{persona.team}</div>
                    </td>

                    {/* Assigned Role */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border ${getRoleBadgeColor(persona.roleType)}`}>
                        <BadgeCheck className="w-3 h-3" />
                        <span>{persona.roleType.replace('_', ' ')}</span>
                      </span>
                    </td>

                    {/* Authority / Limit */}
                    <td className="py-3.5 px-4 font-mono">
                      {persona.tradeLimitNgn ? (
                        <div className="text-[#05362a] font-bold">
                          ₦{(persona.tradeLimitNgn/1e9).toFixed(1)}B <span className="text-[10px] text-slate-500 font-sans font-normal">Dealer Limit</span>
                        </div>
                      ) : persona.canApproveTrades ? (
                        <div className="text-amber-800 font-bold font-sans">
                          ₦10.0B Supervisor Seal
                        </div>
                      ) : persona.canAuthorizeCorrespondence ? (
                        <div className="text-purple-900 font-bold font-sans">
                          Executive Digital Seal
                        </div>
                      ) : (
                        <div className="text-slate-500 font-sans">
                          Operational Sign-off
                        </div>
                      )}
                    </td>

                    {/* Entitled Modules */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {persona.allowedServices.slice(0, 4).map((srv) => (
                          <span key={srv} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[9px] font-mono">
                            {srv}
                          </span>
                        ))}
                        {persona.allowedServices.length > 4 && (
                          <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded text-[9px] font-mono">
                            +{persona.allowedServices.length - 4}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Quick Switch Action */}
                    <td className="py-3.5 px-4 text-right">
                      {isCurrent ? (
                        <span className="text-emerald-700 font-bold text-xs flex items-center justify-end gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Logged In</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => switchPersona(persona.id)}
                          className="px-3 py-1 bg-white hover:bg-emerald-50 text-[#05362a] hover:text-emerald-900 border border-slate-300 hover:border-emerald-500 rounded-lg text-xs font-bold transition cursor-pointer shadow-2xs"
                        >
                          Switch to User →
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4 Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveView(activePersona.canTrade ? 'blotter' : 'inbox')}
          className="p-5 bg-white border border-slate-200/90 hover:border-emerald-600/60 rounded-2xl cursor-pointer transition shadow-xs group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>{activePersona.canTrade ? 'Bilateral Trades' : 'Formal Messages'}</span>
            <div className="p-2 bg-emerald-50 text-[#05362a] rounded-xl group-hover:bg-emerald-100 transition">
              {activePersona.canTrade ? <Ticket className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
            </div>
          </div>
          <div className="text-3xl font-black font-mono text-slate-950 mt-3">
            {activePersona.canTrade ? confirmedTrades.length : formalMessages.length}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            Verified across Network ✓
          </div>
        </div>

        <div
          onClick={() => setActiveView('cases')}
          className="p-5 bg-white border border-slate-200/90 hover:border-amber-600/60 rounded-2xl cursor-pointer transition shadow-xs group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Reconciliation Cases</span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-xl group-hover:bg-amber-100 transition">
              <FolderLock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black font-mono text-slate-950 mt-3">
            {openCases.length}
          </div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1">
            Bilateral resolution queues
          </div>
        </div>

        <div
          onClick={() => setActiveView('correspondence')}
          className="p-5 bg-white border border-slate-200/90 hover:border-purple-600/60 rounded-2xl cursor-pointer transition shadow-xs group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Official Mandates</span>
            <div className="p-2 bg-purple-50 text-purple-700 rounded-xl group-hover:bg-purple-100 transition">
              <ScrollText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black font-mono text-slate-950 mt-3">
            {activeCorrespondence.length}
          </div>
          <div className="text-[11px] text-purple-700 font-semibold mt-1">
            Sealed Institutional Letters
          </div>
        </div>

        <div
          onClick={() => setActiveView('approvals')}
          className="p-5 bg-white border border-slate-200/90 hover:border-blue-600/60 rounded-2xl cursor-pointer transition shadow-xs group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Pending Approvals</span>
            <div className="p-2 bg-blue-50 text-blue-700 rounded-xl group-hover:bg-blue-100 transition">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black font-mono text-slate-950 mt-3">
            {pendingApprovals.length}
          </div>
          <div className="text-[11px] text-blue-700 font-semibold mt-1">
            Maker-Checker queue
          </div>
        </div>
      </div>

      {/* Operational & Market Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols */}
        <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="font-bold text-sm text-slate-950">
                {activePersona.canTrade ? 'Live Interbank Quotation Board' : 'Active Operational Cases'}
              </h2>
              <p className="text-slate-400 text-xs">
                {activePersona.canTrade ? 'Real-time benchmark curves & order book' : 'Bilateral investigation schedules'}
              </p>
            </div>
            <button
              onClick={() => setActiveView(activePersona.canTrade ? 'markets' : 'cases')}
              className="text-xs text-[#05362a] font-bold hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View All →</span>
            </button>
          </div>

          {activePersona.canTrade ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                    <th className="pb-2">INSTRUMENT</th>
                    <th className="pb-2">TENOR</th>
                    <th className="pb-2 text-right">BID YIELD</th>
                    <th className="pb-2 text-right">OFFER YIELD</th>
                    <th className="pb-2 text-right">VOLUME</th>
                    <th className="pb-2 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {marketQuotes.slice(0, 4).map((q) => (
                    <tr key={q.instrument} className="hover:bg-slate-50 transition">
                      <td className="py-3 font-semibold text-slate-900">{q.instrument}</td>
                      <td className="py-3 text-slate-500 font-mono">{q.tenor}</td>
                      <td className="py-3 text-right font-mono font-bold text-emerald-700">{q.bidYield.toFixed(2)}%</td>
                      <td className="py-3 text-right font-mono font-bold text-teal-700">{q.offerYield.toFixed(2)}%</td>
                      <td className="py-3 text-right font-mono text-slate-500">{q.volumeNgn}</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => openComposer('trade', { instrument: q.instrument, yield: q.offerYield })}
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#05362a] border border-emerald-300 rounded-lg text-xs font-bold transition cursor-pointer"
                        >
                          Trade
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="space-y-3">
              {casesList.slice(0, 3).map((c) => (
                <div
                  key={c.id}
                  onClick={() => setActiveView('cases')}
                  className="p-4 bg-slate-50 hover:bg-emerald-50/40 border border-slate-200/80 rounded-xl cursor-pointer transition flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-xs text-[#05362a]">{c.id}</span>
                      <span className="font-bold text-slate-900 text-xs">{c.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {c.originatingInstitutionName} ↔ {c.receivingInstitutionName}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-emerald-700">₦{c.amountNgn?.toLocaleString()}</span>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">{c.status}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Col: Authority & Mandates Box */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-950">Active Session Security</h3>
            <p className="text-slate-400 text-xs">Entitlements & Governance Posture</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl space-y-2.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Authority Threshold:</span>
              <span className="font-mono font-bold text-[#05362a]">
                {activePersona.tradeLimitNgn ? `₦${(activePersona.tradeLimitNgn/1e9).toFixed(1)} Billion` : 'Operational Signatory'}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Desk Limit:</span>
              <span className="font-mono font-bold text-slate-900">₦10.0 Billion</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>MFA Session:</span>
              <span className="text-emerald-700 font-semibold">FIDO2 Hardware Key ✓</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Recent Bilateral Activity</div>
            {tradesList.slice(0, 2).map((t) => (
              <div
                key={t.id}
                onClick={() => setActiveView('blotter')}
                className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/70 rounded-xl cursor-pointer transition text-xs"
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="font-mono text-[#05362a]">{t.id}</span>
                  <span className="text-slate-900 font-mono">₦{(t.amountNgn/1e9).toFixed(1)}B @ {t.yieldRate}%</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1 flex justify-between">
                  <span>{t.sellerInstitutionName}</span>
                  <span className="text-emerald-700 font-semibold">{t.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
