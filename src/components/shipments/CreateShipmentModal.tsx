"use client";

import { useState } from "react";
import { api } from "@/services/api";

export default function CreateShipmentModal({ open, onClose, onCreated }: { open: boolean; onClose: () => void; onCreated: () => void }) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
      <div className="panel w-full max-w-md p-4">
        <h3 className="text-sm font-medium">Create Shipment</h3>
        <div className="mt-3 space-y-2">
          <input value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Origin" className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm" />
          <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destination" className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm" />
        </div>
        <div className="mt-4 flex justify-end gap-2"><button onClick={onClose} className="rounded-lg border border-slate-700 px-3 py-2 text-xs">Cancel</button><button onClick={async()=>{await api.createShipment({origin,destination,current_location:{latitude:0,longitude:0},eta:new Date(Date.now()+172800000).toISOString()});onCreated();onClose();}} className="rounded-lg bg-orange-500 px-3 py-2 text-xs">Create</button></div>
      </div>
    </div>
  );
}
