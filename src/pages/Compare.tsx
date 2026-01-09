import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, HelpCircle, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import CompetitorCard from "@/components/compare/CompetitorCard";
import SEOHead from "@/components/seo/SEOHead";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const competitors = [
  {
    name: "Skype",
    slug: "skype",
    icon: "💬",
    description: "See how ZyraCall compares to Skype for international calling. No app downloads, better rates.",
    popular: true,
  },
  {
    name: "Google Voice",
    slug: "google-voice",
    icon: "🔊",
    description: "Compare ZyraCall and Google Voice for global calling. More countries, simpler pricing.",
    popular: true,
  },
  {
    name: "Rebtel",
    slug: "rebtel",
    icon: "📱",
    description: "ZyraCall vs Rebtel: Browser-based calling vs app-based. See which works better for you.",
  },
  {
    name: "Talk360",
    slug: "talk360",
    icon: "🌐",
    description: "Compare ZyraCall and Talk360 for calling abroad. Transparent rates, no subscriptions.",
  },
  {
    name: "Vonage",
    slug: "vonage",
    icon: "☎️",
    description: "ZyraCall vs Vonage: Simple browser calling vs enterprise solutions. Find the right fit.",
  },
  {
    name: "YadaPhone",
    slug: "yadaphone",
    icon: "📞",
    description: "Compare ZyraCall and YadaPhone for international calls. Browser-based vs app-based.",
  },
];

const popularComparisons = competitors.filter(c => c.popular);
const allComparisons = competitors;

const generateCompareSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Compare ZyraCall - See How We Stack Up",
  description: "Compare ZyraCall with Skype, Google Voice, Rebtel, and other international calling services.",
  url: "https://zyracall.com/compare",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: competitors.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `ZyraCall vs ${c.name}`,
      url: `https://zyracall.com/compare/zyracall-vs-${c.slug}`,
    })),
  },
});

const Compare = () => {
  const [comparisonRequest, setComparisonRequest] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comparisonRequest.trim()) return;
    
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      toast.success("Thanks! We'll add this comparison soon.");
      setComparisonRequest("");
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <>
      <SEOHead
        title="Compare ZyraCall - See How We Stack Up | ZyraCall"
        description="Compare ZyraCall with Skype, Google Voice, Rebtel, and other international calling services. See why ZyraCall offers the best value for browser-based global calling."
        canonicalUrl="https://zyracall.com/compare"
        keywords="ZyraCall vs Skype, ZyraCall vs Google Voice, compare calling apps, international calling comparison, best calling app"
        ogImageTitle="Compare ZyraCall"
        ogImageSubtitle="See How We Stack Up Against the Competition"
        ogImageType="comparison"
        breadcrumbs={[
          { name: "Home", url: "https://zyracall.com" },
          { name: "Compare", url: "https://zyracall.com/compare" },
        ]}
        structuredData={generateCompareSchema()}
      />

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          {/* Breadcrumb Navigation */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Compare</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Hero */}
          <section className="relative py-16 lg:py-24 overflow-hidden">
            <div className="absolute inset-0 gradient-mesh" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <span className="inline-block text-accent font-medium text-sm tracking-wide uppercase mb-4">
                  Comparisons
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
                  How ZyraCall compares to{" "}
                  <span className="gradient-text-accent">the competition</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  See detailed comparisons with popular calling services. 
                  Find out why thousands choose ZyraCall for international calls.
                </p>
              </div>
            </div>
          </section>

          {/* Most Popular Comparisons */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                  <Star className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Most Popular Comparisons</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {popularComparisons.map((competitor) => (
                    <Link
                      key={competitor.slug}
                      to={`/compare/zyracall-vs-${competitor.slug}`}
                      className="group bg-card border-2 border-primary/20 rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0 group-hover:bg-primary/20 transition-colors">
                          {competitor.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                            ZyraCall vs {competitor.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">{competitor.description}</p>
                          <span className="inline-flex items-center gap-1 text-primary text-sm font-medium">
                            View comparison
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* All Comparisons Grid */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-center">All Comparisons</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allComparisons.map((competitor) => (
                    <CompetitorCard key={competitor.slug} {...competitor} />
                  ))}
                </div>

                {/* Cross-link to Alternatives */}
                <div className="mt-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    Looking for a complete replacement for your current calling app?
                  </p>
                  <Link 
                    to="/alternatives" 
                    className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                  >
                    View all calling app alternatives
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* How We Compare - Methodology Section */}
          <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-bold">How We Compare</h2>
                </div>
                <p className="text-muted-foreground mb-8">
                  We believe in transparent, fair comparisons. Here's our methodology for evaluating 
                  international calling services:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">Features & Functionality</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        We evaluate core features like call quality, country coverage, device compatibility, 
                        and unique capabilities that matter to users.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">Pricing Transparency</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        We analyze pricing models, hidden fees, credit expiration policies, and overall 
                        value for money across different usage patterns.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">User Experience</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        We consider ease of setup, interface design, cross-device accessibility, 
                        and the overall calling experience from start to finish.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">Real-World Testing</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Our comparisons are based on actual usage, not just marketing claims. We test 
                        call quality, reliability, and support responsiveness.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison Request Form */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-xl mx-auto text-center">
                <Send className="w-10 h-10 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-3">Request a Comparison</h2>
                <p className="text-muted-foreground mb-6">
                  Don't see the service you want to compare? Let us know and we'll add it!
                </p>
                <form onSubmit={handleRequestSubmit} className="flex gap-3">
                  <Input
                    type="text"
                    placeholder="e.g., Viber Out, WhatsApp..."
                    value={comparisonRequest}
                    onChange={(e) => setComparisonRequest(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isSubmitting || !comparisonRequest.trim()}>
                    {isSubmitting ? "Sending..." : "Request"}
                  </Button>
                </form>
              </div>
            </div>
          </section>

          {/* Why ZyraCall */}
          <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Why users switch to ZyraCall
                </h2>
                <div className="grid sm:grid-cols-3 gap-8 mt-12">
                  <div>
                    <div className="text-4xl font-bold text-accent mb-2">100%</div>
                    <p className="text-muted-foreground">Browser-based</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-accent mb-2">200+</div>
                    <p className="text-muted-foreground">Countries supported</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-accent mb-2">$0</div>
                    <p className="text-muted-foreground">Monthly fees</p>
                  </div>
                </div>

                <Button asChild size="lg" className="mt-10">
                  <Link to="/signup">
                    Try ZyraCall Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Compare;
