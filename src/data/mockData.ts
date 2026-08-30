import {
  Institution,
  Persona,
  ChatMessage,
  ChatThread,
  FormalMessage,
  OfficialCorrespondence,
  InstitutionalCase,
  RFQRequest,
  TradeTicket,
  NoticeItem,
  DataSubmissionItem,
  AuditLogItem,
  DelegatedAuthority,
  SensitiveAccessRequest,
  MarketQuote
} from '../types/institution';

export const INITIAL_PERSONAS: Record<string, Persona> = {
  // MERIDIAN BANK PERSONAS
  tunde_adebayo: {
    id: 'tunde_adebayo',
    name: 'Tunde Adebayo',
    title: 'Senior Treasury Dealer',
    department: 'Treasury',
    team: 'Fixed Income & FX',
    institutionId: 'MERIDIAN_BANK',
    institutionName: 'Meridian Bank Plc',
    email: 'tunde.adebayo@meridianbank.ng',
    avatarInitials: 'TA',
    roleType: 'DEALER',
    tradeLimitNgn: 2000000000, // ₦2.0 Billion limit
    canTrade: true,
    canAuthorizeCorrespondence: false,
    canApproveTrades: false,
    canManageUsers: false,
    allowedServices: ['home', 'chat', 'inbox', 'directory', 'markets', 'rfqs', 'tickets', 'blotter', 'settlement', 'cases', 'correspondence', 'notices', 'reports', 'security', 'scenarios']
  },
  ada_okafor: {
    id: 'ada_okafor',
    name: 'Ada Okafor',
    title: 'Head of Treasury / Supervisor',
    department: 'Treasury',
    team: 'Treasury Supervision',
    institutionId: 'MERIDIAN_BANK',
    institutionName: 'Meridian Bank Plc',
    email: 'ada.okafor@meridianbank.ng',
    avatarInitials: 'AO',
    roleType: 'SUPERVISOR',
    tradeLimitNgn: 10000000000, // ₦10.0 Billion limit
    canTrade: true,
    canAuthorizeCorrespondence: false,
    canApproveTrades: true,
    canManageUsers: false,
    allowedServices: ['home', 'chat', 'inbox', 'directory', 'markets', 'rfqs', 'tickets', 'blotter', 'settlement', 'cases', 'correspondence', 'notices', 'reports', 'approvals', 'security', 'scenarios']
  },
  chika_eze: {
    id: 'chika_eze',
    name: 'Chika Eze',
    title: 'Senior Payments Operations Officer',
    department: 'Payments Operations',
    team: 'Payment Investigations & Reconciliation',
    institutionId: 'MERIDIAN_BANK',
    institutionName: 'Meridian Bank Plc',
    email: 'chika.eze@meridianbank.ng',
    avatarInitials: 'CE',
    roleType: 'OPERATIONS',
    canTrade: false,
    canAuthorizeCorrespondence: false,
    canApproveTrades: false,
    canManageUsers: false,
    allowedServices: ['home', 'chat', 'inbox', 'directory', 'cases', 'settlement', 'correspondence', 'notices', 'reports', 'security', 'scenarios']
  },
  ibrahim_musa: {
    id: 'ibrahim_musa',
    name: 'Ibrahim Musa',
    title: 'Government Banking Officer',
    department: 'Government Banking',
    team: 'MDA Services & Collections',
    institutionId: 'MERIDIAN_BANK',
    institutionName: 'Meridian Bank Plc',
    email: 'ibrahim.musa@meridianbank.ng',
    avatarInitials: 'IM',
    roleType: 'GOVT_OFFICER',
    canTrade: false,
    canAuthorizeCorrespondence: false,
    canApproveTrades: false,
    canManageUsers: false,
    allowedServices: ['home', 'chat', 'inbox', 'directory', 'correspondence', 'cases', 'requests', 'notices', 'reports', 'security', 'scenarios']
  },
  amina_bello: {
    id: 'amina_bello',
    name: 'Amina Bello',
    title: 'Chief Compliance & Institutional Authorizer',
    department: 'Compliance & Governance',
    team: 'Institutional Sign-off Unit',
    institutionId: 'MERIDIAN_BANK',
    institutionName: 'Meridian Bank Plc',
    email: 'amina.bello@meridianbank.ng',
    avatarInitials: 'AB',
    roleType: 'AUTHORIZER',
    canTrade: false,
    canAuthorizeCorrespondence: true,
    canApproveTrades: false,
    canManageUsers: false,
    allowedServices: ['home', 'chat', 'inbox', 'directory', 'correspondence', 'cases', 'approvals', 'notices', 'reports', 'security', 'scenarios']
  },
  meridian_admin: {
    id: 'meridian_admin',
    name: 'Meridian System Administrator',
    title: 'Enterprise Access & Security Admin',
    department: 'Administration',
    team: 'Identity & Access Governance',
    institutionId: 'MERIDIAN_BANK',
    institutionName: 'Meridian Bank Plc',
    email: 'admin@meridianbank.ng',
    avatarInitials: 'MA',
    roleType: 'ADMIN',
    canTrade: false,
    canAuthorizeCorrespondence: false,
    canApproveTrades: false,
    canManageUsers: true,
    allowedServices: ['home', 'directory', 'admin', 'approvals', 'reports', 'security', 'scenarios']
  },

  // SUMMIT BANK PERSONAS
  ngozi_umeh: {
    id: 'ngozi_umeh',
    name: 'Ngozi Umeh',
    title: 'Chief Fixed Income Dealer',
    department: 'Treasury',
    team: 'Fixed Income & Bond Trading',
    institutionId: 'SUMMIT_BANK',
    institutionName: 'Summit Bank Plc',
    email: 'ngozi.umeh@summitbank.ng',
    avatarInitials: 'NU',
    roleType: 'DEALER',
    tradeLimitNgn: 3000000000, // ₦3.0 Billion limit
    canTrade: true,
    canAuthorizeCorrespondence: false,
    canApproveTrades: false,
    canManageUsers: false,
    allowedServices: ['home', 'chat', 'inbox', 'directory', 'markets', 'rfqs', 'tickets', 'blotter', 'settlement', 'cases', 'correspondence', 'notices', 'reports', 'security', 'scenarios']
  },
  femi_adeyemi: {
    id: 'femi_adeyemi',
    name: 'Femi Adeyemi',
    title: 'Treasury Operations Lead',
    department: 'Treasury Operations',
    team: 'Trade Settlement & Confirmation',
    institutionId: 'SUMMIT_BANK',
    institutionName: 'Summit Bank Plc',
    email: 'femi.adeyemi@summitbank.ng',
    avatarInitials: 'FA',
    roleType: 'OPERATIONS',
    canTrade: false,
    canAuthorizeCorrespondence: false,
    canApproveTrades: false,
    canManageUsers: false,
    allowedServices: ['home', 'chat', 'inbox', 'directory', 'blotter', 'settlement', 'cases', 'notices', 'reports', 'security', 'scenarios']
  },
  ogechi_nwachukwu: {
    id: 'ogechi_nwachukwu',
    name: 'Ogechi Nwachukwu',
    title: 'Payments Operations Specialist',
    department: 'Payments Operations',
    team: 'Reconciliation & Clearing',
    institutionId: 'SUMMIT_BANK',
    institutionName: 'Summit Bank Plc',
    email: 'ogechi.n@summitbank.ng',
    avatarInitials: 'ON',
    roleType: 'OPERATIONS',
    canTrade: false,
    canAuthorizeCorrespondence: false,
    canApproveTrades: false,
    canManageUsers: false,
    allowedServices: ['home', 'chat', 'inbox', 'directory', 'cases', 'settlement', 'notices', 'reports', 'security', 'scenarios']
  },
  sanusi_garba: {
    id: 'sanusi_garba',
    name: 'Sanusi Garba',
    title: 'Executive Director & Institutional Signatory',
    department: 'Executive Governance',
    team: 'Mandate & Approval Board',
    institutionId: 'SUMMIT_BANK',
    institutionName: 'Summit Bank Plc',
    email: 'sanusi.garba@summitbank.ng',
    avatarInitials: 'SG',
    roleType: 'AUTHORIZER',
    canTrade: false,
    canAuthorizeCorrespondence: true,
    canApproveTrades: true,
    canManageUsers: false,
    allowedServices: ['home', 'chat', 'inbox', 'directory', 'correspondence', 'approvals', 'notices', 'reports', 'security', 'scenarios']
  },
  summit_admin: {
    id: 'summit_admin',
    name: 'Summit Bank Administrator',
    title: 'IT Security & Entitlements Admin',
    department: 'Administration',
    team: 'Access Governance',
    institutionId: 'SUMMIT_BANK',
    institutionName: 'Summit Bank Plc',
    email: 'secadmin@summitbank.ng',
    avatarInitials: 'SA',
    roleType: 'ADMIN',
    canTrade: false,
    canAuthorizeCorrespondence: false,
    canApproveTrades: false,
    canManageUsers: true,
    allowedServices: ['home', 'directory', 'admin', 'approvals', 'reports', 'security', 'scenarios']
  },

  // HORIZON MICROFINANCE BANK PERSONAS
  mary_okoye: {
    id: 'mary_okoye',
    name: 'Mary Okoye',
    title: 'Lead Operations & Clearing Officer',
    department: 'Operations',
    team: 'Payments & Settlement Reconciliation',
    institutionId: 'HORIZON_MFB',
    institutionName: 'Horizon Microfinance Bank',
    email: 'mary.okoye@horizonmfb.ng',
    avatarInitials: 'MO',
    roleType: 'OPERATIONS',
    canTrade: false,
    canAuthorizeCorrespondence: false,
    canApproveTrades: false,
    canManageUsers: false,
    allowedServices: ['home', 'chat', 'inbox', 'directory', 'cases', 'settlement', 'correspondence', 'notices', 'reports', 'security', 'scenarios']
  },
  john_danladi: {
    id: 'john_danladi',
    name: 'John Danladi',
    title: 'Head of Banking Operations & Control',
    department: 'Operations',
    team: 'Operations Supervision & Control',
    institutionId: 'HORIZON_MFB',
    institutionName: 'Horizon Microfinance Bank',
    email: 'john.danladi@horizonmfb.ng',
    avatarInitials: 'JD',
    roleType: 'SUPERVISOR',
    canTrade: false,
    canAuthorizeCorrespondence: true,
    canApproveTrades: false,
    canManageUsers: false,
    allowedServices: ['home', 'chat', 'inbox', 'directory', 'cases', 'settlement', 'correspondence', 'approvals', 'notices', 'reports', 'security', 'scenarios']
  },
  horizon_admin: {
    id: 'horizon_admin',
    name: 'Horizon MFB Administrator',
    title: 'IT & User Management Lead',
    department: 'Administration',
    team: 'IT Operations',
    institutionId: 'HORIZON_MFB',
    institutionName: 'Horizon Microfinance Bank',
    email: 'admin@horizonmfb.ng',
    avatarInitials: 'HA',
    roleType: 'ADMIN',
    canTrade: false,
    canAuthorizeCorrespondence: false,
    canApproveTrades: false,
    canManageUsers: true,
    allowedServices: ['home', 'directory', 'admin', 'approvals', 'reports', 'security', 'scenarios']
  },

  // FEDERAL REVENUE SERVICES AGENCY PERSONAS
  grace_mohammed: {
    id: 'grace_mohammed',
    name: 'Grace Mohammed',
    title: 'Principal Finance & Collection Officer',
    department: 'Finance & Accounts',
    team: 'Revenue Reconciliation & Banking Services',
    institutionId: 'FRSA',
    institutionName: 'Federal Revenue Services Agency',
    email: 'grace.mohammed@frsa.gov.ng',
    avatarInitials: 'GM',
    roleType: 'GOVT_OFFICER',
    canTrade: false,
    canAuthorizeCorrespondence: false,
    canApproveTrades: false,
    canManageUsers: false,
    allowedServices: ['home', 'chat', 'inbox', 'directory', 'requests', 'correspondence', 'cases', 'submissions', 'notices', 'reports', 'security', 'scenarios']
  },
  david_ekanem: {
    id: 'david_ekanem',
    name: 'David Ekanem',
    title: 'Director of Finance & Accounts',
    department: 'Office of Director General',
    team: 'Executive Financial Directorate',
    institutionId: 'FRSA',
    institutionName: 'Federal Revenue Services Agency',
    email: 'david.ekanem@frsa.gov.ng',
    avatarInitials: 'DE',
    roleType: 'DIRECTOR',
    canTrade: false,
    canAuthorizeCorrespondence: true,
    canApproveTrades: false,
    canManageUsers: false,
    allowedServices: ['home', 'chat', 'inbox', 'directory', 'requests', 'correspondence', 'cases', 'submissions', 'approvals', 'notices', 'reports', 'security', 'scenarios']
  },
  frsa_admin: {
    id: 'frsa_admin',
    name: 'FRSA Agency Administrator',
    title: 'Government Identity & Security Lead',
    department: 'Administration',
    team: 'Identity & Access Management',
    institutionId: 'FRSA',
    institutionName: 'Federal Revenue Services Agency',
    email: 'admin@frsa.gov.ng',
    avatarInitials: 'FA',
    roleType: 'ADMIN',
    canTrade: false,
    canAuthorizeCorrespondence: false,
    canApproveTrades: false,
    canManageUsers: true,
    allowedServices: ['home', 'directory', 'admin', 'approvals', 'reports', 'security', 'scenarios']
  }
};

