import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import ComparisonTable, { ComparisonFeature } from "@/components/compare/ComparisonTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";

const features: ComparisonFeature[] = [
  { feature: "Browser-based (no download)", zyracall: true, competitor: false },
  { feature: "Call real phone numbers (PSTN)", zyracall: true, competitor: true },
  { feature: "Pay-as-you-go for individuals", zyracall: true, competitor: "Enterprise" },
  { feature: "No complex setup", zyracall: true, competitor: false },
  { feature: "Real-time cost display", zyracall: true, competitor: false },
  { feature: "Call recording", zyracall: true, competitor: true },
  { feature: "200+ countries", zyracall: true, competitor: true },
  { feature: "Business phone system", zyracall: false, competitor: true },
  { feature: "Video conferencing", zyracall: false, competitor: true },
  { feature: "Team messaging", zyracall: false, competitor: true },
];

const ZyraCallVsVonage = () => {
  return (
    <>
      <Helmet>
        <title>ZyraCall vs Vonage: Simple Calling vs Enterprise | 2024</title>
        <meta 
          name="description" 
          content="Compare ZyraCall vs Vonage for international calls. ZyraCall offers simple browser-based calling for individuals while Vonage focuses on enterprise solutions." 
        />
        <link rel="canonical" href="https://zyracall.com/compare/zyracall-vs-vonage" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          {/* Hero */}
          <section className="relative py-16 lg:py-24 overflow-hidden">
            <div className="absolute inset-0 gradient-mesh" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <nav className="text-sm text-muted-foreground mb-8">
                  <Link to="/" className="hover:text-foreground">Home</Link>
                  <span className="mx-2">/</span>
                  <Link to="/compare" className="hover:text-foreground">Compare</Link>
                  <span className="mx-2">/</span>
                  <span className="text-foreground">ZyraCall vs Vonage</span>
                </nav>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                      <Phone className="w-8 h-8 text-accent" />
                    </div>
                    <span className="text-2xl font-bold text-muted-foreground">vs</span>
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-3xl">
                      ☎️
                    </div>
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">
                    ZyraCall vs Vonage:{" "}
                    <span className="gradient-text-accent">Simple vs Enterprise</span>
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Vonage is an enterprise communications platform. ZyraCall is built for 
                    individuals and small businesses who just need to make international calls.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                  Feature Comparison
                </h2>
                <ComparisonTable competitorName="Vonage" features={features} />
              </div>
            </div>
          </section>

          {/* Key Differences */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                  When to Choose Each
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <article className="bg-card border border-accent/30 rounded-2xl p-6 shadow-card">
                    <h3 className="font-semibold text-accent mb-3">Choose ZyraCall If...</h3>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li>• You're an individual or small business</li>
                      <li>• You need simple international calling</li>
                      <li>• You want pay-as-you-go without subscriptions</li>
                      <li>• You prefer browser-based simplicity</li>
                      <li>• You want transparent per-minute pricing</li>
                    </ul>
                  </article>
                  
                  <article className="bg-card border border-border/50 rounded-2xl p-6 shadow-card">
                    <h3 className="font-semibold text-muted-foreground mb-3">Choose Vonage If...</h3>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li>• You need a full business phone system</li>
                      <li>• You require video conferencing</li>
                      <li>• You need team messaging features</li>
                      <li>• You have an enterprise IT team</li>
                      <li>• You need complex call routing</li>
                    </ul>
                  </article>
                </div>
              </div>
            </div>
          </section>

          {/* Verdict */}
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold text-foreground mb-6">The Verdict</h2>
                <p className="text-muted-foreground mb-8">
                  Vonage is overkill if you just need to make international calls. ZyraCall 
                  provides exactly what individuals and small businesses need: simple, 
                  browser-based calling with transparent pricing. No enterprise complexity.
                </p>
                
                <Button 
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg h-14 px-8 text-base font-semibold group"
                  asChild
                >
                  <Link to="/signup">
                    Try ZyraCall Free
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
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

export default ZyraCallVsVonage;
