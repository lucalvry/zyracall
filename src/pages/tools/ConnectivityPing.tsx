import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SEOHead from "@/components/seo/SEOHead";
import PageHero from "@/components/common/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Globe, Play, RotateCcw, CheckCircle2, AlertTriangle, XCircle, ArrowRight, Wifi, Info, Clock, Zap, Activity, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useConnectivityPing, ConnectivityVerdict, MetricExplanation, Recommendation } from "@/hooks/useConnectivityPing";

const countryToFlag = (code: string): string => {
  try {
    return code
      .toUpperCase()
      .split("")
      .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
      .join("");
  } catch {
    return "🌍";
  }
};

const VerdictIcon = ({ level }: { level: ConnectivityVerdict["level"] }) => {
  switch (level) {
    case "excellent":
    case "good":
      return <CheckCircle2 className="w-10 h-10 text-green-500" />;
    case "warning":
      return <AlertTriangle className="w-10 h-10 text-yellow-500" />;
    case "poor":
      return <XCircle className="w-10 h-10 text-red-500" />;
  }
};

const ScoreGauge = ({ score }: { score: number }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const color =
    score >= 85 ? "stroke-green-500" : score >= 65 ? "stroke-green-400" : score >= 40 ? "stroke-yellow-500" : "stroke-red-500";

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" className="stroke-muted" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          className={cn(color, "transition-all duration-1000")}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-foreground">{score}</span>
        <span className="text-xs text-muted-foreground">/ 100</span>
      </div>
    </div>
  );
};

const MetricCard = ({ metric }: { metric: MetricExplanation }) => {
  const statusColor = metric.status === "good" ? "text-green-500" : metric.status === "warning" ? "text-yellow-500" : "text-red-500";
  const statusBg = metric.status === "good" ? "bg-green-500/10" : metric.status === "warning" ? "bg-yellow-500/10" : "bg-red-500/10";

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
          <Badge className={cn(statusBg, statusColor, "border-0 capitalize")}>{metric.status}</Badge>
        </div>
        <p className="text-2xl font-bold text-foreground mb-1">
          {metric.value}
          <span className="text-sm font-normal text-muted-foreground ml-1">{metric.unit}</span>
        </p>
        <p className="text-xs text-muted-foreground">{metric.explanation}</p>
      </CardContent>
    </Card>
  );
};

const RecommendationCard = ({ recommendations }: { recommendations: Recommendation[] }) => (
  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
    <CardHeader className="pb-3">
      <CardTitle className="text-base flex items-center gap-2">
        <Zap className="w-4 h-4 text-accent" />
        Recommendations
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {recommendations.map((rec, i) => (
        <div key={i} className="flex items-start gap-3">
          <span className="text-lg">{rec.icon}</span>
          <p className="text-sm text-muted-foreground">{rec.text}</p>
        </div>
      ))}
    </CardContent>
  </Card>
);

const faqs = [
  {
    q: "What does latency mean for calls?",
    a: "Latency is the time it takes for your voice to reach the other person. Under 100ms feels natural. Above 200ms, you'll notice awkward pauses and talking over each other.",
  },
  {
    q: "What is jitter and why does it matter?",
    a: "Jitter measures how much your latency varies. High jitter makes audio sound choppy or robotic because voice packets arrive at uneven intervals.",
  },
  {
    q: "How does packet loss affect call quality?",
    a: "Packet loss means some of your voice data never arrives. Above 3%, you'll hear missing words or syllables, and calls may even drop.",
  },
  {
    q: "Will my results be the same every time?",
    a: "Results reflect current network conditions and may vary depending on time of day, network congestion, and other factors. We recommend testing at the time you'd normally make calls.",
  },
  {
    q: "Does this test my actual connection to the destination country?",
    a: "This test measures your local network quality using WebRTC peer connections in your browser. It's an excellent indicator of call quality since ZyraCall uses the same WebRTC technology.",
  },
];

