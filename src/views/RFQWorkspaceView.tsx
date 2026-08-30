import React, { useState } from 'react';
import { useInstitution } from '../context/InstitutionContext';
import { RFQRequest } from '../types/institution';
import {
  Send,
  TrendingUp,
  Ticket,
  Clock,
  CheckCircle,
  Plus,
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

export const RFQWorkspaceView: React.FC = () => {
  const {
    rfqsList,
    submitRFQQuote,
    acceptRFQQuote,
    openComposer,
    activePersona,
    activeInstitution
  } = useInstitution();

  const [selectedRfqId, setSelectedRfqId] = useState<string>(rfqsList[0]?.id || 'MSC-RFQ-400182');
  const [quoteYield, setQuoteYield] = useState('18.45');
  const [quotePrice, setQuotePrice] = useState('98.32');

  const currentRfq = rfqsList.find(r => r.id === selectedRfqId) || rfqsList[0];

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentRfq) return;
    submitRFQQuote(currentRfq.id, parseFloat(quoteYield), parseFloat(quotePrice));
  };

  return (
    <div className="h-full flex overflow-hidden bg-[#f8fafc] text-slate-900">
      {/* Left: RFQ Requests List */}
      <div className="w-96 bg-white border-r border-slate-200 flex flex-col h-full shrink-0">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-base text-slate-900">Treasury RFQs</h2>
            <p className="text-xs text-slate-500">Multi-dealer quotation requests</p>
          </div>
          <button
            onClick={() => openComposer('rfq')}
            className="px-3 py-1.5 bg-[#05362a] hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
          >
            + New RFQ
          </button>
        </div>

        <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
          {rfqsList.map((rfq) => {
            const isSelected = rfq.id === selectedRfqId;
            return (
              <div
                key={rfq.id}
                onClick={() => setSelectedRfqId(rfq.id)}
                className={`p-4 cursor-pointer transition text-left text-xs ${
                  isSelected ? 'bg-emerald-50/60 border-l-4 border-[#05362a]' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-bold text-xs text-[#05362a]">{rfq.id}</span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    rfq.status === 'EXECUTED_TO_TRADE' ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>{rfq.status}</span>
                  </span>
                </div>

                <div className="font-bold text-slate-900 text-xs truncate mt-1">{rfq.instrument}</div>
                <div className="text-[11px] text-slate-500 mt-1 flex justify-between font-mono">
                  <span>{rfq.side} ₦{(rfq.amountNgn/1e9).toFixed(2)}B</span>
                  <span>{rfq.quotes.length} Quotes</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: RFQ Matrix & Comparison */}
      <div className="flex-1 flex flex-col h-full bg-[#f8fafc] overflow-hidden">
        {currentRfq ? (
          <div className="flex-1 overflow-y-auto p-8 space-y-6 text-xs max-w-5xl mx-auto w-full">
            {/* Summary Card */}
            <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono text-[#05362a] uppercase font-bold">RFQ Parameters</span>
                  <h1 className="text-base font-bold text-slate-900 mt-1">{currentRfq.instrument}</h1>
                </div>
                <div className="text-right font-mono">
                  <span className="text-xs text-slate-500 font-sans">Order Face Value</span>
                  <div className="text-2xl font-extrabold text-[#05362a]">₦{(currentRfq.amountNgn/1e9).toFixed(2)} Billion</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-[11px] font-mono">
                <div>
                  <span className="text-slate-400 uppercase font-bold font-sans">Initiating Dealer:</span>
                  <div className="text-slate-900 font-bold mt-0.5">{currentRfq.initiatingInstitutionName}</div>
                </div>
                <div>
                  <span className="text-slate-400 uppercase font-bold font-sans">Settlement Convention:</span>
                  <div className="text-slate-900 font-bold mt-0.5">{currentRfq.settlementConvention} ({currentRfq.settlementDate})</div>
                </div>
                <div>
                  <span className="text-slate-400 uppercase font-bold font-sans">Status:</span>
                  <div className="text-emerald-700 font-bold mt-0.5">{currentRfq.status}</div>
                </div>
              </div>
            </div>

            {/* Competitive Quote Matrix */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-bold text-sm text-slate-900">Competitive Quote Comparison Matrix</h3>
                <span className="text-xs text-slate-400 font-mono">{currentRfq.quotes.length} response(s) received</span>
              </div>

              <div className="space-y-3">
                {currentRfq.quotes.map((q) => (
                  <div
                    key={q.id}
                    className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900">{q.counterpartyInstitutionName}</span>
                        <span className="text-slate-500 font-mono text-[11px]">• Dealer: {q.dealerName}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 font-mono">
                        Valid Until: {q.validUntil} • Convention: {q.settlementConvention}
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right font-mono">
                        <div className="text-lg font-bold text-emerald-800">{q.yieldRate.toFixed(2)}%</div>
                        <div className="text-[11px] text-slate-500">Price: {q.price}</div>
                      </div>

                      {currentRfq.status !== 'EXECUTED_TO_TRADE' && (
                        <button
                          onClick={() => acceptRFQQuote(currentRfq.id, q.id)}
                          className="px-4 py-2 bg-[#05362a] hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-xs transition cursor-pointer flex items-center gap-1.5"
                        >
                          <Ticket className="w-3.5 h-3.5" />
                          <span>Accept & Execute</span>
                        </button>
                      )}

                      {q.status === 'ACCEPTED' && (
                        <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl font-bold font-mono text-xs">
                          EXECUTED ✓
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Counterparty Quote Form */}
            {activeInstitution.id !== currentRfq.initiatingInstitutionId && currentRfq.status === 'OPEN' && (
              <form onSubmit={handleQuoteSubmit} className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-4 shadow-sm">
                <h3 className="font-bold text-sm text-slate-900">Submit Institutional Quote</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Offer Yield (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={quoteYield}
                      onChange={(e) => setQuoteYield(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Clean Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={quotePrice}
                      onChange={(e) => setQuotePrice(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#05362a] hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-xs"
                  >
                    Submit Quote to Matrix
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
            Select an RFQ to inspect.
          </div>
        )}
      </div>
    </div>
  );
};
