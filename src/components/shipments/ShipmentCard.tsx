import StatusBadge from "@/components/shared/StatusBadge";
import RiskBadge from "@/components/shared/RiskBadge";
import type { Shipment } from "@/services/api";

export default function ShipmentCard({ shipment, onSelect }: { shipment: Shipment; onSelect: () => void }) {
  return <button onClick={onSelect} className="panel p-3 text-left"><div className="flex items-center justify-between"><p className="text-sm font-medium">{shipment.id}</p><StatusBadge status={shipment.status} /></div><p className="mt-2 text-xs text-slate-500">{shipment.origin} {" -> "} {shipment.destination}</p><div className="mt-3"><RiskBadge score={shipment.risk_score} /></div></button>;
}
