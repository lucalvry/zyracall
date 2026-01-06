import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const rates = [
  { country: "United States", flag: "🇺🇸", landline: "$0.01", mobile: "$0.02" },
  { country: "United Kingdom", flag: "🇬🇧", landline: "$0.01", mobile: "$0.02" },
  { country: "India", flag: "🇮🇳", landline: "$0.02", mobile: "$0.02" },
  { country: "Nigeria", flag: "🇳🇬", landline: "$0.08", mobile: "$0.10" },
  { country: "Philippines", flag: "🇵🇭", landline: "$0.05", mobile: "$0.08" },
  { country: "Germany", flag: "🇩🇪", landline: "$0.01", mobile: "$0.02" },
];

const PricingPreview = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" id="pricing">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        {/* Rates Table */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-card border border-border/50 rounded-2xl shadow-card overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-muted/50 border-b border-border/50 text-sm font-medium text-muted-foreground">
              <div className="col-span-2">Country</div>
              <div className="text-right">Landline</div>
              <div className="text-right">Mobile</div>
            </div>

            {/* Table Rows */}
            {rates.map((rate, index) => (
              <div 
                key={rate.country}
                className={`grid grid-cols-4 gap-4 px-6 py-4 items-center hover:bg-muted/30 transition-colors ${
                  index !== rates.length - 1 ? "border-b border-border/30" : ""
                }`}
              >
                <div className="col-span-2 flex items-center gap-3">
                  <span className="text-2xl">{rate.flag}</span>
                  <span className="font-medium text-foreground">{rate.country}</span>
                </div>
                <div className="text-right">
                  <span className="text-foreground font-medium">{rate.landline}</span>
                  <span className="text-muted-foreground text-sm">/min</span>
                </div>
                <div className="text-right">
                  <span className="text-foreground font-medium">{rate.mobile}</span>
                  <span className="text-muted-foreground text-sm">/min</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            variant="outline"
            size="lg"
            className="border-border hover:bg-muted/50 h-12 px-6 group"
            asChild
          >
            <Link to="/rates">
              View All Rates
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;
