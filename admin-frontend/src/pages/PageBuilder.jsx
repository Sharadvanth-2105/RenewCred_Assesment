import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchPageById, savePage, clearCurrentPage, clearMessages } from '../store/contentSlice';
import BlockEditor from '../components/BlockEditor';
import { ArrowLeft, Save, Globe, Sparkles } from 'lucide-react';

const PageBuilder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentPage, loading, error, successMessage } = useSelector((state) => state.content);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchPageById(id));
    } else {
      dispatch(clearCurrentPage());
      setTitle('');
      setSlug('');
      setDescription('');
      setIsPublished(true);
      setBlocks([
        {
          id: 'block-init-1',
          type: 'header',
          level: 'h1',
          order: 1,
          data: { text: 'Welcome to RenewCred Smart Features', level: 'h1' }
        },
        {
          id: 'block-init-2',
          type: 'paragraph',
          order: 2,
          data: { text: 'RenewCred optimizes your credit cards and automatic renewal limits in real-time.' }
        }
      ]);
    }
    return () => {
      dispatch(clearMessages());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (currentPage && id) {
      setTitle(currentPage.title || '');
      setSlug(currentPage.slug || '');
      setDescription(currentPage.description || '');
      setIsPublished(currentPage.isPublished !== undefined ? currentPage.isPublished : true);
      setBlocks(currentPage.blocks || []);
    }
  }, [currentPage, id]);

  const handleTitleChange = (val) => {
    setTitle(val);
    if (!id && !slug) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const pageData = {
      title,
      slug,
      description,
      isPublished,
      blocks
    };

    dispatch(savePage({ id, pageData })).then((res) => {
      if (!res.error) {
        navigate('/');
      }
    });
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <Link
            to="/"
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-100">
              {id ? `Edit Page: ${title}` : 'Create New Page'}
            </h1>
            <p className="text-xs text-slate-400">Build modular structured block content dynamically</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-emerald-900/20 transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'Saving Page...' : 'Save & Publish'}</span>
        </button>
      </div>

      {error && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs">
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
            <h2 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2">Page Meta Settings</h2>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Page Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                placeholder="e.g. Credit Card Renewal Guide"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Slug Route URL</label>
              <div className="flex items-center space-x-1 bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2">
                <span className="text-xs text-slate-500 font-mono">/</span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-transparent text-xs text-emerald-400 font-mono focus:outline-none"
                  placeholder="card-renewal-guide"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                placeholder="Brief meta description of this page..."
              />
            </div>

            <div className="pt-2 border-t border-slate-800">
              <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-0"
                />
                <span>Publish immediately to Public Frontend</span>
              </label>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-semibold text-slate-200">Content Block Studio</h2>
              </div>
              <span className="text-xs text-slate-500">{blocks.length} blocks constructed</span>
            </div>

            <BlockEditor blocks={blocks} onChange={setBlocks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBuilder;
