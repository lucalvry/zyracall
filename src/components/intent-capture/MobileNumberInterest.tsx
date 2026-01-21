import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Smartphone, CheckCircle2, Info, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobileNumberInterest, UseCase } from "@/hooks/useMobileNumberInterest";

// Common countries for the dropdown
const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IN", name: "India" },
  { code: "PH", name: "Philippines" },
  { code: "MX", name: "Mexico" },
  { code: "NG", name: "Nigeria" },
  { code: "BR", name: "Brazil" },
  { code: "PK", name: "Pakistan" },
  { code: "KE", name: "Kenya" },
  { code: "GH", name: "Ghana" },
  { code: "ZA", name: "South Africa" },
  { code: "ES", name: "Spain" },
  { code: "IT", name: "Italy" },
  { code: "NL", name: "Netherlands" },
  { code: "SG", name: "Singapore" },
  { code: "JP", name: "Japan" },
];

interface MobileNumberInterestProps {
  source: string;
  prefilledPlatform?: string;
  prefilledCountry?: string;
  contextMessage?: string;
  compact?: boolean;
  className?: string;
}

const DISMISSED_KEY = "mobile-number-interest-dismissed";

const MobileNumberInterest = ({
  source,
  prefilledPlatform,
  prefilledCountry,
  contextMessage,
  compact = false,
  className,
}: MobileNumberInterestProps) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [platform, setPlatform] = useState(prefilledPlatform || "");
  const [countryCode, setCountryCode] = useState(prefilledCountry || "");
  const [useCase, setUseCase] = useState<UseCase>("2fa");
  const [email, setEmail] = useState("");
  
  const { submitInterest, isSubmitting, isSuccess, reset } = useMobileNumberInterest();

  // Check localStorage on mount
  useEffect(() => {
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10);
      // Re-show after 7 days
      if (Date.now() - dismissedTime < 7 * 24 * 60 * 60 * 1000) {
        setIsDismissed(true);
      }
    }
  }, []);

  // Update prefilled values when props change
  useEffect(() => {
    if (prefilledPlatform) setPlatform(prefilledPlatform);
    if (prefilledCountry) setCountryCode(prefilledCountry);
  }, [prefilledPlatform, prefilledCountry]);

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, Date.now().toString());
    setIsDismissed(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!countryCode) return;

    await submitInterest({
      platform: platform || undefined,
      country_code: countryCode,
      use_case: useCase,
      email: email || undefined,
      source_tool: source,
    });
  };

  if (isDismissed && !isSuccess) {
    return null;
  }

  // Success state
  if (isSuccess) {
    return (
      <Card className={cn("border-success/30 bg-success/5", className)}>
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Thank you for sharing!</p>
              <p className="text-sm text-muted-foreground mt-1">
                We'll use this to prioritize our mobile number expansion. No spam, ever.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const defaultMessage = "We're expanding support for compliant mobile numbers. Tell us what you need — no account required.";

  return (
    <Card className={cn(
      "relative border-accent/20 bg-gradient-to-br from-accent/5 via-card to-card",
      className
    )}>
      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>

      <CardContent className={cn("pt-5", compact ? "p-4" : "p-5")}>
        {/* Header */}
        <div className="flex items-start gap-3 mb-4 pr-6">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              Need a mobile number for verification?
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {contextMessage || defaultMessage}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={cn(
            "grid gap-4",
            compact ? "grid-cols-1" : "sm:grid-cols-2"
          )}>
            {/* Platform (optional) */}
            <div className="space-y-2">
              <Label htmlFor="platform" className="text-sm">
                Platform <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="platform"
                placeholder="e.g., WhatsApp, PayPal"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="bg-muted/30"
              />
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label htmlFor="country" className="text-sm">
                Preferred Country <span className="text-destructive">*</span>
              </Label>
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="bg-muted/30">
                  <SelectValue placeholder="Select country..." />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Use Case */}
          <div className="space-y-2">
            <Label className="text-sm">Use Case</Label>
            <RadioGroup
              value={useCase}
              onValueChange={(v) => setUseCase(v as UseCase)}
              className="flex flex-wrap gap-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2fa" id="2fa" />
                <Label htmlFor="2fa" className="text-sm font-normal cursor-pointer">
                  2FA Verification
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="business_calling" id="business" />
                <Label htmlFor="business" className="text-sm font-normal cursor-pointer">
                  Business
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="personal" id="personal" />
                <Label htmlFor="personal" className="text-sm font-normal cursor-pointer">
                  Personal
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Email (optional) */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm">
              Email <span className="text-muted-foreground">(optional, for updates)</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-muted/30"
            />
          </div>

          {/* Submit */}
          <Button 
            type="submit" 
            disabled={!countryCode || isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Interest"
            )}
          </Button>

          {/* Transparency notice */}
          <div className="flex items-start gap-2 pt-2">
            <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              This does not guarantee availability. We use responses to prioritize regions and platforms.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MobileNumberInterest;
