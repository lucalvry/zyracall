import { Link } from "react-router-dom";
import { ArrowRight, Globe, Phone, Monitor, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SEOHead, { generateSpeakableSchema, entityDefinitions } from "@/components/seo/SEOHead";
import RelatedContent from "@/components/seo/RelatedContent";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const alternatives = [
  {
    name: "Skype",
    slug: "skype-alternative",
    icon: Monitor,
    tagline: "No app downloads, no subscriptions",
    description: "Looking for a Skype alternative? ZyraCall offers browser-based calling with pay-as-you-go pricing and credits that never expire.",
    highlights: ["No app installation", "Pay-as-you-go", "Credits never expire"],
  },
  {
    name: "WhatsApp",
    slug: "whatsapp-calling-alternative",
    icon: Phone,
    tagline: "Call anyone, not just app users",
    description: "WhatsApp only calls other WhatsApp users. ZyraCall lets you reach any phone number—landlines, mobiles, and businesses worldwide.",
    highlights: ["Call landlines", "No contact needed", "Works on any device"],
  },
  {
    name: "Viber Out",
    slug: "viber-out-alternative",
    icon: Globe,
    tagline: "Browser-based, transparent pricing",
    description: "Skip the Viber app and expiring credits. ZyraCall gives you instant browser-based calling with transparent per-minute rates.",
    highlights: ["No app required", "Transparent pricing", "No credit expiry"],
  },
  {
    name: "Google Voice",
    slug: "google-voice-alternative",
    icon: MapPin,
    tagline: "Available worldwide, not just the US",
    description: "Google Voice is US-only. ZyraCall works from anywhere in the world, calling anywhere in the world. No restrictions.",
    highlights: ["Available globally", "No US number needed", "Instant signup"],
  },
];

const generateAlternativesSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://zyracall.com/alternatives#webpage",
  name: "Best Calling App Alternatives",
  description: "Looking for alternatives to Skype, WhatsApp, Viber, or Google Voice? ZyraCall offers browser-based international calling.",
  url: "https://zyracall.com/alternatives",
  inLanguage: "en",
  isPartOf: { "@id": "https://zyracall.com/#website" },
  about: [entityDefinitions.voip, entityDefinitions.internationalCalling],
  mentions: alternatives.map(a => ({ "@type": "Thing", name: a.name })),
  mainEntity: {
    "@type": "ItemList",
    itemListElement: alternatives.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${a.name} Alternative`,
      url: `https://zyracall.com/alternatives/${a.slug}`,
    })),
  },
});

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://zyracall.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Alternatives",
      item: "https://zyracall.com/alternatives",
    },
  ],
});

const Alternatives = () => {
  return (
    <>
      <SEOHead
        title="Best Calling App Alternatives | ZyraCall"
        description="Looking for alternatives to Skype, WhatsApp, Viber, or Google Voice? ZyraCall offers browser-based international calling with no app downloads and pay-as-you-go pricing."
        canonicalUrl="https://zyracall.com/alternatives"
        keywords="Skype alternative, WhatsApp alternative, Viber alternative, Google Voice alternative, international calling"
        ogImageTitle="Best Calling App Alternatives"
        ogImageSubtitle="Browser-Based International Calling"
        ogImageType="alternative"
        breadcrumbs={[
          { name: "Home", url: "https://zyracall.com" },
          { name: "Alternatives", url: "https://zyracall.com/alternatives" },
        ]}
        structuredData={[
          generateAlternativesSchema(),
          generateSpeakableSchema("https://zyracall.com/alternatives", "Best calling app alternatives"),
        ]}
      />

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Breadcrumb Navigation */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Alternatives</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Hero Section */}
          <section className="pt-8 pb-16 lg:pt-12 lg:pb-20 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  Alternatives
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  What is the best alternative to your{" "}
                  <span className="text-primary">current calling app?</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto" data-speakable="true">
                  The best alternative to Skype, WhatsApp, Viber Out, or Google Voice is a browser-based
                  VoIP service that calls real phone numbers in 200+ countries with no app downloads.
                  ZyraCall offers transparent pay-as-you-go pricing and credits that never expire.
                </p>

                {/* Definition / Quick-Answer Box */}
                <div
                  role="definition"
                  itemProp="description"
                  data-speakable="true"
                  className="max-w-2xl mx-auto p-4 rounded-xl bg-card border border-border text-left text-sm text-muted-foreground"
                >
                  <strong className="text-foreground">A calling app alternative</strong> is a service
                  that replaces traditional VoIP apps (like Skype or Viber) by offering equivalent or
                  better international calling without app installs, account lock-in, or subscriptions.
                </div>
              </div>
            </div>
          </section>

          {/* Alternatives Grid */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {alternatives.map((alt) => (
                  <Link
                    key={alt.slug}
                    to={`/alternatives/${alt.slug}`}
                    className="group bg-card border border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <alt.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {alt.name} Alternative
                        </h2>
                        <p className="text-sm text-muted-foreground">{alt.tagline}</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">
                      {alt.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {alt.highlights.map((highlight, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all">
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                ))}
              </div>

              {/* Cross-link to Comparisons */}
              <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">
                  Want to see detailed side-by-side feature comparisons?
                </p>
                <Link 
                  to="/compare" 
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  View all service comparisons
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Q&A Knowledge Sections */}
          <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto space-y-12">
                <article>
                  <h2 className="text-2xl font-bold mb-4">What are the best alternatives to traditional calling apps?</h2>
                  <p className="text-muted-foreground" data-speakable="true">
                    The best alternatives to traditional calling apps like Skype and WhatsApp are browser-based 
                    VoIP services that require no downloads. ZyraCall lets you call any phone number — including 
                    landlines and mobiles — in over 200 countries directly from your browser with pay-as-you-go 
                    pricing and no monthly subscriptions.
                  </p>
                </article>
                <article>
                  <h2 className="text-2xl font-bold mb-4">Why switch from Skype or WhatsApp to a browser-based calling service?</h2>
                  <p className="text-muted-foreground" data-speakable="true">
                    Browser-based calling eliminates app downloads, account restrictions, and platform lock-in. 
                    Unlike WhatsApp (which only calls other WhatsApp users) or Skype (which requires desktop 
                    software), ZyraCall works instantly in any modern browser and calls real phone numbers 
                    worldwide with transparent per-minute rates.
                  </p>
                </article>

                {/* Stats */}
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="bg-card border border-border rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">200+</div>
                    <p className="text-muted-foreground text-sm">Countries covered</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">$0</div>
                    <p className="text-muted-foreground text-sm">Monthly fees</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">0</div>
                    <p className="text-muted-foreground text-sm">Apps to download</p>
                  </div>
                </div>

                <div className="text-center">
                  <Button asChild size="xl" variant="hero">
                    <Link to="/signup">
                      Try ZyraCall Free
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Make the Switch?
                </h2>
                <p className="text-muted-foreground mb-8">
                  Join thousands who've discovered a better way to make international calls.
                  No downloads, no subscriptions, no hassle.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="xl" variant="hero">
                    <Link to="/signup">
                      Get Started Free
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild size="xl" variant="outline">
                    <Link to="/compare">View All Comparisons</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Topical-map-driven related content */}
          <RelatedContent currentHref="/alternatives" variant="footer" />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Alternatives;
