import { useState } from "react";
import { Phone, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import MobileNumberInterest from "@/components/intent-capture/MobileNumberInterest";

interface ContextualCTAProps {
  platformName: string;
  recommendedCountry: string;
  recommendedType: string;
  className?: string;
}

const ContextualCTA = ({ platformName, recommendedCountry, recommendedType, className }: ContextualCTAProps) => {
  const [showInterestForm, setShowInterestForm] = useState(false);

  // Map country name to code for prefilling
  const countryCodeMap: Record<string, string> = {
    "United States": "US",
    "United Kingdom": "GB",
    "Canada": "CA",
    "Australia": "AU",
    "Germany": "DE",
    "France": "FR",
    "India": "IN",
    "Philippines": "PH",
    "Mexico": "MX",
    "Nigeria": "NG",
    "Brazil": "BR",
    "Pakistan": "PK",
    "Kenya": "KE",
    "Ghana": "GH",
    "South Africa": "ZA",
    "Spain": "ES",
    "Italy": "IT",
    "Netherlands": "NL",
    "Singapore": "SG",
    "Japan": "JP",
  };

  const prefilledCountryCode = countryCodeMap[recommendedCountry] || "";

  if (showInterestForm) {
    return (
      <MobileNumberInterest
        source={`2fa-platform-${platformName.toLowerCase().replace(/\s+/g, '-')}`}
        prefilledPlatform={platformName}
        prefilledCountry={prefilledCountryCode}
        contextMessage={`We're building support for ${recommendedType} numbers optimized for ${platformName} verification.`}
        className={className}
      />
    );
  }

  return (
    <Card className={cn(
      "relative overflow-hidden border-accent/30",
      "bg-gradient-to-br from-accent/10 via-card/80 to-card",
      className
    )}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
      
      <CardContent className="relative p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-accent" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Need a {recommendedType} number for {platformName}?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We're building compliant mobile number support based on user demand. Tell us what you need to help us prioritize.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button 
              onClick={() => setShowInterestForm(true)}
              className="flex-shrink-0 gap-2 group"
            >
              <Phone className="w-4 h-4" />
              Tell Us What You Need
            </Button>
            <Button asChild variant="outline" className="flex-shrink-0">
              <Link to="/signup">
                Try Calling
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContextualCTA;
