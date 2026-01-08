-- Drop the unique constraint on country_code since multiple countries can share the same code
ALTER TABLE public.call_rates DROP CONSTRAINT IF EXISTS call_rates_country_code_key;

-- Add unique constraint on country_name instead
ALTER TABLE public.call_rates ADD CONSTRAINT call_rates_country_name_key UNIQUE (country_name);

-- Now seed the data
INSERT INTO public.call_rates (country_code, country_name, landline_rate, mobile_rate) VALUES
('+1', 'United States', 0.0100, 0.0200),
('+1', 'Canada', 0.0100, 0.0200),
('+44', 'United Kingdom', 0.0200, 0.0300),
('+49', 'Germany', 0.0200, 0.0400),
('+33', 'France', 0.0200, 0.0400),
('+61', 'Australia', 0.0300, 0.0500),
('+81', 'Japan', 0.0400, 0.0600),
('+86', 'China', 0.0200, 0.0300),
('+91', 'India', 0.0100, 0.0200),
('+55', 'Brazil', 0.0400, 0.0800),
('+52', 'Mexico', 0.0300, 0.0500),
('+34', 'Spain', 0.0200, 0.0400),
('+39', 'Italy', 0.0200, 0.0500),
('+31', 'Netherlands', 0.0200, 0.0400),
('+82', 'South Korea', 0.0300, 0.0500),
('+65', 'Singapore', 0.0200, 0.0300),
('+852', 'Hong Kong', 0.0200, 0.0300),
('+971', 'United Arab Emirates', 0.0800, 0.1200),
('+966', 'Saudi Arabia', 0.0600, 0.1000),
('+27', 'South Africa', 0.0400, 0.0800),
('+7', 'Russia', 0.0400, 0.0600),
('+48', 'Poland', 0.0200, 0.0400),
('+46', 'Sweden', 0.0200, 0.0300),
('+47', 'Norway', 0.0200, 0.0300),
('+45', 'Denmark', 0.0200, 0.0300),
('+358', 'Finland', 0.0200, 0.0400),
('+43', 'Austria', 0.0200, 0.0400),
('+41', 'Switzerland', 0.0300, 0.0500),
('+32', 'Belgium', 0.0200, 0.0400),
('+351', 'Portugal', 0.0200, 0.0400),
('+30', 'Greece', 0.0300, 0.0500),
('+353', 'Ireland', 0.0200, 0.0400),
('+64', 'New Zealand', 0.0300, 0.0500),
('+63', 'Philippines', 0.0300, 0.0500),
('+60', 'Malaysia', 0.0200, 0.0400),
('+66', 'Thailand', 0.0200, 0.0400),
('+84', 'Vietnam', 0.0300, 0.0500),
('+62', 'Indonesia', 0.0300, 0.0500),
('+92', 'Pakistan', 0.0200, 0.0400),
('+880', 'Bangladesh', 0.0200, 0.0400)
ON CONFLICT (country_name) DO UPDATE SET
  country_code = EXCLUDED.country_code,
  landline_rate = EXCLUDED.landline_rate,
  mobile_rate = EXCLUDED.mobile_rate,
  updated_at = now();