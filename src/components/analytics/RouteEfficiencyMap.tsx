import type { Shipment } from "@/services/api";

export default function RouteEfficiencyMap({ shipments }: { shipments: Shipment[] }) {
  return <section className="panel p-4"><h3 className="text-sm font-medium">Route Efficiency</h3><div className="mt-3 space-y-2 text-xs">{shipments.slice(0, 8).map((s, i)=><div key={s.id} className="rounded-lg border border-slate-700 bg-slate-900/45 p-3"><div className="flex justify-between"><span>{s.origin} {" -> "} {s.destination}</span><span className="text-orange-300">{92 - i}%</span></div></div>)}</div></section>;
}
