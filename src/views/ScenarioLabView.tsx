import React from 'react';
import { useInstitution } from '../context/InstitutionContext';
import {
  FlaskConical,
  Play,
  ArrowRight,
  ShieldCheck,
  Ticket,
  FolderLock,
  ScrollText,
  Building2,
  CheckCircle2,
  Lock,
  Layers
} from 'lucide-react';

export const ScenarioLabView: React.FC = () => {
  const { runScenario } = useInstitution();

  return (
    <div className="p-8 space-y-8 text-slate-900 max-w-6xl mx-auto overflow-y-auto">
      {/* Hero Header */}
      <div className="bg-[#05362a] text-white rounded-3xl p-8 shadow-sm space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold rounded-full border border-emerald-400/30">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>mSecure Scenario Lab — Interactive Corridor Demonstrator</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight">
          End-to-End Institutional Network Journeys
        </h1>
        <p className="text-emerald-100/80 text-xs max-w-2xl leading-relaxed">
          Execute the 3 primary institutional corridors live across Nigerian Commercial Banks, Microfinance OFIs, and Government MDAs. Step through multi-tier approvals, authority limits, bilateral synchronization, and immutable audit trails.
        </p>
      </div>

      {/* 3 Corridor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Scenario A */}
        <div className="bg-white border border-slate-200/90 hover:border-[#05362a] rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-sm transition group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-md text-[10px] font-mono font-bold">
                SCENARIO A
              </span>
              <span className="text-slate-400 font-mono text-[10px]">Bank ↔ Bank</span>
            </div>

            <h3 className="font-bold text-base text-slate-950 group-hover:text-[#05362a] transition">
              Negotiate & Confirm a Bond Trade
            </h3>

            <div className="text-xs text-slate-600 leading-relaxed space-y-1">
              <div><strong>Institutions:</strong> Meridian Bank ↔ Summit Bank</div>
              <div><strong>Corridor:</strong> Treasury & Financial Markets</div>
              <div className="pt-2 text-[11px] text-slate-500">
                Discover → Chat → Negotiate → RFQ/Trade → Limits Check (₦2B limit vs ₦5B escalation) → Blotter → Settlement
              </div>
            </div>
          </div>

          <button
            onClick={() => runScenario('A')}
            className="w-full py-3 bg-[#05362a] hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>START SCENARIO A DEMO</span>
          </button>
        </div>

        {/* Scenario B */}
        <div className="bg-white border border-slate-200/90 hover:border-amber-600 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-sm transition group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-md text-[10px] font-mono font-bold">
                SCENARIO B
              </span>
              <span className="text-slate-400 font-mono text-[10px]">OFI → Bank</span>
            </div>

            <h3 className="font-bold text-base text-slate-950 group-hover:text-amber-800 transition">
              Resolve a Settlement Difference
            </h3>

            <div className="text-xs text-slate-600 leading-relaxed space-y-1">
              <div><strong>Institutions:</strong> Horizon MFB → Meridian Bank</div>
              <div><strong>Corridor:</strong> Operations & Settlement Reconciliation</div>
              <div className="pt-2 text-[11px] text-slate-500">
                Message/Case Ref MSC-CASE-200284 (₦38.6M / 146 txns) → Acknowledge → Assign → Evidence Schedule → Propose Resolution → Close
              </div>
            </div>
          </div>

          <button
            onClick={() => runScenario('B')}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>START SCENARIO B DEMO</span>
          </button>
        </div>

        {/* Scenario C */}
        <div className="bg-white border border-slate-200/90 hover:border-purple-600 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-sm transition group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-purple-50 text-purple-900 border border-purple-200 rounded-md text-[10px] font-mono font-bold">
                SCENARIO C
              </span>
              <span className="text-slate-400 font-mono text-[10px]">Government → Bank</span>
            </div>

            <h3 className="font-bold text-base text-slate-950 group-hover:text-purple-800 transition">
              Request Official Collection Statement
            </h3>

            <div className="text-xs text-slate-600 leading-relaxed space-y-1">
              <div><strong>Institutions:</strong> FRSA (MDA) → Meridian Bank</div>
              <div><strong>Corridor:</strong> Official Institutional Correspondence</div>
              <div className="pt-2 text-[11px] text-slate-500">
                Draft Mandate FRSA/FIN/2026/0821 → Director 2FA Approval → Bank Inbox → Statement PDF Response → Concurrence Close
              </div>
            </div>
          </div>

          <button
            onClick={() => runScenario('C')}
            className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>START SCENARIO C DEMO</span>
          </button>
        </div>
      </div>
    </div>
  );
};
