import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import ComparisonTable, { ComparisonFeature } from "@/components/compare/ComparisonTable";
import RelatedContent from "@/components/seo/RelatedContent";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import SEOHead, { generateComparisonSchema } from "@/components/seo/SEOHead";
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
  { feature: "Pay-as-you-go for individuals", zyracall: true, competitor: "Enterprise" },
  { feature: "No complex setup", zyracall: true, competitor: false },
  { feature: "Real-time cost display", zyracall: true, competitor: false },
  { feature: "Call recording", zyracall: true, competitor: true },
  { feature: "200+ countries", zyracall: true, competitor: true },
  { feature: "Business phone system", zyracall: false, competitor: true },
  { feature: "Video conferencing", zyracall: false, competitor: true },
  { feature: "Team messaging", zyracall: false, competitor: true },
];

const breadcrumbs = [
  { name: "Home", url: "https://zyracall.com" },
  { name: "Compare", url: "https://zyracall.com/compare" },
  { name: "ZyraCall vs Vonage", url: "https://zyracall.com/compare/zyracall-vs-vonage" },
];

const ZyraCallVsVonage = () => {
  return (
    <>
      <SEOHead
        title="ZyraCall vs Vonage: Simple Calling vs Enterprise | 2026"
        description="Compare ZyraCall vs Vonage for international calls. ZyraCall offers simple browser-based calling for individuals while Vonage focuses on enterprise solutions."
        canonicalUrl="https://zyracall.com/compare/zyracall-vs-vonage"
        keywords="ZyraCall vs Vonage, Vonage alternative, simple VoIP, individual calling, browser calling"
        ogImageTitle="ZyraCall vs Vonage"
        ogImageSubtitle="Simple vs Enterprise"
        ogImageType="comparison"
        breadcrumbs={breadcrumbs}
        structuredData={generateComparisonSchema(
          "Vonage",
          "https://zyracall.com/compare/zyracall-vs-vonage",
          "Simple browser-based calling for individuals and small businesses",
          "Enterprise communications platform with video and messaging"
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
                      <BreadcrumbPage>ZyraCall vs Vonage</BreadcrumbPage>
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

          <RelatedContent
            variant="footer"
            comparisons={[
              { title: "vs Skype", href: "/compare/zyracall-vs-skype" },
              { title: "vs Google Voice", href: "/compare/zyracall-vs-google-voice" },
            ]}
            countries={[
              { title: "Call UK", href: "/call/united-kingdom" },
              { title: "Call India", href: "/call/india" },
            ]}
            articles={[
              { title: "Browser-Based Calling", href: "/blog/browser-based-calling-future" },
            ]}
          />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ZyraCallVsVonage;
