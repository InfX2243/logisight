import type { Shipment } from "@/services/api";

export default function ConfidenceMatrix({ shipments }: { shipments: Shipment[] }) {
  return <section className="panel p-4"><h3 className="text-sm font-medium">Confidence Matrix</h3><div className="mt-3 grid grid-cols-2 gap-2">{shipments.slice(0, 10).map((s)=><div key={s.id} className="rounded-lg border border-slate-700 bg-slate-900/50 p-2 text-xs"><p>{s.id}</p><p className="text-slate-500">Confidence {Math.min(99, 74 + (s.risk_score % 22))}%</p></div>)}</div></section>;
}
