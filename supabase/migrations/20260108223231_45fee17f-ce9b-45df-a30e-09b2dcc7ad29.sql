-- Add sync tracking columns to call_rates
ALTER TABLE call_rates 
ADD COLUMN IF NOT EXISTS twilio_base_price_mobile DECIMAL(10,6),
ADD COLUMN IF NOT EXISTS twilio_base_price_landline DECIMAL(10,6),
ADD COLUMN IF NOT EXISTS last_synced_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS sync_source TEXT DEFAULT 'manual';

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_call_rates_country_code ON call_rates(country_code);
CREATE INDEX IF NOT EXISTS idx_call_rates_sync_source ON call_rates(sync_source);