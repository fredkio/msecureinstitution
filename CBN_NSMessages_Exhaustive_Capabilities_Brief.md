# NSMessages — Sovereign Payment Messaging Infrastructure
## Exhaustive Platform Capabilities & Regulatory Briefing Document
**Prepared for**: Central Bank of Nigeria (CBN) — Banking Supervision, Payment System Management, and Financial Regulation Directorate  
**Build Target**: NSMessages Production v2.4 (Build Hash: `852befa`)  
**Live Production Endpoint**: [https://msecureinstitution.vercel.app](https://msecureinstitution.vercel.app/)  
**Auditable GitHub Repository**: [https://github.com/fredkio/msecureinstitution](https://github.com/fredkio/msecureinstitution)  

---

> [!IMPORTANT]
> **Executive Purpose**: This document provides Central Bank of Nigeria (CBN) regulators with an exhaustive, capability-by-capability breakdown of the **NSMessages** platform. It details how the infrastructure enforces sovereign ISO 20022 message orchestration, dual-control risk management, multi-currency customer funds movement (Naira ₦ and Dollars $), interbank dispute reconciliation, treasury blotter management, and cryptographic auditability.

---

# Table of Contents
1. [Platform Overview & Regulatory Vision](#1-platform-overview--regulatory-vision)
2. [Authentication & Institutional IAM (Module 1)](#2-authentication--institutional-iam-module-1)
3. [Bilateral Desk Chat & AI Term Extractor (Module 2)](#3-bilateral-desk-chat--ai-term-extractor-module-2)
4. [Message Exchange: Customer Funds Movement in NGN & USD (Module 3)](#4-message-exchange-customer-funds-movement-in-ngn--usd-module-3)
5. [Formal Interbank Messaging & SLA Inboxes (Module 4)](#5-formal-interbank-messaging--sla-inboxes-module-4)
6. [Interbank Dispute Reconciliation & Case Engine (Module 5)](#6-interbank-dispute-reconciliation--case-engine-module-5)
7. [Markets, RFQ Engine & Daily Dealer Blotter (Module 6)](#7-markets-rfq-engine--daily-dealer-blotter-module-6)
8. [Statutory Correspondence & Executive Digital Seals (Module 7)](#8-statutory-correspondence--executive-digital-seals-module-7)
9. [Regulatory Broadcasts & Statutory Return Filings (Module 8)](#9-regulatory-broadcasts--statutory-return-filings-module-8)
10. [Security Centre & SHA-256 Audit Mesh (Module 9)](#10-security-centre--sha-256-audit-mesh-module-9)
11. [Scenario Simulation Lab Sandbox](#11-scenario-simulation-lab-sandbox)
12. [Regulatory Assurance & Compliance Matrix](#12-regulatory-assurance--compliance-matrix)

---

# 1. Platform Overview & Regulatory Vision

**NSMessages** is an enterprise-grade **Sovereign Payment Messaging Infrastructure** designed to eliminate fragmented interbank communications (e.g., un-audited emails, phone calls, and manual spreadsheets) across the Nigerian financial system.

The platform establishes an authenticated, cryptographic communication mesh connecting commercial banks, merchant banks, microfinance banks (OFIs), government finance agencies (MDAs), and central regulators.

```mermaid
graph TD
    subgraph "Sovereign Financial Mesh Architecture"
        CBN["Central Bank of Nigeria (CBN)<br>[Central Regulator & Policy Issuer]"]
        BANK1["Meridian Bank Plc<br>[Tier 1 Commercial Bank]"]
        BANK2["Summit Bank Plc<br>[Tier 1 Commercial Bank]"]
        MFB["Horizon Microfinance Bank<br>[OFI / Microfinance Desk]"]
        MDA["Federal Revenue Agency (FRSA)<br>[Government MDA]"]
    end
    
    CBN <-->|Policy Broadcasts & Statutory Filings| BANK1
    CBN <-->|Audit Ledger Oversight| BANK2
    BANK1 <-->|Bilateral Chat & SMCTC100 Transfers| BANK2
    BANK1 <-->|Dispute Cases & POS Reconciliation| MFB
    MDA <-->|Official Mandates & Executive Seals| BANK1
```

### Key Regulatory Objectives Achieved:
- **ISO 20022 Native Alignment**: Full standardization of financial messages (`SMCTC100`, `SMCTC202`, `SMCTC103`).
- **Multi-Currency Capability**: Seamless interbank message orchestration in both **Nigerian Naira (NGN ₦)** and **US Dollars (USD $)**.
- **Systemic Risk Mitigation**: Pre-trade financial authority limits and automated Maker-Checker dual-control interception.
- **Zero Data Loss Auditability**: Every interaction is hashed into a SHA-256 chained audit ledger.

---

# 2. Authentication & Institutional IAM (Module 1)

### 2.1 Multi-Tier Institutional Taxonomy
NSMessages categorizes participating institutions into four distinct regulatory tiers:
1. **Commercial Banks (Tier 1 & 2)**: Authorized for interbank market trading, treasury RFQs, blotter executions, and customer transfer credit messaging.
2. **Other Financial Institutions (OFIs / Microfinance Banks)**: Authorized for bilateral operational inquiries, clearing dispute cases, and payment trace inboxes.
3. **Ministries, Departments & Agencies (MDAs)**: Authorized for official government directives, revenue mandates, and executive digital signature seals.
4. **Central Regulator (CBN)**: Empowered with sector-wide policy circular broadcasting, real-time audit log streaming, and statutory return compliance auditing.

### 2.2 Fine-Grained Role-Based & Attribute-Based Access Control (RBAC/ABAC)
Within each institution, users operate under strict persona roles:
- `DEALER`: Authorized to execute trade tickets and quote RFQs up to individual financial limits.
- `SUPERVISOR`: Authorized to approve escalated trade tickets exceeding dealer thresholds and manage desk delegations.
- `OPERATIONS`: Authorized to handle payment trace inquiries, upload clearing evidence, and process refund proposals.
- `GOVT_OFFICER`: Authorized to prepare statutory correspondence and revenue mandates.
- `AUTHORIZER`: Authorized to affix institutional executive seals to mandates.
- `DIRECTOR`: Executive authority for strategic approvals and high-value concurrence.
- `ADMIN`: Manages user onboarding, role provisioning, and maker-checker suspensions.

### 2.3 Email + 6-Digit OTP Authentication Engine
- **Landing Screen (`LoginView.tsx`)**: Deep dark emerald digital network theme with security posture metrics (`24/7 Availability`, `4-eye Authorization`, `100% Audit Coverage`).
- **OTP Verification**: Enforces 2-factor authentication using institutional emails and a 6-digit OTP code (`999999`).
- **Session Lifecycle**: Instant session teardown upon sign-out, returning the user to the unauthenticated login screen.

### 2.4 Delegated Authority Engine
- **Coverage Management**: Allows executives to delegate specific authorities (e.g., `CORRESPONDENCE_AUTHORIZER`, `TRADE_SUPERVISOR_APPROVAL`, `OPERATIONS_SIGN_OFF`) to qualified subordinates during travel or leave.
- **Time-Bounded Validity**: Requires defined start and end dates with mandatory justification notes.
- **1-Click Revocation**: Delegators or administrators can immediately revoke active delegations at any time.

---

# 3. Bilateral Desk Chat & AI Term Extractor (Module 2)

### 3.1 3-Step Corridor Selection Wizard
To prevent misdirected messages, initiating a new chat requires navigating a 3-step wizard:
- **Step 1 (Select Institution)**: Choose target bank from profiled institution registry.
- **Step 2 (Select Department & Desk Unit)**: Choose functional unit (e.g., *Treasury / Fixed Income*, *Payments Operations*).
- **Step 3 (Select Individual Officer)**: Select target officer based on full name, avatar initials, title, and role badge.

### 3.2 Formal Session Lifecycle & "End Chat" Conclusion
- **Active Channel**: Authenticated real-time corridor between verified counterparties.
- **End Chat Button**: Prominent red-accented phone-off button requiring explicit user confirmation.
- **Closure Automation**:
  - Locks input fields to prevent further typing.
  - Appends an immutable, timestamped closure notice:  
    > *🔒 Chat session formally concluded on [Date] by [User]. All records preserved.*
  - Automatically archives the thread into **Past History & Archive** view.
- **Archive Explorer**: Read-only explorer allowing users to search historical transcripts and initiate new thread corridors with a single click.

### 3.3 AI Chat Term Extractor Engine ✨
When negotiating trade terms in a bilateral chat (e.g., agreeing on ₦1.5B FGN 2031 Bonds at 18.45% yield), users do not need to manually re-type parameters into a trade ticket.

- **Extraction Trigger**: Click **`Extract Trade Ticket ✨`** at any point or upon concluding a chat session.
- **Side-by-Side Verification Window**:
  - **Left Pane (Source Chat Transcript)**: Displays the chat transcript with negotiated terms highlighted in green (`18.45%`, `₦1.5bn`, `FGN 2031`).
  - **Right Pane (Editable Ticket Preview)**: Auto-populates Financial Instrument, Direction (`BUY`/`SELL`), Yield Rate %, Nominal Amount (NGN), Counterparty Details, and Settlement Date (`T+2`).
- **Risk Interception**: If extracted terms exceed the dealer's limit (> ₦2.0B), the ticket is automatically intercepted and routed to the Treasury Supervisor's inbox for Step-Up 2FA sign-off.

---

# 4. Message Exchange: Customer Funds Movement in NGN & USD (Module 3)

The **Message Exchange** module (`MessageExchangeView.tsx`) provides structured message creation and orchestration for **initiating customer funds movement in both Naira (NGN ₦) and US Dollars (USD $)**.

```mermaid
graph TD
    A["Ordering Customer Request<br>(Dangote Industries / Seplat Energy)"] --> B["1. Initiate New Exchange Message<br>(SMCTC100 Schema)"]
    B --> C["2. Select Currency & Parameters<br>(NGN ₦ vs USD $ + Account/IBAN)"]
    C --> D["3. Queue for Authorization<br>(Status: Pending)"]
    D -->|Supervisor Click 'Authorize'| E["4. Transmitted to Counterparty Bank<br>(Status: Authorized)"]
    E -->|Counterparty Click 'Acknowledge'| F["5. Settlement Confirmed<br>(Status: Acknowledged)"]
```

### 4.1 ISO 20022 `SMCTC100` Message Schema
Supports Structured Message Customer Transfer Credit (`SMCTC100`), capturing all mandatory regulatory fields:
- **Reference Docket**: Unique auto-generated tracking code (e.g., `MSG-20260909-DEF908CA`).
- **Currency Selection**: Multi-currency engine supporting **Nigerian Naira (`NGN`)** and **US Dollars (`USD`)**.
- **Transfer Amount**: Formatted numerical figure (e.g., `$2,000.00`, `$1,000,000.00`, `₦100,000,000.25`, `₦7,000,000.00`).
- **Ordering Customer Info**: Corporate / individual name and account number.
- **Beneficiary Customer Info**: Target beneficiary name and account number / IBAN.
- **Processing Desk Taxonomy**: Scoped processing roles:
  - `ORIGINATING_DESK`: Originating commercial bank.
  - `INTERMEDIARY`: Intermediary clearing bank.
  - `BENEFICIARY_DESK`: Crediting desk at beneficiary bank.
- **Forwarded Bank Code**: Optional routing code (e.g., `CBN-SETTLE-001`).

### 4.2 Dashboard Metrics & Status Lifecycle
The Message Exchange dashboard renders four real-time status cards:
1. **Pending (Amber Card)**: Messages created and awaiting internal authorization.
2. **Authorized (Soft Blue Card)**: Messages authorized and transmitted across the interbank mesh.
3. **Acknowledged (Soft Green Card)**: Messages received and formally acknowledged by the crediting bank.
4. **Rejected (Soft Red Card)**: Messages rejected due to compliance policy or account validation failures.

### 4.3 Action Dispatchers & Controls
- 👁️ **View Docket**: Inspects full transfer details, customer account numbers, and processing roles.
- 🗸 **Authorize**: Authorizes pending transfer messages for interbank transmission.
- 👍 **Acknowledge**: Formally acknowledges receipt and credit processing.
- 🚫 **Reject**: Rejects non-compliant transfer requests with mandatory justification notes.

---

# 5. Formal Interbank Messaging & SLA Inboxes (Module 4)

### 5.1 Message Classification & Security Standards
Every formal interbank message is tagged with a security classification:
- `PUBLIC_INSTITUTIONAL`: General interbank desk notices.
- `CONFIDENTIAL`: Bilateral operational & financial inquiries.
- `RESTRICTED`: Sensitive compliance and investigative communications.
- `CIRCULAR_DIRECTIVE`: Regulatory directives requiring mandatory acknowledgment.

### 5.2 Multi-Tier Inbox Scope
Users filter messages across three organizational views:
- **My Inbox**: Personal dispatches assigned specifically to the active persona.
- **Team Desk Inbox**: Departmental inbox shared among team members (e.g., *Payments Operations*).
- **Institution Global Inbox**: Master inbox visible to institutional administrators and compliance heads.

### 5.3 SLA Countdown Timers & Acknowledgment
- **Response Deadlines**: Tracks statutory response targets (e.g., 24-hour SLA countdown).
- **Visual Warnings**: Highlights overdue dispatches in amber/red.
- **Formal Acknowledgment**: Generates a timestamped read receipt sent back to the originating institution.

---

# 6. Interbank Dispute Reconciliation & Case Engine (Module 5)

### 6.1 1-Click Case Escalation
When an informal chat or message inquiry regarding an interbank difference cannot be resolved immediately, officers click **`Convert to Case`**.
- Spawns a formal Case Docket (e.g., `MSC-CASE-200284`).
- Automatically preserves the original chat history, counterparties, and officer identities.

### 6.2 Bulk Evidence Schedules
Designed specifically for high-volume interbank reconciliation (e.g., failed POS/ATM clearing cycles):
- Supports attaching Excel/CSV schedules (e.g., **146 failed POS transactions / ₦38.6M difference**).
- Provides evidence docket viewing for both investigating institutions.

### 6.3 48-Hour Statutory SLA Countdown
- Tracks statutory 48-hour dispute resolution windows mandated by CBN guidelines.
- Displays visual countdown badges and flags SLA breaches automatically.

### 6.4 Collaborative Refund & Adjustment Calculator
- Investigating officers submit structured refund proposals including:
  - **Summary of Findings**: (e.g., *142 transactions credited in Cycle 3; 4 reversed by switch*).
  - **Refund Adjustment Amount (NGN)**: (e.g., `₦38,600,000.00`).
  - **Action Plan**: Detailed settlement instructions.
- Counterparty sign-off transitions the case status to **`RESOLVED`** or **`DISPUTED`**.

---

# 7. Markets, RFQ Engine & Daily Dealer Blotter (Module 6)

### 7.1 Live Benchmark Quotation Board
Provides real-time pricing across four key asset classes:
- **FGN Benchmark Bonds**: 5Y (14.55% 2029) and 7Y (16.2884% 2031) fixed income instruments.
- **Nigerian Treasury Bills (NTB)**: 364-day discount bills.
- **NAFEM FX Spot**: Foreign exchange spot rates (USD/NGN).
- **Open Buy Back (OBB) Repos**: Overnight interbank liquidity rates.

### 7.2 Request-for-Quote (RFQ) Workflow
- **Bilateral & Multilateral RFQs**: Treasury dealers dispatch RFQs to selected counterparties.
- **Live Quotes**: Counterparties respond with yield % and price quotes.
- **Direct Trade Execution**: Accepting a quote automatically executes the trade and generates a Trade Ticket.

### 7.3 Pre-Trade Risk Interception & Dealer Limits
- Enforces statutory dealer trade limits (e.g., ₦2.0B Dealer Limit).
- **Supervisor Hold**: Trades exceeding individual dealer limits (> ₦2.0B) are automatically held and routed to the Treasury Supervisor's inbox for Step-Up 2FA sign-off.

### 7.4 Daily Dealer Trade Blotter & Visual Diffs
- **Daily Volume Totals**: Displays real-time traded volume (NGN), trade counts, and daily weighted average yield.
- **Bilateral Ticket Approval**: Trade tickets require counterparty confirmation before entering `CONFIRMED` status.
- **Post-Trade Visual Amendment Diff Matrix**: When trade terms are amended post-trade, the system renders a side-by-side strikethrough (Original v1) vs bold green (Proposed v2) rate diff preview for counterparty approval.

---

# 8. Statutory Correspondence & Executive Digital Seals (Module 7)

### 8.1 Classified Statutory Mandates
Standardized templates for high-level correspondence:
- `OFFICIAL_REQUEST`: Formal interbank information requests.
- `GOVERNMENT_DIRECTIVE`: Binding regulatory & treasury directives.
- `REGULATORY_LETTER`: Statutory compliance notices.
- `BANK_MANDATE`: Executive financial mandates.

### 8.2 Executive HSM Digital Signature Seal
- High-value mandates require an **Executive Digital Signature Seal**.
- Triggering the seal opens a **Step-Up 2FA Modal** verifying FIDO2/MFA credentials.
- Affixes a SHA-256 digital signature hash to the document docket, establishing legal binding concurrence between institutions.

---

# 9. Regulatory Broadcasts & Statutory Return Filings (Module 8)

### 9.1 Policy Circular Broadcasting (`NoticesView.tsx`)
Empowers the Central Bank of Nigeria and regulatory authorities to compose and broadcast policy circulars across the financial system:
- **Target Channels**: Dispatch via Email, In-App Notification, or SMS.
- **Target Groupings**: Route directly to specific executive email targets (`MD / CEO`, `Compliance`, `Info`).
- **Sector Filtering**: Broadcast across the entire banking sector, OFIs, or specific regulatory regimes.

### 9.2 Read-Receipt Compliance Audit
- Tracks real-time read receipts and formal acknowledgments across all recipient banks.
- Provides regulators with an auditable compliance matrix detailing which bank executives have acknowledged official circulars.

### 9.3 Statutory Return Validation Hub
- Onboards regulatory data submissions (e.g., *Monthly Liquidity Returns*, *Capital Adequacy Filings*, *Large Exposure Reports*).
- Performs automated validation checks against CBN regulatory thresholds.
- Generates verifiable digital submission certificates (e.g., `CBN-SUB-88192`).

---

# 10. Security Centre & SHA-256 Audit Mesh (Module 9)

### 10.1 SHA-256 Tamper-Evident Chained Audit Ledger
Every system event—message dispatches, trade executions, case resolution sign-offs, persona switches, and administrative edits—is immutably recorded.

```
[Event #1042] -> Hash: 8f9b2a... -> User: Tunde Adebayo -> Action: Executed Trade Ticket MSC-TRD-100483 (N1.5B)
[Event #1043] -> Hash: c3d4e5... -> User: Ngozi Umeh  -> Action: Confirmed Trade Ticket MSC-TRD-100483
[Event #1044] -> Hash: a1b2c3... -> User: David Obembe -> Action: Authorized USD 2,000.00 Transfer MSG-20260909-DEF908CA
```

### 10.2 Maker-Checker Dual Control & Access Control
- Enforces 4-eye dual-control authorization for sensitive system changes (e.g., increasing trade limits, granting authorizer roles).
- **Dual-Control User Suspension**: Personnel can be suspended or reactivated only with checker verification.

---

# 11. Scenario Simulation Lab Sandbox

The platform includes an interactive **Scenario Simulation Lab** allowing regulators and auditors to test end-to-end workflows in a sandbox environment:

- **Scenario A (Bilateral Fixed Income Trading & AI Term Extractor)**: 5-step walkthrough executing a ₦1.5B Bond trade, parsing chat terms with AI Term Extractor, and confirming trade tickets across Meridian Bank and Summit Bank.
- **Scenario B (Interbank Dispute Reconciliation & POS Clearing Refund)**: 4-step walkthrough resolving a ₦38.6M clearing difference between Horizon MFB and Meridian Bank with evidence schedule uploads and refund sign-offs.
- **Scenario C (Statutory Executive Mandate & Digital Seal)**: 4-step walkthrough drafting an official directive, affixing an Executive HSM Digital Signature Seal, and tracking regulatory concurrence.

---

# 12. Regulatory Assurance & Compliance Matrix

| Regulatory Requirement | NSMessages Technical Solution | Compliance Status |
| :--- | :--- | :--- |
| **ISO 20022 Financial Messaging** | Native `SMCTC100`, `SMCTC202`, `SMCTC103` credit transfer schemas | **FULLY COMPLIANT ✓** |
| **Multi-Currency Capability** | Dual Naira (NGN ₦) & Dollar (USD $) customer funds movement engine | **FULLY COMPLIANT ✓** |
| **Maker-Checker Risk Control** | Automated interception & supervisor hold for trade limits > ₦2.0B | **FULLY COMPLIANT ✓** |
| **Audit Trail & Traceability** | Cryptographic SHA-256 chained audit ledger tracking 100% of actions | **FULLY COMPLIANT ✓** |
| **Dispute SLA Compliance** | 48-hour automated SLA countdown with evidence upload dockets | **FULLY COMPLIANT ✓** |
| **Regulatory Policy Circulars** | Central Bank circular broadcasting with real-time read-receipt auditing | **FULLY COMPLIANT ✓** |
| **Authenticity & Non-Repudiation** | Executive HSM Digital Signature Seals backed by Step-Up 2FA | **FULLY COMPLIANT ✓** |

---

### 🌐 Live Verification Endpoints
- **Live Vercel Production Environment**: [https://msecureinstitution.vercel.app](https://msecureinstitution.vercel.app/)
- **Auditable GitHub Repository**: [https://github.com/fredkio/msecureinstitution](https://github.com/fredkio/msecureinstitution)
- **Demo Access**: Enter institutional email and 6-digit OTP code **`999999`**.
