import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface NotificationPreferences {
  id: string;
  user_id: string;
  email_notifications: boolean;
  sms_notifications: boolean;
  push_notifications: boolean;
  low_balance_alert_threshold: number;
  call_summary_emails: boolean;
  marketing_emails: boolean;
}

const defaultPreferences: Omit<NotificationPreferences, "id" | "user_id"> = {
  email_notifications: true,
  sms_notifications: false,
  push_notifications: true,
  low_balance_alert_threshold: 5.0,
  call_summary_emails: true,
  marketing_emails: false,
};

export const useNotificationPreferences = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchPreferences = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("notification_preferences")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching notification preferences:", error);
      setIsLoading(false);
      return;
    }

    if (data) {
      setPreferences(data);
    }
    setIsLoading(false);
  };

  const savePreferences = async (updates: Partial<Omit<NotificationPreferences, "id" | "user_id">>) => {
    if (!user) return;

    setIsSaving(true);

    if (preferences) {
      // Update existing preferences
      const { error } = await supabase
        .from("notification_preferences")
        .update(updates)
        .eq("id", preferences.id);

      if (error) {
        console.error("Error updating preferences:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to save notification preferences.",
        });
        setIsSaving(false);
        return;
      }

      setPreferences((prev) => prev ? { ...prev, ...updates } : null);
    } else {
      // Create new preferences
      const { data, error } = await supabase
        .from("notification_preferences")
        .insert({
          user_id: user.id,
          ...defaultPreferences,
          ...updates,
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating preferences:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to save notification preferences.",
        });
        setIsSaving(false);
        return;
      }

      setPreferences(data);
    }

    toast({
      title: "Preferences saved",
      description: "Your notification preferences have been updated.",
    });
    setIsSaving(false);
  };

  useEffect(() => {
    if (user) {
      fetchPreferences();
    } else {
      setPreferences(null);
      setIsLoading(false);
    }
  }, [user]);

  return {
    preferences: preferences || {
      ...defaultPreferences,
      id: "",
      user_id: user?.id || "",
    },
    isLoading,
    isSaving,
    savePreferences,
    refetch: fetchPreferences,
  };
};
