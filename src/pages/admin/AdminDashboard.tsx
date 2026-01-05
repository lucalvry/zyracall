import AdminLayout from "@/components/admin/AdminLayout";
import { 
  Users, 
  Phone, 
  DollarSign, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, changeType = "neutral", icon }: StatCardProps) => (
  <div className="bg-card border border-border rounded-xl p-5 shadow-card">
    <div className="flex items-start justify-between mb-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      {change && (
        <div className={cn(
          "flex items-center gap-1 text-sm font-medium",
          changeType === "up" && "text-success",
          changeType === "down" && "text-destructive",
          changeType === "neutral" && "text-muted-foreground"
        )}>
          {changeType === "up" && <TrendingUp className="w-4 h-4" />}
          {changeType === "down" && <TrendingDown className="w-4 h-4" />}
          {change}
        </div>
      )}
    </div>
    <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
    <p className="text-sm text-muted-foreground">{title}</p>
  </div>
);

interface AlertItem {
  id: string;
  type: "error" | "warning" | "info";
  message: string;
  time: string;
}

const mockAlerts: AlertItem[] = [
  { id: "1", type: "error", message: "High call failure rate to Nigeria (+234)", time: "5 min ago" },
  { id: "2", type: "warning", message: "Wallet sync delay detected", time: "12 min ago" },
  { id: "3", type: "info", message: "Provider Telnyx rate update applied", time: "1 hour ago" },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          System overview and alerts
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Users"
          value="1,247"
          change="+12%"
          changeType="up"
          icon={<Users className="w-5 h-5" />}
        />
        <StatCard
          title="Calls Today"
          value="3,891"
          change="+8%"
          changeType="up"
          icon={<Phone className="w-5 h-5" />}
        />
        <StatCard
          title="Revenue Today"
          value="$2,847"
          change="+15%"
          changeType="up"
          icon={<DollarSign className="w-5 h-5" />}
        />
        <StatCard
          title="Failed Calls"
          value="23"
          change="-5%"
          changeType="down"
          icon={<AlertTriangle className="w-5 h-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Alerts */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">System Alerts</h2>
            <Activity className="w-5 h-5 text-muted-foreground" />
          </div>
          
          <div className="space-y-3">
            {mockAlerts.map((alert) => (
              <div 
                key={alert.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg",
                  alert.type === "error" && "bg-destructive/10",
                  alert.type === "warning" && "bg-warning/10",
                  alert.type === "info" && "bg-primary/10"
                )}
              >
                <AlertTriangle className={cn(
                  "w-4 h-4 mt-0.5",
                  alert.type === "error" && "text-destructive",
                  alert.type === "warning" && "text-warning",
                  alert.type === "info" && "text-primary"
                )} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Recent Activity</h2>
          </div>
          
          <div className="space-y-3">
            {[
              { action: "User suspended", detail: "user@example.com", time: "2 min ago", by: "admin@zyracall.com" },
              { action: "Rate updated", detail: "Nigeria mobile +15%", time: "15 min ago", by: "admin@zyracall.com" },
              { action: "Wallet credited", detail: "$50.00 to user#1234", time: "1 hour ago", by: "support@zyracall.com" },
              { action: "Provider disabled", detail: "Vonage - maintenance", time: "2 hours ago", by: "admin@zyracall.com" },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity.action}</span>
                    <span className="text-muted-foreground"> — {activity.detail}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {activity.time} by {activity.by}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
