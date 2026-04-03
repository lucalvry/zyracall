import { Link } from "react-router-dom";
import { 
  Volume2, Wifi, CheckCircle2, ArrowRight, Settings, 
  AlertCircle, Zap
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

const VoIPQuality = () => {
  const breadcrumbs = [
    { name: "Home", url: "https://zyracall.com" },
    { name: "Blog", url: "https://zyracall.com/blog" },
    { name: "VoIP Quality", url: "https://zyracall.com/blog/voip-quality-guide" },
  ];

  return (
    <>
      <SEOHead
        title="Understanding VoIP Quality: What Makes Crystal-Clear Calls | ZyraCall"
        description="Learn what affects VoIP call quality and how to ensure crystal-clear international calls. Bandwidth requirements, codecs, and troubleshooting tips."
        canonicalUrl="https://zyracall.com/blog/voip-quality-guide"
        keywords="VoIP quality, HD calling, call clarity, VoIP troubleshooting, internet calling quality"
        ogImageTitle="VoIP Quality Guide"
        ogImageSubtitle="Crystal-Clear Calls"
        ogType="article"
        breadcrumbs={breadcrumbs}
        structuredData={[organizationSchema, generateSpeakableSchema("https://zyracall.com/blog/voip-quality-guide", "VoIP Call Quality Guide")]}
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
                      <BreadcrumbPage>VoIP Quality</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </nav>

              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Volume2 className="w-4 h-4" />
                  Technology • 6 min read
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Understanding VoIP Quality:{" "}
                  <span className="text-primary">Crystal-Clear Calls</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  What makes some VoIP calls sound great while others are choppy? 
                  Learn the factors that affect call quality.
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
                    <Wifi className="w-6 h-6 text-primary" />
                    What bandwidth do you need for VoIP calls?
                  </h2>
                  <p className="text-muted-foreground" data-speakable="true">
                    VoIP calls require surprisingly little bandwidth—typically just 100 Kbps for
                    high-quality voice. However, consistency matters more than raw speed:
                  </p>
                  
                  <div className="grid gap-4 my-6 not-prose">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Minimum for calls</span>
                          <span className="text-primary font-bold">64 Kbps</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Recommended for HD</span>
                          <span className="text-primary font-bold">100+ Kbps</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Latency (one-way)</span>
                          <span className="text-primary font-bold">&lt; 150ms</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <h2 className="flex items-center gap-3 mt-12">
                    <Settings className="w-6 h-6 text-primary" />
                    What ZyraCall Does for Quality
                  </h2>
                  <ul className="space-y-2 my-6 not-prose">
                    {[
                      "Adaptive bitrate adjusts to your connection",
                      "Global server network reduces latency",
                      "HD audio codecs (Opus) for clarity",
                      "Jitter buffering smooths out variations",
                      "Echo cancellation built-in",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <h2 className="flex items-center gap-3 mt-12">
                    <AlertCircle className="w-6 h-6 text-primary" />
                    Troubleshooting Poor Quality
                  </h2>
                  <p className="text-muted-foreground">
                    If you're experiencing issues, try these steps:
                  </p>
                  
                  <div className="grid gap-4 my-6 not-prose">
                    {[
                      { title: "Use wired internet", desc: "Ethernet is more stable than WiFi" },
                      { title: "Close other apps", desc: "Video streaming can affect call quality" },
                      { title: "Move closer to router", desc: "Stronger WiFi signal = better calls" },
                      { title: "Use headphones", desc: "Reduces echo and background noise" },
                    ].map((item, i) => (
                      <Card key={i}>
                        <CardContent className="p-4 flex items-start gap-3">
                          <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                            {i + 1}
                          </span>
                          <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* CTA */}
                  <Card className="my-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 not-prose">
                    <CardContent className="p-8 text-center">
                      <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-4">Experience HD Quality Calls</h3>
                      <p className="text-muted-foreground mb-6">
                        Try ZyraCall's crystal-clear international calling.
                      </p>
                      <Button size="lg" asChild>
                        <Link to="/signup">
                          Try Free Now
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
              { title: "Save Money on Calls", href: "/blog/save-money-international-calls-2025" },
              { title: "International Calling Guide", href: "/blog/international-calling-guide" },
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

export default VoIPQuality;
