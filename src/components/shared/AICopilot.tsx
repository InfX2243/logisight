"use client";

import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import type { Shipment } from "@/services/api";

const prompts = ["What shipments are at highest risk?", "Which routes are delay-prone this week?", "Show me CO2 optimization opportunities."];

export default function AICopilot({ page, shipments }: { page: string; shipments: Shipment[] }) {
  const [query, setQuery] = useState("");
  const answer = useMemo(() => {
    const risky = shipments.filter((s) => s.risk_score >= 70).length;
    return `Context: ${page}. ${risky} high-risk assets detected in current view. Suggested action: prioritize reroute simulations for critical shipments.`;
  }, [page, shipments]);

  return (
    <section className="panel mt-4 p-4 fade-up">
      <div className="flex items-center gap-2 text-sm font-medium text-orange-300"><Sparkles size={14} /> AI Copilot</div>
      <p className="mt-2 text-sm text-slate-300">{answer}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {prompts.map((p) => <button key={p} onClick={() => setQuery(p)} className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:bg-slate-800/70">{p}</button>)}
      </div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask LogiSight AI..." className="mt-3 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none focus:border-orange-500/60" />
    </section>
  );
}
