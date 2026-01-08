import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  userId: string;
  type: string;
  title: string;
  message: string;
  notificationId?: string;
}

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

async function sendEmailViaResend(to: string, subject: string, html: string): Promise<{ success: boolean; data?: unknown; error?: string }> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ZyraCall <onboarding@resend.dev>",
        to: [to],
        subject,
        html,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return { success: false, error: data.message || "Failed to send email" };
    }
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, type, title, message }: NotificationRequest = await req.json();

    if (!userId || !type || !title || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Processing notification for user ${userId}, type: ${type}`);

    // Fetch user profile and preferences
    const [profileResult, prefsResult] = await Promise.all([
      supabase.from("profiles").select("email, phone_number").eq("id", userId).single(),
      supabase.from("notification_preferences").select("*").eq("user_id", userId).maybeSingle()
    ]);

    if (profileResult.error) {
      console.error("Error fetching profile:", profileResult.error);
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const profile = profileResult.data;
    const prefs = prefsResult.data || {
      email_notifications: true,
      sms_notifications: false,
      call_summary_emails: true,
      marketing_emails: false,
    };

    const results: { email?: unknown; sms?: unknown } = {};

    // Determine if we should send based on notification type
    const shouldSendEmail = prefs.email_notifications && profile.email && (
      type === "low_balance" ||
      type === "payment_received" ||
      (type === "call_completed" && prefs.call_summary_emails) ||
      (type === "marketing" && prefs.marketing_emails)
    );

    const shouldSendSms = prefs.sms_notifications && profile.phone_number && (
      type === "low_balance" ||
      type === "payment_received"
    );

    // Send email if enabled
    if (shouldSendEmail) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">ZyraCall</h1>
          </div>
          <div style="background: #f9fafb; padding: 24px; border-radius: 0 0 12px 12px;">
            <h2 style="color: #1f2937; margin: 0 0 16px 0;">${title}</h2>
            <p style="color: #4b5563; line-height: 1.6; margin: 0 0 24px 0;">${message}</p>
            <a href="https://zyracall.app/dashboard" style="display: inline-block; background: #6366f1; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;">
              Open Dashboard
            </a>
          </div>
          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 16px;">
            You received this email because you have notifications enabled in your ZyraCall account.
          </p>
        </div>
      `;
      
      const emailResult = await sendEmailViaResend(profile.email, title, emailHtml);
      results.email = emailResult;
      console.log("Email result:", emailResult);
    }

    // Send SMS if enabled
    if (shouldSendSms) {
      try {
        const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
        const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN");
        const twilioPhoneNumber = Deno.env.get("TWILIO_PHONE_NUMBER");

        if (twilioAccountSid && twilioAuthToken && twilioPhoneNumber) {
          const smsResponse = await fetch(
            `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
            {
              method: "POST",
              headers: {
                "Authorization": `Basic ${btoa(`${twilioAccountSid}:${twilioAuthToken}`)}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                From: twilioPhoneNumber,
                To: profile.phone_number,
                Body: `ZyraCall: ${title}\n\n${message}`,
              }),
            }
          );

          const smsResult = await smsResponse.json();
          results.sms = smsResult;
          console.log("SMS sent successfully:", smsResult);
        }
      } catch (smsError) {
        console.error("Error sending SMS:", smsError);
        results.sms = { error: smsError instanceof Error ? smsError.message : "Unknown error" };
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        results,
        emailSent: shouldSendEmail,
        smsSent: shouldSendSms
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in send-notification:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
