import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Wifi, Battery, Signal } from "lucide-react";

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

  return (
    <Card className="ocean-card hover:shadow-wave transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{buoy.name}</CardTitle>
          <Badge variant={config.variant} className="font-semibold">
            <div className={`w-2 h-2 rounded-full ${config.color} mr-2 animate-pulse`} />
            {config.text}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          {buoy.location.lat.toFixed(4)}, {buoy.location.lng.toFixed(4)}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* System Health */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Battery className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{buoy.battery}%</span>
            <div className="flex-1 bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${
                  buoy.battery > 60 ? 'bg-emerald-500' : 
                  buoy.battery > 30 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${buoy.battery}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Signal className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{buoy.signal}%</span>
            <div className="flex-1 bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${
                  buoy.signal > 60 ? 'bg-emerald-500' : 
                  buoy.signal > 30 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${buoy.signal}%` }}
              />
            </div>
          </div>
        </div>

        {/* Sensor Readings */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Temp:</span>
            <span className="ml-1 font-semibold">{buoy.sensors.temperature}°C</span>
          </div>
          <div>
            <span className="text-muted-foreground">Humidity:</span>
            <span className="ml-1 font-semibold">{buoy.sensors.humidity}%</span>
          </div>
          <div>
            <span className="text-muted-foreground">Wave:</span>
            <span className="ml-1 font-semibold">{buoy.sensors.waveHeight}m</span>
          </div>
          <div>
            <span className="text-muted-foreground">Wind:</span>
            <span className="ml-1 font-semibold">{buoy.sensors.windSpeed} km/h</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-2 border-t border-border/50">
          <span className="text-xs text-muted-foreground">
            Updated: {buoy.lastUpdate}
          </span>
          <Button 
            size="sm" 
            variant="marine"
            onClick={() => onInspect(buoy.id)}
            className="hover:scale-105 transition-all duration-300"
          >
            Inspect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}