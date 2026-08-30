import React, { useState } from 'react';
import { useInstitution } from '../context/InstitutionContext';
import {
  TrendingUp,
  Ticket,
  Send,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Building2,
  Clock,
  Plus
} from 'lucide-react';

export const MarketsWorkspaceView: React.FC = () => {
  const {
    marketQuotes,
    openComposer,
    activePersona,
    activeInstitution
  } = useInstitution();

  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const filteredQuotes = marketQuotes.filter(q => {
    if (activeCategory === 'ALL') return true;
    return q.category === activeCategory;
  });

  return (
    <div className="p-8 space-y-6 text-slate-900 max-w-7xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">Markets Board</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time interbank quotation board • Sovereign FGN Bonds, Treasury Bills, FX Spot & Money Markets
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openComposer('rfq')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send RFQ</span>
          </button>
          <button
            onClick={() => openComposer('trade')}
            className="px-4 py-2 bg-[#05362a] hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Direct Trade Ticket</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-2 text-xs font-semibold">
        {['ALL', 'FIXED_INCOME', 'TREASURY_BILLS', 'FX', 'MONEY_MARKET'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl transition cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#05362a] text-white shadow-xs font-bold'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Quotes Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-6">INSTRUMENT & TENOR</th>
                <th className="py-3 px-4">CATEGORY</th>
                <th className="py-3 px-4 text-right">BID YIELD / RATE</th>
                <th className="py-3 px-4 text-right">OFFER YIELD / RATE</th>
                <th className="py-3 px-4 text-right">VOLUME</th>
                <th className="py-3 px-4 text-right">24H CHANGE</th>
                <th className="py-3 px-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredQuotes.map((q) => (
                <tr key={q.instrument} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900">{q.instrument}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{q.name}</div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-[10px] text-slate-700 font-bold font-mono">
                      {q.category}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right font-mono">
                    <div className="text-sm font-bold text-emerald-800">
                      {q.category === 'FX' ? `₦${q.bidYield.toFixed(2)}` : `${q.bidYield.toFixed(2)}%`}
                    </div>
                    {q.bidPrice && <div className="text-[10px] text-slate-400">Px: {q.bidPrice}</div>}
                  </td>

                  <td className="py-4 px-4 text-right font-mono">
                    <div className="text-sm font-bold text-teal-800">
                      {q.category === 'FX' ? `₦${q.offerYield.toFixed(2)}` : `${q.offerYield.toFixed(2)}%`}
                    </div>
                    {q.offerPrice && <div className="text-[10px] text-slate-400">Px: {q.offerPrice}</div>}
                  </td>

                  <td className="py-4 px-4 text-right text-slate-700 font-mono font-medium">
                    {q.volumeNgn}
                  </td>

                  <td className="py-4 px-4 text-right">
                    <span className={`inline-flex items-center gap-0.5 font-bold font-mono ${
                      q.changePercent >= 0 ? 'text-emerald-700' : 'text-rose-700'
                    }`}>
                      {q.changePercent >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      <span>{Math.abs(q.changePercent).toFixed(2)}%</span>
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => openComposer('rfq', { instrument: q.instrument })}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold transition cursor-pointer"
                      >
                        RFQ
                      </button>
                      <button
                        onClick={() => openComposer('trade', { instrument: q.instrument, yield: q.offerYield })}
                        className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#05362a] border border-emerald-300 rounded-lg text-[11px] font-bold transition cursor-pointer"
                      >
                        Trade Ticket
                      </button>
                    </div>
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
