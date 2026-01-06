import { Check, X, Minus } from "lucide-react";

export interface ComparisonFeature {
  feature: string;
  zyracall: boolean | string;
  competitor: boolean | string;
}

interface ComparisonTableProps {
  competitorName: string;
  competitorLogo?: string;
  features: ComparisonFeature[];
}

const ComparisonTable = ({ competitorName, features }: ComparisonTableProps) => {
  const renderValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-success" />
      ) : (
        <X className="w-5 h-5 text-destructive" />
      );
    }
    if (value === "-") {
      return <Minus className="w-5 h-5 text-muted-foreground" />;
    }
    return <span className="text-sm text-foreground">{value}</span>;
  };

  return (
    <div className="bg-card border border-border/50 rounded-2xl shadow-card overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-muted/50 border-b border-border/50">
        <div className="font-semibold text-foreground">Feature</div>
        <div className="text-center">
          <span className="font-semibold text-accent">ZyraCall</span>
        </div>
        <div className="text-center">
          <span className="font-semibold text-muted-foreground">{competitorName}</span>
        </div>
      </div>

      {/* Table Rows */}
      {features.map((row, index) => (
        <div
          key={row.feature}
          className={`grid grid-cols-3 gap-4 px-6 py-4 items-center ${
            index !== features.length - 1 ? "border-b border-border/30" : ""
          }`}
        >
          <div className="text-foreground text-sm">{row.feature}</div>
          <div className="flex justify-center">{renderValue(row.zyracall)}</div>
          <div className="flex justify-center">{renderValue(row.competitor)}</div>
        </div>
      ))}
    </div>
  );
};

export default ComparisonTable;
