import { useParams, Link, Navigate } from "react-router-dom";
import { Phone, Clock, Globe, ArrowLeft, Smartphone, Building2, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SEOHead, { organizationSchema, generateSpeakableSchema } from "@/components/seo/SEOHead";
import RelatedContent from "@/components/seo/RelatedContent";
import { useCallRates, getCountryFlag } from "@/hooks/useCallRates";
import { getRelatedContent } from "@/data/topical-map";

// Convert URL slug back to country name for matching
const fromSlug = (slug: string) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

// Convert country name to URL slug
const toSlug = (name: string) =>
  name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

// Country-specific info (can be expanded)
const countryInfo: Record<string, { timezone: string; bestTime: string; tip: string }> = {
  "India": { timezone: "IST (UTC+5:30)", bestTime: "9 AM - 9 PM IST", tip: "Mobile rates apply to most personal numbers" },
  "Nigeria": { timezone: "WAT (UTC+1)", bestTime: "8 AM - 10 PM WAT", tip: "MTN and Glo are popular carriers" },
  "Philippines": { timezone: "PHT (UTC+8)", bestTime: "8 AM - 10 PM PHT", tip: "Globe and Smart are major networks" },
  "Mexico": { timezone: "CST (UTC-6)", bestTime: "9 AM - 9 PM CST", tip: "Telcel is the largest carrier" },
  "United Kingdom": { timezone: "GMT/BST", bestTime: "9 AM - 9 PM GMT", tip: "Landline rates available for home numbers" },
  "Pakistan": { timezone: "PKT (UTC+5)", bestTime: "9 AM - 11 PM PKT", tip: "Jazz and Telenor are common networks" },
  "Bangladesh": { timezone: "BST (UTC+6)", bestTime: "8 AM - 10 PM BST", tip: "Grameenphone is widely used" },
  "Kenya": { timezone: "EAT (UTC+3)", bestTime: "8 AM - 9 PM EAT", tip: "Safaricom M-Pesa numbers are mobile" },
  "Ghana": { timezone: "GMT", bestTime: "8 AM - 9 PM GMT", tip: "MTN Ghana is the largest carrier" },
  "Canada": { timezone: "Multiple zones", bestTime: "9 AM - 9 PM local", tip: "Landline and mobile rates may differ" },
  "United States": { timezone: "Multiple zones", bestTime: "9 AM - 9 PM local", tip: "All numbers treated as mobile" },
  "China": { timezone: "CST (UTC+8)", bestTime: "9 AM - 9 PM CST", tip: "China Mobile is most common" },
  "South Africa": { timezone: "SAST (UTC+2)", bestTime: "8 AM - 9 PM SAST", tip: "Vodacom and MTN are major networks" },
  "Vietnam": { timezone: "ICT (UTC+7)", bestTime: "8 AM - 10 PM ICT", tip: "Viettel is the largest carrier" },
  "Colombia": { timezone: "COT (UTC-5)", bestTime: "8 AM - 9 PM COT", tip: "Claro Colombia is widely used" },
  "Brazil": { timezone: "BRT (UTC-3)", bestTime: "9 AM - 10 PM BRT", tip: "Vivo and Claro are major carriers" },
};

const defaultInfo = { timezone: "Check local time", bestTime: "9 AM - 9 PM local time", tip: "Check rates for mobile vs landline" };

const CountryPage = () => {
  const { country } = useParams<{ country: string }>();
  const { data: rates = [], isLoading } = useCallRates();

  const countryName = fromSlug(country || "");
  const rate = rates.find(
    (r) => r.country_name.toLowerCase() === countryName.toLowerCase()
  );

  // Get related countries (same first letter or region - simplified)
  const relatedCountries = rates
    .filter((r) => 
      r.country_name !== countryName && 
      (r.country_name[0] === countryName[0] || Math.random() > 0.7)
    )
    .slice(0, 4);

  const info = countryInfo[rate?.country_name || ""] || defaultInfo;

  if (!isLoading && !rate) {
    return <Navigate to="/call" replace />;
  }

  const breadcrumbs = [
    { name: "Home", url: "https://zyracall.com" },
    { name: "Call Any Country", url: "https://zyracall.com/call" },
    { name: `Call ${rate?.country_name || countryName}`, url: `https://zyracall.com/call/${country}` },
  ];

  const countrySchema = rate ? {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `International Calls to ${rate.country_name}`,
    description: `Make cheap international calls to ${rate.country_name} from your browser. Mobile rates from $${rate.mobile_rate}/min, landline from $${rate.landline_rate}/min.`,
    url: `https://zyracall.com/call/${country}`,
    provider: {
      "@type": "Organization",
      name: "ZyraCall",
    },
    areaServed: {
      "@type": "Country",
      name: rate.country_name,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: Math.min(rate.mobile_rate, rate.landline_rate),
      description: `From $${Math.min(rate.mobile_rate, rate.landline_rate)}/minute`,
    },
  } : undefined;

  const faqSchema = rate ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much does it cost to call ${rate.country_name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Calling ${rate.country_name} costs $${rate.mobile_rate}/min for mobile phones and $${rate.landline_rate}/min for landlines.`,
        },
      },
      {
        "@type": "Question",
        name: `Can I call ${rate.country_name} from my browser?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes! With ZyraCall, you can call ${rate.country_name} directly from your browser. No app downloads or SIM cards required.`,
        },
      },
      {
        "@type": "Question",
        name: `What's the country code for ${rate.country_name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The country code for ${rate.country_name} is +${rate.country_code}.`,
        },
      },
    ],
  } : undefined;

  return (
    <>
      {rate && (
        <SEOHead
          title={`Call ${rate.country_name} | Rates from $${Math.min(rate.mobile_rate, rate.landline_rate)}/min | ZyraCall`}
          description={`Make cheap international calls to ${rate.country_name}. Mobile: $${rate.mobile_rate}/min, Landline: $${rate.landline_rate}/min. Crystal-clear quality, no hidden fees.`}
          canonicalUrl={`https://zyracall.com/call/${country}`}
          keywords={`call ${rate.country_name}, ${rate.country_name} calling rates, cheap calls to ${rate.country_name}, international calls ${rate.country_name}`}
          ogImageTitle={`Call ${rate.country_name}`}
          ogImageSubtitle={`From $${Math.min(rate.mobile_rate, rate.landline_rate)}/min`}
          ogImageType="rates"
          breadcrumbs={breadcrumbs}
          structuredData={[organizationSchema, countrySchema, faqSchema, generateSpeakableSchema(`https://zyracall.com/call/${country}`, `Call ${rate.country_name}`)].filter(Boolean)}
        />
      )}

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {isLoading ? (
            <div className="container mx-auto px-4 py-16">
              <div className="animate-pulse space-y-8">
                <div className="h-12 bg-muted rounded w-1/3" />
                <div className="h-64 bg-muted rounded" />
              </div>
            </div>
          ) : rate ? (
            <>
              {/* Hero Section */}
              <section className="relative py-12 lg:py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                <div className="container mx-auto px-4 relative">
                  {/* Back Link */}
                  <Link
                    to="/call"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    All Countries
                  </Link>

                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                    {/* Left: Country Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-6xl lg:text-7xl">
                          {getCountryFlag(rate.country_name)}
                        </span>
                        <div>
                          <h1 className="text-3xl lg:text-4xl font-bold">
                            Call {rate.country_name}
                          </h1>
                          <p className="text-muted-foreground text-lg">
                            Country Code: +{rate.country_code}
                          </p>
                        </div>
                      </div>

                      <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                        Make crystal-clear international calls to {rate.country_name} directly 
                        from your browser. No apps to download, no SIM cards needed.
                      </p>

                      <div className="flex flex-wrap gap-4">
                        <Button size="lg" asChild>
                          <Link to="/signup">
                            <Phone className="w-4 h-4 mr-2" />
                            Call {rate.country_name} Now
                          </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                          <Link to="/rates">Compare All Rates</Link>
                        </Button>
                      </div>
                    </div>

                    {/* Right: Rate Cards */}
                    <div className="w-full lg:w-auto">
                      <div className="grid grid-cols-2 gap-4 lg:min-w-[320px]">
                        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                          <CardContent className="p-6 text-center">
                            <Smartphone className="w-8 h-8 text-primary mx-auto mb-3" />
                            <p className="text-sm text-muted-foreground mb-1">Mobile</p>
                            <p className="text-3xl font-bold text-primary">
                              ${rate.mobile_rate.toFixed(2)}
                            </p>
                            <p className="text-xs text-muted-foreground">/minute</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                          <CardContent className="p-6 text-center">
                            <Building2 className="w-8 h-8 text-accent-foreground mx-auto mb-3" />
                            <p className="text-sm text-muted-foreground mb-1">Landline</p>
                            <p className="text-3xl font-bold">
                              ${rate.landline_rate.toFixed(2)}
                            </p>
                            <p className="text-xs text-muted-foreground">/minute</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Info Cards */}
              <section className="py-12 bg-muted/30">
                <div className="container mx-auto px-4">
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Clock className="w-5 h-5 text-primary" />
                          Best Time to Call
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm mb-2">
                          Timezone: {info.timezone}
                        </p>
                        <p className="font-medium">{info.bestTime}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Globe className="w-5 h-5 text-primary" />
                          Calling Code
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm mb-2">
                          International prefix
                        </p>
                        <p className="font-medium text-2xl">+{rate.country_code}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Zap className="w-5 h-5 text-primary" />
                          Pro Tip
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">{info.tip}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </section>

              {/* Why ZyraCall */}
              <section className="py-12">
                <div className="container mx-auto px-4">
                  <h2 className="text-2xl font-bold mb-6">
                    Why Call {rate.country_name} with ZyraCall?
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Crystal-clear HD voice quality",
                      "No app downloads required",
                      "Pay only for what you use",
                      "No hidden fees or connection charges",
                      "Call from any device with a browser",
                      "Secure and encrypted calls",
                    ].map((benefit) => (
                      <div key={benefit} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* FAQ Section — Q&A Format with speakable snippets */}
              <section className="py-12 bg-muted/30" itemScope itemType="https://schema.org/FAQPage">
                <div className="container mx-auto px-4">
                  <h2 className="text-2xl font-bold mb-6">
                    Frequently Asked Questions About Calling {rate.country_name}
                  </h2>
                  <div className="space-y-4 max-w-3xl">
                    <Card itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-2" itemProp="name">
                          How much does it cost to call {rate.country_name} from a browser?
                        </h3>
                        <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                          <p className="text-muted-foreground" itemProp="text" data-speakable="true">
                            Calling {rate.country_name} with ZyraCall costs ${rate.mobile_rate}/min for mobile phones 
                            and ${rate.landline_rate}/min for landlines. There are no connection fees, no hidden charges, 
                            and no monthly subscriptions. You pay only for the minutes you use.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-2" itemProp="name">
                          Can I call {rate.country_name} mobile and landline numbers?
                        </h3>
                        <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                          <p className="text-muted-foreground" itemProp="text" data-speakable="true">
                            Yes. ZyraCall supports calls to both mobile and landline numbers in {rate.country_name}. 
                            Mobile rates are ${rate.mobile_rate}/min and landline rates are ${rate.landline_rate}/min. 
                            Dial any number directly from your browser with no app downloads required.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-2" itemProp="name">
                          What calling code does {rate.country_name} use?
                        </h3>
                        <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                          <p className="text-muted-foreground" itemProp="text" data-speakable="true">
                            The international calling code for {rate.country_name} is +{rate.country_code}. 
                            When calling with ZyraCall, enter the full number including the country code. 
                            Our dialer automatically formats the number for you.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-2" itemProp="name">
                          What is the best time to call {rate.country_name}?
                        </h3>
                        <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                          <p className="text-muted-foreground" itemProp="text" data-speakable="true">
                            The best time to call {rate.country_name} is during {info.bestTime} ({info.timezone}). 
                            ZyraCall works 24/7, so you can place calls anytime. Rates remain the same regardless 
                            of the time you call.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </section>

              {/* Related Countries & Resources */}
              <section className="py-12">
                <div className="container mx-auto px-4">
                  <div className="grid lg:grid-cols-4 gap-8">
                    {/* Related Countries */}
                    {relatedCountries.length > 0 && (
                      <div className="lg:col-span-3">
                        <h2 className="text-2xl font-bold mb-6">
                          Other Popular Destinations
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {relatedCountries.map((r) => (
                            <Link
                              key={r.id}
                              to={`/call/${toSlug(r.country_name)}`}
                              className="group"
                            >
                              <Card className="hover:border-primary/50 transition-all">
                                <CardContent className="p-4 flex items-center gap-3">
                                  <span className="text-2xl">
                                    {getCountryFlag(r.country_name)}
                                  </span>
                                  <div>
                                    <p className="font-medium text-sm group-hover:text-primary transition-colors">
                                      {r.country_name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      From ${Math.min(r.mobile_rate, r.landline_rate).toFixed(2)}/min
                                    </p>
                                  </div>
                                </CardContent>
                              </Card>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Related Resources Sidebar — driven by topical map */}
                    <div className="lg:col-span-1">
                      {(() => {
                        const related = getRelatedContent(`/call/${country}`);
                        return (
                          <RelatedContent
                            countries={related.countries}
                            comparisons={related.comparisons}
                            articles={related.articles}
                            showRateCalculator={true}
                          />
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : null}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CountryPage;
