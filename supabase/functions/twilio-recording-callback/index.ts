import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase configuration');
    }

    if (!twilioAccountSid || !twilioAuthToken) {
      throw new Error('Missing Twilio credentials for recording download');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse form data from Twilio
    const formData = await req.formData();
    const recordingSid = formData.get('RecordingSid') as string;
    const recordingUrl = formData.get('RecordingUrl') as string;
    const callSid = formData.get('CallSid') as string;
    const recordingStatus = formData.get('RecordingStatus') as string;
    const recordingDuration = formData.get('RecordingDuration') as string;

    console.log('Recording callback received:', {
      recordingSid,
      recordingUrl,
      callSid,
      recordingStatus,
      recordingDuration
    });

    if (recordingStatus !== 'completed') {
      console.log('Recording not completed, skipping');
      return new Response('OK', { status: 200 });
    }

    // Find the call log by Twilio call SID
    const { data: callLog, error: fetchError } = await supabase
      .from('call_logs')
      .select('id, user_id')
      .eq('twilio_call_sid', callSid)
      .single();

    if (fetchError || !callLog) {
      console.log('Call log not found for CallSid:', callSid);
      return new Response('OK', { status: 200 });
    }

    // Download recording from Twilio
    const twilioAuth = btoa(`${twilioAccountSid}:${twilioAuthToken}`);
    const audioResponse = await fetch(`${recordingUrl}.mp3`, {
      headers: {
        'Authorization': `Basic ${twilioAuth}`
      }
    });

    if (!audioResponse.ok) {
      console.error('Failed to download recording:', audioResponse.status);
      return new Response('OK', { status: 200 });
    }

    const audioBlob = await audioResponse.blob();
    const audioBuffer = await audioBlob.arrayBuffer();

    // Upload to Supabase Storage
    const filePath = `${callLog.user_id}/${callLog.id}/${recordingSid}.mp3`;
    
    const { error: uploadError } = await supabase.storage
      .from('call-recordings')
      .upload(filePath, audioBuffer, {
        contentType: 'audio/mpeg',
        upsert: true
      });

    if (uploadError) {
      console.error('Error uploading recording:', uploadError);
      return new Response('OK', { status: 200 });
    }

    console.log('Recording uploaded to storage:', filePath);

    // Update call log with recording path
    const { error: updateError } = await supabase
      .from('call_logs')
      .update({ recording_url: filePath })
      .eq('id', callLog.id);

    if (updateError) {
      console.error('Error updating call log with recording:', updateError);
    } else {
      console.log('Call log updated with recording path');
    }

    return new Response('OK', { status: 200 });

  } catch (error) {
    console.error('Error in twilio-recording-callback:', error);
    return new Response('OK', { status: 200 });
  }
});
