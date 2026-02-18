
import React, { useState } from 'react';
import { generateIdeaBlitz } from '../services/geminiService';
import { Idea } from '../types';

const IdeaBlitz: React.FC = () => {
  const [query, setQuery] = useState('');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);

  const handleBlitz = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const results = await generateIdeaBlitz(query);
      setIdeas(results);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto h-full flex flex-col">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Idea Blitz</h2>
        <p className="text-gray-400">Flood your brain with 10 unconventional solutions in seconds.</p>
      </div>

      <div className="flex space-x-3 mb-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you need ideas for? (e.g. 'A unique app for gardeners')"
          className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleBlitz}
          disabled={loading || !query.trim()}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all disabled:opacity-50 flex items-center"
        >
          {loading ? (
            <i className="fas fa-circle-notch fa-spin mr-2"></i>
          ) : (
            <i className="fas fa-bolt mr-2"></i>
          )}
          BLITZ
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto pb-8">
        {ideas.map((idea, idx) => (
          <div key={idx} className="glass-card p-6 rounded-2xl hover:border-purple-500/50 transition-colors group">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-purple-400 group-hover:text-purple-300 transition-colors">{idea.title}</h3>
              <div className="bg-gray-800 text-[10px] px-2 py-1 rounded font-mono border border-gray-700">
                FEASIBILITY: {idea.feasibility}/10
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{idea.description}</p>
          </div>
        ))}
        {ideas.length === 0 && !loading && (
          <div className="col-span-2 py-20 text-center border-2 border-dashed border-gray-800 rounded-3xl opacity-50">
            <i className="fas fa-brain text-5xl mb-4"></i>
            <p>Your blitz results will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeaBlitz;
