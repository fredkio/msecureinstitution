export type InstitutionId = 'MERIDIAN_BANK' | 'SUMMIT_BANK' | 'HORIZON_MFB' | 'FRSA';

export type InstitutionType = 
  | 'COMMERCIAL_BANK'
  | 'MERCHANT_BANK'
  | 'OFI_MFB'
  | 'FEDERAL_MDA'
  | 'STATE_MDA'
  | 'REGULATOR'
  | 'FINTECH';

export type PersonaId = 
  // Meridian Bank
  | 'tunde_adebayo'      // Treasury Dealer
  | 'ada_okafor'         // Treasury Supervisor
  | 'chika_eze'          // Payments Operations Officer
  | 'ibrahim_musa'       // Government Banking Officer
  | 'amina_bello'        // Institution Authorizer
  | 'meridian_admin'     // Institution Administrator
  // Summit Bank
  | 'ngozi_umeh'         // Fixed Income Dealer
  | 'femi_adeyemi'       // Treasury Operations Officer
  | 'ogechi_nwachukwu'   // Payments Operations Officer
  | 'sanusi_garba'       // Institution Authorizer
  | 'summit_admin'       // Institution Administrator
  // Horizon MFB
  | 'mary_okoye'         // Operations Officer
  | 'john_danladi'       // Operations Supervisor
  | 'horizon_admin'      // Institution Administrator
  // FRSA (Federal Revenue Services Agency)
  | 'grace_mohammed'     // Finance Officer
  | 'david_ekanem'       // Director Finance
  | 'frsa_admin';        // Institution Administrator

export type ServiceModule = 
  | 'login'
  | 'home'
  | 'chat'
  | 'inbox'
  | 'directory'
  | 'markets'
  | 'rfqs'
  | 'tickets'
  | 'blotter'
  | 'settlement'
  | 'cases'
  | 'correspondence'
  | 'requests'
  | 'submissions'
  | 'notices'
  | 'reports'
  | 'approvals'
  | 'admin'
  | 'security'
  | 'scenarios';

export interface Persona {
  id: PersonaId;
  name: string;
  title: string;
  department: string;
  team: string;
  institutionId: InstitutionId;
  institutionName: string;
  email: string;
  avatarInitials: string;
  roleType: 'DEALER' | 'SUPERVISOR' | 'OPERATIONS' | 'GOVT_OFFICER' | 'AUTHORIZER' | 'ADMIN' | 'DIRECTOR';
  tradeLimitNgn?: number; // e.g. 2,000,000,000 (2bn) for Tunde
  canTrade: boolean;
  canAuthorizeCorrespondence: boolean;
  canApproveTrades: boolean;
  canManageUsers: boolean;
  allowedServices: ServiceModule[];
}

export interface Institution {
  id: InstitutionId;
  code: string;
  legalName: string;
  displayName: string;
  type: InstitutionType;
  typeLabel: string;
  rcNumber: string;
  regulator: string;
  officialDomain: string;
  headquarters: string;
  verified: boolean;
  badge: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    bgBadge: string;
    textBadge: string;
  };
  departments: {
    name: string;
    teams: string[];
  }[];
  enabledServices: ServiceModule[];
  personas: Persona[];
}

// 1. CHAT
export interface ChatMessage {
  id: string;
  threadId: string;
  senderPersonaId: PersonaId;
  senderName: string;
  senderInstitution: string;
  senderDepartment: string;
  timestamp: string;
  text: string;
  classification: 'PUBLIC_INSTITUTIONAL' | 'CONFIDENTIAL' | 'MARKET_QUOTATION' | 'RESTRICTED';
  attachments?: {
    name: string;
    size: string;
    type: string;
  }[];
  actionLink?: {
    type: 'TRADE_TICKET' | 'RFQ' | 'CASE' | 'CORRESPONDENCE';
    referenceId: string;
    label: string;
  };
}

