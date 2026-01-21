import { Link } from "react-router-dom";
import { EnrichedPlatform, Platform, categoryLabels, getPlatformById } from "@/data/2fa-platforms";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  ArrowRight, 
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
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import BookmarkButton from "./BookmarkButton";

interface PlatformCardProps {
  platform: Platform | EnrichedPlatform;
  className?: string;
  showBookmark?: boolean;
}

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

const verdictColors = {
  recommended: "bg-emerald-400",
  caution: "bg-amber-400",
  avoid: "bg-red-400",
};

const numberTypeLabels = {
  mobile: 'Mobile',
  voip: 'VoIP',
  virtual: 'Virtual',
};

const PlatformCard = ({ platform, className, showBookmark = true }: PlatformCardProps) => {
  const Icon = iconMap[platform.icon] || MessageCircle;
  
  // Get enriched platform data for decision guidance
  const enrichedPlatform = getPlatformById(platform.id);
  const verdicts = enrichedPlatform?.verdicts;
  const primaryRec = enrichedPlatform?.primaryRecommendation;
  
  // Calculate stats
  const highCount = platform.compatibility.filter(c => c.mobile === 'high').length;
  const totalCountries = platform.compatibility.length;
  
  return (
    <TooltipProvider>
      <Link to={`/tools/2fa-finder/${platform.id}`}>
        <Card 
          className={cn(
            "group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm",
            "hover:border-accent/50 hover:bg-card/80 transition-all duration-300",
            "hover:shadow-lg hover:shadow-accent/5",
            className
          )}
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <Icon className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    {platform.name}
                  </h3>
                  <Badge 
                    variant="outline" 
                    className={cn("mt-1 text-xs", categoryColorMap[platform.category])}
                  >
                    {categoryLabels[platform.category]}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {showBookmark && (
                  <BookmarkButton 
                    platformId={platform.id} 
                    size="icon"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                )}
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
            </div>
            
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
              {platform.description}
            </p>
            
            {/* Micro-recommendations */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {highCount}/{totalCountries} countries
                </span>
                <span>Updated {platform.lastUpdated}</span>
              </div>
              
              {/* Verdict dots on hover */}
              {verdicts && (
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Tooltip>
                    <TooltipTrigger>
                      <span className={cn("w-2.5 h-2.5 rounded-full", verdictColors[verdicts.mobile])} />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">Mobile: {verdicts.mobile}</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className={cn("w-2.5 h-2.5 rounded-full", verdictColors[verdicts.voip])} />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">VoIP: {verdicts.voip}</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className={cn("w-2.5 h-2.5 rounded-full", verdictColors[verdicts.virtual])} />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">Virtual: {verdicts.virtual}</TooltipContent>
                  </Tooltip>
                </div>
              )}
            </div>
            
            {/* Best recommendation micro-text */}
            {primaryRec && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400/80">
                <Star className="w-3 h-3 fill-emerald-400/30" />
                <span>Best: {numberTypeLabels[primaryRec.numberType]} ({primaryRec.countryCode})</span>
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </TooltipProvider>
  );
};

export default PlatformCard;
