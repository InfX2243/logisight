import type { Shipment } from "@/services/api";

export default function AIInsightsFeed({ shipments }: { shipments: Shipment[] }) {
  return (
    <section className="panel p-4">
      <h3 className="text-sm font-medium">AI Insights Feed</h3>
      <div className="mt-3 max-h-[260px] space-y-2 overflow-auto">
        {shipments.slice(0, 8).map((s) => (
          <div key={s.id} className="rounded-lg border border-slate-700 bg-slate-900/55 p-3 text-xs">
            <div className="flex items-center justify-between"><span className="text-orange-300">{s.id}</span><span className="text-slate-500">{new Date(s.eta).toLocaleTimeString()}</span></div>
            <p className="mt-1 text-slate-300">{s.recommendation}</p>
            <button className="mt-2 rounded-md bg-orange-500/20 px-2 py-1 text-orange-300">Apply</button>
          </div>
        ))}
      </div>
    </section>
  );
}
