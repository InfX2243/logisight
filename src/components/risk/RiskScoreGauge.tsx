export default function RiskScoreGauge({ score }: { score: number }) {
  const deg = Math.min(180, Math.max(0, (score / 100) * 180));
  const color = score >= 70 ? "#f43f5e" : score >= 45 ? "#f59e0b" : "#10b981";
  return <section className="panel p-4"><h3 className="text-sm font-medium">Portfolio Risk</h3><div className="mt-4 flex justify-center"><div className="relative h-36 w-72 overflow-hidden"><div className="absolute bottom-0 h-72 w-72 rounded-full border-[16px] border-slate-800" /><div className="absolute bottom-0 h-72 w-72 rounded-full border-[16px] border-transparent" style={{ borderTopColor: color, borderRightColor: color, transform: `rotate(${deg}deg)` }} /><div className="absolute inset-x-0 bottom-7 text-center text-3xl font-semibold">{score}</div></div></div></section>;
}