export const INITIAL_INSTITUTIONS: Record<string, Institution> = {
  MERIDIAN_BANK: {
    id: 'MERIDIAN_BANK',
    code: 'MRD',
    legalName: 'Meridian Bank Plc',
    displayName: 'Meridian Bank',
    type: 'COMMERCIAL_BANK',
    typeLabel: 'Commercial Bank (Tier 1)',
    rcNumber: 'RC-104928',
    regulator: 'Central Bank of Nigeria (CBN)',
    officialDomain: 'meridianbank.ng',
    headquarters: 'Plot 12, Marina Financial Plaza, Marina, Lagos, Nigeria',
    verified: true,
    badge: 'Verified Commercial Bank ✓',
    colorScheme: {
      primary: 'from-blue-600 to-indigo-700',
      secondary: 'bg-blue-900/30 text-blue-400 border-blue-800',
      accent: 'text-blue-400',
      bgBadge: 'bg-blue-500/10 border-blue-500/30',
      textBadge: 'text-blue-300'
    },
    departments: [
      { name: 'Treasury', teams: ['Fixed Income', 'FX', 'Money Market', 'Treasury Operations'] },
      { name: 'Payments Operations', teams: ['Payment Investigations', 'Reconciliation', 'Settlement'] },
      { name: 'Government Banking', teams: ['MDA Services', 'Government Collections', 'Government Account Services'] },
      { name: 'Institutional Banking', teams: ['Financial Institutions', 'Correspondent Banking'] },
      { name: 'Compliance', teams: ['AML/CFT', 'Regulatory Reporting', 'Institutional Sign-off'] },
      { name: 'Administration', teams: ['Identity & Access Governance', 'System Administration'] }
    ],
    enabledServices: ['home', 'chat', 'inbox', 'directory', 'markets', 'rfqs', 'tickets', 'blotter', 'settlement', 'cases', 'correspondence', 'requests', 'notices', 'reports', 'approvals', 'admin', 'security', 'scenarios'],
    personas: [
      INITIAL_PERSONAS.tunde_adebayo,
      INITIAL_PERSONAS.ada_okafor,
      INITIAL_PERSONAS.chika_eze,
      INITIAL_PERSONAS.ibrahim_musa,
      INITIAL_PERSONAS.amina_bello,
      INITIAL_PERSONAS.meridian_admin
    ]
  },
  SUMMIT_BANK: {
    id: 'SUMMIT_BANK',
    code: 'SMT',
    legalName: 'Summit Bank Plc',
    displayName: 'Summit Bank',
    type: 'COMMERCIAL_BANK',
    typeLabel: 'Commercial Bank (Tier 1)',
    rcNumber: 'RC-209482',
    regulator: 'Central Bank of Nigeria (CBN)',
    officialDomain: 'summitbank.ng',
    headquarters: 'Tower 4, Adetokunbo Ademola Street, Victoria Island, Lagos, Nigeria',
    verified: true,
    badge: 'Verified Commercial Bank ✓',
    colorScheme: {
      primary: 'from-emerald-600 to-teal-700',
      secondary: 'bg-emerald-900/30 text-emerald-400 border-emerald-800',
      accent: 'text-emerald-400',
      bgBadge: 'bg-emerald-500/10 border-emerald-500/30',
      textBadge: 'text-emerald-300'
    },
    departments: [
      { name: 'Treasury', teams: ['Fixed Income', 'FX', 'Money Market'] },
      { name: 'Treasury Operations', teams: ['Trade Settlement & Confirmation'] },
      { name: 'Payments Operations', teams: ['Settlement', 'Reconciliation'] },
      { name: 'Compliance', teams: ['Regulatory Governance'] },
      { name: 'Executive Governance', teams: ['Mandate & Approval Board'] },
      { name: 'Administration', teams: ['Access Governance'] }
    ],
    enabledServices: ['home', 'chat', 'inbox', 'directory', 'markets', 'rfqs', 'tickets', 'blotter', 'settlement', 'cases', 'correspondence', 'notices', 'reports', 'approvals', 'admin', 'security', 'scenarios'],
    personas: [
      INITIAL_PERSONAS.ngozi_umeh,
      INITIAL_PERSONAS.femi_adeyemi,
      INITIAL_PERSONAS.ogechi_nwachukwu,
      INITIAL_PERSONAS.sanusi_garba,
      INITIAL_PERSONAS.summit_admin
    ]
  },
  HORIZON_MFB: {
    id: 'HORIZON_MFB',
    code: 'HMFB',
    legalName: 'Horizon Microfinance Bank',
    displayName: 'Horizon MFB',
    type: 'OFI_MFB',
    typeLabel: 'OFI / Microfinance Bank (National)',
    rcNumber: 'RC-589301',
    regulator: 'Central Bank of Nigeria (CBN)',
    officialDomain: 'horizonmfb.ng',
    headquarters: '28 Broad Street, Central Business District, Lagos, Nigeria',
    verified: true,
    badge: 'Verified OFI Participant ✓',
    colorScheme: {
      primary: 'from-amber-600 to-orange-700',
      secondary: 'bg-amber-900/30 text-amber-400 border-amber-800',
      accent: 'text-amber-400',
      bgBadge: 'bg-amber-500/10 border-amber-500/30',
      textBadge: 'text-amber-300'
    },
    departments: [
      { name: 'Operations', teams: ['Payments', 'Settlement', 'Reconciliation'] },
      { name: 'Finance', teams: ['Treasury & Liquidity'] },
      { name: 'Compliance', teams: ['Internal Control'] },
      { name: 'Institutional Services', teams: ['Commercial Bank Clearing Support'] },
      { name: 'Administration', teams: ['IT Operations'] }
    ],
    enabledServices: ['home', 'chat', 'inbox', 'directory', 'cases', 'settlement', 'correspondence', 'notices', 'reports', 'approvals', 'admin', 'security', 'scenarios'],
    personas: [
      INITIAL_PERSONAS.mary_okoye,
      INITIAL_PERSONAS.john_danladi,
      INITIAL_PERSONAS.horizon_admin
    ]
  },
  FRSA: {
    id: 'FRSA',
    code: 'FRSA',
    legalName: 'Federal Revenue Services Agency',
    displayName: 'Federal Revenue Services Agency (FRSA)',
    type: 'FEDERAL_MDA',
    typeLabel: 'Federal Government MDA',
    rcNumber: 'MDA-FED-0482',
    regulator: 'Federal Ministry of Finance / Presidency',
    officialDomain: 'frsa.gov.ng',
    headquarters: 'Revenue House, Constitution Avenue, Central Area, Abuja, Nigeria',
    verified: true,
    badge: 'Verified Government MDA ✓',
    colorScheme: {
      primary: 'from-purple-600 to-indigo-800',
      secondary: 'bg-purple-900/30 text-purple-400 border-purple-800',
      accent: 'text-purple-400',
      bgBadge: 'bg-purple-500/10 border-purple-500/30',
      textBadge: 'text-purple-300'
    },
    departments: [
      { name: 'Office of Director General', teams: ['Executive Financial Directorate'] },
      { name: 'Finance & Accounts', teams: ['Revenue Operations', 'Reconciliation & Banking Services'] },
      { name: 'Legal & Enforcement', teams: ['Statutory Inquiries'] },
      { name: 'Administration', teams: ['Identity & Access Management'] }
    ],
    enabledServices: ['home', 'chat', 'inbox', 'directory', 'requests', 'correspondence', 'cases', 'submissions', 'notices', 'reports', 'approvals', 'admin', 'security', 'scenarios'],
    personas: [
      INITIAL_PERSONAS.grace_mohammed,
      INITIAL_PERSONAS.david_ekanem,
      INITIAL_PERSONAS.frsa_admin
    ]
  }
};

