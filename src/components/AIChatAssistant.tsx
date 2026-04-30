'use client';

import { useState } from "react";
import { MessageSquare, Send, Bot, X, Sparkles } from "lucide-react";

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'LogiSight AI initialized. How can I assist with your supply chain optimization today?' }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput("");
    
    // Simulated AI Response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "Analyzing real-time sensor data... I recommend prioritizing SHIP-1002 as the storm scenario has increased its delay probability to 84%. Should I initiate a reroute?" 
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/40 transition-all active:scale-95 z-[100] border-4 border-white/10 group"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-[#020617] rounded-full"></div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 w-80 panel-base shadow-2xl z-[100] flex flex-col animate-in slide-in-from-bottom-8 duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white tracking-tight">LogiSight Intelligence</h4>
                <div className="flex items-center text-[9px] font-bold text-blue-100 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
                  Self-Learning Online
                </div>
              </div>
            </div>
            <Sparkles size={16} className="text-blue-200" />
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium ${
                  m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white/5 text-slate-200 border border-white/5 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-white/[0.02] border-t border-white/[0.05] flex items-center space-x-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Query network status..."
              className="flex-1 bg-slate-950/50 border border-white/10 rounded-xl py-2 px-4 text-xs font-bold text-white focus:outline-none focus:border-blue-500/50"
            />
            <button 
              onClick={handleSend}
              className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
