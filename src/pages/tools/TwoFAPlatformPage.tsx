import { useParams, Link, Navigate } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SEOHead from "@/components/seo/SEOHead";
import CompatibilityTable from "@/components/2fa/CompatibilityTable";
import ZyraCallCTA from "@/components/2fa/ZyraCallCTA";
import FeedbackStats from "@/components/2fa/FeedbackStats";
import PlatformCard from "@/components/2fa/PlatformCard";
import PrimaryRecommendation from "@/components/2fa/PrimaryRecommendation";
import NumberTypeVerdicts from "@/components/2fa/NumberTypeVerdicts";
import RecoveryGuidance from "@/components/2fa/RecoveryGuidance";
import TrustSignals from "@/components/2fa/TrustSignals";
import ContextualCTA from "@/components/2fa/ContextualCTA";
import { getPlatformById, platforms, categoryLabels } from "@/data/2fa-platforms";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  MessageCircle, 
  Send, 
  CreditCard, 
  Bitcoin, 
  Chrome, 
  Coins, 
  Banknote, 
  Car, 
  Home, 
  ShoppingCart, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Wallet, 
  Lock,
  Gamepad2,
  Users,
  Smartphone,
  Building2 
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageCircle,
  Send,
  CreditCard,
  Bitcoin,
  Chrome,
  Coins,
  Banknote,
  Car,
  Home,
  ShoppingCart,
  Instagram,
  Twitter,
  Linkedin,
  Wallet,
  Lock,
  Gamepad2,
  Users,
  Smartphone,
  Building2,
};

