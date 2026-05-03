"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import RiskScoreGauge from "@/components/risk/RiskScoreGauge";
import RiskMatrix from "@/components/risk/RiskMatrix";
import ThreatIntelPanel from "@/components/risk/ThreatIntelPanel";
import AICopilot from "@/components/shared/AICopilot";
import { api, type Shipment } from "@/services/api";

export default function RiskIntelligencePage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  useEffect(() => { api.getShipments().then(setShipments); }, []);
  const avg = shipments.length ? Math.round(shipments.reduce((a, s) => a + s.risk_score, 0) / shipments.length) : 0;
  return <AppShell><div className="grid gap-4 xl:grid-cols-3"><div className="space-y-4 xl:col-span-2"><RiskScoreGauge score={avg} /><RiskMatrix shipments={shipments} /></div><ThreatIntelPanel shipments={shipments} /></div><AICopilot page="Risk Intelligence" shipments={shipments} /></AppShell>;
}
