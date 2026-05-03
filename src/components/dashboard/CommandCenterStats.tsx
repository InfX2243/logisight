import { Line, LineChart, ResponsiveContainer } from "recharts";
import type { Shipment } from "@/services/api";

const metric = (label: string, value: string, trend: string, data: { x: number; y: number }[]) => ({ label, value, trend, data });

export default function CommandCenterStats({ shipments }: { shipments: Shipment[] }) {
  const highRisk = shipments.filter((s) => s.risk_score >= 70).length;
  const onTime = Math.round((shipments.filter((s) => s.prediction_delay_minutes < 60).length / shipments.length) * 100);
  const cards = [
    metric("Active Shipments", String(shipments.length), "+5.2%", shipments.map((_, i) => ({ x: i, y: 10 + (i % 5) }))),
    metric("High Risk Assets", String(highRisk), "-1.4%", shipments.map((s, i) => ({ x: i, y: s.risk_score / 10 }))),
    metric("Avg Delay", "48m", "-7.8%", shipments.map((s, i) => ({ x: i, y: s.prediction_delay_minutes / 10 }))),
    metric("On-Time Rate", `${onTime}%`, "+2.1%", shipments.map((_, i) => ({ x: i, y: 7 + (i % 3) }))),
    metric("CO2 Saved", "17.8t", "+4.2%", shipments.map((_, i) => ({ x: i, y: 5 + (i % 4) }))),
    metric("AI Actions", String(highRisk + 12), "+8.9%", shipments.map((_, i) => ({ x: i, y: 6 + (i % 6) }))),
  ];
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((c) => (
        <article key={c.label} className="panel p-4">
          <p className="text-xs text-slate-500">{c.label}</p>
          <div className="mt-1 flex items-end justify-between">
            <p className="text-2xl font-semibold">{c.value}</p>
            <span className="text-xs text-emerald-300">{c.trend}</span>
          </div>
          <div className="mt-2 h-12"><ResponsiveContainer><LineChart data={c.data}><Line type="monotone" dataKey="y" stroke="#ff7a3d" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div>
        </article>
      ))}
    </section>
  );
}
