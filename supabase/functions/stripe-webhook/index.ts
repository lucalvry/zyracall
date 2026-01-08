import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeKey) {
      throw new Error("Stripe secret key not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    let event: Stripe.Event;

    // Verify webhook signature if secret is configured
    if (webhookSecret && signature) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err: unknown) {
        const errMessage = err instanceof Error ? err.message : "Unknown error";
        console.error("Webhook signature verification failed:", errMessage);
        return new Response(
          JSON.stringify({ error: "Webhook signature verification failed" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    } else {
      // For development without webhook secret
      event = JSON.parse(body) as Stripe.Event;
    }

    console.log("Received Stripe event:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const userId = session.metadata?.user_id;
      const amountStr = session.metadata?.amount;
      const type = session.metadata?.type;

      if (type !== "wallet_topup" || !userId || !amountStr) {
        console.log("Not a wallet topup or missing metadata, skipping");
        return new Response(JSON.stringify({ received: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const amount = parseFloat(amountStr);

      console.log(`Processing wallet topup: user=${userId}, amount=${amount}`);

      // Get user's wallet
      const { data: wallet, error: walletError } = await supabase
        .from("wallets")
        .select("id, balance")
        .eq("user_id", userId)
        .single();

      if (walletError || !wallet) {
        console.error("Wallet not found:", walletError);
        throw new Error("Wallet not found");
      }

      // Update wallet balance
      const newBalance = parseFloat(wallet.balance) + amount;
      const { error: updateError } = await supabase
        .from("wallets")
        .update({ balance: newBalance })
        .eq("id", wallet.id);

      if (updateError) {
        console.error("Failed to update wallet:", updateError);
        throw new Error("Failed to update wallet balance");
      }

      // Create transaction record
      const { error: txError } = await supabase
        .from("transactions")
        .insert({
          user_id: userId,
          wallet_id: wallet.id,
          amount: amount,
          type: "credit",
          description: "Wallet top-up via Stripe",
          stripe_payment_id: session.payment_intent as string,
          status: "completed",
        });

      if (txError) {
        console.error("Failed to create transaction:", txError);
        // Don't throw - wallet was already updated
      }

      console.log(`Successfully topped up wallet for user ${userId}: +$${amount}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Webhook error:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
