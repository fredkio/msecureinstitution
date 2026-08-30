import React, { useState } from 'react';
import { useInstitution } from '../../context/InstitutionContext';
import { InstitutionId, PersonaId } from '../../types/institution';
import { INITIAL_INSTITUTIONS } from '../../data/mockData';
import {
  MessageSquare,
  Mail,
  ScrollText,
  FolderLock,
  Send,
  Ticket,
  BellRing,
  FileSpreadsheet,
  X,
  Lock,
  Plus
} from 'lucide-react';

export const UniversalComposerModal: React.FC = () => {
  const {
    isComposerOpen,
    composerDefaultType,
    composerContextData,
    closeComposer,
    activeInstitution,
    activePersona,
    sendChatMessage,
    startHierarchicalChat,
    sendFormalMessage,
    createCase,
    createTradeTicket,
    createRFQ,
    createCorrespondence,
    chatThreads
  } = useInstitution();

  const [activeTab, setActiveTab] = useState<'message' | 'chat' | 'case' | 'trade' | 'rfq' | 'correspondence'>('message');

  // Common 3-Step Hierarchy Form States
  const [recipientInstId, setRecipientInstId] = useState<InstitutionId>('SUMMIT_BANK');
  const [targetDeptIndex, setTargetDeptIndex] = useState<number>(0);
  const [targetTeam, setTargetTeam] = useState<string>('Fixed Income');
  const [targetPersonaId, setTargetPersonaId] = useState<PersonaId | ''>('ngozi_umeh');

  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [priority, setPriority] = useState<'NORMAL' | 'URGENT' | 'HIGH_PRIORITY'>('NORMAL');

  // Trade / RFQ States
  const [instrument, setInstrument] = useState('FGN Bonds 16.2884% 18-MAR-2031');
  const [yieldRate, setYieldRate] = useState('18.45');
  const [amountNgn, setAmountNgn] = useState('1500000000');
  const [settlementDate, setSettlementDate] = useState('2026-08-31');

  // Target Bank details
  const selectedTargetInst = INITIAL_INSTITUTIONS[recipientInstId];
  const departments = selectedTargetInst?.departments || [];
  const selectedDepartment = departments[targetDeptIndex] || departments[0];
  const availableTeams = selectedDepartment?.teams || [];

  const filteredPersonas = selectedTargetInst?.personas.filter(p =>
    p.department.toLowerCase().includes(selectedDepartment?.name.toLowerCase()) ||
    selectedDepartment?.name.toLowerCase().includes(p.department.toLowerCase())
  ) || selectedTargetInst?.personas || [];

  // Sync composer tab when opened
  React.useEffect(() => {
    if (composerDefaultType) {
      setActiveTab(composerDefaultType as any);
    }
    if (composerContextData?.instrument) {
      setInstrument(composerContextData.instrument);
    }
    if (composerContextData?.yield) {
      setYieldRate(composerContextData.yield.toString());
    }
  }, [composerDefaultType, composerContextData]);

  if (!isComposerOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'message') {
      sendFormalMessage({
        recipientInstitutionId: recipientInstId,
        recipientTeam: `${selectedDepartment?.name || 'Operations'} / ${targetTeam}`,
        recipientPersonaId: targetPersonaId ? (targetPersonaId as PersonaId) : undefined,
        subject: subject || 'Institutional Interbank Inquiry',
        body: body || 'Official bilateral communication from ' + activeInstitution.legalName,
        priority
      });
      closeComposer();
    } else if (activeTab === 'chat') {
      startHierarchicalChat(
        recipientInstId,
        selectedDepartment?.name || 'General Operations',
        targetTeam || availableTeams[0] || 'Operations',
        targetPersonaId ? (targetPersonaId as PersonaId) : undefined,
        body || 'Hello, initiating interbank inquiry.'
      );
      closeComposer();
    } else if (activeTab === 'case') {
      createCase({
        receivingInstitutionId: recipientInstId,
        assignedTeam: targetTeam || 'Payments Operations',
        title: subject || 'Bilateral Clearing Reconciliation Case',
        description: body || 'Dispute in batch settlement trace.',
        amountNgn: parseFloat(amountNgn) || 0,
        affectedTransactionsCount: 146,
        type: 'SETTLEMENT_RECONCILIATION',
        attachments: [{
          name: 'Settlement_Schedule_28082026.xlsx',
          size: '1.2 MB',
          uploadedBy: activePersona.name,
          timestamp: '12:00'
        }]
      });
      closeComposer();
    } else if (activeTab === 'trade') {
      createTradeTicket({
        sellerInstitutionId: recipientInstId,
        sellerDealerName: targetPersonaId ? (INITIAL_INSTITUTIONS[recipientInstId]?.personas.find(p => p.id === targetPersonaId)?.name || 'Summit Dealer') : 'Summit Dealer',
        sellerDealerPersonaId: targetPersonaId ? (targetPersonaId as PersonaId) : 'ngozi_umeh',
        instrument,
        amountNgn: parseFloat(amountNgn),
        yieldRate: parseFloat(yieldRate),
        settlementDate,
        settlementConvention: 'T+2'
      });
      closeComposer();
    } else if (activeTab === 'rfq') {
      createRFQ({
        instrument,
        side: 'BUY',
        amountNgn: parseFloat(amountNgn),
        selectedCounterparties: [{ institutionId: recipientInstId, institutionName: selectedTargetInst?.legalName || 'Counterparty' }],
        settlementDate,
        settlementConvention: 'T+2'
      });
      closeComposer();
    } else if (activeTab === 'correspondence') {
      createCorrespondence({
        destinationInstitutionId: recipientInstId,
        destinationTeam: targetTeam || 'Operations',
        classification: 'OFFICIAL_REQUEST',
        subject: subject || 'Official Statement of Account Mandate',
        bodyMarkdown: body || 'Under delegated public finance authority, we request the immediate certified statement.',
        attachments: [{ name: 'Statutory_Authorization_Gazette.pdf', size: '2.4 MB' }]
      });
      closeComposer();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#05362a] flex items-center justify-center font-bold">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-slate-900">Initiate Network Action</h2>
              <p className="text-[11px] text-slate-500">Dispatch verified institutional communication or transaction</p>
            </div>
          </div>
          <button
            onClick={closeComposer}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Object Selector Tabs */}
        <div className="flex bg-slate-50 p-1.5 border-b border-slate-200 text-xs font-semibold gap-1">
          {[
            { id: 'message', label: 'Message' },
            { id: 'chat', label: 'Chat' },
            { id: 'case', label: 'Case' },
            { id: 'trade', label: 'Trade Ticket' },
            { id: 'rfq', label: 'RFQ' },
            { id: 'correspondence', label: 'Correspondence' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 rounded-xl text-center transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-slate-950 font-bold shadow-xs border border-slate-200/80'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* 3-STEP HIERARCHY: Bank -> Unit -> Individual */}
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3">
            <div className="font-bold text-slate-900 flex justify-between">
              <span>Counterparty Corridor Selection</span>
              <span className="text-[10px] text-slate-400 font-mono">Bank → Unit → Officer</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* 1. Bank */}
              <div>
                <label className="block text-slate-600 font-semibold mb-1 text-[11px]">1. Bank / Institution</label>
                <select
                  value={recipientInstId}
                  onChange={(e) => {
                    setRecipientInstId(e.target.value as InstitutionId);
                    setTargetDeptIndex(0);
                    setTargetPersonaId('');
                  }}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2 text-slate-900 font-bold"
                >
                  {Object.values(INITIAL_INSTITUTIONS).filter(i => i.id !== activeInstitution.id).map(inst => (
                    <option key={inst.id} value={inst.id}>{inst.displayName}</option>
                  ))}
                </select>
              </div>

              {/* 2. Unit */}
              <div>
                <label className="block text-slate-600 font-semibold mb-1 text-[11px]">2. Unit / Desk</label>
                <select
                  value={targetTeam}
                  onChange={(e) => setTargetTeam(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2 text-slate-900 font-medium"
                >
                  {departments.flatMap(d => d.teams).map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* 3. Individual */}
              <div>
                <label className="block text-slate-600 font-semibold mb-1 text-[11px]">3. Target Individual</label>
                <select
                  value={targetPersonaId}
                  onChange={(e) => setTargetPersonaId(e.target.value as PersonaId)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2 text-slate-900 font-medium"
                >
                  <option value="">(All Unit Officers)</option>
                  {selectedTargetInst?.personas.map(p => (
                    <option key={p.id} value={p.id}>{p.name} [{p.roleType}]</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Trade / RFQ Fields */}
          {(activeTab === 'trade' || activeTab === 'rfq') && (
            <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-3">
              <div>
                <label className="block text-[#05362a] font-bold mb-1">Financial Instrument & Tenor</label>
                <select
                  value={instrument}
                  onChange={(e) => setInstrument(e.target.value)}
                  className="w-full bg-white border border-emerald-300 rounded-xl p-2.5 text-slate-900 font-mono"
                >
                  <option value="FGN Bonds 16.2884% 18-MAR-2031">FGN Bonds 16.2884% 18-MAR-2031 (7Y Benchmark)</option>
                  <option value="FGN Bonds 14.55% 26-APR-2029">FGN Bonds 14.55% 26-APR-2029 (5Y Benchmark)</option>
                  <option value="NTB 364D 15-AUG-2027">NTB 364D 15-AUG-2027 (1Y Treasury Bill)</option>
                  <option value="USD/NGN NAFEM Spot">USD/NGN NAFEM Spot</option>
                  <option value="Open Buy Back (OBB) Repo">Open Buy Back (OBB) Repo</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3 font-mono">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1 font-sans">Nominal Face Value (NGN)</label>
                  <input
                    type="number"
                    value={amountNgn}
                    onChange={(e) => setAmountNgn(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 text-slate-900"
                  />
                  <span className="text-[10px] text-slate-500 font-sans mt-0.5 block">
                    ≈ ₦{(parseFloat(amountNgn)/1e9).toFixed(2)}B
                  </span>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1 font-sans">Agreed Yield / Rate (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={yieldRate}
                    onChange={(e) => setYieldRate(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 text-slate-900 font-bold text-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1 font-sans">Settlement Date</label>
                  <input
                    type="date"
                    value={settlementDate}
                    onChange={(e) => setSettlementDate(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 text-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Subject Line */}
          {activeTab !== 'chat' && activeTab !== 'trade' && (
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Subject / Mandate Title</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={
                  activeTab === 'case' ? 'e.g., Unsettled POS Clearing Cycle 3 Reconciliation' :
                  activeTab === 'correspondence' ? 'e.g., Formal TSA Monthly Tax Collection Audit' :
                  'e.g., Interbank Liquidity Inquiry'
                }
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
              />
            </div>
          )}

          {/* Content / Body Markdown */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              {activeTab === 'chat' ? 'Initial Chat Message' : 'Official Communication Body'}
            </label>
            <textarea
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Type formal message or instructions..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-[#05362a]"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="text-[11px] text-slate-400 font-mono">
              From: <strong className="text-slate-700 font-sans">{activeInstitution.legalName}</strong>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={closeComposer}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#05362a] hover:bg-emerald-900 text-white font-bold rounded-xl shadow-xs"
              >
                Transmit to Network
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
