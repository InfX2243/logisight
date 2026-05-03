import {
  mockPerformanceMetrics,
  mockShipments,
  mockWeatherAlerts,
  type IoTSensorData,
  type PerformanceMetric,
  type PredictionResponse,
  type RecommendationResponse,
  type RiskResponse,
  type Shipment,
  type ShipmentLocation,
  type WeatherAlert,
} from "@/services/mockData";

const API_URL = "http://127.0.0.1:8000";

export type {
  IoTSensorData,
  PerformanceMetric,
  PredictionResponse,
  RecommendationResponse,
  RiskResponse,
  Shipment,
  ShipmentLocation,
  WeatherAlert,
};

export interface ShipmentCreate {
  origin: string;
  destination: string;
  current_location: ShipmentLocation;
  eta: string;
  status?: Shipment["status"];
  carrier?: string;
  cargo_type?: string;
  weight_kg?: number;
  priority?: Shipment["priority"];
}

let mockMode = true;

const levelFromScore = (score: number): RiskResponse["risk_level"] => {
  if (score >= 70) return "high";
  if (score >= 45) return "medium";
  return "low";
};

const mockRisk = (id: string): RiskResponse => {
  const shipment = mockShipments.find((s) => s.id === id);
  const score = shipment?.risk_score ?? 50;
  return {
    shipment_id: id,
    risk_score: score,
    risk_level: levelFromScore(score),
    reason:
      score > 70
        ? "Multi-factor threat fusion detected congestion and weather volatility on the current corridor."
        : "Risk remains controlled with minor sensor and timing deviations.",
  };
};

const mockPrediction = (id: string): PredictionResponse => {
  const shipment = mockShipments.find((s) => s.id === id);
  return {
    shipment_id: id,
    predicted_delay_minutes: shipment?.prediction_delay_minutes ?? 20,
    confidence: 0.78 + ((shipment?.risk_score ?? 40) % 20) / 100,
    reason: "Sequence model detected potential queue buildup at destination handling zone.",
  };
};

const mockRecommendation = (id: string): RecommendationResponse => {
  const shipment = mockShipments.find((s) => s.id === id);
  const risky = (shipment?.risk_score ?? 0) > 70;
  return {
    shipment_id: id,
    action: risky ? "reroute" : "monitor",
    reason: shipment?.recommendation ?? "Continue normal operating profile.",
    impact: risky ? "Projected delay reduction: 14%" : "Operational stability maintained",
    confidence: risky ? 0.93 : 0.81,
  };
};

