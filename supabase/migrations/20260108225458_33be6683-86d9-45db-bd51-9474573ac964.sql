-- Normalize dial codes: remove leading '+' from country_code in call_rates
UPDATE call_rates 
SET country_code = LTRIM(country_code, '+')
WHERE country_code LIKE '+%';

-- Also normalize speed_dials country_code
UPDATE speed_dials 
SET country_code = LTRIM(country_code, '+')
WHERE country_code LIKE '+%';