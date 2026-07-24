import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { fetchPublicPages } from '../store/contentSlice';
import { CreditCard, Lock, Sparkles } from 'lucide-react';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pages } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchPublicPages());
  }, [dispatch]);

  const publishedPages = pages.filter((p) => p.isPublished);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-xl flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <CreditCard className="w-5 h-5 font-bold" />
          </div>
          <div>
            <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              RenewCred
            </span>
            <span className="block text-[10px] uppercase font-semibold text-emerald-400 tracking-wider">
              Smart Credit Systems
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/60">
          <Link
            to="/"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              location.pathname === '/'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Home
          </Link>

          {publishedPages.map((page) => (
            <Link
              key={page._id}
              to={`/page/${page.slug}`}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                location.pathname === `/page/${page.slug}`
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {page.title.length > 22 ? `${page.title.substring(0, 20)}...` : page.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-800 hover:border-slate-700 transition-all"
          >
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Admin CMS</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
