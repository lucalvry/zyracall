import { Link } from "react-router-dom";
import { 
  Users, Clock, Heart, Globe, CheckCircle2, ArrowRight, 
  BookOpen, Zap, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SEOHead, { organizationSchema } from "@/components/seo/SEOHead";
import RelatedContent from "@/components/seo/RelatedContent";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ExpatCallingGuide = () => {
  const breadcrumbs = [
    { name: "Home", url: "https://zyracall.com" },
    { name: "Blog", url: "https://zyracall.com/blog" },
    { name: "Expat Calling Guide", url: "https://zyracall.com/blog/expat-calling-family-guide" },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Calling Family Abroad: Complete Guide for Expats",
    description: "Essential tips for expats staying connected with family back home. Time zone management, cultural considerations, and cost-saving strategies.",
    datePublished: "2024-12-28",
    dateModified: "2025-01-09",
    author: { "@type": "Organization", name: "ZyraCall" },
  };

  return (
    <>
      <SEOHead
        title="Calling Family Abroad: Complete Guide for Expats | ZyraCall"
        description="Essential tips for expats staying connected with family back home. Time zone management, cultural considerations, and cost-saving strategies."
        canonicalUrl="https://zyracall.com/blog/expat-calling-family-guide"
        keywords="expat calling, call family abroad, staying connected overseas, international family calls, expat communication"
        ogImageTitle="Expat Calling Guide"
        ogImageSubtitle="Stay Connected with Family"
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
                      <BreadcrumbPage>Expat Calling Guide</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </nav>

              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Heart className="w-4 h-4" />
                  Guides • 7 min read
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Calling Family Abroad:{" "}
                  <span className="text-primary">Complete Guide</span> for Expats
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Tips and tools for maintaining strong connections with loved ones 
                  across borders and time zones.
                </p>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <article className="prose prose-lg dark:prose-invert max-w-none">
                  <h2 className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-primary" />
                    Managing Time Zones
                  </h2>
                  <p className="text-muted-foreground">
                    The biggest challenge for expats is finding the right time to call. Here are 
                    some strategies that work:
                  </p>
                  
                  <div className="grid gap-4 my-6 not-prose">
                    {[
                      { title: "Weekend Mornings", desc: "Often work for both sides—your morning, their evening (or vice versa)" },
                      { title: "Schedule Regular Calls", desc: "Set a recurring time that works for both parties" },
                      { title: "Use World Clock Apps", desc: "Always know what time it is back home" },
                    ].map((item, i) => (
                      <Card key={i}>
                        <CardContent className="p-4 flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <h2 className="flex items-center gap-3 mt-12">
                    <Users className="w-6 h-6 text-primary" />
                    Group Calling Tips
                  </h2>
                  <p className="text-muted-foreground">
                    Family gatherings are harder to join remotely, but with the right approach, 
                    you can still be part of special moments:
                  </p>
                  <ul className="space-y-2 my-6 not-prose">
                    {[
                      "Have someone dedicated to holding the phone/tablet",
                      "Use a tripod or stand for stable video",
                      "Call landlines for clearer audio during gatherings",
                      "Schedule calls around meal times for natural conversations",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <h2 className="flex items-center gap-3 mt-12">
                    <Globe className="w-6 h-6 text-primary" />
                    Calling Older Family Members
                  </h2>
                  <p className="text-muted-foreground">
                    Not everyone has smartphones or reliable internet. For older family members 
                    with landlines, services like ZyraCall let you call their regular phone 
                    number directly—no app needed on their end.
                  </p>

                  <Card className="my-6 border-primary/20 bg-primary/5 not-prose">
                    <CardContent className="p-6">
                      <Zap className="w-8 h-8 text-primary mb-3" />
                      <h4 className="font-semibold mb-2">ZyraCall Advantage</h4>
                      <p className="text-sm text-muted-foreground">
                        Call any phone number worldwide—landline or mobile. Your family doesn't need 
                        any app or internet. Just answer their regular phone.
                      </p>
                    </CardContent>
                  </Card>

                  {/* CTA */}
                  <Card className="my-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 not-prose">
                    <CardContent className="p-8 text-center">
                      <h3 className="text-2xl font-bold mb-4">Stay Connected with Family</h3>
                      <p className="text-muted-foreground mb-6">
                        ZyraCall makes it easy and affordable to call family anywhere in the world.
                      </p>
                      <Button size="lg" asChild>
                        <Link to="/signup">
                          Start Calling Today
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
              { title: "Call Philippines", href: "/call/philippines" },
              { title: "Call Mexico", href: "/call/mexico" },
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

export default ExpatCallingGuide;
