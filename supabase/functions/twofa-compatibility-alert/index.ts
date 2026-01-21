import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

async function sendEmail(to: string, subject: string, html: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "ZyraCall <notifications@zyracall.com>",
      to: [to],
      subject,
      html,
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send email: ${error}`);
  }
  
  return response.json();
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface CompatibilityChange {
  platformId: string;
  platformName: string;
  countryCode: string;
  countryName: string;
  changes: {
    numberType: string;
    oldScore: string;
    newScore: string;
  }[];
}

interface AlertRequest {
  change: CompatibilityChange;
}

const getScoreLabel = (rate: number): string => {
  if (rate >= 80) return "High";
  if (rate >= 50) return "Medium";
  if (rate >= 20) return "Low";
  return "Blocked";
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { change }: AlertRequest = await req.json();

    // Find users who have bookmarked this platform/country
    let query = supabase
      .from("platform_bookmarks")
      .select("user_id")
      .eq("platform_id", change.platformId)
      .eq("notify_on_change", true);

    // If country-specific, filter by country
    if (change.countryCode) {
      query = query.or(`country_code.eq.${change.countryCode},country_code.eq.`);
    }

    const { data: bookmarks, error: bookmarkError } = await query;

    if (bookmarkError) {
      console.error("Error fetching bookmarks:", bookmarkError);
      throw bookmarkError;
    }

    if (!bookmarks || bookmarks.length === 0) {
      console.log("No users to notify");
      return new Response(JSON.stringify({ notified: 0 }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Get unique user IDs
    const userIds = [...new Set(bookmarks.map((b) => b.user_id))];

    // Get user emails from profiles
    const { data: profiles, error: profileError } = await supabase
      .from("profiles")
      .select("id, email, display_name")
      .in("id", userIds);

    if (profileError) {
      console.error("Error fetching profiles:", profileError);
      throw profileError;
    }

    // Send emails to each user
    let sentCount = 0;
    for (const profile of profiles || []) {
      if (!profile.email) continue;

      const changesHtml = change.changes
        .map(
          (c) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${c.numberType}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">${c.oldScore}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">→</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${c.newScore}</td>
        </tr>
      `
        )
        .join("");

      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">2FA Compatibility Update</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 24px; border: 1px solid #e9ecef; border-top: none; border-radius: 0 0 12px 12px;">
            <p>Hi ${profile.display_name || "there"},</p>
            
            <p>The 2FA compatibility for <strong>${change.platformName}</strong> in <strong>${change.countryName}</strong> has changed:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: white; border-radius: 8px; overflow: hidden;">
              <thead>
                <tr style="background: #f1f3f5;">
                  <th style="padding: 12px; text-align: left;">Type</th>
                  <th style="padding: 12px; text-align: left;">Was</th>
                  <th style="padding: 12px;"></th>
                  <th style="padding: 12px; text-align: left;">Now</th>
                </tr>
              </thead>
              <tbody>
                ${changesHtml}
              </tbody>
            </table>
            
            <p style="color: #666;">This may affect your verification options for ${change.platformName}.</p>
            
            <div style="margin-top: 24px;">
              <a href="https://zyracall.com/tools/2fa-finder/${change.platformId}" 
                 style="display: inline-block; background: #6366f1; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;">
                View Updated Data
              </a>
              <a href="https://zyracall.com/settings" 
                 style="display: inline-block; color: #6366f1; padding: 12px 24px; text-decoration: none;">
                Manage Bookmarks
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e9ecef; margin: 24px 0;">
            
            <p style="color: #888; font-size: 12px;">
              You're receiving this because you bookmarked ${change.platformName} on ZyraCall. 
              <a href="https://zyracall.com/settings" style="color: #6366f1;">Unsubscribe</a>
            </p>
          </div>
        </body>
        </html>
      `;

      try {
        await sendEmail(
          profile.email,
          `2FA Update: ${change.platformName} compatibility changed for ${change.countryName}`,
          emailHtml
        );
        sentCount++;
        console.log(`Email sent to ${profile.email}`);
      } catch (emailError) {
        console.error(`Failed to send email to ${profile.email}:`, emailError);
      }
    }

    console.log(`Notification complete: ${sentCount} emails sent`);

    return new Response(JSON.stringify({ notified: sentCount }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in 2fa-compatibility-alert function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
