-- Add status column to platform_feedback for admin review workflow
ALTER TABLE public.platform_feedback 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending' 
CHECK (status IN ('pending', 'approved', 'rejected'));

-- Create aggregated scores table for official compatibility data
CREATE TABLE IF NOT EXISTS public.platform_compatibility_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_id TEXT NOT NULL,
  country_code TEXT NOT NULL,
  number_type TEXT NOT NULL,
  success_rate NUMERIC NOT NULL DEFAULT 0,
  total_reports INTEGER NOT NULL DEFAULT 0,
  last_calculated TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(platform_id, country_code, number_type)
);

-- RLS for scores table
ALTER TABLE public.platform_compatibility_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view compatibility scores" ON public.platform_compatibility_scores
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage compatibility scores" ON public.platform_compatibility_scores
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Create bookmarks table for 2FA platform tracking
CREATE TABLE IF NOT EXISTS public.platform_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  platform_id TEXT NOT NULL,
  country_code TEXT DEFAULT '',
  notify_on_change BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, platform_id, country_code)
);

-- RLS for bookmarks table
ALTER TABLE public.platform_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookmarks" ON public.platform_bookmarks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookmarks" ON public.platform_bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookmarks" ON public.platform_bookmarks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks" ON public.platform_bookmarks
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all bookmarks" ON public.platform_bookmarks
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- Add updated_at trigger for compatibility scores
CREATE TRIGGER update_platform_compatibility_scores_updated_at
  BEFORE UPDATE ON public.platform_compatibility_scores
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();