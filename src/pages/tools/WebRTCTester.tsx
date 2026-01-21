import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SEOHead from "@/components/seo/SEOHead";
import PageHero from "@/components/common/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useWebRTCTest, WebRTCTestResult } from "@/hooks/useWebRTCTest";
import { 
  Activity, 
  Wifi, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Play,
  Square,
  ArrowRight,
  Phone,
  Zap,
  Shield,
  Info,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";

const webRTCTesterSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "WebRTC & Jitter Tester",
  "description": "Free browser-based tool to test your network quality for VoIP calls. Measure latency, jitter, and packet loss.",
  "url": "https://zyracall.com/tools/webrtc-tester",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Any (Browser-based)",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "provider": {
    "@type": "Organization",
    "name": "ZyraCall",
    "url": "https://zyracall.com"
  },
  "featureList": [
    "Latency measurement",
    "Jitter detection", 
    "Packet loss analysis",
    "VoIP quality assessment"
  ]
};

const getMetricStatus = (metric: string, value: number): 'excellent' | 'good' | 'fair' | 'poor' => {
  switch (metric) {
    case 'latency':
      if (value < 50) return 'excellent';
      if (value < 100) return 'good';
      if (value < 200) return 'fair';
      return 'poor';
    case 'jitter':
      if (value < 15) return 'excellent';
      if (value < 30) return 'good';
      if (value < 50) return 'fair';
      return 'poor';
    case 'packetLoss':
      if (value < 1) return 'excellent';
      if (value < 2) return 'good';
      if (value < 5) return 'fair';
      return 'poor';
    default:
      return 'fair';
  }
};

// Helper text for each metric based on status
const getMetricHelperText = (metric: string, status: 'excellent' | 'good' | 'fair' | 'poor'): string => {
  const helperTexts = {
    latency: {
      excellent: "Natural conversation flow",
      good: "Slight delay, comfortable for calls",
      fair: "Noticeable delay between speakers",
      poor: "Significant delay, difficult conversation",
    },
    jitter: {
      excellent: "Smooth, consistent audio",
      good: "Minor audio fluctuations",
      fair: "May cause choppy or robotic audio",
      poor: "Frequent audio distortions expected",
    },
    packetLoss: {
      excellent: "Clear audio, no gaps",
      good: "Rarely noticeable gaps",
      fair: "Occasional words may be cut off",
      poor: "Frequent audio dropouts",
    },
  };
  return helperTexts[metric as keyof typeof helperTexts]?.[status] ?? "";
};

// Personalized recommendations based on test results
const getRecommendations = (result: WebRTCTestResult): string[] => {
  const recommendations: string[] = [];
  
  if (result.jitter > 30) {
    recommendations.push("Switch to a wired (Ethernet) connection for more stable audio");
  }
  if (result.packetLoss > 2) {
    recommendations.push("Close bandwidth-heavy apps like streaming or large downloads");
  }
  if (result.latency > 100) {
    recommendations.push("Try calling during off-peak hours for lower latency");
  }
  if (result.qualityScore === 'excellent' || result.qualityScore === 'good') {
    recommendations.push("You're all set! Your connection is ready for international calls");
  }
  
  return recommendations.slice(0, 3); // Max 3 recommendations
};

const statusColors = {
  excellent: 'text-success bg-success/10 border-success/20',
  good: 'text-success bg-success/10 border-success/20',
  fair: 'text-warning bg-warning/10 border-warning/20',
  poor: 'text-error bg-error/10 border-error/20',
};

const statusIcons = {
  excellent: CheckCircle2,
  good: CheckCircle2,
  fair: AlertTriangle,
  poor: XCircle,
};

const MetricCard = ({ 
  title, 
  value, 
  unit, 
  status,
  icon: Icon,
  helperText,
}: { 
  title: string; 
  value: number; 
  unit: string; 
  status: 'excellent' | 'good' | 'fair' | 'poor';
  icon: React.ComponentType<{ className?: string }>;
  helperText: string;
}) => {
  const StatusIcon = statusIcons[status];
  
  return (
    <Card className={cn("border", statusColors[status])}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", statusColors[status])}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold">
                {value}
                <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>
              </p>
            </div>
          </div>
          <StatusIcon className={cn("w-5 h-5", statusColors[status].split(' ')[0])} />
        </div>
        {/* Helper text explaining what this means */}
        <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border/50">
          {helperText}
        </p>
      </CardContent>
    </Card>
  );
};

