import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X, Globe, Monitor, CreditCard, Shield, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const ViberAlternative = () => {
  const benefits = [
    {
      icon: Monitor,
      title: "Pure Browser Experience",
      description: "No app to download or sync. Open your browser and start calling instantly.",
    },
    {
      icon: CreditCard,
      title: "Transparent Pricing",
      description: "Clear per-minute rates. No hidden fees, no Viber Out credits that expire.",
    },
    {
      icon: Globe,
      title: "200+ Countries",
      description: "Competitive rates to call landlines and mobiles worldwide.",
    },
    {
      icon: Shield,
      title: "Secure Calls",
      description: "Enterprise-grade encryption protects every conversation.",
    },
    {
      icon: Zap,
      title: "HD Quality",
      description: "WebRTC technology ensures crystal-clear audio quality.",
    },
    {
      icon: Clock,
      title: "No Expiry",
      description: "Your credit balance never expires. Use it when you need it.",
    },
  ];

  const comparisonPoints = [
    { feature: "No app installation", zyra: true, viber: false },
    { feature: "Browser-based calling", zyra: true, viber: false },
    { feature: "Credits never expire", zyra: true, viber: false },
    { feature: "No phone sync required", zyra: true, viber: false },
    { feature: "Works on any device", zyra: true, viber: true },
    { feature: "Call real numbers", zyra: true, viber: true },
    { feature: "HD voice quality", zyra: true, viber: true },
  ];

  return (
    <>
      <Helmet>
        <title>Viber Out Alternative: Browser-Based International Calling | ZyraCall</title>
        <meta 
          name="description" 
          content="Looking for a Viber Out alternative? ZyraCall offers browser-based calling to 200+ countries. No app needed, no credit expiry, transparent per-minute pricing." 
        />
        <meta name="keywords" content="Viber Out alternative, Viber alternative, browser calling, international calls, no app" />
        <link rel="canonical" href="https://zyracall.com/alternatives/viber-out-alternative" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  Viber Out Alternative
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Better Than{" "}
                  <span className="text-primary">Viber Out</span>
                  {" "}for International Calls
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Skip the app, skip the expiring credits. ZyraCall gives you instant browser-based 
                  calling with transparent pricing and credits that never expire.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="xl" variant="hero">
                    <Link to="/signup">
                      Try ZyraCall Free
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild size="xl" variant="heroOutline">
                    <Link to="/rates">Compare Rates</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-12">
                Why Switch from Viber Out
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-card border border-border rounded-2xl p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Comparison */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">
                  ZyraCall vs Viber Out
                </h2>
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-3 bg-muted/50 border-b border-border">
                    <div className="p-4 font-semibold">Feature</div>
                    <div className="p-4 font-semibold text-center text-primary">ZyraCall</div>
                    <div className="p-4 font-semibold text-center">Viber Out</div>
                  </div>
                  {comparisonPoints.map((point, index) => (
                    <div 
                      key={index} 
                      className="grid grid-cols-3 border-b border-border last:border-0"
                    >
                      <div className="p-4 text-sm">{point.feature}</div>
                      <div className="p-4 flex justify-center">
                        {point.zyra ? (
                          <Check className="w-5 h-5 text-success" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="p-4 flex justify-center">
                        {point.viber ? (
                          <Check className="w-5 h-5 text-success" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 lg:py-24 bg-primary/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Leave Viber Out Behind?
                </h2>
                <p className="text-muted-foreground mb-8">
                  Start making browser-based international calls today. No downloads required.
                </p>
                <Button asChild size="xl" variant="hero">
                  <Link to="/signup">
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ViberAlternative;
