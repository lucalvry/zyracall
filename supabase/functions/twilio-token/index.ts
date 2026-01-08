import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Twilio Access Token generation using JWT
function base64url(input: string): string {
  return btoa(input)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function createHmacSignature(key: ArrayBuffer, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(data));
  return base64url(String.fromCharCode(...new Uint8Array(signature)));
}

async function generateTwilioAccessToken(
  accountSid: string,
  apiKeySid: string,
  apiKeySecret: string,
  identity: string,
  twimlAppSid: string
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const expiry = now + 3600; // 1 hour

  const header = {
    typ: 'JWT',
    alg: 'HS256',
    cty: 'twilio-fpa;v=1'
  };

  const grants: Record<string, unknown> = {
    identity: identity,
    voice: {
      outgoing: {
        application_sid: twimlAppSid
      },
      incoming: {
        allow: true
      }
    }
  };

  const payload = {
    jti: `${apiKeySid}-${now}`,
    iss: apiKeySid,
    sub: accountSid,
    iat: now,
    exp: expiry,
    grants: grants
  };

  const headerB64 = base64url(JSON.stringify(header));
  const payloadB64 = base64url(JSON.stringify(payload));
  const signatureInput = `${headerB64}.${payloadB64}`;
  
  const encoder = new TextEncoder();
  const keyBuffer = encoder.encode(apiKeySecret).buffer as ArrayBuffer;
  const signature = await createHmacSignature(keyBuffer, signatureInput);
  
  return `${signatureInput}.${signature}`;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const apiKeySid = Deno.env.get('TWILIO_API_KEY_SID');
    const apiKeySecret = Deno.env.get('TWILIO_API_KEY_SECRET');
    const twimlAppSid = Deno.env.get('TWILIO_TWIML_APP_SID');

    // Check for missing configuration
    const missingConfig: string[] = [];
    if (!accountSid) missingConfig.push('TWILIO_ACCOUNT_SID');
    if (!authToken) missingConfig.push('TWILIO_AUTH_TOKEN');
    if (!apiKeySid) missingConfig.push('TWILIO_API_KEY_SID');
    if (!apiKeySecret) missingConfig.push('TWILIO_API_KEY_SECRET');
    if (!twimlAppSid) missingConfig.push('TWILIO_TWIML_APP_SID');

    if (missingConfig.length > 0) {
      console.error('Missing Twilio configuration:', missingConfig.join(', '));
      throw new Error(`Missing Twilio secrets: ${missingConfig.join(', ')}`);
    }

    // Validate credentials using Auth Token (API Keys can't auth to account endpoint)
    console.log('Validating Twilio account credentials...');
    const twilioAuth = btoa(`${accountSid}:${authToken}`);
    const validationResponse = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}.json`,
      {
        headers: {
          'Authorization': `Basic ${twilioAuth}`
        }
      }
    );

    if (!validationResponse.ok) {
      const errorText = await validationResponse.text();
      console.error('Twilio account validation failed:', validationResponse.status, errorText);
      if (validationResponse.status === 401) {
        throw new Error('Invalid TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN');
      }
      throw new Error(`Twilio API validation failed: ${validationResponse.status}`);
    }

    console.log('Twilio account credentials validated successfully');

    // Validate TwiML App exists (using auth token)
    console.log('Validating TwiML App SID...');
    const twimlAppResponse = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Applications/${twimlAppSid}.json`,
      {
        headers: {
          'Authorization': `Basic ${twilioAuth}`
        }
      }
    );

    if (!twimlAppResponse.ok) {
      console.error('TwiML App validation failed:', twimlAppResponse.status);
      if (twimlAppResponse.status === 404) {
        throw new Error(`TwiML App not found: ${twimlAppSid}. Check TWILIO_TWIML_APP_SID.`);
      }
      throw new Error(`TwiML App validation failed: ${twimlAppResponse.status}`);
    }

    const twimlAppData = await twimlAppResponse.json();
    console.log('TwiML App validated:', twimlAppData.friendly_name, 'Voice URL:', twimlAppData.voice_url);

    // Get user identity from request body or auth header
    const { identity } = await req.json().catch(() => ({ identity: null }));
    
    // Extract user ID from authorization header if available
    const reqAuthHeader = req.headers.get('authorization');
    let userId = identity;
    
    if (reqAuthHeader && reqAuthHeader.startsWith('Bearer ')) {
      try {
        const token = reqAuthHeader.replace('Bearer ', '');
        const payload = JSON.parse(atob(token.split('.')[1]));
        userId = payload.sub || identity;
      } catch (e) {
        console.log('Could not parse auth token, using provided identity');
      }
    }

    if (!userId) {
      userId = `user-${Date.now()}`;
    }

    console.log(`Generating Twilio token for identity: ${userId}`);

    // Generate token using proper API Key credentials
    const token = await generateTwilioAccessToken(
      accountSid!,
      apiKeySid!,
      apiKeySecret!,
      userId,
      twimlAppSid!
    );

    console.log('Twilio access token generated successfully');

    return new Response(
      JSON.stringify({ token, identity: userId }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error generating Twilio token:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
