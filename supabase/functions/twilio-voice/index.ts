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
    const twilioPhoneNumber = Deno.env.get('TWILIO_PHONE_NUMBER');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!twilioPhoneNumber) {
      throw new Error('Missing TWILIO_PHONE_NUMBER');
    }

    // Parse form data from Twilio (application/x-www-form-urlencoded)
    const formData = await req.formData();
    const toNumber = formData.get('To') as string;
    const fromNumber = formData.get('From') as string;
    const callSid = formData.get('CallSid') as string;
    const userId = formData.get('userId') as string;
    const countryCode = formData.get('countryCode') as string;
    const countryName = formData.get('countryName') as string;
    const ratePerMinute = parseFloat(formData.get('ratePerMinute') as string || '0');
    const recordCall = formData.get('recordCall') === 'true';

    console.log('Twilio Voice webhook received:', {
      to: toNumber,
      from: fromNumber,
      callSid,
      userId,
      countryCode,
      countryName,
      ratePerMinute,
      recordCall
    });

    if (!toNumber) {
      // Return empty TwiML if no destination
      const emptyTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>No destination number provided.</Say>
  <Hangup/>
</Response>`;
      return new Response(emptyTwiml, {
        headers: { 'Content-Type': 'application/xml' }
      });
    }

    // Create call log entry in database
    if (supabaseUrl && supabaseServiceKey && userId) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      const { error: insertError } = await supabase
        .from('call_logs')
        .insert({
          user_id: userId,
          destination_number: toNumber,
          destination_country: countryName || 'Unknown',
          destination_country_code: countryCode || 'XX',
          rate_per_minute: ratePerMinute,
          status: 'initiated',
          twilio_call_sid: callSid,
          started_at: new Date().toISOString()
        });

      if (insertError) {
        console.error('Error creating call log:', insertError);
      } else {
        console.log('Call log created for CallSid:', callSid);
      }
    }

    // Get the base URL for status callback
    const baseUrl = `${supabaseUrl}/functions/v1`;

    // Generate TwiML to dial the PSTN number with optional recording
    const recordAttribute = recordCall ? 'record="record-from-answer-dual"' : '';
    const recordingStatusCallback = recordCall 
      ? `recordingStatusCallback="${baseUrl}/twilio-recording-callback" recordingStatusCallbackMethod="POST" recordingStatusCallbackEvent="completed"`
      : '';
    
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial callerId="${twilioPhoneNumber}" 
        answerOnBridge="true"
        ${recordAttribute}
        ${recordingStatusCallback}
        action="${baseUrl}/twilio-status-callback"
        statusCallback="${baseUrl}/twilio-status-callback"
        statusCallbackEvent="initiated ringing answered completed"
        statusCallbackMethod="POST">
    <Number statusCallback="${baseUrl}/twilio-status-callback"
            statusCallbackEvent="initiated ringing answered completed"
            statusCallbackMethod="POST">
      ${toNumber}
    </Number>
  </Dial>
</Response>`;

    console.log('Returning TwiML:', twiml);

    return new Response(twiml, {
      headers: { 'Content-Type': 'application/xml' }
    });

  } catch (error) {
    console.error('Error in twilio-voice:', error);
    
    const errorTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>An error occurred. Please try again.</Say>
  <Hangup/>
</Response>`;
    
    return new Response(errorTwiml, {
      headers: { 'Content-Type': 'application/xml' }
    });
  }
});