const categoryColorMap: Record<string, string> = {
  financial: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  messaging: "bg-green-500/10 text-green-400 border-green-500/20",
  social: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  crypto: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  other: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

const TwoFAPlatformPage = () => {
  const { platform: platformId } = useParams<{ platform: string }>();
  const platform = platformId ? getPlatformById(platformId) : undefined;

  if (!platform) {
    return <Navigate to="/tools/2fa-finder" replace />;
  }

  const Icon = iconMap[platform.icon] || MessageCircle;
  
  // Calculate stats
  const stats = {
    mobileHigh: platform.compatibility.filter(c => c.mobile === 'high').length,
    voipHigh: platform.compatibility.filter(c => c.voip === 'high').length,
    virtualHigh: platform.compatibility.filter(c => c.virtual === 'high').length,
    voipBlocked: platform.compatibility.filter(c => c.voip === 'blocked').length,
    total: platform.compatibility.length,
  };

  // Get related platforms (same category, excluding current)
  const relatedPlatforms = platforms
    .filter(p => p.category === platform.category && p.id !== platform.id)
    .slice(0, 3);

  // Schema markup
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `2FA Verification Guide for ${platform.name}`,
    "description": `Learn which countries and phone number types work for ${platform.name} 2FA verification.`,
    "step": [
      {
        "@type": "HowToStep",
        "name": "Check country compatibility",
        "text": `Review the compatibility table to find which countries support ${platform.name} verification.`
      },
      {
        "@type": "HowToStep",
        "name": "Choose number type",
        "text": "Select between mobile, VoIP, or virtual numbers based on reliability scores."
      },
      {
        "@type": "HowToStep",
        "name": "Complete verification",
        "text": `Use your chosen number to complete ${platform.name}'s 2FA verification process.`
      }
    ],
    "tool": {
      "@type": "HowToTool",
      "name": "ZyraCall 2FA Finder"
    }
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${platform.name} 2FA Compatibility Guide`,
    "description": platform.description,
    "url": `https://zyracall.com/tools/2fa-finder/${platform.id}`,
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": platform.name,
      "applicationCategory": categoryLabels[platform.category]
    }
  };

  return (
    <>
      <SEOHead
        title={`${platform.name} 2FA Verification | Phone Number Compatibility Guide`}
        description={`Find which countries and number types (mobile, VoIP, virtual) work for ${platform.name} 2FA verification. ${stats.mobileHigh} countries with high mobile reliability.`}
        canonicalUrl={`https://zyracall.com/tools/2fa-finder/${platform.id}`}
        keywords={`${platform.name} 2FA, ${platform.name} verification, ${platform.name} phone number, ${platform.name} VoIP, digital nomad`}
        ogImageTitle={`${platform.name} 2FA Guide`}
        ogImageSubtitle="Phone number compatibility"
        ogImageType="default"
        breadcrumbs={[
          { name: "Home", url: "https://zyracall.com" },
          { name: "Tools", url: "https://zyracall.com/tools" },
          { name: "2FA Finder", url: "https://zyracall.com/tools/2fa-finder" },
          { name: platform.name, url: `https://zyracall.com/tools/2fa-finder/${platform.id}` },
        ]}
        structuredData={[howToSchema, productSchema]}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Back Link */}
        <section className="pt-28 pb-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
              <Link to="/tools/2fa-finder">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to 2FA Finder
              </Link>
            </Button>
          </div>
        </section>

        {/* Platform Header with Trust Signals */}
        <section className="pb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-10 h-10 text-muted-foreground" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                      {platform.name}
                    </h1>
                    <Badge 
                      variant="outline" 
                      className={categoryColorMap[platform.category]}
                    >
                      {categoryLabels[platform.category]}
                    </Badge>
                  </div>
                  
                  <p className="text-lg text-muted-foreground">
                    {platform.description}
                  </p>
                  
                  {/* Inline Trust Signals */}
                  <TrustSignals 
                    lastUpdated={platform.lastUpdated}
                    dataConfidence={platform.dataConfidence}
                    compact
                    className="mt-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Primary Recommendation (NEW - visually prominent) */}
        <section className="pb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <PrimaryRecommendation 
                recommendation={platform.primaryRecommendation}
                platformName={platform.name}
              />
            </div>
          </div>
        </section>

        {/* Number Type Verdicts (NEW - decision guidance grid) */}
        <section className="pb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Number Type Compatibility
              </h2>
              <NumberTypeVerdicts 
                verdicts={platform.verdicts}
                verdictStatements={platform.verdictStatements}
              />
            </div>
          </div>
        </section>

        {/* Recovery Guidance (NEW - collapsible section) */}
        <section className="pb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <RecoveryGuidance 
                guidance={platform.recoveryGuidance}
                platformName={platform.name}
              />
            </div>
          </div>
        </section>

        {/* Stats (de-emphasized) */}
        <section className="pb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h2 className="text-lg font-medium text-muted-foreground mb-3">
                Quick Stats
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                  <div className="flex items-center gap-2 text-emerald-400/80 mb-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">Mobile High</span>
                  </div>
                  <div className="text-xl font-semibold text-foreground">
                    {stats.mobileHigh}/{stats.total}
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                  <div className="flex items-center gap-2 text-amber-400/80 mb-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">VoIP High</span>
                  </div>
                  <div className="text-xl font-semibold text-foreground">
                    {stats.voipHigh}/{stats.total}
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                  <div className="flex items-center gap-2 text-blue-400/80 mb-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">Virtual High</span>
                  </div>
                  <div className="text-xl font-semibold text-foreground">
                    {stats.virtualHigh}/{stats.total}
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                  <div className="flex items-center gap-2 text-red-400/80 mb-1">
                    <XCircle className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">VoIP Blocked</span>
                  </div>
                  <div className="text-xl font-semibold text-foreground">
                    {stats.voipBlocked}/{stats.total}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* General Notes */}
        <section className="pb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h2 className="text-lg font-medium text-muted-foreground mb-3">
                Important Notes
              </h2>
              <div className="space-y-2">
                {platform.generalNotes.map((note, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <AlertTriangle className="w-4 h-4 text-amber-400/70 mt-0.5 flex-shrink-0" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Community Feedback Stats */}
        <section className="pb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <FeedbackStats platformName={platform.name} />
            </div>
          </div>
        </section>

        {/* Compatibility Table */}
        <section className="pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Country Compatibility
              </h2>
              <CompatibilityTable 
                compatibility={platform.compatibility}
                platformId={platform.id}
                platformName={platform.name}
                verdicts={platform.verdicts}
                primaryRecommendation={platform.primaryRecommendation}
              />
            </div>
          </div>
        </section>

        {/* Contextual CTA (NEW - platform-specific) */}
        <section className="pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <ContextualCTA 
                platformName={platform.name}
                recommendedCountry={platform.primaryRecommendation.country}
                recommendedType={platform.primaryRecommendation.numberType}
              />
            </div>
          </div>
        </section>

        {/* Trust Signals Full */}
        <section className="pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <TrustSignals 
                lastUpdated={platform.lastUpdated}
                dataConfidence={platform.dataConfidence}
              />
            </div>
          </div>
        </section>

        {/* Related Platforms */}
        {relatedPlatforms.length > 0 && (
          <section className="py-16 border-t border-border/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Related Platforms
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {relatedPlatforms.map((p) => (
                    <PlatformCard key={p.id} platform={p} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
};

export default TwoFAPlatformPage;
