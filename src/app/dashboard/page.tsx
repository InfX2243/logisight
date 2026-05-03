"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import CommandCenterStats from "@/components/dashboard/CommandCenterStats";
import LiveFleetMap from "@/components/dashboard/LiveFleetMap";
import RiskHeatPanel from "@/components/dashboard/RiskHeatPanel";
import AIInsightsFeed from "@/components/dashboard/AIInsightsFeed";
import AlertTimeline from "@/components/dashboard/AlertTimeline";
import AICopilot from "@/components/shared/AICopilot";
import LoadingState from "@/components/shared/LoadingState";
import { api, type Shipment } from "@/services/api";

export default function DashboardPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);

  useEffect(() => {
    api.getShipments().then(setShipments);
  }, []);

  return (
    <AppShell>
      {!shipments.length ? (
        <LoadingState />
      ) : (
        <div className="space-y-4">
          <section className="panel p-4">
            <h1 className="text-xl font-semibold">LogiSight Command Center</h1>
            <p className="mt-2 text-sm text-zinc-300">
              LogiSight converts raw logistics telemetry into proactive decisions. This workspace predicts disruptions, assigns shipment risk,
              and recommends actions such as rerouting, rescheduling, or expediting so operations teams can respond before delays escalate.
            </p>
          </section>
          <CommandCenterStats shipments={shipments} />
          <div className="grid gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2 space-y-4">
              <LiveFleetMap shipments={shipments} />
              <AlertTimeline shipments={shipments} />
            </div>
            <div className="space-y-4">
              <RiskHeatPanel shipments={shipments} />
              <AIInsightsFeed shipments={shipments} />
            </div>
          </div>
          <AICopilot page="Dashboard" shipments={shipments} />
        </div>
      )}
    </AppShell>
  );
}
