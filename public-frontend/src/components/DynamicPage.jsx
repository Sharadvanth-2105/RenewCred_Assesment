import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchPageBySlug, clearCurrentPage } from '../store/contentSlice';
import HeroBanner from './HeroBanner';
import BlockRenderer from './BlockRenderer';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

const DynamicPage = ({ defaultSlug }) => {
  const { slug } = useParams();
  const targetSlug = slug || defaultSlug || 'home';
  const dispatch = useDispatch();

  const { currentPage, loading, error } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchPageBySlug(targetSlug));
    return () => {
      dispatch(clearCurrentPage());
    };
  }, [targetSlug, dispatch]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-slate-400 font-medium">Fetching dynamic content from API...</p>
        </div>
      </div>
    );
  }

  if (error || !currentPage) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="inline-flex p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-400">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-100">Page Content Not Found</h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          The requested page <code className="text-emerald-400 font-mono">/{targetSlug}</code> is not published or does not exist in the CMS database.
        </p>
        <div>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-xl border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <HeroBanner pageTitle={currentPage.title} pageDescription={currentPage.description} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-6 sm:p-10 backdrop-blur-sm shadow-2xl">
          <BlockRenderer blocks={currentPage.blocks} />
        </div>
      </main>
    </div>
  );
};

export default DynamicPage;
