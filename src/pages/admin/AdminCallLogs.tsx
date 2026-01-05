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
  Mic
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

interface CallLog {
  id: string;
  userId: string;
  userEmail: string;
  destination: string;
  country: string;
  provider: string;
  duration: string;
  cost: number;
  status: "completed" | "failed" | "no-answer" | "busy";
  failureReason?: string;
  hasRecording: boolean;
  timestamp: string;
}

const mockCallLogs: CallLog[] = [
  { id: "call_001", userId: "usr_001", userEmail: "john@company.com", destination: "+1 555 123 4567", country: "United States", provider: "Twilio", duration: "5:23", cost: 0.42, status: "completed", hasRecording: true, timestamp: "2026-01-05 14:32:15" },
  { id: "call_002", userId: "usr_002", userEmail: "sarah@startup.io", destination: "+44 20 7946 0958", country: "United Kingdom", provider: "Telnyx", duration: "2:10", cost: 0.18, status: "completed", hasRecording: false, timestamp: "2026-01-05 14:28:42" },
  { id: "call_003", userId: "usr_004", userEmail: "lisa@agency.co", destination: "+234 803 123 4567", country: "Nigeria", provider: "Twilio", duration: "0:00", cost: 0, status: "failed", failureReason: "Provider timeout", hasRecording: false, timestamp: "2026-01-05 14:15:08" },
  { id: "call_004", userId: "usr_001", userEmail: "john@company.com", destination: "+49 30 123 4567", country: "Germany", provider: "Telnyx", duration: "0:45", cost: 0.08, status: "no-answer", hasRecording: false, timestamp: "2026-01-05 13:55:22" },
  { id: "call_005", userId: "usr_006", userEmail: "david@consulting.com", destination: "+33 1 23 45 67 89", country: "France", provider: "Vonage", duration: "12:34", cost: 1.24, status: "completed", hasRecording: true, timestamp: "2026-01-05 13:42:55" },
  { id: "call_006", userId: "usr_002", userEmail: "sarah@startup.io", destination: "+81 3 1234 5678", country: "Japan", provider: "Twilio", duration: "0:00", cost: 0, status: "busy", hasRecording: false, timestamp: "2026-01-05 12:30:18" },
  { id: "call_007", userId: "usr_004", userEmail: "lisa@agency.co", destination: "+1 212 555 0199", country: "United States", provider: "Telnyx", duration: "8:15", cost: 0.68, status: "completed", hasRecording: true, timestamp: "2026-01-05 11:22:45" },
];

const AdminCallLogs = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [providerFilter, setProviderFilter] = useState<string>("all");
  const [callLogs] = useState<CallLog[]>(mockCallLogs);

  const filteredLogs = callLogs.filter((log) => {
    const matchesSearch = 
      log.destination.includes(search) ||
      log.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      log.country.toLowerCase().includes(search.toLowerCase()) ||
      log.id.includes(search);
    
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    const matchesProvider = providerFilter === "all" || log.provider === providerFilter;
    
    return matchesSearch && matchesStatus && matchesProvider;
  });

  const getStatusBadge = (status: CallLog["status"]) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="bg-success/10 text-success border-success/20">Completed</Badge>;
      case "failed":
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">Failed</Badge>;
      case "no-answer":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">No Answer</Badge>;
      case "busy":
        return <Badge variant="outline" className="bg-muted text-muted-foreground border-border">Busy</Badge>;
    }
  };

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

        <Select value={providerFilter} onValueChange={setProviderFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Providers</SelectItem>
            <SelectItem value="Twilio">Twilio</SelectItem>
            <SelectItem value="Telnyx">Telnyx</SelectItem>
            <SelectItem value="Vonage">Vonage</SelectItem>
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
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Provider</th>
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
                    {log.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {log.userEmail}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-mono text-foreground">{log.destination}</p>
                        <p className="text-xs text-muted-foreground">{log.country}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {log.provider}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-foreground">
                    {log.duration}
                  </td>
                  <td className={cn(
                    "px-4 py-3 text-right font-mono",
                    log.cost > 0 ? "text-foreground" : "text-muted-foreground"
                  )}>
                    ${log.cost.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex flex-col items-center gap-1">
                      {getStatusBadge(log.status)}
                      {log.failureReason && (
                        <span className="text-xs text-destructive">{log.failureReason}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {log.timestamp}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="iconSm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {log.hasRecording && (
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
