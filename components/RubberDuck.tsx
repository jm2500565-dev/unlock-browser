
import React, { useState, useRef, useEffect } from 'react';
import { startRubberDuckSession } from '../services/geminiService';
import { Message } from '../types';

const RubberDuck: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I'm your professional rubber duck. I'm here to listen. What's currently blocking your progress? Talk me through it." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      if (!chatRef.current) {
        chatRef.current = startRubberDuckSession("User is a developer/creative feeling stuck.");
      }

      const result = await chatRef.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: result.text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I lost my train of thought. Can you say that again?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              msg.role === 'user' 
              ? 'bg-blue-600 text-white rounded-br-none' 
              : 'bg-gray-800/80 border border-gray-700 text-gray-200 rounded-bl-none'
            }`}>
              {msg.role === 'model' && (
                <div className="flex items-center mb-2 text-blue-400 text-[10px] font-bold tracking-widest uppercase">
                  <i className="fas fa-duck mr-2"></i> RUBBER DUCK
                </div>
              )}
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800/80 border border-gray-700 p-4 rounded-2xl rounded-bl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-gray-800 bg-gray-900/30">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe the knot in your logic..."
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-12"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 p-2 text-blue-500 hover:text-blue-400 disabled:opacity-50 transition-colors"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-500 mt-2 italic">
          Tip: Explaining things out loud (or in text) forces your brain to organize the structure of the problem.
        </p>
      </div>
    </div>
  );
};

export default RubberDuck;
