import React from 'react';
import { Trash2, ArrowUp, ArrowDown, Plus, Heading, AlignLeft, List, Table, Sigma, Quote } from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';

const BlockEditor = ({ blocks, onChange }) => {
  const addBlock = (type) => {
    const newBlockId = `block-${Date.now()}`;
    let initialData = {};

    switch (type) {
      case 'header':
        initialData = { text: 'New Section Header', level: 'h2' };
        break;
      case 'paragraph':
        initialData = { text: 'Enter detailed paragraph text here...' };
        break;
      case 'list':
        initialData = { style: 'bullet', items: ['First list item', 'Second list item'] };
        break;
      case 'table':
        initialData = {
          headers: ['Column 1', 'Column 2', 'Column 3'],
          rows: [
            ['Data 1', 'Data 2', 'Data 3'],
            ['Data 4', 'Data 5', 'Data 6']
          ]
        };
        break;
      case 'equation':
        initialData = { equation: 'E = mc^2', displayMode: true, caption: 'Energy equivalence formula' };
        break;
      case 'quote':
        initialData = { text: 'Enter inspirational or key highlight quote here.', author: 'Source Reference' };
        break;
      default:
        initialData = { text: '' };
    }

    const newBlock = {
      id: newBlockId,
      type,
      data: initialData,
      order: blocks.length + 1
    };

    onChange([...blocks, newBlock]);
  };

  const removeBlock = (index) => {
    const updated = blocks.filter((_, i) => i !== index);
    onChange(updated.map((b, idx) => ({ ...b, order: idx + 1 })));
  };

  const moveBlock = (index, direction) => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === blocks.length - 1)) {
      return;
    }
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...blocks];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange(updated.map((b, idx) => ({ ...b, order: idx + 1 })));
  };

  const updateBlockData = (index, key, value) => {
    const updated = [...blocks];
    updated[index] = {
      ...updated[index],
      data: {
        ...updated[index].data,
        [key]: value
      }
    };
    onChange(updated);
  };

  const updateListItem = (blockIndex, itemIndex, value) => {
    const updated = [...blocks];
    const items = [...updated[blockIndex].data.items];
    items[itemIndex] = value;
    updated[blockIndex] = {
      ...updated[blockIndex],
      data: { ...updated[blockIndex].data, items }
    };
    onChange(updated);
  };

  const addListItem = (blockIndex) => {
    const updated = [...blocks];
    const items = [...updated[blockIndex].data.items, 'New item'];
    updated[blockIndex] = {
      ...updated[blockIndex],
      data: { ...updated[blockIndex].data, items }
    };
    onChange(updated);
  };

  const removeListItem = (blockIndex, itemIndex) => {
    const updated = [...blocks];
    const items = updated[blockIndex].data.items.filter((_, idx) => idx !== itemIndex);
    updated[blockIndex] = {
      ...updated[blockIndex],
      data: { ...updated[blockIndex].data, items }
    };
    onChange(updated);
  };

  const updateTableCell = (blockIndex, rowIndex, colIndex, value) => {
    const updated = [...blocks];
    const rows = updated[blockIndex].data.rows.map((row, rIdx) => {
      if (rIdx === rowIndex) {
        const newRow = [...row];
        newRow[colIndex] = value;
        return newRow;
      }
      return row;
    });
    updated[blockIndex] = {
      ...updated[blockIndex],
      data: { ...updated[blockIndex].data, rows }
    };
    onChange(updated);
  };

  const updateTableHeader = (blockIndex, colIndex, value) => {
    const updated = [...blocks];
    const headers = [...updated[blockIndex].data.headers];
    headers[colIndex] = value;
    updated[blockIndex] = {
      ...updated[blockIndex],
      data: { ...updated[blockIndex].data, headers }
    };
    onChange(updated);
  };

  const addTableRow = (blockIndex) => {
    const updated = [...blocks];
    const colCount = updated[blockIndex].data.headers.length;
    const newRow = new Array(colCount).fill('Sample Cell');
    const rows = [...updated[blockIndex].data.rows, newRow];
    updated[blockIndex] = {
      ...updated[blockIndex],
      data: { ...updated[blockIndex].data, rows }
    };
    onChange(updated);
  };

  const removeTableRow = (blockIndex, rowIndex) => {
    const updated = [...blocks];
    const rows = updated[blockIndex].data.rows.filter((_, idx) => idx !== rowIndex);
    updated[blockIndex] = {
      ...updated[blockIndex],
      data: { ...updated[blockIndex].data, rows }
    };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 p-3 bg-slate-800/80 rounded-xl border border-slate-700/80">
        <span className="text-xs text-slate-400 self-center font-medium mr-2">Add Content Block:</span>
        <button
          type="button"
          onClick={() => addBlock('header')}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-xs font-medium text-slate-200 rounded-lg transition-colors"
        >
          <Heading className="w-3.5 h-3.5 text-blue-400" />
          <span>Header</span>
        </button>

        <button
          type="button"
          onClick={() => addBlock('paragraph')}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-xs font-medium text-slate-200 rounded-lg transition-colors"
        >
          <AlignLeft className="w-3.5 h-3.5 text-emerald-400" />
          <span>Paragraph</span>
        </button>

        <button
          type="button"
          onClick={() => addBlock('list')}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-xs font-medium text-slate-200 rounded-lg transition-colors"
        >
          <List className="w-3.5 h-3.5 text-amber-400" />
          <span>List</span>
        </button>

        <button
          type="button"
          onClick={() => addBlock('table')}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-xs font-medium text-slate-200 rounded-lg transition-colors"
        >
          <Table className="w-3.5 h-3.5 text-purple-400" />
          <span>Table</span>
        </button>

        <button
          type="button"
          onClick={() => addBlock('equation')}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-xs font-medium text-slate-200 rounded-lg transition-colors"
        >
          <Sigma className="w-3.5 h-3.5 text-rose-400" />
          <span>Math (LaTeX)</span>
        </button>

        <button
          type="button"
          onClick={() => addBlock('quote')}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-xs font-medium text-slate-200 rounded-lg transition-colors"
        >
          <Quote className="w-3.5 h-3.5 text-cyan-400" />
          <span>Quote</span>
        </button>
      </div>

      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div
            key={block.id || index}
            className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-3 relative group"
          >
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-700 text-slate-300 uppercase tracking-wider">
                  #{index + 1} {block.type}
                </span>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => moveBlock(index, 'up')}
                  disabled={index === 0}
                  className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-30"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveBlock(index, 'down')}
                  disabled={index === blocks.length - 1}
                  className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-30"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeBlock(index)}
                  className="p-1 text-rose-400 hover:text-rose-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {block.type === 'header' && (
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-1">
                  <label className="block text-xs text-slate-400 mb-1">Level</label>
                  <select
                    value={block.data.level || 'h2'}
                    onChange={(e) => updateBlockData(index, 'level', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                  </select>
                </div>
                <div className="col-span-3">
                  <label className="block text-xs text-slate-400 mb-1">Text</label>
                  <input
                    type="text"
                    value={block.data.text || ''}
                    onChange={(e) => updateBlockData(index, 'text', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            )}

            {block.type === 'paragraph' && (
              <div>
                <label className="block text-xs text-slate-400 mb-1">Content</label>
                <textarea
                  rows={3}
                  value={block.data.text || ''}
                  onChange={(e) => updateBlockData(index, 'text', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}

            {block.type === 'list' && (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <label className="text-xs text-slate-400">List Style:</label>
                  <select
                    value={block.data.style || 'bullet'}
                    onChange={(e) => updateBlockData(index, 'style', e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200"
                  >
                    <option value="bullet">Bulleted</option>
                    <option value="numbered">Numbered</option>
                  </select>
                </div>
                <div className="space-y-2">
                  {(block.data.items || []).map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateListItem(index, itemIdx, e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeListItem(index, itemIdx)}
                        className="p-1.5 text-rose-400 hover:text-rose-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addListItem(index)}
                    className="flex items-center space-x-1 text-xs text-emerald-400 hover:text-emerald-300"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>
              </div>
            )}

            {block.type === 'equation' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">LaTeX Formula String</label>
                  <input
                    type="text"
                    value={block.data.equation || ''}
                    onChange={(e) => updateBlockData(index, 'equation', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. A = P e^{rt}"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 text-xs text-slate-400">
                    <input
                      type="checkbox"
                      checked={block.data.displayMode !== false}
                      onChange={(e) => updateBlockData(index, 'displayMode', e.target.checked)}
                      className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-0"
                    />
                    <span>Display as Centered Block</span>
                  </label>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Caption / Description</label>
                  <input
                    type="text"
                    value={block.data.caption || ''}
                    onChange={(e) => updateBlockData(index, 'caption', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
                  />
                </div>

                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
                  <p className="text-[11px] text-slate-500 mb-1 font-semibold uppercase">Live Equation Preview:</p>
                  <div className="overflow-x-auto text-emerald-300 py-1">
                    {block.data.equation ? (
                      block.data.displayMode ? (
                        <BlockMath math={block.data.equation} />
                      ) : (
                        <InlineMath math={block.data.equation} />
                      )
                    ) : (
                      <span className="text-xs text-slate-600">No formula entered</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {block.type === 'table' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Table Headers (Comma Separated)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(block.data.headers || []).map((header, hIdx) => (
                      <input
                        key={hIdx}
                        type="text"
                        value={header}
                        onChange={(e) => updateTableHeader(index, hIdx, e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs font-semibold text-slate-200"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Rows Data</label>
                  <div className="space-y-2">
                    {(block.data.rows || []).map((row, rIdx) => (
                      <div key={rIdx} className="flex items-center space-x-2">
                        <div className="grid grid-cols-3 gap-2 flex-1">
                          {row.map((cell, cIdx) => (
                            <input
                              key={cIdx}
                              type="text"
                              value={cell}
                              onChange={(e) => updateTableCell(index, rIdx, cIdx, e.target.value)}
                              className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-300"
                            />
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeTableRow(index, rIdx)}
                          className="p-1.5 text-rose-400 hover:text-rose-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => addTableRow(index)}
                    className="mt-2 flex items-center space-x-1 text-xs text-emerald-400 hover:text-emerald-300"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Row</span>
                  </button>
                </div>
              </div>
            )}

            {block.type === 'quote' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs text-slate-400 mb-1">Quote Text</label>
                  <input
                    type="text"
                    value={block.data.text || ''}
                    onChange={(e) => updateBlockData(index, 'text', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Author / Source</label>
                  <input
                    type="text"
                    value={block.data.author || ''}
                    onChange={(e) => updateBlockData(index, 'author', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        {blocks.length === 0 && (
          <div className="p-8 text-center border-2 border-dashed border-slate-800 rounded-xl">
            <p className="text-sm text-slate-400">No content blocks added yet.</p>
            <p className="text-xs text-slate-600 mt-1">Use the toolbar above to add headers, paragraphs, formulas, or tables.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockEditor;
