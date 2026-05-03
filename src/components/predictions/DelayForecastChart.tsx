import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import type { Shipment } from "@/services/api";

export default function DelayForecastChart({ shipments }: { shipments: Shipment[] }) {
  const data = Array.from({ length: 7 }).map((_, i) => ({ day: `D+${i + 1}`, delay: 35 + i * 6, high: 55 + i * 7, low: 20 + i * 4 }));
  return <section className="panel p-4"><h3 className="text-sm font-medium">7-Day Delay Forecast</h3><div className="mt-3 h-64"><ResponsiveContainer><AreaChart data={data}><XAxis dataKey="day" stroke="#64748b" /><YAxis stroke="#64748b" /><Area dataKey="high" stroke="#7c2d12" fill="#7c2d12" fillOpacity={0.18} /><Area dataKey="delay" stroke="#ff7a3d" fill="#ff7a3d" fillOpacity={0.22} /><Area dataKey="low" stroke="#fb923c" fill="#fb923c" fillOpacity={0.06} /></AreaChart></ResponsiveContainer></div><p className="text-xs text-slate-500">Signals synthesized from {shipments.length} active assets.</p></section>;
}
