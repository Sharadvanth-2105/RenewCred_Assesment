import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { Quote, Sigma, Table as TableIcon } from 'lucide-react';

const BlockRenderer = ({ blocks = [] }) => {
  const sortedBlocks = [...blocks].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="space-y-8">
      {sortedBlocks.map((block) => {
        const key = block.id || block._id || Math.random().toString();

        switch (block.type) {
          case 'header':
            const level = block.data?.level || 'h2';
            if (level === 'h1') {
              return (
                <h1 key={key} className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white border-b border-slate-800 pb-3 mt-8">
                  {block.data?.text}
                </h1>
              );
            } else if (level === 'h3') {
              return (
                <h3 key={key} className="font-display text-xl font-bold text-slate-200 mt-6">
                  {block.data?.text}
                </h3>
              );
            }
            return (
              <h2 key={key} className="font-display text-2xl font-bold text-slate-100 mt-8 mb-3 flex items-center space-x-2">
                <span className="w-2 h-6 bg-emerald-500 rounded-full inline-block"></span>
                <span>{block.data?.text}</span>
              </h2>
            );

          case 'paragraph':
            return (
              <p key={key} className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {block.data?.text}
              </p>
            );

          case 'list':
            const isNumbered = block.data?.style === 'numbered';
            const items = block.data?.items || [];
            return (
              <div key={key} className="my-4 p-5 bg-slate-900/60 rounded-2xl border border-slate-800/80">
                {isNumbered ? (
                  <ol className="list-decimal list-inside space-y-2.5 text-sm text-slate-300">
                    {items.map((item, idx) => (
                      <li key={idx} className="pl-1 leading-relaxed">
                        <span className="font-medium text-slate-200">{item}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <ul className="space-y-2.5 text-sm text-slate-300">
                    {items.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );

          case 'equation':
            const { equation, displayMode, caption } = block.data || {};
            return (
              <div key={key} className="my-6 p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 rounded-2xl border border-emerald-500/20 shadow-xl overflow-x-auto">
                <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 mb-3 uppercase tracking-wider">
                  <Sigma className="w-4 h-4" />
                  <span>Mathematical Notation</span>
                </div>
                <div className="text-emerald-300 text-lg py-2">
                  {equation ? (
                    displayMode !== false ? (
                      <BlockMath math={equation} />
                    ) : (
                      <InlineMath math={equation} />
                    )
                  ) : (
                    <span className="text-xs text-slate-500">Empty formula</span>
                  )}
                </div>
                {caption && (
                  <p className="mt-3 text-xs text-slate-400 border-t border-slate-800/80 pt-2 italic">
                    {caption}
                  </p>
                )}
              </div>
            );

          case 'table':
            const headers = block.data?.headers || [];
            const rows = block.data?.rows || [];
            return (
              <div key={key} className="my-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 shadow-xl">
                <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center space-x-2">
                  <TableIcon className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-semibold text-slate-300">Structured Data Table</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-800/60 text-slate-300 font-semibold border-b border-slate-800">
                        {headers.map((h, idx) => (
                          <th key={idx} className="p-3.5 sm:p-4">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-800/30 transition-colors">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3.5 sm:p-4 text-slate-300 font-normal">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );

          case 'quote':
            return (
              <blockquote key={key} className="my-6 p-6 bg-slate-900/90 rounded-2xl border-l-4 border-emerald-500 relative space-y-2">
                <Quote className="w-8 h-8 text-emerald-500/20 absolute top-4 right-4" />
                <p className="text-sm sm:text-base italic text-slate-200 leading-relaxed font-serif">
                  "{block.data?.text}"
                </p>
                {block.data?.author && (
                  <cite className="block text-xs font-sans font-semibold text-emerald-400 not-italic">
                    — {block.data.author}
                  </cite>
                )}
              </blockquote>
            );

          default:
            return (
              <div key={key} className="p-3 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs rounded-xl">
                Unrecognized content block type: {block.type}
              </div>
            );
        }
      })}
    </div>
  );
};

export default BlockRenderer;
