import React, { useState } from 'react';
import { useInstitution } from '../../context/InstitutionContext';
import { PersonaId } from '../../types/institution';
import {
  Search,
  Plus,
  Bell,
  CheckCircle2,
  ChevronDown,
  Building2,
  ChevronRight
} from 'lucide-react';

export const InstitutionHeader: React.FC = () => {
  const {
    activeInstitution,
    activePersona,
    activePersonaId,
    availablePersonasInActiveInst,
    switchPersona,
    activeView,
    setIsSearchOpen,
    notifications,
    dismissNotification,
    setActiveView
  } = useInstitution();

  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const getViewTitle = () => {
    switch (activeView) {
      case 'home': return 'Dashboard';
      case 'chat': return 'Conversations';
      case 'inbox': return 'Institutional Inboxes';
      case 'directory': return 'Verified Directory';
      case 'markets': return 'Markets Board';
      case 'rfqs': return 'Treasury RFQs';
      case 'tickets': return 'Trade Tickets';
      case 'blotter': return 'Trade Blotter';
      case 'settlement': return 'Settlement Calendar';
      case 'cases': return 'Case Management';
      case 'correspondence': return 'Official Correspondence';
      case 'requests': return 'Official Requests';
      case 'submissions': return 'Data Submissions';
      case 'notices': return 'Network Notices';
      case 'approvals': return 'Requests & Approvals';
      case 'reports': return 'Reports';
      case 'admin': return 'Administration';
      case 'security': return 'Security Centre';
      case 'scenarios': return 'Scenario Lab';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="bg-white border-b border-slate-200/90 text-slate-900 px-6 py-3.5 flex items-center justify-between gap-4 z-30 select-none shadow-xs">
      {/* Left: Clean Breadcrumb (Bank Portal / Section) */}
      <div className="flex items-center space-x-2 text-xs font-medium text-slate-500">
        <span className="text-slate-600 font-semibold">{activeInstitution.displayName} Portal</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-900 font-bold">{getViewTitle()}</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* Search trigger */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-600 rounded-full text-xs transition cursor-pointer border border-slate-200"
        >
          <Search className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Search records...</span>
          <kbd className="px-1.5 py-0.2 bg-white border border-slate-300 text-[10px] text-slate-500 rounded font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {isNotifOpen && (
            <div
              className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in"
              onMouseLeave={() => setIsNotifOpen(false)}
            >
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">Institutional Activity</span>
                <span className="text-[10px] text-slate-400 font-mono">{notifications.length} updates</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      if (n.actionLink?.view) setActiveView(n.actionLink.view);
                      dismissNotification(n.id);
                      setIsNotifOpen(false);
                    }}
                    className="p-3 hover:bg-slate-50 cursor-pointer transition text-left"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>{n.title}</span>
                      <span className="text-[10px] font-mono text-slate-400">{n.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User / Persona Switcher Pill (Matching the exact screenshot pill dropdown) */}
        <div className="flex items-center space-x-2 pl-2">
          <div className="relative">
            <select
              value={activePersonaId}
              onChange={(e) => switchPersona(e.target.value as PersonaId)}
              className="appearance-none bg-emerald-50/70 hover:bg-emerald-50 text-emerald-950 border border-emerald-600/70 hover:border-emerald-600 rounded-xl px-4 py-1.5 pr-8 text-xs font-bold focus:outline-none cursor-pointer shadow-xs transition"
            >
              {availablePersonasInActiveInst.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} — {p.name} [{p.roleType.replace('_', ' ')}]
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-emerald-800 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* User Initials Avatar Circle */}
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold text-xs flex items-center justify-center shadow-xs">
            {activePersona.avatarInitials}
          </div>
        </div>
      </div>
    </header>
  );
};
