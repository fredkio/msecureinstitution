import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  InstitutionId,
  PersonaId,
  ServiceModule,
  Persona,
  Institution,
  ChatMessage,
  ChatThread,
  FormalMessage,
  OfficialCorrespondence,
  InstitutionalCase,
  RFQRequest,
  RFQQuote,
  TradeTicket,
  NoticeItem,
  DataSubmissionItem,
  AuditLogItem,
  DelegatedAuthority,
  SensitiveAccessRequest,
  MarketQuote
} from '../types/institution';
import {
  INITIAL_PERSONAS,
  INITIAL_INSTITUTIONS,
  INITIAL_MARKET_QUOTES,
  INITIAL_CHAT_THREADS,
  INITIAL_CHAT_MESSAGES,
  INITIAL_FORMAL_MESSAGES,
  INITIAL_CORRESPONDENCE,
  INITIAL_CASES,
  INITIAL_RFQS,
  INITIAL_TRADES,
  INITIAL_NOTICES,
  INITIAL_DATA_SUBMISSIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_DELEGATIONS,
  INITIAL_SENSITIVE_REQUESTS
} from '../data/mockData';

export interface NotificationToast {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
  timestamp: string;
  actionLink?: {
    view: ServiceModule;
    referenceId?: string;
  };
}

export interface ScenarioStep {
  scenarioId: 'A' | 'B' | 'C';
  stepNumber: number;
  totalSteps: number;
  title: string;
  instruction: string;
  activeInstitutionId: InstitutionId;
  activePersonaId: PersonaId;
  targetView: ServiceModule;
  suggestedActionLabel?: string;
  isComplete: boolean;
}

interface InstitutionContextType {
  // Active State
  activeInstitutionId: InstitutionId;
  activeInstitution: Institution;
  activePersonaId: PersonaId;
  activePersona: Persona;
  activeView: ServiceModule;
  availablePersonasInActiveInst: Persona[];
  
  // Navigation & Switchers
  switchInstitution: (instId: InstitutionId) => void;
  switchPersona: (personaId: PersonaId) => void;
  switchCounterpartyPerspective: (targetInstId?: InstitutionId, targetPersonaId?: PersonaId, targetView?: ServiceModule) => void;
  setActiveView: (view: ServiceModule) => void;

  // Universal Modals
  isComposerOpen: boolean;
  composerDefaultType: string | null;
  composerContextData: any;
  openComposer: (type?: string, contextData?: any) => void;
  closeComposer: () => void;
  
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  isStepUpModalOpen: boolean;
  stepUpData: { title: string; prompt: string; onConfirm: () => void } | null;
  openStepUpAuth: (title: string, prompt: string, onConfirm: () => void) => void;
  closeStepUpAuth: () => void;

  // Authentication
  isAuthenticated: boolean;
  loginWithOtp: (email: string, otp: string) => boolean;
  logout: () => void;

  // Scenario Lab
  isScenarioLabOpen: boolean;
  setIsScenarioLabOpen: (open: boolean) => void;
  activeScenarioId: 'A' | 'B' | 'C' | null;
  currentScenarioStepIndex: number;
  scenarioSteps: ScenarioStep[];
  runScenario: (scenarioId: 'A' | 'B' | 'C') => void;
  advanceScenarioStep: () => void;
  resetScenario: () => void;

  // Bilateral Data Stores
  chatThreads: ChatThread[];
  chatMessages: Record<string, ChatMessage[]>;
  formalMessages: FormalMessage[];
  correspondenceList: OfficialCorrespondence[];
  casesList: InstitutionalCase[];
  rfqsList: RFQRequest[];
  tradesList: TradeTicket[];
  marketQuotes: MarketQuote[];
  noticesList: NoticeItem[];
  submissionsList: DataSubmissionItem[];
  auditLogs: AuditLogItem[];
  delegationsList: DelegatedAuthority[];
  sensitiveRequestsList: SensitiveAccessRequest[];
  notifications: NotificationToast[];

  // Action Dispatchers
  sendChatMessage: (threadId: string, text: string, classification?: ChatMessage['classification'], actionLink?: ChatMessage['actionLink'], attachments?: ChatMessage['attachments']) => void;
  createChatThread: (title: string, participantInsts: InstitutionId[], participantPersonas: PersonaId[], initialMsg?: string) => string;
  startHierarchicalChat: (targetInstId: InstitutionId, targetDept: string, targetTeam: string, targetPersonaId?: PersonaId, initialText?: string) => string;
  endChatThread: (threadId: string, reason?: string) => void;
  sendFormalMessage: (msg: Partial<FormalMessage>) => string;
  replyToFormalMessage: (messageId: string, replyText: string) => void;
  acknowledgeFormalMessage: (messageId: string) => void;
  convertMessageToCase: (messageId: string) => string;
  
  // Correspondence Actions
  createCorrespondence: (corr: Partial<OfficialCorrespondence>) => string;
  approveCorrespondence: (corrId: string) => void;
  issueCorrespondence: (corrId: string) => void;
  acknowledgeCorrespondence: (corrId: string) => void;
  assignCorrespondence: (corrId: string, personaId: PersonaId) => void;
  submitOfficialResponse: (corrId: string, bodyMarkdown: string, attachmentName?: string) => void;
  closeCorrespondence: (corrId: string) => void;

  // Case Actions
  createCase: (caseData: Partial<InstitutionalCase>) => string;
  acknowledgeCase: (caseId: string) => void;
  assignCase: (caseId: string, personaId?: PersonaId) => void;
  uploadCaseEvidence: (caseId: string, fileName: string, size: string, notes: string) => void;
  proposeCaseResolution: (caseId: string, summary: string, refundNgn?: number, actionPlan?: string) => void;
  acceptCaseResolution: (caseId: string) => void;
  disputeCaseResolution: (caseId: string, reason: string) => void;
  closeCase: (caseId: string) => void;

  // Market & Trade Actions
  createRFQ: (rfqData: Partial<RFQRequest>) => string;
  submitRFQQuote: (rfqId: string, yieldRate: number, price: number, settlementConvention?: string) => void;
  acceptRFQQuote: (rfqId: string, quoteId: string) => void;
  validateTradeLimits: (amountNgn: number, counterpartyInstId: InstitutionId) => { passed: boolean; userLimitExceeded: boolean; reason: string };
  createTradeTicket: (ticket: Partial<TradeTicket>) => { tradeId: string; requiresSupervisor: boolean };
  approveTradeSupervisor: (tradeId: string) => void;
  confirmTradeCounterparty: (tradeId: string) => void;
  proposeTradeAmendment: (tradeId: string, newYieldRate: number, newAmountNgn: number, newSettlementDate: string, reason: string) => void;
  acceptTradeAmendment: (tradeId: string) => void;
  rejectTradeAmendment: (tradeId: string, reason: string) => void;

  // Governance & Admin Actions
  acknowledgeNotice: (noticeId: string) => void;
  submitDataFiling: (submissionId: string) => void;
  createDelegation: (delegation: Partial<DelegatedAuthority>) => void;
  revokeDelegation: (delegationId: string) => void;
  proposeSensitiveAccess: (req: Partial<SensitiveAccessRequest>) => void;
  approveSensitiveAccess: (requestId: string, comment?: string) => void;
  rejectSensitiveAccess: (requestId: string, comment?: string) => void;
  suspendUser: (personaId: PersonaId) => void;
  reactivateUser: (personaId: PersonaId) => void;
  addAuditLog: (action: string, objectType: AuditLogItem['objectType'], objectId: string, details?: { prev?: string; next?: string; outcome?: AuditLogItem['outcome']; approvalRef?: string }) => void;
  dismissNotification: (id: string) => void;
  resetAllState: () => void;
}

const InstitutionContext = createContext<InstitutionContextType | undefined>(undefined);

