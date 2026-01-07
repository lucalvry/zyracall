import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X, Globe, Phone, Shield, Zap, Users, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const WhatsAppAlternative = () => {
  const benefits = [
    {
      icon: Phone,
      title: "Call Any Number",
      description: "Reach landlines and mobiles worldwide, not just WhatsApp users.",
    },
    {
      icon: Globe,
      title: "No App Download",
      description: "Works directly in your browser on any device. No installation needed.",
    },
    {
      icon: Users,
      title: "No Contact Needed",
      description: "Call anyone with a phone number. They don't need any app.",
    },
    {
      icon: Shield,
      title: "Business Ready",
      description: "Professional calling from any device. Perfect for work travel.",
    },
    {
      icon: Zap,
      title: "Crystal Clear Audio",
      description: "WebRTC-powered HD voice for reliable call quality.",
    },
    {
      icon: CreditCard,
      title: "Simple Pricing",
      description: "Pay-as-you-go with transparent per-minute rates.",
    },
  ];

  const comparisonPoints = [
    { feature: "Call non-app users", zyra: true, whatsapp: false },
    { feature: "Call landlines", zyra: true, whatsapp: false },
    { feature: "No phone number required", zyra: true, whatsapp: false },
    { feature: "Browser-based calling", zyra: true, whatsapp: false },
    { feature: "No app installation", zyra: true, whatsapp: false },
    { feature: "Works without contacts", zyra: true, whatsapp: false },
    { feature: "HD voice quality", zyra: true, whatsapp: true },
    { feature: "End-to-end encryption", zyra: true, whatsapp: true },
  ];

  const useCases = [
    {
      title: "Business Travelers",
      description: "Call clients and hotels without sharing your personal number.",
    },
    {
      title: "Calling Family Abroad",
      description: "Reach parents and grandparents on their landlines.",
    },
    {
      title: "Emergency Contacts",
      description: "Call any business or service when you need them.",
    },
    {
      title: "Work From Anywhere",
      description: "Make professional calls from any computer or device.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>WhatsApp Calling Alternative for Real Phone Numbers | ZyraCall</title>
        <meta 
          name="description" 
          content="Need to call landlines or non-WhatsApp users? ZyraCall lets you call any phone number worldwide from your browser. No app needed, pay-as-you-go pricing." 
        />
        <meta name="keywords" content="WhatsApp alternative, call landlines, international calling, browser calling, no app" />
        <link rel="canonical" href="https://zyracall.com/alternatives/whatsapp-calling-alternative" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  WhatsApp Alternative
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Call Anyone, Not Just{" "}
                  <span className="text-primary">WhatsApp Users</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  WhatsApp only calls other WhatsApp users. ZyraCall lets you reach any phone number 
                  worldwide—landlines, mobiles, and businesses.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="xl" variant="hero">
                    <Link to="/signup">
                      Start Calling Now
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild size="xl" variant="heroOutline">
                    <Link to="/rates">View Rates</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-4">
                When WhatsApp Isn't Enough
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                ZyraCall fills the gap when you need to reach people outside the WhatsApp ecosystem.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {useCases.map((useCase, index) => (
                  <div key={index} className="bg-card border border-border rounded-2xl p-6 text-center">
                    <h3 className="font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-sm text-muted-foreground">{useCase.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-12">
                Why Choose ZyraCall Over WhatsApp Calling
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
                  ZyraCall vs WhatsApp Calling
                </h2>
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-3 bg-muted/50 border-b border-border">
                    <div className="p-4 font-semibold">Feature</div>
                    <div className="p-4 font-semibold text-center text-primary">ZyraCall</div>
                    <div className="p-4 font-semibold text-center">WhatsApp</div>
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
                        {point.whatsapp ? (
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
                  Go Beyond WhatsApp
                </h2>
                <p className="text-muted-foreground mb-8">
                  Start calling any phone number in the world. No app downloads, no subscriptions.
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

export default WhatsAppAlternative;
