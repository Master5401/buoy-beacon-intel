import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Wifi, Battery, Signal, Activity, Thermometer, Waves, Wind } from "lucide-react";

interface BuoyData {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  status: "online" | "warning" | "offline";
  battery: number;
  signal: number;
  lastUpdate: string;
  sensors: {
    temperature: number;
    humidity: number;
    waveHeight: number;
    windSpeed: number;
  };
}

interface BuoyStatusProps {
  buoy: BuoyData;
  onInspect: (buoyId: string) => void;
}

export function BuoyStatus({ buoy, onInspect }: BuoyStatusProps) {
  const statusConfig = {
    online: { color: "bg-emerald-500", text: "Online", variant: "default" as const },
    warning: { color: "bg-yellow-500", text: "Warning", variant: "secondary" as const },
    offline: { color: "bg-red-500", text: "Offline", variant: "destructive" as const },
  };

  const config = statusConfig[buoy.status];

  const getBatteryColor = (level: number) => {
    if (level > 60) return "bg-emerald-500";
    if (level > 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getSignalColor = (level: number) => {
    if (level > 70) return "bg-emerald-500";
    if (level > 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="ocean-card interactive-element group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {buoy.name}
          </CardTitle>
          <Badge variant={config.variant} className="font-semibold">
            <div className={`w-2 h-2 rounded-full ${config.color} mr-2 ${buoy.status === 'online' ? 'pulse-glow' : ''}`} />
            {config.text}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          {buoy.location.lat.toFixed(4)}, {buoy.location.lng.toFixed(4)}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Enhanced System Health */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Battery className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Battery</span>
            </div>
            <span className="text-sm font-bold">{buoy.battery}%</span>
          </div>
          <Progress value={buoy.battery} className="h-2" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Signal className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Signal</span>
            </div>
            <span className="text-sm font-bold">{buoy.signal}%</span>
          </div>
          <Progress value={buoy.signal} className="h-2" />
        </div>

        {/* Enhanced Sensor Readings */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <Thermometer className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-muted-foreground">Temperature</span>
            </div>
            <span className="text-lg font-bold text-foreground">{buoy.sensors.temperature}°C</span>
          </div>

          <div className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="h-4 w-4 text-green-400" />
              <span className="text-xs text-muted-foreground">Humidity</span>
            </div>
            <span className="text-lg font-bold text-foreground">{buoy.sensors.humidity}%</span>
          </div>

          <div className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <Waves className="h-4 w-4 text-cyan-400" />
              <span className="text-xs text-muted-foreground">Wave Height</span>
            </div>
            <span className="text-lg font-bold text-foreground">{buoy.sensors.waveHeight}m</span>
          </div>

          <div className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <Wind className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-muted-foreground">Wind Speed</span>
            </div>
            <span className="text-lg font-bold text-foreground">{buoy.sensors.windSpeed} km/h</span>
          </div>
        </div>

        {/* Enhanced Actions */}
        <div className="flex justify-between items-center pt-3 border-t border-border">
          <div className="text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-primary pulse-glow" />
              Updated: {buoy.lastUpdate}
            </div>
          </div>
          <Button 
            size="sm" 
            variant="marine"
            onClick={() => onInspect(buoy.id)}
            className="btn-enhanced hover-scale"
          >
            Inspect Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}