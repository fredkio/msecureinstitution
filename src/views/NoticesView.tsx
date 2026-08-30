import React, { useState } from 'react';
import { useInstitution } from '../context/InstitutionContext';
import { NoticeItem } from '../types/institution';
import {
  BellRing,
  CheckCircle,
  FileText,
  Paperclip,
  Clock,
  ShieldCheck,
  Building2,
  Plus
} from 'lucide-react';

export const NoticesView: React.FC = () => {
  const {
    noticesList,
    acknowledgeNotice,
    openComposer,
    activePersona,
    activeInstitution
  } = useInstitution();

  const [selectedNoticeId, setSelectedNoticeId] = useState<string>(noticesList[0]?.id || 'MSC-NOT-881');

  const currentNotice = noticesList.find(n => n.id === selectedNoticeId) || noticesList[0];
  const isAcknowledgedByMe = currentNotice?.acknowledgedBy.includes(activePersona.id);

  return (
    <div className="h-full flex overflow-hidden bg-[#f8fafc] text-slate-900">
      {/* Left: Notices List */}
      <div className="w-96 bg-white border-r border-slate-200 flex flex-col h-full shrink-0">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-base text-slate-900">Network Notices</h2>
            <p className="text-xs text-slate-500">Official circulars & directives</p>
          </div>
          {activePersona.canManageUsers && (
            <button
              onClick={() => openComposer('notice')}
              className="px-3 py-1.5 bg-[#05362a] hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
            >
              + Broadcast
            </button>
          )}
        </div>

        <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
          {noticesList.map((notice) => {
            const isSelected = notice.id === selectedNoticeId;
            const acknowledged = notice.acknowledgedBy.includes(activePersona.id);

            return (
              <div
                key={notice.id}
                onClick={() => setSelectedNoticeId(notice.id)}
                className={`p-4 cursor-pointer transition text-left text-xs ${
                  isSelected ? 'bg-emerald-50/60 border-l-4 border-[#05362a]' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-bold text-xs text-[#05362a]">{notice.id}</span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    notice.priority === 'CRITICAL' ? 'bg-rose-50 text-rose-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>{notice.type}</span>
                  </span>
                </div>

                <div className="font-bold text-slate-900 text-xs truncate mt-1">{notice.title}</div>
                <div className="text-[11px] text-slate-500 mt-1 truncate">
                  Issuer: {notice.issuerInstitution}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                  <span>{notice.issuedAt}</span>
                  {acknowledged ? (
                    <span className="text-emerald-700 font-bold">ACKNOWLEDGED ✓</span>
                  ) : (
                    <span className="text-amber-800 font-bold">ACTION REQUIRED</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Notice Body */}
      <div className="flex-1 flex flex-col h-full bg-[#f8fafc] overflow-hidden">
        {currentNotice ? (
          <>
            {/* Top Ribbon */}
            <div className="px-8 py-4 border-b border-slate-200 bg-white flex items-center justify-between shadow-xs">
              <div className="flex items-center space-x-2">
                <span className="font-mono font-bold text-sm text-[#05362a]">{currentNotice.id}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-900 font-bold">{currentNotice.type}</span>
              </div>

              {!isAcknowledgedByMe && currentNotice.requiresAcknowledgement && (
                <button
                  onClick={() => acknowledgeNotice(currentNotice.id)}
                  className="px-4 py-2 bg-[#05362a] hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-xs flex items-center gap-1.5 cursor-pointer transition"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Acknowledge Official Directive</span>
                </button>
              )}
            </div>

            {/* Document Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 text-xs max-w-4xl mx-auto w-full">
              <div className="p-8 bg-white border border-slate-200/90 rounded-3xl shadow-sm space-y-6">
                <div className="text-center pb-6 border-b border-slate-100 space-y-1">
                  <div className="font-mono text-xs font-bold text-[#05362a] uppercase tracking-widest">
                    {currentNotice.issuerInstitution}
                  </div>
                  <h1 className="text-xl font-extrabold text-slate-950">{currentNotice.title}</h1>
                  <div className="text-xs text-slate-500 font-mono pt-2">
                    Department: {currentNotice.issuerDepartment} • Issued: {currentNotice.issuedAt}
                  </div>
                </div>

                <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl leading-relaxed text-slate-800 text-xs whitespace-pre-wrap font-sans">
                  {currentNotice.contentMarkdown}
                </div>

                {currentNotice.attachments && currentNotice.attachments.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="text-slate-400 font-bold text-[10px] uppercase font-mono">Official PDF Circular</div>
                    {currentNotice.attachments.map((att) => (
                      <div key={att.name} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-[#05362a]" />
                          <span className="font-mono font-bold text-slate-900">{att.name}</span>
                        </div>
                        <span className="text-slate-400 font-mono text-[11px]">{att.size}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between text-[11px] font-mono">
                  <span className="text-emerald-950 font-bold">Network Compliance Ledger:</span>
                  <span className="text-[#05362a] font-extrabold">
                    {currentNotice.acknowledgedBy.length} Authorized Signatories Acknowledged
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
            Select a network notice to inspect.
          </div>
        )}
      </div>
    </div>
  );
};
