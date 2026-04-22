import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Phone, Globe, ArrowRight, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SEOHead, { organizationSchema, websiteSchema, generatePillarPageSchema, generateSpeakableSchema, entityDefinitions } from "@/components/seo/SEOHead";
import RelatedContent from "@/components/seo/RelatedContent";
import { useCallRates, getCountryFlag } from "@/hooks/useCallRates";

// Convert country name to URL slug
const toSlug = (name: string) => 
  name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const CallHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: rates = [], isLoading } = useCallRates();

  const filteredRates = rates.filter(
    (rate) =>
      rate.country_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rate.country_code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Featured destinations (popular countries)
  const featuredCountries = [
    "India", "Nigeria", "Philippines", "Mexico", "United Kingdom", 
    "Pakistan", "Bangladesh", "Kenya", "Ghana", "Canada"
  ];

  const featuredRates = rates.filter((rate) =>
    featuredCountries.includes(rate.country_name)
  );

  const breadcrumbs = [
    { name: "Home", url: "https://zyracall.com" },
    { name: "Call Any Country", url: "https://zyracall.com/call" },
  ];

  const callHubSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://zyracall.com/call#webpage",
    name: "International Calling Guides - Call Any Country",
    description: "Find calling rates and guides for 200+ countries. Make cheap international calls from your browser.",
    url: "https://zyracall.com/call",
    inLanguage: "en",
    isPartOf: { "@id": "https://zyracall.com/#website" },
    about: [entityDefinitions.voip, entityDefinitions.internationalCalling, entityDefinitions.pstn],
    mentions: [entityDefinitions.webrtc],
    mainEntity: {
      "@type": "ItemList",
      name: "Country Calling Guides",
      numberOfItems: rates.length,
      itemListElement: featuredRates.slice(0, 10).map((rate, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `Call ${rate.country_name}`,
        url: `https://zyracall.com/call/${toSlug(rate.country_name)}`,
      })),
    },
  };

  const speakableSchema = generateSpeakableSchema(
    "https://zyracall.com/call",
    "Call Any Country - International Calling Hub"
  );

  return (
    <>
      <SEOHead
        title="Call Any Country | International Calling Rates & Guides | ZyraCall"
        description="Find the cheapest international calling rates to 200+ countries. Make crystal-clear calls from your browser with no apps or SIM cards required."
        canonicalUrl="https://zyracall.com/call"
        keywords="international calling, cheap international calls, call abroad, VoIP calling, international calling rates"
        ogImageTitle="Call Any Country"
        ogImageSubtitle="200+ countries • From $0.01/min"
        ogImageType="rates"
        breadcrumbs={breadcrumbs}
        structuredData={[organizationSchema, websiteSchema, callHubSchema, speakableSchema]}
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative py-16 lg:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="container mx-auto px-4 relative">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Globe className="w-4 h-4" />
                  200+ Countries Available
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Call any phone number in{" "}
                  <span className="text-primary">200+ countries</span>{" "}from your browser
                </h1>
                <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto" data-speakable="true">
                  International calling lets you reach mobile and landline numbers in another country
                  using browser-based VoIP. ZyraCall routes calls over WebRTC with transparent
                  per-minute rates, no app downloads, and no monthly subscription required.
                </p>

                {/* Definition / Quick-Answer Box (Koray pattern) */}
                <div
                  role="definition"
                  itemProp="description"
                  data-speakable="true"
                  className="max-w-2xl mx-auto mb-8 p-4 rounded-xl bg-card border border-border text-left text-sm text-muted-foreground"
                >
                  <strong className="text-foreground">International calling</strong> is the act of
                  placing a phone call from one country to another. ZyraCall delivers it over
                  Voice over IP (VoIP) directly inside your web browser, billed per minute with
                  no contracts.
                </div>

                {/* Search Box */}
                <div className="relative max-w-xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for a country..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-6 text-lg rounded-2xl border-2 focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-8 border-y border-border/50 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <p className="text-3xl font-bold text-primary">200+</p>
                  <p className="text-sm text-muted-foreground">Countries</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">$0.01</p>
                  <p className="text-sm text-muted-foreground">Lowest Rate</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">HD</p>
                  <p className="text-sm text-muted-foreground">Call Quality</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">0</p>
                  <p className="text-sm text-muted-foreground">Hidden Fees</p>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Destinations */}
          {!searchQuery && (
            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      Popular Destinations
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      Most called countries by our users
                    </p>
                  </div>
                  <Button variant="ghost" asChild className="hidden md:flex">
                    <Link to="/rates">
                      View All Rates <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {featuredRates.slice(0, 10).map((rate) => (
                    <Link
                      key={rate.id}
                      to={`/call/${toSlug(rate.country_name)}`}
                      className="group"
                    >
                      <Card className="hover:border-primary/50 transition-all hover:shadow-lg group-hover:-translate-y-1">
                        <CardContent className="p-4 text-center">
                          <span className="text-4xl mb-3 block">
                            {getCountryFlag(rate.country_name)}
                          </span>
                          <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                            {rate.country_name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            From ${Math.min(rate.mobile_rate, rate.landline_rate).toFixed(2)}/min
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                <div className="mt-6 text-center md:hidden">
                  <Button variant="outline" asChild>
                    <Link to="/rates">View All Rates</Link>
                  </Button>
                </div>
              </div>
            </section>
          )}

          {/* All Countries / Search Results */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {searchQuery ? `Results for "${searchQuery}"` : "All Countries"}
              </h2>
              <p className="text-muted-foreground mb-8">
                {searchQuery
                  ? `${filteredRates.length} countries found`
                  : "Browse our complete list of destinations"}
              </p>

              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-4 h-24" />
                    </Card>
                  ))}
                </div>
              ) : filteredRates.length === 0 ? (
                <div className="text-center py-12">
                  <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No countries found for "{searchQuery}"
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredRates.map((rate) => (
                    <Link
                      key={rate.id}
                      to={`/call/${toSlug(rate.country_name)}`}
                      className="group"
                    >
                      <Card className="hover:border-primary/50 transition-all hover:shadow-md">
                        <CardContent className="p-3 flex items-center gap-3">
                          <span className="text-2xl">
                            {getCountryFlag(rate.country_name)}
                          </span>
                          <div className="min-w-0">
                            <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                              {rate.country_name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              ${Math.min(rate.mobile_rate, rate.landline_rate).toFixed(2)}/min
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Q&A Knowledge Sections */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto space-y-12">
                <article>
                  <h2 className="text-2xl font-bold mb-4">What countries can I call from my browser?</h2>
                  <p className="text-muted-foreground" data-speakable="true">
                    ZyraCall supports browser-based VoIP calls to over 200 countries and territories 
                    worldwide, including mobile and landline numbers. Popular destinations include India, 
                    Nigeria, Philippines, Mexico, the United Kingdom, Pakistan, and Canada. You can search 
                    for any country above to see exact per-minute rates.
                  </p>
                </article>
                <article>
                  <h2 className="text-2xl font-bold mb-4">How do international calling rates work?</h2>
                  <p className="text-muted-foreground" data-speakable="true">
                    ZyraCall uses pay-as-you-go per-minute pricing with no monthly fees or subscriptions. 
                    Rates vary by destination country and whether you're calling a mobile or landline number. 
                    You can check the exact rate before placing any call using our{" "}
                    <Link to="/tools/rate-calculator" className="text-primary hover:underline">rate calculator</Link>.
                  </p>
                </article>
                <article>
                  <h2 className="text-2xl font-bold mb-4">What is VoIP and how does ZyraCall use it?</h2>
                  <p className="text-muted-foreground" data-speakable="true">
                    VoIP (Voice over Internet Protocol) transmits voice calls over the internet instead of 
                    traditional phone lines. ZyraCall uses WebRTC-based VoIP technology built into modern 
                    browsers, allowing you to call any phone number worldwide without downloading apps or 
                    using SIM cards. Learn more about{" "}
                    <Link to="/how-it-works" className="text-primary hover:underline">how browser calling works</Link>.
                  </p>
                </article>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <Card className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20">
                <CardContent className="p-8 md:p-12 text-center">
                  <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Ready to Start Calling?
                  </h2>
                  <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                    No downloads, no SIM cards. Just open your browser and call 
                    anyone in the world in seconds.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild>
                      <Link to="/signup">
                        <Phone className="w-4 h-4 mr-2" />
                        Start Calling Free
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link to="/rates">View All Rates</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CallHub;
