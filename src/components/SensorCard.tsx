import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface SensorCardProps {
  title: string;
  value: string | number;
  unit?: string;
  status: "online" | "warning" | "offline";
  icon: LucideIcon;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  buoyId?: string;
}

export function SensorCard({
  title,
  value,
  unit,
  status,
  icon: Icon,
  trend,
  trendValue,
  buoyId,
}: SensorCardProps) {
  const statusColors = {
    online: "status-online",
    warning: "status-warning",
    offline: "status-offline",
  };

  const trendColors = {
    up: "text-emerald-400",
    down: "text-red-400",
    stable: "text-yellow-400",
  };

  return (
    <Card className="ocean-card wave-animation hover:scale-105 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">{value}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          
          <div className="flex items-center justify-between">
            {trend && trendValue && (
              <div className={`text-xs ${trendColors[trend]}`}>
                {trend === "up" ? "↗" : trend === "down" ? "↘" : "→"} {trendValue}
              </div>
            )}
            
            {buoyId && (
              <Badge variant="outline" className="text-xs">
                {buoyId}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}