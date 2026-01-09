import { Link } from "react-router-dom";
import { ArrowRight, Check, X, Globe, MapPin, CreditCard, Shield, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SEOHead, { generateAlternativeSchema } from "@/components/seo/SEOHead";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const benefits = [
  {
    icon: Globe,
    title: "Available Worldwide",
    description: "Use ZyraCall from any country. No US number or residency required.",
  },
  {
    icon: MapPin,
    title: "True Global Coverage",
    description: "Call 200+ countries with competitive rates, not just the US.",
  },
  {
    icon: CreditCard,
    title: "Pay As You Go",
    description: "No monthly fees. Only pay for the minutes you actually use.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "No Google account needed. Your calls stay private.",
  },
  {
    icon: Zap,
    title: "Instant Access",
    description: "No approval process or waitlist. Start calling immediately.",
  },
  {
    icon: Users,
    title: "Business Ready",
    description: "Perfect for remote teams and international business calls.",
  },
];

const comparisonPoints = [
  { feature: "Available outside US", zyra: true, gvoice: false },
  { feature: "No Google account required", zyra: true, gvoice: false },
  { feature: "No US number needed", zyra: true, gvoice: false },
  { feature: "Instant signup", zyra: true, gvoice: false },
  { feature: "Pay-as-you-go pricing", zyra: true, gvoice: false },
  { feature: "200+ country coverage", zyra: true, gvoice: true },
  { feature: "Browser-based calling", zyra: true, gvoice: true },
  { feature: "HD voice quality", zyra: true, gvoice: true },
];

const limitations = [
  "Google Voice is only available in the United States",
  "Requires a US phone number to set up",
  "Limited international calling rates",
  "Tied to your Google account",
  "Personal version has feature limitations",
];

const breadcrumbs = [
  { name: "Home", url: "https://zyracall.com" },
  { name: "Alternatives", url: "https://zyracall.com/alternatives" },
  { name: "Google Voice Alternative", url: "https://zyracall.com/alternatives/google-voice-alternative" },
];

const GoogleVoiceAlternative = () => {
  return (
    <>
      <SEOHead
        title="Google Voice Alternative for Global International Calls | ZyraCall"
        description="Looking for a Google Voice alternative that works worldwide? ZyraCall offers browser-based calling from any country to 200+ destinations. No US number required."
        canonicalUrl="https://zyracall.com/alternatives/google-voice-alternative"
        keywords="Google Voice alternative, international calling, browser calling, global coverage, no US number, VoIP worldwide"
        breadcrumbs={breadcrumbs}
        ogImageTitle="Google Voice Alternative"
        ogImageSubtitle="Works worldwide, no US number required"
        ogImageType="alternative"
        structuredData={generateAlternativeSchema(
          "Google Voice",
          "https://zyracall.com/alternatives/google-voice-alternative",
          "Global browser-based calling service as a Google Voice alternative"
        )}
      />

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <Breadcrumb className="mb-8">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to="/">Home</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to="/alternatives">Alternatives</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Google Voice Alternative</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                
                <div className="text-center">
                  <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                    Google Voice Alternative
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                    Google Voice, But{" "}
                    <span className="text-primary">Available Everywhere</span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Google Voice is US-only. ZyraCall works from anywhere in the world, 
                    calling anywhere in the world. No restrictions.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild size="xl" variant="hero">
                      <Link to="/signup">
                        Get Started Free
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </Button>
                    <Button asChild size="xl" variant="heroOutline">
                      <Link to="/rates">See Global Rates</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Google Voice Limitations */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-4">
                  The Problem with Google Voice
                </h2>
                <p className="text-muted-foreground text-center mb-8">
                  Google Voice is great—if you're in the US. For everyone else, these are the limitations:
                </p>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <ul className="space-y-4">
                    {limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-4">
                Why ZyraCall is the Best Google Voice Alternative
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                All the convenience of browser-based calling, without the geographic restrictions.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {benefits.map((benefit, index) => (
                  <article key={index} className="bg-card border border-border rounded-2xl p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Comparison */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">
                  ZyraCall vs Google Voice
                </h2>
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-3 bg-muted/50 border-b border-border">
                    <div className="p-4 font-semibold">Feature</div>
                    <div className="p-4 font-semibold text-center text-primary">ZyraCall</div>
                    <div className="p-4 font-semibold text-center">Google Voice</div>
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
                        {point.gvoice ? (
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
                  Global Calling Without Borders
                </h2>
                <p className="text-muted-foreground mb-8">
                  Join thousands who use ZyraCall for truly global browser-based calling.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="xl" variant="hero">
                    <Link to="/signup">
                      Start Calling Today
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild size="xl" variant="outline">
                    <Link to="/compare/zyracall-vs-google-voice">Full Comparison</Link>
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

export default GoogleVoiceAlternative;
