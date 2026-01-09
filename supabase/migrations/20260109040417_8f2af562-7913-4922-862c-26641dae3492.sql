-- Fix region assignments using correct country code format (without +)
UPDATE public.call_rates SET region = 'Africa' WHERE country_code IN ('234', '233', '254', '27', '20', '212', '213', '216', '251', '256', '255', '237', '225', '221', '244', '263', '260', '248', '230', '267', '264', '226', '229', '257', '238', '236', '235', '269', '242', '243', '253', '240', '291', '268', '241', '220', '224', '245', '266', '231', '218', '261', '265', '223', '222', '258', '264', '227', '250', '290', '239', '232', '252', '211', '249', '228', '256', '967', '260', '263');
UPDATE public.call_rates SET region = 'South Asia' WHERE country_code IN ('91', '92', '880', '94', '977', '93', '960');
UPDATE public.call_rates SET region = 'Southeast Asia' WHERE country_code IN ('66', '84', '62', '60', '63', '65', '95', '855', '856', '670', '673');
UPDATE public.call_rates SET region = 'East Asia' WHERE country_code IN ('86', '81', '82', '852', '853', '886', '850', '976');
UPDATE public.call_rates SET region = 'Middle East' WHERE country_code IN ('971', '966', '974', '968', '973', '965', '962', '961', '972', '98', '964', '963', '967');
UPDATE public.call_rates SET region = 'Europe' WHERE country_code IN ('44', '49', '33', '39', '34', '31', '32', '43', '41', '46', '47', '45', '358', '48', '351', '30', '353', '420', '36', '40', '359', '380', '7', '355', '376', '374', '375', '387', '385', '357', '372', '679', '350', '299', '995', '354', '371', '423', '370', '352', '356', '373', '377', '382', '389', '378', '381', '421', '386', '378', '90');
UPDATE public.call_rates SET region = 'North America' WHERE country_code = '1' AND country_name IN ('United States', 'Canada');
UPDATE public.call_rates SET region = 'Latin America' WHERE country_code IN ('55', '52', '54', '56', '57', '51', '58', '593', '506', '507', '503', '502', '504', '505', '591', '595', '598', '592', '597', '501');
UPDATE public.call_rates SET region = 'Caribbean' WHERE country_code LIKE '1%' AND country_name NOT IN ('United States', 'Canada');
UPDATE public.call_rates SET region = 'Oceania' WHERE country_code IN ('61', '64', '679', '675', '677', '682', '686', '674', '683', '672', '680', '685', '688', '678', '681', '687', '689', '676', '690', '692', '691');

-- Apply regional markups to all rates
UPDATE public.call_rates cr
SET 
  markup_percentage = rms.default_markup_percentage,
  landline_rate = ROUND(base_cost_landline * (1 + rms.default_markup_percentage / 100), 4),
  mobile_rate = ROUND(base_cost_mobile * (1 + rms.default_markup_percentage / 100), 4),
  updated_at = now()
FROM public.regional_markup_settings rms
WHERE cr.region = rms.region
  AND cr.base_cost_mobile > 0;