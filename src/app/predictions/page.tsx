"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import DelayForecastChart from "@/components/predictions/DelayForecastChart";
import ConfidenceMatrix from "@/components/predictions/ConfidenceMatrix";
import SelfLearningTracker from "@/components/predictions/SelfLearningTracker";
import AICopilot from "@/components/shared/AICopilot";
import { api, type Shipment } from "@/services/api";

export default function PredictionsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  useEffect(() => { api.getShipments().then(setShipments); }, []);
  return <AppShell><div className="grid gap-4 xl:grid-cols-3"><div className="space-y-4 xl:col-span-2"><DelayForecastChart shipments={shipments} /><SelfLearningTracker /></div><ConfidenceMatrix shipments={shipments} /></div><AICopilot page="Predictions" shipments={shipments} /></AppShell>;
}
