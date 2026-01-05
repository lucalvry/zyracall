import { Phone, Globe, CreditCard, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/30" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Globe className="w-4 h-4" />
            <span>Browser-based calling — No apps required</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Call any phone number worldwide —{" "}
            <span className="text-primary">from your browser</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            ZyraCall brings back simple, reliable international calling. No SIM cards, 
            no installations. Just open your browser and dial.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/signup">
                <Phone className="w-5 h-5" />
                Start Calling
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/rates">
                View Rates
              </Link>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <FeatureCard 
              icon={<Zap className="w-5 h-5" />}
              title="No Apps"
              description="Works directly in your browser"
            />
            <FeatureCard 
              icon={<Globe className="w-5 h-5" />}
              title="Global Reach"
              description="Call 200+ countries worldwide"
            />
            <FeatureCard 
              icon={<CreditCard className="w-5 h-5" />}
              title="Pay-as-you-go"
              description="Transparent per-minute pricing"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <div className="flex flex-col items-center p-6 rounded-xl bg-card border border-border/50 shadow-card hover:shadow-md transition-shadow">
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
      {icon}
    </div>
    <h3 className="font-semibold text-foreground mb-1">{title}</h3>
    <p className="text-sm text-muted-foreground text-center">{description}</p>
  </div>
);

export default Hero;
