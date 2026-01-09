-- Add region column to call_rates table
ALTER TABLE public.call_rates 
ADD COLUMN region TEXT DEFAULT 'Other';

-- Create regional_markup_settings table
CREATE TABLE public.regional_markup_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  region TEXT NOT NULL UNIQUE,
  default_markup_percentage NUMERIC NOT NULL DEFAULT 50,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.regional_markup_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies for regional_markup_settings
CREATE POLICY "Anyone can view regional markup settings"
ON public.regional_markup_settings
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage regional markup settings"
ON public.regional_markup_settings
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_regional_markup_settings_updated_at
BEFORE UPDATE ON public.regional_markup_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default regional markups (lower for high-cost destinations)
INSERT INTO public.regional_markup_settings (region, default_markup_percentage) VALUES
  ('Africa', 25),
  ('South Asia', 25),
  ('Caribbean', 25),
  ('Middle East', 30),
  ('Latin America', 35),
  ('Southeast Asia', 35),
  ('East Asia', 40),
  ('Oceania', 40),
  ('Europe', 45),
  ('North America', 50),
  ('Other', 40);

-- Update existing call_rates with regions based on country codes
UPDATE public.call_rates SET region = 'Africa' WHERE country_code IN ('+234', '+233', '+254', '+27', '+20', '+212', '+213', '+216', '+251', '+256', '+255', '+237', '+225', '+221', '+244', '+263', '+260', '+248', '+230', '+267', '+264');
UPDATE public.call_rates SET region = 'South Asia' WHERE country_code IN ('+91', '+92', '+880', '+94', '+977', '+93', '+960');
UPDATE public.call_rates SET region = 'Southeast Asia' WHERE country_code IN ('+66', '+84', '+62', '+60', '+63', '+65', '+95', '+855', '+856');
UPDATE public.call_rates SET region = 'East Asia' WHERE country_code IN ('+86', '+81', '+82', '+852', '+853', '+886');
UPDATE public.call_rates SET region = 'Middle East' WHERE country_code IN ('+971', '+966', '+974', '+968', '+973', '+965', '+962', '+961', '+972', '+98', '+964');
UPDATE public.call_rates SET region = 'Europe' WHERE country_code IN ('+44', '+49', '+33', '+39', '+34', '+31', '+32', '+43', '+41', '+46', '+47', '+45', '+358', '+48', '+351', '+30', '+353', '+420', '+36', '+40', '+359', '+380', '+7');
UPDATE public.call_rates SET region = 'North America' WHERE country_code IN ('+1');
UPDATE public.call_rates SET region = 'Latin America' WHERE country_code IN ('+55', '+52', '+54', '+56', '+57', '+51', '+58', '+593', '+506', '+507', '+503', '+502', '+504', '+505');
UPDATE public.call_rates SET region = 'Caribbean' WHERE country_code LIKE '+1%' AND country_name NOT IN ('United States', 'Canada');
UPDATE public.call_rates SET region = 'Oceania' WHERE country_code IN ('+61', '+64', '+679', '+675', '+677');

-- Apply regional markups to existing rates (recalculate customer rates)
UPDATE public.call_rates cr
SET 
  markup_percentage = rms.default_markup_percentage,
  landline_rate = ROUND(base_cost_landline * (1 + rms.default_markup_percentage / 100), 4),
  mobile_rate = ROUND(base_cost_mobile * (1 + rms.default_markup_percentage / 100), 4),
  updated_at = now()
FROM public.regional_markup_settings rms
WHERE cr.region = rms.region
  AND cr.base_cost_landline > 0;