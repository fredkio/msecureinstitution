import React, { useState } from 'react';
import { useInstitution } from '../context/InstitutionContext';
import { TradeTicket } from '../types/institution';
import {
  FileSpreadsheet,
  Ticket,
  CheckCircle,
  Clock,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  Plus,
  TrendingUp,
  Download,
  Filter
} from 'lucide-react';

export const TradeBlotterView: React.FC = () => {
  const {
    tradesList,
    approveTradeSupervisor,
    confirmTradeCounterparty,
    proposeTradeAmendment,
    acceptTradeAmendment,
    rejectTradeAmendment,
    openComposer,
    activePersona,
    activeInstitution,
    openStepUpAuth
  } = useInstitution();

  const [blotterDateScope, setBlotterDateScope] = useState<'TODAY' | 'ALL'>('TODAY');
  const [blotterScope, setBlotterScope] = useState<'MY' | 'TEAM' | 'INSTITUTION'>('MY');
  const [instrumentFilter, setInstrumentFilter] = useState<string>('ALL');
  const [selectedTradeId, setSelectedTradeId] = useState<string>(tradesList[0]?.id || 'MSC-TRD-100483');
  
  // Amendment Form States
  const [isAmending, setIsAmending] = useState(false);
  const [newYield, setNewYield] = useState('18.50');
  const [newAmount, setNewAmount] = useState('1500000000');
  const [amendReason, setAmendReason] = useState('Post-trade rate adjustment agreed bilaterally.');

  const currentDateStr = '2026-08-30';

  // Filter trades processed for the selected scope & date
  const filteredTrades = tradesList.filter(t => {
    if (blotterDateScope === 'TODAY' && t.tradeDate !== currentDateStr) return false;
    if (blotterScope === 'MY') {
      return t.buyerDealerPersonaId === activePersona.id || t.sellerDealerPersonaId === activePersona.id;
    }
    if (instrumentFilter !== 'ALL' && !t.instrument.toLowerCase().includes(instrumentFilter.toLowerCase())) return false;
    return true;
  });

  const todayTrades = tradesList.filter(t => t.tradeDate === currentDateStr);
  const myTodayTrades = todayTrades.filter(t => t.buyerDealerPersonaId === activePersona.id || t.sellerDealerPersonaId === activePersona.id);
  
  const totalVolumeTodayNgn = myTodayTrades.reduce((acc, t) => acc + (t.amountNgn || 0), 0);
  const pendingApprovalsToday = myTodayTrades.filter(t => t.status === 'PENDING_SUPERVISOR_APPROVAL');

  const currentTrade = tradesList.find(t => t.id === selectedTradeId) || filteredTrades[0] || tradesList[0];

  const handleProposeAmendmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTrade) return;
    proposeTradeAmendment(currentTrade.id, parseFloat(newYield), parseFloat(newAmount), currentTrade.settlementDate, amendReason);
    setIsAmending(false);
  };

  const handleSupervisorApprove = (tradeId: string) => {
    openStepUpAuth(
      `Supervisor Trade Approval: ${tradeId}`,
      `Approving high-value trade exceeding dealer limit. Commits ${activeInstitution.legalName} to settlement obligations.`,
      () => approveTradeSupervisor(tradeId)
    );
  };

  return (
    <div className="p-8 space-y-6 text-slate-900 max-w-7xl mx-auto overflow-y-auto">
      {/* Top Banner & Daily Summary Header */}
      <div className="bg-[#05362a] text-white rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold uppercase tracking-wide border border-emerald-400/30">
            <Calendar className="w-3.5 h-3.5" />
            <span>Dealer Daily Blotter • {currentDateStr} (Today)</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight mt-1">Official Trade Blotter</h1>
          <p className="text-emerald-100/80 text-xs mt-0.5">
            Real-time trade executions, confirmations, and settlement dockets processed by <strong className="text-white">{activePersona.name}</strong> ({activePersona.title})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openComposer('trade')}
            className="px-4 py-2.5 bg-[#10b981] hover:bg-[#059669] text-slate-950 font-bold text-xs rounded-xl shadow transition cursor-pointer flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create Trade Ticket</span>
          </button>
          <button
            onClick={() => alert(`Exporting Daily Blotter for ${activePersona.name} (${currentDateStr})...`)}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Daily CSV</span>
          </button>
        </div>
      </div>

      {/* Daily Metrics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
          <div className="text-slate-500 font-semibold flex items-center justify-between">
            <span>Today's Traded Volume</span>
            <TrendingUp className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-950 mt-2">
            ₦{(totalVolumeTodayNgn / 1e9).toFixed(2)}B
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
            Processed for {currentDateStr}
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
          <div className="text-slate-500 font-semibold flex items-center justify-between">
            <span>Today's Trade Count</span>
            <Ticket className="w-4 h-4 text-blue-700" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-950 mt-2">
            {myTodayTrades.length} Trades
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Dealer Execution Count
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
          <div className="text-slate-500 font-semibold flex items-center justify-between">
            <span>Average Executed Yield</span>
            <Layers className="w-4 h-4 text-purple-700" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-950 mt-2">
            {myTodayTrades.length > 0
              ? (myTodayTrades.reduce((acc, t) => acc + t.yieldRate, 0) / myTodayTrades.length).toFixed(2) + '%'
              : '18.45%'}
          </div>
          <div className="text-[11px] text-purple-700 font-semibold mt-0.5">
            Daily Weighted Benchmark
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
          <div className="text-slate-500 font-semibold flex items-center justify-between">
            <span>Pending Approvals Today</span>
            <AlertTriangle className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-950 mt-2">
            {pendingApprovalsToday.length}
          </div>
          <div className="text-[11px] text-amber-700 font-semibold mt-0.5">
            Awaiting Supervisor Seal
          </div>
        </div>
      </div>

      {/* Main Blotter Grid: Left Trade List + Right Ticket Docket */}
      <div className="h-[620px] flex rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
        {/* Left: Trade List Panel */}
        <div className="w-96 border-r border-slate-200 flex flex-col h-full shrink-0">
          <div className="p-4 border-b border-slate-100 space-y-3 bg-slate-50/50">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900">
              <span>Filter Daily Blotter</span>
              <span className="text-[10px] text-slate-500 font-mono">{filteredTrades.length} trades found</span>
            </div>

            {/* Date Scope Filter */}
            <div className="grid grid-cols-2 gap-1 bg-slate-200/70 p-1 rounded-xl text-xs font-bold text-slate-700">
              <button
                onClick={() => setBlotterDateScope('TODAY')}
                className={`py-1 rounded-lg transition cursor-pointer ${
                  blotterDateScope === 'TODAY' ? 'bg-white text-slate-950 shadow-xs' : 'hover:text-slate-900 text-slate-600'
                }`}
              >
                Today ({currentDateStr})
              </button>
              <button
                onClick={() => setBlotterDateScope('ALL')}
                className={`py-1 rounded-lg transition cursor-pointer ${
                  blotterDateScope === 'ALL' ? 'bg-white text-slate-950 shadow-xs' : 'hover:text-slate-900 text-slate-600'
                }`}
              >
                All Dates History
              </button>
            </div>

            {/* Scope Filter */}
            <div className="grid grid-cols-3 gap-1 bg-slate-200/70 p-1 rounded-xl text-[11px] font-semibold text-slate-700">
              <button
                onClick={() => setBlotterScope('MY')}
                className={`py-1 rounded-lg transition cursor-pointer ${
                  blotterScope === 'MY' ? 'bg-white text-slate-950 font-bold shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                My Trades
              </button>
              <button
                onClick={() => setBlotterScope('TEAM')}
                className={`py-1 rounded-lg transition cursor-pointer ${
                  blotterScope === 'TEAM' ? 'bg-white text-slate-950 font-bold shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                Desk Team
              </button>
              <button
                onClick={() => setBlotterScope('INSTITUTION')}
                className={`py-1 rounded-lg transition cursor-pointer ${
                  blotterScope === 'INSTITUTION' ? 'bg-white text-slate-950 font-bold shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                Institution
              </button>
            </div>
          </div>

          {/* List of Trades */}
          <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
            {filteredTrades.map((trade) => {
              const isSelected = trade.id === selectedTradeId;
              const isBuyer = trade.buyerDealerPersonaId === activePersona.id;

              return (
                <div
                  key={trade.id}
                  onClick={() => setSelectedTradeId(trade.id)}
                  className={`p-4 cursor-pointer transition text-left text-xs ${
                    isSelected ? 'bg-emerald-50/70 border-l-4 border-[#05362a]' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-xs text-[#05362a] flex items-center gap-1.5">
                      <span>{trade.id}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-extrabold ${isBuyer ? 'bg-blue-100 text-blue-900' : 'bg-purple-100 text-purple-900'}`}>
                        {isBuyer ? 'BUY' : 'SELL'}
                      </span>
                    </span>

                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      trade.status === 'CONFIRMED' || trade.status === 'SETTLED' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                      trade.status === 'PENDING_SUPERVISOR_APPROVAL' ? 'bg-amber-50 text-amber-900 border border-amber-200' :
                      'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>{trade.status.replace('_', ' ')}</span>
                    </span>
                  </div>

                  <div className="font-bold text-slate-900 text-xs truncate mt-1">{trade.instrument}</div>

                  <div className="text-[11px] text-slate-600 mt-1 flex justify-between font-mono font-bold">
                    <span>₦{(trade.amountNgn / 1e9).toFixed(2)}B @ {trade.yieldRate}%</span>
                    <span className="text-slate-400 font-normal">v{trade.currentVersion}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                    <span>{trade.buyerInstitutionName.split(' ')[0]} ↔ {trade.sellerInstitutionName.split(' ')[0]}</span>
                    <span>{trade.tradeDate || 'Today'}</span>
                  </div>
                </div>
              );
            })}

            {filteredTrades.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-xs">
                No trades recorded in daily blotter for selected filters.
              </div>
            )}
          </div>
        </div>

        {/* Right: Selected Trade Docket Detail */}
        <div className="flex-1 flex flex-col h-full bg-[#f8fafc] overflow-hidden">
          {currentTrade ? (
            <>
              {/* Header Ribbon */}
              <div className="px-8 py-4 border-b border-slate-200 bg-white flex items-center justify-between shadow-xs">
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="font-mono font-bold text-base text-[#05362a]">{currentTrade.id}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-900 font-bold">{currentTrade.instrument}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 font-mono">
                    Processed Today: {currentTrade.tradeDate} • Ref: {currentTrade.settlementReference || 'PENDING_CSCS'}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {currentTrade.status === 'PENDING_COUNTERPARTY_CONFIRMATION' && (
                    <button
                      onClick={() => confirmTradeCounterparty(currentTrade.id)}
                      className="px-4 py-2 bg-[#05362a] hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer flex items-center gap-1.5 transition"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-300" />
                      <span>Confirm & Approve Trade Ticket →</span>
                    </button>
                  )}

                  {currentTrade.status === 'PENDING_SUPERVISOR_APPROVAL' && activePersona.canApproveTrades && (
                    <button
                      onClick={() => handleSupervisorApprove(currentTrade.id)}
                      className="px-4 py-2 bg-[#05362a] hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer"
                    >
                      Approve Trade (Supervisor Seal)
                    </button>
                  )}

                  {currentTrade.status === 'CONFIRMED' && !currentTrade.amendmentProposed && (
                    <button
                      onClick={() => setIsAmending(true)}
                      className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Propose Trade Amendment (v{currentTrade.currentVersion + 1})
                    </button>
                  )}
                </div>
              </div>

              {/* Trade Docket Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 max-w-4xl mx-auto w-full text-xs">
                {/* Main Card */}
                <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-6 shadow-sm">
                  <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                    <div>
                      <span className="px-2.5 py-1 bg-emerald-50 text-[#05362a] rounded-lg font-mono font-bold text-xs border border-emerald-200">
                        {currentTrade.instrument}
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-950 mt-2">
                        Nominal Value: ₦{currentTrade.amountNgn.toLocaleString()} NGN
                      </h3>
                      <div className="text-slate-500 text-xs mt-0.5">
                        Agreed Yield: <strong className="text-emerald-800 font-mono text-sm">{currentTrade.yieldRate}%</strong>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className="text-xs text-slate-500">Value Date</div>
                      <div className="text-slate-900 font-bold text-sm mt-0.5">{currentTrade.settlementDate} ({currentTrade.settlementConvention})</div>
                      <div className="text-[10px] text-emerald-700 font-bold mt-1">CSCS & RTGS BINDING ✓</div>
                    </div>
                  </div>

                  {/* Counterparty Matrix */}
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                    <div className="space-y-1">
                      <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wider font-mono">BUYER (PURCHASER)</div>
                      <div className="font-bold text-slate-950 text-sm">{currentTrade.buyerInstitutionName}</div>
                      <div className="text-slate-600">Dealer: {currentTrade.buyerDealerName}</div>
                    </div>

                    <div className="space-y-1 border-l border-slate-200 pl-4">
                      <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wider font-mono">SELLER (COUNTERPARTY)</div>
                      <div className="font-bold text-slate-950 text-sm">{currentTrade.sellerInstitutionName}</div>
                      <div className="text-slate-600">Dealer: {currentTrade.sellerDealerName}</div>
                    </div>
                  </div>

                  {/* Audit Trail & Versions */}
                  <div className="space-y-3 pt-2">
                    <div className="font-mono text-[10px] text-slate-400 font-bold uppercase">Trade Docket Version History</div>
                    <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-xl overflow-hidden bg-white">
                      {currentTrade.versionHistory?.map((ver) => (
                        <div key={ver.version} className="p-3 flex items-center justify-between text-xs font-mono">
                          <div>
                            <span className="font-bold text-slate-900">Version {ver.version}</span>
                            <span className="text-slate-400 mx-2">•</span>
                            <span className="text-slate-600">₦{(ver.amountNgn/1e9).toFixed(2)}B @ {ver.yieldRate}%</span>
                          </div>
                          <div className="text-slate-400 text-[11px]">
                            {ver.modifiedBy} • {ver.modifiedAt}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Propose Amendment Modal */}
              {isAmending && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-lg p-6 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <h3 className="font-bold text-sm text-slate-900">Propose Bilateral Trade Amendment</h3>
                      <button onClick={() => setIsAmending(false)} className="text-slate-400 hover:text-slate-800">✕</button>
                    </div>

                    <form onSubmit={handleProposeAmendmentSubmit} className="space-y-4 text-xs">
                      {/* Visual Diff Preview Matrix */}
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                        <div className="font-bold text-slate-900 mb-1">Visual Diff Matrix (v1 ➔ v2)</div>
                        <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                          <div>
                            <span className="text-slate-400 block">Original Yield:</span>
                            <span className="line-through text-slate-500">{currentTrade.yieldRate}%</span>
                          </div>
                          <div>
                            <span className="text-emerald-700 font-bold block">Proposed Yield:</span>
                            <span className="text-emerald-800 font-bold">{newYield}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 font-mono">
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1 font-sans">Revised Yield (%)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={newYield}
                            onChange={(e) => setNewYield(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-slate-900 font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 font-semibold mb-1 font-sans">Revised Amount (NGN)</label>
                          <input
                            type="number"
                            value={newAmount}
                            onChange={(e) => setNewAmount(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-slate-900 font-bold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Bilateral Justification Note</label>
                        <input
                          type="text"
                          value={amendReason}
                          onChange={(e) => setAmendReason(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
                        />
                      </div>

                      <div className="flex justify-end space-x-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAmending(false)}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#05362a] hover:bg-emerald-900 text-white font-bold rounded-xl shadow"
                        >
                          Transmit Amendment Request
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
              Select a trade ticket to view full blotter docket.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
