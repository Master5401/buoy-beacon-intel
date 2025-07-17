import { SensorCard } from "@/components/SensorCard";
import { BuoyStatus } from "@/components/BuoyStatus";
import { MetricChart } from "@/components/MetricChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Thermometer, 
  Droplets, 
  Waves, 
  Wind, 
  Gauge, 
  Activity,
  TrendingUp,
  AlertTriangle,
  MapPin,
  Zap,
  Shield,
  Database
} from "lucide-react";

// Enhanced mock data
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

const systemStats = [
  { label: "Data Points Collected", value: "2.4M", icon: Database, color: "text-blue-400" },
  { label: "Active Connections", value: "12", icon: Zap, color: "text-emerald-400" },
  { label: "Security Status", value: "Secure", icon: Shield, color: "text-green-400" },
  { label: "Uptime", value: "99.9%", icon: Activity, color: "text-purple-400" },
];

export default function Dashboard() {
  const handleInspectBuoy = (buoyId: string) => {
    console.log("Inspecting buoy:", buoyId);
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Hero Section */}
      <div className="relative rounded-xl overflow-hidden h-56 bg-gradient-wave">
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/60 to-transparent flex items-center">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-white mb-3 slide-in">Ocean Monitoring Dashboard</h1>
            <p className="text-blue-100 text-lg slide-in">Real-time data from 12 active buoys across the marine network</p>
            <div className="flex gap-4 mt-4">
              <Button variant="marine" className="btn-enhanced">
                <MapPin className="h-4 w-4 mr-2" />
                View Map
              </Button>
              <Button variant="outline" className="btn-enhanced text-white border-white hover:bg-white/10">
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Alert Banner */}
      <Card className="alert-enhanced alert-warning">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-warning pulse-glow" />
            <div className="flex-1">
              <p className="font-semibold text-warning">Weather Alert</p>
              <p className="text-sm text-muted-foreground">High wave conditions detected in sectors 7-9. Monitor buoy stability.</p>
            </div>
            <Button size="sm" variant="outline">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 enhanced-grid">
        {systemStats.map((stat, index) => (
          <Card key={index} className="metric-card interactive-element">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Sensor Overview */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Sensor Overview
          </h2>
          <Badge variant="outline" className="text-lg px-4 py-2">
            6 Active Sensors
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 enhanced-grid">
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

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

      {/* Enhanced Buoy Status */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Waves className="h-6 w-6 text-primary wave-animation" />
            Buoy Network Status
          </h2>
          <div className="flex gap-2">
            <Badge variant="default" className="bg-emerald-500/20 text-emerald-400">
              2 Online
            </Badge>
            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
              1 Warning
            </Badge>
            <Badge variant="destructive" className="bg-red-500/20 text-red-400">
              1 Offline
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 enhanced-grid">
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