const ConnectivityPing = () => {
  const {
    runTest,
    abortTest,
    isRunning,
    progress,
    result,
    selectedCountry,
    setSelectedCountry,
    reliabilityScore,
    verdict,
    metricExplanations,
    recommendations,
    userTimezone,
  } = useConnectivityPing();

  const [countrySearch, setCountrySearch] = useState("");

  const { data: countries = [] } = useQuery({
    queryKey: ["call-rates-countries"],
    queryFn: async () => {
      const { data } = await supabase
        .from("call_rates")
        .select("country_code, country_name")
        .eq("is_active", true)
        .order("country_name");
      if (!data) return [];
      const unique = new Map<string, { code: string; name: string }>();
      data.forEach((r) => unique.set(r.country_code, { code: r.country_code, name: r.country_name }));
      return Array.from(unique.values());
    },
  });

  const filteredCountries = useMemo(() => {
    if (!countrySearch) return countries.slice(0, 12);
    const q = countrySearch.toLowerCase();
    return countries.filter((c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)).slice(0, 12);
  }, [countries, countrySearch]);

  const showResults = !!result && !!verdict && reliabilityScore !== null;

  const ctaConfig = useMemo(() => {
    if (!verdict || !selectedCountry) return null;
    if (verdict.level === "excellent" || verdict.level === "good") {
      return {
        text: `Your network is ready — start calling ${selectedCountry.name} with ZyraCall`,
        href: "/signup",
        buttonText: "Start Calling Free",
      };
    }
    if (verdict.level === "warning") {
      return {
        text: "ZyraCall's adaptive audio quality can help — see how it works",
        href: "/how-it-works",
        buttonText: "Learn How It Works",
      };
    }
    return null;
  }, [verdict, selectedCountry]);

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Global Connectivity Ping",
    description: "Test if your network can handle international VoIP calls. Measure latency, jitter, and packet loss with one click.",
    url: "https://zyracall.com/tools/connectivity-ping",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <SEOHead
        title="Global Connectivity Ping — Test Your Network for International Calls"
        description="Free browser-based tool to test if your network is ready for international VoIP calls. Measure latency, jitter, packet loss, and get a reliability score."
        canonicalUrl="https://zyracall.com/tools/connectivity-ping"
        keywords="network test, VoIP quality, international calling test, latency test, jitter test, connectivity ping"
        ogImageTitle="Global Connectivity Ping"
        ogImageSubtitle="Test Your Network for International Calls"
        breadcrumbs={[
          { name: "Home", url: "https://zyracall.com" },
          { name: "Tools", url: "https://zyracall.com/tools" },
          { name: "Global Connectivity Ping", url: "https://zyracall.com/tools/connectivity-ping" },
        ]}
        structuredData={[toolSchema]}
      />

      <div className="min-h-screen bg-background">
        <Header />

        <PageHero
          badge={{ icon: Globe, text: "Free Tool" }}
          title="Can Your Network Handle"
          titleAccent="International Calls?"
          description="Test your connection quality for VoIP calls to any country. Get a clear verdict and actionable recommendations in seconds."
        />

        <section className="pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {/* Country Selector & Test Button */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm mb-8">
              <CardContent className="p-6">
                <label className="block text-sm font-medium text-foreground mb-2">Select destination country</label>
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search countries..."
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>

                <div className="flex flex-wrap gap-2 mb-6 max-h-48 overflow-y-auto">
                  {filteredCountries.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setSelectedCountry(c);
                        setCountrySearch("");
                      }}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-colors",
                        selectedCountry?.code === c.code
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border hover:border-accent/50 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {countryToFlag(c.code)} {c.name}
                    </button>
                  ))}
                  {filteredCountries.length === 0 && (
                    <p className="text-sm text-muted-foreground py-2">No countries found.</p>
                  )}
                </div>

                {selectedCountry && (
                  <p className="text-sm text-muted-foreground mb-4">
                    Testing connectivity for calls to{" "}
                    <span className="font-medium text-foreground">
                      {countryToFlag(selectedCountry.code)} {selectedCountry.name}
                    </span>
                  </p>
                )}

                <div className="flex items-center gap-3">
                  <Button
                    onClick={isRunning ? abortTest : runTest}
                    disabled={!selectedCountry && !isRunning}
                    size="lg"
                    className={cn(
                      isRunning
                        ? "bg-destructive hover:bg-destructive/90"
                        : "bg-accent hover:bg-accent/90 text-accent-foreground"
                    )}
                  >
                    {isRunning ? (
                      <>
                        <XCircle className="w-4 h-4 mr-2" />
                        Stop Test
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Test My Connection
                      </>
                    )}
                  </Button>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Wifi className="w-3.5 h-3.5" />
                    Browser-based test — no downloads required
                  </div>
                </div>

                {/* Progress */}
                {isRunning && (
                  <div className="mt-4 space-y-2">
                    <Progress value={progress.progress} className="h-2" />
                    <p className="text-sm text-muted-foreground">{progress.message}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results */}
            {showResults && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Verdict + Score */}
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <ScoreGauge score={reliabilityScore!} />
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                          <VerdictIcon level={verdict!.level} />
                          <h2 className="text-xl font-bold text-foreground">{verdict!.title}</h2>
                        </div>
                        <p className="text-muted-foreground mb-3">{verdict!.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          Last tested: {result!.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Metric Cards */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {metricExplanations!.map((m) => (
                    <MetricCard key={m.label} metric={m} />
                  ))}
                </div>

                {/* Recommendations */}
                <RecommendationCard recommendations={recommendations!} />

                {/* Re-test */}
                <div className="flex justify-center">
                  <Button variant="outline" onClick={runTest} disabled={isRunning}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Test Again
                  </Button>
                </div>

                {/* Trust note */}
                <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
                  <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <p>Results reflect current network conditions and may vary depending on time of day, network congestion, and other factors.</p>
                </div>

                {/* CTA (only after results) */}
                {ctaConfig && (
                  <Card className="border-accent/30 bg-accent/5">
                    <CardContent className="p-6 text-center">
                      <p className="text-foreground font-medium mb-4">{ctaConfig.text}</p>
                      <Link
                        to={ctaConfig.href}
                        className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
                      >
                        {ctaConfig.buttonText}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* FAQ */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border border-border/50 rounded-lg px-4">
                    <AccordionTrigger className="text-sm font-medium text-foreground hover:text-accent">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Related Tools */}
            <div className="mt-12">
              <h3 className="text-lg font-semibold text-foreground mb-4">Related Tools</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link to="/tools/webrtc-tester" className="block">
                  <Card className="border-border/50 hover:border-accent/50 transition-colors">
                    <CardContent className="p-4 flex items-center gap-3">
                      <Activity className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">WebRTC & Network Tester</p>
                        <p className="text-xs text-muted-foreground">Deep-dive into raw network metrics</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                <Link to="/tools/rate-calculator" className="block">
                  <Card className="border-border/50 hover:border-accent/50 transition-colors">
                    <CardContent className="p-4 flex items-center gap-3">
                      <Calculator className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Rate Calculator</p>
                        <p className="text-xs text-muted-foreground">See how much calling your country costs</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ConnectivityPing;
