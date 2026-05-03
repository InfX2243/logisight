"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import BrandLogo from "@/components/shared/BrandLogo";
import { auth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("ops@logisight.ai");

  const next = useMemo(() => {
    if (typeof window === "undefined") return "/dashboard";
    const qp = new URLSearchParams(window.location.search);
    return qp.get("next") || "/dashboard";
  }, []);

  return (
    <main className="grid min-h-screen place-items-center bg-[#0f1115] px-6 py-10">
      <div className="panel w-full max-w-md p-7">
        <div className="flex h-14 items-center"><BrandLogo variant="auth" priority /></div>
        <h1 className="mt-5 text-2xl font-bold">Login to LogiSight</h1>
        <p className="mt-1 text-sm text-zinc-400">Simulation mode auth. No backend required.</p>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-5 h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900/70 px-3" placeholder="Email" />
        <input type="password" defaultValue="demo123" className="mt-3 h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900/70 px-3" />
        <button onClick={() => { auth.login(email); router.replace(next); }} className="mt-4 h-11 w-full rounded-xl bg-[#ff5a1f] px-4 font-semibold text-black">Enter Command Center</button>
        <p className="mt-4 text-sm text-zinc-400">Need an account? <Link href="/signup" className="text-[#ff9a76]">Sign up</Link></p>
      </div>
    </main>
  );
}
