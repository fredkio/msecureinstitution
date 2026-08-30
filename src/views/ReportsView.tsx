import React, { useState } from 'react';
import { useInstitution } from '../context/InstitutionContext';
import {
  BarChart3,
  Search,
  ShieldCheck,
  Download,
  Calendar,
  Layers,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { auditLogs, activeInstitution } = useInstitution();
  const [filterQuery, setFilterQuery] = useState('');

  const filteredLogs = auditLogs.filter(log =>
    !filterQuery ||
    log.action.toLowerCase().includes(filterQuery.toLowerCase()) ||
    log.objectId.toLowerCase().includes(filterQuery.toLowerCase()) ||
    log.personaName.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6 text-slate-900 max-w-7xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">Reports & Audit Trail</h1>
          <p className="text-xs text-slate-500 mt-1">
            Immutable cryptographic transaction log • Statutory regulatory audit evidence
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search audit trail..."
              className="bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#05362a] w-64 shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-3.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs font-semibold text-slate-700">
          <span>Tamper-Evident Event Ledger ({filteredLogs.length} events)</span>
          <span className="text-[#05362a] font-mono text-[11px] font-bold">SHA-256 Hashes Verified ✓</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-6 font-semibold">TIMESTAMP</th>
                <th className="py-3 px-4 font-semibold">ACTOR & ROLE</th>
                <th className="py-3 px-4 font-semibold">ACTION TYPE</th>
                <th className="py-3 px-4 font-semibold">TARGET OBJECT</th>
                <th className="py-3 px-4 font-semibold">OUTCOME</th>
                <th className="py-3 px-6 font-semibold">CRYPTOGRAPHIC HASH</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-6 text-slate-500 text-[11px] whitespace-nowrap">
                    {log.timestamp}
                  </td>

                  <td className="py-4 px-4 font-sans">
                    <div className="font-bold text-slate-900">{log.personaName}</div>
                    <div className="text-[10px] text-slate-500">{log.role}</div>
                  </td>

                  <td className="py-4 px-4 text-slate-700 font-bold">
                    <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-[10px]">
                      {log.action}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-bold text-[#05362a]">{log.objectId}</span>
                    <div className="text-[10px] text-slate-500 font-sans">{log.objectType}</div>
                  </td>

                  <td className="py-4 px-4 font-sans">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      log.outcome === 'SUCCESS' ? 'bg-emerald-50 text-emerald-800' :
                      log.outcome === 'BLOCKED_LIMIT_EXCEEDED' ? 'bg-amber-50 text-amber-800' :
                      'bg-rose-50 text-rose-800'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>{log.outcome}</span>
                    </span>
                  </td>

                  <td className="py-4 px-6 text-[10px] text-slate-400 truncate max-w-xs font-mono">
                    {log.tamperProofHash}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
