
import React, { useState } from 'react';
import { generatePerspectives } from '../services/geminiService';
import { Perspective } from '../types';

const PerspectiveShift: React.FC = () => {
  const [problem, setProblem] = useState('');
  const [results, setResults] = useState<Perspective[]>([]);
  const [loading, setLoading] = useState(false);

  const handleShift = async () => {
    if (!problem.trim()) return;
    setLoading(true);
    try {
      const data = await generatePerspectives(problem);
      setResults(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto h-full overflow-y-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Perspective Shift</h2>
        <p className="text-gray-400">View your problem through the eyes of 3 specialized personas.</p>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-10">
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="Describe your current bottleneck or dilemma in detail..."
          className="w-full bg-transparent text-lg resize-none focus:outline-none h-32"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={handleShift}
            disabled={loading || !problem.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-10 py-3 rounded-xl shadow-lg transition-all disabled:opacity-50 flex items-center"
          >
            {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : <i className="fas fa-eye mr-2"></i>}
            SHIFT VIEW
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {results.map((p, i) => (
          <div key={i} className="flex flex-col h-full bg-gradient-to-b from-gray-800/50 to-gray-900 border border-gray-700 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 bg-indigo-600/10 border-b border-gray-700 flex items-center">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 mr-4">
                <i className="fas fa-user-secret text-xl"></i>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{p.name}</h4>
                <p className="text-[10px] text-indigo-400 uppercase tracking-widest">{p.role}</p>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-6">
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Analysis</p>
                <p className="text-sm text-gray-300 leading-relaxed italic">"{p.advice}"</p>
              </div>
              <div className="mt-auto">
                <p className="text-xs font-bold text-indigo-400 uppercase mb-2">Actionable Step</p>
                <div className="bg-gray-800/50 border border-gray-700 p-3 rounded-xl text-sm text-gray-200">
                  {p.actionableStep}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerspectiveShift;
