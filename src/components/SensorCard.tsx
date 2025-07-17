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

  const trendIcons = {
    up: "↗",
    down: "↘",
    stable: "→",
  };

  return (
    <Card className="metric-card interactive-element group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          {title}
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
          <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
              {value}
            </span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          
          <div className="flex items-center justify-between">
            {trend && trendValue && (
              <div className={`text-xs font-medium ${trendColors[trend]} flex items-center gap-1`}>
                <span className="text-base">{trendIcons[trend]}</span>
                {trendValue}
              </div>
            )}
            
            {buoyId && (
              <Badge variant="outline" className="text-xs">
                {buoyId}
              </Badge>
            )}
          </div>

          {/* Progress indicator for certain metrics */}
          {status === "online" && (
            <div className="w-full bg-muted rounded-full h-1">
              <div className="bg-primary h-1 rounded-full transition-all duration-1000" style={{ width: "85%" }} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}