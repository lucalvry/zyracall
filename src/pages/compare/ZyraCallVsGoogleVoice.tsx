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

const breadcrumbs = [
  { name: "Home", url: "https://zyracall.com" },
  { name: "Compare", url: "https://zyracall.com/compare" },
  { name: "ZyraCall vs Google Voice", url: "https://zyracall.com/compare/zyracall-vs-google-voice" },
];

const ZyraCallVsGoogleVoice = () => {
  return (
    <>
      <SEOHead
        title="ZyraCall vs Google Voice: International Calling Comparison | 2026"
        description="Compare ZyraCall vs Google Voice for international calls. ZyraCall works globally with no US number required and offers transparent pay-as-you-go pricing."
        canonicalUrl="https://zyracall.com/compare/zyracall-vs-google-voice"
        keywords="ZyraCall vs Google Voice, Google Voice alternative, international calling, global VoIP, no US number required"
        ogImageTitle="ZyraCall vs Google Voice"
        ogImageSubtitle="Global Calling Compared"
        ogImageType="comparison"
        breadcrumbs={breadcrumbs}
        structuredData={generateComparisonSchema(
          "Google Voice",
          "https://zyracall.com/compare/zyracall-vs-google-voice",
          "Browser-based international calling available worldwide",
          "US-based calling service with SMS and voicemail"
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
                      <BreadcrumbPage>ZyraCall vs Google Voice</BreadcrumbPage>
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

          <RelatedContent
            variant="footer"
            comparisons={[
              { title: "vs Skype", href: "/compare/zyracall-vs-skype" },
              { title: "vs Rebtel", href: "/compare/zyracall-vs-rebtel" },
              { title: "vs Vonage", href: "/compare/zyracall-vs-vonage" },
            ]}
            countries={[
              { title: "Call India", href: "/call/india" },
              { title: "Call UK", href: "/call/united-kingdom" },
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

export default ZyraCallVsGoogleVoice;
