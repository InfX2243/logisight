'use client';

import { useState, useEffect } from "react";
import { api, Shipment, RiskResponse, PredictionResponse, RecommendationResponse } from "../services/api";
import DashboardStats from "./DashboardStats";
import DashboardCharts from "./DashboardCharts";
import ShipmentTable from "./ShipmentTable";
import CreateShipmentModal from "./CreateShipmentModal";
import SimulationControls from "./SimulationControls";
import DigitalTwinMap from "./DigitalTwinMap";
import AIChatAssistant from "./AIChatAssistant";
import { Loader2, Plus, LayoutDashboard, Database, Shield, Settings, User, Bell, Search, Menu } from "lucide-react";

export default function DashboardClient() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [risks, setRisks] = useState<Record<string, RiskResponse>>({});
  const [predictions, setPredictions] = useState<Record<string, PredictionResponse>>({});
  const [recommendations, setRecommendations] = useState<Record<string, RecommendationResponse>>({});
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const loadDashboard = async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    try {
      const ships = await api.getShipments();
      setShipments(ships);
      
      const riskMap: Record<string, RiskResponse> = {};
      const predMap: Record<string, PredictionResponse> = {};
      const recMap: Record<string, RecommendationResponse> = {};
      
      await Promise.all(ships.map(async (shipment) => {
        try {
          const [r, p, rec] = await Promise.all([
            api.getRisk(shipment.id).catch(() => null),
            api.getPrediction(shipment.id).catch(() => null),
            api.getRecommendation(shipment.id).catch(() => null),
          ]);
          if (r) riskMap[shipment.id] = r;
          if (p) predMap[shipment.id] = p;
          if (rec) recMap[shipment.id] = rec;
        } catch (err) {}
      }));
      
      setRisks(riskMap);
      setPredictions(predMap);
      setRecommendations(recMap);
    } catch (e) {
      console.error("API error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { loadDashboard(); }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(async () => {
        try {
          await api.simulate();
          await loadDashboard(true);
        } catch (e) { setIsAutoPlaying(false); }
      }, 4000); 
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  if (loading) {
    return (
      <div className="flex h-screen bg-[#0b0f19] items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0b0f19] text-slate-300 font-sans overflow-hidden">
      
      {/* Sidebar - Fixed width, no shrinking */}
      <aside className="w-64 border-r border-slate-800 bg-[#0f1420] flex flex-col shrink-0 hidden lg:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Database size={20} className="text-blue-500 mr-3" />
          <span className="font-bold text-white text-lg tracking-tight">LogiSight</span>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {[
            { icon: LayoutDashboard, label: 'Overview', active: true },
            { icon: Database, label: 'Shipments', active: false },
            { icon: Shield, label: 'Risk Intelligence', active: false },
            { icon: Settings, label: 'Settings', active: false },
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${item.active ? 'bg-blue-600/10 text-blue-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}>
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center p-2 rounded-lg bg-slate-900/50">
            <div className="w-8 h-8 rounded-full bg-slate-800 mr-3"></div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">Administrator</p>
              <p className="text-[10px] text-slate-500 truncate">logisight-ops-01</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area - Flex-1 and min-w-0 to prevent overflow */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header */}
        <header className="h-16 border-b border-slate-800 bg-[#0b0f19] flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center space-x-4">
            <button className="lg:hidden p-2 text-slate-400"><Menu size={20} /></button>
            <div className="relative w-64 hidden md:block">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="w-full bg-slate-900/50 border border-slate-800 rounded-md py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:border-blue-500/50"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {refreshing && <Loader2 className="animate-spin text-blue-500" size={14} />}
            <Bell size={18} className="text-slate-500 hover:text-white cursor-pointer" />
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-md text-xs font-bold transition-shadow shadow-lg shadow-blue-600/10"
            >
              New Shipment
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Intelligence Dashboard</h2>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Real-time Network Analysis</p>
            </div>
            <div className="flex items-center space-x-2 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded border border-emerald-500/20 w-fit">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Simulation Engine: Operational
            </div>
          </div>

          {/* Stats Bar - Ensure wrap on mobile */}
          <DashboardStats shipments={shipments} risks={risks} predictions={predictions} recommendations={recommendations} />

          {/* Map and Side Controls Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 min-w-0">
               <DigitalTwinMap shipments={shipments} />
            </div>
            <div className="flex flex-col space-y-6">
               <SimulationControls 
                 onRefresh={() => loadDashboard(true)} 
                 isAutoPlaying={isAutoPlaying} 
                 setIsAutoPlaying={setIsAutoPlaying} 
               />
               <DashboardCharts risks={risks} predictions={predictions} />
            </div>
          </div>

          {/* Table Container - Essential for overflow management */}
          <div className="bg-[#0f1420] border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">Active Transit Ledger</h3>
              <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 font-bold">NODE_COUNT: {shipments.length}</span>
            </div>
            <div className="overflow-x-auto">
              <ShipmentTable 
                shipments={shipments} 
                risks={risks} 
                predictions={predictions} 
                recommendations={recommendations} 
                onDelete={(id) => api.deleteShipment(id).then(() => loadDashboard(true))}
              />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="h-12 px-6 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 shrink-0">
          <p>&copy; 2026 LogiSight AI Engineering</p>
          <div className="flex space-x-4">
            <span>v1.0.4-stable</span>
            <span className="text-emerald-500">Latency: 24ms</span>
          </div>
        </footer>

        <CreateShipmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={() => loadDashboard(true)} />
        <AIChatAssistant />
      </div>
    </div>
  );
}
