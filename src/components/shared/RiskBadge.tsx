export default function RiskBadge({ score }: { score: number }) {
  const tone = score >= 70 ? "bg-rose-500/20 text-rose-300" : score >= 45 ? "bg-amber-500/20 text-amber-300" : "bg-emerald-500/20 text-emerald-300";
  const label = score >= 70 ? "High" : score >= 45 ? "Medium" : "Low";
  return <span className={`rounded-full px-2 py-1 text-xs ${tone}`}>{label} ({score})</span>;
}
