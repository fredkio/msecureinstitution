import React, { useState } from 'react';
import { useInstitution } from '../context/InstitutionContext';
import {
  CheckCircle,
  Clock,
  ShieldCheck,
  Ticket,
  ScrollText,
  UserCheck,
  AlertTriangle,
  RotateCcw,
  Calendar,
  Plus,
  ArrowRight
} from 'lucide-react';

export const ApprovalsView: React.FC = () => {
  const {
    tradesList,
    correspondenceList,
    sensitiveRequestsList,
    delegationsList,
    approveTradeSupervisor,
    confirmTradeCounterparty,
    approveCorrespondence,
    issueCorrespondence,
    approveSensitiveAccess,
    rejectSensitiveAccess,
    createDelegation,
    revokeDelegation,
    openStepUpAuth,
    activePersona,
    activeInstitution
  } = useInstitution();

  const [activeTab, setActiveTab] = useState<'MY_REQUESTS' | 'AWAITING_APPROVAL' | 'COMPLETED' | 'RETURNED' | 'DELEGATIONS'>('AWAITING_APPROVAL');
  const [isDelegationModalOpen, setIsDelegationModalOpen] = useState(false);
  const [delegateeId, setDelegateeId] = useState('grace_mohammed');
  const [delegationScope, setDelegationScope] = useState('CORRESPONDENCE_AUTHORIZER');
  const [delegationDays, setDelegationDays] = useState('14');

  const pendingSupervisorTrades = tradesList.filter(t => t.status === 'PENDING_SUPERVISOR_APPROVAL');
  const pendingCounterpartyTrades = tradesList.filter(t =>
    t.status === 'PENDING_COUNTERPARTY_CONFIRMATION' &&
    (t.sellerInstitutionId === activeInstitution.id || t.buyerInstitutionId === activeInstitution.id)
  );

  const pendingCorrespondence = correspondenceList.filter(c => c.status === 'PENDING_APPROVAL');
  const pendingSensitive = sensitiveRequestsList.filter(s => s.status === 'PENDING_CHECKER');

  const totalPending = pendingSupervisorTrades.length + pendingCounterpartyTrades.length + pendingCorrespondence.length + pendingSensitive.length;

  const handleApproveSupervisorTrade = (tradeId: string) => {
    openStepUpAuth(
      `Supervisor Trade Approval: ${tradeId}`,
      `Approving high-value trade exceeding dealer limit. This commits ${activeInstitution.legalName} to settlement obligations.`,
      () => approveTradeSupervisor(tradeId)
    );
  };

  const handleApproveCounterpartyTrade = (tradeId: string) => {
    confirmTradeCounterparty(tradeId);
  };

  const handleApproveCorrespondence = (corrId: string) => {
    openStepUpAuth(
      `Executive Mandate Seal: ${corrId}`,
      `Affixing institutional digital signature to issue this official correspondence.`,
      () => {
        approveCorrespondence(corrId);
        issueCorrespondence(corrId);
      }
    );
  };

  const handleCreateDelegationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createDelegation({
      delegateePersonaId: delegateeId as any,
      scope: delegationScope as any,
      startDate: '2026-09-01',
      endDate: '2026-09-15',
      reason: 'Executive travel coverage.'
    });
    setIsDelegationModalOpen(false);
  };

  return (
    <div className="p-8 space-y-6 text-slate-900 max-w-7xl mx-auto overflow-y-auto">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">Requests & Approvals</h1>
        <p className="text-xs text-slate-500 font-normal">
          Maker-checker inbox for interbank trade ticket approvals, supervisor limit escalations, correspondence mandates, and delegations.
        </p>
      </div>

      {/* Horizontal Underline Tabs */}
      <div className="flex items-center space-x-8 border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('MY_REQUESTS')}
          className={`pb-2.5 transition cursor-pointer ${
            activeTab === 'MY_REQUESTS'
              ? 'border-b-2 border-[#05362a] text-[#05362a] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          My Dispatched Requests
        </button>

        <button
          onClick={() => setActiveTab('AWAITING_APPROVAL')}
          className={`pb-2.5 transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'AWAITING_APPROVAL'
              ? 'border-b-2 border-[#05362a] text-[#05362a] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Awaiting My Approval</span>
          {totalPending > 0 && (
            <span className="px-1.5 py-0.2 bg-amber-100 text-amber-900 rounded-full text-[10px] font-bold">
              {totalPending}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('COMPLETED')}
          className={`pb-2.5 transition cursor-pointer ${
            activeTab === 'COMPLETED'
              ? 'border-b-2 border-[#05362a] text-[#05362a] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Completed
        </button>

        <button
          onClick={() => setActiveTab('RETURNED')}
          className={`pb-2.5 transition cursor-pointer ${
            activeTab === 'RETURNED'
              ? 'border-b-2 border-[#05362a] text-[#05362a] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Returned
        </button>

        <button
          onClick={() => setActiveTab('DELEGATIONS')}
          className={`pb-2.5 transition cursor-pointer ${
            activeTab === 'DELEGATIONS'
              ? 'border-b-2 border-[#05362a] text-[#05362a] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Delegated Mandates ({delegationsList.length})
        </button>
      </div>

      {activeTab === 'AWAITING_APPROVAL' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-6">REQUEST TYPE & REF</th>
                  <th className="py-3 px-4">COUNTERPARTY / ENTITY</th>
                  <th className="py-3 px-4">INITIATOR</th>
                  <th className="py-3 px-4">DATE</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-6 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {/* Pending Counterparty Trade Ticket Approvals */}
                {pendingCounterpartyTrades.map((t) => (
                  <tr key={t.id} className="hover:bg-[#05362a]/5 transition bg-emerald-50/30 font-medium">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-950 flex items-center gap-1.5">
                        <Ticket className="w-4 h-4 text-emerald-800" />
                        <span>Incoming Trade Ticket Approval: {t.instrument}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        Ref: {t.id} • Nominal ₦{(t.amountNgn/1e9).toFixed(2)}B @ {t.yieldRate}%
                      </div>
                    </td>

                    <td className="py-4 px-4 text-slate-900 font-semibold">
                      {t.buyerInstitutionId === activeInstitution.id ? t.sellerInstitutionName : t.buyerInstitutionName}
                    </td>

                    <td className="py-4 px-4 text-slate-700 font-medium">
                      {t.buyerDealerName} ({t.buyerInstitutionName.split(' ')[0]})
                    </td>

                    <td className="py-4 px-4 text-slate-600 font-mono">
                      {t.tradeDate}
                    </td>

                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-300 rounded-full text-xs font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                        <span>Awaiting Counterparty Approval</span>
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleApproveCounterpartyTrade(t.id)}
                        className="px-4 py-1.5 bg-[#05362a] hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition flex items-center gap-1 float-right"
                      >
                        <span>Confirm & Approve Ticket →</span>
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Pending High-Value Trades (Supervisor Approval) */}
                {pendingSupervisorTrades.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900">{t.instrument}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {t.id} • Nominal ₦{(t.amountNgn/1e9).toFixed(2)}B @ {t.yieldRate}% (Exceeds Limit)
                      </div>
                    </td>

                    <td className="py-4 px-4 text-slate-700 font-medium">
                      {t.sellerInstitutionName}
                    </td>

                    <td className="py-4 px-4 text-slate-700 font-medium">
                      {t.buyerDealerName} — Treasury Dealer
                    </td>

                    <td className="py-4 px-4 text-slate-600 font-mono">
                      {t.tradeDate}
                    </td>

                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-800 border border-rose-200/70 rounded-full text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        <span>Supervisor Approval Required</span>
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleApproveSupervisorTrade(t.id)}
                        className="text-[#05362a] font-bold text-xs hover:text-emerald-700 transition cursor-pointer"
                      >
                        Review & Approve →
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Pending Correspondence Mandates */}
                {pendingCorrespondence.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900">{c.subject}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">{c.reference} • {c.classification}</div>
                    </td>

                    <td className="py-4 px-4 text-slate-700 font-medium">
                      {c.destinationInstitutionName}
                    </td>

                    <td className="py-4 px-4 text-slate-700 font-medium">
                      {c.preparedBy.name} — {c.preparedBy.title}
                    </td>

                    <td className="py-4 px-4 text-slate-600 font-mono">
                      {c.effectiveDate}
                    </td>

                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200/70 rounded-full text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>Awaiting Approval</span>
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleApproveCorrespondence(c.id)}
                        className="text-[#05362a] font-bold text-xs hover:text-emerald-700 transition cursor-pointer"
                      >
                        Sign & Issue →
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Pending Sensitive Access Requests */}
                {pendingSensitive.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900">{req.changeType.replace('_', ' ')}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">{req.id} • {req.details}</div>
                    </td>

                    <td className="py-4 px-4 text-slate-700 font-medium">
                      {activeInstitution.legalName}
                    </td>

                    <td className="py-4 px-4 text-slate-700 font-medium">
                      {req.requestedBy}
                    </td>

                    <td className="py-4 px-4 text-slate-600 font-mono">
                      2026-08-30
                    </td>

                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200/70 rounded-full text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>Awaiting Checker</span>
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => approveSensitiveAccess(req.id)}
                        className="text-[#05362a] font-bold text-xs hover:text-emerald-700 transition cursor-pointer"
                      >
                        Review →
                      </button>
                    </td>
                  </tr>
                ))}

                {totalPending === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      No pending requests awaiting your approval.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'DELEGATIONS' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-900">Configured Delegated Authorities</h3>
            <button
              onClick={() => setIsDelegationModalOpen(true)}
              className="px-3.5 py-1.5 bg-[#05362a] hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
            >
              + Create Temporary Delegation
            </button>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {delegationsList.map((del) => (
                <div key={del.id} className="p-5 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900">{del.delegatorName}</span>
                      <span className="text-slate-400">delegated</span>
                      <span className="font-bold text-[#05362a] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {del.scope}
                      </span>
                      <span className="text-slate-400">to</span>
                      <span className="font-bold text-slate-900">{del.delegateeName}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Period: <span className="font-mono">{del.startDate} — {del.endDate}</span> • Reason: {del.reason}
                    </div>
                  </div>

                  {del.status === 'ACTIVE' && (
                    <button
                      onClick={() => revokeDelegation(del.id)}
                      className="px-3 py-1 text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg font-semibold text-xs cursor-pointer"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Delegation Modal */}
      {isDelegationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">Grant Temporary Delegated Authority</h3>
              <button onClick={() => setIsDelegationModalOpen(false)} className="text-slate-400 hover:text-slate-800">✕</button>
            </div>

            <form onSubmit={handleCreateDelegationSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Delegate Authority To (Delegatee)</label>
                <select
                  value={delegateeId}
                  onChange={(e) => setDelegateeId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
                >
                  <option value="grace_mohammed">Grace Mohammed (Principal Finance Officer)</option>
                  <option value="ibrahim_musa">Ibrahim Musa (Government Banking Officer)</option>
                  <option value="chika_eze">Chika Eze (Payments Operations Lead)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Mandate Scope</label>
                <select
                  value={delegationScope}
                  onChange={(e) => setDelegationScope(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
                >
                  <option value="CORRESPONDENCE_AUTHORIZER">Correspondence Authorizer (Digital Seal)</option>
                  <option value="TRADE_SUPERVISOR_APPROVAL">Trade Supervisor Authority (&gt;₦2.0B)</option>
                  <option value="OPERATIONS_SIGN_OFF">Operations Settlement Sign-off</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Validity Duration (Days)</label>
                <input
                  type="number"
                  value={delegationDays}
                  onChange={(e) => setDelegationDays(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDelegationModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#05362a] hover:bg-emerald-900 text-white font-bold rounded-xl shadow cursor-pointer"
                >
                  Activate Delegation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
