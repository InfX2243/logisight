import type { Shipment } from "@/services/api";

export default function AlertTimeline({ shipments }: { shipments: Shipment[] }) {
  return (
    <section className="panel p-4">
      <h3 className="text-sm font-medium">Alert Timeline</h3>
      <div className="mt-3 space-y-2 text-xs">
        {shipments.slice(0, 7).map((s, i) => (
          <div key={s.id} className="rounded-lg border border-slate-700 bg-slate-900/45 p-3">
            <p className="text-slate-200">{s.id} {s.status === "delayed" ? "delay spike detected" : "telemetry refreshed"}</p>
            <p className="mt-1 text-slate-500">T-{i + 2}m | Risk {s.risk_score}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
