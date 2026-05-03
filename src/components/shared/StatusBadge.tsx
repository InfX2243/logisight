export default function StatusBadge({ status }: { status: string }) {
  const palette: Record<string, string> = {
    in_transit: "bg-orange-500/20 text-orange-300",
    delayed: "bg-amber-500/20 text-amber-300",
    at_port: "bg-orange-400/20 text-orange-200",
    customs_hold: "bg-rose-500/20 text-rose-300",
    delivered: "bg-emerald-500/20 text-emerald-300",
  };
  return <span className={`rounded-full px-2 py-1 text-xs ${palette[status] ?? "bg-slate-700 text-slate-200"}`}>{status.replace("_", " ")}</span>;
}
