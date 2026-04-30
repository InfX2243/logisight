'use client';

import { Shipment } from "../services/api";
import { Globe, Activity } from "lucide-react";

interface Props {
  shipments: Shipment[];
}

export default function DigitalTwinMap({ shipments }: Props) {
  const getPosition = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x, y };
  };

  return (
    <div className="bg-[#0f1420] border border-slate-800 rounded-xl p-5 relative overflow-hidden h-[450px] flex flex-col">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center tracking-tight">
            <Globe className="mr-2 text-blue-500" size={16} />
            Digital Twin Network
          </h3>
        </div>
        <div className="flex items-center space-x-3">
           <div className="flex items-center text-[9px] font-bold text-slate-500">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 shadow-[0_0_8px_rgba(16,185,129,0.3)]"></span>
              Healthy
           </div>
           <div className="flex items-center text-[9px] font-bold text-slate-500">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mr-1.5 shadow-[0_0_8px_rgba(244,63,94,0.3)]"></span>
              Disrupted
           </div>
        </div>
      </div>

      <div className="relative flex-1 rounded-lg bg-slate-900/40 border border-slate-800/50 overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(circle, #475569 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        {/* World Outline Placeholder */}
        <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" viewBox="0 0 800 400" preserveAspectRatio="none">
           <path d="M50,150 Q200,100 400,200 T750,150" fill="none" stroke="currentColor" strokeWidth="1" />
           <path d="M100,300 Q300,250 500,350 T700,300" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* Dynamic Nodes */}
        {shipments.map((shipment) => {
          const { x, y } = getPosition(shipment.current_location.latitude, shipment.current_location.longitude);
          const isDelayed = shipment.status === 'delayed';
          
          return (
            <div 
              key={shipment.id}
              className="absolute transition-all duration-1000 ease-in-out group"
              style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div className={`absolute inset-0 rounded-full animate-ping opacity-10 ${isDelayed ? 'bg-rose-500' : 'bg-blue-500'}`}></div>
              <div className={`w-2 h-2 rounded-full border border-white/20 shadow-lg ${isDelayed ? 'bg-rose-500' : 'bg-blue-500'}`}></div>
              
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="bg-[#0f1420] border border-slate-800 rounded px-2 py-1 shadow-2xl whitespace-nowrap">
                  <p className="text-[9px] font-bold text-white uppercase">{shipment.id}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/50 flex items-center justify-between shrink-0">
         <div className="flex items-center text-[9px] font-bold text-slate-500">
            <Activity size={12} className="text-blue-500 mr-1.5" />
            <span>GEO-SPATIAL TELEMETRY STREAM</span>
         </div>
         <span className="text-[9px] font-bold text-slate-600 italic">Nodes Active: {shipments.length}</span>
      </div>
    </div>
  );
}
