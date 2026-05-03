"use client";

import { useMemo, useState } from "react";
import type { Shipment } from "@/services/api";
import StatusBadge from "@/components/shared/StatusBadge";
import RiskBadge from "@/components/shared/RiskBadge";

export default function FleetTable({ shipments, onSelect }: { shipments: Shipment[]; onSelect: (s: Shipment) => void }) {
  const [q, setQ] = useState("");
  const rows = useMemo(() => shipments.filter((s) => s.id.toLowerCase().includes(q.toLowerCase()) || s.origin.toLowerCase().includes(q.toLowerCase()) || s.destination.toLowerCase().includes(q.toLowerCase())), [shipments, q]);
  return (
    <section className="panel p-4">
      <div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-medium">Fleet Table</h3><input value={q} onChange={(e) => setQ(e.target.value)} className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-xs" placeholder="Search" /></div>
      <div className="overflow-auto"><table className="w-full text-xs"><thead className="text-slate-500"><tr><th className="py-2 text-left">ID</th><th className="text-left">Route</th><th className="text-left">Carrier</th><th className="text-left">Cargo</th><th className="text-left">Status</th><th className="text-left">Risk</th></tr></thead><tbody>{rows.map((s)=><tr key={s.id} onClick={() => onSelect(s)} className="cursor-pointer border-t border-slate-800 hover:bg-slate-800/40"><td className="py-3">{s.id}</td><td>{s.origin} {" -> "} {s.destination}</td><td>{s.carrier}</td><td>{s.cargo_type}</td><td><StatusBadge status={s.status} /></td><td><RiskBadge score={s.risk_score} /></td></tr>)}</tbody></table></div>
    </section>
  );
}
