import { useState } from "react";
import { Phone, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCallRates, getCountryFlag } from "@/hooks/useCallRates";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RateCalculatorProps {
  showCTA?: boolean;
  className?: string;
}

const RateCalculator = ({ showCTA = true, className = "" }: RateCalculatorProps) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [callType, setCallType] = useState<"mobile" | "landline">("mobile");
  const { data: rates = [], isLoading } = useCallRates();

  const selectedRate = rates.find((r) => r.country_name === selectedCountry);

  const currentRate = selectedRate
    ? callType === "mobile"
      ? selectedRate.mobile_rate
      : selectedRate.landline_rate
    : null;

  return (
    <div className={`bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-card ${className}`}>
      <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
        Calculate Your Call Cost
      </h3>

      {/* Country Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Where do you want to call?
        </label>
        {isLoading ? (
          <div className="flex items-center justify-center h-12 border border-border rounded-lg">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {rates
                .filter((rate) => rate.country_name && rate.country_name.trim() !== "" && rate.country_code && rate.country_code.trim() !== "")
                .map((rate) => (
                  <SelectItem key={rate.id} value={rate.country_name}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getCountryFlag(rate.country_name)}</span>
                      <span>{rate.country_name}</span>
                      <span className="text-muted-foreground text-sm">+{rate.country_code}</span>
                    </div>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Call Type Toggle */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Call type
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setCallType("mobile")}
            className={`h-12 rounded-lg font-medium transition-all ${
              callType === "mobile"
                ? "bg-accent text-accent-foreground"
                : "bg-muted/50 text-foreground hover:bg-muted"
            }`}
          >
            📱 Mobile
          </button>
          <button
            onClick={() => setCallType("landline")}
            className={`h-12 rounded-lg font-medium transition-all ${
              callType === "landline"
                ? "bg-accent text-accent-foreground"
                : "bg-muted/50 text-foreground hover:bg-muted"
            }`}
          >
            ☎️ Landline
          </button>
        </div>
      </div>

      {/* Rate Display */}
      <div className="bg-muted/30 rounded-xl p-6 mb-6 text-center">
        {selectedCountry && currentRate !== null ? (
          <>
            <p className="text-sm text-muted-foreground mb-2">
              {callType === "mobile" ? "Mobile" : "Landline"} rate to {selectedCountry}
            </p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-bold text-foreground">
                ${currentRate.toFixed(2)}
              </span>
              <span className="text-lg text-muted-foreground">/min</span>
            </div>
            <p className="text-sm text-success mt-3 font-medium">
              💰 Save up to 50x vs traditional carriers
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-2">Select a country to see rates</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold text-muted-foreground/50">$0.00</span>
              <span className="text-lg text-muted-foreground/50">/min</span>
            </div>
          </>
        )}
      </div>

      {/* CTA */}
      {showCTA && (
        <Button
          size="lg"
          className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold group"
          disabled={!selectedCountry}
          asChild
        >
          <Link to="/signup">
            <Phone className="w-5 h-5 mr-2" />
            {selectedCountry ? `Call ${selectedCountry} Now` : "Start Calling Free"}
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      )}
    </div>
  );
};

export default RateCalculator;
