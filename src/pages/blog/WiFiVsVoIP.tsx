import { Link } from "react-router-dom";
import { 
  Wifi, Phone, CheckCircle2, ArrowRight, XCircle,
  Smartphone, Globe, DollarSign, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SEOHead, { organizationSchema, generateSpeakableSchema } from "@/components/seo/SEOHead";
import RelatedContent from "@/components/seo/RelatedContent";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const WiFiVsVoIP = () => {
  const breadcrumbs = [
    { name: "Home", url: "https://zyracall.com" },
    { name: "Blog", url: "https://zyracall.com/blog" },
    { name: "WiFi Calling vs VoIP", url: "https://zyracall.com/blog/wifi-calling-vs-voip" },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "WiFi Calling vs VoIP: What's the Difference?",
    description: "Understand the key differences between WiFi calling and VoIP services, and learn which option is best for international calls.",
    datePublished: "2025-01-10",
    dateModified: "2025-01-15",
    author: { "@type": "Organization", name: "ZyraCall" },
    publisher: {
      "@type": "Organization",
      name: "ZyraCall",
      logo: { "@type": "ImageObject", url: "https://zyracall.com/logo.png" },
    },
  };

  const comparisonData = [
    {
      feature: "How it works",
      wifi: "Uses your carrier's network over WiFi",
      voip: "Uses internet protocol directly",
    },
    {
      feature: "International rates",
      wifi: "Carrier rates apply",
      voip: "Much cheaper (up to 90% less)",
      wifiNegative: true,
    },
    {
      feature: "Phone number",
      wifi: "Uses your existing number",
      voip: "Can use any number or none",
    },
    {
      feature: "Requires carrier plan",
      wifi: "Yes, active plan required",
      voip: "No, standalone service",
      wifiNegative: true,
    },
    {
      feature: "Call quality",
      wifi: "Good (carrier dependent)",
      voip: "Excellent (HD audio)",
    },
    {
      feature: "Works without cell service",
      wifi: "Yes, with WiFi",
      voip: "Yes, with any internet",
    },
    {
      feature: "Call any phone number",
      wifi: "Yes",
      voip: "Yes",
    },
    {
      feature: "Monthly cost",
      wifi: "Included in plan",
      voip: "Pay as you go",
    },
  ];

  return (
    <>
      <SEOHead
        title="WiFi Calling vs VoIP: What's the Difference? | ZyraCall"
        description="Understand the key differences between WiFi calling and VoIP. Learn which is better for international calls and how to save money."
        canonicalUrl="https://zyracall.com/blog/wifi-calling-vs-voip"
        keywords="wifi calling vs voip, difference wifi calling voip, which is better wifi or voip, voip international calls, wifi calling international"
        ogImageTitle="WiFi Calling vs VoIP"
        ogImageSubtitle="What's the Difference?"
        ogType="article"
        breadcrumbs={breadcrumbs}
        structuredData={[organizationSchema, articleSchema]}
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* Hero */}
          <section className="relative py-16 lg:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="container mx-auto px-4 relative">
              <nav aria-label="Breadcrumb" className="mb-8">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild><Link to="/blog">Blog</Link></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>WiFi Calling vs VoIP</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </nav>

              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Wifi className="w-4 h-4" />
                  Technology • 5 min read
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  WiFi Calling vs VoIP:{" "}
                  <span className="text-primary">What's the Difference?</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Both use the internet to make calls, but they work very differently. 
                  Understanding the distinction can save you money.
                </p>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <article className="prose prose-lg dark:prose-invert max-w-none">
                  {/* Quick Answer */}
                  <Card className="my-8 border-primary/30 bg-primary/5 not-prose">
                    <CardContent className="p-6">
                      <h2 className="text-lg font-bold mb-3">Quick Answer</h2>
                      <p className="text-muted-foreground">
                        <strong>WiFi Calling</strong> is your phone carrier's service that routes calls 
                        over WiFi instead of cell towers—but you still pay carrier rates. 
                        <strong> VoIP</strong> (like ZyraCall) is a separate service that bypasses 
                        carriers entirely, offering much cheaper international rates.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Visual Comparison Cards */}
                  <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
                    <Card className="border-border">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                            <Wifi className="w-6 h-6" />
                          </div>
                          <h3 className="text-xl font-bold">WiFi Calling</h3>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          Built into your phone, uses your carrier's network over WiFi.
                        </p>
                        <ul className="space-y-2">
                          {[
                            { text: "Uses existing phone number", positive: true },
                            { text: "Carrier rates apply", positive: false },
                            { text: "Requires active carrier plan", positive: false },
                            { text: "Works in weak signal areas", positive: true },
                          ].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              {item.positive ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              ) : (
                                <XCircle className="w-4 h-4 text-destructive" />
                              )}
                              <span className={item.positive ? "" : "text-muted-foreground"}>
                                {item.text}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-primary/30 bg-primary/5">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                            <Phone className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="text-xl font-bold">VoIP (ZyraCall)</h3>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          Independent service using internet protocol for calls.
                        </p>
                        <ul className="space-y-2">
                          {[
                            { text: "Rates up to 90% cheaper", positive: true },
                            { text: "No carrier plan needed", positive: true },
                            { text: "Works from any device", positive: true },
                            { text: "HD voice quality", positive: true },
                          ].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              <span>{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <h2 className="flex items-center gap-3 mt-12">
                    <Globe className="w-6 h-6 text-primary" />
                    Side-by-Side Comparison
                  </h2>

                  <div className="my-6 not-prose">
                    <Card>
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-muted/50">
                              <tr>
                                <th className="text-left p-4">Feature</th>
                                <th className="text-center p-4">WiFi Calling</th>
                                <th className="text-center p-4">VoIP</th>
                              </tr>
                            </thead>
                            <tbody>
                              {comparisonData.map((row) => (
                                <tr key={row.feature} className="border-t border-border">
                                  <td className="p-4 font-medium">{row.feature}</td>
                                  <td className={`p-4 text-center ${row.wifiNegative ? 'text-muted-foreground' : ''}`}>
                                    {row.wifi}
                                  </td>
                                  <td className="p-4 text-center text-primary">{row.voip}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <h2 className="flex items-center gap-3 mt-12">
                    <DollarSign className="w-6 h-6 text-primary" />
                    The Cost Difference for International Calls
                  </h2>
                  <p className="text-muted-foreground">
                    This is where the difference matters most. With WiFi calling, you're still 
                    using your carrier's international rates—which can be $0.25-$2.00+ per minute. 
                    With VoIP services like ZyraCall, you're bypassing the carrier entirely and 
                    paying as little as $0.01-$0.05 per minute.
                  </p>

                  <Card className="my-6 border-primary/20 bg-primary/5 not-prose">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-3">Example: 30-minute call to India</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">WiFi Calling</p>
                          <p className="text-2xl font-bold">$7.50</p>
                          <p className="text-xs text-muted-foreground">@ $0.25/min</p>
                        </div>
                        <div className="text-center p-4 bg-primary/20 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">ZyraCall (VoIP)</p>
                          <p className="text-2xl font-bold text-primary">$0.60</p>
                          <p className="text-xs text-muted-foreground">@ $0.02/min</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <h2 className="flex items-center gap-3 mt-12">
                    <Shield className="w-6 h-6 text-primary" />
                    When to Use Each
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Use WiFi Calling when:</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Making domestic calls with weak cell signal</li>
                          <li>• You need to use your regular phone number</li>
                          <li>• Emergency calls (911) on WiFi</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="border-primary/30">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Use VoIP when:</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Making international calls</li>
                          <li>• You want to save money</li>
                          <li>• Calling from any device (laptop, tablet)</li>
                          <li>• You don't have a carrier plan</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* CTA */}
                  <Card className="my-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 not-prose">
                    <CardContent className="p-8 text-center">
                      <h3 className="text-2xl font-bold mb-4">Try VoIP for Your Next International Call</h3>
                      <p className="text-muted-foreground mb-6">
                        See the difference yourself. Sign up free and compare the quality and savings.
                      </p>
                      <Button size="lg" asChild>
                        <Link to="/signup">
                          Start Free Trial
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </article>
              </div>
            </div>
          </section>

          <RelatedContent
            variant="footer"
            articles={[
              { title: "Browser-Based Calling", href: "/blog/browser-based-calling-future" },
              { title: "VoIP Quality Guide", href: "/blog/voip-quality-guide" },
              { title: "Save Money on Calls", href: "/blog/save-money-international-calls-2025" },
            ]}
            comparisons={[
              { title: "vs Skype", href: "/compare/zyracall-vs-skype" },
              { title: "vs Google Voice", href: "/compare/zyracall-vs-google-voice" },
            ]}
          />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default WiFiVsVoIP;
