import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SEOHead from "@/components/seo/SEOHead";
import PageHero from "@/components/common/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCallRates, useRatesLastUpdated } from "@/hooks/useCallRates";
import SavingsEstimator from "@/components/rate-calculator/SavingsEstimator";
import MobileNumberInterest from "@/components/intent-capture/MobileNumberInterest";
import { 
  Calculator, 
  Phone, 
  Globe, 
  TrendingDown, 
  ArrowRight,
  Clock,
  CheckCircle2,
  Smartphone,
  Building2,
  Info,
  AlertCircle,
  Zap,
  Users,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const rateCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "International Call Rate Calculator",
  "description": "Calculate international call costs to any country. Compare rates with competitors and see your potential savings.",
  "url": "https://zyracall.com/tools/rate-calculator",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Any (Browser-based)",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "provider": {
    "@type": "Organization",
    "name": "ZyraCall",
    "url": "https://zyracall.com"
  },
  "featureList": [
    "Per-minute rate lookup",
    "Call cost estimation",
    "Competitor price comparison",
    "Monthly savings calculator"
  ]
};

const popularRoutes = [
  { from: "US", to: "IN", name: "USA → India" },
  { from: "US", to: "PH", name: "USA → Philippines" },
  { from: "US", to: "MX", name: "USA → Mexico" },
  { from: "US", to: "NG", name: "USA → Nigeria" },
  { from: "UK", to: "IN", name: "UK → India" },
  { from: "CA", to: "PH", name: "Canada → Philippines" },
];

// Estimated competitor rates (approximate)
const competitorRates: Record<string, { skype: number; carrier: number }> = {
  'IN': { skype: 0.023, carrier: 1.50 },
  'PH': { skype: 0.055, carrier: 2.00 },
  'MX': { skype: 0.025, carrier: 1.20 },
  'NG': { skype: 0.088, carrier: 2.50 },
  'PK': { skype: 0.085, carrier: 2.20 },
  'BD': { skype: 0.045, carrier: 1.80 },
  'KE': { skype: 0.075, carrier: 2.00 },
  'GH': { skype: 0.150, carrier: 2.50 },
  'CN': { skype: 0.020, carrier: 1.50 },
  'GB': { skype: 0.025, carrier: 0.80 },
  'CA': { skype: 0.023, carrier: 0.50 },
  'BR': { skype: 0.055, carrier: 1.80 },
  'CO': { skype: 0.035, carrier: 1.50 },
  'VN': { skype: 0.088, carrier: 2.20 },
  'ZA': { skype: 0.055, carrier: 1.80 },
};

type UsageScenario = 'occasional' | 'regular' | 'heavy';

const usageScenarios = {
  occasional: { 
    label: "Occasional", 
    icon: Users, 
    description: "1-2 calls/week",
    monthlyMinutes: 20
  },
  regular: { 
    label: "Regular", 
    icon: Phone, 
    description: "Daily short calls",
    monthlyMinutes: 90
  },
  heavy: { 
    label: "Heavy", 
    icon: Briefcase, 
    description: "Sales/support teams",
    monthlyMinutes: 300
  },
};

const getVerdict = (
  ratePerMinute: number, 
  usageScenario: UsageScenario, 
  carrierSavings: number
): { type: 'success' | 'info' | 'warning'; icon: typeof CheckCircle2; message: string } => {
  // High savings from carrier = always good
  if (carrierSavings > 90) {
    if (usageScenario === 'heavy') {
      return { 
        type: 'success', 
        icon: Zap, 
        message: "Excellent value for high-volume teams" 
      };
    }
    return { 
      type: 'success', 
      icon: CheckCircle2, 
      message: "Cost-efficient for frequent callers" 
    };
  }

  // Very low rate = great for everyone
  if (ratePerMinute < 0.02) {
    return { 
      type: 'success', 
      icon: TrendingDown, 
      message: "Great rates for this destination" 
    };
  }

  // Moderate rate
  if (ratePerMinute < 0.10) {
    if (usageScenario === 'occasional') {
      return { 
        type: 'info', 
        icon: Info, 
        message: "Good for occasional use — no subscription needed" 
      };
    }
    return { 
      type: 'success', 
      icon: CheckCircle2, 
      message: "Cost-efficient for regular callers" 
    };
  }

  // Higher rate destination
  if (ratePerMinute >= 0.50) {
    return { 
      type: 'warning', 
      icon: AlertCircle, 
      message: "Premium destination — consider for important calls" 
    };
  }

  return { 
    type: 'info', 
    icon: Info, 
    message: "Competitive rates with pay-as-you-go flexibility" 
  };
};

