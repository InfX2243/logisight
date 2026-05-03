import type { Shipment } from "@/services/api";

export default function ThreatIntelPanel({ shipments }: { shipments: Shipment[] }) {
  const top = ["Weather", "Port Congestion", "Geopolitical", "Sensor Anomaly"];
  return <section className="panel p-4"><h3 className="text-sm font-medium">Threat Intelligence</h3><div className="mt-3 space-y-2 text-xs">{top.map((t, i)=><div key={t} className="rounded-lg border border-slate-700 bg-slate-900/50 p-3"><p>{t}</p><p className="text-slate-500">{Math.max(4, shipments.length - i*2)} active signals | {(i%2===0)?"up":"down"} trend</p></div>)}</div></section>;
}