export interface ChatThread {
  id: string; // MSC-CHAT-*
  title: string;
  type: 'DIRECT' | 'TEAM_TO_TEAM' | 'ROOM';
  participantInstitutionIds: InstitutionId[];
  participantPersonaIds: PersonaId[];
  targetInstitutionId?: InstitutionId;
  targetDepartment?: string;
  targetTeam?: string;
  targetPersonaId?: PersonaId;
  targetPersonaName?: string;
  targetPersonaTitle?: string;
  lastMessageTime: string;
  lastMessageText: string;
  unreadCount: Record<string, number>;
  sourceContext?: string;
  status: 'ACTIVE' | 'ENDED';
  endedAt?: string;
  endedBy?: string;
}

// 2. FORMAL MESSAGE
export interface FormalMessage {
  id: string; // MSC-MSG-*
  subject: string;
  senderPersonaId: PersonaId;
  senderName: string;
  senderInstitutionId: InstitutionId;
  senderInstitutionName: string;
  senderTeam: string;
  recipientInstitutionId: InstitutionId;
  recipientInstitutionName: string;
  recipientTeam: string;
  recipientPersonaId?: PersonaId;
  body: string;
  priority: 'NORMAL' | 'URGENT' | 'HIGH_PRIORITY';
  classification: 'COMMERCIAL' | 'OPERATIONAL' | 'OFFICIAL' | 'REGULATORY';
  responseRequired: boolean;
  responseDeadline?: string;
  createdAt: string;
  status: 'SENT' | 'DELIVERED' | 'READ' | 'ACKNOWLEDGED' | 'RESOLVED' | 'CONVERTED_TO_CASE';
  targetInbox: 'MY' | 'TEAM' | 'INSTITUTION';
  attachments?: {
    name: string;
    size: string;
  }[];
  linkedCaseId?: string;
  replies?: {
    id: string;
    senderName: string;
    senderInstitution: string;
    timestamp: string;
    body: string;
  }[];
}

// 3. OFFICIAL CORRESPONDENCE
export interface OfficialCorrespondence {
  id: string; // MSC-COR-* or e.g. FRSA/FIN/2026/0821
  reference: string;
  subject: string;
  originatingInstitutionId: InstitutionId;
  originatingInstitutionName: string;
  destinationInstitutionId: InstitutionId;
  destinationInstitutionName: string;
  destinationTeam: string;
  preparedBy: {
    personaId: PersonaId;
    name: string;
    title: string;
    date: string;
  };
  authorizedBy?: {
    personaId: PersonaId;
    name: string;
    title: string;
    date: string;
  };
  classification: 'OFFICIAL_REQUEST' | 'GOVERNMENT_DIRECTIVE' | 'REGULATORY_LETTER' | 'BANK_MANDATE' | 'OFFICIAL_RESPONSE';
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'ISSUED' | 'DELIVERED' | 'ACKNOWLEDGED' | 'IN_PROGRESS' | 'RESPONDED' | 'CLOSED';
  effectiveDate: string;
  responseRequired: boolean;
  deadline?: string;
  bodyMarkdown: string;
  attachments?: {
    name: string;
    size: string;
    verifiedSignature?: boolean;
  }[];
  officialResponse?: {
    reference: string;
    bodyMarkdown: string;
    preparedBy: string;
    authorizedBy: string;
    date: string;
    attachmentName: string;
  };
  assignedToPersonaId?: PersonaId;
  assignedToName?: string;
  auditTrail: {
    timestamp: string;
    actor: string;
    institution: string;
    action: string;
  }[];
}

// 4. CASE MANAGEMENT
export interface InstitutionalCase {
  id: string; // MSC-CASE-200284
  type: 'SETTLEMENT_RECONCILIATION' | 'PAYMENT_INVESTIGATION' | 'UNIDENTIFIED_CREDIT' | 'DUPLICATE_TRANSACTION' | 'GOVERNMENT_ENQUIRY';
  title: string;
  originatingInstitutionId: InstitutionId;
  originatingInstitutionName: string;
  originatingPersonaId: PersonaId;
  originatingPersonaName: string;
  receivingInstitutionId: InstitutionId;
  receivingInstitutionName: string;
  assignedTeam: string;
  assignedPersonaId?: PersonaId;
  assignedPersonaName?: string;
  referenceNo: string;
  transactionReference?: string;
  amountNgn?: number;
  affectedTransactionsCount?: number;
  settlementDate?: string;
  description: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  slaBreachTime: string;
  isSlaBreached: boolean;
  status: 
    | 'NEW'
    | 'ACKNOWLEDGED'
    | 'ASSIGNED'
    | 'IN_PROGRESS'
    | 'AWAITING_COUNTERPARTY'
    | 'RESOLUTION_PROPOSED'
    | 'RESOLVED'
    | 'CLOSED'
    | 'DISPUTED';
  attachments: {
    name: string;
    size: string;
    uploadedBy: string;
    timestamp: string;
  }[];
  activityFeed: {
    id: string;
    timestamp: string;
    actorName: string;
    actorInstitution: string;
    action: string;
    notes?: string;
    evidenceAttachment?: string;
  }[];
  proposedResolution?: {
    proposedBy: string;
    proposedDate: string;
    summary: string;
    refundAdjustmentNgn?: number;
    actionPlan: string;
  };
}

