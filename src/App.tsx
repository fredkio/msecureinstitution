import React from 'react';
import { InstitutionProvider, useInstitution } from './context/InstitutionContext';
import { DevToolbar } from './components/layout/DevToolbar';
import { InstitutionHeader } from './components/layout/InstitutionHeader';
import { InstitutionSidebar } from './components/layout/InstitutionSidebar';

// Modals
import { UniversalComposerModal } from './components/modals/UniversalComposerModal';
import { StepUpAuthModal } from './components/modals/StepUpAuthModal';
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';
import { ScenarioRunnerModal } from './components/modals/ScenarioRunnerModal';

// Views
import { LoginView } from './views/LoginView';
import { DashboardView } from './views/DashboardView';
import { ChatWorkspaceView } from './views/ChatWorkspaceView';
import { MessagesInboxView } from './views/MessagesInboxView';
import { DirectoryView } from './views/DirectoryView';
import { MarketsWorkspaceView } from './views/MarketsWorkspaceView';
import { RFQWorkspaceView } from './views/RFQWorkspaceView';
import { TradeBlotterView } from './views/TradeBlotterView';
import { SettlementCalendarView } from './views/SettlementCalendarView';
import { CaseManagementView } from './views/CaseManagementView';
import { CorrespondenceView } from './views/CorrespondenceView';
import { DataSubmissionsView } from './views/DataSubmissionsView';
import { NoticesView } from './views/NoticesView';
import { ApprovalsView } from './views/ApprovalsView';
import { InstitutionAdminView } from './views/InstitutionAdminView';
import { SecurityCentreView } from './views/SecurityCentreView';
import { ScenarioLabView } from './views/ScenarioLabView';
import { ReportsView } from './views/ReportsView';

const MainLayout: React.FC = () => {
  const { activeView, isAuthenticated } = useInstitution();

  if (!isAuthenticated || activeView === 'login') {
    return <LoginView />;
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return <DashboardView />;
      case 'chat':
        return <ChatWorkspaceView />;
      case 'inbox':
        return <MessagesInboxView />;
      case 'directory':
        return <DirectoryView />;
      case 'markets':
        return <MarketsWorkspaceView />;
      case 'rfqs':
        return <RFQWorkspaceView />;
      case 'tickets':
      case 'blotter':
        return <TradeBlotterView />;
      case 'settlement':
        return <SettlementCalendarView />;
      case 'cases':
        return <CaseManagementView />;
      case 'correspondence':
      case 'requests':
        return <CorrespondenceView />;
      case 'submissions':
        return <DataSubmissionsView />;
      case 'notices':
        return <NoticesView />;
      case 'approvals':
        return <ApprovalsView />;
      case 'admin':
        return <InstitutionAdminView />;
      case 'security':
        return <SecurityCentreView />;
      case 'scenarios':
        return <ScenarioLabView />;
      case 'reports':
        return <ReportsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#f8fafc] text-slate-900 antialiased font-sans">
      {/* Top Prototype Testing Switcher */}
      <DevToolbar />

      {/* Main Workspace (Dark Forest Green Sidebar + Light Content Canvas) */}
      <div className="flex-1 flex overflow-hidden">
        <InstitutionSidebar />

        <div className="flex-1 flex flex-col overflow-hidden bg-[#f8fafc]">
          <InstitutionHeader />

          <main className="flex-1 overflow-y-auto bg-[#f8fafc] relative">
            {renderActiveView()}
          </main>
        </div>
      </div>

      {/* Global Modals & Action Engines */}
      <UniversalComposerModal />
      <StepUpAuthModal />
      <GlobalSearchModal />
      <ScenarioRunnerModal />
    </div>
  );
};

export function App() {
  return (
    <InstitutionProvider>
      <MainLayout />
    </InstitutionProvider>
  );
}

export default App;
