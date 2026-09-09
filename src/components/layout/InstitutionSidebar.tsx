import React, { useState } from 'react';
import { useInstitution } from '../../context/InstitutionContext';
import { ServiceModule } from '../../types/institution';
import {
  LayoutDashboard,
  MessageSquare,
  Inbox,
  Building2,
  TrendingUp,
  Send,
  Ticket,
  FileSpreadsheet,
  CalendarDays,
  FolderLock,
  ScrollText,
  FileCheck2,
  BellRing,
  BarChart3,
  ShieldAlert,
  Users2,
  FlaskConical,
  CheckCircle,
  FileText,
  Plus,
  Shield,
  Radio,
  ChevronDown,
  ChevronRight,
  Settings,
  GitFork,
  LogOut,
  Sliders,
  PanelLeftClose
} from 'lucide-react';

interface NavItemConfig {
  id: ServiceModule;
  label: string;
  icon: React.ElementType;
  badgeCount?: number;
  section: 'CORE' | 'MESSAGING' | 'MARKETS' | 'OPERATIONS' | 'GOVERNANCE';
}

export const InstitutionSidebar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    activePersona,
    activeInstitution,
    openComposer,
    formalMessages,
    casesList,
    tradesList,
    correspondenceList,
    noticesList,
    sensitiveRequestsList
  } = useInstitution();

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    APPROVALS: true,
    MESSAGING: true,
    COMMUNICATIONS: true,
    OPERATIONS: true,
    GOVERNANCE: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Compute live badge counts
  const unreadMessagesCount = formalMessages.filter(m => m.status === 'DELIVERED').length;
  const activeCasesCount = casesList.filter(c => c.status !== 'CLOSED').length;
  const pendingApprovalsCount = 
    tradesList.filter(t => t.status === 'PENDING_SUPERVISOR_APPROVAL').length +
    correspondenceList.filter(c => c.status === 'PENDING_APPROVAL').length +
    sensitiveRequestsList.filter(s => s.status === 'PENDING_CHECKER').length;
  const unacknowledgedNoticesCount = noticesList.filter(n => !n.acknowledgedBy.includes(activePersona.id)).length;

  return (
    <aside className="w-64 bg-[#020b08] text-slate-200 flex flex-col h-full overflow-y-auto select-none py-5 px-3 border-r border-emerald-950/40 shrink-0 relative">
      {/* Subtle Digital Mesh Overlay in Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 bg-cover bg-center mix-blend-screen"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 40%, rgba(0, 135, 81, 0.4) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(4, 120, 87, 0.3) 0%, transparent 50%)`
        }}
      />

      {/* Sovereign Messages Header */}
      <div className="px-3 pb-5 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-900/40 border border-emerald-500/40 flex items-center justify-center font-black text-emerald-400 shadow-xs">
            <Shield className="w-5 h-5 text-[#008751]" />
          </div>
          <div>
            <div className="font-extrabold text-white text-sm tracking-tight leading-none">
              NSMessages
            </div>
            <div className="inline-block mt-1 px-1.5 py-0.2 bg-emerald-950/80 text-emerald-400 text-[9px] font-bold rounded border border-emerald-800/60 uppercase font-mono">
              {activeInstitution.code || 'Organization'}
            </div>
          </div>
        </div>

        <button className="text-slate-400 hover:text-white p-1 rounded-lg transition cursor-pointer">
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 space-y-1 px-1 relative z-10 text-xs">
        {/* Dashboard */}
        <button
          onClick={() => setActiveView('home')}
          className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-semibold transition text-left cursor-pointer ${
            activeView === 'home'
              ? 'bg-[#008751] text-white shadow-md font-bold'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 shrink-0" />
          <span>Dashboard</span>
        </button>

        {/* Approvals */}
        <div className="space-y-0.5">
          <button
            onClick={() => {
              setActiveView('approvals');
              toggleSection('APPROVALS');
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition text-left cursor-pointer ${
              activeView === 'approvals'
                ? 'bg-[#008751] text-white shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Approvals</span>
            </div>
            <div className="flex items-center space-x-1.5">
              {pendingApprovalsCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] font-bold bg-amber-500 text-slate-950 rounded-full">
                  {pendingApprovalsCount}
                </span>
              )}
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </button>
        </div>

        {/* Messaging */}
        <div className="space-y-0.5">
          <button
            onClick={() => {
              setActiveView('chat');
              toggleSection('MESSAGING');
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition text-left cursor-pointer ${
              activeView === 'chat' || activeView === 'inbox'
                ? 'bg-[#008751] text-white shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>Messaging</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {expandedSections.MESSAGING && (
            <div className="pl-9 space-y-1 pt-0.5">
              <button
                onClick={() => setActiveView('chat')}
                className={`w-full text-left py-1.5 px-3 rounded-lg text-xs transition cursor-pointer ${
                  activeView === 'chat' ? 'text-emerald-400 font-bold bg-emerald-950/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                Conversations
              </button>
              <button
                onClick={() => setActiveView('inbox')}
                className={`w-full text-left py-1.5 px-3 rounded-lg text-xs transition cursor-pointer flex justify-between ${
                  activeView === 'inbox' ? 'text-emerald-400 font-bold bg-emerald-950/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Formal Inboxes</span>
                {unreadMessagesCount > 0 && <span className="font-bold text-[#008751]">{unreadMessagesCount}</span>}
              </button>
            </div>
          )}
        </div>

        {/* User Management / Directory */}
        <button
          onClick={() => setActiveView('directory')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition text-left cursor-pointer ${
            activeView === 'directory'
              ? 'bg-[#008751] text-white shadow-md font-bold'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Users2 className="w-4 h-4 shrink-0" />
            <span>User Management</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {/* Markets & Treasury */}
        <button
          onClick={() => setActiveView('markets')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition text-left cursor-pointer ${
            activeView === 'markets' || activeView === 'tickets' || activeView === 'blotter'
              ? 'bg-[#008751] text-white shadow-md font-bold'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-4 h-4 shrink-0" />
            <span>Markets & Blotter</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {/* Communications (Expanded to Broadcast & Notifications as in Screenshot) */}
        <div className="space-y-0.5">
          <button
            onClick={() => toggleSection('COMMUNICATIONS')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition text-left cursor-pointer ${
              activeView === 'notices'
                ? 'text-white bg-white/5'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Radio className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Communications</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {expandedSections.COMMUNICATIONS && (
            <div className="pl-4 space-y-1 pt-0.5">
              <button
                onClick={() => setActiveView('notices')}
                className={`w-full flex items-center space-x-2.5 px-3.5 py-2 text-xs rounded-xl transition cursor-pointer ${
                  activeView === 'notices'
                    ? 'bg-[#008751] text-white font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Broadcast</span>
              </button>
              <button
                onClick={() => setActiveView('requests')}
                className="w-full flex items-center space-x-2.5 px-3.5 py-2 text-xs rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                <span>Notifications</span>
              </button>
            </div>
          )}
        </div>

        {/* Case & Discrepancy Operations */}
        <button
          onClick={() => setActiveView('cases')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition text-left cursor-pointer ${
            activeView === 'cases'
              ? 'bg-[#008751] text-white shadow-md font-bold'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <div className="flex items-center space-x-3">
            <FolderLock className="w-4 h-4 shrink-0" />
            <span>Disputes & Cases</span>
          </div>
          {activeCasesCount > 0 && (
            <span className="px-1.5 py-0.2 text-[10px] font-bold bg-amber-500 text-slate-950 rounded-full">
              {activeCasesCount}
            </span>
          )}
        </button>

        {/* Statutory Correspondence */}
        <button
          onClick={() => setActiveView('correspondence')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition text-left cursor-pointer ${
            activeView === 'correspondence'
              ? 'bg-[#008751] text-white shadow-md font-bold'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <div className="flex items-center space-x-3">
            <ScrollText className="w-4 h-4 shrink-0" />
            <span>Official Correspondence</span>
          </div>
        </button>

        {/* Reports & Analytics */}
        <button
          onClick={() => setActiveView('reports')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition text-left cursor-pointer ${
            activeView === 'reports'
              ? 'bg-[#008751] text-white shadow-md font-bold'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-4 h-4 shrink-0" />
            <span>Reports & Analytics</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      {/* Prominent Primary Action Button (+ New Action / Broadcast) */}
      <div className="px-2 pt-4 pb-2 relative z-10">
        <button
          onClick={() => openComposer()}
          className="w-full py-2.5 px-4 bg-[#008751] hover:bg-[#006e42] text-white font-bold text-xs rounded-xl shadow-md transition transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-white stroke-[2.5]" />
          <span>+ New Action / Mandate</span>
        </button>
      </div>

      {/* Bottom Profile Footer (Matching exact screenshot layout) */}
      <div className="mt-auto pt-4 px-3 border-t border-emerald-950/60 relative z-10 flex items-center justify-between">
        <div>
          <div className="font-extrabold text-white text-xs truncate">
            {activePersona.name}
          </div>
          <div className="text-[11px] text-slate-400 truncate">
            {activeInstitution.displayName}
          </div>
        </div>

        <div className="flex items-center space-x-2 text-slate-400">
          <button
            onClick={() => setActiveView('security')}
            className="hover:text-white p-1 rounded-lg transition cursor-pointer"
            title="Settings & Security"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setActiveView('scenarios')}
            className="hover:text-white p-1 rounded-lg transition cursor-pointer"
            title="Switch Persona / Exit"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
