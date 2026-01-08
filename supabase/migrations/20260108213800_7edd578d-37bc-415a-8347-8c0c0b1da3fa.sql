-- Add profit margin tracking columns to call_rates
ALTER TABLE public.call_rates
ADD COLUMN base_cost_mobile numeric NOT NULL DEFAULT 0,
ADD COLUMN base_cost_landline numeric NOT NULL DEFAULT 0,
ADD COLUMN markup_percentage numeric NOT NULL DEFAULT 50,
ADD COLUMN provider text NOT NULL DEFAULT 'twilio',
ADD COLUMN fallback_provider text;

-- Add profit tracking columns to call_logs
ALTER TABLE public.call_logs
ADD COLUMN provider_cost numeric NOT NULL DEFAULT 0,
ADD COLUMN profit numeric NOT NULL DEFAULT 0;

-- Add comment for clarity
COMMENT ON COLUMN public.call_rates.base_cost_mobile IS 'Provider cost per minute for mobile calls';
COMMENT ON COLUMN public.call_rates.base_cost_landline IS 'Provider cost per minute for landline calls';
COMMENT ON COLUMN public.call_rates.markup_percentage IS 'Profit margin percentage applied to base costs';
COMMENT ON COLUMN public.call_logs.provider_cost IS 'Actual cost paid to provider for this call';
COMMENT ON COLUMN public.call_logs.profit IS 'Profit earned (customer charge - provider cost)';