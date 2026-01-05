import { Wallet, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WalletBalanceProps {
  balance: number;
  currency?: string;
  onTopUp: () => void;
  className?: string;
}

const WalletBalance = ({ balance, currency = "USD", onTopUp, className }: WalletBalanceProps) => {
  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(balance);

  const isLowBalance = balance < 5;

  return (
    <div className={cn(
      "flex items-center gap-4 p-4 rounded-xl bg-card border border-border shadow-card",
      className
    )}>
      <div className={cn(
        "w-10 h-10 rounded-lg flex items-center justify-center",
        isLowBalance ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary"
      )}>
        <Wallet className="w-5 h-5" />
      </div>
      
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">Balance</p>
        <p className={cn(
          "text-xl font-semibold",
          isLowBalance ? "text-warning" : "text-foreground"
        )}>
          {formattedBalance}
        </p>
      </div>

      <Button variant="wallet" size="sm" onClick={onTopUp} className="gap-1">
        <Plus className="w-4 h-4" />
        Top up
      </Button>
    </div>
  );
};

export default WalletBalance;
