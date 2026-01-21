import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FeedbackSubmission {
  platformId: string;
  countryCode: string;
  numberType: 'mobile' | 'voip' | 'virtual';
  worked: boolean;
  comment?: string;
}

interface FeedbackStats {
  totalReports: number;
  workedCount: number;
  failedCount: number;
  successRate: number;
}

export const usePlatformFeedback = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const submitFeedback = useCallback(async (feedback: FeedbackSubmission) => {
    const feedbackKey = `${feedback.platformId}-${feedback.countryCode}-${feedback.numberType}`;
    
    // Prevent duplicate submissions in same session
    if (submittedFeedback.has(feedbackKey)) {
      toast({
        title: "Already submitted",
        description: "You've already submitted feedback for this combination.",
        variant: "destructive",
      });
      return false;
    }

    setIsSubmitting(true);
    
    try {
      // Get current user if logged in
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('platform_feedback')
        .insert({
          platform_id: feedback.platformId,
          country_code: feedback.countryCode,
          number_type: feedback.numberType,
          worked: feedback.worked,
          comment: feedback.comment || null,
          user_id: user?.id || null,
        });

      if (error) {
        console.error('Error submitting feedback:', error);
        toast({
          title: "Error",
          description: "Failed to submit feedback. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      // Mark as submitted for this session
      setSubmittedFeedback(prev => new Set(prev).add(feedbackKey));
      
      toast({
        title: "Thank you!",
        description: "Your feedback helps improve our data for everyone.",
      });
      
      return true;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [submittedFeedback, toast]);

  const hasFeedback = useCallback((platformId: string, countryCode: string, numberType: string) => {
    return submittedFeedback.has(`${platformId}-${countryCode}-${numberType}`);
  }, [submittedFeedback]);

  return {
    submitFeedback,
    isSubmitting,
    hasFeedback,
  };
};

export const useFeedbackStats = (platformId: string) => {
  const [stats, setStats] = useState<FeedbackStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    try {
      // For public aggregate stats, we use a count approach
      // Note: This requires SELECT permissions or an edge function
      // For now, we'll return mock stats since we can't SELECT without auth
      // In production, you'd create a view or edge function for public stats
      
      setStats({
        totalReports: 0,
        workedCount: 0,
        failedCount: 0,
        successRate: 0,
      });
    } catch (error) {
      console.error('Error fetching feedback stats:', error);
    } finally {
      setIsLoading(false);
    }
  }, [platformId]);

  return { stats, isLoading, fetchStats };
};
