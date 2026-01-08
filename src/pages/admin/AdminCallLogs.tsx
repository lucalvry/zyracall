import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter,
  Phone,
  Download,
  Eye,
  Mic,
  Loader2
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const AdminCallLogs = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Fetch call logs with user emails
  const { data: callLogs = [], isLoading } = useQuery({
    queryKey: ["admin-call-logs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("call_logs")
        .select("*")
        .order("started_at", { ascending: false })
        .limit(100);

      if (error) throw error;

      // Fetch user emails
      const userIds = [...new Set((data || []).map(c => c.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, email")
        .in("id", userIds);

      const emailMap = new Map(profiles?.map(p => [p.id, p.email]) || []);

      return (data || []).map(log => ({
        ...log,
        user_email: emailMap.get(log.user_id) || "Unknown",
      }));
    },
  });

  const filteredLogs = callLogs.filter((log) => {
    const matchesSearch = 
      log.destination_number.includes(search) ||
      log.user_email.toLowerCase().includes(search.toLowerCase()) ||
      log.destination_country.toLowerCase().includes(search.toLowerCase()) ||
      log.id.includes(search);
    
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="bg-success/10 text-success border-success/20">Completed</Badge>;
      case "failed":
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">Failed</Badge>;
      case "no-answer":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">No Answer</Badge>;
      case "busy":
        return <Badge variant="outline" className="bg-muted text-muted-foreground border-border">Busy</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Call Logs</h1>
          <p className="text-muted-foreground">
            {callLogs.length} total calls
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by number, email, country, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="no-answer">No Answer</SelectItem>
            <SelectItem value="busy">Busy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Call Logs Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Call ID</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">User</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Destination</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Duration</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Cost</th>
                <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Time</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-mono text-muted-foreground">
                    {log.id.slice(0, 8)}...
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {log.user_email}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-mono text-foreground">{log.destination_number}</p>
                        <p className="text-xs text-muted-foreground">{log.destination_country}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-foreground">
                    {formatDuration(log.duration_seconds)}
                  </td>
                  <td className={cn(
                    "px-4 py-3 text-right font-mono",
                    Number(log.cost) > 0 ? "text-foreground" : "text-muted-foreground"
                  )}>
                    ${Number(log.cost).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {getStatusBadge(log.status)}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {new Date(log.started_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="iconSm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {log.recording_url && (
                        <Button variant="ghost" size="iconSm">
                          <Mic className="w-4 h-4 text-primary" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCallLogs;