export const INITIAL_MARKET_QUOTES: MarketQuote[] = [
  {
    instrument: 'FGN 2031 (12.40% 18-MAR-2031)',
    name: 'Federal Government of Nigeria 7-Year Benchmark Bond',
    category: 'FIXED_INCOME',
    bidYield: 18.42,
    offerYield: 18.45,
    bidPrice: 98.45,
    offerPrice: 98.32,
    volumeNgn: '₦14.2B',
    changePercent: -0.05,
    lastUpdated: '12:04:18',
    tenor: '7Y',
    coupon: 12.40,
    maturityDate: '2031-03-18'
  },
  {
    instrument: 'FGN 2037 (16.2884% 18-APR-2037)',
    name: 'Federal Government of Nigeria 13-Year Benchmark Bond',
    category: 'FIXED_INCOME',
    bidYield: 19.10,
    offerYield: 19.18,
    bidPrice: 92.15,
    offerPrice: 91.80,
    volumeNgn: '₦8.5B',
    changePercent: +0.12,
    lastUpdated: '12:02:40',
    tenor: '13Y',
    coupon: 16.2884,
    maturityDate: '2037-04-18'
  },
  {
    instrument: 'NTB 364D (12-AUG-2027)',
    name: 'Nigerian Treasury Bill 364-Day Tenor',
    category: 'TREASURY_BILLS',
    bidYield: 21.25,
    offerYield: 21.40,
    volumeNgn: '₦22.0B',
    changePercent: -0.18,
    lastUpdated: '12:05:01',
    tenor: '364D',
    maturityDate: '2027-08-12'
  },
  {
    instrument: 'USD / NGN NAFEM Spot',
    name: 'Nigerian Autonomous Foreign Exchange Market Spot',
    category: 'FX',
    bidYield: 1582.50,
    offerYield: 1585.00,
    volumeNgn: '$42.8M',
    changePercent: +0.35,
    lastUpdated: '12:05:32',
    tenor: 'SPOT (T+2)',
    maturityDate: '2026-09-01'
  },
  {
    instrument: 'CBN Open Buy Back (OBB) / Repo O/N',
    name: 'Money Market Interbank Overnight Repurchase Agreement',
    category: 'MONEY_MARKET',
    bidYield: 28.50,
    offerYield: 29.00,
    volumeNgn: '₦45.0B',
    changePercent: +0.00,
    lastUpdated: '12:03:10',
    tenor: 'O/N',
    maturityDate: '2026-08-31'
  }
];

