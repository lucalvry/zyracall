import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Shield, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface ZyraCallCTAProps {
  variant?: "default" | "compact" | "inline";
  className?: string;
}

const ZyraCallCTA = ({ variant = "default", className }: ZyraCallCTAProps) => {
  if (variant === "inline") {
    return (
      <div className={cn(
        "flex items-center gap-4 p-4 rounded-xl bg-accent/5 border border-accent/20",
        className
      )}>
        <Phone className="w-5 h-5 text-accent flex-shrink-0" />
        <p className="text-sm text-muted-foreground flex-1">
          Need a reliable international number for 2FA?{" "}
          <Link to="/signup" className="text-accent hover:underline font-medium">
            Try ZyraCall
          </Link>
        </p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn(
        "p-5 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20",
        className
      )}>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">Need a reliable number?</h4>
            <p className="text-sm text-muted-foreground mt-1">
              ZyraCall offers compliant global numbers that work with most platforms.
            </p>
            <Button asChild size="sm" className="mt-3 bg-accent hover:bg-accent/90">
              <Link to="/signup">
                Get Started <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Default full CTA
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 via-accent/10 to-transparent border border-accent/30",
      className
    )}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      <div className="relative p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
              <Phone className="w-4 h-4" />
              ZyraCall
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Need a reliable international number for 2FA?
            </h3>
            
            <p className="mt-3 text-muted-foreground max-w-xl">
              ZyraCall offers compliant global numbers that work with most verification platforms. 
              Browser-based calling with no apps required.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-accent" />
                Compliant numbers
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="w-4 h-4 text-accent" />
                200+ countries
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="outline" className="border-accent/50 hover:bg-accent/10">
              <Link to="/rates">View Rates</Link>
            </Button>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/25">
              <Link to="/signup">
                Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZyraCallCTA;
