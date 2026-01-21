-- Create table for capturing mobile number interest/demand
CREATE TABLE public.mobile_number_interest (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT,
  country_code TEXT NOT NULL,
  use_case TEXT NOT NULL CHECK (use_case IN ('2fa', 'business_calling', 'personal')),
  email TEXT,
  source_tool TEXT NOT NULL,
  user_id UUID,
  ip_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mobile_number_interest ENABLE ROW LEVEL SECURITY;

-- Anyone can submit interest (no auth required)
CREATE POLICY "Anyone can submit mobile number interest"
ON public.mobile_number_interest
FOR INSERT
WITH CHECK (true);

-- Admins can view all submissions
CREATE POLICY "Admins can view all mobile number interest"
ON public.mobile_number_interest
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Users can view their own submissions (if logged in)
CREATE POLICY "Users can view their own submissions"
ON public.mobile_number_interest
FOR SELECT
USING (auth.uid() = user_id);

-- Admins can manage all records
CREATE POLICY "Admins can manage mobile number interest"
ON public.mobile_number_interest
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for common queries
CREATE INDEX idx_mobile_number_interest_platform ON public.mobile_number_interest(platform);
CREATE INDEX idx_mobile_number_interest_country ON public.mobile_number_interest(country_code);
CREATE INDEX idx_mobile_number_interest_source ON public.mobile_number_interest(source_tool);
CREATE INDEX idx_mobile_number_interest_created ON public.mobile_number_interest(created_at DESC);