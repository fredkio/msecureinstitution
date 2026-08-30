import React, { useState, useEffect } from 'react';
import { useInstitution } from '../../context/InstitutionContext';
import { ChatThread, InstitutionId, PersonaId } from '../../types/institution';
import { INITIAL_INSTITUTIONS } from '../../data/mockData';
import {
  Sparkles,
  CheckCircle,
  Ticket,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  X,
  MessageSquare,
  Lock,
  Edit3
} from 'lucide-react';

interface ChatTicketExtractorModalProps {
  isOpen: boolean;
  onClose: () => void;
  thread: ChatThread | null;
}

export const ChatTicketExtractorModal: React.FC<ChatTicketExtractorModalProps> = ({
  isOpen,
  onClose,
  thread
}) => {
  const {
    chatMessages,
    createTradeTicket,
    activePersona,
    activeInstitution,
    openStepUpAuth
  } = useInstitution();

  // Extracted Editable Form States
  const [instrument, setInstrument] = useState('FGN Bonds 16.2884% 18-MAR-2031');
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [amountNgn, setAmountNgn] = useState('1500000000');
  const [yieldRate, setYieldRate] = useState('18.45');
  const [settlementDate, setSettlementDate] = useState('2026-08-31');
  const [settlementConvention, setSettlementConvention] = useState('T+2');
  const [sellerInstId, setSellerInstId] = useState<InstitutionId>('SUMMIT_BANK');
  const [sellerDealerName, setSellerDealerName] = useState('Ngozi Umeh');

  const messages = thread ? (chatMessages[thread.id] || []) : [];

  // Intelligently parse terms when thread changes
  useEffect(() => {
    if (thread) {
      if (thread.targetInstitutionId) {
        setSellerInstId(thread.targetInstitutionId);
      }
      if (thread.targetPersonaName) {
        setSellerDealerName(thread.targetPersonaName);
      }

      // Check text in messages for extracted values
      const fullText = messages.map(m => m.text).join(' ');

      if (fullText.includes('18.45')) setYieldRate('18.45');
      else if (fullText.includes('18.42')) setYieldRate('18.42');

      if (fullText.includes('1.5bn') || fullText.includes('1.5B') || fullText.includes('1500000000')) {
        setAmountNgn('1500000000');
      }

      if (fullText.includes('NTB')) {
        setInstrument('NTB 364D 15-AUG-2027');
      } else if (fullText.includes('FGN') || fullText.includes('2031')) {
        setInstrument('FGN Bonds 16.2884% 18-MAR-2031');
      }
    }
  }, [thread, messages]);

  if (!isOpen || !thread) return null;

  const handleConfirmTradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amountNgn);
    const parsedYield = parseFloat(yieldRate);

    const executeCreation = () => {
      createTradeTicket({
        originatingChatId: thread.id,
        sellerInstitutionId: sellerInstId,
        sellerDealerName: sellerDealerName,
        sellerDealerPersonaId: (thread.targetPersonaId || 'ngozi_umeh') as PersonaId,
        instrument,
        amountNgn: parsedAmount,
        yieldRate: parsedYield,
        settlementDate,
        settlementConvention,
        status: parsedAmount > 2000000000 ? 'PENDING_SUPERVISOR_APPROVAL' : 'CONFIRMED'
      });
      onClose();
    };

    if (parsedAmount > 2000000000) {
      openStepUpAuth(
        `High-Value Trade Interception: ₦${(parsedAmount/1e9).toFixed(2)}B`,
        `Extracted trade exceeds dealer limit of ₦2.0B. Trade will be submitted to Supervisor Approvals inbox.`,
        executeCreation
      );
    } else {
      executeCreation();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="px-8 py-5 bg-[#05362a] text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center font-bold text-emerald-300 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-base text-white">Automated Trade Term Extractor</h3>
                <span className="px-2.5 py-0.5 bg-emerald-400/20 text-emerald-300 rounded-full font-mono font-bold text-[10px] border border-emerald-400/30">
                  AI TERM PARSER ✨
                </span>
              </div>
              <p className="text-xs text-emerald-100/80 mt-0.5">
                Extracted trade parameters from chat ref <strong className="font-mono text-white">{thread.id}</strong> ({thread.title})
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-emerald-300 hover:text-white p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Left Source Chat vs Right Extracted Ticket */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {/* Left: Source Chat Transcript */}
          <div className="p-6 bg-slate-50 overflow-y-auto flex flex-col space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#05362a]" />
                <span>Source Chat Transcript</span>
              </span>
              <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded text-[10px] font-mono font-bold">
                ATTACHED REF: {thread.id}
              </span>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl text-emerald-950 text-[11px] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#05362a] shrink-0" />
              <span>Extracted terms are highlighted in green. You can edit any parameter on the right before issuing.</span>
            </div>

            <div className="space-y-3 flex-1">
              {messages.map((msg) => (
                <div key={msg.id} className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                    <span className="font-bold text-slate-700">{msg.senderName} ({msg.senderInstitution})</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <div className="text-slate-800 text-xs leading-relaxed">
                    {msg.text.includes('18.45') || msg.text.includes('1.5bn') ? (
                      <span>
                        {msg.text.split(/(18\.45%?|1\.5bn|FGN 2031)/g).map((part, i) =>
                          /18\.45%?|1\.5bn|FGN 2031/.test(part) ? (
                            <mark key={i} className="bg-emerald-100 text-emerald-900 font-bold px-1 rounded">
                              {part}
                            </mark>
                          ) : (
                            part
                          )
                        )}
                      </span>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Extracted Editable Trade Ticket Form */}
          <form onSubmit={handleConfirmTradeSubmit} className="p-6 bg-white overflow-y-auto space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <Ticket className="w-4 h-4 text-emerald-700" />
                <span>Extracted Trade Ticket Parameters</span>
              </span>
              <span className="text-[10px] text-emerald-700 font-mono font-bold flex items-center gap-1">
                <Edit3 className="w-3 h-3" />
                <span>Editable Preview</span>
              </span>
            </div>

            {/* Instrument Selection */}
            <div>
              <label className="block text-slate-700 font-bold mb-1 flex items-center justify-between">
                <span>Financial Instrument</span>
                <span className="text-[10px] text-emerald-700 font-mono font-bold">EXTRACTED ✓</span>
              </label>
              <select
                value={instrument}
                onChange={(e) => setInstrument(e.target.value)}
                className="w-full bg-emerald-50/50 border border-emerald-300 rounded-xl p-2.5 text-slate-900 font-mono font-bold focus:outline-none"
              >
                <option value="FGN Bonds 16.2884% 18-MAR-2031">FGN Bonds 16.2884% 18-MAR-2031 (7Y Benchmark)</option>
                <option value="FGN Bonds 14.55% 26-APR-2029">FGN Bonds 14.55% 26-APR-2029 (5Y Benchmark)</option>
                <option value="NTB 364D 15-AUG-2027">NTB 364D 15-AUG-2027 (1Y Treasury Bill)</option>
                <option value="USD/NGN NAFEM Spot">USD/NGN NAFEM Spot</option>
                <option value="Open Buy Back (OBB) Repo">Open Buy Back (OBB) Repo</option>
              </select>
            </div>

            {/* Side & Amount */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Trade Direction</label>
                <select
                  value={side}
                  onChange={(e) => setSide(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-bold"
                >
                  <option value="BUY">BUY (Purchaser)</option>
                  <option value="SELL">SELL (Seller)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1 flex items-center justify-between">
                  <span>Agreed Yield (%)</span>
                  <span className="text-[10px] text-emerald-700 font-mono font-bold">EXTRACTED ✓</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={yieldRate}
                  onChange={(e) => setYieldRate(e.target.value)}
                  className="w-full bg-emerald-50/50 border border-emerald-300 rounded-xl p-2.5 text-slate-900 font-mono font-bold text-emerald-900"
                />
              </div>
            </div>

            {/* Nominal Amount */}
            <div>
              <label className="block text-slate-700 font-bold mb-1 flex items-center justify-between">
                <span>Nominal Face Value (NGN)</span>
                <span className="text-[10px] text-emerald-700 font-mono font-bold">EXTRACTED ✓</span>
              </label>
              <input
                type="number"
                value={amountNgn}
                onChange={(e) => setAmountNgn(e.target.value)}
                className="w-full bg-emerald-50/50 border border-emerald-300 rounded-xl p-2.5 text-slate-900 font-mono font-bold"
              />
              <span className="text-[11px] text-slate-500 font-mono mt-1 block">
                Equivalent: ₦{(parseFloat(amountNgn || '0') / 1e9).toFixed(2)} Billion NGN
              </span>
            </div>

            {/* Counterparty Bank & Dealer */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="font-bold text-slate-900 text-[11px]">Counterparty Assignment</div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Bank:</span>
                  <span className="font-bold text-slate-900">{INITIAL_INSTITUTIONS[sellerInstId]?.displayName || sellerInstId}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Dealer:</span>
                  <span className="font-bold text-slate-900">{sellerDealerName}</span>
                </div>
              </div>
            </div>

            {/* Settlement Convention */}
            <div className="grid grid-cols-2 gap-3 font-mono">
              <div>
                <label className="block text-slate-700 font-bold mb-1 font-sans">Settlement Date</label>
                <input
                  type="date"
                  value={settlementDate}
                  onChange={(e) => setSettlementDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1 font-sans">Settlement Convention</label>
                <select
                  value={settlementConvention}
                  onChange={(e) => setSettlementConvention(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-slate-900"
                >
                  <option value="T+2">T+2 (CSCS Standard)</option>
                  <option value="T+1">T+1 (Next Day)</option>
                  <option value="SPOT">SPOT</option>
                  <option value="SAME_DAY">SAME DAY (T+0)</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#05362a] hover:bg-emerald-900 text-white font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-2"
              >
                <span>Confirm & Issue Ticket →</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
