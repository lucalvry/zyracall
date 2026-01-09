import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Globe, Info, Loader2, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import RateCalculator from "@/components/rates/RateCalculator";
import { useCallRates, getCountryFlag } from "@/hooks/useCallRates";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const faqItems = [
  {
    question: "How are calls billed?",
    answer: "Calls are billed per minute with per-second billing after the first minute. You only pay for what you use."
  },
  {
    question: "Why are your rates so low?",
    answer: "We use efficient VoIP technology and partner with multiple carriers to negotiate the best rates, passing the savings directly to you."
  },
  {
    question: "Are there any hidden fees?",
    answer: "No hidden fees whatsoever. The rate you see is the rate you pay. No connection fees, no monthly charges, no surprises."
  }
];

const generateServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "ZyraCall International Calling",
  "description": "Low-cost international calling rates with no hidden fees. Pay only for what you use with per-second billing.",
  "url": "https://zyracall.com/rates",
  "provider": {
    "@type": "Organization",
    "name": "ZyraCall",
    "url": "https://zyracall.com"
  },
  "serviceType": "VoIP Calling Service",
  "areaServed": {
    "@type": "Place",
    "name": "Worldwide"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "description": "Per-minute rates with per-second billing after the first minute",
    "availability": "https://schema.org/InStock"
  }
});

const generateFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
});

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://zyracall.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Rates",
      "item": "https://zyracall.com/rates"
    }
  ]
};

const PublicRates = () => {
  const [search, setSearch] = useState("");
  const [showAllRates, setShowAllRates] = useState(false);
  const { data: rates = [], isLoading, error } = useCallRates(search);

  return (
    <>
      <Helmet>
        <title>International Calling Rates | ZyraCall - Transparent Pricing</title>
        <meta name="description" content="View ZyraCall's low-cost international calling rates. Pay only for what you use with no hidden fees. Check rates for 200+ countries." />
        <link rel="canonical" href="https://zyracall.com/rates" />
        <meta name="keywords" content="international calling rates, cheap calls abroad, VoIP pricing, per-minute rates, call overseas cost, international phone rates" />
        
        {/* Open Graph */}
        <meta property="og:title" content="International Calling Rates | ZyraCall" />
        <meta property="og:description" content="View ZyraCall's low-cost international calling rates. Pay only for what you use with no hidden fees." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zyracall.com/rates" />
        <meta property="og:site_name" content="ZyraCall" />
        <meta property="og:image" content="https://zyracall.com/og-rates.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="International Calling Rates | ZyraCall" />
        <meta name="twitter:description" content="View ZyraCall's low-cost international calling rates. Pay only for what you use with no hidden fees." />
        <meta name="twitter:image" content="https://zyracall.com/og-rates.png" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(generateServiceSchema())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateFAQSchema())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4">
            {/* Breadcrumb Navigation */}
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Rates</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Header */}
            <div className="text-center mb-12">
              <span className="inline-block text-accent font-medium text-sm tracking-wide uppercase mb-4">
                Transparent Pricing
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Low-cost international calling rates
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Pay only for what you use. No subscriptions, no hidden fees.
              </p>
            </div>

            {/* Rate Calculator - Primary Focus */}
            <div className="max-w-lg mx-auto mb-16">
              <RateCalculator />
            </div>

            {/* Info Banner */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20 mb-8 max-w-3xl mx-auto">
              <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-foreground">
                  <strong>Simple billing.</strong> Per-minute rates with per-second billing after the first minute. What you see is what you pay.
                </p>
              </div>
            </div>

            {/* Collapsible Rates Table */}
            <Collapsible open={showAllRates} onOpenChange={setShowAllRates} className="max-w-3xl mx-auto">
              <CollapsibleTrigger className="flex items-center justify-center gap-2 w-full py-4 text-muted-foreground hover:text-foreground transition-colors">
                <span className="font-medium">
                  {showAllRates ? "Hide all rates" : "View all country rates"}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showAllRates ? "rotate-180" : ""}`} />
              </CollapsibleTrigger>

              <CollapsibleContent>
                {/* Search */}
                <div className="relative mb-6 max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by country or code..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Loading State */}
                {isLoading && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                )}

                {/* Error State */}
                {error && (
                  <div className="text-center py-12">
                    <p className="text-destructive">Failed to load rates. Please try again.</p>
                  </div>
                )}

                {/* Rates Table */}
                {!isLoading && !error && rates.length > 0 && (
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                              Country
                            </th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                              Code
                            </th>
                            <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">
                              Mobile
                            </th>
                            <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">
                              Landline
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {rates.map((rate) => (
                            <tr key={rate.id} className="hover:bg-muted/30 transition-colors">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">{getCountryFlag(rate.country_name)}</span>
                                  <span className="font-medium text-foreground">{rate.country_name}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-muted-foreground font-mono">
                                +{rate.country_code}
                              </td>
                              <td className="px-4 py-3 text-right font-mono text-foreground">
                                ${rate.mobile_rate.toFixed(2)}/min
                              </td>
                              <td className="px-4 py-3 text-right font-mono text-foreground">
                                ${rate.landline_rate.toFixed(2)}/min
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {!isLoading && !error && rates.length === 0 && (
                  <div className="text-center py-12">
                    <Globe className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No countries found</h3>
                    <p className="text-muted-foreground">
                      Try a different search term
                    </p>
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>

            {/* FAQ Section */}
            <section className="max-w-3xl mx-auto mt-16 mb-16" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-2xl font-bold text-foreground mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
                {faqItems.map((item, index) => (
                  <article 
                    key={index}
                    className="bg-card border border-border/50 rounded-xl p-5"
                    itemScope
                    itemProp="mainEntity"
                    itemType="https://schema.org/Question"
                  >
                    <h3 className="font-semibold text-foreground mb-2" itemProp="name">{item.question}</h3>
                    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p className="text-muted-foreground text-sm" itemProp="text">
                        {item.answer}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PublicRates;
