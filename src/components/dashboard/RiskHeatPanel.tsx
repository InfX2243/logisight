import type { Shipment } from "@/services/api";

export default function RiskHeatPanel({ shipments }: { shipments: Shipment[] }) {
  const buckets = [
    { label: "Low", count: shipments.filter((s) => s.risk_score < 45).length, color: "bg-emerald-500" },
    { label: "Medium", count: shipments.filter((s) => s.risk_score >= 45 && s.risk_score < 70).length, color: "bg-amber-500" },
    { label: "High", count: shipments.filter((s) => s.risk_score >= 70).length, color: "bg-rose-500" },
  ];
  return <section className="panel p-4"><h3 className="text-sm font-medium">Risk Heat</h3><div className="mt-3 space-y-3">{buckets.map((b)=><div key={b.label}><div className="mb-1 flex justify-between text-xs text-slate-400"><span>{b.label}</span><span>{b.count}</span></div><div className="h-2 rounded-full bg-slate-800"><div className={`${b.color} h-2 rounded-full`} style={{ width: `${Math.max(8, b.count * 8)}%` }} /></div></div>)}</div></section>;
}
