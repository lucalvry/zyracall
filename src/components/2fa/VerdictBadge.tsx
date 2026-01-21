import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { VerdictLevel } from "@/data/2fa-platforms";

interface VerdictBadgeProps {
  verdict: VerdictLevel;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const verdictConfig: Record<VerdictLevel, {
  icon: typeof CheckCircle2;
  label: string;
  shortLabel: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
}> = {
  recommended: {
    icon: CheckCircle2,
    label: 'Recommended',
    shortLabel: 'Best Choice',
    bgClass: 'bg-emerald-500/10',
    textClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/30',
  },
  caution: {
    icon: AlertTriangle,
    label: 'Use with Caution',
    shortLabel: 'Caution',
    bgClass: 'bg-amber-500/10',
    textClass: 'text-amber-400',
    borderClass: 'border-amber-500/30',
  },
  avoid: {
    icon: XCircle,
    label: 'Avoid',
    shortLabel: 'Avoid',
    bgClass: 'bg-red-500/10',
    textClass: 'text-red-400',
    borderClass: 'border-red-500/30',
  },
};

const sizeClasses = {
  sm: {
    container: 'px-2 py-0.5 text-xs gap-1',
    icon: 'w-3 h-3',
  },
  md: {
    container: 'px-3 py-1 text-sm gap-1.5',
    icon: 'w-4 h-4',
  },
  lg: {
    container: 'px-4 py-1.5 text-base gap-2',
    icon: 'w-5 h-5',
  },
};

const VerdictBadge = ({ verdict, showLabel = true, size = 'md', className }: VerdictBadgeProps) => {
  const config = verdictConfig[verdict];
  const Icon = config.icon;
  const sizeClass = sizeClasses[size];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium border",
        config.bgClass,
        config.textClass,
        config.borderClass,
        sizeClass.container,
        className
      )}
    >
      <Icon className={sizeClass.icon} />
      {showLabel && (
        <span>{size === 'sm' ? config.shortLabel : config.label}</span>
      )}
    </span>
  );
};

export default VerdictBadge;