export const INITIAL_CHAT_THREADS: ChatThread[] = [
  {
    id: 'MSC-CHAT-10382',
    title: 'Summit Bank — Fixed Income Dealing Desk',
    type: 'DIRECT',
    participantInstitutionIds: ['MERIDIAN_BANK', 'SUMMIT_BANK'],
    participantPersonaIds: ['tunde_adebayo', 'ngozi_umeh'],
    targetInstitutionId: 'SUMMIT_BANK',
    targetDepartment: 'Treasury',
    targetTeam: 'Fixed Income',
    targetPersonaId: 'ngozi_umeh',
    targetPersonaName: 'Ngozi Umeh',
    targetPersonaTitle: 'Chief Fixed Income Dealer',
    lastMessageTime: '12:01 PM',
    lastMessageText: 'Summit: 18.45 final. Meridian: Done.',
    unreadCount: { tunde_adebayo: 0, ngozi_umeh: 0 },
    sourceContext: 'Fixed Income Bilateral Negotiation (FGN 2031 ₦1.5B)',
    status: 'ACTIVE'
  },
  {
    id: 'MSC-CHAT-10383',
    title: 'Horizon MFB — Payments & Settlement Unit',
    type: 'DIRECT',
    participantInstitutionIds: ['HORIZON_MFB', 'MERIDIAN_BANK'],
    participantPersonaIds: ['mary_okoye', 'chika_eze'],
    targetInstitutionId: 'HORIZON_MFB',
    targetDepartment: 'Operations',
    targetTeam: 'Payments & Settlement Reconciliation',
    targetPersonaId: 'mary_okoye',
    targetPersonaName: 'Mary Okoye',
    targetPersonaTitle: 'Lead Operations & Clearing Officer',
    lastMessageTime: '11:42 AM',
    lastMessageText: 'Chika: Schedule received. Our team is running batch matching now.',
    unreadCount: { mary_okoye: 0, chika_eze: 1 },
    sourceContext: 'Case MSC-CASE-200284 Settlement Discrepancy Investigation',
    status: 'ACTIVE'
  },
  {
    id: 'MSC-CHAT-10384',
    title: 'FRSA — Revenue Reconciliation Unit',
    type: 'DIRECT',
    participantInstitutionIds: ['FRSA', 'MERIDIAN_BANK'],
    participantPersonaIds: ['grace_mohammed', 'ibrahim_musa'],
    targetInstitutionId: 'FRSA',
    targetDepartment: 'Finance & Accounts',
    targetTeam: 'Revenue Reconciliation & Banking Services',
    targetPersonaId: 'grace_mohammed',
    targetPersonaName: 'Grace Mohammed',
    targetPersonaTitle: 'Principal Finance & Collection Officer',
    lastMessageTime: '10:15 AM',
    lastMessageText: 'Grace: Official request FRSA/FIN/2026/0821 signed by Director Ekanem.',
    unreadCount: { grace_mohammed: 0, ibrahim_musa: 0 },
    sourceContext: 'Official Statement Request FRSA/FIN/2026/0821',
    status: 'ACTIVE'
  },
  {
    id: 'MSC-CHAT-10119',
    title: 'Summit Bank — Treasury Operations (Archived Session)',
    type: 'DIRECT',
    participantInstitutionIds: ['MERIDIAN_BANK', 'SUMMIT_BANK'],
    participantPersonaIds: ['tunde_adebayo', 'femi_adeyemi'],
    targetInstitutionId: 'SUMMIT_BANK',
    targetDepartment: 'Treasury Operations',
    targetTeam: 'Trade Settlement & Confirmation',
    targetPersonaId: 'femi_adeyemi',
    targetPersonaName: 'Femi Adeyemi',
    targetPersonaTitle: 'Treasury Operations Lead',
    lastMessageTime: 'Yesterday 16:30',
    lastMessageText: 'Femi: Settlement reference SET-91882 confirmed on RTGS.',
    unreadCount: {},
    sourceContext: 'Concluded Value-Date Settlement Alignment',
    status: 'ENDED',
    endedAt: '2026-08-29 16:45 WAT',
    endedBy: 'Femi Adeyemi'
  }
];

