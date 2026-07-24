import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Award } from 'lucide-react';

const HeroBanner = ({ pageTitle, pageDescription }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950 border-b border-slate-900">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>Dynamic CMS Powered Content</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {pageTitle || 'Smart Credit Card Renewals Made Seamless'}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {pageDescription || 'Automate credit limits, calculate reward yields in real-time, and manage account transitions with zero payment friction.'}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Instant Card Rollover</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>5.0% Cashback Tier Engine</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