// 5. RFQ
export interface RFQQuote {
  id: string;
  counterpartyInstitutionId: InstitutionId;
  counterpartyInstitutionName: string;
  dealerName: string;
  dealerPersonaId: PersonaId;
  yieldRate: number; // e.g. 18.45%
  price: number;
  settlementConvention: string;
  validUntil: string;
  status: 'PENDING' | 'QUOTED' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
}

export interface RFQRequest {
  id: string; // MSC-RFQ-400182
  initiatingInstitutionId: InstitutionId;
  initiatingInstitutionName: string;
  initiatingDealerId: PersonaId;
  initiatingDealerName: string;
  instrument: string;
  category: 'FIXED_INCOME' | 'FX' | 'MONEY_MARKET';
  side: 'BUY' | 'SELL';
  amountNgn: number;
  tenor: string;
  settlementDate: string;
  settlementConvention: 'T+2' | 'T+1' | 'SPOT' | 'SAME_DAY';
  selectedCounterparties: {
    institutionId: InstitutionId;
    institutionName: string;
  }[];
  quotes: RFQQuote[];
  status: 'OPEN' | 'QUOTED' | 'ACCEPTED' | 'EXECUTED_TO_TRADE' | 'EXPIRED' | 'CANCELLED';
  createdAt: string;
  expiresAt: string;
  executedTradeId?: string;
}

// 6. TRADE TICKET & BLOTTER
export interface TradeVersion {
  version: number;
  yieldRate: number;
  amountNgn: number;
  settlementDate: string;
  modifiedAt: string;
  modifiedBy: string;
  reason: string;
}

export interface TradeTicket {
  id: string; // MSC-TRD-100483
  originatingChatId?: string;
  originatingRfqId?: string;
  buyerInstitutionId: InstitutionId;
  buyerInstitutionName: string;
  buyerDealerPersonaId: PersonaId;
  buyerDealerName: string;
  sellerInstitutionId: InstitutionId;
  sellerInstitutionName: string;
  sellerDealerPersonaId: PersonaId;
  sellerDealerName: string;
  instrument: string;
  instrumentType: 'FGN_BOND' | 'TREASURY_BILL' | 'FX_SPOT' | 'REPO_OVERNIGHT' | 'COMMERCIAL_PAPER';
  amountNgn: number;
  yieldRate: number; // e.g. 18.45
  tradeDate: string;
  settlementDate: string;
  settlementConvention: string;
  status: 
    | 'PENDING_SUPERVISOR_APPROVAL' // If > ₦2bn and dealer threshold exceeded
    | 'PENDING_COUNTERPARTY_CONFIRMATION'
    | 'CONFIRMED'
    | 'AMENDMENT_REQUESTED'
    | 'SETTLED'
    | 'CANCELLED'
    | 'REJECTED';
  settlementReference?: string; // e.g. SET-93882
  settlementStatus: 'PENDING_ROUTING' | 'ROUTED_TO_OPERATIONS' | 'MATCHED' | 'SETTLING_TODAY' | 'SETTLED';
  currentVersion: number;
  amendmentProposed?: {
    newYieldRate: number;
    newAmountNgn: number;
    newSettlementDate: string;
    requestedBy: string;
    requestedAt: string;
    reason: string;
  };
  versionHistory: TradeVersion[];
  requiresSupervisorApproval: boolean;
  supervisorApprovedBy?: string;
  supervisorApprovedAt?: string;
  stepUpMfaVerified: boolean;
  auditTrail: {
    timestamp: string;
    actor: string;
    action: string;
  }[];
}

