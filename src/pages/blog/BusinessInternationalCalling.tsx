import { Link } from "react-router-dom";
import { 
  Briefcase, CheckCircle2, ArrowRight, DollarSign, Shield,
  Users, Clock, Phone, BarChart3, Globe
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

const BusinessInternationalCalling = () => {
  const breadcrumbs = [
    { name: "Home", url: "https://zyracall.com" },
    { name: "Blog", url: "https://zyracall.com/blog" },
    { name: "Business International Calling", url: "https://zyracall.com/blog/business-international-calling" },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Business International Calling: A Complete Guide for SMBs",
    description: "Learn how small and medium businesses can save on international calling costs while maintaining professional communication quality.",
    datePublished: "2025-01-14",
    dateModified: "2025-01-15",
    author: { "@type": "Organization", name: "ZyraCall" },
    publisher: {
      "@type": "Organization",
      name: "ZyraCall",
      logo: { "@type": "ImageObject", url: "https://zyracall.com/logo.png" },
    },
  };

  const challenges = [
    {
      icon: DollarSign,
      title: "High Carrier Costs",
      description: "Traditional business phone plans charge premium rates for international calls, often $0.50-$2.00+ per minute.",
    },
    {
      icon: Users,
      title: "Team Coordination",
      description: "Managing international calling across multiple team members can be complex and hard to track.",
    },
    {
      icon: Clock,
      title: "Time Zone Management",
      description: "Scheduling calls with international clients requires careful time zone coordination.",
    },
    {
      icon: Shield,
      title: "Call Quality Concerns",
      description: "Poor call quality can impact professional relationships and deal outcomes.",
    },
  ];

  const solutions = [
    {
      icon: Phone,
      title: "Browser-Based Calling",
      description: "No hardware or apps required. Your team can make calls from any computer.",
      benefit: "Zero IT overhead",
    },
    {
      icon: DollarSign,
      title: "Pay-Per-Minute Model",
      description: "Only pay for what you use. No monthly minimums or unused minute waste.",
      benefit: "Reduce costs 70-90%",
    },
    {
      icon: BarChart3,
      title: "Centralized Billing",
      description: "One account for the whole team with detailed call logs and usage reports.",
      benefit: "Easy expense tracking",
    },
    {
      icon: Globe,
      title: "Consistent Quality Worldwide",
      description: "HD voice quality to any country with optimized routing.",
      benefit: "Professional impression",
    },
  ];

  return (
    <>
      <SEOHead
        title="Business International Calling: Complete Guide for SMBs | ZyraCall"
        description="Learn how small and medium businesses can save on international calling. Reduce costs 70-90% while maintaining professional call quality."
        canonicalUrl="https://zyracall.com/blog/business-international-calling"
        keywords="business international calling, cheap international calls for business, voip for small business, smb international calling, business phone international rates"
        ogImageTitle="Business Calling Guide"
        ogImageSubtitle="For Small & Medium Businesses"
        ogType="article"
        breadcrumbs={breadcrumbs}
        structuredData={[organizationSchema, articleSchema, generateSpeakableSchema("https://zyracall.com/blog/business-international-calling", "Business International Calling")]}
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
                      <BreadcrumbPage>Business International Calling</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </nav>

              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Briefcase className="w-4 h-4" />
                  Business • 7 min read
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Business International Calling:{" "}
                  <span className="text-primary">A Complete Guide</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  How small and medium businesses can cut international calling costs 
                  by 70-90% while maintaining professional quality.
                </p>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <article className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-muted-foreground text-lg" data-speakable="true">
                    For businesses with international clients, suppliers, or remote teams,
                    calling costs can quickly spiral out of control. VoIP browser-based calling reduces
                    international calling costs by 70–90% compared to traditional carrier plans,
                    with no app installs, no per-seat licensing, and pay-as-you-go pricing.
                  </p>

                  <h2 className="flex items-center gap-3 mt-12">
                    <Briefcase className="w-6 h-6 text-primary" />
                    What are the biggest challenges of business international calling?
                  </h2>

                  <div className="grid gap-4 my-8 not-prose">
                    {challenges.map((challenge, index) => (
                      <Card key={index}>
                        <CardContent className="p-4 flex items-start gap-4">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                            <challenge.icon className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{challenge.title}</h3>
                            <p className="text-sm text-muted-foreground">{challenge.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <h2 className="flex items-center gap-3 mt-12">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                    Modern Solutions for Business Calling
                  </h2>
                  <p className="text-muted-foreground">
                    VoIP and browser-based calling have transformed business communications:
                  </p>

                  <div className="grid gap-4 my-8 not-prose">
                    {solutions.map((solution, index) => (
                      <Card key={index} className="border-primary/20">
                        <CardContent className="p-4 flex items-start gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <solution.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <h3 className="font-semibold">{solution.title}</h3>
                              <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
                                {solution.benefit}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{solution.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <h2 className="flex items-center gap-3 mt-12">
                    <DollarSign className="w-6 h-6 text-primary" />
                    Cost Comparison: Traditional vs VoIP
                  </h2>

                  <div className="my-6 not-prose">
                    <Card>
                      <CardContent className="p-0">
                        <table className="w-full text-sm">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="text-left p-4">Scenario</th>
                              <th className="text-right p-4">Carrier Plan</th>
                              <th className="text-right p-4">VoIP</th>
                              <th className="text-right p-4">Savings</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { scenario: "10 calls/month to UK (30 min each)", carrier: "$150-300", voip: "$9", savings: "94-97%" },
                              { scenario: "Weekly calls to India (1 hr each)", carrier: "$200-400", voip: "$4.80", savings: "97-99%" },
                              { scenario: "Daily calls to Germany (15 min)", carrier: "$450-900", voip: "$13.50", savings: "97-98%" },
                            ].map((row) => (
                              <tr key={row.scenario} className="border-t border-border">
                                <td className="p-4">{row.scenario}</td>
                                <td className="p-4 text-right text-muted-foreground">{row.carrier}</td>
                                <td className="p-4 text-right text-primary font-semibold">{row.voip}</td>
                                <td className="p-4 text-right text-green-600 font-semibold">{row.savings}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </CardContent>
                    </Card>
                  </div>

                  <h2 className="flex items-center gap-3 mt-12">
                    <Shield className="w-6 h-6 text-primary" />
                    Business-Specific Considerations
                  </h2>
                  <ul className="space-y-2 my-6 not-prose">
                    {[
                      "Call logs for expense reporting and client billing",
                      "HD audio quality for professional impression",
                      "Reliable connections for important negotiations",
                      "No installation required—works from any browser",
                      "Scales with your team without per-seat licensing",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Card className="my-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 not-prose">
                    <CardContent className="p-8 text-center">
                      <h3 className="text-2xl font-bold mb-4">Ready to Cut Your Business Calling Costs?</h3>
                      <p className="text-muted-foreground mb-6">
                        Start with a free trial and see how much your business can save.
                      </p>
                      <Button size="lg" asChild>
                        <Link to="/signup">
                          Start Free Business Trial
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
            countries={[
              { title: "Call UK", href: "/call/united-kingdom" },
              { title: "Call Germany", href: "/call/germany" },
              { title: "Call India", href: "/call/india" },
            ]}
            articles={[
              { title: "VoIP Quality Guide", href: "/blog/voip-quality-guide" },
              { title: "Save Money on Calls", href: "/blog/save-money-international-calls-2025" },
              { title: "International Calling Guide", href: "/blog/international-calling-guide" },
            ]}
          />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BusinessInternationalCalling;
