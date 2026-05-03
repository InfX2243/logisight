"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, AlertTriangle, BarChart3, Bot, ChevronLeft, ChevronRight, LayoutDashboard, Ship } from "lucide-react";
import BrandLogo from "@/components/shared/BrandLogo";

const items = [
  { href: "/dashboard", label: "Command Center", icon: LayoutDashboard },
  { href: "/shipments", label: "Shipments", icon: Ship },
  { href: "/risk-intelligence", label: "Risk Intel", icon: AlertTriangle },
  { href: "/predictions", label: "Predictions", icon: Bot },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
];

export default function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const path = usePathname();
  return (
    <aside className={`panel border-r h-screen transition-all ${collapsed ? "w-20" : "w-72"} p-3 hidden md:flex md:flex-col`}>
      <div className="flex h-14 items-center justify-between px-2">
        <BrandLogo variant={collapsed ? "navCollapsed" : "nav"} priority />
        <button onClick={onToggle} className="rounded-md border border-zinc-700 p-1 text-zinc-300 hover:bg-zinc-800/60">
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      <nav className="mt-4 flex-1 space-y-2">
        {items.map((item) => {
          const active = path === item.href;
          return (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${active ? "bg-[#ff5a1f]/18 text-[#ff9a76]" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"}`}>
              <item.icon size={16} />
              {!collapsed && item.label}
            </Link>
          );
        })}
      </nav>
      <div className="rounded-xl border border-zinc-700/70 bg-zinc-900/45 p-3 text-xs text-zinc-300">
        <div className="flex items-center gap-2"><Activity size={14} className="text-[#ff8d63]" /> AI Online</div>
        {!collapsed && <p className="mt-1 text-zinc-500">Predictive engine active | Latency 23ms</p>}
      </div>
    </aside>
  );
}
