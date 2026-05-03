import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function SelfLearningTracker() {
  const data = Array.from({ length: 30 }).map((_, i) => ({ day: i + 1, acc: 78 + (i % 11) }));
  return <section className="panel p-4"><h3 className="text-sm font-medium">Self-Learning Tracker</h3><div className="mt-3 h-56"><ResponsiveContainer><LineChart data={data}><XAxis dataKey="day" stroke="#64748b" /><YAxis stroke="#64748b" /><Line dataKey="acc" stroke="#ff7a3d" dot={false} strokeWidth={2} /></LineChart></ResponsiveContainer></div></section>;
}
