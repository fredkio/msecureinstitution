import React, { useState } from 'react';
import { useInstitution } from '../context/InstitutionContext';
import { NoticeItem } from '../types/institution';
import {
  BellRing,
  CheckCircle,
  FileText,
  Paperclip,
  Clock,
  ShieldCheck,
  Building2,
  Plus,
  Radio,
  Search,
  ChevronDown,
  Send,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered
} from 'lucide-react';

export const NoticesView: React.FC = () => {
  const {
    noticesList,
    acknowledgeNotice,
    openComposer,
    activePersona,
    activeInstitution
  } = useInstitution();

  const [activeTab, setActiveTab] = useState<'LIST' | 'COMPOSE'>('LIST');
  const [channel, setChannel] = useState<'Email' | 'Notification' | 'SMS'>('Email');
  const [selectedTargets, setSelectedTargets] = useState({
    mdCeo: true,
    compliance: true,
    info: false
  });
  const [subject, setSubject] = useState('');
  const [bodyText, setBodyText] = useState('');

  // Sample broadcast records matching exact screenshot reference format
  const broadcasts = [
    {
      id: 'BC-202609-0004',
      subject: 'Review of Document from Fred Department',
      channel: 'Notification',
      scope: 'Sector',
      status: 'Sent',
      recipients: 9,
      created: '9/9/2026'
    },
    {
      id: 'BC-202609-0003',
      subject: 'Compliance to ISO20022 Standards',
      channel: 'Notification',
      scope: 'Sector',
      status: 'Sent',
      recipients: 9,
      created: '9/7/2026'
    },
    {
      id: 'BC-202609-0002',
      subject: 'Interbank Settlement Window Maintenance Notice',
      channel: 'Email',
      scope: 'All Banks',
      status: 'Sent',
      recipients: 24,
      created: '9/5/2026'
    }
  ];

  return (
    <div className="p-8 space-y-6 text-slate-900 max-w-7xl mx-auto overflow-y-auto">
      {/* Top Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">Broadcast</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            Compose and send broadcasts to organizations or platform users
          </p>
        </div>

        {activeTab === 'LIST' && (
          <button
            onClick={() => setActiveTab('COMPOSE')}
            className="px-5 py-2.5 bg-[#008751] hover:bg-[#006e42] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ New Broadcast</span>
          </button>
        )}
      </div>

      {activeTab === 'LIST' ? (
        /* Broadcast Table View (Matching Screenshot 3) */
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-4 px-6">REFERENCE</th>
                  <th className="py-4 px-6">SUBJECT</th>
                  <th className="py-4 px-4">CHANNEL</th>
                  <th className="py-4 px-4">SCOPE</th>
                  <th className="py-4 px-4">STATUS</th>
                  <th className="py-4 px-4">RECIPIENTS</th>
                  <th className="py-4 px-6">CREATED</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {broadcasts.map((bc) => (
                  <tr key={bc.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6 font-mono font-semibold text-slate-600 text-[11px]">
                      {bc.id}
                    </td>

                    <td className="py-4 px-6 font-bold text-slate-950">
                      {bc.subject}
                    </td>

                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-1 bg-cyan-50 text-cyan-700 border border-cyan-200 rounded-full text-[10px] font-bold">
                        {bc.channel}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-slate-600 font-medium">
                      {bc.scope}
                    </td>

                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        <span>{bc.status}</span>
                      </span>
                    </td>

                    <td className="py-4 px-4 font-bold text-slate-800 font-mono">
                      {bc.recipients}
                    </td>

                    <td className="py-4 px-6 font-mono text-slate-500 flex items-center justify-between">
                      <span>{bc.created}</span>
                      <ChevronDown className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-700" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Compose Broadcast Form (Matching Screenshot 1) */
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm p-8 space-y-6 max-w-4xl">
          <h2 className="font-extrabold text-base text-slate-950 border-b border-slate-100 pb-3">
            Compose Broadcast
          </h2>

          <div className="space-y-5 text-xs">
            {/* Channel Selection */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 font-bold">Channel</label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value as any)}
                className="w-64 bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium focus:outline-none focus:border-[#008751]"
              >
                <option value="Email">Email</option>
                <option value="Notification">Notification</option>
                <option value="SMS">SMS</option>
              </select>
            </div>

            {/* Email Target Checkboxes */}
            <div className="space-y-1.5">
              <label className="block text-slate-500 font-normal">
                Email Target <span className="text-[11px] text-slate-400">(select which org email addresses to send to)</span>
              </label>
              <div className="flex items-center space-x-4 pt-1 font-bold text-slate-800">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTargets.mdCeo}
                    onChange={(e) => setSelectedTargets(prev => ({ ...prev, mdCeo: e.target.checked }))}
                    className="w-4 h-4 accent-[#008751] rounded"
                  />
                  <span>MD / CEO</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTargets.compliance}
                    onChange={(e) => setSelectedTargets(prev => ({ ...prev, compliance: e.target.checked }))}
                    className="w-4 h-4 accent-[#008751] rounded"
                  />
                  <span>Compliance</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTargets.info}
                    onChange={(e) => setSelectedTargets(prev => ({ ...prev, info: e.target.checked }))}
                    className="w-4 h-4 accent-[#008751] rounded"
                  />
                  <span>Info</span>
                </label>
              </div>
            </div>

            {/* Recipients Selection */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-slate-700 font-bold">Recipients</label>
                <button type="button" className="text-[#008751] font-bold text-xs hover:underline flex items-center gap-1 cursor-pointer">
                  <span>+ Add Recipient</span>
                </button>
              </div>

              <div className="p-5 bg-slate-50/70 border border-slate-200/80 rounded-2xl space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 font-mono font-bold">1.</span>
                  <select className="bg-white border border-slate-300 rounded-xl p-2 text-slate-900 font-bold">
                    <option>Specific Organization</option>
                    <option>Entire Banking Sector</option>
                    <option>Regulatory Regimes</option>
                  </select>
                </div>

                <div className="space-y-2 pl-6">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search organizations..."
                      className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-2 text-slate-800 font-medium">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-3.5 h-3.5 accent-[#008751]" />
                      <span>Bank National Plc</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-3.5 h-3.5 accent-[#008751]" />
                      <span>Africa International Bank</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 font-bold">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Broadcast subject..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-[#008751]"
              />
            </div>

            {/* Body Rich Text Input */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 font-bold">Body</label>
              <div className="border border-slate-300 rounded-2xl overflow-hidden bg-white">
                {/* Editor Toolbar */}
                <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center space-x-3 text-slate-600">
                  <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-white border border-slate-200 rounded">14 v</span>
                  <div className="h-4 w-px bg-slate-300" />
                  <button type="button" className="hover:text-slate-900 font-bold p-1">B</button>
                  <button type="button" className="hover:text-slate-900 italic p-1">I</button>
                  <button type="button" className="hover:text-slate-900 underline p-1">U</button>
                  <button type="button" className="hover:text-slate-900 line-through p-1 font-bold">S</button>
                  <div className="h-4 w-px bg-slate-300" />
                  <button type="button" className="hover:text-slate-900 p-1">A</button>
                  <button type="button" className="hover:text-slate-900 p-1">List</button>
                </div>

                <textarea
                  rows={6}
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  placeholder="Write your message..."
                  className="w-full p-4 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-end items-center space-x-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveTab('LIST')}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-5 py-2.5 bg-white hover:bg-blue-50 text-blue-700 border border-blue-300 rounded-xl font-bold cursor-pointer"
              >
                Preview Recipients
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Broadcast dispatched successfully to targeted institutions.');
                  setActiveTab('LIST');
                }}
                className="px-6 py-2.5 bg-[#008751] hover:bg-[#006e42] text-white font-bold rounded-xl shadow-md cursor-pointer"
              >
                Save Draft & Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