export const api = {
  async getShipments(): Promise<Shipment[]> {
    try {
      const res = await fetch(`${API_URL}/shipments`, { cache: "no-store" });
      if (!res.ok) throw new Error("Shipment fetch failed");
      mockMode = false;
      return (await res.json()) as Shipment[];
    } catch {
      mockMode = true;
      return mockShipments;
    }
  },

  async createShipment(data: ShipmentCreate): Promise<Shipment> {
    if (mockMode) {
      const shipment: Shipment = {
        id: `SHIP-MOCK-${Math.floor(Math.random() * 9000)}`,
        origin: data.origin,
        destination: data.destination,
        current_location: data.current_location,
        eta: data.eta,
        status: data.status ?? "in_transit",
        carrier: data.carrier ?? "Demo Carrier",
        cargo_type: data.cargo_type ?? "General Freight",
        weight_kg: data.weight_kg ?? 8500,
        priority: data.priority ?? "normal",
        route: [
          { label: data.origin, eta: new Date().toISOString() },
          { label: data.destination, eta: data.eta },
        ],
        risk_score: 36,
        sensor_data: { temperature: 19, humidity: 58, shock_events: 0, battery_level: 94 },
        recommendation: "Maintain route plan and monitor queue thresholds.",
        prediction_delay_minutes: 24,
      };
      mockShipments.unshift(shipment);
      return shipment;
    }

    const res = await fetch(`${API_URL}/shipments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create shipment");
    return (await res.json()) as Shipment;
  },

  async deleteShipment(id: string): Promise<void> {
    if (mockMode) {
      const index = mockShipments.findIndex((s) => s.id === id);
      if (index >= 0) mockShipments.splice(index, 1);
      return;
    }

    const res = await fetch(`${API_URL}/shipments/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete shipment");
  },

  async getRisk(id: string): Promise<RiskResponse> {
    if (mockMode) return mockRisk(id);
    const res = await fetch(`${API_URL}/shipments/${id}/risk`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch risk");
    return (await res.json()) as RiskResponse;
  },

  async getPrediction(id: string): Promise<PredictionResponse> {
    if (mockMode) return mockPrediction(id);
    const res = await fetch(`${API_URL}/shipments/${id}/prediction`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch prediction");
    return (await res.json()) as PredictionResponse;
  },

  async getRecommendation(id: string): Promise<RecommendationResponse> {
    if (mockMode) return mockRecommendation(id);
    const res = await fetch(`${API_URL}/shipments/${id}/recommendation`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch recommendation");
    return (await res.json()) as RecommendationResponse;
  },

  async getWeatherAlerts(): Promise<WeatherAlert[]> {
    if (mockMode) return mockWeatherAlerts;
    try {
      const res = await fetch(`${API_URL}/weather-alerts`, { cache: "no-store" });
      if (!res.ok) throw new Error();
      return (await res.json()) as WeatherAlert[];
    } catch {
      return mockWeatherAlerts;
    }
  },

  async getPerformanceMetrics(): Promise<PerformanceMetric[]> {
    if (mockMode) return mockPerformanceMetrics;
    try {
      const res = await fetch(`${API_URL}/analytics/metrics`, { cache: "no-store" });
      if (!res.ok) throw new Error();
      return (await res.json()) as PerformanceMetric[];
    } catch {
      return mockPerformanceMetrics;
    }
  },

  async simulate(): Promise<{ status: string; mode: "mock" | "api" }> {
    if (mockMode) {
      mockShipments.forEach((s) => {
        if (s.status !== "delivered") {
          s.current_location.latitude += (Math.random() - 0.5) * 0.6;
          s.current_location.longitude += (Math.random() - 0.5) * 0.6;
        }
      });
      return { status: "success", mode: "mock" };
    }
    const res = await fetch(`${API_URL}/shipments/simulate`, { method: "POST" });
    if (!res.ok) throw new Error("Failed to run simulation");
    return { status: "success", mode: "api" };
  },

  async bulkGenerate(count = 10): Promise<{ status: string; mode: "mock" | "api" }> {
    if (mockMode) {
      for (let i = 0; i < count; i += 1) {
        mockShipments.push({
          ...mockShipments[i % mockShipments.length],
          id: `SHIP-BULK-${Math.floor(Math.random() * 100000)}`,
        });
      }
      return { status: "success", mode: "mock" };
    }
    const res = await fetch(`${API_URL}/shipments/bulk-generate?count=${count}`, { method: "POST" });
    if (!res.ok) throw new Error("Failed to generate bulk shipments");
    return { status: "success", mode: "api" };
  },

  async resetSimulation(): Promise<{ status: string; mode: "mock" | "api" }> {
    if (mockMode) {
      mockShipments.splice(20);
      return { status: "success", mode: "mock" };
    }
    const res = await fetch(`${API_URL}/shipments/reset-simulation`, { method: "POST" });
    if (!res.ok) throw new Error("Failed to reset simulation");
    return { status: "success", mode: "api" };
  },

  async runScenario(name: string): Promise<{ status: string; mode: "mock" | "api"; scenario: string }> {
    if (mockMode) {
      if (name === "storm") mockShipments.forEach((s) => (s.status = "delayed"));
      if (name === "recovery") mockShipments.forEach((s) => (s.status = "in_transit"));
      return { status: "success", mode: "mock", scenario: name };
    }
    const res = await fetch(`${API_URL}/shipments/scenario/${name}`, { method: "POST" });
    if (!res.ok) throw new Error("Failed to run scenario");
    return { status: "success", mode: "api", scenario: name };
  },
};
