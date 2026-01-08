import { Phone, Globe, Zap, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8 animate-fade-in"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>Browser-based calling — No apps required</span>
            </div>

            {/* Headline */}
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.1] animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Call any phone{" "}
              <span className="gradient-text-accent">worldwide</span>
              <br className="hidden sm:block" />
              from your browser
            </h1>

            {/* Subheadline */}
            <p 
              className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Simple, reliable international calling without apps or SIM cards. 
              Just open your browser and dial any number in 200+ countries.
            </p>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 h-14 px-8 text-base font-semibold group"
                asChild
              >
                <Link to="/signup">
                  <Phone className="w-5 h-5 mr-2" />
                  Start Calling Free
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-border/60 hover:bg-muted/50 h-14 px-8 text-base font-medium"
                asChild
              >
                <Link to="/rates">
                  View Rates
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div 
              className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                <span>200+ countries</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                <span>Pay-as-you-go</span>
              </div>
            </div>
          </div>

          {/* Right Content - Compact Dialer Preview */}
          <div 
            className="relative hidden lg:flex justify-center animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="relative max-w-sm">
              {/* Subtle glow */}
              <div className="absolute inset-0 bg-accent/5 rounded-3xl blur-2xl scale-110" />
              
              {/* Dialer Card */}
              <div className="relative bg-card border border-border/50 rounded-2xl shadow-xl p-6 backdrop-blur-sm">
                {/* Active Call Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Calling United Kingdom</p>
                    <p className="text-lg font-semibold text-foreground tracking-tight">+44 20 7946 0958</p>
                  </div>
                </div>

                {/* Mini Keypad - Just top row hint */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {['1', '2', '3'].map((key) => (
                    <div 
                      key={key}
                      className="h-11 flex items-center justify-center rounded-lg bg-muted/40 text-foreground font-medium"
                    >
                      {key}
                    </div>
                  ))}
                </div>

                {/* Call Button */}
                <button className="w-full h-12 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-semibold flex items-center justify-center gap-2 transition-all shadow-md">
                  <Phone className="w-4 h-4" />
                  Call Now
                </button>

                {/* Rate */}
                <p className="text-center text-xs text-muted-foreground mt-4">
                  UK Mobile · <span className="text-foreground font-medium">$0.02/min</span>
                </p>
              </div>

              {/* Single floating stat */}
              <div className="absolute -left-16 top-1/2 -translate-y-1/2 bg-card border border-border/50 rounded-xl p-3 shadow-lg animate-float">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">2.3s connect</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
