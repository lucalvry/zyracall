import { cn } from "@/lib/utils";
import { ReliabilityLevel, reliabilityLabels } from "@/data/2fa-platforms";
import { CheckCircle, AlertCircle, AlertTriangle, XCircle } from "lucide-react";

interface ReliabilityBadgeProps {
  level: ReliabilityLevel;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const iconMap = {
  high: CheckCircle,
  medium: AlertCircle,
  low: AlertTriangle,
  blocked: XCircle,
};

const colorMap = {
  high: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  low: "bg-caution/10 text-caution border-caution/20",
  blocked: "bg-error/10 text-error border-error/20",
};

const dotColorMap = {
  high: "bg-success",
  medium: "bg-warning",
  low: "bg-caution",
  blocked: "bg-error",
};

const sizeMap = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2.5 py-1",
  lg: "text-base px-3 py-1.5",
};

const iconSizeMap = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

const ReliabilityBadge = ({ 
  level, 
  showLabel = true, 
  size = "md",
  className 
}: ReliabilityBadgeProps) => {
  const Icon = iconMap[level];
  
  return (
    <span 
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        colorMap[level],
        sizeMap[size],
        className
      )}
    >
      <Icon className={iconSizeMap[size]} />
      {showLabel && <span>{reliabilityLabels[level]}</span>}
    </span>
  );
};

// Simple dot indicator for compact displays
export const ReliabilityDot = ({ 
  level, 
  className 
}: { 
  level: ReliabilityLevel; 
  className?: string 
}) => (
  <span 
    className={cn(
      "inline-block w-2.5 h-2.5 rounded-full",
      dotColorMap[level],
      className
    )}
    title={reliabilityLabels[level]}
  />
);

export default ReliabilityBadge;
