"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BrandLogo from "@/components/shared/BrandLogo";
import { auth } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("manager@logisight.ai");

  return (
    <main className="grid min-h-screen place-items-center bg-[#0f1115] px-6 py-10">
      <div className="panel w-full max-w-md p-7">
        <div className="flex h-14 items-center"><BrandLogo variant="auth" priority /></div>
        <h1 className="mt-5 text-2xl font-bold">Create Simulation Account</h1>
        <p className="mt-1 text-sm text-zinc-400">Instant onboarding to explore LogiSight workflows.</p>
        <input defaultValue="Ops Manager" className="mt-5 h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900/70 px-3" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-3 h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900/70 px-3" />
        <button onClick={() => { auth.login(email); router.replace("/dashboard"); }} className="mt-4 h-11 w-full rounded-xl bg-[#ff5a1f] px-4 font-semibold text-black">Create and Continue</button>
        <p className="mt-4 text-sm text-zinc-400">Already onboarded? <Link href="/login" className="text-[#ff9a76]">Login</Link></p>
      </div>
    </main>
  );
}