const QualityScoreCard = ({ result }: { result: WebRTCTestResult }) => {
  const scoreLabels = {
    excellent: 'Excellent',
    good: 'Good',
    fair: 'Fair',
    poor: 'Poor',
  };

  const scoreDescriptions = {
    excellent: 'Your connection is optimal for HD voice calls. Crystal-clear quality guaranteed.',
    good: 'Your connection is suitable for high-quality voice calls with minimal issues.',
    fair: 'Your connection may experience occasional quality drops. Consider a wired connection.',
    poor: 'Your connection has significant issues that may affect call quality.',
  };

  // New verdict messages for international calling
  const verdicts = {
    excellent: { text: "Good for international calls", icon: CheckCircle2 },
    good: { text: "Good for international calls", icon: CheckCircle2 },
    fair: { text: "May experience call issues", icon: AlertTriangle },
    poor: { text: "Not suitable for stable calls", icon: XCircle },
  };

  const verdict = verdicts[result.qualityScore];
  const VerdictIcon = verdict.icon;

  return (
    <Card className={cn("border-2", statusColors[result.qualityScore])}>
      <CardContent className="p-8 text-center">
        <div className={cn("w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4", statusColors[result.qualityScore])}>
          {result.qualityScore === 'excellent' || result.qualityScore === 'good' ? (
            <CheckCircle2 className="w-10 h-10" />
          ) : result.qualityScore === 'fair' ? (
            <AlertTriangle className="w-10 h-10" />
          ) : (
            <XCircle className="w-10 h-10" />
          )}
        </div>
        
        {/* Primary Verdict Badge */}
        <div className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3 font-semibold text-base",
          statusColors[result.qualityScore]
        )}>
          <VerdictIcon className="w-5 h-5" />
          {verdict.text}
        </div>

        {/* Score Badge */}
        <div className="mb-3">
          <Badge variant="outline" className={cn("text-sm px-3 py-0.5", statusColors[result.qualityScore])}>
            {scoreLabels[result.qualityScore]} Quality
          </Badge>
        </div>

        <p className="text-muted-foreground max-w-md mx-auto">
          {scoreDescriptions[result.qualityScore]}
        </p>
      </CardContent>
    </Card>
  );
};

