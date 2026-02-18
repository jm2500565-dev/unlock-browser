
import React, { useState } from 'react';
import { generateActionPlan } from '../services/geminiService';

const ActionPlan: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [steps, setSteps] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handlePlan = async () => {
    if (!goal.trim()) return;
    setLoading(true);
    try {
      const result = await generateActionPlan(goal);
      setSteps(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto h-full overflow-y-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">7-Step Deconstruction</h2>
        <p className="text-gray-400">Transform overwhelming goals into a precise execution sequence.</p>
      </div>

      <div className="flex space-x-3 mb-12">
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="State your ultimate objective clearly..."
          className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          onClick={handlePlan}
          disabled={loading || !goal.trim()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all disabled:opacity-50 flex items-center"
        >
          {loading ? <i className="fas fa-cog fa-spin mr-2"></i> : <i className="fas fa-map-location-dot mr-2"></i>}
          PLAN
        </button>
      </div>

      <div className="space-y-6">
        {steps.map((step, idx) => (
          <div key={idx} className="flex group">
            <div className="mr-6 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                {idx + 1}
              </div>
              {idx < steps.length - 1 && (
                <div className="flex-1 w-px bg-gray-800 my-2 group-hover:bg-emerald-800 transition-colors"></div>
              )}
            </div>
            <div className="flex-1 pb-10">
              <div className="bg-gray-800/40 border border-gray-700/50 p-6 rounded-2xl group-hover:border-emerald-500/30 transition-colors">
                <p className="text-lg text-gray-200 leading-relaxed font-medium">
                  {step}
                </p>
              </div>
            </div>
          </div>
        ))}
        {steps.length === 0 && !loading && (
          <div className="py-20 text-center opacity-30">
            <i className="fas fa-chess text-7xl mb-4"></i>
            <p className="text-xl">Your blueprint for success starts here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionPlan;
