import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("Stripe secret key not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    const { amount, userId } = await req.json();

    if (!amount || amount < 5) {
      throw new Error("Minimum top-up amount is $5");
    }

    if (!userId) {
      throw new Error("User ID is required");
    }

    // Get user email from Supabase
    const { data: userData, error: userError } = await supabase.auth.admin.getUserById(userId);
    if (userError || !userData.user) {
      throw new Error("User not found");
    }

    const email = userData.user.email;

    // Check if customer already exists in Stripe
    let customerId: string | undefined;
    if (email) {
      const existingCustomers = await stripe.customers.list({ email, limit: 1 });
      if (existingCustomers.data.length > 0) {
        customerId = existingCustomers.data[0].id;
      }
    }

    // Create or use existing customer
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: email || undefined,
        metadata: { supabase_user_id: userId },
      });
      customerId = customer.id;
    }

    // Get the origin for redirect URLs
    const origin = req.headers.get("origin") || "https://rixpasynhccgkoumpaan.lovableproject.com";

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "ZyraCall Wallet Top-Up",
              description: `Add $${amount.toFixed(2)} to your ZyraCall wallet`,
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/dashboard/wallet?success=true`,
      cancel_url: `${origin}/dashboard/wallet?canceled=true`,
      metadata: {
        user_id: userId,
        amount: amount.toString(),
        type: "wallet_topup",
      },
    });

    console.log("Checkout session created:", session.id);

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating checkout session:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
