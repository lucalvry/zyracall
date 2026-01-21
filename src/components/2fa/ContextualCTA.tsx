import { Phone, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ContextualCTAProps {
  platformName: string;
  recommendedCountry: string;
  recommendedType: string;
  className?: string;
}

const ContextualCTA = ({ platformName, recommendedCountry, recommendedType, className }: ContextualCTAProps) => {
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
              Get a Compliant Number for {platformName}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Get a {recommendedCountry} {recommendedType} number optimized for {platformName} verification with ZyraCall.
            </p>
          </div>
          
          <Button asChild className="flex-shrink-0 gap-2 group">
            <Link to="/signup">
              <Phone className="w-4 h-4" />
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContextualCTA;
