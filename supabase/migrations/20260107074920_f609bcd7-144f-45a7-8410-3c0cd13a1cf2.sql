-- Enable realtime for wallets
ALTER TABLE wallets REPLICA IDENTITY FULL;

-- Enable realtime for call_logs
ALTER TABLE call_logs REPLICA IDENTITY FULL;

-- Enable realtime for transactions
ALTER TABLE transactions REPLICA IDENTITY FULL;

-- Add twilio_call_sid column to call_logs for tracking active calls
ALTER TABLE call_logs ADD COLUMN IF NOT EXISTS twilio_call_sid TEXT;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE wallets;
ALTER PUBLICATION supabase_realtime ADD TABLE call_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE transactions;