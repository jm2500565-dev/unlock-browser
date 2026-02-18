
import React, { useState } from 'react';
import { generateWebInsights } from '../services/geminiService';
import { WebInsight } from '../types';

const WebExplorer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<WebInsight | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await generateWebInsights(query);
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto h-full flex flex-col">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Web Explorer</h2>
        <p className="text-gray-400">Scour the web for real-world intelligence and external solutions.</p>
      </div>

      <div className="flex space-x-3 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for context, inspiration, or technical documentation..."
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 pl-12 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all disabled:opacity-50 flex items-center"
        >
          {loading ? (
            <i className="fas fa-circle-notch fa-spin mr-2"></i>
          ) : (
            <i className="fas fa-satellite mr-2"></i>
          )}
          EXPLORE
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-10 space-y-8">
        {result && (
          <>
            <div className="glass-card p-8 rounded-3xl border-cyan-500/20">
              <div className="flex items-center mb-6 text-cyan-400 text-xs font-bold tracking-widest uppercase">
                <i className="fas fa-brain mr-2"></i> AI SYNTHESIS
              </div>
              <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
                {result.text}
              </div>
            </div>

            {result.sources.length > 0 && (
              <div>
                <div className="flex items-center mb-4 text-gray-500 text-xs font-bold tracking-widest uppercase">
                  <i className="fas fa-link mr-2"></i> Grounding Sources
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.sources.map((source, i) => (
                    <a
                      key={i}
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800/50 border border-gray-700 hover:border-cyan-500/50 p-4 rounded-xl transition-all group"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-semibold text-gray-200 line-clamp-2 group-hover:text-cyan-400">
                          {source.title}
                        </span>
                        <i className="fas fa-external-link-alt text-[10px] text-gray-500 mt-1"></i>
                      </div>
                      <div className="text-[10px] text-gray-500 mt-2 truncate font-mono">
                        {new URL(source.uri).hostname}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {!result && !loading && (
          <div className="py-20 text-center border-2 border-dashed border-gray-800 rounded-3xl opacity-30">
            <i className="fas fa-globe-americas text-7xl mb-4"></i>
            <p className="text-xl">Discover real-world context to break your loop</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebExplorer;
