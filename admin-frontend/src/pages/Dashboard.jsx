import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPages, deletePage, clearMessages } from '../store/contentSlice';
import { Plus, Edit, Trash2, Globe, FileText, Layers, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { pages, loading, error, successMessage } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchPages());
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch]);

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete the page "${title}"?`)) {
      dispatch(deletePage(id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Content Management Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">Manage pages, block content, tables, and mathematical formulas in real-time</p>
        </div>

        <Link
          to="/pages/new"
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-emerald-900/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Page</span>
        </Link>
      </div>

      {successMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs">
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Total Dynamic Pages</span>
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-slate-100">{pages.length}</p>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Active Content Blocks</span>
            <Layers className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-slate-100">
            {pages.reduce((acc, p) => acc + (p.blocks ? p.blocks.length : 0), 0)}
          </p>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Status</span>
            <Globe className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-emerald-400">Live API Integrated</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-200">Site Pages Directory</h2>
          <span className="text-xs text-slate-500">{pages.length} records</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">Loading page contents...</div>
        ) : pages.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <p className="text-sm text-slate-400">No pages found in database.</p>
            <Link to="/pages/new" className="text-xs text-emerald-400 hover:underline">
              Create your first dynamic page →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/50 text-slate-400 uppercase font-medium border-b border-slate-800">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Slug Route</th>
                  <th className="p-4">Blocks</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {pages.map((page) => (
                  <tr key={page._id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-semibold text-slate-100">{page.title}</td>
                    <td className="p-4 font-mono text-emerald-400">/{page.slug}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {page.blocks ? page.blocks.length : 0} blocks
                      </span>
                    </td>
                    <td className="p-4">
                      {page.isPublished ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium text-[10px] border border-emerald-500/20">
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-medium text-[10px] border border-amber-500/20">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <a
                        href={`http://localhost:3000/page/${page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-slate-100 hover:bg-slate-700 transition-colors"
                        title="View Public Page"
                      >
                        <Globe className="w-3.5 h-3.5" />
                      </a>
                      <Link
                        to={`/pages/edit/${page._id}`}
                        className="inline-flex items-center p-1.5 rounded-lg bg-slate-800 text-emerald-400 hover:bg-slate-700 transition-colors"
                        title="Edit Page"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(page._id, page.title)}
                        className="inline-flex items-center p-1.5 rounded-lg bg-slate-800 text-rose-400 hover:bg-slate-700 transition-colors"
                        title="Delete Page"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
