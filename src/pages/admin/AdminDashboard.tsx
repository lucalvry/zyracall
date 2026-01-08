import AdminLayout from "@/components/admin/AdminLayout";
import { 
  Users, 
  Phone, 
  DollarSign, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  icon: React.ReactNode;
  isLoading?: boolean;
}

const StatCard = ({ title, value, change, changeType = "neutral", icon, isLoading }: StatCardProps) => (
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
    {isLoading ? (
      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
    ) : (
      <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
    )}
    <p className="text-sm text-muted-foreground">{title}</p>
  </div>
);

const AdminDashboard = () => {
  // Fetch dashboard stats
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      // Get total users
      const { count: totalUsers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // Get today's calls
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { data: todayCalls } = await supabase
        .from("call_logs")
        .select("id, cost, status")
        .gte("started_at", today.toISOString());

      const callsToday = todayCalls?.length || 0;
      const revenueToday = todayCalls?.reduce((sum, c) => sum + Number(c.cost), 0) || 0;
      const failedCalls = todayCalls?.filter(c => c.status === "failed").length || 0;

      return {
        totalUsers: totalUsers || 0,
        callsToday,
        revenueToday,
        failedCalls,
      };
    },
  });

  // Fetch recent call logs for activity
  const { data: recentCalls = [] } = useQuery({
    queryKey: ["admin-recent-calls"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("call_logs")
        .select("id, destination_country, status, started_at, cost")
        .order("started_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data || [];
    },
  });

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
          value={stats?.totalUsers.toLocaleString() || "0"}
          icon={<Users className="w-5 h-5" />}
          isLoading={isLoading}
        />
        <StatCard
          title="Calls Today"
          value={stats?.callsToday.toLocaleString() || "0"}
          icon={<Phone className="w-5 h-5" />}
          isLoading={isLoading}
        />
        <StatCard
          title="Revenue Today"
          value={`$${stats?.revenueToday.toFixed(2) || "0.00"}`}
          icon={<DollarSign className="w-5 h-5" />}
          isLoading={isLoading}
        />
        <StatCard
          title="Failed Calls"
          value={stats?.failedCalls.toString() || "0"}
          icon={<AlertTriangle className="w-5 h-5" />}
          isLoading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Alerts */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">System Status</h2>
            <Activity className="w-5 h-5 text-muted-foreground" />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-success/10">
              <div className="w-2 h-2 rounded-full bg-success mt-1.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">All systems operational</p>
                <p className="text-xs text-muted-foreground mt-0.5">Twilio connected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Recent Calls</h2>
          </div>
          
          <div className="space-y-3">
            {recentCalls.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recent calls</p>
            ) : (
              recentCalls.map((call) => (
                <div key={call.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-1.5",
                    call.status === "completed" ? "bg-success" : "bg-destructive"
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">Call to {call.destination_country}</span>
                      <span className="text-muted-foreground"> — ${Number(call.cost).toFixed(2)}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(call.started_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
