import { Link } from "react-router-dom";
import { 
  DollarSign, Clock, Phone, Smartphone, Building2,
  CheckCircle2, ArrowRight, Zap, BookOpen, Lightbulb
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

const tableOfContents = [
  { id: "why-expensive", title: "Why International Calls Are Expensive" },
  { id: "voip-advantage", title: "The VoIP Advantage" },
  { id: "landline-vs-mobile", title: "Landline vs Mobile Rates" },
  { id: "timing-calls", title: "Timing Your Calls" },
  { id: "prepaid-vs-subscription", title: "Prepaid vs Subscription" },
  { id: "top-tips", title: "Top Money-Saving Tips" },
];

const SaveMoneyCalls = () => {
  const breadcrumbs = [
    { name: "Home", url: "https://zyracall.com" },
    { name: "Blog", url: "https://zyracall.com/blog" },
    { name: "Save Money on International Calls", url: "https://zyracall.com/blog/save-money-international-calls-2025" },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Save Money on International Calls in 2025",
    description: "Discover proven strategies to reduce international calling costs by up to 90%. Learn about VoIP, landline vs mobile rates, and more.",
    image: "https://zyracall.com/og-save-money.png",
    datePublished: "2025-01-05",
    dateModified: "2025-01-09",
    author: { "@type": "Organization", name: "ZyraCall" },
    publisher: {
      "@type": "Organization",
      name: "ZyraCall",
      logo: { "@type": "ImageObject", url: "https://zyracall.com/logo.png" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://zyracall.com/blog/save-money-international-calls-2025",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the cheapest way to make international calls?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "VoIP services like ZyraCall offer the cheapest rates, often 80-90% less than traditional carriers. Pay-as-you-go pricing with no subscriptions provides the best value for most users.",
        },
      },
      {
        "@type": "Question",
        name: "Is it cheaper to call landlines or mobile phones?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Landlines are typically 20-50% cheaper to call than mobile phones due to carrier termination fees that apply to mobile calls.",
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="How to Save Money on International Calls in 2025 | ZyraCall"
        description="Discover proven strategies to reduce international calling costs by up to 90%. Learn about VoIP, landline vs mobile rates, timing, and more money-saving tips."
        canonicalUrl="https://zyracall.com/blog/save-money-international-calls-2025"
        keywords="save money international calls, cheap international calls, reduce calling costs, VoIP savings, international calling tips"
        ogImageTitle="Save Money on International Calls"
        ogImageSubtitle="Proven strategies for 2025"
        ogType="article"
        breadcrumbs={breadcrumbs}
        structuredData={[organizationSchema, articleSchema, faqSchema, generateSpeakableSchema("https://zyracall.com/blog/save-money-international-calls-2025", "Save Money on International Calls")]}
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
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
                      <BreadcrumbPage>Save Money on International Calls</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </nav>

              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <DollarSign className="w-4 h-4" />
                  Money-Saving Guide • 8 min read
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  How to Save Money on{" "}
                  <span className="text-primary">International Calls</span> in 2025
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Stop overpaying for international calls. Learn proven strategies that can 
                  reduce your calling costs by up to 90%.
                </p>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-4 gap-12">
                {/* Sidebar */}
                <aside className="lg:col-span-1">
                  <div className="lg:sticky lg:top-24 space-y-6">
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="font-semibold mb-4 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Table of Contents
                        </h2>
                        <nav>
                          <ul className="space-y-2">
                            {tableOfContents.map((item) => (
                              <li key={item.id}>
                                <a href={`#${item.id}`} className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                                  {item.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </nav>
                      </CardContent>
                    </Card>

                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-6">
                        <Zap className="w-8 h-8 text-primary mb-3" />
                        <h3 className="font-semibold mb-2">Start Saving Now</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Try ZyraCall free and see how much you can save on your next international call.
                        </p>
                        <Button size="sm" asChild className="w-full">
                          <Link to="/signup">Get Started Free</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </aside>

                {/* Article Content */}
                <article className="lg:col-span-3 prose prose-lg dark:prose-invert max-w-none">
                  <section id="why-expensive" className="scroll-mt-24 mb-12">
                    <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                      <DollarSign className="w-6 h-6 text-primary flex-shrink-0" />
                      Why are international calls so expensive?
                    </h2>
                    <p className="text-muted-foreground" data-speakable="true">
                      Traditional phone carriers charge premium rates for international calls because 
                      they must pay interconnection fees to foreign carriers. These costs are passed 
                      on to you—often with significant markup.
                    </p>
                    <p className="text-muted-foreground">
                      The good news? Modern VoIP technology bypasses much of this infrastructure, 
                      allowing services like ZyraCall to offer rates that are 80-90% lower than 
                      traditional carriers.
                    </p>
                  </section>

                  <section id="voip-advantage" className="scroll-mt-24 mb-12">
                    <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                      <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                      How does VoIP reduce international calling costs?
                    </h2>
                    <p className="text-muted-foreground">
                      VoIP (Voice over Internet Protocol) sends your calls over the internet instead 
                      of traditional phone lines. This dramatically reduces costs because:
                    </p>
                    <ul className="space-y-2 my-6">
                      {[
                        "No expensive phone line infrastructure needed",
                        "Calls travel via existing internet connections",
                        "Lower termination fees at the destination",
                        "Competition drives prices down",
                      ].map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section id="landline-vs-mobile" className="scroll-mt-24 mb-12">
                    <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                      <Smartphone className="w-6 h-6 text-primary flex-shrink-0" />
                      Is it cheaper to call landlines or mobile phones internationally?
                    </h2>
                    <p className="text-muted-foreground">
                      One of the easiest ways to save is understanding the difference between 
                      landline and mobile rates. Calling a landline is typically 20-50% cheaper 
                      than calling a mobile phone.
                    </p>
                    <Card className="my-6 bg-muted/30">
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-background rounded-lg">
                            <Building2 className="w-8 h-8 text-primary mx-auto mb-2" />
                            <p className="font-semibold">Landline</p>
                            <p className="text-sm text-muted-foreground">Lower termination fees</p>
                          </div>
                          <div className="text-center p-4 bg-background rounded-lg">
                            <Smartphone className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <p className="font-semibold">Mobile</p>
                            <p className="text-sm text-muted-foreground">20-50% higher rates</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <p className="text-muted-foreground">
                      If the person you're calling has both a landline and mobile, ask them which 
                      number is cheaper to reach—it could save you significant money over time.
                    </p>
                  </section>

                  <section id="timing-calls" className="scroll-mt-24 mb-12">
                    <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                      <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                      Does the time of day affect international calling costs?
                    </h2>
                    <p className="text-muted-foreground">
                      While VoIP services like ZyraCall offer flat rates regardless of time, you can 
                      still save by being mindful of call duration. Set a timer or use ZyraCall's 
                      real-time cost display to stay aware of how long you've been talking.
                    </p>
                  </section>

                  <section id="prepaid-vs-subscription" className="scroll-mt-24 mb-12">
                    <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                      <Lightbulb className="w-6 h-6 text-primary flex-shrink-0" />
                      Prepaid vs Subscription
                    </h2>
                    <p className="text-muted-foreground">
                      Subscriptions can seem like good value, but they often lock you into paying 
                      for minutes you don't use. Pay-as-you-go (prepaid) plans are usually better 
                      because you only pay for what you actually use.
                    </p>
                    <Card className="my-6 border-primary/20 bg-primary/5">
                      <CardContent className="p-6">
                        <h4 className="font-semibold mb-2">💡 Pro Tip</h4>
                        <p className="text-sm text-muted-foreground">
                          ZyraCall uses pay-as-you-go pricing with no monthly fees. Your credit never 
                          expires, so you only pay for calls you make.
                        </p>
                      </CardContent>
                    </Card>
                  </section>

                  <section id="top-tips" className="scroll-mt-24 mb-12">
                    <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                      <Zap className="w-6 h-6 text-primary flex-shrink-0" />
                      Top Money-Saving Tips
                    </h2>
                    <div className="grid gap-4 my-6">
                      {[
                        { tip: "Use VoIP services", desc: "Save 80-90% compared to traditional carriers" },
                        { tip: "Call landlines when possible", desc: "20-50% cheaper than mobile" },
                        { tip: "Choose pay-as-you-go", desc: "No wasted monthly subscription fees" },
                        { tip: "Use browser-based calling", desc: "No app downloads or extra charges" },
                        { tip: "Monitor call costs in real-time", desc: "Stay aware of spending during calls" },
                      ].map((item, i) => (
                        <Card key={i}>
                          <CardContent className="p-4 flex items-start gap-3">
                            <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                              {i + 1}
                            </span>
                            <div>
                              <p className="font-semibold">{item.tip}</p>
                              <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>

                  {/* CTA */}
                  <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                    <CardContent className="p-8 text-center">
                      <h3 className="text-2xl font-bold mb-4">Ready to Start Saving?</h3>
                      <p className="text-muted-foreground mb-6">
                        Join thousands of users who save money on international calls with ZyraCall.
                      </p>
                      <Button size="lg" asChild>
                        <Link to="/signup">
                          Try ZyraCall Free
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </article>
              </div>
            </div>
          </section>

          {/* Related Content */}
          <section className="py-12 border-t border-border">
            <div className="container mx-auto px-4">
              <RelatedContent
                variant="footer"
                countries={[
                  { title: "Call India", href: "/call/india" },
                  { title: "Call Nigeria", href: "/call/nigeria" },
                  { title: "Call Philippines", href: "/call/philippines" },
                ]}
                comparisons={[
                  { title: "vs Skype", href: "/compare/zyracall-vs-skype" },
                  { title: "vs Google Voice", href: "/compare/zyracall-vs-google-voice" },
                ]}
                articles={[
                  { title: "International Calling Guide", href: "/blog/international-calling-guide" },
                  { title: "Browser-Based Calling", href: "/blog/browser-based-calling-future" },
                ]}
              />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SaveMoneyCalls;
