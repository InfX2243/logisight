'use client';

import { PieChart, Pie, Cell, Tooltip as PieTooltip, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, Tooltip as BarTooltip, CartesianGrid } from 'recharts';
import { RiskResponse, PredictionResponse } from '../services/api';

interface Props {
  risks: Record<string, RiskResponse>;
  predictions: Record<string, PredictionResponse>;
}

export default function DashboardCharts({ risks, predictions }: Props) {
  // Risk Distribution Data
  const riskCounts = { high: 0, medium: 0, low: 0 };
  Object.values(risks).forEach(r => {
    if (r) riskCounts[r.risk_level as keyof typeof riskCounts]++;
  });

  const pieData = [
    { name: 'High', value: riskCounts.high, color: '#f43f5e' }, // rose-500
    { name: 'Med', value: riskCounts.medium, color: '#f59e0b' }, // amber-500
    { name: 'Low', value: riskCounts.low, color: '#10b981' }, // emerald-500
  ].filter(d => d.value > 0);

  // Delay Data
  const barData = Object.values(predictions)
    .filter(p => p !== undefined && p.predicted_delay_minutes > 0)
    .map(p => ({
      id: p.shipment_id.slice(0, 5).toUpperCase(),
      delay: p.predicted_delay_minutes
    }))
    .sort((a, b) => b.delay - a.delay)
    .slice(0, 5);

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0f1420] border border-slate-800 p-2 rounded shadow-xl">
          <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">{payload[0].name || payload[0].payload.id}</p>
          <p className="text-xs font-bold text-white">{payload[0].value} units</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Risk Analysis */}
      <div className="panel-base p-5 flex flex-col h-[240px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Network Risk Profile</h3>
          <span className="text-[9px] font-bold text-slate-700">LIVE_ANALYSIS</span>
        </div>
        <div className="flex-1 min-h-0">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Pie>
                <PieTooltip content={customTooltip} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-[10px] text-slate-600 font-semibold italic">Awaiting sensor data...</div>
          )}
        </div>
      </div>

      {/* Latency Forecast */}
      <div className="panel-base p-5 flex flex-col h-[240px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Transit Latency (Min)</h3>
          <span className="text-[9px] font-bold text-slate-700">PREDICTIVE_MODEL_V4</span>
        </div>
        <div className="flex-1 min-h-0">
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                <XAxis 
                   dataKey="id" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fontSize: 9, fill: '#475569', fontWeight: 600 }} 
                />
                <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fontSize: 9, fill: '#475569', fontWeight: 600 }} 
                />
                <BarTooltip cursor={{ fill: '#1f2937', opacity: 0.4 }} content={customTooltip} />
                <Bar dataKey="delay" fill="#3b82f6" fillOpacity={0.8} radius={[2, 2, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-[10px] text-slate-600 font-semibold italic">No latency projections</div>
          )}
        </div>
      </div>
    </div>
  );
}