export const InstitutionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current active participant session
  const [activeInstitutionId, setActiveInstitutionId] = useState<InstitutionId>('MERIDIAN_BANK');
  const [activePersonaId, setActivePersonaId] = useState<PersonaId>('tunde_adebayo');
  const [activeView, setActiveView] = useState<ServiceModule>('home');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const loginWithOtp = (email: string, otp: string): boolean => {
    if (otp !== '999999') {
      return false;
    }

    const lower = email.toLowerCase();
    if (lower.includes('summit')) {
      setActiveInstitutionId('SUMMIT_BANK');
      setActivePersonaId('ngozi_umeh');
    } else if (lower.includes('horizon')) {
      setActiveInstitutionId('HORIZON_MFB');
      setActivePersonaId('mary_okoye');
    } else if (lower.includes('frsa') || lower.includes('cbn') || lower.includes('mda')) {
      setActiveInstitutionId('FRSA');
      setActivePersonaId('grace_mohammed');
    } else {
      setActiveInstitutionId('MERIDIAN_BANK');
      setActivePersonaId('tunde_adebayo');
    }

    setIsAuthenticated(true);
    setActiveView('home');
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setActiveView('login');
  };

  // Modals & UI States
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [composerDefaultType, setComposerDefaultType] = useState<string | null>(null);
  const [composerContextData, setComposerContextData] = useState<any>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStepUpModalOpen, setIsStepUpModalOpen] = useState(false);
  const [stepUpData, setStepUpData] = useState<{ title: string; prompt: string; onConfirm: () => void } | null>(null);

  // Scenario Lab State
  const [isScenarioLabOpen, setIsScenarioLabOpen] = useState(false);
  const [activeScenarioId, setActiveScenarioId] = useState<'A' | 'B' | 'C' | null>(null);
  const [currentScenarioStepIndex, setCurrentScenarioStepIndex] = useState(0);

  // Shared Bilateral Stores
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(INITIAL_CHAT_THREADS);
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>(INITIAL_CHAT_MESSAGES);
  const [formalMessages, setFormalMessages] = useState<FormalMessage[]>(INITIAL_FORMAL_MESSAGES);
  const [correspondenceList, setCorrespondenceList] = useState<OfficialCorrespondence[]>(INITIAL_CORRESPONDENCE);
  const [casesList, setCasesList] = useState<InstitutionalCase[]>(INITIAL_CASES);
  const [rfqsList, setRfqsList] = useState<RFQRequest[]>(INITIAL_RFQS);
  const [tradesList, setTradesList] = useState<TradeTicket[]>(INITIAL_TRADES);
  const [marketQuotes] = useState<MarketQuote[]>(INITIAL_MARKET_QUOTES);
  const [noticesList, setNoticesList] = useState<NoticeItem[]>(INITIAL_NOTICES);
  const [submissionsList, setSubmissionsList] = useState<DataSubmissionItem[]>(INITIAL_DATA_SUBMISSIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [delegationsList, setDelegationsList] = useState<DelegatedAuthority[]>(INITIAL_DELEGATIONS);
  const [sensitiveRequestsList, setSensitiveRequestsList] = useState<SensitiveAccessRequest[]>(INITIAL_SENSITIVE_REQUESTS);
  const [notifications, setNotifications] = useState<NotificationToast[]>([
    {
      id: 'NOTIF-1',
      title: 'Welcome to mSecure Network',
      message: 'Verified Institutional Node connected. Ready for bilateral messaging and transactions.',
      type: 'INFO',
      timestamp: '12:00 WAT'
    }
  ]);

  const activeInstitution = INITIAL_INSTITUTIONS[activeInstitutionId] || INITIAL_INSTITUTIONS.MERIDIAN_BANK;
  const activePersona = INITIAL_PERSONAS[activePersonaId] || activeInstitution.personas[0];
  const availablePersonasInActiveInst = activeInstitution.personas;

  // Universal Audit Trail Helper
  const addAuditLog = (
    action: string,
    objectType: AuditLogItem['objectType'],
    objectId: string,
    details?: { prev?: string; next?: string; outcome?: AuditLogItem['outcome']; approvalRef?: string }
  ) => {
    const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false }) + ' WAT';
    const randomHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    
    const newEntry: AuditLogItem = {
      id: `AUD-${Date.now().toString().slice(-6)}`,
      timestamp,
      personaId: activePersona.id,
      personaName: activePersona.name,
      institutionId: activeInstitution.id,
      institutionName: activeInstitution.legalName,
      role: activePersona.title,
      action,
      objectType,
      objectId,
      sessionInfo: `SES-${activePersona.roleType}-${Math.floor(1000 + Math.random() * 9000)} (Verified)`,
      ipAddress: '10.20.14.88',
      previousValue: details?.prev,
      newValue: details?.next,
      approvalRef: details?.approvalRef,
      outcome: details?.outcome || 'SUCCESS',
      tamperProofHash: randomHash
    };

    setAuditLogs(prev => [newEntry, ...prev]);
  };

  const addNotification = (title: string, message: string, type: NotificationToast['type'] = 'INFO', actionLink?: NotificationToast['actionLink']) => {
    const toast: NotificationToast = {
      id: `TOAST-${Date.now().toString().slice(-4)}`,
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      actionLink
    };
    setNotifications(prev => [toast, ...prev.slice(0, 19)]);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Switch Institution Handler
  const switchInstitution = (instId: InstitutionId) => {
    const targetInst = INITIAL_INSTITUTIONS[instId];
    if (!targetInst) return;
    setActiveInstitutionId(instId);
    // Pick first persona in that institution
    const defaultPersona = targetInst.personas[0];
    setActivePersonaId(defaultPersona.id);
    
    // Ensure active view is permitted
    if (!defaultPersona.allowedServices.includes(activeView)) {
      setActiveView('home');
    }

    addAuditLog('SWITCH_INSTITUTION_VIEW', 'USER_ACCESS', instId, {
      next: `Switched context to ${targetInst.legalName} as ${defaultPersona.name}`
    });
    addNotification('Institution Context Changed', `Now viewing as ${targetInst.displayName} (${defaultPersona.name})`, 'INFO');
  };

  // Switch Persona Handler
  const switchPersona = (personaId: PersonaId) => {
    const p = INITIAL_PERSONAS[personaId];
    if (!p) return;
    setActivePersonaId(personaId);
    setActiveInstitutionId(p.institutionId);

    // Adjust view if current view is not allowed
    if (!p.allowedServices.includes(activeView)) {
      setActiveView('home');
    }

    addAuditLog('SWITCH_PERSONA_VIEW', 'USER_ACCESS', personaId, {
      next: `Switched user persona to ${p.name} (${p.title})`
    });
    addNotification('User Persona Active', `Switched to ${p.name} — ${p.title}`, 'INFO');
  };

  // Jump to Counterparty Perspective Shortcut
  const switchCounterpartyPerspective = (targetInstId?: InstitutionId, targetPersonaId?: PersonaId, targetView?: ServiceModule) => {
    if (targetInstId) {
      setActiveInstitutionId(targetInstId);
      if (targetPersonaId) {
        setActivePersonaId(targetPersonaId);
      } else {
        const inst = INITIAL_INSTITUTIONS[targetInstId];
        if (inst && inst.personas.length > 0) {
          setActivePersonaId(inst.personas[0].id);
        }
      }
    } else {
      // Toggle to standard counterpart
      if (activeInstitutionId === 'MERIDIAN_BANK') {
        switchInstitution('SUMMIT_BANK');
      } else if (activeInstitutionId === 'SUMMIT_BANK') {
        switchInstitution('MERIDIAN_BANK');
      } else if (activeInstitutionId === 'HORIZON_MFB') {
        switchInstitution('MERIDIAN_BANK');
      } else if (activeInstitutionId === 'FRSA') {
        switchInstitution('MERIDIAN_BANK');
      }
    }

    if (targetView) {
      setActiveView(targetView);
    }
  };

  // Composer
  const openComposer = (type?: string, contextData?: any) => {
    setComposerDefaultType(type || null);
    setComposerContextData(contextData || null);
    setIsComposerOpen(true);
  };

  const closeComposer = () => {
    setIsComposerOpen(false);
    setComposerDefaultType(null);
    setComposerContextData(null);
  };

  // Step-Up 2FA Simulator
  const openStepUpAuth = (title: string, prompt: string, onConfirm: () => void) => {
    setStepUpData({ title, prompt, onConfirm });
    setIsStepUpModalOpen(true);
  };

  const closeStepUpAuth = () => {
    setIsStepUpModalOpen(false);
    setStepUpData(null);
  };

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 1. CHAT ACTIONS
  const sendChatMessage = (
    threadId: string,
    text: string,
    classification: ChatMessage['classification'] = 'PUBLIC_INSTITUTIONAL',
    actionLink?: ChatMessage['actionLink'],
    attachments?: ChatMessage['attachments']
  ) => {
    const newMsg: ChatMessage = {
      id: `MSG-C-${Date.now().toString().slice(-4)}`,
      threadId,
      senderPersonaId: activePersona.id,
      senderName: activePersona.name,
      senderInstitution: activeInstitution.legalName,
      senderDepartment: activePersona.department,
      timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      text,
      classification,
      actionLink,
      attachments
    };

    setChatMessages(prev => ({
      ...prev,
      [threadId]: [...(prev[threadId] || []), newMsg]
    }));

    setChatThreads(prev => prev.map(t => t.id === threadId ? {
      ...t,
      lastMessageTime: 'Just now',
      lastMessageText: `${activePersona.name.split(' ')[0]}: ${text}`
    } : t));

    addAuditLog('SEND_CHAT_MESSAGE', 'CHAT', threadId, {
      next: text.slice(0, 60)
    });
  };

  const createChatThread = (title: string, participantInsts: InstitutionId[], participantPersonas: PersonaId[], initialMsg?: string): string => {
    const newThreadId = `MSC-CHAT-${Math.floor(10000 + Math.random() * 90000)}`;
    const newThread: ChatThread = {
      id: newThreadId,
      title,
      type: 'TEAM_TO_TEAM',
      participantInstitutionIds: participantInsts,
      participantPersonaIds: participantPersonas,
      lastMessageTime: 'Just now',
      lastMessageText: initialMsg || 'Conversation initiated.',
      unreadCount: {},
      status: 'ACTIVE'
    };

    setChatThreads(prev => [newThread, ...prev]);

    if (initialMsg) {
      const firstMsg: ChatMessage = {
        id: `MSG-C-${Date.now().toString().slice(-4)}`,
        threadId: newThreadId,
        senderPersonaId: activePersona.id,
        senderName: activePersona.name,
        senderInstitution: activeInstitution.legalName,
        senderDepartment: activePersona.department,
        timestamp: 'Just now',
        text: initialMsg,
        classification: 'CONFIDENTIAL'
      };
      setChatMessages(prev => ({ ...prev, [newThreadId]: [firstMsg] }));
    }

    addAuditLog('CREATE_CHAT_THREAD', 'CHAT', newThreadId, {
      next: `Created thread: ${title}`
    });
    return newThreadId;
  };

  const startHierarchicalChat = (
    targetInstId: InstitutionId,
    targetDept: string,
    targetTeam: string,
    targetPersonaId?: PersonaId,
    initialText?: string
  ): string => {
    const targetInst = INITIAL_INSTITUTIONS[targetInstId];
    const targetPerson = targetPersonaId ? INITIAL_PERSONAS[targetPersonaId] : undefined;
    const newThreadId = `MSC-CHAT-${Math.floor(10000 + Math.random() * 90000)}`;

    const title = targetPerson
      ? `${targetInst?.displayName || targetInstId} — ${targetPerson.name} (${targetTeam})`
      : `${targetInst?.displayName || targetInstId} — ${targetTeam}`;

    const newThread: ChatThread = {
      id: newThreadId,
      title,
      type: targetPerson ? 'DIRECT' : 'TEAM_TO_TEAM',
      participantInstitutionIds: [activeInstitutionId, targetInstId],
      participantPersonaIds: targetPerson ? [activePersonaId, targetPerson.id] : [activePersonaId],
      targetInstitutionId: targetInstId,
      targetDepartment: targetDept,
      targetTeam,
      targetPersonaId: targetPerson?.id,
      targetPersonaName: targetPerson?.name,
      targetPersonaTitle: targetPerson?.title,
      lastMessageTime: 'Just now',
      lastMessageText: initialText || 'Corridor session initiated.',
      unreadCount: {},
      sourceContext: `${targetDept} / ${targetTeam} Bilateral Channel`,
      status: 'ACTIVE'
    };

    setChatThreads(prev => [newThread, ...prev]);

    if (initialText) {
      const firstMsg: ChatMessage = {
        id: `MSG-C-${Date.now().toString().slice(-4)}`,
        threadId: newThreadId,
        senderPersonaId: activePersona.id,
        senderName: activePersona.name,
        senderInstitution: activeInstitution.legalName,
        senderDepartment: activePersona.department,
        timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        text: initialText,
        classification: 'CONFIDENTIAL'
      };
      setChatMessages(prev => ({ ...prev, [newThreadId]: [firstMsg] }));
    }

    addAuditLog('START_CHAT_SESSION', 'CHAT', newThreadId, {
      next: `Started chat with ${targetInst?.displayName} (${targetPerson?.name || targetTeam})`
    });
    addNotification('Chat Session Opened', `Connected to ${targetInst?.displayName} — ${targetPerson?.name || targetTeam}`, 'SUCCESS');

    return newThreadId;
  };

  const endChatThread = (threadId: string, reason?: string) => {
    const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' WAT';
    const dateStr = new Date().toLocaleDateString('en-GB');

    setChatThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          status: 'ENDED',
          endedAt: `${dateStr} ${time}`,
          endedBy: `${activePersona.name} (${activeInstitution.displayName})`
        };
      }
      return t;
    }));

    // Add a formal end notification message in the thread
    const endMsg: ChatMessage = {
      id: `MSG-END-${Date.now().toString().slice(-4)}`,
      threadId,
      senderPersonaId: activePersona.id,
      senderName: 'mSecure System',
      senderInstitution: 'Network Trust Protocol',
      senderDepartment: 'Session Governance',
      timestamp: time,
      text: `🔒 Chat session formally concluded by ${activePersona.name} (${activeInstitution.displayName}) at ${time}. All messages are preserved in immutable audit history.`,
      classification: 'RESTRICTED'
    };

    setChatMessages(prev => ({
      ...prev,
      [threadId]: [...(prev[threadId] || []), endMsg]
    }));

    addAuditLog('END_CHAT_SESSION', 'CHAT', threadId, {
      next: `Chat concluded by ${activePersona.name}: ${reason || 'Session closed normally'}`
    });
    addNotification('Chat Session Concluded', `Ref ${threadId} ended and archived to history`, 'INFO');
  };

  // 2. FORMAL MESSAGE ACTIONS
  const sendFormalMessage = (msgData: Partial<FormalMessage>): string => {
    const msgId = `MSC-MSG-${Math.floor(10000 + Math.random() * 90000)}`;
    const newMsg: FormalMessage = {
      id: msgId,
      subject: msgData.subject || 'Institutional Communication',
      senderPersonaId: activePersona.id,
      senderName: activePersona.name,
      senderInstitutionId: activeInstitution.id,
      senderInstitutionName: activeInstitution.legalName,
      senderTeam: `${activePersona.department} / ${activePersona.team}`,
      recipientInstitutionId: msgData.recipientInstitutionId || 'MERIDIAN_BANK',
      recipientInstitutionName: msgData.recipientInstitutionName || 'Meridian Bank Plc',
      recipientTeam: msgData.recipientTeam || 'General Operations',
      recipientPersonaId: msgData.recipientPersonaId,
      body: msgData.body || '',
      priority: msgData.priority || 'NORMAL',
      classification: msgData.classification || 'OFFICIAL',
      responseRequired: msgData.responseRequired ?? true,
      responseDeadline: msgData.responseDeadline || '2026-09-02 17:00 WAT',
      createdAt: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' WAT',
      status: 'DELIVERED',
      targetInbox: msgData.targetInbox || 'TEAM',
      attachments: msgData.attachments || [],
      replies: []
    };

    setFormalMessages(prev => [newMsg, ...prev]);
    addAuditLog('SEND_FORMAL_MESSAGE', 'MESSAGE', msgId, {
      next: `Subject: ${newMsg.subject} to ${newMsg.recipientInstitutionName}`
    });
    addNotification('Formal Message Dispatched', `Ref ${msgId} delivered to ${newMsg.recipientInstitutionName}`, 'SUCCESS');
    return msgId;
  };

  const replyToFormalMessage = (messageId: string, replyText: string) => {
    const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' WAT';
    setFormalMessages(prev => prev.map(m => {
      if (m.id === messageId) {
        return {
          ...m,
          status: 'READ',
          replies: [
            ...(m.replies || []),
            {
              id: `REP-${Date.now().toString().slice(-4)}`,
              senderName: activePersona.name,
              senderInstitution: activeInstitution.legalName,
              timestamp: time,
              body: replyText
            }
          ]
        };
      }
      return m;
    }));

    addAuditLog('REPLY_FORMAL_MESSAGE', 'MESSAGE', messageId, {
      next: `Reply from ${activePersona.name}: ${replyText.slice(0, 50)}`
    });
  };

  const acknowledgeFormalMessage = (messageId: string) => {
    setFormalMessages(prev => prev.map(m => m.id === messageId ? { ...m, status: 'ACKNOWLEDGED' } : m));
    addAuditLog('ACKNOWLEDGE_FORMAL_MESSAGE', 'MESSAGE', messageId, {
      next: 'Status: ACKNOWLEDGED'
    });
    addNotification('Message Acknowledged', `Ref ${messageId} formally acknowledged`, 'INFO');
  };

  const convertMessageToCase = (messageId: string): string => {
    const msg = formalMessages.find(m => m.id === messageId);
    if (!msg) return '';

    const newCaseId = `MSC-CASE-${Math.floor(100000 + Math.random() * 900000)}`;
    const newCase: InstitutionalCase = {
      id: newCaseId,
      type: 'PAYMENT_INVESTIGATION',
      title: `Case from ${msg.id}: ${msg.subject}`,
      originatingInstitutionId: msg.senderInstitutionId,
      originatingInstitutionName: msg.senderInstitutionName,
      originatingPersonaId: msg.senderPersonaId,
      originatingPersonaName: msg.senderName,
      receivingInstitutionId: msg.recipientInstitutionId,
      receivingInstitutionName: msg.recipientInstitutionName,
      assignedTeam: msg.recipientTeam,
      assignedPersonaId: activePersona.id,
      assignedPersonaName: activePersona.name,
      referenceNo: `CONV-${msg.id}`,
      description: msg.body,
      priority: msg.priority === 'URGENT' ? 'CRITICAL' : 'HIGH',
      slaBreachTime: '2026-09-02 17:00 WAT',
      isSlaBreached: false,
      status: 'ASSIGNED',
      attachments: msg.attachments?.map(a => ({ name: a.name, size: a.size, uploadedBy: msg.senderName, timestamp: 'From source message' })) || [],
      activityFeed: [
        {
          id: 'ACT-0',
          timestamp: new Date().toLocaleTimeString('en-GB') + ' WAT',
          actorName: activePersona.name,
          actorInstitution: activeInstitution.legalName,
          action: `Converted from Message ${msg.id}`,
          notes: 'Source context and attachments preserved in case docket.'
        }
      ]
    };

    setCasesList(prev => [newCase, ...prev]);
    setFormalMessages(prev => prev.map(m => m.id === messageId ? { ...m, status: 'CONVERTED_TO_CASE', linkedCaseId: newCaseId } : m));

    addAuditLog('CONVERT_MESSAGE_TO_CASE', 'CASE', newCaseId, {
      prev: `Source Message: ${messageId}`,
      next: `Created Case ${newCaseId}`
    });
    addNotification('Converted to Case', `Message ${messageId} converted to Case ${newCaseId}`, 'SUCCESS');
    return newCaseId;
  };

  // 3. OFFICIAL CORRESPONDENCE ACTIONS
  const createCorrespondence = (corrData: Partial<OfficialCorrespondence>): string => {
    const corrId = corrData.reference || `MSC-COR-${Math.floor(100000 + Math.random() * 900000)}`;
    const newCorr: OfficialCorrespondence = {
      id: corrId,
      reference: corrId,
      subject: corrData.subject || 'Official Mandate',
      originatingInstitutionId: activeInstitution.id,
      originatingInstitutionName: activeInstitution.legalName,
      destinationInstitutionId: corrData.destinationInstitutionId || 'MERIDIAN_BANK',
      destinationInstitutionName: corrData.destinationInstitutionName || 'Meridian Bank Plc',
      destinationTeam: corrData.destinationTeam || 'Executive Governance',
      preparedBy: {
        personaId: activePersona.id,
        name: activePersona.name,
        title: activePersona.title,
        date: new Date().toISOString().split('T')[0]
      },
      classification: corrData.classification || 'OFFICIAL_REQUEST',
      status: activePersona.canAuthorizeCorrespondence ? 'APPROVED' : 'PENDING_APPROVAL',
      effectiveDate: new Date().toISOString().split('T')[0],
      responseRequired: corrData.responseRequired ?? true,
      deadline: corrData.deadline || '2026-09-05',
      bodyMarkdown: corrData.bodyMarkdown || 'Official correspondence text.',
      attachments: corrData.attachments || [],
      auditTrail: [
        {
          timestamp: new Date().toLocaleTimeString('en-GB') + ' WAT',
          actor: activePersona.name,
          institution: activeInstitution.legalName,
          action: activePersona.canAuthorizeCorrespondence ? 'Drafted & Pre-Approved' : 'Drafted and Submitted for Executive Approval'
        }
      ]
    };

    setCorrespondenceList(prev => [newCorr, ...prev]);
    addAuditLog('DRAFT_OFFICIAL_CORRESPONDENCE', 'CORRESPONDENCE', corrId, {
      next: `Subject: ${newCorr.subject} (Status: ${newCorr.status})`
    });
    addNotification('Official Correspondence Created', `Ref ${corrId} created (${newCorr.status})`, 'INFO');
    return corrId;
  };

  const approveCorrespondence = (corrId: string) => {
    const time = new Date().toLocaleTimeString('en-GB') + ' WAT';
    setCorrespondenceList(prev => prev.map(c => {
      if (c.id === corrId) {
        return {
          ...c,
          status: 'APPROVED',
          authorizedBy: {
            personaId: activePersona.id,
            name: activePersona.name,
            title: activePersona.title,
            date: new Date().toISOString().split('T')[0]
          },
          auditTrail: [
            ...c.auditTrail,
            { timestamp: time, actor: activePersona.name, institution: activeInstitution.legalName, action: 'Authorized with digital institutional seal' }
          ]
        };
      }
      return c;
    }));

    addAuditLog('APPROVE_OFFICIAL_CORRESPONDENCE', 'CORRESPONDENCE', corrId, {
      next: `Approved by ${activePersona.name} (${activePersona.title})`
    });
    addNotification('Correspondence Approved', `Ref ${corrId} approved for transmission`, 'SUCCESS');
  };

  const issueCorrespondence = (corrId: string) => {
    const time = new Date().toLocaleTimeString('en-GB') + ' WAT';
    setCorrespondenceList(prev => prev.map(c => {
      if (c.id === corrId) {
        return {
          ...c,
          status: 'ISSUED',
          auditTrail: [
            ...c.auditTrail,
            { timestamp: time, actor: activePersona.name, institution: activeInstitution.legalName, action: 'Transmitted to recipient Institution Inbox' }
          ]
        };
      }
      return c;
    }));

    addAuditLog('ISSUE_OFFICIAL_CORRESPONDENCE', 'CORRESPONDENCE', corrId, {
      next: 'Status: ISSUED & DELIVERED'
    });
    addNotification('Correspondence Transmitted', `Ref ${corrId} officially issued and delivered to recipient inbox`, 'SUCCESS');
  };

  const acknowledgeCorrespondence = (corrId: string) => {
    const time = new Date().toLocaleTimeString('en-GB') + ' WAT';
    setCorrespondenceList(prev => prev.map(c => {
      if (c.id === corrId) {
        return {
          ...c,
          status: 'ACKNOWLEDGED',
          auditTrail: [
            ...c.auditTrail,
            { timestamp: time, actor: activePersona.name, institution: activeInstitution.legalName, action: 'Acknowledged receipt in Institutional Inbox' }
          ]
        };
      }
      return c;
    }));

    addAuditLog('ACKNOWLEDGE_CORRESPONDENCE', 'CORRESPONDENCE', corrId, {
      next: 'Status: ACKNOWLEDGED'
    });
    addNotification('Correspondence Acknowledged', `Ref ${corrId} acknowledged`, 'INFO');
  };

  const assignCorrespondence = (corrId: string, personaId: PersonaId) => {
    const targetPersona = INITIAL_PERSONAS[personaId];
    if (!targetPersona) return;
    const time = new Date().toLocaleTimeString('en-GB') + ' WAT';

    setCorrespondenceList(prev => prev.map(c => {
      if (c.id === corrId) {
        return {
          ...c,
          assignedToPersonaId: personaId,
          assignedToName: targetPersona.name,
          status: 'IN_PROGRESS',
          auditTrail: [
            ...c.auditTrail,
            { timestamp: time, actor: activePersona.name, institution: activeInstitution.legalName, action: `Assigned to ${targetPersona.name}` }
          ]
        };
      }
      return c;
    }));

    addAuditLog('ASSIGN_CORRESPONDENCE', 'CORRESPONDENCE', corrId, {
      next: `Assigned to ${targetPersona.name}`
    });
  };

  const submitOfficialResponse = (corrId: string, bodyMarkdown: string, attachmentName: string = 'Official_Response_Statement.pdf') => {
    const time = new Date().toLocaleTimeString('en-GB') + ' WAT';
    const respRef = `${activeInstitution.code}/RESP/${Date.now().toString().slice(-4)}`;

    setCorrespondenceList(prev => prev.map(c => {
      if (c.id === corrId) {
        return {
          ...c,
          status: 'RESPONDED',
          officialResponse: {
            reference: respRef,
            bodyMarkdown,
            preparedBy: `${activePersona.name} (${activePersona.title})`,
            authorizedBy: 'Institutional Mandate Seal',
            date: new Date().toLocaleDateString('en-GB') + ' ' + time,
            attachmentName
          },
          auditTrail: [
            ...c.auditTrail,
            { timestamp: time, actor: activePersona.name, institution: activeInstitution.legalName, action: `Official Response ${respRef} submitted with attachment ${attachmentName}` }
          ]
        };
      }
      return c;
    }));

    addAuditLog('SUBMIT_OFFICIAL_RESPONSE', 'CORRESPONDENCE', corrId, {
      next: `Response Ref: ${respRef}`
    });
    addNotification('Official Response Transmitted', `Response to Ref ${corrId} transmitted with institutional seal`, 'SUCCESS');
  };

  const closeCorrespondence = (corrId: string) => {
    const time = new Date().toLocaleTimeString('en-GB') + ' WAT';
    setCorrespondenceList(prev => prev.map(c => {
      if (c.id === corrId) {
        return {
          ...c,
          status: 'CLOSED',
          auditTrail: [
            ...c.auditTrail,
            { timestamp: time, actor: activePersona.name, institution: activeInstitution.legalName, action: 'Closed mandate by mutual institutional concurrence' }
          ]
        };
      }
      return c;
    }));

    addAuditLog('CLOSE_CORRESPONDENCE', 'CORRESPONDENCE', corrId, {
      next: 'Status: CLOSED'
    });
    addNotification('Correspondence Closed', `Ref ${corrId} marked as CLOSED on both sides`, 'INFO');
  };

  // 4. CASE MANAGEMENT ACTIONS
  const createCase = (caseData: Partial<InstitutionalCase>): string => {
    const caseId = `MSC-CASE-${Math.floor(100000 + Math.random() * 900000)}`;
    const newCase: InstitutionalCase = {
      id: caseId,
      type: caseData.type || 'SETTLEMENT_RECONCILIATION',
      title: caseData.title || 'Operational Difference Case',
      originatingInstitutionId: activeInstitution.id,
      originatingInstitutionName: activeInstitution.legalName,
      originatingPersonaId: activePersona.id,
      originatingPersonaName: activePersona.name,
      receivingInstitutionId: caseData.receivingInstitutionId || 'MERIDIAN_BANK',
      receivingInstitutionName: caseData.receivingInstitutionName || 'Meridian Bank Plc',
      assignedTeam: caseData.assignedTeam || 'Payments Operations / Reconciliation',
      referenceNo: caseData.referenceNo || `REF-${Date.now().toString().slice(-4)}`,
      transactionReference: caseData.transactionReference,
      amountNgn: caseData.amountNgn,
      affectedTransactionsCount: caseData.affectedTransactionsCount,
      settlementDate: caseData.settlementDate || '2026-08-28',
      description: caseData.description || 'Discrepancy identified in settlement stream.',
      priority: caseData.priority || 'HIGH',
      slaBreachTime: '2026-09-02 17:00 WAT',
      isSlaBreached: false,
      status: 'NEW',
      attachments: caseData.attachments || [],
      activityFeed: [
        {
          id: `ACT-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString('en-GB') + ' WAT',
          actorName: activePersona.name,
          actorInstitution: activeInstitution.legalName,
          action: 'Case Created',
          notes: caseData.description
        }
      ]
    };

    setCasesList(prev => [newCase, ...prev]);
    addAuditLog('CREATE_CASE', 'CASE', caseId, {
      next: `Created Case: ${newCase.title} with counterparty ${newCase.receivingInstitutionName}`
    });
    addNotification('Case Submitted', `Bilateral Case ${caseId} dispatched to ${newCase.receivingInstitutionName}`, 'SUCCESS');
    return caseId;
  };

  const acknowledgeCase = (caseId: string) => {
    const time = new Date().toLocaleTimeString('en-GB') + ' WAT';
    setCasesList(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          status: 'ACKNOWLEDGED',
          activityFeed: [
            ...c.activityFeed,
            { id: `ACT-${Date.now()}`, timestamp: time, actorName: activePersona.name, actorInstitution: activeInstitution.legalName, action: 'Case Acknowledged' }
          ]
        };
      }
      return c;
    }));

    addAuditLog('ACKNOWLEDGE_CASE', 'CASE', caseId, { next: 'Status: ACKNOWLEDGED' });
    addNotification('Case Acknowledged', `Case ${caseId} acknowledged. Counterparty sees updated state.`, 'INFO');
  };

  const assignCase = (caseId: string, personaId?: PersonaId) => {
    const targetPersona = personaId ? INITIAL_PERSONAS[personaId] : activePersona;
    const time = new Date().toLocaleTimeString('en-GB') + ' WAT';

    setCasesList(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          status: 'ASSIGNED',
          assignedPersonaId: targetPersona.id,
          assignedPersonaName: targetPersona.name,
          activityFeed: [
            ...c.activityFeed,
            { id: `ACT-${Date.now()}`, timestamp: time, actorName: activePersona.name, actorInstitution: activeInstitution.legalName, action: `Assigned to ${targetPersona.name}` }
          ]
        };
      }
      return c;
    }));

    addAuditLog('ASSIGN_CASE', 'CASE', caseId, { next: `Assigned to ${targetPersona.name}` });
  };

  const uploadCaseEvidence = (caseId: string, fileName: string, size: string, notes: string) => {
    const time = new Date().toLocaleTimeString('en-GB') + ' WAT';
    setCasesList(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          attachments: [...c.attachments, { name: fileName, size, uploadedBy: activePersona.name, timestamp: time }],
          activityFeed: [
            ...c.activityFeed,
            { id: `ACT-${Date.now()}`, timestamp: time, actorName: activePersona.name, actorInstitution: activeInstitution.legalName, action: 'Evidence Uploaded', notes, evidenceAttachment: fileName }
          ]
        };
      }
      return c;
    }));

    addAuditLog('UPLOAD_CASE_EVIDENCE', 'CASE', caseId, { next: `Uploaded ${fileName}` });
    addNotification('Evidence Uploaded', `${fileName} attached to Case ${caseId}`, 'INFO');
  };

  const proposeCaseResolution = (caseId: string, summary: string, refundNgn?: number, actionPlan?: string) => {
    const time = new Date().toLocaleTimeString('en-GB') + ' WAT';
    setCasesList(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          status: 'RESOLUTION_PROPOSED',
          proposedResolution: {
            proposedBy: `${activePersona.name} (${activeInstitution.displayName})`,
            proposedDate: new Date().toLocaleDateString('en-GB') + ' ' + time,
            summary,
            refundAdjustmentNgn: refundNgn,
            actionPlan: actionPlan || 'Bilateral reconciliation complete.'
          },
          activityFeed: [
            ...c.activityFeed,
            { id: `ACT-${Date.now()}`, timestamp: time, actorName: activePersona.name, actorInstitution: activeInstitution.legalName, action: 'Resolution Proposed', notes: summary }
          ]
        };
      }
      return c;
    }));

    addAuditLog('PROPOSE_CASE_RESOLUTION', 'CASE', caseId, { next: summary });
    addNotification('Resolution Proposed', `Resolution for Case ${caseId} proposed to counterparty`, 'SUCCESS');
  };

  const acceptCaseResolution = (caseId: string) => {
    const time = new Date().toLocaleTimeString('en-GB') + ' WAT';
    setCasesList(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          status: 'RESOLVED',
          activityFeed: [
            ...c.activityFeed,
            { id: `ACT-${Date.now()}`, timestamp: time, actorName: activePersona.name, actorInstitution: activeInstitution.legalName, action: 'Resolution Accepted by Counterparty', notes: 'Bilateral adjustments confirmed in clearing schedule.' }
          ]
        };
      }
      return c;
    }));

    addAuditLog('ACCEPT_CASE_RESOLUTION', 'CASE', caseId, { next: 'Status: RESOLVED' });
    addNotification('Resolution Accepted', `Case ${caseId} marked as RESOLVED`, 'SUCCESS');
  };

  const disputeCaseResolution = (caseId: string, reason: string) => {
    const time = new Date().toLocaleTimeString('en-GB') + ' WAT';
    setCasesList(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          status: 'DISPUTED',
          activityFeed: [
            ...c.activityFeed,
            { id: `ACT-${Date.now()}`, timestamp: time, actorName: activePersona.name, actorInstitution: activeInstitution.legalName, action: 'Resolution Disputed', notes: reason }
          ]
        };
      }
      return c;
    }));

    addAuditLog('DISPUTE_CASE_RESOLUTION', 'CASE', caseId, { next: `Dispute Reason: ${reason}` });
    addNotification('Resolution Disputed', `Case ${caseId} returned for further investigation`, 'WARNING');
  };

  const closeCase = (caseId: string) => {
    const time = new Date().toLocaleTimeString('en-GB') + ' WAT';
    setCasesList(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          status: 'CLOSED',
          activityFeed: [
            ...c.activityFeed,
            { id: `ACT-${Date.now()}`, timestamp: time, actorName: activePersona.name, actorInstitution: activeInstitution.legalName, action: 'Case Formally Closed', notes: 'Audit record permanently archived.' }
          ]
        };
      }
      return c;
    }));

    addAuditLog('CLOSE_CASE', 'CASE', caseId, { next: 'Status: CLOSED' });
    addNotification('Case Closed', `Case ${caseId} is now CLOSED on both sides.`, 'INFO');
  };

  // 5. RFQ ACTIONS
  const createRFQ = (rfqData: Partial<RFQRequest>): string => {
    const rfqId = `MSC-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const newRfq: RFQRequest = {
      id: rfqId,
      initiatingInstitutionId: activeInstitution.id,
      initiatingInstitutionName: activeInstitution.legalName,
      initiatingDealerId: activePersona.id,
      initiatingDealerName: activePersona.name,
      instrument: rfqData.instrument || 'FGN 2031 (12.40% 18-MAR-2031)',
      category: rfqData.category || 'FIXED_INCOME',
      side: rfqData.side || 'BUY',
      amountNgn: rfqData.amountNgn || 1500000000,
      tenor: rfqData.tenor || '7Y',
      settlementDate: rfqData.settlementDate || '2026-09-01',
      settlementConvention: rfqData.settlementConvention || 'T+2',
      selectedCounterparties: rfqData.selectedCounterparties || [
        { institutionId: 'SUMMIT_BANK', institutionName: 'Summit Bank Plc' }
      ],
      quotes: [],
      status: 'OPEN',
      createdAt: new Date().toLocaleTimeString('en-GB') + ' WAT',
      expiresAt: '15:00 WAT'
    };

    setRfqsList(prev => [newRfq, ...prev]);
    addAuditLog('CREATE_RFQ', 'RFQ', rfqId, { next: `Instrument: ${newRfq.instrument}, Amount: ₦${(newRfq.amountNgn/1e9).toFixed(1)}B` });
    addNotification('RFQ Dispatched', `RFQ ${rfqId} sent to selected counterparties`, 'INFO');
    return rfqId;
  };

  const submitRFQQuote = (rfqId: string, yieldRate: number, price: number, settlementConvention: string = 'T+2') => {
    const quoteId = `QTE-${Date.now().toString().slice(-4)}`;
    const newQuote: RFQQuote = {
      id: quoteId,
      counterpartyInstitutionId: activeInstitution.id,
      counterpartyInstitutionName: activeInstitution.legalName,
      dealerName: activePersona.name,
      dealerPersonaId: activePersona.id,
      yieldRate,
      price,
      settlementConvention,
      validUntil: '15:00 WAT',
      status: 'QUOTED'
    };

    setRfqsList(prev => prev.map(r => {
      if (r.id === rfqId) {
        return {
          ...r,
          status: 'QUOTED',
          quotes: [...r.quotes.filter(q => q.dealerPersonaId !== activePersona.id), newQuote]
        };
      }
      return r;
    }));

    addAuditLog('SUBMIT_RFQ_QUOTE', 'RFQ', rfqId, { next: `Quote: ${yieldRate}% by ${activePersona.name}` });
    addNotification('Quote Submitted', `Quote ${yieldRate}% submitted for RFQ ${rfqId}`, 'SUCCESS');
  };

  const acceptRFQQuote = (rfqId: string, quoteId: string) => {
    const rfq = rfqsList.find(r => r.id === rfqId);
    if (!rfq) return;
    const quote = rfq.quotes.find(q => q.id === quoteId);
    if (!quote) return;

    // Convert to trade ticket directly
    const tradeResult = createTradeTicket({
      originatingRfqId: rfqId,
      buyerInstitutionId: rfq.side === 'BUY' ? rfq.initiatingInstitutionId : quote.counterpartyInstitutionId,
      buyerInstitutionName: rfq.side === 'BUY' ? rfq.initiatingInstitutionName : quote.counterpartyInstitutionName,
      buyerDealerPersonaId: rfq.side === 'BUY' ? rfq.initiatingDealerId : quote.dealerPersonaId,
      buyerDealerName: rfq.side === 'BUY' ? rfq.initiatingDealerName : quote.dealerName,
      sellerInstitutionId: rfq.side === 'SELL' ? rfq.initiatingInstitutionId : quote.counterpartyInstitutionId,
      sellerInstitutionName: rfq.side === 'SELL' ? rfq.initiatingInstitutionName : quote.counterpartyInstitutionName,
      sellerDealerPersonaId: rfq.side === 'SELL' ? rfq.initiatingDealerId : quote.dealerPersonaId,
      sellerDealerName: rfq.side === 'SELL' ? rfq.initiatingDealerName : quote.dealerName,
      instrument: rfq.instrument,
      amountNgn: rfq.amountNgn,
      yieldRate: quote.yieldRate,
      settlementConvention: `${quote.settlementConvention} (CSCS / RTGS)`
    });

    setRfqsList(prev => prev.map(r => {
      if (r.id === rfqId) {
        return {
          ...r,
          status: 'EXECUTED_TO_TRADE',
          executedTradeId: tradeResult.tradeId,
          quotes: r.quotes.map(q => q.id === quoteId ? { ...q, status: 'ACCEPTED' } : { ...q, status: 'REJECTED' })
        };
      }
      return r;
    }));

    addAuditLog('ACCEPT_RFQ_QUOTE', 'RFQ', rfqId, { next: `Accepted Quote ${quoteId} -> Trade ${tradeResult.tradeId}` });
  };

  // 6. LIMITS ENGINE & TRADES
  const validateTradeLimits = (amountNgn: number, counterpartyInstId: InstitutionId): { passed: boolean; userLimitExceeded: boolean; reason: string } => {
    // 1. User Limit Check
    const userLimit = activePersona.tradeLimitNgn || 0;
    if (amountNgn > userLimit) {
      return {
        passed: false,
        userLimitExceeded: true,
        reason: `Trade amount ₦${(amountNgn/1e9).toFixed(2)}B exceeds dealer authority limit of ₦${(userLimit/1e9).toFixed(2)}B. Escalation to Treasury Supervisor required.`
      };
    }

    // 2. Team Limit Check (₦10B)
    if (amountNgn > 10000000000) {
      return {
        passed: false,
        userLimitExceeded: false,
        reason: 'Trade amount exceeds maximum desk aggregate limit of ₦10.0B.'
      };
    }

    // 3. Counterparty Limit Check (₦25B)
    return {
      passed: true,
      userLimitExceeded: false,
      reason: 'User Limit ✓ | Team Limit ✓ | Counterparty Limit ✓ | Regulatory Limit ✓'
    };
  };

  const createTradeTicket = (ticket: Partial<TradeTicket>): { tradeId: string; requiresSupervisor: boolean } => {
    const tradeId = `MSC-TRD-${Math.floor(100000 + Math.random() * 900000)}`;
    const amount = ticket.amountNgn || 1500000000;
    const counterpartyId = ticket.sellerInstitutionId === activeInstitution.id ? (ticket.buyerInstitutionId || 'SUMMIT_BANK') : (ticket.sellerInstitutionId || 'SUMMIT_BANK');
    const limitCheck = validateTradeLimits(amount, counterpartyId);

    const requiresSupervisor = !limitCheck.passed && limitCheck.userLimitExceeded;

    const newTicket: TradeTicket = {
      id: tradeId,
      originatingChatId: ticket.originatingChatId,
      originatingRfqId: ticket.originatingRfqId,
      buyerInstitutionId: ticket.buyerInstitutionId || activeInstitution.id,
      buyerInstitutionName: ticket.buyerInstitutionName || activeInstitution.legalName,
      buyerDealerPersonaId: ticket.buyerDealerPersonaId || activePersona.id,
      buyerDealerName: ticket.buyerDealerName || activePersona.name,
      sellerInstitutionId: ticket.sellerInstitutionId || 'SUMMIT_BANK',
      sellerInstitutionName: ticket.sellerInstitutionName || 'Summit Bank Plc',
      sellerDealerPersonaId: ticket.sellerDealerPersonaId || 'ngozi_umeh',
      sellerDealerName: ticket.sellerDealerName || 'Ngozi Umeh',
      instrument: ticket.instrument || 'FGN 2031 (12.40% 18-MAR-2031)',
      instrumentType: ticket.instrumentType || 'FGN_BOND',
      amountNgn: amount,
      yieldRate: ticket.yieldRate || 18.45,
      tradeDate: new Date().toISOString().split('T')[0],
      settlementDate: '2026-09-01',
      settlementConvention: ticket.settlementConvention || 'T+2 (CSCS / RTGS)',
      status: requiresSupervisor ? 'PENDING_SUPERVISOR_APPROVAL' : (ticket.status || 'PENDING_COUNTERPARTY_CONFIRMATION'),
      settlementReference: requiresSupervisor ? undefined : `SET-${Math.floor(10000 + Math.random() * 90000)}`,
      settlementStatus: requiresSupervisor ? 'PENDING_ROUTING' : 'ROUTED_TO_OPERATIONS',
      currentVersion: 1,
      versionHistory: [
        {
          version: 1,
          yieldRate: ticket.yieldRate || 18.45,
          amountNgn: amount,
          settlementDate: '2026-09-01',
          modifiedAt: new Date().toLocaleTimeString('en-GB') + ' WAT',
          modifiedBy: activePersona.name,
          reason: 'Initial Bilateral Trade Ticket'
        }
      ],
      requiresSupervisorApproval: requiresSupervisor,
      stepUpMfaVerified: true,
      auditTrail: [
        {
          timestamp: new Date().toLocaleTimeString('en-GB') + ' WAT',
          actor: activePersona.name,
          action: requiresSupervisor
            ? `Authority Limit Exceeded (₦${(amount/1e9).toFixed(1)}B > ₦${((activePersona.tradeLimitNgn||0)/1e9).toFixed(1)}B). Escalated to Supervisor.`
            : `Limits verified. Ticket created & transmitted to counterparty for confirmation.`
        }
      ]
    };

    setTradesList(prev => [newTicket, ...prev]);

    addAuditLog('CREATE_TRADE_TICKET', 'TRADE', tradeId, {
      next: `Amount: ₦${(amount/1e9).toFixed(2)}B @ ${newTicket.yieldRate}% (Status: ${newTicket.status})`,
      outcome: requiresSupervisor ? 'BLOCKED_LIMIT_EXCEEDED' : 'SUCCESS'
    });

    if (requiresSupervisor) {
      addNotification('Supervisor Approval Required', `Trade ${tradeId} (₦${(amount/1e9).toFixed(1)}B) exceeded dealer limit. Escalated to Supervisor.`, 'WARNING', { view: 'approvals', referenceId: tradeId });
    } else {
      addNotification('Trade Ticket Dispatched', `Trade ${tradeId} delivered to counterparty. Awaiting approval.`, 'INFO', { view: 'blotter', referenceId: tradeId });
    }

    return { tradeId, requiresSupervisor };
  };

  const confirmTradeCounterparty = (tradeId: string) => {
    const time = new Date().toLocaleTimeString('en-GB') + ' WAT';
    const settRef = `SET-${Math.floor(10000 + Math.random() * 90000)}`;

    setTradesList(prev => prev.map(t => {
      if (t.id === tradeId) {
        return {
          ...t,
          status: 'CONFIRMED',
          settlementReference: settRef,
          settlementStatus: 'ROUTED_TO_OPERATIONS',
          auditTrail: [
            ...t.auditTrail,
            { timestamp: time, actor: activePersona.name, action: `Trade ticket confirmed & approved by counterparty ${activeInstitution.displayName} (${activePersona.name})` }
          ]
        };
      }
      return t;
    }));

    addAuditLog('CONFIRM_TRADE_COUNTERPARTY', 'TRADE', tradeId, {
      next: `Approved by counterparty ${activePersona.name} (${activeInstitution.displayName})`
    });
    addNotification('Trade Ticket Confirmed ✓', `Trade Ticket ${tradeId} APPROVED by counterparty! Status updated to CONFIRMED on both blotters.`, 'SUCCESS', { view: 'blotter', referenceId: tradeId });
  };

  const approveTradeSupervisor = (tradeId: string) => {
    const time = new Date().toLocaleTimeString('en-GB') + ' WAT';
    const settRef = `SET-${Math.floor(10000 + Math.random() * 90000)}`;

    setTradesList(prev => prev.map(t => {
      if (t.id === tradeId) {
        return {
          ...t,
          status: 'CONFIRMED',
          settlementReference: settRef,
          settlementStatus: 'ROUTED_TO_OPERATIONS',
          supervisorApprovedBy: activePersona.name,
          supervisorApprovedAt: time,
          auditTrail: [
            ...t.auditTrail,
            { timestamp: time, actor: activePersona.name, action: `Supervisor trade authority approved. Settlement ${settRef} routed to Back Office.` }
          ]
        };
      }
      return t;
    }));

    addAuditLog('SUPERVISOR_APPROVE_TRADE', 'TRADE', tradeId, {
      next: `Supervisor ${activePersona.name} approved high-value trade.`
    });
    addNotification('Trade Approved by Supervisor', `High-value Trade ${tradeId} approved and routed to Settlement.`, 'SUCCESS');
  };

  const proposeTradeAmendment = (tradeId: string, newYieldRate: number, newAmountNgn: number, newSettlementDate: string, reason: string) => {
    const time = new Date().toLocaleTimeString('en-GB') + ' WAT';
    setTradesList(prev => prev.map(t => {
      if (t.id === tradeId) {
        return {
          ...t,
          status: 'AMENDMENT_REQUESTED',
          amendmentProposed: {
            newYieldRate,
            newAmountNgn,
            newSettlementDate,
            requestedBy: `${activePersona.name} (${activeInstitution.displayName})`,
            requestedAt: time,
            reason
          },
          auditTrail: [
            ...t.auditTrail,
            { timestamp: time, actor: activePersona.name, action: `Proposed Amendment v2: Yield ${newYieldRate}%, Amount ₦${(newAmountNgn/1e9).toFixed(2)}B. Reason: ${reason}` }
          ]
        };
      }
      return t;
    }));

    addAuditLog('PROPOSE_TRADE_AMENDMENT', 'TRADE', tradeId, {
      next: `Proposed v2: Yield ${newYieldRate}%, Amount ₦${(newAmountNgn/1e9).toFixed(2)}B`
    });
    addNotification('Trade Amendment Proposed', `Amendment requested for ${tradeId}. Awaiting counterparty acceptance.`, 'WARNING');
  };

  const acceptTradeAmendment = (tradeId: string) => {
    const time = new Date().toLocaleTimeString('en-GB') + ' WAT';
    setTradesList(prev => prev.map(t => {
      if (t.id === tradeId && t.amendmentProposed) {
        const newVer = t.currentVersion + 1;
        const newHistItem = {
          version: newVer,
          yieldRate: t.amendmentProposed.newYieldRate,
          amountNgn: t.amendmentProposed.newAmountNgn,
          settlementDate: t.amendmentProposed.newSettlementDate,
          modifiedAt: time,
          modifiedBy: activePersona.name,
          reason: t.amendmentProposed.reason
        };

        return {
          ...t,
          yieldRate: t.amendmentProposed.newYieldRate,
          amountNgn: t.amendmentProposed.newAmountNgn,
          settlementDate: t.amendmentProposed.newSettlementDate,
          status: 'CONFIRMED',
          currentVersion: newVer,
          versionHistory: [...t.versionHistory, newHistItem],
          amendmentProposed: undefined,
          auditTrail: [
            ...t.auditTrail,
            { timestamp: time, actor: activePersona.name, action: `Accepted Amendment v${newVer}. Blotter and settlement synchronized.` }
          ]
        };
      }
      return t;
    }));

    addAuditLog('ACCEPT_TRADE_AMENDMENT', 'TRADE', tradeId, { next: 'Status: CONFIRMED (Version 2)' });
    addNotification('Amendment Accepted', `Trade ${tradeId} Version 2 confirmed and updated in both blotters.`, 'SUCCESS');
  };

  const rejectTradeAmendment = (tradeId: string, reason: string) => {
    const time = new Date().toLocaleTimeString('en-GB') + ' WAT';
    setTradesList(prev => prev.map(t => {
      if (t.id === tradeId) {
        return {
          ...t,
          status: 'CONFIRMED',
          amendmentProposed: undefined,
          auditTrail: [
            ...t.auditTrail,
            { timestamp: time, actor: activePersona.name, action: `Rejected Amendment. Retaining Version ${t.currentVersion}. Reason: ${reason}` }
          ]
        };
      }
      return t;
    }));

    addAuditLog('REJECT_TRADE_AMENDMENT', 'TRADE', tradeId, { next: `Rejected: ${reason}` });
    addNotification('Amendment Rejected', `Trade ${tradeId} amendment rejected. Retaining Version 1.`, 'INFO');
  };

  // 7. NOTICES & SUBMISSIONS
  const acknowledgeNotice = (noticeId: string) => {
    setNoticesList(prev => prev.map(n => {
      if (n.id === noticeId && !n.acknowledgedBy.includes(activePersona.id)) {
        return {
          ...n,
          acknowledgedBy: [...n.acknowledgedBy, activePersona.id]
        };
      }
      return n;
    }));

    addAuditLog('ACKNOWLEDGE_NOTICE', 'USER_ACCESS', noticeId, { next: `Acknowledged Notice ${noticeId}` });
    addNotification('Notice Acknowledged', 'Official compliance acknowledgment recorded in audit ledger.', 'INFO');
  };

  const submitDataFiling = (submissionId: string) => {
    const time = new Date().toLocaleTimeString('en-GB') + ' WAT';
    setSubmissionsList(prev => prev.map(s => {
      if (s.id === submissionId) {
        return {
          ...s,
          status: 'SUBMITTED',
          preparedBy: `${activePersona.name} (${activeInstitution.displayName})`,
          authorizedBy: 'Institutional Mandate Signature',
          submittedAt: new Date().toLocaleDateString('en-GB') + ' ' + time
        };
      }
      return s;
    }));

    addAuditLog('SUBMIT_DATA_FILING', 'USER_ACCESS', submissionId, { next: `Submitted ${submissionId}` });
    addNotification('Filing Transmitted', `Data filing ${submissionId} transmitted to regulator`, 'SUCCESS');
  };

  // 8. GOVERNANCE & DELEGATIONS
  const createDelegation = (delData: Partial<DelegatedAuthority>) => {
    const delId = `DEL-${Date.now().toString().slice(-4)}`;
    const newDel: DelegatedAuthority = {
      id: delId,
      delegatorPersonaId: activePersona.id,
      delegatorName: activePersona.name,
      delegatorRole: activePersona.title,
      delegateePersonaId: delData.delegateePersonaId || 'grace_mohammed',
      delegateeName: delData.delegateeName || 'Grace Mohammed',
      delegateeRole: delData.delegateeRole || 'Principal Finance Officer',
      scope: delData.scope || 'CORRESPONDENCE_AUTHORIZER',
      startDate: delData.startDate || '2026-09-01',
      endDate: delData.endDate || '2026-09-15',
      status: 'ACTIVE',
      reason: delData.reason || 'Delegated executive coverage.'
    };

    setDelegationsList(prev => [newDel, ...prev]);
    addAuditLog('CREATE_DELEGATED_AUTHORITY', 'DELEGATION', delId, {
      next: `Delegated ${newDel.scope} to ${newDel.delegateeName}`
    });
    addNotification('Delegation Active', `Authority delegated to ${newDel.delegateeName} until ${newDel.endDate}`, 'INFO');
  };

  const revokeDelegation = (delId: string) => {
    setDelegationsList(prev => prev.map(d => d.id === delId ? { ...d, status: 'REVOKED' } : d));
    addAuditLog('REVOKE_DELEGATED_AUTHORITY', 'DELEGATION', delId, { next: 'Status: REVOKED' });
    addNotification('Delegation Revoked', `Delegation ${delId} has been revoked`, 'WARNING');
  };

  const proposeSensitiveAccess = (req: Partial<SensitiveAccessRequest>) => {
    const reqId = `SAR-${Date.now().toString().slice(-4)}`;
    const newReq: SensitiveAccessRequest = {
      id: reqId,
      institutionId: activeInstitution.id,
      targetPersonaId: req.targetPersonaId || 'tunde_adebayo',
      targetPersonaName: req.targetPersonaName || 'Tunde Adebayo',
      changeType: req.changeType || 'INCREASE_TRADE_LIMIT',
      requestedBy: `${activePersona.name} (Admin Maker)`,
      requestedAt: new Date().toLocaleTimeString('en-GB') + ' WAT',
      details: req.details || 'Sensitive access modification proposal.',
      status: 'PENDING_CHECKER'
    };

    setSensitiveRequestsList(prev => [newReq, ...prev]);
    addAuditLog('PROPOSE_SENSITIVE_ACCESS_MAKER', 'USER_ACCESS', reqId, {
      next: `Proposed: ${newReq.changeType} for ${newReq.targetPersonaName}`
    });
    addNotification('Maker-Checker Request Queued', `Sensitive request ${reqId} queued for Admin B (Checker) approval`, 'INFO');
  };

  const approveSensitiveAccess = (requestId: string, comment?: string) => {
    const time = new Date().toLocaleTimeString('en-GB') + ' WAT';
    setSensitiveRequestsList(prev => prev.map(r => {
      if (r.id === requestId) {
        return {
          ...r,
          status: 'APPROVED',
          checkerName: activePersona.name,
          checkerReviewedAt: time,
          comment: comment || 'Approved by Checker.'
        };
      }
      return r;
    }));

    addAuditLog('APPROVE_SENSITIVE_ACCESS_CHECKER', 'USER_ACCESS', requestId, {
      next: `Approved by ${activePersona.name} (Dual Control Satisfied)`
    });
    addNotification('Access Modification Approved', `Sensitive change ${requestId} is now ACTIVE.`, 'SUCCESS');
  };

  const rejectSensitiveAccess = (requestId: string, comment?: string) => {
    const time = new Date().toLocaleTimeString('en-GB') + ' WAT';
    setSensitiveRequestsList(prev => prev.map(r => {
      if (r.id === requestId) {
        return {
          ...r,
          status: 'REJECTED',
          checkerName: activePersona.name,
          checkerReviewedAt: time,
          comment: comment || 'Rejected during Checker review.'
        };
      }
      return r;
    }));

    addAuditLog('REJECT_SENSITIVE_ACCESS_CHECKER', 'USER_ACCESS', requestId, { next: `Rejected: ${comment}` });
  };

  const suspendUser = (personaId: PersonaId) => {
    addAuditLog('SUSPEND_USER_ACCOUNT', 'USER_ACCESS', personaId, { next: 'Status: SUSPENDED' });
    addNotification('User Account Suspended', `Access revoked for persona ${personaId}`, 'WARNING');
  };

  const reactivateUser = (personaId: PersonaId) => {
    addAuditLog('REACTIVATE_USER_ACCOUNT', 'USER_ACCESS', personaId, { next: 'Status: ACTIVE' });
    addNotification('User Account Reactivated', `Access restored for persona ${personaId}`, 'INFO');
  };

  // 9. SCENARIO LAB RUNNER
  const scenarioStepsDefinition: Record<'A' | 'B' | 'C', ScenarioStep[]> = {
    A: [
      {
        scenarioId: 'A',
        stepNumber: 1,
        totalSteps: 5,
        title: 'Step 1: Bilateral Chat & Price Negotiation',
        instruction: 'As Tunde Adebayo (Meridian Bank Treasury Dealer), initiate fixed income inquiry with Ngozi Umeh (Summit Bank) for ₦1.5B FGN 2031 bond.',
        activeInstitutionId: 'MERIDIAN_BANK',
        activePersonaId: 'tunde_adebayo',
        targetView: 'chat',
        suggestedActionLabel: 'Send Negotiation Message',
        isComplete: false
      },
      {
        scenarioId: 'A',
        stepNumber: 2,
        totalSteps: 5,
        title: 'Step 2: Create Trade Ticket from Chat',
        instruction: 'Click "Create Trade Ticket" from the chat conversation. The Limits Engine validates Tunde\'s ₦2.0B authority threshold.',
        activeInstitutionId: 'MERIDIAN_BANK',
        activePersonaId: 'tunde_adebayo',
        targetView: 'tickets',
        suggestedActionLabel: 'Confirm Trade Ticket MSC-TRD-100483',
        isComplete: false
      },
      {
        scenarioId: 'A',
        stepNumber: 3,
        totalSteps: 5,
        title: 'Step 3: View Counterparty Blotter (Summit Bank)',
        instruction: 'Switch to Summit Bank (Ngozi Umeh). Notice the same Trade MSC-TRD-100483 is instantaneously confirmed in Summit\'s Blotter.',
        activeInstitutionId: 'SUMMIT_BANK',
        activePersonaId: 'ngozi_umeh',
        targetView: 'blotter',
        suggestedActionLabel: 'Inspect Summit Blotter',
        isComplete: false
      },
      {
        scenarioId: 'A',
        stepNumber: 4,
        totalSteps: 5,
        title: 'Step 4: High-Value ₦5.0B Trade & Supervisor Escalation',
        instruction: 'Create a ₦5.0B Trade exceeding Tunde\'s limit. Trigger simulated Step-Up 2FA and route approval to Supervisor Ada Okafor.',
        activeInstitutionId: 'MERIDIAN_BANK',
        activePersonaId: 'ada_okafor',
        targetView: 'approvals',
        suggestedActionLabel: 'Approve High-Value Trade as Supervisor',
        isComplete: false
      },
      {
        scenarioId: 'A',
        stepNumber: 5,
        totalSteps: 5,
        title: 'Step 5: Trade Amendment & Settlement Synchronization',
        instruction: 'Propose an amendment (v1 -> v2) on yield rate. Counterparty accepts; Version 2 is locked and settlement calendar updates.',
        activeInstitutionId: 'SUMMIT_BANK',
        activePersonaId: 'ngozi_umeh',
        targetView: 'settlement',
        suggestedActionLabel: 'Review Settlement Calendar',
        isComplete: true
      }
    ],
    B: [
      {
        scenarioId: 'B',
        stepNumber: 1,
        totalSteps: 4,
        title: 'Step 1: OFI Identifies Settlement Difference',
        instruction: 'As Mary Okoye (Horizon MFB Operations), submit settlement reconciliation Case MSC-CASE-200284 with 146 transactions schedule (₦38.6M difference).',
        activeInstitutionId: 'HORIZON_MFB',
        activePersonaId: 'mary_okoye',
        targetView: 'cases',
        suggestedActionLabel: 'Submit Settlement Case',
        isComplete: false
      },
      {
        scenarioId: 'B',
        stepNumber: 2,
        totalSteps: 4,
        title: 'Step 2: Meridian Bank Payments Ops Acknowledges & Investigates',
        instruction: 'Switch to Meridian Bank (Chika Eze). Acknowledge receipt in Payments Team Inbox and attach NIBSS clearing trace log.',
        activeInstitutionId: 'MERIDIAN_BANK',
        activePersonaId: 'chika_eze',
        targetView: 'cases',
        suggestedActionLabel: 'Acknowledge & Attach Trace Evidence',
        isComplete: false
      },
      {
        scenarioId: 'B',
        stepNumber: 3,
        totalSteps: 4,
        title: 'Step 3: Meridian Proposes Bilateral Resolution',
        instruction: 'Meridian outlines 142 transactions credited in Cycle 3; 4 reversed by switch. Propose resolution to Horizon MFB.',
        activeInstitutionId: 'MERIDIAN_BANK',
        activePersonaId: 'chika_eze',
        targetView: 'cases',
        suggestedActionLabel: 'Propose Resolution Plan',
        isComplete: false
      },
      {
        scenarioId: 'B',
        stepNumber: 4,
        totalSteps: 4,
        title: 'Step 4: Horizon Accepts & Mutual Closure',
        instruction: 'Switch back to Horizon MFB. Mary Okoye accepts resolution; Case status updates to CLOSED on both institutions.',
        activeInstitutionId: 'HORIZON_MFB',
        activePersonaId: 'mary_okoye',
        targetView: 'cases',
        suggestedActionLabel: 'Accept Resolution & Close Case',
        isComplete: true
      }
    ],
    C: [
      {
        scenarioId: 'C',
        stepNumber: 1,
        totalSteps: 4,
        title: 'Step 1: Government Officer Drafts Official Request',
        instruction: 'As Grace Mohammed (FRSA Finance Officer), draft Official Correspondence FRSA/FIN/2026/0821 for August Tax Collections Statement.',
        activeInstitutionId: 'FRSA',
        activePersonaId: 'grace_mohammed',
        targetView: 'requests',
        suggestedActionLabel: 'Submit for Executive Signature',
        isComplete: false
      },
      {
        scenarioId: 'C',
        stepNumber: 2,
        totalSteps: 4,
        title: 'Step 2: Director Finance Authorizes & Issues Mandate',
        instruction: 'As Director David Ekanem, perform step-up digital signature approval. The formal mandate is dispatched to Meridian Bank.',
        activeInstitutionId: 'FRSA',
        activePersonaId: 'david_ekanem',
        targetView: 'approvals',
        suggestedActionLabel: 'Authorize with Digital Seal',
        isComplete: false
      },
      {
        scenarioId: 'C',
        stepNumber: 3,
        totalSteps: 4,
        targetView: 'correspondence',
        title: 'Step 3: Bank Government Banking Fulfills & Authorizer Signs',
        instruction: 'Meridian Government Officer Ibrahim Musa generates certified statement PDF; Authorizer Amina Bello signs and transmits response.',
        activeInstitutionId: 'MERIDIAN_BANK',
        activePersonaId: 'amina_bello',
        suggestedActionLabel: 'Approve & Transmit Bank Response',
        isComplete: false
      },
      {
        scenarioId: 'C',
        stepNumber: 4,
        totalSteps: 4,
        title: 'Step 4: Government Receives Response & Concludes Mandate',
        instruction: 'Switch to FRSA. Review certified August Collections statement response and mark mandate as CLOSED.',
        activeInstitutionId: 'FRSA',
        activePersonaId: 'david_ekanem',
        targetView: 'correspondence',
        suggestedActionLabel: 'Review Certified PDF & Close Request',
        isComplete: true
      }
    ]
  };

  const scenarioSteps = activeScenarioId ? scenarioStepsDefinition[activeScenarioId] : [];

  const runScenario = (scenarioId: 'A' | 'B' | 'C') => {
    setActiveScenarioId(scenarioId);
    setCurrentScenarioStepIndex(0);
    const firstStep = scenarioStepsDefinition[scenarioId][0];
    if (firstStep) {
      setActiveInstitutionId(firstStep.activeInstitutionId);
      setActivePersonaId(firstStep.activePersonaId);
      setActiveView(firstStep.targetView);
    }
    setIsScenarioLabOpen(true);
    addNotification('Scenario Lab Launched', `Started Walkthrough for Scenario ${scenarioId}`, 'INFO');
  };

  const advanceScenarioStep = () => {
    if (!activeScenarioId) return;
    const steps = scenarioStepsDefinition[activeScenarioId];
    if (currentScenarioStepIndex < steps.length - 1) {
      const nextIndex = currentScenarioStepIndex + 1;
      setCurrentScenarioStepIndex(nextIndex);
      const nextStep = steps[nextIndex];
      setActiveInstitutionId(nextStep.activeInstitutionId);
      setActivePersonaId(nextStep.activePersonaId);
      setActiveView(nextStep.targetView);
    } else {
      setIsScenarioLabOpen(false);
      setActiveScenarioId(null);
      addNotification('Scenario Completed', `Scenario ${activeScenarioId} completed successfully!`, 'SUCCESS');
    }
  };

  const resetScenario = () => {
    setActiveScenarioId(null);
    setCurrentScenarioStepIndex(0);
    setIsScenarioLabOpen(false);
  };

  const resetAllState = () => {
    setChatThreads(INITIAL_CHAT_THREADS);
    setChatMessages(INITIAL_CHAT_MESSAGES);
    setFormalMessages(INITIAL_FORMAL_MESSAGES);
    setCorrespondenceList(INITIAL_CORRESPONDENCE);
    setCasesList(INITIAL_CASES);
    setRfqsList(INITIAL_RFQS);
    setTradesList(INITIAL_TRADES);
    setNoticesList(INITIAL_NOTICES);
    setSubmissionsList(INITIAL_DATA_SUBMISSIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setDelegationsList(INITIAL_DELEGATIONS);
    setSensitiveRequestsList(INITIAL_SENSITIVE_REQUESTS);
    setActiveInstitutionId('MERIDIAN_BANK');
    setActivePersonaId('tunde_adebayo');
    setActiveView('home');
    addNotification('Demo Data Reset', 'All shared state reset to initial operational baseline.', 'INFO');
  };

  return (
    <InstitutionContext.Provider
      value={{
        activeInstitutionId,
        activeInstitution,
        activePersonaId,
        activePersona,
        activeView,
        availablePersonasInActiveInst,
        switchInstitution,
        switchPersona,
        switchCounterpartyPerspective,
        setActiveView,
        isComposerOpen,
        composerDefaultType,
        composerContextData,
        openComposer,
        closeComposer,
        isSearchOpen,
        setIsSearchOpen,
        isStepUpModalOpen,
        stepUpData,
        openStepUpAuth,
        closeStepUpAuth,
        isAuthenticated,
        loginWithOtp,
        logout,
        isScenarioLabOpen,
        setIsScenarioLabOpen,
        activeScenarioId,
        currentScenarioStepIndex,
        scenarioSteps,
        runScenario,
        advanceScenarioStep,
        resetScenario,
        chatThreads,
        chatMessages,
        formalMessages,
        correspondenceList,
        casesList,
        rfqsList,
        tradesList,
        marketQuotes,
        noticesList,
        submissionsList,
        auditLogs,
        delegationsList,
        sensitiveRequestsList,
        notifications,
        sendChatMessage,
        createChatThread,
        startHierarchicalChat,
        endChatThread,
        sendFormalMessage,
        replyToFormalMessage,
        acknowledgeFormalMessage,
        convertMessageToCase,
        createCorrespondence,
        approveCorrespondence,
        issueCorrespondence,
        acknowledgeCorrespondence,
        assignCorrespondence,
        submitOfficialResponse,
        closeCorrespondence,
        createCase,
        acknowledgeCase,
        assignCase,
        uploadCaseEvidence,
        proposeCaseResolution,
        acceptCaseResolution,
        disputeCaseResolution,
        closeCase,
        createRFQ,
        submitRFQQuote,
        acceptRFQQuote,
        validateTradeLimits,
        createTradeTicket,
        approveTradeSupervisor,
        confirmTradeCounterparty,
        proposeTradeAmendment,
        acceptTradeAmendment,
        rejectTradeAmendment,
        acknowledgeNotice,
        submitDataFiling,
        createDelegation,
        revokeDelegation,
        proposeSensitiveAccess,
        approveSensitiveAccess,
        rejectSensitiveAccess,
        suspendUser,
        reactivateUser,
        addAuditLog,
        dismissNotification,
        resetAllState
      }}
    >
      {children}
    </InstitutionContext.Provider>
  );
};

export const useInstitution = () => {
  const context = useContext(InstitutionContext);
  if (!context) throw new Error('useInstitution must be used within an InstitutionProvider');
  return context;
};
