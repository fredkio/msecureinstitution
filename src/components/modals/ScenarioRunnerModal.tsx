import React from 'react';
import { useInstitution } from '../../context/InstitutionContext';
import {
  FlaskConical,
  Play,
  ArrowRight,
  CheckCircle,
  X,
  RotateCcw,
  Sparkles,
  Building2,
  UserCheck
} from 'lucide-react';

export const ScenarioRunnerModal: React.FC = () => {
  const {
    isScenarioLabOpen,
    setIsScenarioLabOpen,
    activeScenarioId,
    currentScenarioStepIndex,
    scenarioSteps,
    runScenario,
    advanceScenarioStep,
    resetScenario,
    activeInstitution,
    activePersona
  } = useInstitution();

  if (!isScenarioLabOpen) return null;

  const currentStep = scenarioSteps[currentScenarioStepIndex];

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden select-none animate-in fade-in slide-in-from-bottom-5 duration-200">
      {/* Top Banner */}
      <div className="bg-[#05362a] text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FlaskConical className="w-4 h-4 text-emerald-300" />
          <span className="font-extrabold text-xs tracking-tight">mSecure Scenario Lab</span>
        </div>
        <button
          onClick={() => setIsScenarioLabOpen(false)}
          className="text-emerald-300 hover:text-white p-1 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Active Step Runner */}
      {currentStep ? (
        <div className="p-5 space-y-4 text-xs text-slate-800">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span className="font-bold text-[#05362a]">SCENARIO {currentStep.scenarioId}</span>
            <span>Step {currentStep.stepNumber} of {currentStep.totalSteps}</span>
          </div>

          <div>
            <h4 className="font-extrabold text-sm text-slate-950">{currentStep.title}</h4>
            <p className="text-slate-600 text-xs mt-1 leading-relaxed">{currentStep.instruction}</p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1 text-[11px]">
            <div className="text-slate-500 font-bold uppercase font-mono text-[10px]">Active Perspective</div>
            <div className="font-bold text-slate-900">{activeInstitution.displayName}</div>
            <div className="text-slate-600">{activePersona.name} ({activePersona.title})</div>
          </div>

          <div className="flex space-x-2 pt-1">
            <button
              onClick={resetScenario}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold cursor-pointer"
            >
              Exit
            </button>
            <button
              onClick={advanceScenarioStep}
              className="flex-1 py-2 bg-[#05362a] hover:bg-emerald-900 text-white font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{currentStep.suggestedActionLabel || 'Advance Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Scenario Selection Menu */
        <div className="p-5 space-y-3 text-xs">
          <div className="text-slate-500 font-semibold">Select an institutional corridor to simulate:</div>

          <button
            onClick={() => runScenario('A')}
            className="w-full p-3 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 rounded-2xl text-left transition cursor-pointer space-y-1"
          >
            <div className="font-bold text-slate-900 flex justify-between">
              <span>Scenario A (Bank ↔ Bank)</span>
              <span className="font-mono text-emerald-800 text-[10px]">Bond Trade</span>
            </div>
            <div className="text-[11px] text-slate-500">Negotiate, confirm trade, ₦2B limit check, and amendment diff</div>
          </button>

          <button
            onClick={() => runScenario('B')}
            className="w-full p-3 bg-slate-50 hover:bg-amber-50/50 border border-slate-200/80 rounded-2xl text-left transition cursor-pointer space-y-1"
          >
            <div className="font-bold text-slate-900 flex justify-between">
              <span>Scenario B (OFI → Bank)</span>
              <span className="font-mono text-amber-800 text-[10px]">Case Recon</span>
            </div>
            <div className="text-[11px] text-slate-500">146 txns dispute (₦38.6M) with evidence schedule & resolution</div>
          </button>

          <button
            onClick={() => runScenario('C')}
            className="w-full p-3 bg-slate-50 hover:bg-purple-50/50 border border-slate-200/80 rounded-2xl text-left transition cursor-pointer space-y-1"
          >
            <div className="font-bold text-slate-900 flex justify-between">
              <span>Scenario C (Govt → Bank)</span>
              <span className="font-mono text-purple-800 text-[10px]">Collection Mandate</span>
            </div>
            <div className="text-[11px] text-slate-500">FRSA tax statement request, Director 2FA signature & bank response</div>
          </button>
        </div>
      )}
    </div>
  );
};
