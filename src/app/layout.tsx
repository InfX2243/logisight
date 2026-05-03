import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LogiSight | AI-Native Supply Chain Orchestration",
  description: "From reactive tracking to predictive logistics intelligence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
