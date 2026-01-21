import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SEOHead from "@/components/seo/SEOHead";
import PageHero from "@/components/common/PageHero";
import PlatformCard from "@/components/2fa/PlatformCard";
import CountryFilter from "@/components/2fa/CountryFilter";
import ZyraCallCTA from "@/components/2fa/ZyraCallCTA";
import MobileNumberInterest from "@/components/intent-capture/MobileNumberInterest";
import { platforms, PlatformCategory, categoryLabels, getAllCountries } from "@/data/2fa-platforms";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Shield, Globe, Smartphone, AlertTriangle, Wrench } from "lucide-react";

const TwoFAFinder = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<PlatformCategory | "all">("all");
  const [countryFilter, setCountryFilter] = useState("");

  const filteredPlatforms = useMemo(() => {
    return platforms.filter(platform => {
      const matchesSearch = platform.name.toLowerCase().includes(search.toLowerCase()) ||
                           platform.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || platform.category === category;
      const matchesCountry = !countryFilter || 
                            platform.compatibility.some(c => c.countryCode === countryFilter);
      
      return matchesSearch && matchesCategory && matchesCountry;
    });
  }, [search, category, countryFilter]);

  const allCountries = getAllCountries();
  const totalPlatforms = platforms.length;
  const totalCountries = allCountries.length;

  // Schema markup
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Digital Nomad 2FA Finder",
    "description": "Find which phone number types work for 2FA verification across popular platforms like WhatsApp, PayPal, Binance, and more.",
    "url": "https://zyracall.com/tools/2fa-finder",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "provider": {
      "@type": "Organization",
      "name": "ZyraCall",
      "url": "https://zyracall.com"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why do some platforms block VoIP numbers for 2FA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Many platforms block VoIP and virtual numbers to prevent fraud and abuse. These numbers are easier to obtain anonymously, making them attractive for scammers. Financial and crypto platforms are typically the strictest."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between mobile, VoIP, and virtual numbers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mobile numbers are tied to physical SIM cards, VoIP numbers use internet calling services, and virtual numbers are cloud-based numbers not tied to a physical device. Mobile numbers generally have the highest compatibility with 2FA systems."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate is this 2FA compatibility data?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our data is based on community reports and testing. Platform policies change frequently, so always verify with the official platform. Use this tool as a starting guide, not a guarantee."
        }
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="Digital Nomad 2FA Finder | Check Phone Number Compatibility"
        description="Find which countries and number types (mobile, VoIP, virtual) work for 2FA verification on WhatsApp, PayPal, Binance, Google, and more. Free tool for digital nomads."
        canonicalUrl="https://zyracall.com/tools/2fa-finder"
        keywords="2FA verification, phone number compatibility, VoIP 2FA, digital nomad, international number, WhatsApp verification, PayPal 2FA"
        ogImageTitle="Digital Nomad 2FA Finder"
        ogImageSubtitle="Find numbers that work for verification"
        ogImageType="default"
        breadcrumbs={[
          { name: "Home", url: "https://zyracall.com" },
          { name: "Tools", url: "https://zyracall.com/tools" },
          { name: "2FA Finder", url: "https://zyracall.com/tools/2fa-finder" },
        ]}
        structuredData={[toolSchema, faqSchema]}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <PageHero
          badge={{ icon: Wrench, text: "Free Tool" }}
          title="Digital Nomad"
          titleAccent="2FA Finder"
          description="Discover which countries and number types are most likely to work for 2FA verification across popular platforms."
          stats={[
            { icon: Shield, text: `${totalPlatforms} platforms` },
            { icon: Globe, text: `${totalCountries} countries` },
            { icon: Smartphone, text: "Mobile, VoIP & Virtual" },
          ]}
          size="large"
        />

        {/* Disclaimer */}
        <section className="pb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/10 border border-warning/20 text-warning">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  <strong>Disclaimer:</strong> This information is based on community reports and may change. 
                  Platform policies vary by region and are updated frequently. Always verify with the official platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="pb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search platforms (WhatsApp, PayPal, Binance...)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 h-14 text-lg bg-muted/50 border-border/50 rounded-xl"
                />
              </div>
              
              {/* Category Tabs & Country Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Tabs 
                  value={category} 
                  onValueChange={(v) => setCategory(v as PlatformCategory | "all")}
                  className="flex-1"
                >
                  <TabsList className="w-full justify-start bg-muted/50 p-1 h-auto flex-wrap">
                    <TabsTrigger value="all" className="data-[state=active]:bg-background">
                      All
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {platforms.length}
                      </Badge>
                    </TabsTrigger>
                    {(Object.keys(categoryLabels) as PlatformCategory[]).map((cat) => {
                      const count = platforms.filter(p => p.category === cat).length;
                      return (
                        <TabsTrigger key={cat} value={cat} className="data-[state=active]:bg-background">
                          {categoryLabels[cat]}
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {count}
                          </Badge>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </Tabs>
                
                <CountryFilter 
                  value={countryFilter} 
                  onChange={setCountryFilter}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Platform Grid */}
        <section className="pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {filteredPlatforms.length === 0 ? (
                <div className="text-center py-16">
                  <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground">No platforms found</h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your search or filters
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPlatforms.map((platform) => (
                    <PlatformCard key={platform.id} platform={platform} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Intent Capture - Only show after results */}
        {filteredPlatforms.length > 0 && (
          <section className="pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <MobileNumberInterest 
                  source="2fa-finder"
                  contextMessage="Many users struggle with blocked virtual numbers. We're building compliant mobile options for high-risk verification."
                />
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <ZyraCallCTA />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 border-t border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
                Understanding 2FA Number Types
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Mobile Numbers</h3>
                  <p className="text-sm text-muted-foreground">
                    Physical SIM card numbers. Highest reliability for 2FA but require being in-country to obtain.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-warning/10 flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-warning" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">VoIP Numbers</h3>
                  <p className="text-sm text-muted-foreground">
                    Internet-based phone numbers. Moderate reliability, often blocked by financial platforms.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-info/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-info" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Virtual Numbers</h3>
                  <p className="text-sm text-muted-foreground">
                    Cloud-based numbers. Lowest reliability for 2FA but easy to obtain internationally.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="py-16 border-t border-border/50 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                More Free Tools Coming Soon
              </h2>
              <p className="text-muted-foreground mb-8">
                We're building more tools to help digital nomads stay connected.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="outline" className="px-4 py-2">
                  International Rate Calculator
                </Badge>
                <Badge variant="outline" className="px-4 py-2">
                  Country Code Lookup
                </Badge>
                <Badge variant="outline" className="px-4 py-2">
                  Time Zone Converter
                </Badge>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default TwoFAFinder;
