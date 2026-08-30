import React, { useState } from 'react';
import { useInstitution } from '../context/InstitutionContext';
import { InstitutionalCase } from '../types/institution';
import {
  FolderLock,
  CheckCircle,
  Clock,
  Paperclip,
  Plus,
  Send,
  AlertTriangle,
  FileSpreadsheet,
  Building2,
  FileText,
  UserCheck,
  Check,
  X
} from 'lucide-react';

export const CaseManagementView: React.FC = () => {
  const {
    casesList,
    acknowledgeCase,
    assignCase,
    uploadCaseEvidence,
    proposeCaseResolution,
    acceptCaseResolution,
    disputeCaseResolution,
    closeCase,
    openComposer,
    activePersona,
    activeInstitution
  } = useInstitution();

  const [selectedCaseId, setSelectedCaseId] = useState<string>(casesList[0]?.id || 'MSC-CASE-200284');
  const [resolutionText, setResolutionText] = useState('');
  const [refundNgn, setRefundNgn] = useState('1200000');
  const [isProposingResolution, setIsProposingResolution] = useState(false);
  const [evidenceName, setEvidenceName] = useState('');

  const currentCase = casesList.find(c => c.id === selectedCaseId) || casesList[0];

  const handleProposeResolutionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolutionText.trim()) return;
    proposeCaseResolution(currentCase.id, resolutionText, parseFloat(refundNgn) || 0);
    setIsProposingResolution(false);
  };

  const handleEvidenceUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evidenceName.trim()) return;
    uploadCaseEvidence(currentCase.id, evidenceName, '380 KB', 'Attached bilateral investigation audit log.');
    setEvidenceName('');
  };

  return (
    <div className="h-full flex overflow-hidden bg-[#f8fafc] text-slate-900">
      {/* Left: Cases List */}
      <div className="w-96 bg-white border-r border-slate-200 flex flex-col h-full shrink-0">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-base text-slate-900">Case Management</h2>
            <p className="text-xs text-slate-500">Bilateral operational tracking</p>
          </div>
          <button
            onClick={() => openComposer('case')}
            className="px-3 py-1.5 bg-[#05362a] hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
          >
            + Open Case
          </button>
        </div>

        <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
          {casesList.map((c) => {
            const isSelected = c.id === selectedCaseId;
            return (
              <div
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                className={`p-4 cursor-pointer transition text-left text-xs ${
                  isSelected ? 'bg-emerald-50/60 border-l-4 border-[#05362a]' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-bold text-xs text-[#05362a]">{c.id}</span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    c.status === 'CLOSED' ? 'bg-slate-100 text-slate-700' :
                    c.status === 'RESOLUTION_PROPOSED' ? 'bg-blue-50 text-blue-800' :
                    c.status === 'ASSIGNED' || c.status === 'IN_PROGRESS' ? 'bg-amber-50 text-amber-800' :
                    'bg-rose-50 text-rose-800'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>{c.status.replace('_', ' ')}</span>
                  </span>
                </div>

                <div className="font-bold text-slate-900 text-xs truncate mt-1">{c.title}</div>
                <div className="text-[11px] text-slate-500 mt-1 truncate">
                  {c.originatingInstitutionName} ↔ {c.receivingInstitutionName}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                  <span className="text-emerald-700 font-bold">
                    {c.amountNgn ? `₦${(c.amountNgn/1e6).toFixed(1)}M (${c.affectedTransactionsCount || 1} txns)` : ''}
                  </span>
                  <span>{c.type.split('_')[0]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Case Details Canvas */}
      <div className="flex-1 flex flex-col h-full bg-[#f8fafc] overflow-hidden">
        {currentCase ? (
          <>
            {/* Action Ribbon */}
            <div className="px-8 py-4 border-b border-slate-200 bg-white flex items-center justify-between shadow-xs">
              <div className="flex items-center space-x-3">
                <span className="font-mono font-bold text-sm text-[#05362a]">{currentCase.id}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-900 font-bold">{currentCase.title}</span>
              </div>

              <div className="flex items-center space-x-2">
                {currentCase.status === 'NEW' && (
                  <button
                    onClick={() => {
                      acknowledgeCase(currentCase.id);
                      assignCase(currentCase.id, activePersona.id);
                    }}
                    className="px-4 py-2 bg-[#05362a] hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition"
                  >
                    Acknowledge & Accept Case
                  </button>
                )}

                {(currentCase.status === 'ACKNOWLEDGED' || currentCase.status === 'ASSIGNED' || currentCase.status === 'IN_PROGRESS') && (
                  <button
                    onClick={() => {
                      setResolutionText('142 transactions (₦37,420,400) successfully credited in clearing cycle 3. 4 transactions (₦1,200,000) confirmed reversed by NIBSS switch back to Horizon settlement pool.');
                      setIsProposingResolution(true);
                    }}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold shadow-xs cursor-pointer transition"
                  >
                    Propose Resolution Plan
                  </button>
                )}

                {currentCase.status === 'RESOLUTION_PROPOSED' && (
                  <>
                    <button
                      onClick={() => acceptCaseResolution(currentCase.id)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition"
                    >
                      Accept Resolution
                    </button>
                    <button
                      onClick={() => disputeCaseResolution(currentCase.id, 'Disputed 4 reversal references')}
                      className="px-4 py-2 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Dispute
                    </button>
                  </>
                )}

                {currentCase.status === 'RESOLVED' && (
                  <button
                    onClick={() => closeCase(currentCase.id)}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition"
                  >
                    Close Case Docket
                  </button>
                )}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 text-xs max-w-5xl mx-auto w-full">
              {/* Summary Card */}
              <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Bilateral Dispute Summary</span>
                    <h1 className="text-base font-bold text-slate-900 mt-1">{currentCase.title}</h1>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-xs text-slate-500 font-sans">Total Dispute Amount</span>
                    <div className="text-2xl font-extrabold text-[#05362a]">
                      ₦{currentCase.amountNgn?.toLocaleString() || '0'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-[11px]">
                  <div>
                    <span className="text-slate-400 font-bold uppercase">Originating Participant:</span>
                    <div className="text-slate-900 font-bold mt-0.5">{currentCase.originatingInstitutionName}</div>
                    <div className="text-slate-500">Opened by {currentCase.originatingPersonaName}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase">Receiving Participant:</span>
                    <div className="text-slate-900 font-bold mt-0.5">{currentCase.receivingInstitutionName}</div>
                    <div className="text-slate-500">Assigned: {currentCase.assignedPersonaName || 'Unassigned'}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase">Resolution SLA:</span>
                    <div className="text-amber-800 font-mono mt-0.5 font-bold">{currentCase.slaBreachTime}</div>
                    <div className="text-emerald-700">Target: 48 Hours</div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 leading-relaxed font-normal">
                  {currentCase.description}
                </div>
              </div>

              {/* Proposed Resolution Callout */}
              {currentCase.proposedResolution && (
                <div className="p-6 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-3 shadow-xs">
                  <div className="flex items-center justify-between border-b border-emerald-200/80 pb-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-700" />
                      <span className="font-bold text-sm text-emerald-950">Proposed Bilateral Resolution Plan</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-800">{currentCase.proposedResolution.proposedDate}</span>
                  </div>

                  <p className="text-emerald-950 leading-relaxed bg-white p-4 rounded-xl border border-emerald-100 font-medium">
                    {currentCase.proposedResolution.summary}
                  </p>

                  <div className="flex justify-between items-center text-[11px] pt-1 text-emerald-900">
                    <div>
                      Settlement Reversal Pool: <strong className="font-mono font-bold text-emerald-900">₦{currentCase.proposedResolution.refundAdjustmentNgn?.toLocaleString()}</strong>
                    </div>
                    <div className="font-mono">
                      Proposed by: {currentCase.proposedResolution.proposedBy}
                    </div>
                  </div>
                </div>
              )}

              {/* Evidence Schedules */}
              <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-4 shadow-sm">
                <h3 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <Paperclip className="w-4 h-4 text-[#05362a]" />
                  <span>Evidence Schedules & Transaction Logs ({currentCase.attachments.length})</span>
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {currentCase.attachments.map((att) => (
                    <div key={att.name} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                      <div className="truncate">
                        <div className="font-mono text-slate-900 font-bold truncate">{att.name}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Uploaded by {att.uploadedBy} • {att.timestamp}</div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono ml-2 shrink-0">{att.size}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleEvidenceUpload} className="flex items-center space-x-2 pt-2">
                  <input
                    type="text"
                    value={evidenceName}
                    onChange={(e) => setEvidenceName(e.target.value)}
                    placeholder="Enter schedule file name (e.g. NIBSS_Batch_Clearing_Trace_Aug28.xlsx)..."
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#05362a]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Upload Evidence
                  </button>
                </form>
              </div>

              {/* Event Timeline */}
              <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-3 shadow-sm">
                <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider font-mono">
                  Bilateral Case Event History
                </h3>
                <div className="space-y-2">
                  {currentCase.activityFeed.map((act) => (
                    <div key={act.id} className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                      <div className="flex justify-between items-center text-[11px] font-mono">
                        <span className="font-bold text-slate-900">{act.action}</span>
                        <span className="text-slate-500">{act.timestamp}</span>
                      </div>
                      <div className="text-slate-600 text-xs">{act.notes}</div>
                      <div className="text-[10px] text-slate-400">
                        Actor: {act.actorName} ({act.actorInstitution})
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resolution Modal */}
            {isProposingResolution && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-sm text-slate-900">Propose Bilateral Resolution</h3>
                    <button onClick={() => setIsProposingResolution(false)} className="text-slate-400 hover:text-slate-800">✕</button>
                  </div>

                  <form onSubmit={handleProposeResolutionSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Resolution Summary & Breakdown</label>
                      <textarea
                        rows={4}
                        value={resolutionText}
                        onChange={(e) => setResolutionText(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-[#05362a]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Settlement Adjustment Amount (NGN)</label>
                      <input
                        type="number"
                        value={refundNgn}
                        onChange={(e) => setRefundNgn(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono"
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsProposingResolution(false)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#05362a] hover:bg-emerald-900 text-white font-bold rounded-xl shadow"
                      >
                        Transmit Resolution
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
            Select a bilateral case to inspect.
          </div>
        )}
      </div>
    </div>
  );
};
