import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type UseCase = "2fa" | "business_calling" | "personal";

export interface MobileNumberInterestData {
  platform?: string;
  country_code: string;
  use_case: UseCase;
  email?: string;
  source_tool: string;
}

export const useMobileNumberInterest = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const submitInterest = async (data: MobileNumberInterestData) => {
    setIsSubmitting(true);
    
    try {
      // Get current user if logged in
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from("mobile_number_interest")
        .insert({
          platform: data.platform || null,
          country_code: data.country_code,
          use_case: data.use_case,
          email: data.email?.trim() || null,
          source_tool: data.source_tool,
          user_id: user?.id || null,
        });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "Thank you!",
        description: "We'll use this to prioritize our expansion.",
      });
      
      return true;
    } catch (error) {
      console.error("Error submitting interest:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setIsSuccess(false);
  };

  return {
    submitInterest,
    isSubmitting,
    isSuccess,
    reset,
  };
};
