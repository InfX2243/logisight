import DashboardClient from "@/components/DashboardClient";

export const metadata = {
  title: "LogiSight | Intelligence Engine",
  description: "Premium logistics management system.",
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#020617]">
      <DashboardClient />
    </main>
  );
}