export const INITIAL_CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  'MSC-CHAT-10382': [
    {
      id: 'MSG-C-1',
      threadId: 'MSC-CHAT-10382',
      senderPersonaId: 'tunde_adebayo',
      senderName: 'Tunde Adebayo',
      senderInstitution: 'Meridian Bank Plc',
      senderDepartment: 'Treasury',
      timestamp: '11:58 AM',
      text: 'Good morning Ngozi. Looking for ₦1.5bn FGN 2031 (12.40% 18-MAR-2031). What is your offer?',
      classification: 'MARKET_QUOTATION'
    },
    {
      id: 'MSG-C-2',
      threadId: 'MSC-CHAT-10382',
      senderPersonaId: 'ngozi_umeh',
      senderName: 'Ngozi Umeh',
      senderInstitution: 'Summit Bank Plc',
      senderDepartment: 'Treasury',
      timestamp: '11:59 AM',
      text: 'Morning Tunde. Offer 18.42% for ₦1.5bn.',
      classification: 'MARKET_QUOTATION'
    },
    {
      id: 'MSG-C-3',
      threadId: 'MSC-CHAT-10382',
      senderPersonaId: 'tunde_adebayo',
      senderName: 'Tunde Adebayo',
      senderInstitution: 'Meridian Bank Plc',
      senderDepartment: 'Treasury',
      timestamp: '12:00 PM',
      text: 'Can you improve to 18.48% for prompt settlement T+2?',
      classification: 'MARKET_QUOTATION'
    },
    {
      id: 'MSG-C-4',
      threadId: 'MSC-CHAT-10382',
      senderPersonaId: 'ngozi_umeh',
      senderName: 'Ngozi Umeh',
      senderInstitution: 'Summit Bank Plc',
      senderDepartment: 'Treasury',
      timestamp: '12:01 PM',
      text: '18.45% final.',
      classification: 'MARKET_QUOTATION'
    },
    {
      id: 'MSG-C-5',
      threadId: 'MSC-CHAT-10382',
      senderPersonaId: 'tunde_adebayo',
      senderName: 'Tunde Adebayo',
      senderInstitution: 'Meridian Bank Plc',
      senderDepartment: 'Treasury',
      timestamp: '12:01 PM',
      text: 'Done. Creating Trade Ticket MSC-TRD-100483 now for ₦1.5bn @ 18.45%.',
      classification: 'CONFIDENTIAL',
      actionLink: {
        type: 'TRADE_TICKET',
        referenceId: 'MSC-TRD-100483',
        label: 'View Trade Ticket MSC-TRD-100483'
      }
    }
  ],
  'MSC-CHAT-10383': [
    {
      id: 'MSG-C-10',
      threadId: 'MSC-CHAT-10383',
      senderPersonaId: 'mary_okoye',
      senderName: 'Mary Okoye',
      senderInstitution: 'Horizon Microfinance Bank',
      senderDepartment: 'Operations',
      timestamp: '11:35 AM',
      text: 'Hello Chika, we have opened Case MSC-CASE-200284 regarding 146 transactions on 28 August 2026 totaling ₦38.6M with settlement difference. Please review attached schedule.',
      classification: 'CONFIDENTIAL',
      attachments: [{ name: 'Settlement_Schedule_28082026.xlsx', size: '248 KB', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }],
      actionLink: {
        type: 'CASE',
        referenceId: 'MSC-CASE-200284',
        label: 'Open Bilateral Case MSC-CASE-200284'
      }
    },
    {
      id: 'MSG-C-11',
      threadId: 'MSC-CHAT-10383',
      senderPersonaId: 'chika_eze',
      senderName: 'Chika Eze',
      senderInstitution: 'Meridian Bank Plc',
      senderDepartment: 'Payments Operations',
      timestamp: '11:42 AM',
      text: 'Thank you Mary. Case acknowledged and assigned to me. Our automated reconciliation engine is matching the 146 transaction IDs against NIBSS settlement feeds now.',
      classification: 'CONFIDENTIAL'
    }
  ],
  'MSC-CHAT-10384': [
    {
      id: 'MSG-C-20',
      threadId: 'MSC-CHAT-10384',
      senderPersonaId: 'grace_mohammed',
      senderName: 'Grace Mohammed',
      senderInstitution: 'Federal Revenue Services Agency',
      senderDepartment: 'Finance & Accounts',
      timestamp: '10:10 AM',
      text: 'Good day Ibrahim, we have transmitted Official Correspondence FRSA/FIN/2026/0821 requesting the August 2026 Collection Statement for our TSA revenue transit accounts.',
      classification: 'CONFIDENTIAL',
      actionLink: {
        type: 'CORRESPONDENCE',
        referenceId: 'FRSA/FIN/2026/0821',
        label: 'Inspect Correspondence FRSA/FIN/2026/0821'
      }
    },
    {
      id: 'MSG-C-21',
      threadId: 'MSC-CHAT-10384',
      senderPersonaId: 'ibrahim_musa',
      senderName: 'Ibrahim Musa',
      senderInstitution: 'Meridian Bank Plc',
      senderDepartment: 'Government Banking',
      timestamp: '10:15 AM',
      text: 'Received Grace. The mandate is formally logged in Government Banking Inbox. I have generated the statement and routed it to Chief Authorizer Amina Bello for digital institutional seal.',
      classification: 'CONFIDENTIAL'
    }
  ]
};

export const INITIAL_FORMAL_MESSAGES: FormalMessage[] = [
  {
    id: 'MSC-MSG-28382',
    subject: 'Interbank Settlement Position Mismatch — 28 August 2026 Cycle',
    senderPersonaId: 'mary_okoye',
    senderName: 'Mary Okoye',
    senderInstitutionId: 'HORIZON_MFB',
    senderInstitutionName: 'Horizon Microfinance Bank',
    senderTeam: 'Payments & Settlement Reconciliation',
    recipientInstitutionId: 'MERIDIAN_BANK',
    recipientInstitutionName: 'Meridian Bank Plc',
    recipientTeam: 'Payments Operations / Reconciliation',
    recipientPersonaId: 'chika_eze',
    body: 'We hereby notify Meridian Bank of an aggregate settlement discrepancy of ₦38,620,400 across 146 outward NIP transactions for value date 28 August 2026. Please acknowledge receipt and review attached schedule for bilateral position alignment.',
    priority: 'URGENT',
    classification: 'OPERATIONAL',
    responseRequired: true,
    responseDeadline: '2026-08-30 16:00 WAT',
    createdAt: '2026-08-30 09:30 WAT',
    status: 'ACKNOWLEDGED',
    targetInbox: 'TEAM',
    attachments: [
      { name: 'Settlement_Schedule_28082026.xlsx', size: '248 KB' }
    ],
    linkedCaseId: 'MSC-CASE-200284',
    replies: [
      {
        id: 'REP-1',
        senderName: 'Chika Eze',
        senderInstitution: 'Meridian Bank Plc',
        timestamp: '2026-08-30 10:12 WAT',
        body: 'Acknowledged. We have opened internal investigation batch INV-2808-MRD and converted this item to bilateral Case MSC-CASE-200284.'
      }
    ]
  },
  {
    id: 'MSC-MSG-28383',
    subject: 'Official Request for August 2026 Tax Collection Statement',
    senderPersonaId: 'grace_mohammed',
    senderName: 'Grace Mohammed',
    senderInstitutionId: 'FRSA',
    senderInstitutionName: 'Federal Revenue Services Agency',
    senderTeam: 'Revenue Reconciliation & Banking Services',
    recipientInstitutionId: 'MERIDIAN_BANK',
    recipientInstitutionName: 'Meridian Bank Plc',
    recipientTeam: 'Government Banking / MDA Services',
    recipientPersonaId: 'ibrahim_musa',
    body: 'Formal dispatch of executive mandate Ref: FRSA/FIN/2026/0821 requesting itemized collections statement for the period 1 August 2026 – 28 August 2026 on Account No: 1029384729 (FRSA Treasury Single Account Transit).',
    priority: 'HIGH_PRIORITY',
    classification: 'OFFICIAL',
    responseRequired: true,
    responseDeadline: '2026-08-31 12:00 WAT',
    createdAt: '2026-08-30 10:00 WAT',
    status: 'ACKNOWLEDGED',
    targetInbox: 'INSTITUTION',
    attachments: [
      { name: 'Request_Letter.pdf', size: '1.2 MB' }
    ]
  }
];

