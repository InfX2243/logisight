import type { Shipment } from "@/services/api";

export default function RiskMatrix({ shipments }: { shipments: Shipment[] }) {
  return <section className="panel p-4"><h3 className="text-sm font-medium">Impact vs Probability</h3><div className="mt-3 grid grid-cols-2 gap-2">{shipments.slice(0, 12).map((s)=><div key={s.id} className="rounded-lg border border-slate-700 bg-slate-900/50 p-2 text-xs"><p>{s.id}</p><p className="text-slate-500">Impact {Math.round(s.risk_score*0.9)} | Prob {Math.round(s.risk_score*0.8)}%</p></div>)}</div></section>;
}
