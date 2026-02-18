
import React from 'react';
import { UnblockMode } from '../types';

interface SidebarProps {
  activeMode: UnblockMode;
  onModeChange: (mode: UnblockMode) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeMode, onModeChange }) => {
  const modes = [
    { id: UnblockMode.RUBBER_DUCK, icon: 'fa-duck', label: 'Rubber Ducking', desc: 'Talk it out' },
    { id: UnblockMode.WEB_EXPLORER, icon: 'fa-globe', label: 'Web Explorer', desc: 'Real-world data' },
    { id: UnblockMode.MIND_GAMES, icon: 'fa-gamepad', label: 'Mind Games', desc: 'Lateral thinking' },
    { id: UnblockMode.IDEA_BLITZ, icon: 'fa-bolt', label: 'Idea Blitz', desc: 'Rapid brainstorming' },
    { id: UnblockMode.PERSPECTIVE_SHIFT, icon: 'fa-masks-theater', label: 'Perspective Shift', desc: 'Expert views' },
    { id: UnblockMode.ACTION_PLAN, icon: 'fa-list-check', label: 'Action Planner', desc: 'Concrete steps' },
  ];

  return (
    <aside className="w-64 glass-card border-r border-gray-800 h-full flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold gradient-text tracking-tighter">UNBLOCKER<span className="text-white">PRO</span></h1>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">Mental Engineering Hub</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${
              activeMode === mode.id 
              ? 'bg-blue-600/20 border border-blue-500/50 text-blue-400' 
              : 'hover:bg-gray-800/50 text-gray-400 hover:text-gray-200'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-colors ${
              activeMode === mode.id ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-500 group-hover:bg-gray-700'
            }`}>
              <i className={`fas ${mode.icon}`}></i>
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold">{mode.label}</div>
              <div className="text-[10px] opacity-60 uppercase">{mode.desc}</div>
            </div>
          </button>
        ))}
      </nav>

      <div className="p-6 mt-auto">
        <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
          <div className="text-xs text-blue-400 font-mono mb-2 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2"></span>
            SYSTEM ACTIVE
          </div>
          <p className="text-[10px] text-gray-500 leading-relaxed">
            Neural link established. Use modes to bypass creative bottlenecks.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
