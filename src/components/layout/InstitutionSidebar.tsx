import React from 'react';
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
  Shield
} from 'lucide-react';

interface NavItemConfig {
  id: ServiceModule;
  label: string;
  icon: React.ElementType;
  badgeCount?: number;
  category: 'WORKSPACE' | 'MARKETS' | 'OPERATIONS' | 'GOVERNANCE';
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

  // Compute live badge counts
  const unreadMessagesCount = formalMessages.filter(m => m.status === 'DELIVERED').length;
  const activeCasesCount = casesList.filter(c => c.status !== 'CLOSED').length;
  const pendingApprovalsCount = 
    tradesList.filter(t => t.status === 'PENDING_SUPERVISOR_APPROVAL').length +
    correspondenceList.filter(c => c.status === 'PENDING_APPROVAL').length +
    sensitiveRequestsList.filter(s => s.status === 'PENDING_CHECKER').length;
  const unacknowledgedNoticesCount = noticesList.filter(n => !n.acknowledgedBy.includes(activePersona.id)).length;

  const allNavItems: NavItemConfig[] = [
    // Workspace Category
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard, category: 'WORKSPACE' },
    { id: 'chat', label: 'Conversations', icon: MessageSquare, badgeCount: 3, category: 'WORKSPACE' },
    { id: 'inbox', label: 'Inboxes', icon: Inbox, badgeCount: unreadMessagesCount || undefined, category: 'WORKSPACE' },
    { id: 'directory', label: 'Directory', icon: Building2, category: 'WORKSPACE' },

    // Markets & Treasury
    { id: 'markets', label: 'Markets Board', icon: TrendingUp, category: 'MARKETS' },
    { id: 'rfqs', label: 'Treasury RFQs', icon: Send, category: 'MARKETS' },
    { id: 'tickets', label: 'Trade Tickets', icon: Ticket, category: 'MARKETS' },
    { id: 'blotter', label: 'Trade Blotter', icon: FileSpreadsheet, category: 'MARKETS' },
    { id: 'settlement', label: 'Settlement Calendar', icon: CalendarDays, category: 'MARKETS' },

    // Operations & Bilateral Objects
    { id: 'cases', label: 'Case Management', icon: FolderLock, badgeCount: activeCasesCount || undefined, category: 'OPERATIONS' },
    { id: 'correspondence', label: 'Official Correspondence', icon: ScrollText, category: 'OPERATIONS' },
    { id: 'requests', label: 'Official Requests', icon: FileText, category: 'OPERATIONS' },
    { id: 'submissions', label: 'Data Submissions', icon: FileCheck2, category: 'OPERATIONS' },
    { id: 'notices', label: 'Network Notices', icon: BellRing, badgeCount: unacknowledgedNoticesCount || undefined, category: 'OPERATIONS' },

    // Governance & Administration
    { id: 'approvals', label: 'Requests & Approvals', icon: CheckCircle, badgeCount: pendingApprovalsCount || undefined, category: 'GOVERNANCE' },
    { id: 'reports', label: 'Reports', icon: BarChart3, category: 'GOVERNANCE' },
    { id: 'admin', label: 'Administration', icon: Users2, category: 'GOVERNANCE' },
    { id: 'security', label: 'Security Centre', icon: ShieldAlert, category: 'GOVERNANCE' },
    { id: 'scenarios', label: 'Scenario Lab', icon: FlaskConical, category: 'GOVERNANCE' }
  ];

  // Filter items strictly by active persona & active institution entitlements
  const visibleItems = allNavItems.filter(item => {
    const instHasService = activeInstitution.enabledServices.includes(item.id);
    const personaHasService = activePersona.allowedServices.includes(item.id);
    return instHasService && personaHasService;
  });

  const categories: { key: NavItemConfig['category']; title: string }[] = [
    { key: 'WORKSPACE', title: 'WORKSPACE' },
    { key: 'MARKETS', title: 'MARKETS & TREASURY' },
    { key: 'OPERATIONS', title: 'OPERATIONS & CORRESPONDENCE' },
    { key: 'GOVERNANCE', title: 'GOVERNANCE & AUDIT' }
  ];

  return (
    <aside className="w-64 bg-[#05362a] text-emerald-100 flex flex-col h-full overflow-y-auto select-none py-5 px-3 border-r border-[#042d23] shrink-0">
      {/* Brand Header */}
      <div className="px-3 pb-5 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center font-extrabold text-sm text-emerald-300 shadow-inner">
          {activeInstitution.code}
        </div>
        <div className="min-w-0">
          <div className="font-bold text-white text-sm tracking-tight truncate flex items-center gap-1">
            <span>{activeInstitution.displayName}</span>
          </div>
          <div className="text-[10px] font-medium text-emerald-300/70 uppercase tracking-wider truncate">
            {activeInstitution.typeLabel.split('(')[0]}
          </div>
        </div>
      </div>

      {/* Prominent Primary + NEW Action Button */}
      <div className="px-2 pb-5">
        <button
          onClick={() => openComposer()}
          className="w-full py-2.5 px-4 bg-[#10b981] hover:bg-[#059669] text-slate-950 font-bold text-xs rounded-xl shadow-md transition transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-slate-950 stroke-[2.5]" />
          <span>+ Action / Mandate</span>
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 space-y-5 px-1">
        {categories.map((cat) => {
          const itemsInCat = visibleItems.filter(i => i.category === cat.key);
          if (itemsInCat.length === 0) return null;

          return (
            <div key={cat.key} className="space-y-1">
              <div className="px-3 text-[10px] font-bold tracking-wider text-emerald-400/60 uppercase">
                {cat.title}
              </div>

              <div className="space-y-0.5">
                {itemsInCat.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveView(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition text-left cursor-pointer group ${
                        isActive
                          ? 'bg-white/15 text-white font-bold shadow-inner border border-white/10'
                          : 'text-emerald-100/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 transition ${isActive ? 'text-emerald-300' : 'text-emerald-300/60 group-hover:text-emerald-200'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badgeCount ? (
                        <span className="px-2 py-0.5 text-[10px] font-bold text-white rounded-full bg-emerald-600/80 shadow-sm">
                          {item.badgeCount}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Watermark */}
      <div className="mt-auto pt-4 px-3 text-[10px] text-emerald-300/50 border-t border-emerald-800/30">
        <div className="truncate font-medium">Prototype build for institutional discovery</div>
        <div className="text-[9px] text-emerald-400/40 mt-0.5">mSecure Trust Mesh • End-to-End Audited</div>
      </div>
    </aside>
  );
};
