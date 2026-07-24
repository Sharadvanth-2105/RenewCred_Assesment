import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { LogOut, Shield, ExternalLink } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  return (
    <header className="bg-slate-900 border-b border-slate-800 h-16 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-center text-emerald-400">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <span className="font-bold text-lg text-slate-100 tracking-tight">RenewCred</span>
          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20">Admin CMS</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors bg-slate-800/80 px-3 py-1.5 rounded-md border border-slate-700"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <div className="h-4 w-px bg-slate-800"></div>

        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-slate-200">{user?.username || 'Administrator'}</p>
            <p className="text-[10px] text-slate-400">{user?.email || 'admin@renewcred.com'}</p>
          </div>

          <button
            onClick={() => dispatch(logout())}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 border border-slate-700 transition-all"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
