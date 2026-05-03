export type ShipmentStatus = "in_transit" | "delayed" | "at_port" | "customs_hold" | "delivered";
export type ShipmentPriority = "critical" | "high" | "normal" | "low";
export type RiskLevel = "low" | "medium" | "high";

export interface ShipmentLocation {
  latitude: number;
  longitude: number;
}

export interface ShipmentRoutePoint {
  label: string;
  eta: string;
}

export interface IoTSensorData {
  temperature: number;
  humidity: number;
  shock_events: number;
  battery_level: number;
}

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  current_location: ShipmentLocation;
  eta: string;
  status: ShipmentStatus;
  carrier: string;
  cargo_type: string;
  weight_kg: number;
  priority: ShipmentPriority;
  route: ShipmentRoutePoint[];
  risk_score: number;
  sensor_data: IoTSensorData;
  recommendation: string;
  prediction_delay_minutes: number;
}

export interface RiskResponse {
  shipment_id: string;
  risk_score: number;
  risk_level: RiskLevel;
  reason: string;
}

export interface PredictionResponse {
  shipment_id: string;
  predicted_delay_minutes: number;
  confidence: number;
  reason: string;
}

export interface RecommendationResponse {
  shipment_id: string;
  action: string;
  reason: string;
  impact: string;
  confidence: number;
}

export interface WeatherAlert {
  id: string;
  route: string;
  severity: "advisory" | "warning" | "critical";
  title: string;
  details: string;
}

export interface PerformanceMetric {
  date: string;
  on_time_rate: number;
  avg_transit_hours: number;
  cost_per_shipment: number;
  co2_tons: number;
  throughput: number;
}

const now = Date.now();
const h = (n: number) => new Date(now + n * 3600_000).toISOString();

const routes = [
  ["Shanghai", "Singapore", "Suez", "Rotterdam"],
  ["Los Angeles", "Yokohama", "Osaka", "Tokyo"],
  ["Hamburg", "Antwerp", "Felixstowe", "New York"],
  ["Dubai", "Jeddah", "Mombasa", "Nairobi"],
  ["Santos", "Casablanca", "Valencia", "Marseille"],
];

const carriers = ["Maersk", "Hapag-Lloyd", "MSC", "CMA CGM", "ONE"];
const cargoTypes = ["Electronics", "Pharma", "Automotive", "Textiles", "Cold Chain"];
const statuses: ShipmentStatus[] = ["in_transit", "delayed", "at_port", "customs_hold", "delivered"];
const priorities: ShipmentPriority[] = ["critical", "high", "normal", "low"];

export const mockShipments: Shipment[] = Array.from({ length: 20 }).map((_, i) => {
  const routeSeed = routes[i % routes.length];
  const risk = 22 + (i * 7) % 74;
  return {
    id: `SHIP-${1200 + i}`,
    origin: routeSeed[0],
    destination: routeSeed[routeSeed.length - 1],
    current_location: {
      latitude: -45 + ((i * 19) % 90),
      longitude: -170 + ((i * 37) % 340),
    },
    eta: h(16 + i * 3),
    status: statuses[i % statuses.length],
    carrier: carriers[i % carriers.length],
    cargo_type: cargoTypes[i % cargoTypes.length],
    weight_kg: 6800 + i * 420,
    priority: priorities[i % priorities.length],
    route: routeSeed.map((label, rIndex) => ({ label, eta: h(8 + i * 2 + rIndex * 6) })),
    risk_score: risk,
    sensor_data: {
      temperature: 2 + ((i * 3) % 27),
      humidity: 32 + ((i * 5) % 48),
      shock_events: i % 6,
      battery_level: 45 + ((i * 7) % 52),
    },
    recommendation: risk > 70 ? "Reroute via secondary lane" : "Maintain optimized velocity profile",
    prediction_delay_minutes: i % 3 === 0 ? 90 - i : 20 + i,
  };
});

export const mockWeatherAlerts: WeatherAlert[] = [
  {
    id: "WX-001",
    route: "Shanghai -> Rotterdam",
    severity: "critical",
    title: "North Atlantic Cyclone Corridor",
    details: "High crosswind conditions and wave swells above 7m likely through the next 36 hours.",
  },
  {
    id: "WX-002",
    route: "Los Angeles -> Tokyo",
    severity: "warning",
    title: "Pacific Jetstream Instability",
    details: "Strong headwinds increasing fuel burn and potential terminal sequencing delays.",
  },
  {
    id: "WX-003",
    route: "Dubai -> Nairobi",
    severity: "advisory",
    title: "Red Sea Thermal Front",
    details: "Localized heat pockets may impact sensor accuracy in unshielded containers.",
  },
];

export const mockPerformanceMetrics: PerformanceMetric[] = Array.from({ length: 30 }).map((_, i) => ({
  date: new Date(now - (29 - i) * 24 * 3600_000).toISOString().slice(0, 10),
  on_time_rate: 88 + (i % 8),
  avg_transit_hours: 64 - (i % 5),
  cost_per_shipment: 1910 - i * 8,
  co2_tons: 360 - i * 2.4,
  throughput: 110 + i * 4,
}));
