import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Satellite, Navigation, Anchor, Waves } from "lucide-react";

// Mock map component since we don't have actual map integration
const MockMap = () => {
  const buoys = [
    { id: "BOY-001", name: "Atlantic Pioneer", lat: 40.7, lng: -74.0, status: "online" },
    { id: "BOY-002", name: "Pacific Guardian", lat: 34.0, lng: -118.2, status: "warning" },
    { id: "BOY-003", name: "Arctic Sentinel", lat: 71.0, lng: -8.2, status: "offline" },
    { id: "BOY-004", name: "Gulf Monitor", lat: 29.7, lng: -95.3, status: "online" },
    { id: "BOY-005", name: "Baltic Watcher", lat: 59.3, lng: 18.0, status: "online" },
  ];

  return (
    <div className="relative bg-ocean-deep rounded-lg h-96 overflow-hidden">
      {/* Simulated ocean background */}
      <div className="absolute inset-0 bg-gradient-to-br from-ocean-surface via-primary to-ocean-deep">
        <div className="absolute inset-0 opacity-20">
          {/* Wave animation overlay */}
          <div className="w-full h-full bg-gradient-to-r from-transparent via-wave-light/30 to-transparent animate-wave"></div>
        </div>
      </div>
      
      {/* Buoy markers */}
      {buoys.map((buoy, index) => (
        <div
          key={buoy.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          style={{ 
            left: `${20 + (index * 15)}%`, 
            top: `${30 + (index % 2 === 0 ? 10 : -10)}%` 
          }}
        >
          <div className="relative">
            <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${
              buoy.status === 'online' ? 'bg-emerald-500' :
              buoy.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
            }`}>
              {buoy.status === 'online' && (
                <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
              )}
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-card/90 backdrop-blur-sm border border-border/50 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              <p className="text-xs font-semibold">{buoy.name}</p>
              <p className="text-xs text-muted-foreground">{buoy.id}</p>
              <p className="text-xs text-muted-foreground">{buoy.lat}°, {buoy.lng}°</p>
            </div>
          </div>
        </div>
      ))}
      
      {/* Map controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <Button size="sm" variant="outline" className="bg-card/80 backdrop-blur-sm">
          <Navigation className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" className="bg-card/80 backdrop-blur-sm">
          <Satellite className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg p-3">
        <p className="text-xs font-semibold mb-2">Buoy Status</p>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span>Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span>Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span>Offline</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BuoyMap() {
  const selectedBuoy = {
    id: "BOY-001",
    name: "Atlantic Pioneer",
    location: { lat: 40.7128, lng: -74.0060 },
    status: "online" as const,
    depth: "250m",
    deployment: "2024-01-15",
    lastMaintenance: "2024-11-01",
    sensors: {
      temperature: { value: 23.1, status: "normal" },
      humidity: { value: 65, status: "normal" },
      waveHeight: { value: 1.9, status: "elevated" },
      windSpeed: { value: 14.8, status: "normal" },
      gyroscope: { value: 2.1, status: "normal" },
      battery: { value: 87, status: "good" }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <MapPin className="h-8 w-8 text-primary" />
            Buoy Network Map
          </h1>
          <p className="text-muted-foreground">Monitor and inspect buoys across the marine network</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          5 Active Buoys
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map View */}
        <div className="lg:col-span-2">
          <Card className="ocean-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Waves className="h-5 w-5" />
                Network Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MockMap />
            </CardContent>
          </Card>
        </div>

        {/* Buoy Details */}
        <div className="space-y-4">
          <Card className="ocean-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Anchor className="h-5 w-5" />
                  {selectedBuoy.name}
                </span>
                <Badge variant="default">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                  Online
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">ID:</span>
                  <span className="ml-1 font-semibold">{selectedBuoy.id}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Depth:</span>
                  <span className="ml-1 font-semibold">{selectedBuoy.depth}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Deployed:</span>
                  <span className="ml-1 font-semibold">{selectedBuoy.deployment}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Maintenance:</span>
                  <span className="ml-1 font-semibold">{selectedBuoy.lastMaintenance}</span>
                </div>
              </div>

              <div className="border-t border-border/50 pt-4">
                <h4 className="font-semibold mb-3">Sensor Status</h4>
                <div className="space-y-2">
                  {Object.entries(selectedBuoy.sensors).map(([key, sensor]) => (
                    <div key={key} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{sensor.value}{
                          key === 'temperature' ? '°C' :
                          key === 'humidity' || key === 'battery' ? '%' :
                          key === 'waveHeight' ? 'm' :
                          key === 'windSpeed' ? ' km/h' :
                          key === 'gyroscope' ? '°/s' : ''
                        }</span>
                        <div className={`w-2 h-2 rounded-full ${
                          sensor.status === 'normal' || sensor.status === 'good' ? 'bg-emerald-500' :
                          sensor.status === 'elevated' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full" variant="ocean">
                View Detailed Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}