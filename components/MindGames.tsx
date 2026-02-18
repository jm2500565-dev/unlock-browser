
import React, { useState } from 'react';
import { generateGamePrompt } from '../services/geminiService';
import { GamePrompt } from '../types';

const MindGames: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<GamePrompt | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const startLevel = async (type: string) => {
    setLoading(true);
    setPrompt(null);
    setIsFlipped(false);
    setActiveGame(type);
    try {
      const result = await generateGamePrompt(type);
      setPrompt(result);
      setTimeout(() => setIsFlipped(true), 100);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const games = [
    { id: 'oblique', title: 'Oblique Oracle', icon: 'fa-sparkles', color: 'from-amber-500/20 to-orange-500/20', border: 'border-orange-500/30' },
    { id: 'catalyst', title: 'Random Catalyst', icon: 'fa-shuffle', color: 'from-pink-500/20 to-rose-500/20', border: 'border-rose-500/30' },
    { id: 'reframe', title: 'Constraint Chaos', icon: 'fa-puzzle-piece', color: 'from-indigo-500/20 to-blue-500/20', border: 'border-blue-500/30' }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto h-full flex flex-col items-center">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Mind Games</h2>
        <p className="text-gray-400">Gamified lateral thinking to shock your brain out of its loop.</p>
      </div>

      {!activeGame ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => startLevel(game.id)}
              className={`p-8 rounded-3xl border ${game.border} bg-gradient-to-br ${game.color} hover:scale-105 transition-all duration-300 group text-center flex flex-col items-center space-y-4`}
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-900/50 flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform">
                <i className={`fas ${game.icon} text-white`}></i>
              </div>
              <div className="text-xl font-bold">{game.title}</div>
              <p className="text-xs text-gray-400 leading-relaxed uppercase tracking-widest font-bold">Start Game</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center">
          <button 
            onClick={() => setActiveGame(null)} 
            className="mb-8 text-gray-500 hover:text-white transition-colors flex items-center text-sm font-mono"
          >
            <i className="fas fa-arrow-left mr-2"></i> EXIT TO MENU
          </button>

          <div className="relative w-full max-w-md h-96 perspective-1000">
            <div className={`w-full h-full duration-700 preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
              {/* Front side */}
              <div className="absolute w-full h-full backface-hidden glass-card rounded-[40px] border-2 border-gray-700 flex flex-col items-center justify-center p-12 text-center shadow-2xl">
                {loading ? (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-blue-400 font-mono text-sm animate-pulse">GENERATING CATALYST...</p>
                  </div>
                ) : (
                  <>
                    <i className="fas fa-fingerprint text-6xl text-gray-700 mb-8 animate-pulse"></i>
                    <p className="text-gray-500 font-mono text-xs uppercase tracking-tighter">Ready for insight</p>
                  </>
                )}
              </div>

              {/* Back side */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180 glass-card rounded-[40px] border-2 border-blue-500/50 flex flex-col items-center justify-center p-8 text-center shadow-2xl bg-gray-900">
                {prompt && (
                  <div className="flex flex-col h-full items-center justify-center space-y-6">
                    <div className="text-blue-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-2">
                      {prompt.type}
                    </div>
                    <h3 className="text-2xl font-bold leading-tight italic text-white">
                      "{prompt.content}"
                    </h3>
                    <div className="w-12 h-px bg-gray-700"></div>
                    <p className="text-sm text-gray-400 italic">
                      {prompt.instruction}
                    </p>
                    <button 
                      onClick={() => startLevel(activeGame)}
                      className="mt-4 px-6 py-2 bg-gray-800 border border-gray-700 rounded-full text-xs hover:bg-gray-700 transition-colors"
                    >
                      <i className="fas fa-redo mr-2"></i> NEW CARD
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-12 max-w-lg text-center">
             <div className="inline-block p-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase mb-4">How to play</div>
             <p className="text-gray-400 text-sm italic">
                Don't overthink the card. Take the first association that comes to mind, no matter how weird, and try to force it onto your current problem.
             </p>
          </div>
        </div>
      )}

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default MindGames;
