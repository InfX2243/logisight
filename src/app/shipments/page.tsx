"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import FleetTable from "@/components/shipments/FleetTable";
import ShipmentCard from "@/components/shipments/ShipmentCard";
import ShipmentDetailDrawer from "@/components/shipments/ShipmentDetailDrawer";
import CreateShipmentModal from "@/components/shipments/CreateShipmentModal";
import AICopilot from "@/components/shared/AICopilot";
import { api, type Shipment } from "@/services/api";

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [active, setActive] = useState<Shipment | null>(null);
  const [showModal, setShowModal] = useState(false);

  const reload = () => api.getShipments().then(setShipments);
  useEffect(() => void reload(), []);

  const cards = useMemo(() => shipments.slice(0, 4), [shipments]);

  return (
    <AppShell>
      <div className="space-y-4">
        <div className="flex items-center justify-between"><h1 className="text-xl font-semibold">Shipment Fleet Management</h1><button onClick={() => setShowModal(true)} className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-medium">Create Shipment</button></div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{cards.map((s) => <ShipmentCard key={s.id} shipment={s} onSelect={() => setActive(s)} />)}</div>
        <FleetTable shipments={shipments} onSelect={setActive} />
        <AICopilot page="Shipments" shipments={shipments} />
      </div>
      <ShipmentDetailDrawer shipment={active} onClose={() => setActive(null)} />
      <CreateShipmentModal open={showModal} onClose={() => setShowModal(false)} onCreated={reload} />
    </AppShell>
  );
}
