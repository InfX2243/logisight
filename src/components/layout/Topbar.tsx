"use client";

import { Bell, LogOut, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";

export default function Topbar() {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-800/90 bg-[#0f1115]/96 backdrop-blur px-5 py-3">
      <div className="flex h-11 items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input className="w-full rounded-xl border border-zinc-700 bg-zinc-900/60 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#ff7a3d]/70" placeholder="Search shipment, route, threat..." />
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex h-9 items-center gap-2 rounded-full border border-[#ff5a1f]/35 px-3 text-xs text-[#ff9a76]"><span className="live-dot" />Live intelligence</div>
          <button className="rounded-lg border border-zinc-700 p-2 text-zinc-300 hover:bg-zinc-800/60"><Bell size={16} /></button>
          <button onClick={() => { auth.logout(); router.replace('/login'); }} className="rounded-lg border border-zinc-700 p-2 text-zinc-300 hover:bg-zinc-800/60"><LogOut size={16} /></button>
        </div>
      </div>
    </header>
  );
}
