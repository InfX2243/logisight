"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import PerformanceKPIs from "@/components/analytics/PerformanceKPIs";
import ThroughputChart from "@/components/analytics/ThroughputChart";
import RouteEfficiencyMap from "@/components/analytics/RouteEfficiencyMap";
import AICopilot from "@/components/shared/AICopilot";
import { api, type PerformanceMetric, type Shipment } from "@/services/api";

export default function AnalyticsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  useEffect(() => { api.getShipments().then(setShipments); api.getPerformanceMetrics().then(setMetrics); }, []);
  return <AppShell><div className="space-y-4"><PerformanceKPIs metrics={metrics} /><div className="grid gap-4 xl:grid-cols-3"><div className="xl:col-span-2"><ThroughputChart metrics={metrics} /></div><RouteEfficiencyMap shipments={shipments} /></div><AICopilot page="Analytics" shipments={shipments} /></div></AppShell>;
}
