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
  { feature: "No monthly subscription", zyracall: true, competitor: false },
  { feature: "Real-time cost display", zyracall: true, competitor: false },
  { feature: "Call recording", zyracall: true, competitor: true },
  { feature: "200+ countries", zyracall: true, competitor: true },
  { feature: "Video calling", zyracall: false, competitor: true },
  { feature: "Instant messaging", zyracall: false, competitor: true },
  { feature: "Works on any device with browser", zyracall: true, competitor: false },
];

const ZyraCallVsSkype = () => {
  return (
    <>
      <Helmet>
        <title>ZyraCall vs Skype: Best Alternative for International Calling | 2024</title>
        <meta 
          name="description" 
          content="Compare ZyraCall vs Skype for international calls. ZyraCall offers browser-based calling with no downloads, transparent pricing, and real-time cost display." 
        />
        <link rel="canonical" href="https://zyracall.com/compare/zyracall-vs-skype" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "ZyraCall vs Skype: Complete Comparison for International Calling",
            "description": "Compare ZyraCall and Skype for international phone calls. See features, pricing, and which service is best for your needs.",
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          {/* Hero */}
          <section className="relative py-16 lg:py-24 overflow-hidden">
            <div className="absolute inset-0 gradient-mesh" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <nav className="text-sm text-muted-foreground mb-8">
                  <Link to="/" className="hover:text-foreground">Home</Link>
                  <span className="mx-2">/</span>
                  <Link to="/compare" className="hover:text-foreground">Compare</Link>
                  <span className="mx-2">/</span>
                  <span className="text-foreground">ZyraCall vs Skype</span>
                </nav>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                      <Phone className="w-8 h-8 text-accent" />
                    </div>
                    <span className="text-2xl font-bold text-muted-foreground">vs</span>
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-3xl">
                      💬
                    </div>
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">
                    ZyraCall vs Skype:{" "}
                    <span className="gradient-text-accent">Which is Better?</span>
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Looking for a Skype alternative for international calls? Compare features, 
                    pricing, and find out why ZyraCall is the modern choice for browser-based calling.
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
                <ComparisonTable competitorName="Skype" features={features} />
              </div>
            </div>
          </section>

          {/* Key Differences */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                  Why Choose ZyraCall Over Skype
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <article className="bg-card border border-border/50 rounded-2xl p-6 shadow-card">
                    <h3 className="font-semibold text-foreground mb-3">No Download Required</h3>
                    <p className="text-muted-foreground text-sm">
                      Unlike Skype which requires downloading and installing an app, ZyraCall works 
                      entirely in your browser. Open a tab and start calling instantly from any device.
                    </p>
                  </article>
                  
                  <article className="bg-card border border-border/50 rounded-2xl p-6 shadow-card">
                    <h3 className="font-semibold text-foreground mb-3">Transparent Pay-As-You-Go</h3>
                    <p className="text-muted-foreground text-sm">
                      Skype requires credits or subscriptions. ZyraCall offers pure pay-as-you-go 
                      with no monthly fees. Top up any amount and use it whenever you want.
                    </p>
                  </article>
                  
                  <article className="bg-card border border-border/50 rounded-2xl p-6 shadow-card">
                    <h3 className="font-semibold text-foreground mb-3">Real-Time Cost Display</h3>
                    <p className="text-muted-foreground text-sm">
                      ZyraCall shows you exactly what your call is costing in real-time. No surprises, 
                      no checking your balance after the call. Complete transparency.
                    </p>
                  </article>
                  
                  <article className="bg-card border border-border/50 rounded-2xl p-6 shadow-card">
                    <h3 className="font-semibold text-foreground mb-3">Focused on Calling</h3>
                    <p className="text-muted-foreground text-sm">
                      Skype has evolved into a complex platform with chat, video, and more. ZyraCall 
                      stays focused on one thing: making international calls simple and reliable.
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
                  While Skype offers video calling and messaging, ZyraCall is the better choice if 
                  you simply need to call phone numbers internationally. No downloads, no subscriptions, 
                  just simple browser-based calling with transparent pricing.
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

          {/* Related Comparisons */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-bold text-foreground mb-6">Other Comparisons</h2>
                <div className="flex flex-wrap gap-3">
                  <Link 
                    to="/compare/zyracall-vs-google-voice" 
                    className="px-4 py-2 bg-card border border-border/50 rounded-lg text-sm hover:border-accent transition-colors"
                  >
                    ZyraCall vs Google Voice
                  </Link>
                  <Link 
                    to="/compare/zyracall-vs-rebtel" 
                    className="px-4 py-2 bg-card border border-border/50 rounded-lg text-sm hover:border-accent transition-colors"
                  >
                    ZyraCall vs Rebtel
                  </Link>
                  <Link 
                    to="/compare/zyracall-vs-vonage" 
                    className="px-4 py-2 bg-card border border-border/50 rounded-lg text-sm hover:border-accent transition-colors"
                  >
                    ZyraCall vs Vonage
                  </Link>
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

export default ZyraCallVsSkype;
