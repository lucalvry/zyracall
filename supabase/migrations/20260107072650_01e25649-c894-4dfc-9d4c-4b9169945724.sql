-- Create storage bucket for call recordings
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('call-recordings', 'call-recordings', false, 52428800, ARRAY['audio/mpeg', 'audio/wav', 'audio/webm', 'audio/ogg']);

-- Policy: Users can view their own recordings
CREATE POLICY "Users can view their own recordings"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'call-recordings' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Users can upload their own recordings
CREATE POLICY "Users can upload their own recordings"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'call-recordings' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Users can delete their own recordings
CREATE POLICY "Users can delete their own recordings"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'call-recordings' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Admins can view all recordings
CREATE POLICY "Admins can view all recordings"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'call-recordings' 
  AND public.has_role(auth.uid(), 'admin'::app_role)
);