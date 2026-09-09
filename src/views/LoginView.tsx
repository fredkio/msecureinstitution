import React, { useState } from 'react';
import { useInstitution } from '../context/InstitutionContext';
import {
  ShieldCheck,
  Lock,
  Mail,
  KeyRound,
  ArrowRight,
  CheckCircle2,
  Building2,
  Globe,
  Radio,
  Sparkles,
  Shield,
  Clock,
  Eye,
  FileCheck
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const { loginWithOtp } = useInstitution();

  const [email, setEmail] = useState('david.obembe@cbn.gov.ng');
  const [otp, setOtp] = useState('999999');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Please enter a valid institutional email address.');
      return;
    }
    if (!otp.trim() || otp.length < 6) {
      setErrorMsg('Please enter a 6-digit OTP code.');
      return;
    }

    const success = loginWithOtp(email, otp);
    if (!success) {
      setErrorMsg('Invalid OTP code. Please use demo OTP 999999.');
    }
  };

  const handleQuickLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setOtp('999999');
    loginWithOtp(demoEmail, '999999');
  };

  return (
    <div className="min-h-screen w-full bg-[#021812] text-white flex flex-col justify-between p-8 relative overflow-hidden select-none font-sans">
      {/* Background African Continent Digital Mesh Network Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 bg-cover bg-center mix-blend-screen"
        style={{
          backgroundImage: `radial-gradient(circle at 35% 45%, rgba(0, 135, 81, 0.4) 0%, transparent 60%), radial-gradient(circle at 75% 75%, rgba(4, 120, 87, 0.3) 0%, transparent 50%)`
        }}
      />

      {/* Top Header Branding */}
      <header className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center font-extrabold text-emerald-400 shadow-inner">
            <Shield className="w-6 h-6 text-[#008751]" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-tight">NSMessages</h1>
            <p className="text-[11px] text-emerald-400 font-semibold tracking-wide">
              Sovereign Payment Messaging Infrastructure
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 rounded-full text-xs font-mono font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>REGULATED MESSAGE ORCHESTRATION</span>
        </div>
      </header>

      {/* Main Grid: Left Marketing & Sovereign Vision vs Right OTP Login Card */}
      <main className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto w-full my-auto py-8">
        {/* Left Column: Vision & Trust Badges */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              Secure <br />
              <span className="text-[#008751] drop-shadow-md">NSMessages</span>
            </h2>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              For banks, corporates, and regulators coordinating secure ISO 20022 message exchange to enable payments, trade and economic growth across Africa.
            </p>
          </div>

          {/* Feature Badges */}
          <div className="grid grid-cols-2 gap-3 max-w-lg text-xs font-semibold text-emerald-200">
            <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-xl flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#008751]" />
              <span>Policy-controlled messaging</span>
            </div>

            <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-xl flex items-center gap-2.5">
              <FileCheck className="w-4 h-4 text-[#008751]" />
              <span>ISO 20022 aligned</span>
            </div>

            <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-xl flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-[#008751]" />
              <span>Bank-grade controls</span>
            </div>

            <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-xl flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-[#008751]" />
              <span>Supports trade & commerce</span>
            </div>
          </div>

          {/* African Multilingual Slogans */}
          <div className="p-4 bg-emerald-950/20 border border-emerald-900/30 rounded-2xl max-w-lg text-xs space-y-1 text-emerald-300 font-medium">
            <div><strong className="text-white">Payments</strong> for a stronger Africa</div>
            <div className="text-slate-400">Des paiements pour une Afrique plus forte</div>
            <div className="text-slate-400">مدفوعات من أجل أفريقيا أقوى</div>
          </div>
        </div>

        {/* Right Column: Glassmorphism Login Card */}
        <div className="lg:col-span-5">
          <div className="bg-[#041d16]/90 border border-emerald-500/20 rounded-3xl p-8 shadow-2xl backdrop-blur-md space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center font-bold text-emerald-400 mx-auto shadow-inner">
                <Lock className="w-6 h-6 text-[#008751]" />
              </div>
              <h3 className="text-xl font-extrabold text-white">Access your workspace</h3>
              <p className="text-slate-300 text-xs">
                Sign in to manage institutional messages, approvals, and service relationships.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {errorMsg && (
                <div className="p-3 bg-rose-950/80 border border-rose-800/60 rounded-xl text-rose-300 font-semibold text-center">
                  {errorMsg}
                </div>
              )}

              {/* Email Address */}
              <div>
                <label className="block text-emerald-300 font-bold mb-1.5">Institutional Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@institution.gov.ng or .com"
                    className="w-full bg-slate-900/90 border border-emerald-800/60 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#008751] font-medium"
                  />
                </div>
              </div>

              {/* 6-Digit OTP */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-emerald-300 font-bold">6-Digit Security OTP</label>
                  <span className="text-[10px] text-emerald-400 font-mono">Demo OTP: 999999</span>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="999999"
                    className="w-full bg-slate-900/90 border border-emerald-800/60 rounded-xl pl-10 pr-4 py-2.5 text-white font-mono font-bold text-center tracking-widest focus:outline-none focus:border-[#008751]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#008751] hover:bg-[#006e42] text-white font-bold rounded-xl shadow-lg transition transform active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 text-xs"
              >
                <span>Sign In to NSMessages →</span>
              </button>
            </form>

            {/* Demo Quick Selector */}
            <div className="pt-4 border-t border-emerald-900/40 space-y-2">
              <div className="text-[10px] text-slate-400 uppercase font-mono font-bold text-center">
                Or Quick Switch Persona (Demo One-Click)
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('david.obembe@cbn.gov.ng')}
                  className="p-2 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/40 rounded-xl text-left transition cursor-pointer"
                >
                  <div className="font-bold text-white truncate">Central Bank (CBN)</div>
                  <div className="text-[10px] text-slate-400 truncate">David Obembe</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('tunde.adebayo@meridianbank.com')}
                  className="p-2 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/40 rounded-xl text-left transition cursor-pointer"
                >
                  <div className="font-bold text-white truncate">Meridian Bank</div>
                  <div className="text-[10px] text-slate-400 truncate">Tunde Adebayo</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('ngozi.umeh@summitbank.com')}
                  className="p-2 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/40 rounded-xl text-left transition cursor-pointer"
                >
                  <div className="font-bold text-white truncate">Summit Bank</div>
                  <div className="text-[10px] text-slate-400 truncate">Ngozi Umeh</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('grace.ekanem@frsa.gov.ng')}
                  className="p-2 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/40 rounded-xl text-left transition cursor-pointer"
                >
                  <div className="font-bold text-white truncate">FIRS / Revenue</div>
                  <div className="text-[10px] text-slate-400 truncate">Grace Ekanem</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Metrics Security Bar */}
      <footer className="relative z-10 pt-4 border-t border-emerald-950/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center space-x-6 font-semibold">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>24/7 Availability</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>4-eye Authorization</span>
          </div>

          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Audit Coverage</span>
          </div>
        </div>

        <div className="text-[11px] font-mono text-emerald-500/80">
          Stronger Africa. Safer Payments. Greater Opportunities.
        </div>
      </footer>
    </div>
  );
};
