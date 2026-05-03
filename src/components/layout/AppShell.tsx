"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import AuthGuard from "@/components/auth/AuthGuard";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = globalThis.localStorage.getItem("logisight-sidebar-collapsed");
    if (saved) setCollapsed(saved === "1");
  }, []);

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    globalThis.localStorage.setItem("logisight-sidebar-collapsed", next ? "1" : "0");
  };

  return (
    <AuthGuard>
      <div className="flex h-screen overflow-hidden bg-transparent">
        <Sidebar collapsed={collapsed} onToggle={toggle} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <main className="flex-1 overflow-auto p-5">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
