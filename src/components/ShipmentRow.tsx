import { Shipment, RiskResponse, PredictionResponse, RecommendationResponse } from "../services/api";
import { Trash2, AlertTriangle, CheckCircle2, Clock, MapPin, ArrowRight } from "lucide-react";

interface Props {
  shipment: Shipment;
  risk?: RiskResponse;
  prediction?: PredictionResponse;
  recommendation?: RecommendationResponse;
  onDelete: () => void;
}

export default function ShipmentRow({ shipment, risk, prediction, recommendation, onDelete }: Props) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delayed": return <span className="flex items-center text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded text-[10px] font-bold border border-rose-400/20"><Clock size={10} className="mr-1" /> DELAYED</span>;
      case "delivered": return <span className="flex items-center text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-400/20"><CheckCircle2 size={10} className="mr-1" /> DELIVERED</span>;
      default: return <span className="flex items-center text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-400/20">IN TRANSIT</span>;
    }
  };

  const getRiskColor = (level?: string) => {
    if (level === 'high') return "text-rose-400";
    if (level === 'medium') return "text-amber-400";
    return "text-emerald-400";
  };

  return (
    <tr className="hover:bg-slate-800/30 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-white mb-0.5">{shipment.id}</span>
          <span className="text-[10px] text-slate-500 flex items-center"><MapPin size={8} className="mr-1" /> {shipment.origin}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-300 mb-0.5">{shipment.destination}</span>
          <span className="text-[10px] text-slate-500 font-medium">ETA: {new Date(shipment.eta).toLocaleDateString()}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-medium">
           <span>{shipment.current_location.latitude.toFixed(2)}</span>
           <ArrowRight size={10} className="text-slate-700" />
           <span>{shipment.current_location.longitude.toFixed(2)}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        {getStatusBadge(shipment.status)}
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className={`text-xs font-bold ${getRiskColor(risk?.risk_level)}`}>
            {risk?.risk_score ?? "-"} / 100
          </span>
          <span className="text-[9px] text-slate-500 uppercase font-black">{risk?.risk_level ?? "calculating..."}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col max-w-[180px]">
          <span className="text-xs font-semibold text-slate-200 truncate">
            {prediction ? (prediction.predicted_delay_minutes > 0 ? `+${prediction.predicted_delay_minutes}m delay predicted` : "On schedule") : "Analyzing..."}
          </span>
          <span className="text-[9px] text-slate-500 leading-tight mt-0.5 line-clamp-1">{prediction?.reason}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <button 
          onClick={onDelete}
          className="p-2 text-slate-600 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={14} />
        </button>
      </td>
    </tr>
  );
}
