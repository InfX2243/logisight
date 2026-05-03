import type { Shipment } from "@/services/api";

export default function ShipmentDetailDrawer({ shipment, onClose }: { shipment: Shipment | null; onClose: () => void }) {
  if (!shipment) return null;
  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full max-w-md border-l border-slate-700 bg-[#07101f] p-4">
      <button onClick={onClose} className="mb-3 rounded-md border border-slate-700 px-2 py-1 text-xs">Close</button>
      <h3 className="text-lg font-semibold">{shipment.id}</h3>
      <p className="text-sm text-slate-400">{shipment.origin} {" -> "} {shipment.destination}</p>
      <div className="mt-4 space-y-2 text-sm">
        <p>Temperature: {shipment.sensor_data.temperature} C</p>
        <p>Humidity: {shipment.sensor_data.humidity}%</p>
        <p>Shock events: {shipment.sensor_data.shock_events}</p>
        <p>Battery: {shipment.sensor_data.battery_level}%</p>
        <p className="text-orange-300">AI: {shipment.recommendation}</p>
      </div>
    </div>
  );
}
