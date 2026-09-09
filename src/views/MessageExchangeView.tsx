import React, { useState } from 'react';
import { useInstitution } from '../context/InstitutionContext';
import { ExchangeMessage, InstitutionId } from '../types/institution';
import { INITIAL_INSTITUTIONS } from '../data/mockData';
import {
  Send,
  Plus,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  ThumbsUp,
  ArrowUpRight,
  ArrowDownLeft,
  X,
  CreditCard,
  DollarSign,
  Building2,
  Filter,
  Check,
  Ban
} from 'lucide-react';

export const MessageExchangeView: React.FC = () => {
  const {
    exchangeMessages,
    createExchangeMessage,
    authorizeExchangeMessage,
    acknowledgeExchangeMessage,
    rejectExchangeMessage,
    activePersona,
    activeInstitution
  } = useInstitution();

  const [searchTerm, setSearchTerm] = useState('');
  const [directionFilter, setDirectionFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ExchangeMessage | null>(null);

  // New Exchange Message Form States
  const [counterpartyId, setCounterpartyId] = useState<InstitutionId>('SUMMIT_BANK');
  const [msgType, setMsgType] = useState<'SMCTC100' | 'SMCTC202' | 'SMCTC103'>('SMCTC100');
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('USD');
  const [amount, setAmount] = useState('2000.00');
  const [sendingCustName, setSendingCustName] = useState('Dangote Industries Ltd');
  const [sendingAccountNo, setSendingAccountNo] = useState('1092837465');
  const [beneficiaryCustName, setBeneficiaryCustName] = useState('Africa Logistics Corp');
  const [beneficiaryAccountNo, setBeneficiaryAccountNo] = useState('US9283746501');
  const [processingRole, setProcessingRole] = useState('ORIGINATING_DESK');
  const [forwardedBankCode, setForwardedBankCode] = useState('CBN-SETTLE-001');

  // Compute stat card metrics
  const pendingCount = exchangeMessages.filter(m => m.status === 'Pending').length;
  const authorizedCount = exchangeMessages.filter(m => m.status === 'Authorized').length;
  const acknowledgedCount = exchangeMessages.filter(m => m.status === 'Acknowledged').length;
  const rejectedCount = exchangeMessages.filter(m => m.status === 'Rejected').length;

  const filteredMessages = exchangeMessages.filter(m => {
    if (directionFilter !== 'ALL' && m.direction !== directionFilter) return false;
    if (statusFilter !== 'ALL' && m.status !== statusFilter) return false;
    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      return (
        m.id.toLowerCase().includes(query) ||
        m.counterpartyInstitutionName.toLowerCase().includes(query) ||
        m.sendingCustomerName.toLowerCase().includes(query) ||
        m.beneficiaryCustomerName.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inst = INITIAL_INSTITUTIONS[counterpartyId];
    createExchangeMessage({
      type: msgType,
      counterpartyInstitutionId: counterpartyId,
      counterpartyInstitutionName: inst?.displayName || counterpartyId,
      currency,
      amount: parseFloat(amount) || 0,
      sendingCustomerName: sendingCustName,
      sendingAccountNo,
      beneficiaryCustomerName: beneficiaryCustName,
      beneficiaryAccountNo,
      processingRole,
      forwardedBankCode
    });
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 space-y-6 text-slate-900 max-w-7xl mx-auto overflow-y-auto font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">Message Exchange</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            Manage incoming and outgoing structured message exchanges
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-[#008751] hover:bg-[#006e42] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>+ New Exchange Message</span>
        </button>
      </div>

      {/* Search & Filters Ribbon */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search reference, type, counterparty..."
            className="w-full bg-white border border-slate-200/90 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#008751] shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={directionFilter}
            onChange={(e) => setDirectionFilter(e.target.value)}
            className="bg-white border border-slate-200/90 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Directions</option>
            <option value="OUT">Outgoing (OUT)</option>
            <option value="IN">Incoming (IN)</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-slate-200/90 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Authorized">Authorized</option>
            <option value="Acknowledged">Acknowledged</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* 4 Summary Stat Cards (Matching Screenshot 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Pending Card */}
        <div className="p-4 bg-[#fffbeb] border border-[#fef3c7] rounded-2xl text-center space-y-1 shadow-2xs">
          <div className="text-2xl font-black text-[#d97706] font-mono">{pendingCount}</div>
          <div className="text-xs font-extrabold text-[#d97706]">Pending</div>
        </div>

        {/* Authorized Card */}
        <div className="p-4 bg-[#eff6ff] border border-[#dbeafe] rounded-2xl text-center space-y-1 shadow-2xs">
          <div className="text-2xl font-black text-[#2563eb] font-mono">{authorizedCount}</div>
          <div className="text-xs font-extrabold text-[#2563eb]">Authorized</div>
        </div>

        {/* Acknowledged Card */}
        <div className="p-4 bg-[#f0fdf4] border border-[#dcfce7] rounded-2xl text-center space-y-1 shadow-2xs">
          <div className="text-2xl font-black text-[#16a34a] font-mono">{acknowledgedCount}</div>
          <div className="text-xs font-extrabold text-[#16a34a]">Acknowledged</div>
        </div>

        {/* Rejected Card */}
        <div className="p-4 bg-[#fef2f2] border border-[#fee2e2] rounded-2xl text-center space-y-1 shadow-2xs">
          <div className="text-2xl font-black text-[#dc2626] font-mono">{rejectedCount}</div>
          <div className="text-xs font-extrabold text-[#dc2626]">Rejected</div>
        </div>
      </div>

      {/* Main Message Exchange Table (Matching Screenshot 1) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-4 px-6">REFERENCE</th>
                <th className="py-4 px-4">TYPE</th>
                <th className="py-4 px-4">DIRECTION</th>
                <th className="py-4 px-6">COUNTERPARTY</th>
                <th className="py-4 px-4">CURRENCY</th>
                <th className="py-4 px-6">AMOUNT</th>
                <th className="py-4 px-4">STATUS</th>
                <th className="py-4 px-4">DATE</th>
                <th className="py-4 px-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredMessages.map((msg) => (
                <tr key={msg.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-6 font-mono font-semibold text-slate-600 text-[11px]">
                    {msg.id}
                  </td>

                  <td className="py-4 px-4 font-mono font-bold text-slate-800">
                    {msg.type}
                  </td>

                  <td className="py-4 px-4">
                    {msg.direction === 'OUT' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-fuchsia-50 text-fuchsia-800 border border-fuchsia-200 rounded-full text-[10px] font-extrabold">
                        <ArrowUpRight className="w-3 h-3 text-fuchsia-700" />
                        <span>↑ OUT</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-cyan-50 text-cyan-800 border border-cyan-200 rounded-full text-[10px] font-extrabold">
                        <ArrowDownLeft className="w-3 h-3 text-cyan-700" />
                        <span>↓ IN</span>
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-6 font-bold text-slate-950">
                    {msg.counterpartyInstitutionName}
                  </td>

                  <td className="py-4 px-4 font-mono font-bold text-slate-700">
                    {msg.currency}
                  </td>

                  <td className="py-4 px-6 font-mono font-extrabold text-slate-900 text-sm">
                    {msg.currency === 'USD' ? '$' : '₦'}{msg.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>

                  <td className="py-4 px-4">
                    {msg.status === 'Authorized' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-[10px] font-bold">
                        Authorized
                      </span>
                    )}
                    {msg.status === 'Pending' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-[10px] font-bold">
                        Pending
                      </span>
                    )}
                    {msg.status === 'Acknowledged' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold">
                        Acknowledged
                      </span>
                    )}
                    {msg.status === 'Rejected' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-full text-[10px] font-bold">
                        Rejected
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-4 font-mono text-slate-500">
                    {msg.date}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end space-x-2 text-slate-400">
                      {/* Inspect Detail Eye */}
                      <button
                        onClick={() => setSelectedMessage(msg)}
                        className="hover:text-slate-900 p-1 rounded transition cursor-pointer"
                        title="View Full Docket"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Authorize Action Checkmark */}
                      {msg.status === 'Pending' && (
                        <button
                          onClick={() => authorizeExchangeMessage(msg.id)}
                          className="hover:text-emerald-700 p-1 rounded transition cursor-pointer text-emerald-600"
                          title="Authorize Message"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}

                      {/* Acknowledge Action Thumbs Up */}
                      {msg.status === 'Authorized' && (
                        <button
                          onClick={() => acknowledgeExchangeMessage(msg.id)}
                          className="hover:text-blue-700 p-1 rounded transition cursor-pointer text-blue-600"
                          title="Acknowledge Receipt"
                        >
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                      )}

                      {/* Reject Action X */}
                      {msg.status === 'Pending' && (
                        <button
                          onClick={() => rejectExchangeMessage(msg.id)}
                          className="hover:text-rose-700 p-1 rounded transition cursor-pointer text-rose-600"
                          title="Reject Message"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredMessages.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 text-xs">
                    No exchange messages match your search filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* NEW EXCHANGE MESSAGE MODAL (Matching Screenshot 2) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-950">New Exchange Message</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-800 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 overflow-y-auto text-xs flex-1">
              {/* Counterparty Organization */}
              <div>
                <label className="block text-slate-700 font-bold mb-1 uppercase text-[10px] tracking-wider font-mono">
                  COUNTERPARTY ORGANISATION
                </label>
                <select
                  value={counterpartyId}
                  onChange={(e) => setCounterpartyId(e.target.value as InstitutionId)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-bold focus:outline-none focus:border-[#008751]"
                >
                  {Object.values(INITIAL_INSTITUTIONS).filter(inst => inst.id !== activeInstitution.id).map((inst) => (
                    <option key={inst.id} value={inst.id}>
                      {inst.displayName} ({inst.typeLabel.split('(')[0]})
                    </option>
                  ))}
                </select>
              </div>

              {/* Message Type */}
              <div>
                <label className="block text-slate-700 font-bold mb-1 uppercase text-[10px] tracking-wider font-mono">
                  MESSAGE TYPE
                </label>
                <select
                  value={msgType}
                  onChange={(e) => setMsgType(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-bold focus:outline-none focus:border-[#008751]"
                >
                  <option value="SMCTC100">SMCTC100 — Customer Transfer Credit (Naira & FX)</option>
                  <option value="SMCTC202">SMCTC202 — Interbank Direct Financial Transfer</option>
                  <option value="SMCTC103">SMCTC103 — Single Customer Credit Transfer (ISO 20022)</option>
                </select>
              </div>

              {/* SMCTC100 FIELDS SECTION */}
              <div className="p-5 bg-slate-50/80 border border-slate-200/80 rounded-2xl space-y-3">
                <div className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  SMCTC100 FIELDS
                </div>

                {/* Reference */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Reference <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={`MSG-20260909-${Math.random().toString(36).substring(2, 10).toUpperCase()}`}
                    readOnly
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono font-bold"
                  />
                </div>

                {/* Currency & Amount */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Currency <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as any)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 font-bold"
                    >
                      <option value="USD">USD ($ - US Dollars)</option>
                      <option value="NGN">NGN (₦ - Nigerian Naira)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Amount <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono font-bold"
                    />
                  </div>
                </div>

                {/* Sending Customer Name & Account */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Sending Customer Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={sendingCustName}
                    onChange={(e) => setSendingCustName(e.target.value)}
                    placeholder="Ordering Customer Corporate Name"
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Sending Account No <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={sendingAccountNo}
                    onChange={(e) => setSendingAccountNo(e.target.value)}
                    placeholder="e.g. 1092837465"
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono"
                  />
                </div>

                {/* Beneficiary Customer Name & Account */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Beneficiary Customer Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={beneficiaryCustName}
                    onChange={(e) => setBeneficiaryCustName(e.target.value)}
                    placeholder="Target Beneficiary Corporate / Individual"
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Beneficiary Account No / IBAN <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={beneficiaryAccountNo}
                    onChange={(e) => setBeneficiaryAccountNo(e.target.value)}
                    placeholder="e.g. US9283746501 or 0129384756"
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono"
                  />
                </div>

                {/* Processing Role */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Processing Role <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={processingRole}
                    onChange={(e) => setProcessingRole(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900"
                  >
                    <option value="ORIGINATING_DESK">Originating Bank Desk</option>
                    <option value="INTERMEDIARY">Intermediary Clearing Bank</option>
                    <option value="BENEFICIARY_DESK">Beneficiary Credit Desk</option>
                  </select>
                </div>

                {/* Onwards Forwarded Bank Code */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Onwards Forwarded Bank Code
                  </label>
                  <input
                    type="text"
                    value={forwardedBankCode}
                    onChange={(e) => setForwardedBankCode(e.target.value)}
                    placeholder="e.g. CBN-SETTLE-001"
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#008751] hover:bg-[#006e42] text-white font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INSPECT DOCKET DETAIL MODAL */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-slate-950">Exchange Message Docket</h3>
                <span className="font-mono text-xs text-slate-500">{selectedMessage.id}</span>
              </div>
              <button onClick={() => setSelectedMessage(null)} className="text-slate-400 hover:text-slate-800 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Transfer Type:</span>
                  <span className="font-mono font-bold text-slate-900">{selectedMessage.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Direction:</span>
                  <span className="font-bold text-slate-900">{selectedMessage.direction}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Counterparty Institution:</span>
                  <span className="font-bold text-slate-900">{selectedMessage.counterpartyInstitutionName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Transfer Amount:</span>
                  <span className="font-mono font-extrabold text-emerald-800 text-sm">
                    {selectedMessage.currency === 'USD' ? '$' : '₦'}{selectedMessage.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} {selectedMessage.currency}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/80 space-y-2">
                <div className="font-bold text-slate-900 text-xs">Customer Transfer Details</div>
                <div className="text-[11px] space-y-1">
                  <div>
                    <span className="text-slate-500">Ordering Customer: </span>
                    <span className="font-bold text-slate-900">{selectedMessage.sendingCustomerName}</span> ({selectedMessage.sendingAccountNo})
                  </div>
                  <div>
                    <span className="text-slate-500">Beneficiary Customer: </span>
                    <span className="font-bold text-slate-900">{selectedMessage.beneficiaryCustomerName}</span> ({selectedMessage.beneficiaryAccountNo})
                  </div>
                  <div>
                    <span className="text-slate-500">Processing Role: </span>
                    <span className="font-mono text-slate-700">{selectedMessage.processingRole}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
