import { useState, useEffect } from "react";
import { Phone, Globe, Zap, ArrowRight, Check, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const countries = [
  { flag: "🇺🇸", name: "USA", code: "+1" },
  { flag: "🇬🇧", name: "UK", code: "+44" },
  { flag: "🇮🇳", name: "India", code: "+91" },
  { flag: "🇳🇬", name: "Nigeria", code: "+234" },
  { flag: "🇵🇭", name: "Philippines", code: "+63" },
  { flag: "🇩🇪", name: "Germany", code: "+49" },
  { flag: "🇨🇦", name: "Canada", code: "+1" },
  { flag: "🇦🇺", name: "Australia", code: "+61" },
];

const Hero = () => {
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentCountryIndex((prev) => (prev + 1) % countries.length);
        setIsAnimating(false);
      }, 200);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const currentCountry = countries[currentCountryIndex];

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
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              {/* Animated Country CTA */}
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 h-14 px-8 text-base font-semibold group relative overflow-hidden"
                asChild
              >
                <Link to="/signup" className="flex items-center gap-3">
                  <span 
                    className={`text-2xl transition-all duration-200 ${isAnimating ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}
                  >
                    {currentCountry.flag}
                  </span>
                  <span className="flex flex-col items-start leading-tight">
                    <span className="text-xs opacity-80">Call anyone in</span>
                    <span 
                      className={`font-bold transition-all duration-200 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
                    >
                      {currentCountry.name}
                    </span>
                  </span>
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
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

            {/* Pricing Hook */}
            <div 
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8 animate-fade-in"
              style={{ animationDelay: "0.35s" }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium">
                From $0.02/min
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium">
                Save on international calls
              </span>
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

          {/* Right Content - Enhanced Phone Mockup */}
          <div 
            className="relative hidden lg:flex justify-center animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative w-[280px] h-[560px] bg-foreground rounded-[3rem] p-2 shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground rounded-b-2xl z-10" />
                
                {/* Screen */}
                <div className="w-full h-full bg-card rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between px-6 py-3 bg-muted/50">
                    <span className="text-xs text-muted-foreground">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 border border-muted-foreground rounded-sm relative">
                        <div className="absolute inset-0.5 bg-success rounded-sm" style={{ width: '80%' }} />
                      </div>
                    </div>
                  </div>

                  {/* Balance Card */}
                  <div className="px-5 py-3">
                    <div className="flex items-center justify-between bg-accent/10 rounded-xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-accent" />
                        <span className="text-xs text-muted-foreground">Balance</span>
                      </div>
                      <span className="text-sm font-bold text-foreground">$25.00</span>
                    </div>
                  </div>

                  {/* Active Call Display */}
                  <div className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl">{currentCountry.flag}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">Calling {currentCountry.name}</p>
                    <p className="text-xl font-semibold text-foreground tracking-tight mb-1">
                      {currentCountry.code} 20 7946 0958
                    </p>
                    <p className="text-xs text-accent font-medium">$0.02/min · 02:34</p>
                  </div>

                  {/* Keypad */}
                  <div className="px-5 py-2">
                    <div className="grid grid-cols-3 gap-2">
                      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
                        <div 
                          key={key}
                          className="h-12 flex flex-col items-center justify-center rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                        >
                          <span className="text-lg font-medium text-foreground">{key}</span>
                          {key !== '*' && key !== '#' && key !== '0' && (
                            <span className="text-[8px] text-muted-foreground tracking-widest">
                              {key === '1' ? '' : key === '2' ? 'ABC' : key === '3' ? 'DEF' : key === '4' ? 'GHI' : key === '5' ? 'JKL' : key === '6' ? 'MNO' : key === '7' ? 'PQRS' : key === '8' ? 'TUV' : 'WXYZ'}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call Button */}
                  <div className="px-5 py-4">
                    <button className="w-full h-14 rounded-2xl bg-call-end hover:bg-call-end/90 text-call-end-foreground font-semibold flex items-center justify-center gap-2 transition-all shadow-lg call-pulse">
                      <Phone className="w-5 h-5 rotate-[135deg]" />
                      End Call
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -left-20 top-24 bg-card border border-border/50 rounded-xl p-3 shadow-lg animate-float">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">2.3s connect</span>
                </div>
              </div>

              <div className="absolute -right-16 bottom-32 bg-card border border-border/50 rounded-xl p-3 shadow-lg animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">HD Quality</span>
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