const PersonalizedRecommendations = ({ result }: { result: WebRTCTestResult }) => {
  const recommendations = getRecommendations(result);
  
  if (recommendations.length === 0) return null;

  const isPositive = result.qualityScore === 'excellent' || result.qualityScore === 'good';

  return (
    <Card className={cn(
      "border",
      isPositive ? "bg-success/5 border-success/20" : "bg-muted/50 border-border/50"
    )}>
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className={cn("w-5 h-5", isPositive ? "text-success" : "text-muted-foreground")} />
          <h4 className="font-medium">What you can do</h4>
        </div>
        <ul className="space-y-2">
          {recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className={cn(
                "w-4 h-4 mt-0.5 flex-shrink-0",
                isPositive ? "text-success" : "text-muted-foreground"
              )} />
              <span className="text-muted-foreground">{rec}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const InsightCTA = ({ result }: { result: WebRTCTestResult }) => {
  const insights = {
    excellent: {
      message: "You're ready for crystal-clear international calls.",
      subtitle: "Try ZyraCall for transparent global rates.",
      cta: "Start Calling Now",
    },
    good: {
      message: "You're ready for crystal-clear international calls.",
      subtitle: "Try ZyraCall for transparent global rates.",
      cta: "Try ZyraCall Free",
    },
    fair: {
      message: "ZyraCall uses adaptive bitrate technology to optimize call quality on variable networks.",
      subtitle: "Our codecs automatically adjust to your connection.",
      cta: "See How It Works",
    },
    poor: {
      message: "ZyraCall optimizes routing to reduce latency and call drops.",
      subtitle: "Our technology works to deliver the best quality possible on your network.",
      cta: "Learn About Our Technology",
    },
  };

  const insight = insights[result.qualityScore];

  return (
    <Card className="bg-gradient-to-br from-accent/10 to-primary/5 border-accent/20">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-medium">{insight.message}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {insight.subtitle}
              </p>
            </div>
          </div>
          <Button asChild className="whitespace-nowrap">
            <Link to="/signup">
              {insight.cta}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const TrustSignals = ({ result }: { result: WebRTCTestResult | null }) => {
  return (
    <div className="text-center space-y-1">
      {result && (
        <p className="text-xs text-muted-foreground">
          Last tested: {result.timestamp.toLocaleTimeString()}
        </p>
      )}
      <p className="text-xs text-muted-foreground">
        Results reflect current network conditions. Actual call quality may vary.
      </p>
      <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <Shield className="w-3 h-3" />
        Test run using browser-based WebRTC
      </div>
    </div>
  );
};

const WebRTCTester = () => {
  const { runTest, abortTest, isRunning, progress, result } = useWebRTCTest();

  return (
    <>
      <SEOHead
        title="WebRTC & Jitter Tester - Test Your Call Quality | ZyraCall"
        description="Free browser-based tool to test your network quality for VoIP calls. Measure latency, jitter, and packet loss to ensure crystal-clear international calls."
        canonicalUrl="https://zyracall.com/tools/webrtc-tester"
        keywords="WebRTC test, jitter test, VoIP quality test, latency test, packet loss test, call quality checker"
        ogImageTitle="WebRTC & Jitter Tester"
        ogImageSubtitle="Test Your Network for VoIP Calls"
        breadcrumbs={[
          { name: "Home", url: "https://zyracall.com" },
          { name: "Tools", url: "https://zyracall.com/tools" },
          { name: "WebRTC Tester", url: "https://zyracall.com/tools/webrtc-tester" },
        ]}
        structuredData={[webRTCTesterSchema]}
      />

      <Header />

      <main className="min-h-screen bg-background pb-16">
        <PageHero
          badge={{ icon: Wifi, text: "Network Quality Test" }}
          title="WebRTC & Jitter Tester"
          description="Test your network's real-time call quality. Measure latency, jitter, and packet loss to ensure you'll have crystal-clear international calls."
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Test Section */}
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Run Test Card */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center">
                  {progress.stage === 'idle' && !result && (
                    <>
                      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                        <Activity className="w-12 h-12 text-accent" />
                      </div>
                      <h2 className="text-xl font-semibold mb-2">Ready to Test Your Connection</h2>
                      <p className="text-muted-foreground mb-4">
                        This test takes about 5 seconds and measures your network quality for VoIP calls.
                      </p>
                      {/* Pre-test trust signal */}
                      <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground mb-6 bg-muted/50 px-3 py-1.5 rounded-full">
                        <Shield className="w-3 h-3" />
                        Test run using browser-based WebRTC
                      </div>
                      <div>
                        <Button size="lg" onClick={runTest} className="gap-2">
                          <Play className="w-5 h-5" />
                          Run Test
                        </Button>
                      </div>
                    </>
                  )}

                  {isRunning && (
                    <>
                      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center animate-pulse">
                        <Activity className="w-12 h-12 text-accent" />
                      </div>
                      <h2 className="text-xl font-semibold mb-2">{progress.message}</h2>
                      <div className="max-w-md mx-auto mb-6">
                        <Progress value={progress.progress} className="h-2" />
                        <p className="text-sm text-muted-foreground mt-2">{progress.progress}% complete</p>
                      </div>
                      <Button variant="outline" onClick={abortTest} className="gap-2">
                        <Square className="w-4 h-4" />
                        Cancel Test
                      </Button>
                    </>
                  )}

                  {progress.stage === 'error' && (
                    <>
                      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
                        <XCircle className="w-12 h-12 text-destructive" />
                      </div>
                      <h2 className="text-xl font-semibold mb-2">Test Failed</h2>
                      <p className="text-muted-foreground mb-6">{progress.message}</p>
                      <Button onClick={runTest} className="gap-2">
                        <Play className="w-5 h-5" />
                        Try Again
                      </Button>
                    </>
                  )}

                  {result && !isRunning && (
                    <div className="space-y-6">
                      {/* Quality Score with Verdict */}
                      <QualityScoreCard result={result} />
                      
                      {/* Metrics Grid with Helper Text */}
                      <div className="grid md:grid-cols-3 gap-4">
                        <MetricCard 
                          title="Latency" 
                          value={result.latency} 
                          unit="ms" 
                          status={getMetricStatus('latency', result.latency)}
                          icon={Clock}
                          helperText={getMetricHelperText('latency', getMetricStatus('latency', result.latency))}
                        />
                        <MetricCard 
                          title="Jitter" 
                          value={result.jitter} 
                          unit="ms" 
                          status={getMetricStatus('jitter', result.jitter)}
                          icon={Activity}
                          helperText={getMetricHelperText('jitter', getMetricStatus('jitter', result.jitter))}
                        />
                        <MetricCard 
                          title="Packet Loss" 
                          value={result.packetLoss} 
                          unit="%" 
                          status={getMetricStatus('packetLoss', result.packetLoss)}
                          icon={Wifi}
                          helperText={getMetricHelperText('packetLoss', getMetricStatus('packetLoss', result.packetLoss))}
                        />
                      </div>

                      {/* Personalized Recommendations */}
                      <PersonalizedRecommendations result={result} />

                      {/* Insight CTA */}
                      <InsightCTA result={result} />

                      {/* Run Again & Trust Signals */}
                      <div className="space-y-4">
                        <Button variant="outline" onClick={runTest} className="gap-2">
                          <Play className="w-4 h-4" />
                          Run Test Again
                        </Button>
                        <TrustSignals result={result} />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Explanations Section */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-accent" />
                  Understanding Your Results
                </CardTitle>
                <CardDescription>
                  Learn what each metric means for your call quality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="latency">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-accent" />
                        What is Latency?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p className="mb-2">
                        <strong>Latency</strong> is the time it takes for your voice to travel from your device to the other person. 
                        It's measured in milliseconds (ms).
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li><span className="text-success">Under 50ms</span> - Excellent, natural conversation flow</li>
                        <li><span className="text-success">50-100ms</span> - Good, slight delay but comfortable</li>
                        <li><span className="text-warning">100-200ms</span> - Fair, noticeable delay</li>
                        <li><span className="text-error">Over 200ms</span> - Poor, difficult conversation</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="jitter">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-accent" />
                        What is Jitter?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p className="mb-2">
                        <strong>Jitter</strong> measures the variation in packet arrival times. High jitter causes choppy audio and 
                        robotic-sounding voices.
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li><span className="text-success">Under 15ms</span> - Excellent, smooth audio</li>
                        <li><span className="text-success">15-30ms</span> - Good, minor fluctuations</li>
                        <li><span className="text-warning">30-50ms</span> - Fair, occasional choppiness</li>
                        <li><span className="text-error">Over 50ms</span> - Poor, frequent audio issues</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="packetLoss">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-accent" />
                        What is Packet Loss?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p className="mb-2">
                        <strong>Packet Loss</strong> is the percentage of data packets that don't reach their destination. 
                        Lost packets mean missing audio segments.
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li><span className="text-success">Under 1%</span> - Excellent, imperceptible</li>
                        <li><span className="text-success">1-2%</span> - Good, rarely noticeable</li>
                        <li><span className="text-warning">2-5%</span> - Fair, occasional gaps</li>
                        <li><span className="text-error">Over 5%</span> - Poor, frequent audio drops</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Tips Section */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  Tips for Better Call Quality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Wifi className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium">Use a Wired Connection</h4>
                      <p className="text-sm text-muted-foreground">
                        Ethernet connections are more stable than WiFi.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium">Close Other Apps</h4>
                      <p className="text-sm text-muted-foreground">
                        Streaming and downloads can affect call quality.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Activity className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium">Stay Close to Router</h4>
                      <p className="text-sm text-muted-foreground">
                        Distance from your WiFi router affects signal strength.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium">Use ZyraCall's Adaptive Quality</h4>
                      <p className="text-sm text-muted-foreground">
                        Our HD codecs automatically adjust to your network.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default WebRTCTester;
