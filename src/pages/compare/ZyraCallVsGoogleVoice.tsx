import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import ComparisonTable, { ComparisonFeature } from "@/components/compare/ComparisonTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";

const features: ComparisonFeature[] = [
  { feature: "Browser-based (no download)", zyracall: true, competitor: true },
  { feature: "Call real phone numbers (PSTN)", zyracall: true, competitor: true },
  { feature: "Available worldwide", zyracall: true, competitor: "US only" },
  { feature: "Pay-as-you-go pricing", zyracall: true, competitor: "Limited" },
  { feature: "No US phone number required", zyracall: true, competitor: false },
  { feature: "Real-time cost display", zyracall: true, competitor: false },
  { feature: "Call recording", zyracall: true, competitor: true },
  { feature: "200+ countries", zyracall: true, competitor: true },
  { feature: "SMS support", zyracall: false, competitor: true },
  { feature: "Voicemail transcription", zyracall: false, competitor: true },
];

const ZyraCallVsGoogleVoice = () => {
  return (
    <>
      <Helmet>
        <title>ZyraCall vs Google Voice: International Calling Comparison | 2024</title>
        <meta 
          name="description" 
          content="Compare ZyraCall vs Google Voice for international calls. ZyraCall works globally with no US number required and offers transparent pay-as-you-go pricing." 
        />
        <link rel="canonical" href="https://zyracall.com/compare/zyracall-vs-google-voice" />
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
                  <span className="text-foreground">ZyraCall vs Google Voice</span>
                </nav>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                      <Phone className="w-8 h-8 text-accent" />
                    </div>
                    <span className="text-2xl font-bold text-muted-foreground">vs</span>
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-3xl">
                      🔊
                    </div>
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">
                    ZyraCall vs Google Voice:{" "}
                    <span className="gradient-text-accent">Global Calling Compared</span>
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Google Voice is great for US users, but what if you're outside the US? 
                    Compare ZyraCall and Google Voice for international calling.
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
                <ComparisonTable competitorName="Google Voice" features={features} />
              </div>
            </div>
          </section>

          {/* Key Differences */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                  Why Choose ZyraCall Over Google Voice
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <article className="bg-card border border-border/50 rounded-2xl p-6 shadow-card">
                    <h3 className="font-semibold text-foreground mb-3">Available Globally</h3>
                    <p className="text-muted-foreground text-sm">
                      Google Voice is only available in the US and requires a US phone number. 
                      ZyraCall works from anywhere in the world with no geographic restrictions.
                    </p>
                  </article>
                  
                  <article className="bg-card border border-border/50 rounded-2xl p-6 shadow-card">
                    <h3 className="font-semibold text-foreground mb-3">No US Number Required</h3>
                    <p className="text-muted-foreground text-sm">
                      Sign up with just an email address. No need for a US phone number or address 
                      verification. Start calling within minutes from anywhere.
                    </p>
                  </article>
                  
                  <article className="bg-card border border-border/50 rounded-2xl p-6 shadow-card">
                    <h3 className="font-semibold text-foreground mb-3">Simple Pay-As-You-Go</h3>
                    <p className="text-muted-foreground text-sm">
                      Google Voice has complex pricing tiers. ZyraCall offers straightforward 
                      per-minute rates with no hidden fees or confusing plans.
                    </p>
                  </article>
                  
                  <article className="bg-card border border-border/50 rounded-2xl p-6 shadow-card">
                    <h3 className="font-semibold text-foreground mb-3">Real-Time Cost Tracking</h3>
                    <p className="text-muted-foreground text-sm">
                      See exactly what your call costs as you talk. Complete transparency with 
                      live cost display during every call.
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
                  Google Voice is excellent for US-based users who need SMS and voicemail features. 
                  However, ZyraCall is the better choice for international users or anyone who wants 
                  simple, transparent calling without geographic restrictions.
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

export default ZyraCallVsGoogleVoice;
