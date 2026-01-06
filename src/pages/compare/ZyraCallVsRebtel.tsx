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
  { feature: "Pay-as-you-go pricing", zyracall: true, competitor: true },
  { feature: "No app required", zyracall: true, competitor: false },
  { feature: "Real-time cost display", zyracall: true, competitor: false },
  { feature: "Call recording", zyracall: true, competitor: false },
  { feature: "200+ countries", zyracall: true, competitor: true },
  { feature: "Subscription plans", zyracall: false, competitor: true },
  { feature: "Local number calling", zyracall: false, competitor: true },
  { feature: "Works on any device with browser", zyracall: true, competitor: false },
];

const ZyraCallVsRebtel = () => {
  return (
    <>
      <Helmet>
        <title>ZyraCall vs Rebtel: Browser Calling vs App-Based | 2024</title>
        <meta 
          name="description" 
          content="Compare ZyraCall vs Rebtel for international calls. ZyraCall offers browser-based calling with no app downloads and transparent pay-as-you-go pricing." 
        />
        <link rel="canonical" href="https://zyracall.com/compare/zyracall-vs-rebtel" />
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
                  <span className="text-foreground">ZyraCall vs Rebtel</span>
                </nav>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                      <Phone className="w-8 h-8 text-accent" />
                    </div>
                    <span className="text-2xl font-bold text-muted-foreground">vs</span>
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-3xl">
                      📱
                    </div>
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">
                    ZyraCall vs Rebtel:{" "}
                    <span className="gradient-text-accent">Complete Comparison</span>
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Rebtel offers app-based calling with unique local number features. 
                    See how ZyraCall's browser-based approach compares.
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
                <ComparisonTable competitorName="Rebtel" features={features} />
              </div>
            </div>
          </section>

          {/* Key Differences */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                  Why Choose ZyraCall Over Rebtel
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <article className="bg-card border border-border/50 rounded-2xl p-6 shadow-card">
                    <h3 className="font-semibold text-foreground mb-3">No App Download</h3>
                    <p className="text-muted-foreground text-sm">
                      Rebtel requires installing their mobile app. ZyraCall works directly in your 
                      browser on any device — phone, tablet, or computer.
                    </p>
                  </article>
                  
                  <article className="bg-card border border-border/50 rounded-2xl p-6 shadow-card">
                    <h3 className="font-semibold text-foreground mb-3">Pure Pay-As-You-Go</h3>
                    <p className="text-muted-foreground text-sm">
                      While Rebtel pushes subscription plans, ZyraCall offers simple pay-as-you-go. 
                      Add credit when you need it, no recurring charges.
                    </p>
                  </article>
                  
                  <article className="bg-card border border-border/50 rounded-2xl p-6 shadow-card">
                    <h3 className="font-semibold text-foreground mb-3">Call Recording Built-In</h3>
                    <p className="text-muted-foreground text-sm">
                      ZyraCall includes optional call recording at no extra cost. Perfect for 
                      business calls or keeping records of important conversations.
                    </p>
                  </article>
                  
                  <article className="bg-card border border-border/50 rounded-2xl p-6 shadow-card">
                    <h3 className="font-semibold text-foreground mb-3">Live Cost Display</h3>
                    <p className="text-muted-foreground text-sm">
                      Watch your call cost in real-time as you talk. ZyraCall provides complete 
                      transparency that Rebtel doesn't offer.
                    </p>
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
                  Rebtel's local number feature can save money on specific routes, but ZyraCall's 
                  browser-based simplicity, call recording, and transparent pricing make it the 
                  better choice for most users who value convenience and flexibility.
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

export default ZyraCallVsRebtel;
