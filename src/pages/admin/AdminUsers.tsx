import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MoreVertical, 
  Ban, 
  CreditCard,
  Eye,
  Mail,
  Loader2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface UserWithWallet {
  id: string;
  email: string | null;
  display_name: string | null;
  created_at: string;
  wallet_balance: number;
}

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserWithWallet | null>(null);
  const [walletDialogOpen, setWalletDialogOpen] = useState(false);
  const [walletAmount, setWalletAmount] = useState("");
  const [walletReason, setWalletReason] = useState("");
  const [walletAction, setWalletAction] = useState<"credit" | "debit">("credit");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch users with their wallet balances
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      // Fetch profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, email, display_name, created_at")
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch wallets
      const { data: wallets, error: walletsError } = await supabase
        .from("wallets")
        .select("user_id, balance");

      if (walletsError) throw walletsError;

      // Combine data
      const walletMap = new Map(wallets?.map(w => [w.user_id, w.balance]) || []);
      
      return (profiles || []).map(profile => ({
        id: profile.id,
        email: profile.email,
        display_name: profile.display_name,
        created_at: profile.created_at,
        wallet_balance: walletMap.get(profile.id) || 0,
      })) as UserWithWallet[];
    },
  });

  // Wallet adjustment mutation
  const walletMutation = useMutation({
    mutationFn: async ({ userId, amount, type, reason }: { 
      userId: string; 
      amount: number; 
      type: "credit" | "debit";
      reason: string;
    }) => {
      // Get current wallet
      const { data: wallet, error: walletError } = await supabase
        .from("wallets")
        .select("id, balance")
        .eq("user_id", userId)
        .single();

      if (walletError) throw walletError;

      const adjustedAmount = type === "credit" ? amount : -amount;
      const newBalance = wallet.balance + adjustedAmount;

      if (newBalance < 0) {
        throw new Error("Insufficient balance for debit");
      }

      // Update wallet balance
      const { error: updateError } = await supabase
        .from("wallets")
        .update({ balance: newBalance })
        .eq("id", wallet.id);

      if (updateError) throw updateError;

      // Create transaction record
      const { error: txError } = await supabase
        .from("transactions")
        .insert({
          user_id: userId,
          wallet_id: wallet.id,
          amount: adjustedAmount,
          type: "adjustment",
          description: `Admin ${type}: ${reason}`,
          status: "completed",
        });

      if (txError) throw txError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast({
        title: `Wallet ${walletAction === "credit" ? "credited" : "debited"}`,
        description: `$${walletAmount} ${walletAction === "credit" ? "added to" : "removed from"} ${selectedUser?.email}`,
      });
      setWalletDialogOpen(false);
      setWalletAmount("");
      setWalletReason("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const filteredUsers = users.filter(
    (user) =>
      (user.email?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (user.display_name?.toLowerCase() || "").includes(search.toLowerCase()) ||
      user.id.includes(search)
  );

  const handleWalletAction = () => {
    if (!selectedUser || !walletAmount || !walletReason) return;
    
    walletMutation.mutate({
      userId: selectedUser.id,
      amount: parseFloat(walletAmount),
      type: walletAction,
      reason: walletReason,
    });
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
          <h1 className="text-2xl font-bold text-foreground mb-1">User Management</h1>
          <p className="text-muted-foreground">
            {users.length} total users
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by email, name, or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">User</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">ID</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Balance</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Joined</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-foreground">{user.display_name || "No name"}</p>
                      <p className="text-sm text-muted-foreground">{user.email || "No email"}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-mono text-muted-foreground">
                    {user.id.slice(0, 8)}...
                  </td>
                  <td className={cn(
                    "px-4 py-3 text-right font-mono",
                    user.wallet_balance > 0 ? "text-foreground" : "text-muted-foreground"
                  )}>
                    ${user.wallet_balance.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="iconSm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => {
                            setSelectedUser(user);
                            setWalletAction("credit");
                            setWalletDialogOpen(true);
                          }}
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Credit Wallet
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => {
                            setSelectedUser(user);
                            setWalletAction("debit");
                            setWalletDialogOpen(true);
                          }}
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Debit Wallet
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Wallet Adjustment Dialog */}
      <Dialog open={walletDialogOpen} onOpenChange={setWalletDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {walletAction === "credit" ? "Credit" : "Debit"} Wallet
            </DialogTitle>
            <DialogDescription>
              {walletAction === "credit" 
                ? "Add credits to" 
                : "Remove credits from"
              } {selectedUser?.email}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={walletAmount}
                  onChange={(e) => setWalletAmount(e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason (required)</Label>
              <Textarea
                id="reason"
                placeholder="Enter reason for this adjustment..."
                value={walletReason}
                onChange={(e) => setWalletReason(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setWalletDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleWalletAction}
              variant={walletAction === "credit" ? "default" : "destructive"}
              disabled={!walletAmount || !walletReason || walletMutation.isPending}
            >
              {walletMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                `${walletAction === "credit" ? "Credit" : "Debit"} $${walletAmount || "0.00"}`
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminUsers;
