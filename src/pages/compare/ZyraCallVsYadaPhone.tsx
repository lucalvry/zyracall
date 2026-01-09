import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import ComparisonTable, { ComparisonFeature } from "@/components/compare/ComparisonTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, CheckCircle, XCircle } from "lucide-react";
import SEOHead, { generateComparisonSchema } from "@/components/seo/SEOHead";
import RelatedContent from "@/components/seo/RelatedContent";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const features: ComparisonFeature[] = [
  { feature: "Browser-based (no download)", zyracall: true, competitor: false },
  { feature: "Call real phone numbers (PSTN)", zyracall: true, competitor: true },
  { feature: "Pay-as-you-go pricing", zyracall: true, competitor: true },
  { feature: "No monthly subscription required", zyracall: true, competitor: false },
  { feature: "Real-time cost display", zyracall: true, competitor: false },
  { feature: "Call recording", zyracall: true, competitor: true },
  { feature: "200+ countries", zyracall: true, competitor: true },
  { feature: "Credits never expire", zyracall: true, competitor: false },
  { feature: "Works on any device with browser", zyracall: true, competitor: false },
  { feature: "Mobile app available", zyracall: false, competitor: true },
];

const zyracallPros = [
  "No app download required",
  "Works on any device with a browser",
  "Real-time call cost display",
  "Credits never expire",
  "Transparent per-second billing",
  "No monthly fees or subscriptions",
];

const zyracallCons = [
  "No mobile app (browser-only)",
  "Requires stable internet connection",
];

const yadaphonePros = [
  "Dedicated mobile app",
  "Offline access to contacts",
  "International calling experience",
];

const yadaphoneCons = [
  "Requires app download",
  "Credits may expire",
  "Monthly subscription plans pushed",
  "No browser-based option",
];

const breadcrumbs = [
  { name: "Home", url: "https://zyracall.com" },
  { name: "Compare", url: "https://zyracall.com/compare" },
  { name: "ZyraCall vs YadaPhone", url: "https://zyracall.com/compare/zyracall-vs-yadaphone" },
];

