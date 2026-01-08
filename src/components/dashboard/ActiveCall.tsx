import { useState, useEffect } from "react";
import { Phone, PhoneOff, DollarSign, Clock, Mic, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActiveCallProps {
  phoneNumber: string;
  countryName: string;
  ratePerMinute: number;
  isRecording: boolean;
  onEndCall: () => void;
  callStatus?: string;
  duration?: number;
}

const ActiveCall = ({ 
  phoneNumber, 
  countryName, 
  ratePerMinute, 
  isRecording,
  onEndCall,
  callStatus,
  duration: externalDuration
}: ActiveCallProps) => {
  const [internalDuration, setInternalDuration] = useState(0);
  const [internalStatus, setInternalStatus] = useState<"connecting" | "ringing" | "active">("connecting");

  // Use external values if provided, otherwise use internal simulation
  const isExternallyControlled = callStatus !== undefined;
  const duration = externalDuration !== undefined ? externalDuration : internalDuration;

  // Map external status to display text
  const getDisplayStatus = () => {
    if (callStatus) {
      return callStatus;
    }
    if (internalStatus === "connecting") return "Connecting...";
    if (internalStatus === "ringing") return "Ringing...";
    return "In Call";
  };

  const isActive = isExternallyControlled 
    ? callStatus === "In Progress" 
    : internalStatus === "active";

  const isConnecting = isExternallyControlled
    ? callStatus === "Connecting..." || callStatus === "Ringing..."
    : internalStatus !== "active";

  // Internal simulation (fallback when not externally controlled)
  useEffect(() => {
    if (isExternallyControlled) return;

    const connectTimer = setTimeout(() => setInternalStatus("ringing"), 1500);
    const activeTimer = setTimeout(() => setInternalStatus("active"), 3500);

    return () => {
      clearTimeout(connectTimer);
      clearTimeout(activeTimer);
    };
  }, [isExternallyControlled]);

  useEffect(() => {
    if (isExternallyControlled) return;
    if (internalStatus !== "active") return;

    const interval = setInterval(() => {
      setInternalDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [internalStatus, isExternallyControlled]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const currentCost = (duration / 60) * ratePerMinute;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto p-8 text-center animate-fade-in">
        {/* Status indicator */}
        <div className="mb-8">
          <div className={`
            w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4
            ${isActive 
              ? "bg-call-active/20 animate-pulse-ring" 
              : "bg-primary/20"
            }
          `}>
            <div className={`
              w-16 h-16 rounded-full flex items-center justify-center
              ${isActive ? "bg-call-active" : "gradient-hero"}
            `}>
              {isConnecting ? (
                <Loader2 className="w-8 h-8 text-primary-foreground animate-spin" />
              ) : (
                <Phone className="w-8 h-8 text-primary-foreground" />
              )}
            </div>
          </div>

          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
            {getDisplayStatus()}
          </p>
        </div>

        {/* Phone number and country */}
        <h2 className="text-2xl font-bold text-foreground mb-1">{phoneNumber}</h2>
        <p className="text-muted-foreground mb-8">{countryName}</p>

        {/* Call metrics - show when active or when we have duration */}
        {(isActive || duration > 0) && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Duration</span>
              </div>
              <p className="text-xl font-semibold text-foreground">
                {formatDuration(duration)}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">Cost</span>
              </div>
              <p className="text-xl font-semibold text-foreground">
                ${currentCost.toFixed(3)}
              </p>
            </div>
          </div>
        )}

        {/* Recording indicator */}
        {isRecording && (
          <div className="flex items-center justify-center gap-2 mb-8 text-destructive">
            <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            <Mic className="w-4 h-4" />
            <span className="text-sm font-medium">Recording</span>
          </div>
        )}

        {/* End call button */}
        <Button
          variant="callEnd"
          size="callBtn"
          onClick={onEndCall}
          className="mx-auto"
        >
          <PhoneOff className="w-7 h-7" />
        </Button>
      </div>
    </div>
  );
};

export default ActiveCall;
