import Link from "next/link";
import BrandLogo from "@/components/shared/BrandLogo";

export default function LandingPage() {
  return (
    <main className="hero-grid min-h-screen overflow-auto bg-[#0f1115] text-white">
      <div className="app-container flex min-h-screen flex-col py-10">
        <header className="flex h-16 items-center justify-between">
          <BrandLogo variant="hero" priority />
          <div className="flex gap-3">
            <Link href="/login" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm">Login</Link>
            <Link href="/signup" className="rounded-lg bg-[#ff5a1f] px-4 py-2 text-sm font-semibold text-black">Get Started</Link>
          </div>
        </header>

        <section className="mt-16 grid flex-1 items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-[#ff9a76]">AI-Native Orchestration</p>
            <h1 className="mt-4 text-5xl font-black leading-tight">Predict disruptions before they happen.</h1>
            <p className="mt-5 max-w-xl text-zinc-300">
              LogiSight transforms logistics operations from reactive tracking to proactive, intelligence-driven decision-making.
              It continuously analyzes GPS, IoT, weather, traffic, and historical signals to detect risk early and recommend immediate action.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/signup" className="rounded-xl bg-[#ff5a1f] px-5 py-3 font-semibold text-black">Start Simulation</Link>
              <Link href="/login" className="rounded-xl border border-zinc-600 px-5 py-3">I already have access</Link>
            </div>
          </div>

          <div className="panel p-6">
            <h2 className="text-lg font-semibold">How LogiSight Works</h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              <li>1. Fuses multi-source data into a real-time cognitive layer.</li>
              <li>2. Predicts delays and disruptions with cause intelligence.</li>
              <li>3. Assigns dynamic risk scores to prioritize critical shipments.</li>
              <li>4. Recommends actions: reroute, reschedule, expedite.</li>
              <li>5. Self-learns from outcomes to improve prediction accuracy.</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