const ZyraCallVsYadaPhone = () => {
  return (
    <>
      <SEOHead
        title="ZyraCall vs YadaPhone: Best International Calling Service | 2026"
        description="Compare ZyraCall vs YadaPhone for international calls. ZyraCall offers browser-based calling with no downloads, transparent pricing, and credits that never expire."
        canonicalUrl="https://zyracall.com/compare/zyracall-vs-yadaphone"
        keywords="ZyraCall vs YadaPhone, YadaPhone alternative, browser calling, international calls comparison, VoIP comparison"
        ogImageTitle="ZyraCall vs YadaPhone"
        ogImageSubtitle="Which is Better for International Calling?"
        ogImageType="comparison"
        breadcrumbs={breadcrumbs}
        structuredData={generateComparisonSchema(
          "YadaPhone",
          "https://zyracall.com/compare/zyracall-vs-yadaphone",
          "Browser-based international calling with pay-as-you-go pricing",
          "Mobile app for international calling with subscription options"
        )}
      />

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          {/* Hero */}
          <section className="relative py-16 lg:py-24 overflow-hidden">
            <div className="absolute inset-0 gradient-mesh" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
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
                        <Link to="/compare">Compare</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>ZyraCall vs YadaPhone</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                      <Phone className="w-8 h-8 text-accent" />
                    </div>
                    <span className="text-2xl font-bold text-muted-foreground">vs</span>
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-3xl">
                      📞
                    </div>
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">
                    ZyraCall vs YadaPhone:{" "}
                    <span className="gradient-text-accent">Complete Comparison</span>
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Comparing two popular international calling solutions. Find out which service 
                    offers better value, features, and convenience for your calling needs.
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
                <ComparisonTable competitorName="YadaPhone" features={features} />
              </div>
            </div>
          </section>

          {/* Pricing Comparison */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                  Pricing Comparison
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* ZyraCall Pricing */}
                  <div className="bg-card border-2 border-primary/50 rounded-2xl p-8 shadow-card">
                    <div className="flex items-center gap-3 mb-6">
                      <Phone className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-bold">ZyraCall</h3>
                    </div>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                        <span>Pure pay-as-you-go pricing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                        <span>No monthly fees or subscriptions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                        <span>Credits never expire</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                        <span>Per-second billing (no rounding)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                        <span>Rates starting from $0.01/min</span>
                      </li>
                    </ul>
                  </div>

                  {/* YadaPhone Pricing */}
                  <div className="bg-card border border-border rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">📞</span>
                      <h3 className="text-xl font-bold">YadaPhone</h3>
                    </div>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <span>Pay-as-you-go available</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-destructive mt-0.5" />
                        <span>Subscription plans promoted</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-destructive mt-0.5" />
                        <span>Credits may expire after inactivity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <span>Per-minute billing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <span>Competitive international rates</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pros and Cons */}
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                  Pros & Cons
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* ZyraCall */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Phone className="w-5 h-5 text-primary" />
                      ZyraCall
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                        <h4 className="font-medium text-success mb-2">Pros</h4>
                        <ul className="space-y-2 text-sm">
                          {zyracallPros.map((pro) => (
                            <li key={pro} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                        <h4 className="font-medium text-destructive mb-2">Cons</h4>
                        <ul className="space-y-2 text-sm">
                          {zyracallCons.map((con) => (
                            <li key={con} className="flex items-start gap-2">
                              <XCircle className="w-4 h-4 text-destructive mt-0.5" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* YadaPhone */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <span className="text-xl">📞</span>
                      YadaPhone
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                        <h4 className="font-medium text-success mb-2">Pros</h4>
                        <ul className="space-y-2 text-sm">
                          {yadaphonePros.map((pro) => (
                            <li key={pro} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                        <h4 className="font-medium text-destructive mb-2">Cons</h4>
                        <ul className="space-y-2 text-sm">
                          {yadaphoneCons.map((con) => (
                            <li key={con} className="flex items-start gap-2">
                              <XCircle className="w-4 h-4 text-destructive mt-0.5" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Use Case Recommendations */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                  Which Should You Choose?
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <article className="bg-card border border-border/50 rounded-2xl p-6 shadow-card">
                    <h3 className="font-semibold text-foreground mb-3">Choose ZyraCall if you:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Want to call from any device without downloads</li>
                      <li>• Prefer pay-as-you-go with no expiring credits</li>
                      <li>• Need transparency with real-time cost display</li>
                      <li>• Want to avoid monthly subscriptions</li>
                      <li>• Value simplicity and browser-based convenience</li>
                    </ul>
                  </article>
                  
                  <article className="bg-card border border-border/50 rounded-2xl p-6 shadow-card">
                    <h3 className="font-semibold text-foreground mb-3">Choose YadaPhone if you:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Prefer dedicated mobile apps</li>
                      <li>• Need offline access to your contact list</li>
                      <li>• Are okay with subscription-based pricing</li>
                      <li>• Don't need browser-based calling</li>
                      <li>• Already use YadaPhone and are satisfied</li>
                    </ul>
                  </article>
                </div>
              </div>
            </div>
          </section>

          {/* Final Verdict */}
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-foreground mb-6">The Verdict</h2>
                    <p className="text-muted-foreground mb-4">
                      Both ZyraCall and YadaPhone are solid choices for international calling, but they 
                      cater to different user preferences. <strong>ZyraCall stands out</strong> for its 
                      browser-based approach, eliminating the need for app downloads and offering true 
                      flexibility across devices.
                    </p>
                    <p className="text-muted-foreground mb-6">
                      If you value convenience, transparent pricing, and the freedom to call from any device 
                      with a browser, <strong>ZyraCall is the better choice</strong>. The fact that credits 
                      never expire and there are no subscription fees makes it ideal for occasional and 
                      regular callers alike.
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

                  <div>
                    <RelatedContent
                      comparisons={[
                        { title: "vs Skype", href: "/compare/zyracall-vs-skype" },
                        { title: "vs Google Voice", href: "/compare/zyracall-vs-google-voice" },
                        { title: "vs Rebtel", href: "/compare/zyracall-vs-rebtel" },
                      ]}
                      articles={[
                        { title: "International Calling Guide", href: "/blog/international-calling-guide" },
                        { title: "Save Money on Calls", href: "/blog/save-money-international-calls-2025" },
                      ]}
                      showRateCalculator={true}
                      showSignupCTA={false}
                    />
                  </div>
                </div>
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
                    to="/compare/zyracall-vs-skype" 
                    className="px-4 py-2 bg-card border border-border/50 rounded-lg text-sm hover:border-accent transition-colors"
                  >
                    ZyraCall vs Skype
                  </Link>
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

                {/* Cross-link to Alternatives */}
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-muted-foreground mb-3">
                    Looking for a complete replacement for your current calling app?
                  </p>
                  <Link 
                    to="/alternatives" 
                    className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                  >
                    View all calling app alternatives
                    <ArrowRight className="w-4 h-4" />
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

export default ZyraCallVsYadaPhone;
