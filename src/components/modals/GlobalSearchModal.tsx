import React, { useState } from 'react';
import { useInstitution } from '../../context/InstitutionContext';
import { Search, Building2, Ticket, FolderLock, ScrollText, Mail, X } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    tradesList,
    casesList,
    correspondenceList,
    formalMessages,
    marketQuotes,
    setActiveView
  } = useInstitution();

  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const matches = query.trim() ? [
    ...tradesList.filter(t => t.id.toLowerCase().includes(query.toLowerCase()) || t.instrument.toLowerCase().includes(query.toLowerCase())).map(t => ({ type: 'TRADE', id: t.id, title: `${t.instrument} - ₦${(t.amountNgn/1e9).toFixed(1)}B`, view: 'blotter' })),
    ...casesList.filter(c => c.id.toLowerCase().includes(query.toLowerCase()) || c.title.toLowerCase().includes(query.toLowerCase())).map(c => ({ type: 'CASE', id: c.id, title: c.title, view: 'cases' })),
    ...correspondenceList.filter(cr => cr.reference.toLowerCase().includes(query.toLowerCase()) || cr.subject.toLowerCase().includes(query.toLowerCase())).map(cr => ({ type: 'CORRESPONDENCE', id: cr.reference, title: cr.subject, view: 'correspondence' })),
    ...formalMessages.filter(m => m.id.toLowerCase().includes(query.toLowerCase()) || m.subject.toLowerCase().includes(query.toLowerCase())).map(m => ({ type: 'MESSAGE', id: m.id, title: m.subject, view: 'inbox' })),
    ...marketQuotes.filter(q => q.instrument.toLowerCase().includes(query.toLowerCase())).map(q => ({ type: 'MARKET', id: q.instrument, title: `${q.instrument} @ ${q.offerYield}%`, view: 'markets' }))
  ] : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-24 p-4">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-slate-100 flex items-center space-x-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all institutional records, trades, cases, mandates, or instruments..."
            className="flex-1 bg-transparent text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-slate-400 hover:text-slate-800 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 text-xs">
          {matches.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setActiveView(item.view as any);
                setIsSearchOpen(false);
              }}
              className="p-4 hover:bg-slate-50 cursor-pointer transition flex items-center justify-between"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-[#05362a]">{item.id}</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] text-slate-600 font-bold font-mono">
                    {item.type}
                  </span>
                </div>
                <div className="text-slate-800 font-medium text-xs mt-1">{item.title}</div>
              </div>
              <span className="text-[#05362a] font-bold text-[11px]">Open →</span>
            </div>
          ))}

          {query.trim() && matches.length === 0 && (
            <div className="p-8 text-center text-slate-400">
              No matching institutional records found for "{query}".
            </div>
          )}

          {!query.trim() && (
            <div className="p-6 text-center text-slate-400 text-[11px]">
              Type a reference (e.g., <span className="font-mono font-bold text-slate-700">MSC-TRD</span>, <span className="font-mono font-bold text-slate-700">FRSA/FIN</span>, <span className="font-mono font-bold text-slate-700">MSC-CASE</span>) to instantly find network records.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
