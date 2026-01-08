import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
  CheckCircle2,
  Loader2,
  AlertCircle
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
import { useWallet, useTransactions, useCreateCheckoutSession } from "@/hooks/useWallet";

const topUpAmounts = [5, 10, 20, 50];

const WalletPage = () => {
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [customAmount, setCustomAmount] = useState("");
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const { data: wallet, isLoading: walletLoading, error: walletError } = useWallet();
  const { data: transactions = [], isLoading: txLoading } = useTransactions();
  const createCheckout = useCreateCheckoutSession();

  // Handle success/cancel from Stripe redirect
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      toast({
        title: "Payment successful!",
        description: "Your wallet has been topped up.",
      });
    } else if (searchParams.get("canceled") === "true") {
      toast({
        title: "Payment canceled",
        description: "Your wallet top-up was canceled.",
        variant: "destructive",
      });
    }
  }, [searchParams, toast]);

  const handleTopUp = async () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    
    if (amount < 5) {
      toast({
        title: "Minimum amount",
        description: "Minimum top-up amount is $5",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await createCheckout.mutateAsync(amount);
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create checkout session",
        variant: "destructive",
      });
    }
  };

  const balance = wallet?.balance ?? 0;

  if (walletLoading) {
    return (
      <DashboardLayout>
        <div className="p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (walletError) {
    return (
      <DashboardLayout>
        <div className="p-6 lg:p-8">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <p className="text-destructive">Failed to load wallet data. Please try again.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
                ${Number(balance).toFixed(2)}
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
                      placeholder="Enter amount (min $5)"
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
                <Button onClick={handleTopUp} disabled={createCheckout.isPending}>
                  {createCheckout.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay $${customAmount || selectedAmount}`
                  )}
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

          {txLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Wallet className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No transactions yet</p>
              <p className="text-sm">Top up your wallet to get started</p>
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
                >
                  {/* Icon */}
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    tx.type === "credit" 
                      ? "bg-success/10 text-success"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {tx.type === "credit" ? (
                      <ArrowDownLeft className="w-5 h-5" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{tx.description || "Transaction"}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(tx.created_at).toLocaleString()}
                    </p>
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
                    tx.type === "credit" ? "text-success" : "text-foreground"
                  )}>
                    {tx.type === "credit" ? "+" : "-"}${Math.abs(Number(tx.amount)).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WalletPage;
