import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X, Globe, CreditCard, Smartphone, Shield, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const SkypeAlternative = () => {
  const benefits = [
    {
      icon: Globe,
      title: "No App Required",
      description: "Make calls directly from your browser. No downloads, no updates, no storage needed.",
    },
    {
      icon: CreditCard,
      title: "Pay-As-You-Go",
      description: "No monthly fees or subscriptions. Only pay for the minutes you use.",
    },
    {
      icon: Smartphone,
      title: "Call Real Numbers",
      description: "Reach any landline or mobile number worldwide, not just app users.",
    },
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description: "Your calls are secured with enterprise-grade encryption.",
    },
    {
      icon: Zap,
      title: "Crystal Clear Quality",
      description: "HD voice powered by WebRTC technology for reliable connections.",
    },
    {
      icon: Clock,
      title: "No Credit Expiry",
      description: "Your balance never expires. Use it whenever you need.",
    },
  ];

  const comparisonPoints = [
    { feature: "Browser-based calling", zyra: true, skype: false },
    { feature: "No app installation required", zyra: true, skype: false },
    { feature: "Pay-as-you-go pricing", zyra: true, skype: false },
    { feature: "No monthly subscription", zyra: true, skype: false },
    { feature: "Credits never expire", zyra: true, skype: false },
    { feature: "Works on any device", zyra: true, skype: true },
    { feature: "Call real phone numbers", zyra: true, skype: true },
    { feature: "HD voice quality", zyra: true, skype: true },
    { feature: "200+ countries coverage", zyra: true, skype: true },
  ];

  const painPoints = [
    {
      problem: "Tired of downloading and updating apps?",
      solution: "ZyraCall runs entirely in your browser. No installations, no updates, no app bloat.",
    },
    {
      problem: "Frustrated with Skype's subscription model?",
      solution: "With ZyraCall, you only pay for what you use. No monthly commitments.",
    },
    {
      problem: "Worried about Skype credit expiring?",
      solution: "Your ZyraCall balance never expires. Top up once, use whenever you need.",
    },
    {
      problem: "Need to call from a work computer?",
      solution: "ZyraCall works on any device with a browser. No admin rights needed.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Best Skype Alternative for International Calls | ZyraCall</title>
        <meta 
          name="description" 
          content="Looking for a Skype alternative? ZyraCall offers browser-based international calling with no app downloads, no subscriptions, and competitive rates to 200+ countries." 
        />
        <meta name="keywords" content="Skype alternative, international calling, browser calling, no app, pay as you go" />
        <link rel="canonical" href="https://zyracall.com/alternatives/skype-alternative" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  Skype Alternative
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  The Modern{" "}
                  <span className="text-primary">Skype Alternative</span>{" "}
                  for International Calls
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Tired of app downloads and subscriptions? ZyraCall lets you call any phone number 
                  worldwide directly from your browser. No app required.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="xl" variant="hero">
                    <Link to="/signup">
                      Try ZyraCall Free
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild size="xl" variant="heroOutline">
                    <Link to="/rates">See Our Rates</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Pain Points Section */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Why People Switch from Skype
                </h2>
                <div className="space-y-6">
                  {painPoints.map((point, index) => (
                    <div key={index} className="bg-card border border-border rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {point.problem}
                      </h3>
                      <p className="text-muted-foreground">
                        {point.solution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-4">
                Why ZyraCall is the Best Skype Alternative
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Everything you need for international calling, without the hassle.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          {/* Comparison Table */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">
                  ZyraCall vs Skype Comparison
                </h2>
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-3 bg-muted/50 border-b border-border">
                    <div className="p-4 font-semibold">Feature</div>
                    <div className="p-4 font-semibold text-center text-primary">ZyraCall</div>
                    <div className="p-4 font-semibold text-center">Skype</div>
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
                        {point.skype ? (
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

          {/* CTA Section */}
          <section className="py-16 lg:py-24 bg-primary/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Switch from Skype?
                </h2>
                <p className="text-muted-foreground mb-8">
                  Join thousands who've discovered a better way to make international calls.
                  Start with a free trial today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="xl" variant="hero">
                    <Link to="/signup">
                      Get Started Free
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild size="xl" variant="outline">
                    <Link to="/compare/zyracall-vs-skype">Full Comparison</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SkypeAlternative;
