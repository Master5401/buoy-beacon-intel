import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Waves, Wifi, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [notifications] = useState(3);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-ocean">
        {/* Enhanced Header */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 flex items-center px-4 shadow-lg">
          <SidebarTrigger className="mr-4 hover-scale" />
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Waves className="h-8 w-8 text-primary wave-animation" />
              <div className="absolute -top-1 -right-1 w-3 h-3 status-online rounded-full"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">OceanWatch</h1>
              <p className="text-xs text-muted-foreground">Marine IoT Dashboard</p>
            </div>
          </div>
          
          <div className="ml-auto flex items-center gap-4">
            {/* System Status */}
            <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-muted/50">
              <Wifi className="h-4 w-4 text-emerald-400 pulse-glow" />
              <span className="text-sm text-muted-foreground">12 Buoys Online</span>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative hover-scale">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-destructive">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="sm" className="hover-scale">
              <Settings className="h-4 w-4" />
            </Button>

            {/* Last Update */}
            <div className="text-xs text-muted-foreground hidden md:block">
              Last Update: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </header>

        {/* Sidebar */}
        <AppSidebar />

        {/* Enhanced Main Content */}
        <main className="flex-1 pt-16 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="animate-fade-in">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}