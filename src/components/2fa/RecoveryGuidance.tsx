import { RefreshCw, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecoveryGuidance as RecoveryGuidanceType } from "@/data/2fa-platforms";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface RecoveryGuidanceProps {
  guidance: RecoveryGuidanceType;
  platformName: string;
  className?: string;
}

const RecoveryGuidance = ({ guidance, platformName, className }: RecoveryGuidanceProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasContent = guidance.alternativeType || guidance.retryLimit || guidance.lockoutWarning;

  if (!hasContent) return null;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className={cn("border-amber-500/20 bg-amber-500/5", className)}>
        <CollapsibleTrigger className="w-full text-left">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2 text-amber-400">
                <RefreshCw className="w-5 h-5" />
                <span>If Your Previous Number Failed</span>
              </div>
              <ArrowRight className={cn(
                "w-4 h-4 text-muted-foreground transition-transform",
                isOpen && "rotate-90"
              )} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4">
            {guidance.alternativeType && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">Try Instead</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">{guidance.alternativeType}</p>
                </div>
              </div>
            )}
            
            {guidance.retryLimit && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">Retry Limits</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">{guidance.retryLimit}</p>
                </div>
              </div>
            )}
            
            {guidance.lockoutWarning && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">Lockout Warning</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">{guidance.lockoutWarning}</p>
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default RecoveryGuidance;
