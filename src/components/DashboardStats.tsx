import { Package, AlertTriangle, Clock, Zap, Leaf } from "lucide-react";
import { Shipment, RiskResponse, PredictionResponse, RecommendationResponse } from "../services/api";

interface Props {
  shipments: Shipment[];
  risks: Record<string, RiskResponse>;
  predictions: Record<string, PredictionResponse>;
  recommendations: Record<string, RecommendationResponse>;
}

export default function DashboardStats({ shipments, risks, predictions, recommendations }: Props) {
  const stats = [
    { 
      label: 'Assets', 
      value: shipments.length, 
      icon: Package, 
      color: 'text-blue-500', 
      bg: 'bg-blue-500/10' 
    },
    { 
      label: 'High Risk', 
      value: Object.values(risks).filter(r => r?.risk_level === 'high').length, 
      icon: AlertTriangle, 
      color: 'text-rose-500', 
      bg: 'bg-rose-500/10' 
    },
    { 
      label: 'Latency', 
      value: `${Math.round(Object.values(predictions).reduce((a, b) => a + (b?.predicted_delay_minutes ?? 0), 0) / (Object.keys(predictions).length || 1))}m`, 
      icon: Clock, 
      color: 'text-amber-500', 
      bg: 'bg-amber-500/10' 
    },
    { 
      label: 'Optimal', 
      value: Object.values(recommendations).filter(r => r?.action === 'reroute').length, 
      icon: Zap, 
      color: 'text-purple-500', 
      bg: 'bg-purple-500/10' 
    },
    { 
      label: 'CO2 Saved', 
      value: `${Math.round(shipments.length * 12.4)}kg`, 
      icon: Leaf, 
      color: 'text-emerald-500', 
      bg: 'bg-emerald-500/10' 
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-[#0f1420] border border-slate-800 rounded-lg p-3 flex items-center space-x-3 min-w-0">
          <div className={`w-8 h-8 ${stat.bg} ${stat.color} rounded flex items-center justify-center shrink-0`}>
            <stat.icon size={16} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest truncate">{stat.label}</p>
            <p className="text-lg font-bold text-white truncate">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