// 7. NOTICES & BROADCASTS
export interface NoticeItem {
  id: string; // MSC-NOT-*
  title: string;
  type: 'REGULATORY' | 'MARKET_DIRECTIVE' | 'OPERATIONAL' | 'GOVERNMENT' | 'SECURITY_ADVISORY';
  issuerInstitution: string;
  issuerDepartment: string;
  issuedAt: string;
  effectiveDate: string;
  expiryDate?: string;
  priority: 'CRITICAL' | 'HIGH' | 'STANDARD';
  summary: string;
  contentMarkdown: string;
  requiresAcknowledgement: boolean;
  acknowledgedBy: PersonaId[];
  targetAudience: 'ALL_INSTITUTIONS' | 'COMMERCIAL_BANKS' | 'OFI_ONLY' | 'GOVERNMENT_ENTITIES';
  attachments?: {
    name: string;
    size: string;
  }[];
}

// 8. DATA SUBMISSIONS
export interface DataSubmissionItem {
  id: string; // MSC-SUB-*
  title: string;
  regulatoryBody: string;
  referenceDirective: string;
  reportingPeriod: string;
  deadline: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'SUBMITTED' | 'ACCEPTED' | 'REJECTED' | 'OVERDUE';
  assignedToPersonaId: PersonaId;
  preparedBy?: string;
  authorizedBy?: string;
  submittedAt?: string;
  validationReport?: {
    validRecords: number;
    flaggedAnomalies: number;
    status: 'PASSED' | 'WARNINGS' | 'FAILED';
  };
}

// 9. AUDIT LOG
export interface AuditLogItem {
  id: string;
  timestamp: string;
  personaId: PersonaId;
  personaName: string;
  institutionId: InstitutionId;
  institutionName: string;
  role: string;
  action: string;
  objectType: 'TRADE' | 'CASE' | 'CORRESPONDENCE' | 'MESSAGE' | 'CHAT' | 'RFQ' | 'USER_ACCESS' | 'DELEGATION';
  objectId: string;
  sessionInfo: string;
  ipAddress: string;
  previousValue?: string;
  newValue?: string;
  approvalRef?: string;
  outcome: 'SUCCESS' | 'BLOCKED_LIMIT_EXCEEDED' | 'PENDING_CHECKER';
  tamperProofHash: string;
}

// 10. DELEGATED AUTHORITY
export interface DelegatedAuthority {
  id: string;
  delegatorPersonaId: PersonaId;
  delegatorName: string;
  delegatorRole: string;
  delegateePersonaId: PersonaId;
  delegateeName: string;
  delegateeRole: string;
  scope: 'CORRESPONDENCE_AUTHORIZER' | 'TRADE_SUPERVISOR_APPROVAL' | 'OPERATIONS_SIGN_OFF';
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
  reason: string;
}

// 11. SENSITIVE ACCESS APPROVAL (Maker-Checker)
export interface SensitiveAccessRequest {
  id: string;
  institutionId: InstitutionId;
  targetPersonaId: PersonaId;
  targetPersonaName: string;
  changeType: 'INCREASE_TRADE_LIMIT' | 'GRANT_AUTHORIZER_ROLE' | 'ENABLE_TREASURY_ACCESS' | 'REACTIVATE_USER';
  requestedBy: string;
  requestedAt: string;
  details: string;
  status: 'PENDING_CHECKER' | 'APPROVED' | 'REJECTED';
  checkerName?: string;
  checkerReviewedAt?: string;
  comment?: string;
}

export interface MarketQuote {
  instrument: string;
  name: string;
  category: 'FIXED_INCOME' | 'FX' | 'MONEY_MARKET' | 'TREASURY_BILLS';
  bidYield: number;
  offerYield: number;
  bidPrice?: number;
  offerPrice?: number;
  volumeNgn: string;
  changePercent: number;
  lastUpdated: string;
  tenor: string;
  coupon?: number;
  maturityDate: string;
}
