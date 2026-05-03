import { Loader2 } from "lucide-react";

export default function LoadingState({ label = "Loading intelligence feeds..." }: { label?: string }) {
  return (
    <div className="flex h-[45vh] items-center justify-center gap-3 text-slate-300">
      <Loader2 className="animate-spin text-orange-400" size={18} />
      <p className="text-sm">{label}</p>
    </div>
  );
}
