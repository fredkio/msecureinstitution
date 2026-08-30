import React, { useState } from 'react';
import { useInstitution } from '../context/InstitutionContext';
import { OfficialCorrespondence } from '../types/institution';
import {
  ScrollText,
  FileCheck2,
  CheckCircle,
  Clock,
  ShieldCheck,
  Send,
  Building2,
  FileText,
  Paperclip,
  Check,
  Lock,
  Plus,
  ArrowRight,
  Eye
} from 'lucide-react';

export const CorrespondenceView: React.FC = () => {
  const {
    correspondenceList,
    approveCorrespondence,
    issueCorrespondence,
    acknowledgeCorrespondence,
    assignCorrespondence,
    submitOfficialResponse,
    closeCorrespondence,
    openStepUpAuth,
    openComposer,
    activePersona,
    activeInstitution
  } = useInstitution();

  const [selectedId, setSelectedId] = useState<string>(correspondenceList[0]?.id || 'FRSA/FIN/2026/0821');
  const [responseMarkdown, setResponseMarkdown] = useState('');
  const [isResponseFormOpen, setIsResponseFormOpen] = useState(false);

  const currentCorr = correspondenceList.find(c => c.id === selectedId) || correspondenceList[0];

  const handleAuthorize = () => {
    openStepUpAuth(
      `Digital Signature Authorization: ${currentCorr.reference}`,
      `You are applying your executive mandate to formally issue this correspondence on behalf of ${activeInstitution.legalName}.`,
      () => {
        approveCorrespondence(currentCorr.id);
        issueCorrespondence(currentCorr.id);
      }
    );
  };

  const handleBankResponseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!responseMarkdown.trim()) return;

    openStepUpAuth(
      `Sign & Seal Bank Response: ${currentCorr.reference}`,
      `You are attaching the certified collection statement and transmitting this formal response under Meridian Bank authority seal.`,
      () => {
        submitOfficialResponse(currentCorr.id, responseMarkdown, 'August_Collections_Statement_Certified.pdf');
        setIsResponseFormOpen(false);
      }
    );
  };

  return (
    <div className="h-full flex overflow-hidden bg-[#f8fafc] text-slate-900">
      {/* Left: Correspondence List */}
      <div className="w-96 bg-white border-r border-slate-200 flex flex-col h-full shrink-0">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-base text-slate-900">Official Correspondence</h2>
            <p className="text-xs text-slate-500">Sealed mandates & requests</p>
          </div>
          <button
            onClick={() => openComposer('correspondence')}
            className="px-3 py-1.5 bg-[#05362a] hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
          >
            + Draft Mandate
          </button>
        </div>

        <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
          {correspondenceList.map((corr) => {
            const isSelected = corr.id === selectedId;
            return (
              <div
                key={corr.id}
                onClick={() => setSelectedId(corr.id)}
                className={`p-4 cursor-pointer transition text-left text-xs ${
                  isSelected ? 'bg-emerald-50/60 border-l-4 border-[#05362a]' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-bold text-xs text-[#05362a]">{corr.reference}</span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    corr.status === 'CLOSED' ? 'bg-slate-100 text-slate-700' :
                    corr.status === 'RESPONDED' ? 'bg-blue-50 text-blue-800' :
                    corr.status === 'ISSUED' ? 'bg-amber-50 text-amber-800' :
                    'bg-purple-50 text-purple-800'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>{corr.status}</span>
                  </span>
                </div>

                <div className="font-bold text-slate-900 text-xs truncate mt-1">{corr.subject}</div>
                <div className="text-[11px] text-slate-500 mt-1 truncate">
                  From: {corr.originatingInstitutionName} → {corr.destinationInstitutionName}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                  <span>Effective: {corr.effectiveDate}</span>
                  <span>{corr.classification}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Formal Letter Preview */}
      <div className="flex-1 flex flex-col h-full bg-[#f8fafc] overflow-hidden">
        {currentCorr ? (
          <>
            {/* Top Action Ribbon */}
            <div className="px-8 py-4 border-b border-slate-200 bg-white flex items-center justify-between shadow-xs">
              <div className="flex items-center space-x-2">
                <span className="font-mono font-bold text-sm text-[#05362a]">{currentCorr.reference}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-900 font-bold">{currentCorr.classification}</span>
              </div>

              <div className="flex items-center space-x-2">
                {currentCorr.status === 'PENDING_APPROVAL' && activePersona.canAuthorizeCorrespondence && (
                  <button
                    onClick={handleAuthorize}
                    className="px-4 py-2 bg-[#05362a] hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer"
                  >
                    Authorize & Issue Mandate →
                  </button>
                )}

                {currentCorr.status === 'ISSUED' && activeInstitution.id === currentCorr.destinationInstitutionId && (
                  <button
                    onClick={() => {
                      acknowledgeCorrespondence(currentCorr.id);
                      assignCorrespondence(currentCorr.id, activePersona.id);
                    }}
                    className="px-4 py-2 bg-[#05362a] hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer"
                  >
                    Acknowledge & Accept Assignment
                  </button>
                )}

                {(currentCorr.status === 'ACKNOWLEDGED' || currentCorr.status === 'IN_PROGRESS') && activeInstitution.id === currentCorr.destinationInstitutionId && (
                  <button
                    onClick={() => {
                      setResponseMarkdown(`### MERIDIAN BANK PLC
**Government Banking & Institutional Services Division**
*Ref: MRD/GB/2026/RESP-0821*

We hereby transmit the certified statement of account and reconciliation schedule for Account 1029384729 (August 2026) with zero exceptions.`);
                      setIsResponseFormOpen(true);
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer"
                  >
                    Prepare Formal Response & Statement
                  </button>
                )}

                {currentCorr.status === 'RESPONDED' && (
                  <button
                    onClick={() => closeCorrespondence(currentCorr.id)}
                    className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer"
                  >
                    Close Mandate (Concurrence)
                  </button>
                )}
              </div>
            </div>

            {/* Letterhead Preview */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 max-w-4xl mx-auto w-full">
              <div className="bg-white border border-slate-200/90 rounded-3xl shadow-sm p-10 space-y-6 text-slate-800 font-serif">
                {/* Letterhead Top */}
                <div className="text-center pb-6 border-b-2 border-slate-200 space-y-1 font-sans">
                  <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#05362a]">
                    {currentCorr.originatingInstitutionName}
                  </div>
                  <h1 className="text-xl font-extrabold text-slate-950">{currentCorr.subject}</h1>
                  <div className="flex justify-between items-center text-xs font-mono text-slate-500 pt-3">
                    <span>Reference: <strong className="text-slate-900">{currentCorr.reference}</strong></span>
                    <span>Date: <strong className="text-slate-900">{currentCorr.effectiveDate}</strong></span>
                  </div>
                </div>

                <div className="font-sans text-xs space-y-1 text-slate-700">
                  <div><strong>To:</strong> Head of {currentCorr.destinationTeam}</div>
                  <div><strong>Institution:</strong> {currentCorr.destinationInstitutionName}</div>
                </div>

                <div className="leading-relaxed text-xs whitespace-pre-wrap font-sans text-slate-800 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  {currentCorr.bodyMarkdown}
                </div>

                {/* Signatories Stamp */}
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100 font-sans text-xs">
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Prepared By:</span>
                    <div className="font-bold text-slate-900">{currentCorr.preparedBy.name}</div>
                    <div className="text-slate-500 text-[11px]">{currentCorr.preparedBy.title}</div>
                  </div>

                  <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1">
                    <span className="text-[10px] font-mono text-[#05362a] uppercase font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Executive Signatory Seal:</span>
                    </span>
                    <div className="font-bold text-[#05362a]">
                      {currentCorr.authorizedBy?.name || 'Pending Authorizer Sign-off'}
                    </div>
                    <div className="text-emerald-900 text-[11px]">
                      {currentCorr.authorizedBy?.title || 'Executive Mandate Signature'}
                    </div>
                  </div>
                </div>

                {/* Certified Response Block */}
                {currentCorr.officialResponse && (
                  <div className="p-6 bg-emerald-50/70 border-2 border-emerald-600/30 rounded-2xl space-y-4 font-sans text-xs">
                    <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-800" />
                        <span className="font-bold text-sm text-emerald-950">Certified Institutional Response</span>
                      </div>
                      <span className="font-mono text-[11px] text-emerald-800">{currentCorr.officialResponse.reference}</span>
                    </div>

                    <div className="whitespace-pre-wrap leading-relaxed text-slate-800 bg-white p-4 rounded-xl border border-emerald-100">
                      {currentCorr.officialResponse.bodyMarkdown}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2 p-2.5 bg-white border border-emerald-200 rounded-xl">
                        <FileText className="w-4 h-4 text-emerald-800" />
                        <span className="font-mono font-bold text-slate-900">{currentCorr.officialResponse.attachmentName}</span>
                      </div>
                      <div className="text-[11px] text-slate-600 text-right">
                        <div>Prepared by: {currentCorr.officialResponse.preparedBy}</div>
                        <div>Authorized by: {currentCorr.officialResponse.authorizedBy}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Audit Timeline */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-3 shadow-sm">
                <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider font-mono">
                  Immutable Institutional Audit Trail
                </h3>
                <div className="space-y-2">
                  {currentCorr.auditTrail.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-[#05362a]" />
                        <span className="font-bold text-slate-900">{item.action}</span>
                        <span className="text-slate-500">by {item.actor} ({item.institution})</span>
                      </div>
                      <span className="font-mono text-[11px] text-slate-400">{item.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Response Preparation Modal */}
            {isResponseFormOpen && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-xl p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-sm text-slate-900">Prepare Certified Response & Statement</h3>
                    <button onClick={() => setIsResponseFormOpen(false)} className="text-slate-400 hover:text-slate-800">✕</button>
                  </div>

                  <form onSubmit={handleBankResponseSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Response Narrative</label>
                      <textarea
                        rows={5}
                        value={responseMarkdown}
                        onChange={(e) => setResponseMarkdown(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-[#05362a]"
                      />
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Paperclip className="w-4 h-4 text-[#05362a]" />
                        <span className="font-mono font-bold text-slate-900">August_Collections_Statement_Certified.pdf</span>
                      </div>
                      <span className="text-[10px] text-emerald-800 font-mono">1.8 MB (Cryptographic Seal Applied)</span>
                    </div>

                    <div className="flex justify-end space-x-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsResponseFormOpen(false)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#05362a] hover:bg-emerald-900 text-white font-bold rounded-xl shadow"
                      >
                        Sign & Transmit Response
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
            Select an official correspondence mandate.
          </div>
        )}
      </div>
    </div>
  );
};
