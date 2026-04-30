import { Shipment, RiskResponse, PredictionResponse, RecommendationResponse } from "../services/api";
import ShipmentRow from "./ShipmentRow";

interface Props {
  shipments: Shipment[];
  risks: Record<string, RiskResponse>;
  predictions: Record<string, PredictionResponse>;
  recommendations: Record<string, RecommendationResponse>;
  onDelete: (id: string) => void;
}

export default function ShipmentTable({ shipments, risks, predictions, recommendations, onDelete }: Props) {
  if (shipments.length === 0) {
    return (
      <div className="p-20 text-center flex flex-col items-center justify-center bg-slate-900/20">
        <h3 className="text-xl font-bold text-slate-400">No active assets detected.</h3>
        <p className="text-slate-600 text-sm mt-2">Initialize the simulation engine to begin tracking.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[1000px]">
        <thead>
          <tr className="bg-slate-900 border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <th className="px-6 py-4">ID / Origin</th>
            <th className="px-6 py-4">Destination / ETA</th>
            <th className="px-6 py-4">Current Sector</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Risk Profile</th>
            <th className="px-6 py-4">AI Prediction</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50">
          {shipments.map(shipment => (
            <ShipmentRow 
              key={shipment.id} 
              shipment={shipment} 
              risk={risks[shipment.id]}
              prediction={predictions[shipment.id]}
              recommendation={recommendations[shipment.id]}
              onDelete={() => onDelete(shipment.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
