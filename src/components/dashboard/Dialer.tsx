import { useState, useCallback, useEffect, useMemo } from "react";
import { Phone, Delete, Mic, MicOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CountryCodeSelector, { 
  countries, 
  detectCountryFromNumber, 
  type Country 
} from "./CountryCodeSelector";

interface DialerProps {
  onCall: (number: string, recordCall: boolean, dialCode: string, countryName: string) => void;
  disabled?: boolean;
  disabledReason?: string;
}

// Phone number validation
const validatePhoneNumber = (number: string, dialCode: string): { isValid: boolean; error?: string } => {
  // Remove non-digits for validation
  const digitsOnly = number.replace(/\D/g, '');
  
  if (digitsOnly.length < 5) {
    return { isValid: false, error: 'Number too short' };
  }
  
  if (digitsOnly.length > 15) {
    return { isValid: false, error: 'Number too long' };
  }
  
  // Check for valid E.164 format when combined with dial code
  const fullNumber = dialCode + digitsOnly;
  const e164Regex = /^\+[1-9]\d{6,14}$/;
  if (!e164Regex.test(fullNumber)) {
    return { isValid: false, error: 'Invalid format' };
  }
  
  return { isValid: true };
};

const Dialer = ({ onCall, disabled, disabledReason }: DialerProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [recordCall, setRecordCall] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries[0] // Default to US
  );

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

  // Auto-detect country when pasting a number with + prefix
  useEffect(() => {
    if (phoneNumber.startsWith("+")) {
      const detected = detectCountryFromNumber(phoneNumber);
      if (detected && detected.code !== selectedCountry.code) {
        setSelectedCountry(detected);
        // Remove the country code from the number
        const numberWithoutCode = phoneNumber.slice(detected.dialCode.length);
        setPhoneNumber(numberWithoutCode);
      }
    }
  }, [phoneNumber, selectedCountry.code]);

  // Validate phone number
  const validation = useMemo(() => 
    validatePhoneNumber(phoneNumber, selectedCountry.dialCode),
    [phoneNumber, selectedCountry.dialCode]
  );

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
    if (!validation.isValid) return;
    
    const fullNumber = selectedCountry.dialCode + phoneNumber;
    // Pass normalized dial code (digits only, no +) and country name
    const normalizedDialCode = selectedCountry.dialCode.replace(/^\+/, '');
    onCall(fullNumber, recordCall, normalizedDialCode, selectedCountry.name);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const cleaned = text.replace(/[^\d+]/g, "");
      
      // Check if pasted number includes country code
      if (cleaned.startsWith("+")) {
        const detected = detectCountryFromNumber(cleaned);
        if (detected) {
          setSelectedCountry(detected);
          setPhoneNumber(cleaned.slice(detected.dialCode.length));
          return;
        }
      }
      
      setPhoneNumber(cleaned);
    } catch (err) {
      // Clipboard access denied
    }
  };

  const handleCountrySelect = useCallback((country: Country) => {
    setSelectedCountry(country);
  }, []);

  const displayNumber = phoneNumber || "Enter number";

  return (
    <div className="w-full max-w-xs mx-auto">
      {/* Country Code Selector and Phone Number Display */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <CountryCodeSelector
            selectedCountry={selectedCountry}
            onSelect={handleCountrySelect}
          />
          <div 
            className={cn(
              "flex-1 h-12 flex items-center px-4 rounded-xl bg-muted/50 border cursor-text transition-colors",
              phoneNumber && !validation.isValid ? "border-destructive" : "border-border"
            )}
            onClick={handlePaste}
          >
            <span className={cn(
              "text-xl font-medium tracking-wider truncate",
              phoneNumber ? "text-foreground" : "text-muted-foreground"
            )}>
              {displayNumber}
            </span>
          </div>
        </div>
        {phoneNumber && !validation.isValid && (
          <div className="flex items-center gap-1.5 mt-2 text-destructive">
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="text-xs">{validation.error}</span>
          </div>
        )}
        <p className="text-xs text-muted-foreground text-center mt-2">
          Click number field to paste from clipboard
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
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex">
                <Button
                  variant="call"
                  size="callBtn"
                  onClick={handleCall}
                  disabled={disabled || !validation.isValid}
                  className="shadow-glow"
                >
                  <Phone className="w-7 h-7" />
                </Button>
              </span>
            </TooltipTrigger>
            {(disabled || !validation.isValid) && (
              <TooltipContent>
                <p>{disabledReason || validation.error || "Cannot make call"}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        
        <div className="w-12" /> {/* Spacer for centering */}
      </div>
    </div>
  );
};

export default Dialer;
