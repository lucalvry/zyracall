import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Wallet,
  Plus,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  type: "topup" | "call";
  amount: number;
  date: string;
  description: string;
  status: "completed" | "pending";
}

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "call",
    amount: -0.42,
    date: "2026-01-05 14:32",
    description: "Call to +1 555 123 4567",
    status: "completed",
  },
  {
    id: "2",
    type: "call",
    amount: -0.18,
    date: "2026-01-05 11:15",
    description: "Call to +44 20 7946 0958",
    status: "completed",
  },
  {
    id: "3",
    type: "topup",
    amount: 20.00,
    date: "2026-01-04 09:00",
    description: "Wallet top-up via Stripe",
    status: "completed",
  },
  {
    id: "4",
    type: "call",
    amount: -0.89,
    date: "2026-01-04 16:45",
    description: "Call to +33 1 23 45 67 89",
    status: "completed",
  },
  {
    id: "5",
    type: "topup",
    amount: 10.00,
    date: "2026-01-02 12:30",
    description: "Wallet top-up via Stripe",
    status: "completed",
  },
];

const topUpAmounts = [5, 10, 20, 50];

const WalletPage = () => {
  const [balance] = useState(25.50);
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [customAmount, setCustomAmount] = useState("");
  const { toast } = useToast();

  const handleTopUp = () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    toast({
      title: "Processing payment...",
      description: `Adding $${amount.toFixed(2)} to your wallet`,
    });
    setIsTopUpOpen(false);
    setCustomAmount("");
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">Wallet</h1>
          <p className="text-muted-foreground">
            Manage your balance and view transactions
          </p>
        </div>

        {/* Balance Card */}
        <div className="gradient-hero rounded-2xl p-8 mb-8 max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-primary-foreground/80 text-sm">Available Balance</p>
              <p className="text-3xl font-bold text-primary-foreground">
                ${balance.toFixed(2)}
              </p>
            </div>
          </div>

          <Dialog open={isTopUpOpen} onOpenChange={setIsTopUpOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <Plus className="w-5 h-5 mr-2" />
                Top Up Wallet
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Top Up Wallet</DialogTitle>
                <DialogDescription>
                  Add credits to your ZyraCall wallet
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4 space-y-4">
                {/* Preset amounts */}
                <div className="grid grid-cols-4 gap-2">
                  {topUpAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant={selectedAmount === amount && !customAmount ? "default" : "outline"}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount("");
                      }}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>

                {/* Custom amount */}
                <div className="space-y-2">
                  <Label htmlFor="custom">Custom amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="custom"
                      type="number"
                      min="5"
                      step="0.01"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>

                {/* Payment method */}
                <div className="p-4 rounded-lg bg-muted/50 border border-border flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Credit Card</p>
                    <p className="text-xs text-muted-foreground">Powered by Stripe</p>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsTopUpOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleTopUp}>
                  Pay ${customAmount || selectedAmount}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Transaction History */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Transaction History
          </h2>

          <div className="space-y-2">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
              >
                {/* Icon */}
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  tx.type === "topup" 
                    ? "bg-success/10 text-success"
                    : "bg-muted text-muted-foreground"
                )}>
                  {tx.type === "topup" ? (
                    <ArrowDownLeft className="w-5 h-5" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{tx.description}</p>
                  <p className="text-sm text-muted-foreground">{tx.date}</p>
                </div>

                {/* Status */}
                <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground">
                  {tx.status === "completed" ? (
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                  <span className="capitalize">{tx.status}</span>
                </div>

                {/* Amount */}
                <p className={cn(
                  "font-semibold",
                  tx.amount > 0 ? "text-success" : "text-foreground"
                )}>
                  {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WalletPage;
