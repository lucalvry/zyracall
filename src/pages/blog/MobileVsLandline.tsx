import { Link } from "react-router-dom";
import { 
  Smartphone, Building2, DollarSign, CheckCircle2, ArrowRight, 
  BookOpen, AlertTriangle
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

const MobileVsLandline = () => {
  const breadcrumbs = [
    { name: "Home", url: "https://zyracall.com" },
    { name: "Blog", url: "https://zyracall.com/blog" },
    { name: "Mobile vs Landline", url: "https://zyracall.com/blog/mobile-vs-landline-rates" },
  ];

  return (
    <>
      <SEOHead
        title="Mobile vs Landline: Which is Cheaper for International Calls? | ZyraCall"
        description="Understand the cost difference between calling mobile phones and landlines internationally. Learn when to use each and how to save money."
        canonicalUrl="https://zyracall.com/blog/mobile-vs-landline-rates"
        keywords="mobile vs landline rates, international calling costs, landline cheaper, mobile termination fees"
        ogImageTitle="Mobile vs Landline"
        ogImageSubtitle="Which is Cheaper?"
        ogType="article"
        breadcrumbs={breadcrumbs}
        structuredData={[organizationSchema]}
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
                      <BreadcrumbPage>Mobile vs Landline</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </nav>

              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <DollarSign className="w-4 h-4" />
                  Education • 5 min read
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Mobile vs Landline:{" "}
                  <span className="text-primary">Which is Cheaper</span> for International Calls?
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Understanding the price difference can save you 20-50% on your international calls.
                </p>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <article className="prose prose-lg dark:prose-invert max-w-none">
                  {/* Comparison Cards */}
                  <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
                    <Card className="border-primary/30 bg-primary/5">
                      <CardContent className="p-6 text-center">
                        <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Landline</h3>
                        <p className="text-3xl font-bold text-primary mb-2">20-50%</p>
                        <p className="text-sm text-muted-foreground">Cheaper on average</p>
                      </CardContent>
                    </Card>
                    <Card className="border-border">
                      <CardContent className="p-6 text-center">
                        <Smartphone className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Mobile</h3>
                        <p className="text-3xl font-bold mb-2">Higher</p>
                        <p className="text-sm text-muted-foreground">Due to termination fees</p>
                      </CardContent>
                    </Card>
                  </div>

                  <h2 className="flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-primary" />
                    Why the Difference?
                  </h2>
                  <p className="text-muted-foreground">
                    Mobile carriers charge "termination fees" when calls reach mobile phones. These 
                    fees are significantly higher than landline termination costs. VoIP providers 
                    like ZyraCall must pay these fees, which is why mobile rates are higher.
                  </p>

                  <h2 className="flex items-center gap-3 mt-12">
                    <BookOpen className="w-6 h-6 text-primary" />
                    Country Examples
                  </h2>
                  <p className="text-muted-foreground">
                    The difference varies by country. Here are some typical examples:
                  </p>

                  <div className="my-6 not-prose">
                    <Card>
                      <CardContent className="p-0">
                        <table className="w-full text-sm">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="text-left p-3">Country</th>
                              <th className="text-right p-3">Landline</th>
                              <th className="text-right p-3">Mobile</th>
                              <th className="text-right p-3">Savings</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { country: "India", landline: "$0.01", mobile: "$0.02", savings: "50%" },
                              { country: "UK", landline: "$0.01", mobile: "$0.03", savings: "67%" },
                              { country: "Nigeria", landline: "$0.03", mobile: "$0.05", savings: "40%" },
                              { country: "Mexico", landline: "$0.02", mobile: "$0.03", savings: "33%" },
                            ].map((row) => (
                              <tr key={row.country} className="border-t border-border">
                                <td className="p-3 font-medium">{row.country}</td>
                                <td className="p-3 text-right text-primary">{row.landline}</td>
                                <td className="p-3 text-right">{row.mobile}</td>
                                <td className="p-3 text-right text-green-600">{row.savings}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </CardContent>
                    </Card>
                    <p className="text-xs text-muted-foreground mt-2">*Rates are examples and may vary</p>
                  </div>

                  <h2 className="flex items-center gap-3 mt-12">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                    When to Call Landlines
                  </h2>
                  <ul className="space-y-2 my-6 not-prose">
                    {[
                      "Calling older family members at home",
                      "Business calls to offices",
                      "Long conversations where cost matters",
                      "When the recipient is typically at a fixed location",
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
                      <h3 className="text-2xl font-bold mb-4">Check Rates for Any Country</h3>
                      <p className="text-muted-foreground mb-6">
                        See both mobile and landline rates for 200+ countries.
                      </p>
                      <Button size="lg" asChild>
                        <Link to="/rates">
                          View All Rates
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
              { title: "Call India", href: "/call/india" },
              { title: "Call UK", href: "/call/united-kingdom" },
              { title: "Call Nigeria", href: "/call/nigeria" },
            ]}
            articles={[
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

export default MobileVsLandline;
