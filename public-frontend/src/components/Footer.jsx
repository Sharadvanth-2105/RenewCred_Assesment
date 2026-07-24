import React from 'react';
import { CreditCard, Shield, Lock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              <span className="font-display font-bold text-lg text-white">RenewCred</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Automated, dynamic credit card renewal engine powered by real-time risk assessment, mathematical APR compounding, and headless content architecture.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase text-slate-300 tracking-wider mb-3">Security & Compliance</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center space-x-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>PCI-DSS Compliant</span>
              </li>
              <li className="flex items-center space-x-2">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-bit Encryption</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase text-slate-300 tracking-wider mb-3">Admin Portal</h4>
            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs text-emerald-400 hover:underline"
            >
              Access CMS Dashboard →
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} RenewCred Inc. All rights reserved.</p>
          <p>Built for RenewCred Frontend Engineering Assessment</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
