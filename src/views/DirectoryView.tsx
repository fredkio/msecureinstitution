import React, { useState } from 'react';
import { useInstitution } from '../context/InstitutionContext';
import { Institution, InstitutionId } from '../types/institution';
import { INITIAL_INSTITUTIONS } from '../data/mockData';
import {
  Building2,
  Search,
  CheckCircle2,
  MessageSquare,
  Mail,
  FolderLock,
  Ticket,
  ScrollText,
  ShieldCheck,
  ChevronRight,
  UserCheck,
  Phone,
  Globe
} from 'lucide-react';

export const DirectoryView: React.FC = () => {
  const {
    activePersona,
    activeInstitution,
    openComposer
  } = useInstitution();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstId, setSelectedInstId] = useState<InstitutionId>('SUMMIT_BANK');

  const institutionsList: Institution[] = Object.values(INITIAL_INSTITUTIONS);

  const filteredInstitutions = institutionsList.filter(inst =>
    !searchQuery ||
    inst.legalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inst.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inst.typeLabel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedInst = INITIAL_INSTITUTIONS[selectedInstId] || institutionsList[0];

  return (
    <div className="h-full flex overflow-hidden bg-[#f8fafc] text-slate-900">
      {/* Left: Directory List */}
      <div className="w-96 bg-white border-r border-slate-200 flex flex-col h-full shrink-0">
        <div className="p-5 border-b border-slate-100 space-y-3">
          <div>
            <h2 className="font-extrabold text-base text-slate-900">Verified Directory</h2>
            <p className="text-xs text-slate-500">Regulated network participants</p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search institutions by name or code..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#05362a]"
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
          {filteredInstitutions.map((inst) => {
            const isSelected = inst.id === selectedInstId;
            return (
              <div
                key={inst.id}
                onClick={() => setSelectedInstId(inst.id)}
                className={`p-4 cursor-pointer transition text-left text-xs ${
                  isSelected ? 'bg-emerald-50/60 border-l-4 border-[#05362a]' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 text-xs">{inst.displayName}</span>
                  <span className="text-[10px] font-mono text-[#05362a] font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {inst.code}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 truncate">{inst.typeLabel}</div>
                <div className="text-[10px] text-emerald-700 mt-1 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span className="truncate">{inst.badge}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Institutional Profile & Desks */}
      <div className="flex-1 flex flex-col h-full bg-[#f8fafc] overflow-hidden">
        {selectedInst ? (
          <div className="flex-1 overflow-y-auto p-8 space-y-6 text-xs max-w-5xl mx-auto w-full">
            {/* Profile Card */}
            <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#05362a] text-white flex items-center justify-center font-black text-xl shadow-xs">
                    {selectedInst.code}
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-slate-950">{selectedInst.legalName}</h1>
                    <div className="flex items-center space-x-2 text-xs text-slate-500 mt-0.5">
                      <span>{selectedInst.typeLabel}</span>
                      <span>•</span>
                      <span className="font-mono text-slate-700">{selectedInst.rcNumber}</span>
                    </div>
                  </div>
                </div>

                <span className="px-3.5 py-1 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-full text-xs font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Network Verified Participant</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-[11px] font-mono">
                <div>
                  <span className="text-slate-400 uppercase font-bold font-sans">Statutory Regulator:</span>
                  <div className="text-slate-900 font-bold mt-0.5">{selectedInst.regulator}</div>
                </div>
                <div>
                  <span className="text-slate-400 uppercase font-bold font-sans">Official Domain:</span>
                  <div className="text-slate-900 mt-0.5">{selectedInst.officialDomain}</div>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 uppercase font-bold font-sans">Headquarters:</span>
                  <div className="text-slate-700 font-sans mt-0.5">{selectedInst.headquarters}</div>
                </div>
              </div>
            </div>

            {/* Functional Desks */}
            <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-4 shadow-sm">
              <div>
                <h3 className="font-bold text-sm text-slate-950">Functional Desks & Institutional Channels</h3>
                <p className="text-slate-500 text-xs mt-0.5">
                  Route official messages, cases, or trading mandates directly to permitted functional teams
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedInst.departments.map((dept) => (
                  <div key={dept.name} className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-3">
                    <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                      <span>{dept.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{dept.teams.length} teams</span>
                    </div>

                    <div className="space-y-1.5 text-[11px] text-slate-600">
                      {dept.teams.map((team) => (
                        <div key={team} className="p-2.5 bg-white rounded-lg border border-slate-200/60 flex items-center justify-between group hover:border-[#05362a] transition">
                          <span>{team}</span>
                          <button
                            onClick={() => openComposer('message')}
                            className="text-[11px] text-[#05362a] font-bold opacity-0 group-hover:opacity-100 transition cursor-pointer"
                          >
                            Dispatch →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Permitted Dealers */}
            {activePersona.canTrade && (selectedInst.type === 'COMMERCIAL_BANK' || selectedInst.type === 'MERCHANT_BANK') && (
              <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-950">Permitted Interbank Treasury Dealers</h3>
                    <p className="text-slate-500 text-xs mt-0.5">Direct bilateral counterparty trading authorization</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-[#05362a] border border-emerald-200 rounded-lg text-[10px] font-mono font-bold">
                    Trading Entitlement Active
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {selectedInst.personas.filter(p => p.canTrade).map((dealer) => (
                    <div key={dealer.id} className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{dealer.name}</div>
                        <div className="text-[11px] text-slate-500">{dealer.title}</div>
                        {dealer.tradeLimitNgn && (
                          <div className="text-[10px] font-mono text-[#05362a] font-bold mt-1">
                            Dealer Limit: ₦{(dealer.tradeLimitNgn/1e9).toFixed(1)}B
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => openComposer('chat')}
                        className="p-2.5 bg-white hover:bg-emerald-50 text-[#05362a] border border-slate-200 rounded-xl transition cursor-pointer shadow-2xs"
                        title={`Chat with ${dealer.name}`}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
            Select an institution from the directory.
          </div>
        )}
      </div>
    </div>
  );
};
