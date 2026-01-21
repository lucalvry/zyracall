import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingDown, DollarSign, ArrowRight, Clock } from "lucide-react";

interface Rate {
  country_code: string;
  country_name: string;
  mobile_rate: number;
}

interface SavingsEstimatorProps {
  rates: Rate[];
}

// Carrier rates per minute (estimated averages for international calls)
const carrierRates: Record<string, number> = {
  'IN': 1.50,
  'PH': 2.00,
  'MX': 1.20,
  'NG': 2.50,
  'PK': 2.20,
  'BD': 1.80,
  'CN': 1.50,
  'GB': 0.80,
  'CA': 0.50,
  'BR': 1.80,
  'CO': 1.50,
  'VN': 2.20,
  'ZA': 1.80,
  'KE': 2.00,
  'GH': 2.50,
  'EG': 1.60,
  'AU': 0.70,
  'DE': 0.60,
  'FR': 0.60,
  'JP': 0.90,
  'KR': 0.80,
};

const SavingsEstimator = ({ rates }: SavingsEstimatorProps) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [monthlyMinutes, setMonthlyMinutes] = useState<number>(60);

  const calculations = useMemo(() => {
    if (!selectedCountry) return null;
    
    const rate = rates.find(r => r.country_code === selectedCountry);
    if (!rate) return null;

    const zyraMonthly = rate.mobile_rate * monthlyMinutes;
    const carrierRate = carrierRates[selectedCountry] || 1.50;
    const carrierMonthly = carrierRate * monthlyMinutes;
    
    const monthlySavings = carrierMonthly - zyraMonthly;
    const annualSavings = monthlySavings * 12;
    const savingsPercent = carrierMonthly > 0 
      ? ((carrierMonthly - zyraMonthly) / carrierMonthly) * 100 
      : 0;

    return {
      zyraMonthly,
      carrierMonthly,
      monthlySavings,
      annualSavings,
      savingsPercent: Math.max(0, savingsPercent),
      countryName: rate.country_name,
    };
  }, [selectedCountry, monthlyMinutes, rates]);

  return (
    <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-success/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-success" />
          Monthly Savings Estimator
        </CardTitle>
        <CardDescription>
          See how much you could save by switching to ZyraCall
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Country selector */}
        <div>
          <label className="text-sm font-medium mb-2 block">Country you call most</label>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a country..." />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {rates
                .filter(rate => rate.country_code && rate.country_code.trim() !== "")
                .map(rate => (
                  <SelectItem key={rate.country_code} value={rate.country_code}>
                    {rate.country_name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Minutes slider */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium">Monthly calling minutes</label>
            <Badge variant="outline">
              <Clock className="w-3 h-3 mr-1" />
              {monthlyMinutes} min/month
            </Badge>
          </div>
          <Slider
            value={[monthlyMinutes]}
            onValueChange={(v) => setMonthlyMinutes(v[0])}
            min={10}
            max={500}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>10 min</span>
            <span>250 min</span>
            <span>500 min</span>
          </div>
        </div>

        {/* Results */}
        {calculations && (
          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">With Carrier</p>
                <p className="text-lg font-semibold line-through text-muted-foreground">
                  ${calculations.carrierMonthly.toFixed(2)}/mo
                </p>
              </div>
              <div className="text-center p-3 rounded-lg bg-success/10 border border-success/20">
                <p className="text-xs text-success mb-1">With ZyraCall</p>
                <p className="text-lg font-semibold text-success">
                  ${calculations.zyraMonthly.toFixed(2)}/mo
                </p>
              </div>
            </div>

            <div className="text-center p-4 rounded-lg bg-gradient-to-r from-accent/10 to-success/10 border border-accent/20">
              <p className="text-xs text-muted-foreground mb-1">Estimated Annual Savings</p>
              <div className="flex items-center justify-center gap-1">
                <DollarSign className="w-6 h-6 text-success" />
                <span className="text-3xl font-bold text-success">
                  {calculations.annualSavings.toFixed(0)}
                </span>
              </div>
              <Badge className="mt-2 bg-success/10 text-success border-success/20">
                Save {Math.round(calculations.savingsPercent)}% vs carriers
              </Badge>
            </div>

            <Button asChild className="w-full" size="sm">
              <Link to="/signup">
                Start Saving Today
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        )}

        {!selectedCountry && (
          <div className="text-center py-4 text-sm text-muted-foreground">
            Select a country to see your potential savings
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavingsEstimator;
