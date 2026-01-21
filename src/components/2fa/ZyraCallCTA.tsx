import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Globe, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import MobileNumberInterest from "@/components/intent-capture/MobileNumberInterest";

interface ZyraCallCTAProps {
  variant?: "default" | "compact" | "inline";
  className?: string;
}

const ZyraCallCTA = ({ variant = "default", className }: ZyraCallCTAProps) => {
  const [showInterestForm, setShowInterestForm] = useState(false);

  if (variant === "inline") {
    return (
      <div className={cn(
        "flex items-center gap-4 p-4 rounded-xl bg-accent/5 border border-accent/20",
        className
      )}>
        <Phone className="w-5 h-5 text-accent flex-shrink-0" />
        <p className="text-sm text-muted-foreground flex-1">
          Many users struggle with blocked virtual numbers. We're building compliant mobile options.{" "}
          <button 
            onClick={() => setShowInterestForm(true)}
            className="text-accent hover:underline font-medium"
          >
            Tell us what you need
          </button>
        </p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("space-y-4", className)}>
        {showInterestForm ? (
          <MobileNumberInterest 
            source="2fa-finder-compact"
            contextMessage="Many users struggle with blocked virtual numbers. We're building compliant mobile options for high-risk verification."
          />
        ) : (
          <div className="p-5 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">Looking for a verification number?</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  We're expanding support for compliant mobile numbers based on user demand.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button 
                    size="sm" 
                    onClick={() => setShowInterestForm(true)}
                    className="bg-accent hover:bg-accent/90"
                  >
                    Join the Waitlist
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/signup">
                      Try Calling <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default full CTA
  return (
    <div className={cn("space-y-6", className)}>
      {showInterestForm ? (
        <MobileNumberInterest 
          source="2fa-finder"
          contextMessage="Many users struggle with blocked virtual numbers. We're building compliant mobile options for high-risk verification."
        />
      ) : (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 via-accent/10 to-transparent border border-accent/30">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          
          <div className="relative p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  Coming Soon
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  Looking for a mobile number that works for verification?
                </h3>
                
                <p className="mt-3 text-muted-foreground max-w-xl">
                  Many platforms block virtual and VoIP numbers. We're building compliant mobile 
                  number support based on real user demand. Join the waitlist to help us prioritize.
                </p>
                
                <div className="flex flex-wrap items-center gap-4 mt-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="w-4 h-4 text-accent" />
                    Expanding globally
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 text-accent" />
                    Browser calling available now
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => setShowInterestForm(true)}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/25"
                >
                  Join the Waitlist <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button asChild variant="outline" className="border-accent/50 hover:bg-accent/10">
                  <Link to="/signup">Try Calling Instead</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Secondary CTA for calling */}
      {!showInterestForm && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Phone className="w-4 h-4" />
          <span>Already have a number?</span>
          <Link to="/signup" className="text-accent hover:underline font-medium">
            Make crystal-clear calls from your browser →
          </Link>
        </div>
      )}
    </div>
  );
};

export default ZyraCallCTA;
