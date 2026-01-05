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
  Mail
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

interface User {
  id: string;
  email: string;
  name: string;
  balance: number;
  totalSpend: number;
  status: "active" | "suspended" | "blocked";
  signupDate: string;
  lastActive: string;
}

const mockUsers: User[] = [
  { id: "usr_001", email: "john@company.com", name: "John Smith", balance: 45.20, totalSpend: 234.50, status: "active", signupDate: "2025-11-15", lastActive: "2026-01-05" },
  { id: "usr_002", email: "sarah@startup.io", name: "Sarah Johnson", balance: 12.80, totalSpend: 89.30, status: "active", signupDate: "2025-12-01", lastActive: "2026-01-05" },
  { id: "usr_003", email: "mike@enterprise.com", name: "Mike Chen", balance: 0.00, totalSpend: 567.90, status: "suspended", signupDate: "2025-10-20", lastActive: "2025-12-28" },
  { id: "usr_004", email: "lisa@agency.co", name: "Lisa Wang", balance: 102.50, totalSpend: 1234.00, status: "active", signupDate: "2025-09-05", lastActive: "2026-01-04" },
  { id: "usr_005", email: "fraudster@temp.com", name: "Unknown", balance: 0.00, totalSpend: 45.00, status: "blocked", signupDate: "2026-01-02", lastActive: "2026-01-02" },
  { id: "usr_006", email: "david@consulting.com", name: "David Brown", balance: 28.90, totalSpend: 456.70, status: "active", signupDate: "2025-11-28", lastActive: "2026-01-05" },
];

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [users] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [walletDialogOpen, setWalletDialogOpen] = useState(false);
  const [walletAmount, setWalletAmount] = useState("");
  const [walletReason, setWalletReason] = useState("");
  const [walletAction, setWalletAction] = useState<"credit" | "debit">("credit");
  const { toast } = useToast();

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.id.includes(search)
  );

  const handleWalletAction = () => {
    if (!selectedUser || !walletAmount || !walletReason) return;
    
    toast({
      title: `Wallet ${walletAction === "credit" ? "credited" : "debited"}`,
      description: `$${walletAmount} ${walletAction === "credit" ? "added to" : "removed from"} ${selectedUser.email}`,
    });
    
    setWalletDialogOpen(false);
    setWalletAmount("");
    setWalletReason("");
  };

  const handleSuspend = (user: User) => {
    toast({
      title: "User suspended",
      description: `${user.email} has been suspended`,
    });
  };

  const handleBlock = (user: User) => {
    toast({
      title: "User blocked",
      description: `${user.email} has been blocked`,
    });
  };

  const getStatusBadge = (status: User["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-success/10 text-success border-success/20">Active</Badge>;
      case "suspended":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Suspended</Badge>;
      case "blocked":
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">Blocked</Badge>;
    }
  };

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
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Total Spend</th>
                <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Signup</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-mono text-muted-foreground">
                    {user.id}
                  </td>
                  <td className={cn(
                    "px-4 py-3 text-right font-mono",
                    user.balance > 0 ? "text-foreground" : "text-muted-foreground"
                  )}>
                    ${user.balance.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-foreground">
                    ${user.totalSpend.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {user.signupDate}
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
                        <DropdownMenuItem>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Email
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
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-warning"
                          onClick={() => handleSuspend(user)}
                        >
                          <Ban className="w-4 h-4 mr-2" />
                          Suspend User
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleBlock(user)}
                        >
                          <Ban className="w-4 h-4 mr-2" />
                          Block User
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
              disabled={!walletAmount || !walletReason}
            >
              {walletAction === "credit" ? "Credit" : "Debit"} ${walletAmount || "0.00"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminUsers;
