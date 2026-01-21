import { Smartphone, Phone, Cloud } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { VerdictLevel } from "@/data/2fa-platforms";
import VerdictBadge from "./VerdictBadge";
import { cn } from "@/lib/utils";

interface NumberTypeVerdictsProps {
  verdicts: {
    mobile: VerdictLevel;
    voip: VerdictLevel;
    virtual: VerdictLevel;
  };
  verdictStatements: {
    mobile: string;
    voip: string;
    virtual: string;
  };
  className?: string;
}

const numberTypes = [
  { key: 'mobile' as const, icon: Smartphone, label: 'Mobile Numbers', description: 'SIM-based phone numbers from carriers' },
  { key: 'voip' as const, icon: Phone, label: 'VoIP Numbers', description: 'Internet-based numbers (Google Voice, Skype, etc.)' },
  { key: 'virtual' as const, icon: Cloud, label: 'Virtual Numbers', description: 'Temporary or online SMS services' },
];

const NumberTypeVerdicts = ({ verdicts, verdictStatements, className }: NumberTypeVerdictsProps) => {
  return (
    <div className={cn("grid gap-4 md:grid-cols-3", className)}>
      {numberTypes.map(({ key, icon: Icon, label, description }) => {
        const verdict = verdicts[key];
        const statement = verdictStatements[key];
        
        return (
          <Card 
            key={key}
            className={cn(
              "relative overflow-hidden transition-all duration-300",
              "border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80"
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  verdict === 'recommended' && "bg-emerald-500/10",
                  verdict === 'caution' && "bg-amber-500/10",
                  verdict === 'avoid' && "bg-red-500/10"
                )}>
                  <Icon className={cn(
                    "w-5 h-5",
                    verdict === 'recommended' && "text-emerald-400",
                    verdict === 'caution' && "text-amber-400",
                    verdict === 'avoid' && "text-red-400"
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground">{label}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">{description}</p>
                </div>
              </div>
              
              <VerdictBadge verdict={verdict} size="sm" className="mb-3" />
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {statement}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default NumberTypeVerdicts;
