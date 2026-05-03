import type { PerformanceMetric } from "@/services/api";

export default function PerformanceKPIs({ metrics }: { metrics: PerformanceMetric[] }) {
  const latest = metrics.at(-1);
  const cards = [
    ["On-time Delivery", `${latest?.on_time_rate ?? 0}%`],
    ["Avg Transit", `${latest?.avg_transit_hours ?? 0}h`],
    ["Cost / Shipment", `$${Math.round(latest?.cost_per_shipment ?? 0)}`],
    ["CO2 Footprint", `${Math.round(latest?.co2_tons ?? 0)}t`],
  ];
  return <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map((c)=><article key={c[0]} className="panel p-4"><p className="text-xs text-slate-500">{c[0]}</p><p className="mt-2 text-2xl font-semibold">{c[1]}</p></article>)}</section>;
}