export const INITIAL_CORRESPONDENCE: OfficialCorrespondence[] = [
  {
    id: 'FRSA/FIN/2026/0821',
    reference: 'FRSA/FIN/2026/0821',
    subject: 'Request for August 2026 Collection Statement & Reconciliation Schedule',
    originatingInstitutionId: 'FRSA',
    originatingInstitutionName: 'Federal Revenue Services Agency',
    destinationInstitutionId: 'MERIDIAN_BANK',
    destinationInstitutionName: 'Meridian Bank Plc',
    destinationTeam: 'Government Banking / MDA Services',
    preparedBy: {
      personaId: 'grace_mohammed',
      name: 'Grace Mohammed',
      title: 'Principal Finance & Collection Officer',
      date: '2026-08-30'
    },
    authorizedBy: {
      personaId: 'david_ekanem',
      name: 'David Ekanem',
      title: 'Director of Finance & Accounts',
      date: '2026-08-30'
    },
    classification: 'OFFICIAL_REQUEST',
    status: 'ISSUED',
    effectiveDate: '2026-08-30',
    responseRequired: true,
    deadline: '2026-08-31',
    bodyMarkdown: `### FEDERAL REVENUE SERVICES AGENCY
**Office of the Director of Finance & Accounts**  
*Revenue House, Constitution Avenue, Abuja, Nigeria*

**Ref:** FRSA/FIN/2026/0821  
**Date:** 30 August 2026  

**To:**  
The Managing Director / Head of Government Banking  
Meridian Bank Plc  
Marina Financial Plaza, Lagos  

**SUBJECT: REQUEST FOR AUGUST 2026 COLLECTION STATEMENT & RECONCILIATION SCHEDULE**

Dear Sir / Madam,

1. Pursuant to the Treasury Single Account (TSA) statutory oversight mandate and Federal Revenue Collection Guidelines 2026, the Federal Revenue Services Agency (FRSA) hereby requests a certified bank statement and transaction schedule for all automated tax collections processed through Meridian Bank.

2. **Account Details:**
   - **Account Name:** FRSA Federal Tax Collection Transit Account
   - **Account Number:** 1029384729
   - **Reporting Period:** 1 August 2026 – 28 August 2026
   - **Required Format:** Certified PDF Electronic Statement with Digital Cryptographic Seal and accompanying CSV transaction log.

3. We request that this formal statement be prepared and officially transmitted through the mSecure network on or before 31 August 2026, 12:00 WAT.

Yours faithfully,

**Prepared by:** Grace Mohammed (Principal Finance Officer)  
**Authorized & Issued by:** David Ekanem (Director of Finance & Accounts)`,
    attachments: [
      { name: 'Request_Letter_FRSA_0821.pdf', size: '1.2 MB', verifiedSignature: true }
    ],
    officialResponse: {
      reference: 'MRD/GB/2026/RESP-0821',
      bodyMarkdown: `### MERIDIAN BANK PLC
**Government Banking & Institutional Services Division**  
*Marina Financial Plaza, Lagos, Nigeria*

**Ref:** MRD/GB/2026/RESP-0821  
**Date:** 30 August 2026  
**In Response to:** FRSA/FIN/2026/0821  

**To:**  
The Director of Finance & Accounts  
Federal Revenue Services Agency  
Abuja, Nigeria  

**SUBJECT: TRANSMISSION OF CERTIFIED AUGUST 2026 COLLECTION STATEMENT**

We refer to your official request FRSA/FIN/2026/0821 dated 30 August 2026.

Meridian Bank Plc hereby transmits the certified electronic statement of account and reconciliation schedule for Account No: **1029384729** for the period 1 August 2026 – 28 August 2026.

**Summary of Verified Collections:**
- Total Transactions Processed: 4,821
- Total Net Collections Remitted to TSA: ₦4,892,108,450.00
- Unreconciled Exceptions: NIL
- Status: Fully Balanced and Swept to CBN TSA

The certified document is attached with our institution's authorized cryptographic seal.`,
      preparedBy: 'Ibrahim Musa (Government Banking Officer)',
      authorizedBy: 'Amina Bello (Chief Institutional Authorizer)',
      date: '2026-08-30 11:30 WAT',
      attachmentName: 'August_Collections_Statement_Certified.pdf'
    },
    assignedToPersonaId: 'ibrahim_musa',
    assignedToName: 'Ibrahim Musa',
    auditTrail: [
      { timestamp: '09:45 WAT', actor: 'Grace Mohammed', institution: 'FRSA', action: 'Drafted official request' },
      { timestamp: '09:55 WAT', actor: 'David Ekanem', institution: 'FRSA', action: 'Approved with step-up 2FA and formally issued' },
      { timestamp: '10:00 WAT', actor: 'Network Gateway', institution: 'mSecure', action: 'Delivered to Meridian Bank Institution Inbox' },
      { timestamp: '10:15 WAT', actor: 'Ibrahim Musa', institution: 'Meridian Bank', action: 'Acknowledged and assigned to Government Banking team' },
      { timestamp: '11:20 WAT', actor: 'Ibrahim Musa', institution: 'Meridian Bank', action: 'Prepared formal response with August_Collections_Statement_Certified.pdf' },
      { timestamp: '11:30 WAT', actor: 'Amina Bello', institution: 'Meridian Bank', action: 'Approved and sealed response to FRSA' }
    ]
  }
];

export const INITIAL_CASES: InstitutionalCase[] = [
  {
    id: 'MSC-CASE-200284',
    type: 'SETTLEMENT_RECONCILIATION',
    title: 'Settlement Reconciliation Difference — NIP Outward 28-AUG-2026',
    originatingInstitutionId: 'HORIZON_MFB',
    originatingInstitutionName: 'Horizon Microfinance Bank',
    originatingPersonaId: 'mary_okoye',
    originatingPersonaName: 'Mary Okoye',
    receivingInstitutionId: 'MERIDIAN_BANK',
    receivingInstitutionName: 'Meridian Bank Plc',
    assignedTeam: 'Payments Operations / Reconciliation',
    assignedPersonaId: 'chika_eze',
    assignedPersonaName: 'Chika Eze',
    referenceNo: 'HMFB-REC-2026-0828',
    transactionReference: 'NIP/20260828/SETT/00821',
    amountNgn: 38620400,
    affectedTransactionsCount: 146,
    settlementDate: '2026-08-28',
    description: 'We have identified 146 outward transactions from Horizon MFB customers to Meridian Bank recipient accounts on 28 August 2026 that did not match our expected net settlement position. Total difference is ₦38,620,400.00.',
    priority: 'HIGH',
    slaBreachTime: '2026-08-31 17:00 WAT',
    isSlaBreached: false,
    status: 'IN_PROGRESS',
    attachments: [
      { name: 'Settlement_Schedule_28082026.xlsx', size: '248 KB', uploadedBy: 'Mary Okoye (Horizon MFB)', timestamp: '2026-08-30 09:30 WAT' },
      { name: 'Meridian_NIBSS_Clearing_Trace.pdf', size: '512 KB', uploadedBy: 'Chika Eze (Meridian Bank)', timestamp: '2026-08-30 11:15 WAT' }
    ],
    activityFeed: [
      {
        id: 'ACT-1',
        timestamp: '2026-08-30 09:30 WAT',
        actorName: 'Mary Okoye',
        actorInstitution: 'Horizon Microfinance Bank',
        action: 'Case Created & Evidence Attached',
        notes: 'Submitted settlement schedule covering 146 mismatched transaction references.',
        evidenceAttachment: 'Settlement_Schedule_28082026.xlsx'
      },
      {
        id: 'ACT-2',
        timestamp: '2026-08-30 10:12 WAT',
        actorName: 'Chika Eze',
        actorInstitution: 'Meridian Bank Plc',
        action: 'Case Acknowledged & Assigned',
        notes: 'Chika Eze accepted ownership of case in Meridian Payments Operations queue.'
      },
      {
        id: 'ACT-3',
        timestamp: '2026-08-30 11:15 WAT',
        actorName: 'Chika Eze',
        actorInstitution: 'Meridian Bank Plc',
        action: 'Investigation Completed & Evidence Uploaded',
        notes: 'Identified that 142 transactions settled during Cycle 3; 4 transactions failed NIP session timeout and were reversed to Horizon source pool on 29 August.',
        evidenceAttachment: 'Meridian_NIBSS_Clearing_Trace.pdf'
      }
    ],
    proposedResolution: {
      proposedBy: 'Chika Eze (Meridian Bank)',
      proposedDate: '2026-08-30 11:20 WAT',
      summary: '142 transactions (₦37,420,400) successfully credited in clearing cycle 3. 4 transactions (₦1,200,000) confirmed reversed by NIBSS switch back to Horizon settlement pool.',
      refundAdjustmentNgn: 1200000,
      actionPlan: 'Meridian provides clearing trace log; Horizon reconciles ledger against NIBSS reversal advice Ref #REV-99214.'
    }
  }
];

