import React, { useState } from 'react';
import { useInstitution } from '../context/InstitutionContext';
import {
  CalendarDays,
  CheckCircle,
  Clock,
  AlertTriangle,
  Building2,
  Ticket,
  ArrowRight,
  ShieldCheck,
  Activity
} from 'lucide-react';

export const SettlementCalendarView: React.FC = () => {
  const { tradesList, activeInstitution, setActiveView } = useInstitution();
  const [calendarTab, setCalendarTab] = useState<'TODAY' | 'TOMORROW' | 'FUTURE' | 'EXCEPTIONS'>('TODAY');

  const todaySettlements = tradesList.filter(t => t.settlementDate === '2026-08-30' || t.status === 'SETTLED');
  const tomorrowSettlements = tradesList.filter(t => t.settlementDate === '2026-08-31');
  const futureSettlements = tradesList.filter(t => t.settlementDate > '2026-08-31');
  const exceptions = tradesList.filter(t => t.status === 'AMENDMENT_REQUESTED' || t.status === 'PENDING_SUPERVISOR_APPROVAL');

  const getActiveList = () => {
    switch (calendarTab) {
      case 'TODAY': return todaySettlements;
      case 'TOMORROW': return tomorrowSettlements;
      case 'FUTURE': return futureSettlements;
      case 'EXCEPTIONS': return exceptions;
    }
  };

  const activeItems = getActiveList();

  return (
    <div className="p-8 space-y-6 text-slate-900 max-w-7xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">Settlement Calendar</h1>
          <p className="text-xs text-slate-500 mt-1">
            Institutional value-date settlement coordination • Clearing system synchronization (CBN RTGS & CSCS)
          </p>
        </div>

        {/* Integration Status Chips */}
        <div className="flex items-center space-x-2 text-[11px] font-mono">
          <span className="px-3 py-1 bg-emerald-50 border border-emerald-300 rounded-full text-emerald-900 flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            CBN RTGS: CONNECTED
          </span>
          <span className="px-3 py-1 bg-emerald-50 border border-emerald-300 rounded-full text-emerald-900 flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            CSCS Depository: ONLINE
          </span>
        </div>
      </div>

      {/* Tabs Cards */}
      <div className="grid grid-cols-4 gap-4 text-xs">
        <button
          onClick={() => setCalendarTab('TODAY')}
          className={`p-5 rounded-2xl text-left border transition cursor-pointer shadow-xs ${
            calendarTab === 'TODAY'
              ? 'bg-white border-[#05362a] ring-2 ring-[#05362a]/10'
              : 'bg-white border-slate-200/90 hover:bg-slate-50'
          }`}
        >
          <div className="text-[10px] uppercase font-bold text-[#05362a]">Value Date Today</div>
          <div className="text-2xl font-extrabold font-mono text-slate-950 mt-1">{todaySettlements.length} Obligations</div>
          <div className="text-[11px] text-slate-500 mt-0.5">30 August 2026</div>
        </button>

        <button
          onClick={() => setCalendarTab('TOMORROW')}
          className={`p-5 rounded-2xl text-left border transition cursor-pointer shadow-xs ${
            calendarTab === 'TOMORROW'
              ? 'bg-white border-[#05362a] ring-2 ring-[#05362a]/10'
              : 'bg-white border-slate-200/90 hover:bg-slate-50'
          }`}
        >
          <div className="text-[10px] uppercase font-bold text-teal-800">Settling Tomorrow</div>
          <div className="text-2xl font-extrabold font-mono text-slate-950 mt-1">{tomorrowSettlements.length} Obligations</div>
          <div className="text-[11px] text-slate-500 mt-0.5">31 August 2026</div>
        </button>

        <button
          onClick={() => setCalendarTab('FUTURE')}
          className={`p-5 rounded-2xl text-left border transition cursor-pointer shadow-xs ${
            calendarTab === 'FUTURE'
              ? 'bg-white border-[#05362a] ring-2 ring-[#05362a]/10'
              : 'bg-white border-slate-200/90 hover:bg-slate-50'
          }`}
        >
          <div className="text-[10px] uppercase font-bold text-blue-800">Future (T+2 / Spot)</div>
          <div className="text-2xl font-extrabold font-mono text-slate-950 mt-1">{futureSettlements.length} Trades</div>
          <div className="text-[11px] text-slate-500 mt-0.5">1 September 2026+</div>
        </button>

        <button
          onClick={() => setCalendarTab('EXCEPTIONS')}
          className={`p-5 rounded-2xl text-left border transition cursor-pointer shadow-xs ${
            calendarTab === 'EXCEPTIONS'
              ? 'bg-white border-amber-600 ring-2 ring-amber-600/10'
              : 'bg-white border-slate-200/90 hover:bg-slate-50'
          }`}
        >
          <div className="text-[10px] uppercase font-bold text-amber-800">Settlement Exceptions</div>
          <div className="text-2xl font-extrabold font-mono text-slate-950 mt-1">{exceptions.length} Flagged</div>
          <div className="text-[11px] text-amber-800 font-semibold mt-0.5">Action Required</div>
        </button>
      </div>

      {/* Settlement Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-6">SETTLEMENT REF</th>
                <th className="py-3 px-4">INSTRUMENT</th>
                <th className="py-3 px-4">COUNTERPARTY</th>
                <th className="py-3 px-4 text-right">FACE AMOUNT</th>
                <th className="py-3 px-4 text-right">YIELD</th>
                <th className="py-3 px-4">CLEARING PROTOCOL</th>
                <th className="py-3 px-6 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {activeItems.map((trade) => (
                <tr key={trade.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-6 font-mono">
                    <span className="font-bold text-[#05362a]">{trade.settlementReference || 'PENDING_APPROVAL'}</span>
                    <div className="text-[10px] text-slate-400">{trade.id}</div>
                  </td>

                  <td className="py-4 px-4 font-sans">
                    <div className="font-bold text-slate-900">{trade.instrument}</div>
                    <div className="text-[10px] text-slate-400 font-mono">Value Date: {trade.settlementDate}</div>
                  </td>

                  <td className="py-4 px-4 text-slate-700 font-medium">
                    {trade.buyerInstitutionName === activeInstitution.legalName ? trade.sellerInstitutionName : trade.buyerInstitutionName}
                  </td>

                  <td className="py-4 px-4 text-right font-bold text-slate-900 font-mono">
                    ₦{(trade.amountNgn/1e9).toFixed(2)}B
                  </td>

                  <td className="py-4 px-4 text-right text-teal-800 font-bold font-mono">
                    {trade.yieldRate.toFixed(2)}%
                  </td>

                  <td className="py-4 px-4 text-slate-600 text-[11px]">
                    {trade.settlementConvention}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      trade.status === 'SETTLED' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                      trade.status === 'CONFIRMED' ? 'bg-teal-50 text-teal-800 border border-teal-200' :
                      'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>{trade.settlementStatus.replace('_', ' ')}</span>
                    </span>
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