const getUsageMessage = (scenario: UsageScenario): string => {
  switch (scenario) {
    case 'occasional':
      return "For occasional callers, ZyraCall's pay-as-you-go model means no wasted subscription fees.";
    case 'regular':
      return "Regular callers benefit from ZyraCall's low per-minute rates with no minimums.";
    case 'heavy':
      return "High-volume teams save significantly with ZyraCall's wholesale-level rates.";
  }
};

const RateCalculatorTool = () => {
  const { data: rates = [], isLoading } = useCallRates();
  const { data: lastUpdated } = useRatesLastUpdated();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [callType, setCallType] = useState<"mobile" | "landline">("mobile");
  const [duration, setDuration] = useState<number>(10);
  const [usageScenario, setUsageScenario] = useState<UsageScenario>('regular');

  const selectedRate = useMemo(() => {
    if (!selectedCountry || !rates.length) return null;
    return rates.find(r => r.country_code === selectedCountry);
  }, [selectedCountry, rates]);

  const calculations = useMemo(() => {
    if (!selectedRate) return null;

    const ratePerMinute = callType === "mobile" 
      ? selectedRate.mobile_rate 
      : selectedRate.landline_rate;
    
    const zyraTotal = ratePerMinute * duration;
    
    const competitors = competitorRates[selectedCountry] || { skype: ratePerMinute * 1.5, carrier: ratePerMinute * 15 };
    const skypeTotal = competitors.skype * duration;
    const carrierTotal = competitors.carrier * duration;

    const skypeSavings = ((skypeTotal - zyraTotal) / skypeTotal) * 100;
    const carrierSavings = ((carrierTotal - zyraTotal) / carrierTotal) * 100;

    return {
      ratePerMinute,
      zyraTotal,
      skypeTotal,
      carrierTotal,
      skypeSavings: Math.max(0, skypeSavings),
      carrierSavings: Math.max(0, carrierSavings),
    };
  }, [selectedRate, callType, duration, selectedCountry]);

  const verdict = useMemo(() => {
    if (!calculations) return null;
    return getVerdict(calculations.ratePerMinute, usageScenario, calculations.carrierSavings);
  }, [calculations, usageScenario]);

  const formattedLastUpdated = useMemo(() => {
    if (!lastUpdated) return null;
    try {
      return format(new Date(lastUpdated), "MMM d, yyyy");
    } catch {
      return null;
    }
  }, [lastUpdated]);

  return (
    <>
      <SEOHead
        title="International Call Rate Calculator - Compare & Save | ZyraCall"
        description="Calculate international call costs to any country. Compare rates with Skype and traditional carriers. See how much you can save with ZyraCall."
        canonicalUrl="https://zyracall.com/tools/rate-calculator"
        keywords="international calling rates, call cost calculator, cheap international calls, VoIP rates comparison"
        ogImageTitle="Rate Calculator"
        ogImageSubtitle="Calculate Your International Call Costs"
        breadcrumbs={[
          { name: "Home", url: "https://zyracall.com" },
          { name: "Tools", url: "https://zyracall.com/tools" },
          { name: "Rate Calculator", url: "https://zyracall.com/tools/rate-calculator" },
        ]}
        structuredData={[rateCalculatorSchema]}
      />

      <Header />

      <main className="min-h-screen bg-background pb-16">
        <PageHero
          badge={{ icon: Calculator, text: "Rate Calculator" }}
          title="International Rate Calculator"
          description="See exactly how much your international calls will cost. Compare with other services and discover how much you can save."
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Calculator Section */}
              <div className="lg:col-span-3 space-y-6">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-accent" />
                      Select Destination
                    </CardTitle>
                    <CardDescription>
                      Choose a country to see calling rates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Country Selector */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Destination Country</label>
                      <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a country..." />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {isLoading ? (
                            <SelectItem value="loading" disabled>Loading countries...</SelectItem>
                          ) : (
                            rates
                              .filter((rate) => rate.country_code && rate.country_code.trim() !== "")
                              .map((rate) => (
                                <SelectItem key={rate.country_code} value={rate.country_code}>
                                  {rate.country_name} (+{rate.country_code})
                                </SelectItem>
                              ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Popular Routes */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Popular Routes</label>
                      <div className="flex flex-wrap gap-2">
                        {popularRoutes.map((route) => (
                          <Button
                            key={route.to}
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedCountry(route.to)}
                            className={cn(
                              selectedCountry === route.to && "bg-accent/10 border-accent text-accent"
                            )}
                          >
                            {route.name}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Call Type */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Call Type</label>
                      <Tabs value={callType} onValueChange={(v) => setCallType(v as "mobile" | "landline")}>
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="mobile" className="gap-2">
                            <Smartphone className="w-4 h-4" />
                            Mobile
                          </TabsTrigger>
                          <TabsTrigger value="landline" className="gap-2">
                            <Building2 className="w-4 h-4" />
                            Landline
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>

                    {/* Usage Scenario Toggle */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">How often do you call internationally?</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(Object.entries(usageScenarios) as [UsageScenario, typeof usageScenarios.occasional][]).map(([key, scenario]) => {
                          const Icon = scenario.icon;
                          return (
                            <button
                              key={key}
                              onClick={() => setUsageScenario(key)}
                              className={cn(
                                "flex flex-col items-center gap-1 p-3 rounded-lg border transition-all",
                                usageScenario === key 
                                  ? "bg-accent/10 border-accent text-accent" 
                                  : "bg-muted/30 border-border/50 hover:bg-muted/50"
                              )}
                            >
                              <Icon className="w-4 h-4" />
                              <span className="text-xs font-medium">{scenario.label}</span>
                              <span className="text-[10px] text-muted-foreground">{scenario.description}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Duration Slider */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium">Call Duration</label>
                        <Badge variant="outline" className="text-accent border-accent">
                          <Clock className="w-3 h-3 mr-1" />
                          {duration} minutes
                        </Badge>
                      </div>
                      <Slider
                        value={[duration]}
                        onValueChange={(v) => setDuration(v[0])}
                        min={1}
                        max={60}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>1 min</span>
                        <span>30 min</span>
                        <span>60 min</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Results Card */}
                {calculations && selectedRate && (
                  <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <Phone className="w-5 h-5 text-accent" />
                        Estimated Cost
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <span>{duration} min {callType} call to {selectedRate.country_name}</span>
                        <span className="text-muted-foreground/60">•</span>
                        <span className="text-xs">${calculations.ratePerMinute.toFixed(4)}/min</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Main Price */}
                      <div className="text-center py-4">
                        <div className="text-5xl font-bold text-accent mb-1">
                          ${calculations.zyraTotal.toFixed(2)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          with ZyraCall
                        </p>
                      </div>

                      {/* Verdict Badge */}
                      {verdict && (
                        <div className={cn(
                          "flex items-center gap-2 p-3 rounded-lg",
                          verdict.type === 'success' && "bg-success/10 border border-success/20",
                          verdict.type === 'info' && "bg-info/10 border border-info/20",
                          verdict.type === 'warning' && "bg-warning/10 border border-warning/20"
                        )}>
                          <verdict.icon className={cn(
                            "w-5 h-5 flex-shrink-0",
                            verdict.type === 'success' && "text-success",
                            verdict.type === 'info' && "text-info",
                            verdict.type === 'warning' && "text-warning"
                          )} />
                          <span className={cn(
                            "text-sm font-medium",
                            verdict.type === 'success' && "text-success",
                            verdict.type === 'info' && "text-info",
                            verdict.type === 'warning' && "text-warning"
                          )}>
                            {verdict.message}
                          </span>
                        </div>
                      )}

                      {/* Comparison Summary */}
                      <div className="space-y-2 pt-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Comparison</p>
                        <div className="space-y-2">
                          {calculations.carrierSavings > 0 && (
                            <div className="flex items-center justify-between text-sm p-2 rounded bg-muted/30">
                              <span className="text-muted-foreground">Traditional carriers</span>
                              <span>
                                ~${calculations.carrierTotal.toFixed(2)}
                                <Badge variant="outline" className="ml-2 bg-success/10 text-success border-success/20 text-xs">
                                  save {Math.round(calculations.carrierSavings)}%
                                </Badge>
                              </span>
                            </div>
                          )}
                          <div className="flex items-center justify-between text-sm p-2 rounded bg-muted/30">
                            <span className="text-muted-foreground">Popular VoIP apps</span>
                            <span>
                              ~${calculations.skypeTotal.toFixed(2)}
                              {calculations.skypeSavings > 5 ? (
                                <Badge variant="outline" className="ml-2 bg-success/10 text-success border-success/20 text-xs">
                                  save {Math.round(calculations.skypeSavings)}%
                                </Badge>
                              ) : calculations.skypeSavings >= -5 ? (
                                <Badge variant="outline" className="ml-2 text-xs">
                                  comparable
                                </Badge>
                              ) : null}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Usage-based message */}
                      <p className="text-sm text-muted-foreground italic">
                        {getUsageMessage(usageScenario)}
                      </p>

                      {/* Conversion CTA */}
                      <div className="pt-4 border-t border-border/50">
                        <p className="text-sm text-center text-muted-foreground mb-3">
                          Want predictable international calling? ZyraCall offers transparent global rates.
                        </p>
                        <Button asChild className="w-full" size="lg">
                          <Link to="/signup">
                            Start Calling Free
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>

                      {/* Trust Signals & Disclaimers */}
                      <div className="pt-3 border-t border-border/30 space-y-1">
                        {formattedLastUpdated && (
                          <p className="text-xs text-muted-foreground text-center">
                            Rates last updated: {formattedLastUpdated}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground text-center">
                          Taxes and local fees may apply. All rates in USD.
                        </p>
                        <p className="text-xs text-muted-foreground/70 text-center">
                          International rates vary by routing and destination.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {!selectedCountry && (
                  <Card className="border-dashed border-2 border-border/50 bg-muted/20">
                    <CardContent className="py-12 text-center">
                      <Globe className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        Select a destination country above to see rates
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2 space-y-6">
                {/* Why ZyraCall */}
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Why ZyraCall?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">No Hidden Fees</p>
                        <p className="text-sm text-muted-foreground">
                          What you see is what you pay. No connection fees.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">HD Voice Quality</p>
                        <p className="text-sm text-muted-foreground">
                          Crystal-clear calls with adaptive bitrate.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Pay As You Go</p>
                        <p className="text-sm text-muted-foreground">
                          No subscriptions. Only pay for what you use.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Call from Browser</p>
                        <p className="text-sm text-muted-foreground">
                          No app downloads. Call directly from your browser.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Mobile Number Interest - compact version */}
                {selectedCountry && (
                  <MobileNumberInterest 
                    source="rate-calculator"
                    prefilledCountry={selectedCountry}
                    contextMessage="We're exploring mobile-based calling options for frequent international callers."
                    compact
                  />
                )}

                {/* Monthly Savings Estimator */}
                <SavingsEstimator rates={rates} />

                {/* Related Tools */}
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Related Tools</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link 
                      to="/tools/webrtc-tester"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium">Network Quality Test</p>
                        <p className="text-xs text-muted-foreground">Test your connection</p>
                      </div>
                    </Link>
                    <Link 
                      to="/tools/2fa-finder"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Globe className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium">2FA Finder</p>
                        <p className="text-xs text-muted-foreground">Check SMS compatibility</p>
                      </div>
                    </Link>
                    <Link 
                      to="/rates"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Calculator className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium">Full Rate List</p>
                        <p className="text-xs text-muted-foreground">View all country rates</p>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RateCalculatorTool;
