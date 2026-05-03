import type { Shipment } from "@/services/api";

export default function LiveFleetMap({ shipments }: { shipments: Shipment[] }) {
  return (
    <section className="panel p-4">
      <h3 className="text-sm font-medium">Live Fleet Map</h3>
      <div className="mt-3 rounded-xl border border-slate-700 bg-[#070f1d] p-2">
        <svg viewBox="0 0 800 360" className="h-[300px] w-full">
          <rect width="800" height="360" fill="#060d1a" />
          <path d="M85,110 L190,90 L240,140 L190,180 L80,165 Z" fill="#11203d" />
          <path d="M260,120 L400,85 L505,130 L560,180 L420,230 L290,190 Z" fill="#102243" />
          <path d="M580,95 L720,110 L760,180 L675,245 L570,210 Z" fill="#0f2242" />
          {shipments.slice(0, 12).map((s, i) => {
            const x = 80 + ((i * 57) % 650);
            const y = 70 + ((i * 29) % 220);
            const danger = s.risk_score > 70;
            return <circle key={s.id} cx={x} cy={y} r={danger ? 6 : 4} fill={danger ? "#f43f5e" : "#ff7a3d"}><animate attributeName="opacity" values="1;0.45;1" dur="1.6s" repeatCount="indefinite" /></circle>;
          })}
        </svg>
      </div>
    </section>
  );
}
