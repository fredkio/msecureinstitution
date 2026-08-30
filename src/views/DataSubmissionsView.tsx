import React, { useState } from 'react';
import { useInstitution } from '../context/InstitutionContext';
import { DataSubmissionItem } from '../types/institution';
import {
  FileCheck2,
  CheckCircle,
  Clock,
  AlertTriangle,
  Send,
  Building2,
  Upload,
  FileSpreadsheet
} from 'lucide-react';

export const DataSubmissionsView: React.FC = () => {
  const {
    submissionsList,
    submitDataFiling,
    activePersona,
    activeInstitution
  } = useInstitution();

  const [selectedId, setSelectedId] = useState<string>(submissionsList[0]?.id || 'MSC-SUB-701');
  const currentSubmission = submissionsList.find(s => s.id === selectedId) || submissionsList[0];

  return (
    <div className="h-full flex overflow-hidden bg-[#f8fafc] text-slate-900">
      {/* Left: Submissions List */}
      <div className="w-96 bg-white border-r border-slate-200 flex flex-col h-full shrink-0">
        <div className="p-5 border-b border-slate-100">
          <h2 className="font-extrabold text-base text-slate-900">Data Submissions</h2>
          <p className="text-xs text-slate-500">Statutory reporting filings</p>
        </div>

        <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
          {submissionsList.map((sub) => {
            const isSelected = sub.id === selectedId;
            return (
              <div
                key={sub.id}
                onClick={() => setSelectedId(sub.id)}
                className={`p-4 cursor-pointer transition text-left text-xs ${
                  isSelected ? 'bg-emerald-50/60 border-l-4 border-[#05362a]' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-bold text-xs text-[#05362a]">{sub.id}</span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    sub.status === 'SUBMITTED' || sub.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-800' :
                    sub.status === 'IN_PROGRESS' ? 'bg-amber-50 text-amber-800' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>{sub.status}</span>
                  </span>
                </div>

                <div className="font-bold text-slate-900 text-xs truncate mt-1">{sub.title}</div>
                <div className="text-[11px] text-slate-500 mt-1 truncate">
                  Authority: {sub.regulatoryBody}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                  <span>Period: {sub.reportingPeriod}</span>
                  <span>Deadline: {sub.deadline}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Submission Payload */}
      <div className="flex-1 flex flex-col h-full bg-[#f8fafc] overflow-hidden">
        {currentSubmission ? (
          <>
            <div className="px-8 py-4 border-b border-slate-200 bg-white flex items-center justify-between shadow-xs">
              <div className="flex items-center space-x-2">
                <span className="font-mono font-bold text-sm text-[#05362a]">{currentSubmission.id}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-900 font-bold">{currentSubmission.title}</span>
              </div>

              {currentSubmission.status === 'IN_PROGRESS' && (
                <button
                  onClick={() => submitDataFiling(currentSubmission.id)}
                  className="px-4 py-2 bg-[#05362a] hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-xs flex items-center gap-1.5 cursor-pointer transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Regulatory Return</span>
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 text-xs max-w-4xl mx-auto w-full">
              <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-[#05362a] uppercase font-bold">Regulatory Mandate Filing</span>
                    <h1 className="text-base font-bold text-slate-900 mt-1">{currentSubmission.title}</h1>
                  </div>
                  <span className="px-3 py-1 bg-slate-100 text-slate-800 font-mono rounded-lg text-xs font-bold">
                    {currentSubmission.referenceDirective}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-[11px] font-mono">
                  <div>
                    <span className="text-slate-400 uppercase font-bold font-sans">Statutory Authority:</span>
                    <div className="text-slate-900 font-bold mt-0.5">{currentSubmission.regulatoryBody}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase font-bold font-sans">Reporting Period:</span>
                    <div className="text-slate-900 font-bold mt-0.5">{currentSubmission.reportingPeriod} (Deadline: {currentSubmission.deadline})</div>
                  </div>
                </div>
              </div>

              {/* Data Schema Validation */}
              {currentSubmission.validationReport && (
                <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-4 shadow-sm">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-sm text-slate-900">Automated Data Schema Validation Report</h3>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-full text-xs font-mono font-bold">
                      SCHEMA CHECK: {currentSubmission.validationReport.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/80">
                      <div className="text-slate-500 text-[11px]">Valid Records Verified:</div>
                      <div className="text-3xl font-extrabold text-[#05362a] mt-1">
                        {currentSubmission.validationReport.validRecords.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/80">
                      <div className="text-slate-500 text-[11px]">Flagged Anomalies:</div>
                      <div className="text-3xl font-extrabold text-slate-700 mt-1">
                        {currentSubmission.validationReport.flaggedAnomalies}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
            Select a regulatory data submission.
          </div>
        )}
      </div>
    </div>
  );
};
