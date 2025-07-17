import { SensorCard } from "@/components/SensorCard";
import { BuoyStatus } from "@/components/BuoyStatus";
import { MetricChart } from "@/components/MetricChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Thermometer, 
  Droplets, 
  Waves, 
  Wind, 
  Gauge, 
  Activity,
  TrendingUp,
  AlertTriangle 
} from "lucide-react";
import oceanHero from "@/assets/ocean-buoys-hero.jpg";

// Mock data for demonstration
const sensorData = [
  { title: "Avg Temperature", value: "22.5", unit: "°C", status: "online" as const, icon: Thermometer, trend: "up" as const, trendValue: "+0.3°" },
  { title: "Humidity", value: "68", unit: "%", status: "online" as const, icon: Droplets, trend: "stable" as const, trendValue: "±2%" },
  { title: "Wave Height", value: "1.8", unit: "m", status: "warning" as const, icon: Waves, trend: "up" as const, trendValue: "+0.4m" },
  { title: "Wind Speed", value: "15.2", unit: "km/h", status: "online" as const, icon: Wind, trend: "down" as const, trendValue: "-2.1" },
  { title: "System Health", value: "94", unit: "%", status: "online" as const, icon: Activity, trend: "up" as const, trendValue: "+2%" },
  { title: "Avg Gyro", value: "2.1", unit: "°/s", status: "online" as const, icon: Gauge, trend: "stable" as const, trendValue: "±0.1" },
];

const buoyData = [
  {
    id: "BOY-001",
    name: "Atlantic Pioneer",
    location: { lat: 40.7128, lng: -74.0060 },
    status: "online" as const,
    battery: 87,
    signal: 92,
    lastUpdate: "2 min ago",
    sensors: { temperature: 23.1, humidity: 65, waveHeight: 1.9, windSpeed: 14.8 }
  },
  {
    id: "BOY-002", 
    name: "Pacific Guardian",
    location: { lat: 34.0522, lng: -118.2437 },
    status: "warning" as const,
    battery: 45,
    signal: 78,
    lastUpdate: "5 min ago",
    sensors: { temperature: 21.8, humidity: 72, waveHeight: 2.1, windSpeed: 16.2 }
  },
  {
    id: "BOY-003",
    name: "Arctic Sentinel", 
    location: { lat: 71.0588, lng: -8.2275 },
    status: "offline" as const,
    battery: 12,
    signal: 0,
    lastUpdate: "2 hours ago",
    sensors: { temperature: 18.5, humidity: 85, waveHeight: 0.8, windSpeed: 8.5 }
  }
];

const temperatureData = [
  { time: "00:00", value: 22.1 },
  { time: "04:00", value: 21.8 },
  { time: "08:00", value: 22.9 },
  { time: "12:00", value: 24.2 },
  { time: "16:00", value: 23.8 },
  { time: "20:00", value: 22.5 },
];

const waveData = [
  { time: "00:00", value: 1.2 },
  { time: "04:00", value: 1.5 },
  { time: "08:00", value: 1.8 },
  { time: "12:00", value: 2.1 },
  { time: "16:00", value: 1.9 },
  { time: "20:00", value: 1.6 },
];

export default function Dashboard() {
  const handleInspectBuoy = (buoyId: string) => {
    console.log("Inspecting buoy:", buoyId);
    // Navigate to detailed buoy view
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden h-48">
        <img 
          src={oceanHero} 
          alt="Ocean Buoys" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/80 to-transparent flex items-center">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-2">Ocean Monitoring Dashboard</h1>
            <p className="text-blue-100">Real-time data from 12 active buoys across the marine network</p>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <Card className="border-l-4 border-l-warning bg-warning/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <div>
              <p className="font-semibold text-warning">Weather Alert</p>
              <p className="text-sm text-muted-foreground">High wave conditions detected in sectors 7-9. Monitor buoy stability.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sensor Overview */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          Sensor Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sensorData.map((sensor, index) => (
            <SensorCard
              key={index}
              title={sensor.title}
              value={sensor.value}
              unit={sensor.unit}
              status={sensor.status}
              icon={sensor.icon}
              trend={sensor.trend}
              trendValue={sensor.trendValue}
            />
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MetricChart
          title="Temperature Trends (24h)"
          data={temperatureData}
          unit="°C"
          color="hsl(var(--primary))"
          type="area"
        />
        <MetricChart
          title="Wave Height Analysis"
          data={waveData}
          unit="m"
          color="hsl(var(--accent))"
          type="line"
        />
      </div>

      {/* Buoy Status */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Waves className="h-6 w-6 text-primary" />
          Buoy Network Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {buoyData.map((buoy) => (
            <BuoyStatus
              key={buoy.id}
              buoy={buoy}
              onInspect={handleInspectBuoy}
            />
          ))}
        </div>
      </div>
    </div>
  );
}