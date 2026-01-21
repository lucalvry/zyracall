import { Star, Smartphone, Phone, Cloud } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PrimaryRecommendation as PrimaryRecommendationType } from "@/data/2fa-platforms";
import VerdictBadge from "./VerdictBadge";
import { cn } from "@/lib/utils";

interface PrimaryRecommendationProps {
  recommendation: PrimaryRecommendationType;
  platformName: string;
  className?: string;
}

const numberTypeIcons = {
  mobile: Smartphone,
  voip: Phone,
  virtual: Cloud,
};

const numberTypeLabels = {
  mobile: 'Mobile Number',
  voip: 'VoIP Number',
  virtual: 'Virtual Number',
};

const PrimaryRecommendation = ({ recommendation, platformName, className }: PrimaryRecommendationProps) => {
  const Icon = numberTypeIcons[recommendation.numberType];

  return (
    <Card 
      className={cn(
        "relative overflow-hidden border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 via-card/50 to-card/80",
        className
      )}
    >
      {/* Accent glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500" />
      
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Star className="w-6 h-6 text-emerald-400 fill-emerald-400/30" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold uppercase tracking-wide mb-2">
              <span>Primary Recommendation</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-3xl">{recommendation.flag}</span>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {recommendation.country}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Icon className="w-4 h-4" />
                  <span>{numberTypeLabels[recommendation.numberType]}</span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              "{recommendation.reason}"
            </p>
            
            <VerdictBadge verdict="recommended" size="md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrimaryRecommendation;
