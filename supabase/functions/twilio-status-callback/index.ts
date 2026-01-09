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

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase configuration');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse form data from Twilio
    const formData = await req.formData();
    const callSid = formData.get('CallSid') as string;
    const parentCallSid = formData.get('ParentCallSid') as string;
    const callStatus = formData.get('CallStatus') as string;
    const callDuration = parseInt(formData.get('CallDuration') as string || '0', 10);
    const recordingUrl = formData.get('RecordingUrl') as string;

    // Use parent call SID if available (for child leg), otherwise use CallSid
    const trackingCallSid = parentCallSid || callSid;

    console.log('Status callback received:', {
      callSid,
      parentCallSid,
      trackingCallSid,
      callStatus,
      callDuration,
      recordingUrl
    });

    // Find the call log by Twilio call SID
    const { data: callLog, error: fetchError } = await supabase
      .from('call_logs')
      .select('*')
      .eq('twilio_call_sid', trackingCallSid)
      .single();

    if (fetchError) {
      console.log('Call log not found for CallSid:', trackingCallSid);
      // Return 200 to acknowledge the webhook even if we can't find the call
      return new Response('OK', { status: 200 });
    }

    // Get the call rate for base cost calculation
    // First try by country name (most reliable), then fall back to dial code
    let rateData = null;
    
    const { data: rateByName } = await supabase
      .from('call_rates')
      .select('base_cost_mobile, base_cost_landline')
      .eq('country_name', callLog.destination_country)
      .maybeSingle();
    
    if (rateByName) {
      rateData = rateByName;
    } else {
      // Fall back to dial code lookup
      const { data: rateByCode } = await supabase
        .from('call_rates')
        .select('base_cost_mobile, base_cost_landline')
        .eq('country_code', callLog.destination_country_code)
        .maybeSingle();
      rateData = rateByCode;
    }
    
    console.log('Rate lookup result:', { 
      country: callLog.destination_country, 
      dialCode: callLog.destination_country_code,
      rateData 
    });

    // Map Twilio status to our status
    const statusMap: Record<string, string> = {
      'initiated': 'initiated',
      'ringing': 'ringing',
      'in-progress': 'in-progress',
      'answered': 'in-progress',
      'completed': 'completed',
      'busy': 'failed',
      'no-answer': 'failed',
      'canceled': 'cancelled',
      'failed': 'failed'
    };

    const mappedStatus = statusMap[callStatus] || callStatus;
    const isCallEnded = ['completed', 'busy', 'no-answer', 'canceled', 'failed'].includes(callStatus);

    // Calculate cost and profit if call is completed
    let cost = 0;
    let providerCost = 0;
    let profit = 0;

    if (isCallEnded && callDuration > 0) {
      // Calculate cost based on duration and rate
      const durationMinutes = Math.ceil(callDuration / 60);
      cost = durationMinutes * callLog.rate_per_minute;
      
      // Calculate provider cost (use mobile rate as default)
      // In production, you'd determine mobile vs landline based on number type
      const baseCost = Number(rateData?.base_cost_mobile) || 0;
      providerCost = durationMinutes * baseCost;
      
      // Calculate profit
      profit = cost - providerCost;
      
      console.log('Cost calculation:', {
        durationMinutes,
        customerRate: callLog.rate_per_minute,
        baseCost,
        cost,
        providerCost,
        profit
      });
    }

    // Update call log
    const updateData: Record<string, unknown> = {
      status: mappedStatus,
      duration_seconds: callDuration,
      cost: cost,
      provider_cost: providerCost,
      profit: profit
    };

    if (isCallEnded) {
      updateData.ended_at = new Date().toISOString();
    }

    if (recordingUrl) {
      updateData.recording_url = recordingUrl;
    }

    const { error: updateError } = await supabase
      .from('call_logs')
      .update(updateData)
      .eq('id', callLog.id);

    if (updateError) {
      console.error('Error updating call log:', updateError);
    } else {
      console.log('Call log updated:', { id: callLog.id, status: mappedStatus, cost, providerCost, profit });
    }

    // Deduct from wallet if call completed with cost
    if (isCallEnded && cost > 0) {
      // Get current wallet balance
      const { data: wallet, error: walletFetchError } = await supabase
        .from('wallets')
        .select('id, balance, user_id')
        .eq('user_id', callLog.user_id)
        .single();

      if (walletFetchError) {
        console.error('Error fetching wallet:', walletFetchError);
      } else if (wallet) {
        const newBalance = Math.max(0, wallet.balance - cost);

        // Update wallet balance
        const { error: walletError } = await supabase
          .from('wallets')
          .update({ balance: newBalance, updated_at: new Date().toISOString() })
          .eq('id', wallet.id);

        if (walletError) {
          console.error('Error updating wallet:', walletError);
        } else {
          console.log('Wallet updated:', { walletId: wallet.id, oldBalance: wallet.balance, newBalance, deducted: cost });
        }

        // Create transaction record
        const { error: transactionError } = await supabase
          .from('transactions')
          .insert({
            user_id: callLog.user_id,
            wallet_id: wallet.id,
            amount: -cost,
            type: 'debit',
            description: `Call to ${callLog.destination_number} (${callLog.destination_country})`,
            status: 'completed'
          });

        if (transactionError) {
          console.error('Error creating transaction:', transactionError);
        } else {
          console.log('Transaction created for call cost');
        }
      }
    }

    // Return empty TwiML response (Twilio expects this)
    return new Response('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', {
      headers: { 'Content-Type': 'application/xml' }
    });

  } catch (error) {
    console.error('Error in twilio-status-callback:', error);
    return new Response('OK', { status: 200 });
  }
});