import { useState, useEffect, useCallback, useRef } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Dialer from "@/components/dashboard/Dialer";
import WalletBalance from "@/components/dashboard/WalletBalance";
import ActiveCall from "@/components/dashboard/ActiveCall";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/hooks/useWallet";
import { useTwilioDevice, CallStatus } from "@/hooks/useTwilioDevice";
import { useRealtimeWallet } from "@/hooks/useRealtimeWallet";
import { useRealtimeCallLogs } from "@/hooks/useRealtimeCallLogs";
import { useCallRates } from "@/hooks/useCallRates";
import { useNotifications } from "@/hooks/useNotifications";
import { Loader2, Phone, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [callDetails, setCallDetails] = useState<{
    phoneNumber: string;
    countryCode: string;
    countryName: string;
    ratePerMinute: number;
    isRecording: boolean;
  } | null>(null);
  
  const { toast } = useToast();
  const { data: wallet, isLoading: walletLoading } = useWallet();
  const { data: rates } = useCallRates();
  const { createNotification } = useNotifications();

  const handleTestNotification = useCallback(async () => {
    await createNotification(
      "test",
      "Test Notification",
      "This is a test notification to verify the system works! 🎉",
      "/dashboard"
    );
  }, [createNotification]);
  
  // Twilio device hook
  const {
    isReady: twilioReady,
    isInitializing: twilioInitializing,
    callStatus,
    error: twilioError,
    initializeDevice,
    makeCall,
    hangUp,
    callDuration
  } = useTwilioDevice();

  // Real-time subscriptions
  useRealtimeWallet();
  useRealtimeCallLogs();

  const balance = wallet?.balance ?? 0;
  const isInCall = callStatus !== 'idle' && callStatus !== 'error';

  // Track if we've already attempted initialization to prevent retry loop
  const hasAttemptedInit = useRef(false);

  // Initialize Twilio device ONCE when component mounts
  useEffect(() => {
    if (!hasAttemptedInit.current && !twilioReady && !twilioInitializing) {
      hasAttemptedInit.current = true;
      initializeDevice();
    }
  }, [twilioReady, twilioInitializing, initializeDevice]);

  const getRateForCountry = useCallback((countryCode: string): { rate: number; countryName: string } => {
    const countryRate = rates?.find(r => r.country_code === countryCode);
    if (countryRate) {
      return { 
        rate: Number(countryRate.mobile_rate), 
        countryName: countryRate.country_name 
      };
    }
    return { rate: 0.05, countryName: 'Unknown' }; // Default rate
  }, [rates]);

  const handleCall = useCallback(async (phoneNumber: string, recordCall: boolean, countryCode: string) => {
    if (balance <= 0) {
      toast({
        title: "Insufficient balance",
        description: "Please top up your wallet to make calls",
        variant: "destructive",
      });
      return;
    }

    const { rate, countryName } = getRateForCountry(countryCode);

    setCallDetails({ 
      phoneNumber, 
      countryCode,
      countryName,
      ratePerMinute: rate,
      isRecording: recordCall 
    });

    // Make the actual Twilio call
    await makeCall({
      phoneNumber,
      countryCode,
      countryName,
      ratePerMinute: rate,
      recordCall
    });
  }, [balance, toast, getRateForCountry, makeCall]);

  const handleEndCall = useCallback(() => {
    hangUp();
    setCallDetails(null);
  }, [hangUp]);

  const handleTopUp = () => {
    window.location.href = "/dashboard/wallet";
  };

  const getStatusText = (status: CallStatus): string => {
    switch (status) {
      case 'connecting': return 'Connecting...';
      case 'ringing': return 'Ringing...';
      case 'in-progress': return 'In Progress';
      case 'disconnecting': return 'Ending...';
      case 'error': return 'Error';
      default: return 'Ready';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Make a call</h1>
            <p className="text-muted-foreground">
              Enter a phone number to start calling
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleTestNotification}
            className="gap-2"
          >
            <Bell className="h-4 w-4" />
            Test Notification
          </Button>
        </div>

        {/* Twilio Status Indicator */}
        <div className="mb-4 flex items-center gap-2">
          <div 
            className={`w-2 h-2 rounded-full ${
              twilioReady ? 'bg-green-500' : 
              twilioInitializing ? 'bg-yellow-500 animate-pulse' : 
              'bg-red-500'
            }`} 
          />
          <span className="text-sm text-muted-foreground">
            {twilioReady ? 'Ready to call' : 
             twilioInitializing ? 'Initializing...' : 
             twilioError || 'Not connected'}
          </span>
          {!twilioReady && !twilioInitializing && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={initializeDevice}
              className="text-xs"
            >
              Retry
            </Button>
          )}
        </div>

        {/* Wallet Balance */}
        {walletLoading ? (
          <div className="mb-8 max-w-md p-4 rounded-xl bg-card border border-border flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <WalletBalance 
            balance={Number(balance)} 
            onTopUp={handleTopUp}
            className="mb-8 max-w-md"
          />
        )}

        {/* Dialer */}
        <div className="flex justify-center">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <Dialer 
              onCall={handleCall} 
              disabled={balance <= 0 || !twilioReady || isInCall} 
            />
          </div>
        </div>
      </div>

      {/* Active Call Overlay */}
      {isInCall && callDetails && (
        <ActiveCall
          phoneNumber={callDetails.phoneNumber}
          countryName={callDetails.countryName}
          ratePerMinute={callDetails.ratePerMinute}
          isRecording={callDetails.isRecording}
          onEndCall={handleEndCall}
          callStatus={getStatusText(callStatus)}
          duration={callDuration}
        />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
