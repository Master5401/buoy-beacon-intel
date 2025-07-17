import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Waves, Wifi } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-ocean">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-md border-b border-border/50 z-50 flex items-center px-4">
          <SidebarTrigger className="mr-4" />
          <div className="flex items-center gap-2">
            <div className="relative">
              <Waves className="h-8 w-8 text-primary wave-animation" />
              <div className="absolute -top-1 -right-1 w-3 h-3 status-online rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">OceanWatch</h1>
              <p className="text-xs text-muted-foreground">Marine IoT Dashboard</p>
            </div>
          </div>
          
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Wifi className="h-4 w-4 text-emerald-400" />
              <span className="text-muted-foreground">12 Buoys Online</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Last Update: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </header>

        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <main className="flex-1 pt-16 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}