export const INITIAL_RFQS: RFQRequest[] = [
  {
    id: 'MSC-RFQ-400182',
    initiatingInstitutionId: 'MERIDIAN_BANK',
    initiatingInstitutionName: 'Meridian Bank Plc',
    initiatingDealerId: 'tunde_adebayo',
    initiatingDealerName: 'Tunde Adebayo',
    instrument: 'FGN 2031 (12.40% 18-MAR-2031)',
    category: 'FIXED_INCOME',
    side: 'BUY',
    amountNgn: 1500000000,
    tenor: '7Y',
    settlementDate: '2026-09-01',
    settlementConvention: 'T+2',
    selectedCounterparties: [
      { institutionId: 'SUMMIT_BANK', institutionName: 'Summit Bank Plc' }
    ],
    quotes: [
      {
        id: 'QTE-101',
        counterpartyInstitutionId: 'SUMMIT_BANK',
        counterpartyInstitutionName: 'Summit Bank Plc',
        dealerName: 'Ngozi Umeh',
        dealerPersonaId: 'ngozi_umeh',
        yieldRate: 18.45,
        price: 98.32,
        settlementConvention: 'T+2',
        validUntil: '2026-08-30 13:00 WAT',
        status: 'ACCEPTED'
      }
    ],
    status: 'EXECUTED_TO_TRADE',
    createdAt: '2026-08-30 11:50 WAT',
    expiresAt: '2026-08-30 13:00 WAT',
    executedTradeId: 'MSC-TRD-100483'
  }
];

export const INITIAL_TRADES: TradeTicket[] = [
  {
    id: 'MSC-TRD-100483',
    originatingChatId: 'MSC-CHAT-10382',
    originatingRfqId: 'MSC-RFQ-400182',
    buyerInstitutionId: 'MERIDIAN_BANK',
    buyerInstitutionName: 'Meridian Bank Plc',
    buyerDealerPersonaId: 'tunde_adebayo',
    buyerDealerName: 'Tunde Adebayo',
    sellerInstitutionId: 'SUMMIT_BANK',
    sellerInstitutionName: 'Summit Bank Plc',
    sellerDealerPersonaId: 'ngozi_umeh',
    sellerDealerName: 'Ngozi Umeh',
    instrument: 'FGN 2031 (12.40% 18-MAR-2031)',
    instrumentType: 'FGN_BOND',
    amountNgn: 1500000000,
    yieldRate: 18.45,
    tradeDate: '2026-08-30',
    settlementDate: '2026-09-01',
    settlementConvention: 'T+2 (CSCS / RTGS)',
    status: 'CONFIRMED',
    settlementReference: 'SET-93882',
    settlementStatus: 'ROUTED_TO_OPERATIONS',
    currentVersion: 1,
    versionHistory: [
      {
        version: 1,
        yieldRate: 18.45,
        amountNgn: 1500000000,
        settlementDate: '2026-09-01',
        modifiedAt: '2026-08-30 12:01 WAT',
        modifiedBy: 'Tunde Adebayo',
        reason: 'Initial Bilateral Trade Confirmation'
      }
    ],
    requiresSupervisorApproval: false,
    stepUpMfaVerified: true,
    auditTrail: [
      { timestamp: '12:01 WAT', actor: 'Tunde Adebayo (Meridian)', action: 'Limits check verified (₦1.5bn <= ₦2bn threshold). Trade ticket generated.' },
      { timestamp: '12:02 WAT', actor: 'Ngozi Umeh (Summit)', action: 'Counterparty electronic confirmation executed.' },
      { timestamp: '12:03 WAT', actor: 'mSecure Matching Engine', action: 'Trade status confirmed; settlement reference SET-93882 routed to Treasury Operations.' }
    ]
  },
  {
    id: 'MSC-TRD-100480',
    buyerInstitutionId: 'SUMMIT_BANK',
    buyerInstitutionName: 'Summit Bank Plc',
    buyerDealerPersonaId: 'ngozi_umeh',
    buyerDealerName: 'Ngozi Umeh',
    sellerInstitutionId: 'MERIDIAN_BANK',
    sellerInstitutionName: 'Meridian Bank Plc',
    sellerDealerPersonaId: 'tunde_adebayo',
    sellerDealerName: 'Tunde Adebayo',
    instrument: 'NTB 364D (12-AUG-2027)',
    instrumentType: 'TREASURY_BILL',
    amountNgn: 850000000,
    yieldRate: 21.30,
    tradeDate: '2026-08-29',
    settlementDate: '2026-08-30',
    settlementConvention: 'T+1 (CBN RTGS)',
    status: 'SETTLED',
    settlementReference: 'SET-93810',
    settlementStatus: 'SETTLING_TODAY',
    currentVersion: 1,
    versionHistory: [
      {
        version: 1,
        yieldRate: 21.30,
        amountNgn: 850000000,
        settlementDate: '2026-08-30',
        modifiedAt: '2026-08-29 15:10 WAT',
        modifiedBy: 'Ngozi Umeh',
        reason: 'Standard NTB Purchase'
      }
    ],
    requiresSupervisorApproval: false,
    stepUpMfaVerified: true,
    auditTrail: [
      { timestamp: '15:10 WAT (29-Aug)', actor: 'Ngozi Umeh', action: 'Trade created and matched.' },
      { timestamp: '08:30 WAT (30-Aug)', actor: 'CBN RTGS Simulator', action: 'Settlement matching verified. Cash & securities moved.' }
    ]
  }
];

