import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
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

const AdminTransactions = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Fetch transactions with user emails
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["admin-transactions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;

      // Fetch user emails for transactions
      const userIds = [...new Set((data || []).map(t => t.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, email")
        .in("id", userIds);

      const emailMap = new Map(profiles?.map(p => [p.id, p.email]) || []);

      return (data || []).map(tx => ({
        ...tx,
        user_email: emailMap.get(tx.user_id) || "Unknown",
      }));
    },
  });

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = 
      tx.user_email.toLowerCase().includes(search.toLowerCase()) ||
      tx.id.includes(search) ||
      (tx.stripe_payment_id && tx.stripe_payment_id.includes(search));
    
    const matchesType = typeFilter === "all" || tx.type === typeFilter;
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "topup":
        return <ArrowDownLeft className="w-4 h-4 text-success" />;
      case "call":
        return <ArrowUpRight className="w-4 h-4 text-muted-foreground" />;
      case "refund":
        return <ArrowDownLeft className="w-4 h-4 text-primary" />;
      case "adjustment":
        return <CreditCard className="w-4 h-4 text-warning" />;
      default:
        return <CreditCard className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "topup":
        return <Badge variant="outline" className="bg-success/10 text-success border-success/20">Top-up</Badge>;
      case "call":
        return <Badge variant="outline" className="bg-muted text-muted-foreground border-border">Call</Badge>;
      case "refund":
        return <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Refund</Badge>;
      case "adjustment":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Adjustment</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="bg-success/10 text-success border-success/20">Completed</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
      case "failed":
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalTopups = transactions
    .filter(t => t.type === "topup" && t.status === "completed")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const totalCalls = Math.abs(
    transactions
      .filter(t => t.type === "call")
      .reduce((sum, t) => sum + Number(t.amount), 0)
  );

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
          <h1 className="text-2xl font-bold text-foreground mb-1">Transactions</h1>
          <p className="text-muted-foreground">
            {transactions.length} total transactions
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4 shadow-card">
          <p className="text-sm text-muted-foreground mb-1">Total Top-ups</p>
          <p className="text-2xl font-bold text-success">${totalTopups.toFixed(2)}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 shadow-card">
          <p className="text-sm text-muted-foreground mb-1">Total Call Revenue</p>
          <p className="text-2xl font-bold text-foreground">${totalCalls.toFixed(2)}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 shadow-card">
          <p className="text-sm text-muted-foreground mb-1">Net Revenue</p>
          <p className="text-2xl font-bold text-primary">${(totalTopups - totalCalls).toFixed(2)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by email, ID, or Stripe ref..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[140px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="topup">Top-up</SelectItem>
            <SelectItem value="call">Call</SelectItem>
            <SelectItem value="refund">Refund</SelectItem>
            <SelectItem value="adjustment">Adjustment</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Transactions Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Transaction</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">User</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Type</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        {getTypeIcon(tx.type)}
                      </div>
                      <div>
                        <p className="font-mono text-sm text-muted-foreground">{tx.id.slice(0, 8)}...</p>
                        <p className="text-sm text-foreground">{tx.description || "No description"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {tx.user_email}
                  </td>
                  <td className="px-4 py-3">
                    {getTypeBadge(tx.type)}
                  </td>
                  <td className={cn(
                    "px-4 py-3 text-right font-mono font-medium",
                    Number(tx.amount) > 0 ? "text-success" : "text-foreground"
                  )}>
                    {Number(tx.amount) > 0 ? "+" : ""}${Math.abs(Number(tx.amount)).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {getStatusBadge(tx.status)}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {new Date(tx.created_at).toLocaleString()}
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

export default AdminTransactions;
