import { Link } from "react-router-dom";
import { 
  Phone, Globe, Wifi, DollarSign, Shield, Clock, 
  CheckCircle2, ArrowRight, Smartphone, Building2,
  BookOpen, Zap, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SEOHead, { organizationSchema, generateSpeakableSchema } from "@/components/seo/SEOHead";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const tableOfContents = [
  { id: "what-is", title: "What is International Calling?" },
  { id: "how-voip-works", title: "How VoIP Technology Works" },
  { id: "understanding-rates", title: "Understanding Calling Rates" },
  { id: "mobile-vs-landline", title: "Mobile vs Landline Costs" },
  { id: "saving-money", title: "Tips for Saving Money" },
  { id: "choosing-service", title: "Choosing the Right Service" },
  { id: "getting-started", title: "Getting Started with ZyraCall" },
];

const InternationalCallingGuide = () => {
  const breadcrumbs = [
    { name: "Home", url: "https://zyracall.com" },
    { name: "Blog", url: "https://zyracall.com/blog" },
    { name: "International Calling Guide", url: "https://zyracall.com/blog/international-calling-guide" },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Ultimate Guide to International Calling in 2025",
    description: "Everything you need to know about making cheap international calls. Learn about VoIP technology, calling rates, and how to save money.",
    image: "https://zyracall.com/og-international-guide.png",
    datePublished: "2025-01-01",
    dateModified: "2025-01-09",
    author: {
      "@type": "Organization",
      name: "ZyraCall",
    },
    publisher: {
      "@type": "Organization",
      name: "ZyraCall",
      logo: {
        "@type": "ImageObject",
        url: "https://zyracall.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://zyracall.com/blog/international-calling-guide",
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
          text: "VoIP (Voice over Internet Protocol) services like ZyraCall offer the cheapest international calling rates. They use your internet connection instead of traditional phone lines, which dramatically reduces costs. Rates can be as low as $0.01 per minute to popular destinations.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to download an app to make international calls?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not with browser-based services like ZyraCall. You can make international calls directly from your web browser without downloading any apps. Just sign up, add credit, and start calling.",
        },
      },
      {
        "@type": "Question",
        name: "Why are mobile rates higher than landline rates?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mobile carriers charge termination fees when calls reach mobile phones. These fees are passed on by VoIP providers. Landlines typically have lower termination costs, resulting in cheaper rates.",
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Ultimate Guide to International Calling 2025 | ZyraCall"
        description="Everything you need to know about making cheap international calls. Learn about VoIP technology, calling rates, mobile vs landline costs, and money-saving tips."
        canonicalUrl="https://zyracall.com/blog/international-calling-guide"
        keywords="international calling guide, cheap international calls, VoIP calling, how to call abroad, international calling rates, save money on calls"
        ogImageTitle="Ultimate Guide to International Calling"
        ogImageSubtitle="Everything you need to know in 2025"
        ogImageType="default"
        ogType="article"
        breadcrumbs={breadcrumbs}
        structuredData={[organizationSchema, articleSchema, faqSchema, generateSpeakableSchema("https://zyracall.com/blog/international-calling-guide", "International Calling Guide")]}
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative py-16 lg:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="container mx-auto px-4 relative">
              {/* Breadcrumbs */}
              <nav aria-label="Breadcrumb" className="mb-8">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to="/">Home</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to="/blog">Blog</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>International Calling Guide</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </nav>

              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <BookOpen className="w-4 h-4" />
                  Complete Guide • 15 min read
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  The Ultimate Guide to{" "}
                  <span className="text-primary">International Calling</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Everything you need to know about making cheap, crystal-clear 
                  international calls in 2025. From VoIP technology to money-saving 
                  tips, this guide covers it all.
                </p>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-4 gap-12">
                {/* Sidebar - Table of Contents */}
                <aside className="lg:col-span-1">
                  <div className="lg:sticky lg:top-24">
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
                                <a
                                  href={`#${item.id}`}
                                  className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1"
                                >
                                  {item.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </nav>
                      </CardContent>
                    </Card>

                    {/* Quick CTA */}
                    <Card className="mt-6 bg-primary/5 border-primary/20">
                      <CardContent className="p-6">
                        <Zap className="w-8 h-8 text-primary mb-3" />
                        <h3 className="font-semibold mb-2">Ready to Start?</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Try ZyraCall free and make your first international call today.
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
                  {/* Section 1: What is International Calling */}
                  <section id="what-is" className="scroll-mt-24 mb-12">
                    <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                      <Globe className="w-6 h-6 text-primary flex-shrink-0" />
                      What is International Calling?
                    </h2>
                    <p className="text-muted-foreground">
                      International calling refers to making phone calls from one country to another. 
                      Whether you are calling family abroad, conducting business overseas, or staying 
                      connected with friends around the world, international calling bridges the gap 
                      between nations.
                    </p>
                    <p className="text-muted-foreground">
                      Traditionally, international calls were expensive due to the complex infrastructure 
                      required to route calls across countries. However, modern technology—particularly 
                      VoIP (Voice over Internet Protocol)—has revolutionized how we communicate globally, 
                      making international calls more affordable and accessible than ever.
                    </p>
                    
                    <Card className="my-6 bg-muted/30">
                      <CardContent className="p-6">
                        <h4 className="font-semibold mb-3">Key Benefits of Modern International Calling:</h4>
                        <ul className="space-y-2">
                          {[
                            "Rates as low as $0.01 per minute",
                            "Crystal-clear HD voice quality",
                            "No special equipment needed",
                            "Call any phone number worldwide",
                          ].map((benefit) => (
                            <li key={benefit} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Section 2: How VoIP Works */}
                  <section id="how-voip-works" className="scroll-mt-24 mb-12">
                    <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                      <Wifi className="w-6 h-6 text-primary flex-shrink-0" />
                      How VoIP Technology Works
                    </h2>
                    <p className="text-muted-foreground">
                      VoIP (Voice over Internet Protocol) is the technology that powers modern 
                      international calling services like ZyraCall. Instead of using traditional 
                      telephone lines, VoIP converts your voice into digital data packets and 
                      transmits them over the internet.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4 my-6">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-lg font-bold text-primary">1</span>
                          </div>
                          <h4 className="font-semibold text-sm mb-1">Voice Capture</h4>
                          <p className="text-xs text-muted-foreground">
                            Your microphone captures your voice
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-lg font-bold text-primary">2</span>
                          </div>
                          <h4 className="font-semibold text-sm mb-1">Digital Conversion</h4>
                          <p className="text-xs text-muted-foreground">
                            Audio is converted to data packets
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-lg font-bold text-primary">3</span>
                          </div>
                          <h4 className="font-semibold text-sm mb-1">Internet Transmission</h4>
                          <p className="text-xs text-muted-foreground">
                            Data travels via internet to destination
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <p className="text-muted-foreground">
                      This process happens in milliseconds, providing real-time communication that 
                      often sounds better than traditional phone calls. Because VoIP uses existing 
                      internet infrastructure, providers can offer significantly lower rates than 
                      traditional carriers.
                    </p>
                  </section>

                  {/* Section 3: Understanding Rates */}
                  <section id="understanding-rates" className="scroll-mt-24 mb-12">
                    <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                      <DollarSign className="w-6 h-6 text-primary flex-shrink-0" />
                      Understanding Calling Rates
                    </h2>
                    <p className="text-muted-foreground">
                      International calling rates vary based on several factors. Understanding these 
                      factors helps you make informed decisions and find the best deals for your 
                      calling needs.
                    </p>

                    <h3 className="text-xl font-semibold mt-6 mb-3">Factors That Affect Rates:</h3>
                    <ul className="space-y-4 my-6">
                      <li className="flex gap-4">
                        <Globe className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <strong>Destination Country:</strong>
                          <p className="text-sm text-muted-foreground">
                            Rates vary by country based on local telecom infrastructure and regulations. 
                            Popular destinations like the US, UK, and Canada typically have lower rates.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <Smartphone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <strong>Phone Type (Mobile vs Landline):</strong>
                          <p className="text-sm text-muted-foreground">
                            Mobile phones usually cost more to call due to carrier termination fees. 
                            Landlines are typically 20-50% cheaper.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <strong>Call Duration:</strong>
                          <p className="text-sm text-muted-foreground">
                            Most VoIP services charge per minute with no connection fees. 
                            Longer calls simply cost more minutes.
                          </p>
                        </div>
                      </li>
                    </ul>

                    <Card className="my-6 border-primary/20 bg-primary/5">
                      <CardContent className="p-6">
                        <h4 className="font-semibold mb-2">💡 Pro Tip</h4>
                        <p className="text-sm text-muted-foreground">
                          Always check if the number you are calling is a mobile or landline. 
                          Many countries have different prefixes for each type. Using our{" "}
                          <Link to="/rates" className="text-primary hover:underline">
                            rate calculator
                          </Link>{" "}
                          helps you estimate costs before calling.
                        </p>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Section 4: Mobile vs Landline */}
                  <section id="mobile-vs-landline" className="scroll-mt-24 mb-12">
                    <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                      <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                      Mobile vs Landline Costs
                    </h2>
                    <p className="text-muted-foreground">
                      One of the most important factors in international calling costs is whether 
                      you are calling a mobile phone or a landline. Understanding this difference 
                      can save you significant money.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 my-6">
                      <Card>
                        <CardContent className="p-6">
                          <Smartphone className="w-10 h-10 text-primary mb-4" />
                          <h3 className="font-semibold text-lg mb-2">Mobile Phones</h3>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Higher rates due to carrier fees</li>
                            <li>• Most personal numbers are mobile</li>
                            <li>• Rates vary by carrier in destination</li>
                            <li>• Typically $0.02-0.15/min</li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6">
                          <Building2 className="w-10 h-10 text-accent-foreground mb-4" />
                          <h3 className="font-semibold text-lg mb-2">Landlines</h3>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Lower termination costs</li>
                            <li>• Common for businesses and homes</li>
                            <li>• More predictable pricing</li>
                            <li>• Typically $0.01-0.05/min</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Section 5: Saving Money */}
                  <section id="saving-money" className="scroll-mt-24 mb-12">
                    <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                      <Zap className="w-6 h-6 text-primary flex-shrink-0" />
                      Tips for Saving Money
                    </h2>
                    <p className="text-muted-foreground">
                      Here are proven strategies to minimize your international calling costs 
                      while maintaining quality connections with loved ones abroad.
                    </p>

                    <div className="space-y-4 my-6">
                      {[
                        {
                          title: "Use VoIP Services",
                          desc: "Browser-based services like ZyraCall offer rates up to 90% cheaper than traditional carriers.",
                        },
                        {
                          title: "Call Landlines When Possible",
                          desc: "If the person has both a mobile and landline, calling the landline saves money.",
                        },
                        {
                          title: "Check Rates Before Calling",
                          desc: "Use rate calculators to know exactly what you will pay before making the call.",
                        },
                        {
                          title: "Avoid Peak Hours",
                          desc: "Some services offer lower rates during off-peak hours in the destination country.",
                        },
                        {
                          title: "Compare Providers",
                          desc: "Different services have different rates for different countries. Compare before committing.",
                        },
                      ].map((tip, i) => (
                        <div key={i} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                          <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold flex-shrink-0">
                            {i + 1}
                          </span>
                          <div>
                            <h4 className="font-semibold">{tip.title}</h4>
                            <p className="text-sm text-muted-foreground">{tip.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Section 6: Choosing a Service */}
                  <section id="choosing-service" className="scroll-mt-24 mb-12">
                    <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                      <Shield className="w-6 h-6 text-primary flex-shrink-0" />
                      Choosing the Right Service
                    </h2>
                    <p className="text-muted-foreground">
                      With many international calling services available, here is what to look for 
                      when choosing the right one for your needs.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 my-6">
                      {[
                        { icon: DollarSign, title: "Transparent Pricing", desc: "No hidden fees or connection charges" },
                        { icon: Shield, title: "Security", desc: "Encrypted calls and secure payments" },
                        { icon: Globe, title: "Wide Coverage", desc: "200+ countries supported" },
                        { icon: Wifi, title: "No Downloads", desc: "Works directly in your browser" },
                      ].map((feature) => (
                        <Card key={feature.title}>
                          <CardContent className="p-4 flex items-start gap-3">
                            <feature.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-sm">{feature.title}</h4>
                              <p className="text-xs text-muted-foreground">{feature.desc}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>

                  {/* Section 7: Getting Started */}
                  <section id="getting-started" className="scroll-mt-24 mb-12">
                    <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                      <Users className="w-6 h-6 text-primary flex-shrink-0" />
                      Getting Started with ZyraCall
                    </h2>
                    <p className="text-muted-foreground">
                      Ready to start making affordable international calls? Here is how to get 
                      started with ZyraCall in just a few minutes.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 my-6">
                      {[
                        { step: "1", title: "Sign Up Free", desc: "Create your account in seconds" },
                        { step: "2", title: "Add Credit", desc: "Pay only for what you use" },
                        { step: "3", title: "Start Calling", desc: "Call any number worldwide" },
                      ].map((item) => (
                        <Card key={item.step} className="bg-primary/5 border-primary/20">
                          <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 text-primary-foreground font-bold text-xl">
                              {item.step}
                            </div>
                            <h4 className="font-semibold mb-1">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                      <Button size="lg" asChild>
                        <Link to="/signup">
                          <Phone className="w-4 h-4 mr-2" />
                          Start Calling Free
                        </Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <Link to="/call">
                          Browse Countries
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </section>
                </article>
              </div>
            </div>
          </section>

          {/* Related Content */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link to="/call" className="group">
                  <Card className="h-full hover:border-primary/50 transition-all">
                    <CardContent className="p-6">
                      <Globe className="w-8 h-8 text-primary mb-3" />
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        Country Calling Guides
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Find rates and guides for 200+ countries
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link to="/rates" className="group">
                  <Card className="h-full hover:border-primary/50 transition-all">
                    <CardContent className="p-6">
                      <DollarSign className="w-8 h-8 text-primary mb-3" />
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        Rate Calculator
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Calculate your call costs before dialing
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link to="/compare" className="group">
                  <Card className="h-full hover:border-primary/50 transition-all">
                    <CardContent className="p-6">
                      <Zap className="w-8 h-8 text-primary mb-3" />
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        Compare Services
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        See how ZyraCall stacks up against competitors
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default InternationalCallingGuide;
