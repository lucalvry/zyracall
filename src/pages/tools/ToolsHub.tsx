import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SEOHead from "@/components/seo/SEOHead";
import PageHero from "@/components/common/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Calculator, Globe, Clock, Phone, Activity, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  isActive: boolean;
  badge?: string;
}

const tools: Tool[] = [
  {
    id: "2fa-finder",
    name: "2FA Finder",
    description: "Discover which phone number types (mobile, VoIP, virtual) work for 2FA verification across 50+ platforms and 40 countries.",
    icon: Shield,
    href: "/tools/2fa-finder",
    isActive: true,
    badge: "Popular",
  },
  {
    id: "rate-calculator",
    name: "International Rate Calculator",
    description: "Calculate the exact cost of calling any country. Compare with competitors and see your savings.",
    icon: Calculator,
    href: "/tools/rate-calculator",
    isActive: true,
  },
  {
    id: "webrtc-tester",
    name: "WebRTC & Network Tester",
    description: "Test your connection quality for VoIP calls. Measure latency, jitter, and packet loss in seconds.",
    icon: Activity,
    href: "/tools/webrtc-tester",
    isActive: true,
    badge: "New",
  },
  {
    id: "connectivity-ping",
    name: "Global Connectivity Ping",
    description: "Test if your network can handle international calls. Get a reliability score and actionable recommendations.",
    icon: Globe,
    href: "/tools/connectivity-ping",
    isActive: true,
    badge: "New",
  },
  {
    id: "country-codes",
    name: "Country Code Lookup",
    description: "Find international dialing codes, area codes, and mobile prefixes for any country.",
    icon: Globe,
    href: "#",
    isActive: false,
  },
  {
    id: "timezone-converter",
    name: "Time Zone Converter",
    description: "Find the best time to call friends and family across different time zones.",
    icon: Clock,
    href: "#",
    isActive: false,
  },
  {
    id: "call-estimator",
    name: "Call Cost Estimator",
    description: "Plan your monthly international calling budget with our usage estimator.",
    icon: Phone,
    href: "#",
    isActive: false,
  },
];

const ToolCard = ({ tool }: { tool: Tool }) => {
  const Icon = tool.icon;
  
  const cardContent = (
    <Card 
      className={cn(
        "group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm h-full",
        "hover:border-accent/50 hover:bg-card/80 transition-all duration-300",
        "hover:shadow-lg hover:shadow-accent/5",
        !tool.isActive && "opacity-60 cursor-not-allowed"
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
            <Icon className={cn(
              "w-6 h-6 transition-colors",
              tool.isActive 
                ? "text-muted-foreground group-hover:text-accent" 
                : "text-muted-foreground/50"
            )} />
          </div>
          <div className="flex items-center gap-2">
            {tool.badge && (
              <Badge className="bg-accent/10 text-accent border-accent/20">
                {tool.badge}
              </Badge>
            )}
            {!tool.isActive && (
              <Badge variant="outline" className="text-muted-foreground">
                Coming Soon
              </Badge>
            )}
          </div>
        </div>
        
        <h3 className={cn(
          "text-lg font-semibold mb-2 transition-colors",
          tool.isActive 
            ? "text-foreground group-hover:text-accent" 
            : "text-muted-foreground"
        )}>
          {tool.name}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4">
          {tool.description}
        </p>
        
        {tool.isActive && (
          <div className="flex items-center text-sm text-accent font-medium">
            Use tool
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (!tool.isActive) {
    return <div className="h-full">{cardContent}</div>;
  }

  return (
    <Link to={tool.href} className="block h-full">
      {cardContent}
    </Link>
  );
};

const ToolsHub = () => {
  const toolsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Free Digital Nomad Tools",
    "description": "Free tools for digital nomads and travelers: 2FA verification finder, international calling rates, and more.",
    "url": "https://zyracall.com/tools",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": tools.filter(t => t.isActive).map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": tool.name,
        "description": tool.description,
        "url": `https://zyracall.com${tool.href}`
      }))
    }
  };

  return (
    <>
      <SEOHead
        title="Free Tools for Digital Nomads | 2FA Finder, Rate Calculator & More"
        description="Free tools for travelers and digital nomads: Find 2FA-compatible phone numbers, calculate international calling rates, convert time zones, and more."
        canonicalUrl="https://zyracall.com/tools"
        keywords="digital nomad tools, 2FA finder, international calling rates, time zone converter, country codes"
        ogImageTitle="Free Digital Nomad Tools"
        ogImageSubtitle="2FA Finder, Rate Calculator & More"
        breadcrumbs={[
          { name: "Home", url: "https://zyracall.com" },
          { name: "Tools", url: "https://zyracall.com/tools" },
        ]}
        structuredData={[toolsSchema]}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <PageHero
          badge={{ icon: Wrench, text: "Free Tools" }}
          title="Essential Tools for"
          titleAccent="Digital Nomads"
          description="Free utilities to help you stay connected, save money, and navigate the challenges of international communication."
        />

        {/* Tools Grid */}
        <section className="pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 border-t border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Need Reliable International Calling?
              </h2>
              <p className="text-muted-foreground mb-6">
                Try ZyraCall for crystal-clear calls to any phone number worldwide. 
                No app downloads, no subscriptions—just affordable calling from your browser.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link 
                  to="/signup"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
                >
                  Start Calling Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link 
                  to="/tools/2fa-finder"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border hover:bg-muted/50 transition-colors text-foreground font-medium"
                >
                  Looking for Verification Numbers?
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

export default ToolsHub;
