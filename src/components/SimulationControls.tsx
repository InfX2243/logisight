'use client';

import { Play, Pause, RotateCcw, AlertTriangle, Ship, RefreshCw, Zap } from "lucide-react";
import { api } from "../services/api";
import { useState } from "react";

interface Props {
  onRefresh: () => void;
  isAutoPlaying: boolean;
  setIsAutoPlaying: (v: boolean) => void;
}

export default function SimulationControls({ onRefresh, isAutoPlaying, setIsAutoPlaying }: Props) {
  const [loading, setLoading] = useState<string | null>(null);

  const runScenario = async (name: string) => {
    setLoading(name);
    try {
      await api.runScenario(name);
      onRefresh();
    } finally {
      setLoading(null);
    }
  };

  const reset = async () => {
    setLoading('reset');
    try {
      await api.resetSimulation();
      onRefresh();
    } finally {
      setLoading(null);
    }
  };

  const generate = async () => {
    setLoading('generate');
    try {
      await api.bulkGenerate(12);
      onRefresh();
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-[#0f1420] border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white tracking-tight flex items-center">
          <Zap className="mr-2 text-amber-500" size={16} />
          Simulation Core
        </h3>
        <div className="flex items-center space-x-1">
           <button 
             onClick={() => setIsAutoPlaying(!isAutoPlaying)}
             className={`p-1.5 rounded transition-all ${isAutoPlaying ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
             title={isAutoPlaying ? "Pause Engine" : "Resume Engine"}
           >
             {isAutoPlaying ? <Pause size={14} /> : <Play size={14} />}
           </button>
           <button 
             onClick={reset}
             className="p-1.5 bg-slate-800 text-slate-400 hover:text-white rounded transition-all"
             title="Reset Engine"
           >
             <RotateCcw size={14} className={loading === 'reset' ? 'animate-spin' : ''} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <button 
          onClick={generate}
          disabled={!!loading}
          className="w-full flex items-center justify-between px-3 py-2 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 rounded text-[11px] font-bold text-blue-400 transition-all group"
        >
          <div className="flex items-center">
            <RefreshCw size={12} className={`mr-2 ${loading === 'generate' ? 'animate-spin' : ''}`} />
            BULK_INITIALIZE_NODES
          </div>
          <span className="text-[9px] opacity-50 group-hover:opacity-100 transition-opacity">+12 Assets</span>
        </button>

        <div className="h-[1px] bg-slate-800/50 my-1"></div>

        <button 
          onClick={() => runScenario('storm')}
          disabled={!!loading}
          className="w-full flex items-center px-3 py-2 bg-slate-800/30 hover:bg-rose-500/10 border border-slate-700/50 hover:border-rose-500/30 rounded text-[11px] font-bold text-slate-400 hover:text-rose-400 transition-all"
        >
          <AlertTriangle size={12} className="mr-2" />
          TRIGGER_NETWORK_DISRUPTION
        </button>

        <button 
          onClick={() => runScenario('congestion')}
          disabled={!!loading}
          className="w-full flex items-center px-3 py-2 bg-slate-800/30 hover:bg-amber-500/10 border border-slate-700/50 hover:border-amber-500/30 rounded text-[11px] font-bold text-slate-400 hover:text-amber-400 transition-all"
        >
          <Ship size={12} className="mr-2" />
          SIMULATE_PORT_CONGESTION
        </button>

        <button 
          onClick={() => runScenario('recovery')}
          disabled={!!loading}
          className="w-full flex items-center px-3 py-2 bg-slate-800/30 hover:bg-emerald-500/10 border border-slate-700/50 hover:border-emerald-500/30 rounded text-[11px] font-bold text-slate-400 hover:text-emerald-400 transition-all"
        >
          <RefreshCw size={12} className="mr-2" />
          INITIATE_NETWORK_RECOVERY
        </button>
      </div>

      <div className="pt-2 border-t border-slate-800/50">
         <p className="text-[9px] text-slate-500 leading-tight">
           Control autonomous scenarios to test supply chain resilience. Scenarios are processed via AI Neural Core.
         </p>
      </div>
    </div>
  );
}
