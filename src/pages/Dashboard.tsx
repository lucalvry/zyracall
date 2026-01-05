import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Dialer from "@/components/dashboard/Dialer";
import WalletBalance from "@/components/dashboard/WalletBalance";
import ActiveCall from "@/components/dashboard/ActiveCall";
import { useToast } from "@/hooks/use-toast";

// Mock data - in real app, this would come from API
const mockBalance = 25.50;

const Dashboard = () => {
  const [isInCall, setIsInCall] = useState(false);
  const [callDetails, setCallDetails] = useState<{
    phoneNumber: string;
    isRecording: boolean;
  } | null>(null);
  const { toast } = useToast();

  const handleCall = (phoneNumber: string, recordCall: boolean) => {
    setCallDetails({ phoneNumber, isRecording: recordCall });
    setIsInCall(true);
  };

  const handleEndCall = () => {
    setIsInCall(false);
    toast({
      title: "Call ended",
      description: `Duration: 2:34 • Cost: $0.42`,
    });
    setCallDetails(null);
  };

  const handleTopUp = () => {
    window.location.href = "/dashboard/wallet";
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">Make a call</h1>
          <p className="text-muted-foreground">
            Enter a phone number to start calling
          </p>
        </div>

        {/* Wallet Balance */}
        <WalletBalance 
          balance={mockBalance} 
          onTopUp={handleTopUp}
          className="mb-8 max-w-md"
        />

        {/* Dialer */}
        <div className="flex justify-center">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <Dialer onCall={handleCall} disabled={mockBalance <= 0} />
          </div>
        </div>
      </div>

      {/* Active Call Overlay */}
      {isInCall && callDetails && (
        <ActiveCall
          phoneNumber={callDetails.phoneNumber}
          countryName="United States"
          ratePerMinute={0.02}
          isRecording={callDetails.isRecording}
          onEndCall={handleEndCall}
        />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