export const INITIAL_NOTICES: NoticeItem[] = [
  {
    id: 'MSC-NOT-881',
    title: 'CBN Directive: Interbank Settlement Window Extensions for Month-End August 2026',
    type: 'REGULATORY',
    issuerInstitution: 'Central Bank of Nigeria (CBN)',
    issuerDepartment: 'Banking Supervision & Financial Markets Dept',
    issuedAt: '2026-08-30 08:00 WAT',
    effectiveDate: '2026-08-30',
    priority: 'CRITICAL',
    summary: 'Central Bank of Nigeria announces 60-minute extension of the RTGS / S4 interbank settlement window to 18:00 WAT today.',
    contentMarkdown: `### CENTRAL BANK OF NIGERIA
**Financial Markets Department**

**Circular Ref:** FMD/DIR/CIR/2026/0881  
**Date:** 30 August 2026  

**To:** All Deposit Money Banks, Merchant Banks, Payment Service Banks, and Other Financial Institutions (OFIs)

**SUBJECT: EXTENSION OF RTGS AND SECURITIES SETTLEMENT WINDOW FOR MONTH-END CLOSURE**

1. Please be advised that the Central Bank of Nigeria Interbank RTGS Settlement Window and S4 Securities Settlement System will remain open until **18:00 WAT** on 30 August 2026.

2. All authorized Treasury and Operations desks must ensure that all outstanding bilateral trades, NIP clearing reconciliations, and statutory liquidity sweeps are finalized within this window.

3. Strict adherence is required.`,
    requiresAcknowledgement: true,
    acknowledgedBy: ['tunde_adebayo', 'ada_okafor', 'mary_okoye', 'chika_eze'],
    targetAudience: 'ALL_INSTITUTIONS',
    attachments: [
      { name: 'CBN_Circular_Settlement_Extension.pdf', size: '420 KB' }
    ]
  },
  {
    id: 'MSC-NOT-882',
    title: 'Debt Management Office (DMO): Q3 Federal Government of Nigeria Bond Auction Schedule',
    type: 'MARKET_DIRECTIVE',
    issuerInstitution: 'Debt Management Office (DMO)',
    issuerDepartment: 'Market Operations Division',
    issuedAt: '2026-08-29 14:00 WAT',
    effectiveDate: '2026-09-01',
    priority: 'HIGH',
    summary: 'Official notification of re-opening of 7-Year and 13-Year FGN Benchmark Bonds for September 2026 auction.',
    contentMarkdown: `The Debt Management Office announces the primary issuance schedule for FGN Bonds commencing September 2026. Primary Dealer Market Makers (PDMMs) may submit bids via designated mSecure Treasury Gateways.`,
    requiresAcknowledgement: false,
    acknowledgedBy: ['tunde_adebayo', 'ngozi_umeh'],
    targetAudience: 'COMMERCIAL_BANKS'
  }
];

export const INITIAL_DATA_SUBMISSIONS: DataSubmissionItem[] = [
  {
    id: 'MSC-SUB-701',
    title: 'Monthly Electronic Tax Collections Return — August 2026',
    regulatoryBody: 'Federal Revenue Services Agency (FRSA)',
    referenceDirective: 'FRSA/TSA/REG-2026/04',
    reportingPeriod: 'August 2026',
    deadline: '2026-09-05',
    status: 'IN_PROGRESS',
    assignedToPersonaId: 'ibrahim_musa',
    preparedBy: 'Ibrahim Musa (Meridian Bank)',
    validationReport: {
      validRecords: 4821,
      flaggedAnomalies: 0,
      status: 'PASSED'
    }
  },
  {
    id: 'MSC-SUB-702',
    title: 'Quarterly OFI Micro-credit & Liquidity Return',
    regulatoryBody: 'Central Bank of Nigeria (Other Financial Institutions Dept)',
    referenceDirective: 'CBN/OFID/QR/2026/Q2',
    reportingPeriod: 'Q2 2026',
    deadline: '2026-08-31',
    status: 'SUBMITTED',
    assignedToPersonaId: 'mary_okoye',
    preparedBy: 'Mary Okoye (Horizon MFB)',
    authorizedBy: 'John Danladi (Head of Operations)',
    submittedAt: '2026-08-28 16:30 WAT',
    validationReport: {
      validRecords: 1240,
      flaggedAnomalies: 0,
      status: 'PASSED'
    }
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'AUD-901',
    timestamp: '2026-08-30 12:03 WAT',
    personaId: 'tunde_adebayo',
    personaName: 'Tunde Adebayo',
    institutionId: 'MERIDIAN_BANK',
    institutionName: 'Meridian Bank Plc',
    role: 'Treasury Dealer',
    action: 'CONFIRM_TRADE_TICKET',
    objectType: 'TRADE',
    objectId: 'MSC-TRD-100483',
    sessionInfo: 'SES-DLR-8821 (Step-up MFA Verified)',
    ipAddress: '192.168.10.45',
    previousValue: 'Status: PENDING_COUNTERPARTY_CONFIRMATION',
    newValue: 'Status: CONFIRMED (Settlement: SET-93882)',
    approvalRef: 'AUTO-RULE-TIER1',
    outcome: 'SUCCESS',
    tamperProofHash: '8f4b29c94821a8f902183cde90184b29184cba9921048bcae8841928cf019a2e'
  },
  {
    id: 'AUD-902',
    timestamp: '2026-08-30 11:30 WAT',
    personaId: 'amina_bello',
    personaName: 'Amina Bello',
    institutionId: 'MERIDIAN_BANK',
    institutionName: 'Meridian Bank Plc',
    role: 'Chief Institutional Authorizer',
    action: 'APPROVE_OFFICIAL_RESPONSE',
    objectType: 'CORRESPONDENCE',
    objectId: 'FRSA/FIN/2026/0821',
    sessionInfo: 'SES-AUTH-1092 (Hardware Token MFA)',
    ipAddress: '192.168.10.12',
    previousValue: 'Status: PENDING_AUTHORIZATION',
    newValue: 'Status: SEALED & TRANSMITTED TO FRSA',
    approvalRef: 'MANDATE-AUTH-MRD-0821',
    outcome: 'SUCCESS',
    tamperProofHash: '7a1928fce890218bca482910cde0984ba102948cefab89210948cde901842091'
  },
  {
    id: 'AUD-903',
    timestamp: '2026-08-30 10:12 WAT',
    personaId: 'chika_eze',
    personaName: 'Chika Eze',
    institutionId: 'MERIDIAN_BANK',
    institutionName: 'Meridian Bank Plc',
    role: 'Payments Operations Officer',
    action: 'ASSIGN_CASE',
    objectType: 'CASE',
    objectId: 'MSC-CASE-200284',
    sessionInfo: 'SES-OPS-4412 (Standard Session)',
    ipAddress: '192.168.10.88',
    previousValue: 'Assigned: UNASSIGNED (Payments Queue)',
    newValue: 'Assigned: Chika Eze',
    outcome: 'SUCCESS',
    tamperProofHash: '19048bacde091842bca8910248cde9018421048bcafe90184b29184cba992104'
  }
];

export const INITIAL_DELEGATIONS: DelegatedAuthority[] = [
  {
    id: 'DEL-2026-01',
    delegatorPersonaId: 'david_ekanem',
    delegatorName: 'David Ekanem',
    delegatorRole: 'Director of Finance & Accounts',
    delegateePersonaId: 'grace_mohammed',
    delegateeName: 'Grace Mohammed',
    delegateeRole: 'Principal Finance Officer',
    scope: 'CORRESPONDENCE_AUTHORIZER',
    startDate: '2026-09-03',
    endDate: '2026-09-17',
    status: 'ACTIVE',
    reason: 'Executive travel for Federal Revenue Summit Abuja. Delegation expires automatically on 17-Sep-2026.'
  }
];

export const INITIAL_SENSITIVE_REQUESTS: SensitiveAccessRequest[] = [
  {
    id: 'SAR-2026-01',
    institutionId: 'MERIDIAN_BANK',
    targetPersonaId: 'tunde_adebayo',
    targetPersonaName: 'Tunde Adebayo',
    changeType: 'INCREASE_TRADE_LIMIT',
    requestedBy: 'Meridian System Administrator (Admin A)',
    requestedAt: '2026-08-30 08:30 WAT',
    details: 'Propose permanent dealer limit adjustment from ₦2,000,000,000 to ₦5,000,000,000 based on Q3 Board Treasury mandate.',
    status: 'PENDING_CHECKER'
  }
];
