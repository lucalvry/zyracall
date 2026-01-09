import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import RateCalculator from "@/components/rates/RateCalculator";

const PricingPreview = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" id="pricing">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-accent font-medium text-sm tracking-wide uppercase mb-4">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
            Simple, per-minute rates.{" "}
            <span className="gradient-text-accent">No hidden fees.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pay only for what you use. Check rates for any country before you call.
          </p>
        </div>

        {/* Rate Calculator */}
        <div className="max-w-lg mx-auto mb-12">
          <RateCalculator />
        </div>

        {/* Secondary CTA */}
        <div className="text-center">
          <Button 
            variant="outline"
            size="lg"
            className="border-border hover:bg-muted/50 h-12 px-6 group"
            asChild
          >
            <Link to="/rates">
              View All Country Rates
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;
