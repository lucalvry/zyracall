import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface CallLog {
  id: string;
  user_id: string;
  destination_number: string;
  destination_country: string;
  destination_country_code: string;
  duration_seconds: number;
  cost: number;
  rate_per_minute: number;
  status: string;
  recording_url: string | null;
  started_at: string;
  ended_at: string | null;
}

export const useCallHistory = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["call-history", user?.id],
    queryFn: async (): Promise<CallLog[]> => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("call_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("started_at", { ascending: false })
        .limit(100);

      if (error) throw error;

      return (data || []) as CallLog[];
    },
    enabled: !!user,
  });
};

export const useRecordingUrl = (recordingPath: string | null) => {
  return useQuery({
    queryKey: ["recording-url", recordingPath],
    queryFn: async (): Promise<string | null> => {
      if (!recordingPath) return null;

      const { data, error } = await supabase.storage
        .from("call-recordings")
        .createSignedUrl(recordingPath, 3600); // 1 hour expiry

      if (error) {
        console.error("Error getting signed URL:", error);
        return null;
      }

      return data.signedUrl;
    },
    enabled: !!recordingPath,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};
