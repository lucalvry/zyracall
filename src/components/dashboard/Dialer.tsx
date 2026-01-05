import { useState, useCallback } from "react";
import { Phone, Delete, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DialerProps {
  onCall: (number: string, recordCall: boolean) => void;
  disabled?: boolean;
}

const Dialer = ({ onCall, disabled }: DialerProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [recordCall, setRecordCall] = useState(false);

  const keys = [
    { value: "1", sub: "" },
    { value: "2", sub: "ABC" },
    { value: "3", sub: "DEF" },
    { value: "4", sub: "GHI" },
    { value: "5", sub: "JKL" },
    { value: "6", sub: "MNO" },
    { value: "7", sub: "PQRS" },
    { value: "8", sub: "TUV" },
    { value: "9", sub: "WXYZ" },
    { value: "*", sub: "" },
    { value: "0", sub: "+" },
    { value: "#", sub: "" },
  ];

  const handleKeyPress = useCallback((key: string) => {
    setPhoneNumber((prev) => prev + key);
  }, []);

  const handleDelete = useCallback(() => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  }, []);

  const handleClear = useCallback(() => {
    setPhoneNumber("");
  }, []);

  const handleCall = () => {
    if (phoneNumber.length >= 5) {
      onCall(phoneNumber, recordCall);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const cleaned = text.replace(/[^\d+]/g, "");
      setPhoneNumber(cleaned);
    } catch (err) {
      // Clipboard access denied
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      {/* Phone Number Display */}
      <div className="mb-6">
        <div 
          className="h-16 flex items-center justify-center px-4 rounded-xl bg-muted/50 border border-border cursor-text"
          onClick={handlePaste}
        >
          <span className={cn(
            "text-2xl font-medium tracking-wider",
            phoneNumber ? "text-foreground" : "text-muted-foreground"
          )}>
            {phoneNumber || "Enter number"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Click to paste from clipboard
        </p>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {keys.map(({ value, sub }) => (
          <Button
            key={value}
            variant="keypad"
            size="keypad"
            onClick={() => handleKeyPress(value)}
            className="flex flex-col items-center justify-center"
          >
            <span className="text-xl font-semibold">{value}</span>
            {sub && <span className="text-[10px] text-muted-foreground -mt-1">{sub}</span>}
          </Button>
        ))}
      </div>

      {/* Recording Toggle */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Button
          variant={recordCall ? "default" : "outline"}
          size="sm"
          onClick={() => setRecordCall(!recordCall)}
          className="gap-2"
        >
          {recordCall ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          {recordCall ? "Recording on" : "Record call"}
        </Button>
      </div>
      {recordCall && (
        <p className="text-xs text-muted-foreground text-center mb-4">
          Ensure consent where required by law
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="iconLg"
          onClick={handleDelete}
          onDoubleClick={handleClear}
          disabled={!phoneNumber}
          className="rounded-full"
        >
          <Delete className="w-5 h-5" />
        </Button>
        
        <Button
          variant="call"
          size="callBtn"
          onClick={handleCall}
          disabled={disabled || phoneNumber.length < 5}
          className="shadow-glow"
        >
          <Phone className="w-7 h-7" />
        </Button>
        
        <div className="w-12" /> {/* Spacer for centering */}
      </div>
    </div>
  );
};

export default Dialer;
