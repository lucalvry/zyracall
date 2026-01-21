-- Create platform_feedback table for user reports on 2FA verification success/failure
CREATE TABLE public.platform_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_id TEXT NOT NULL,
  country_code TEXT NOT NULL,
  number_type TEXT NOT NULL CHECK (number_type IN ('mobile', 'voip', 'virtual')),
  worked BOOLEAN NOT NULL,
  comment TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  ip_hash TEXT,
  verified BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE public.platform_feedback ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert feedback (anonymous submissions allowed)
CREATE POLICY "Anyone can submit feedback" ON public.platform_feedback
  FOR INSERT WITH CHECK (true);

-- Allow users to view their own feedback
CREATE POLICY "Users can view their own feedback" ON public.platform_feedback
  FOR SELECT USING (auth.uid() = user_id);

-- Admins can view all feedback
CREATE POLICY "Admins can view all feedback" ON public.platform_feedback
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can manage all feedback
CREATE POLICY "Admins can manage all feedback" ON public.platform_feedback
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for efficient queries
CREATE INDEX idx_platform_feedback_platform_country ON public.platform_feedback(platform_id, country_code);
CREATE INDEX idx_platform_feedback_created_at ON public.platform_feedback(created_at DESC);