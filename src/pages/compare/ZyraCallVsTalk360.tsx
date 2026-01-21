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
  { feature: "Pay-as-you-go pricing", zyracall: true, competitor: true },
  { feature: "No app required", zyracall: true, competitor: false },
  { feature: "Real-time cost display", zyracall: true, competitor: false },
  { feature: "Call recording", zyracall: true, competitor: false },
  { feature: "200+ countries", zyracall: true, competitor: true },
  { feature: "Subscription plans", zyracall: false, competitor: true },
  { feature: "WiFi calling focus", zyracall: true, competitor: true },
  { feature: "No phone number needed", zyracall: true, competitor: false },
];

const breadcrumbs = [
  { name: "Home", url: "https://zyracall.com" },
  { name: "Compare", url: "https://zyracall.com/compare" },
  { name: "ZyraCall vs Talk360", url: "https://zyracall.com/compare/zyracall-vs-talk360" },
];

const ZyraCallVsTalk360 = () => {
  return (
    <>
      <SEOHead
        title="ZyraCall vs Talk360: International Calling Apps Compared | 2026"
        description="Compare ZyraCall vs Talk360 for international calls. ZyraCall offers browser-based calling with no downloads and transparent pay-as-you-go pricing."
        canonicalUrl="https://zyracall.com/compare/zyracall-vs-talk360"
        keywords="ZyraCall vs Talk360, Talk360 alternative, browser calling, international calls comparison"
        ogImageTitle="ZyraCall vs Talk360"
        ogImageSubtitle="Which is Better?"
        ogImageType="comparison"
        breadcrumbs={breadcrumbs}
        structuredData={generateComparisonSchema(
          "Talk360",
          "https://zyracall.com/compare/zyracall-vs-talk360",
          "Browser-based international calling with transparent pricing",
          "Mobile app for international calling"
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
                      <BreadcrumbPage>ZyraCall vs Talk360</BreadcrumbPage>
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
                      🌐
                    </div>
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">
                    ZyraCall vs Talk360:{" "}
                    <span className="gradient-text-accent">Which is Better?</span>
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Both services let you call phone numbers abroad. Compare ZyraCall and Talk360 
                    to find the right choice for your international calling needs.
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
                <ComparisonTable competitorName="Talk360" features={features} />
              </div>
            </div>
          </section>

          {/* Verdict */}
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold text-foreground mb-6">The Verdict</h2>
                <p className="text-muted-foreground mb-8">
                  Talk360 is a solid mobile app for international calling, but ZyraCall's 
                  browser-based approach offers more flexibility. Call from any device without 
                  downloads, with transparent pricing and call recording included.
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
              { title: "vs Rebtel", href: "/compare/zyracall-vs-rebtel" },
            ]}
            countries={[
              { title: "Call Nigeria", href: "/call/nigeria" },
              { title: "Call India", href: "/call/india" },
            ]}
            articles={[
              { title: "Save Money on Calls", href: "/blog/save-money-international-calls-2025" },
            ]}
          />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ZyraCallVsTalk360;
