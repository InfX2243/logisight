import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import type { PerformanceMetric } from "@/services/api";

export default function ThroughputChart({ metrics }: { metrics: PerformanceMetric[] }) {
  const data = metrics.slice(-12).map((m) => ({ d: m.date.slice(5), throughput: m.throughput }));
  return <section className="panel p-4"><h3 className="text-sm font-medium">Throughput by Period</h3><div className="mt-3 h-64"><ResponsiveContainer><BarChart data={data}><XAxis dataKey="d" stroke="#64748b" /><YAxis stroke="#64748b" /><Bar dataKey="throughput" fill="#ff7a3d" radius={[5,5,0,0]} /></BarChart></ResponsiveContainer></div></section>;
}
