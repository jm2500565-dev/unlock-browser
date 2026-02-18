
import React, { useState } from 'react';
import Sidebar from './components/Sidebar.tsx';
import RubberDuck from './components/RubberDuck.tsx';
import IdeaBlitz from './components/IdeaBlitz.tsx';
import PerspectiveShift from './components/PerspectiveShift.tsx';
import ActionPlan from './components/ActionPlan.tsx';
import WebExplorer from './components/WebExplorer.tsx';
import MindGames from './components/MindGames.tsx';
import { UnblockMode } from './types.ts';

const App: React.FC = () => {
  const [activeMode, setActiveMode] = useState<UnblockMode>(UnblockMode.RUBBER_DUCK);

  const renderContent = () => {
    switch (activeMode) {
      case UnblockMode.RUBBER_DUCK:
        return <RubberDuck />;
      case UnblockMode.IDEA_BLITZ:
        return <IdeaBlitz />;
      case UnblockMode.PERSPECTIVE_SHIFT:
        return <PerspectiveShift />;
      case UnblockMode.ACTION_PLAN:
        return <ActionPlan />;
      case UnblockMode.WEB_EXPLORER:
        return <WebExplorer />;
      case UnblockMode.MIND_GAMES:
        return <MindGames />;
      default:
        return <RubberDuck />;
    }
  };

  return (
    <div className="flex h-screen bg-[#030712] text-gray-100 overflow-hidden">
      <Sidebar activeMode={activeMode} onModeChange={setActiveMode} />
      
      <main className="flex-1 flex flex-col relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>
        
        {/* Header Bar */}
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-gray-900/20 backdrop-blur-sm z-10">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 font-mono tracking-widest uppercase">Target Mode:</span>
            <span className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-[10px] font-bold text-blue-400 uppercase">
              {activeMode.replace('_', ' ')}
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-2 text-[10px] text-gray-500 font-mono">
              <i className="fas fa-microchip"></i>
              <span>GEMINI_V3_LINK_STABLE</span>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors">
              <i className="fas fa-gear"></i>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 relative z-0">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
