import { Calendar, Shield, AlertCircle, CheckCircle } from "lucide-react";
import { DataConfidence } from "@/data/2fa-platforms";
import { cn } from "@/lib/utils";

interface TrustSignalsProps {
  lastUpdated: string;
  dataConfidence: DataConfidence;
  className?: string;
  compact?: boolean;
}

const confidenceConfig: Record<DataConfidence, {
  label: string;
  icon: typeof Shield;
  colorClass: string;
}> = {
  high: {
    label: 'High confidence',
    icon: CheckCircle,
    colorClass: 'text-emerald-400',
  },
  moderate: {
    label: 'Moderate confidence',
    icon: Shield,
    colorClass: 'text-amber-400',
  },
  limited: {
    label: 'Limited data',
    icon: AlertCircle,
    colorClass: 'text-muted-foreground',
  },
};

const TrustSignals = ({ lastUpdated, dataConfidence, className, compact = false }: TrustSignalsProps) => {
  const config = confidenceConfig[dataConfidence];
  const ConfidenceIcon = config.icon;

  if (compact) {
    return (
      <div className={cn("flex items-center gap-3 text-xs text-muted-foreground", className)}>
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          Updated {lastUpdated}
        </span>
        <span className={cn("flex items-center gap-1", config.colorClass)}>
          <ConfidenceIcon className="w-3 h-3" />
          {config.label}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          Last updated: <span className="text-foreground">{lastUpdated}</span>
        </span>
        <span className={cn("flex items-center gap-1.5", config.colorClass)}>
          <ConfidenceIcon className="w-4 h-4" />
          {config.label}
        </span>
      </div>
      
      <p className="text-xs text-muted-foreground leading-relaxed">
        Based on recent real-world reports and platform behavior. 
        <span className="text-amber-400/80"> Verification rules change frequently — always verify with the official platform.</span>
      </p>
    </div>
  );
};

export default TrustSignals;
