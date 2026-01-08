import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

interface Transaction {
  id: string;
  user_id: string;
  wallet_id: string;
  amount: number;
  type: "credit" | "debit" | "refund";
  description: string | null;
  stripe_payment_id: string | null;
  status: "pending" | "completed" | "failed";
  created_at: string;
}

export const useWallet = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["wallet", user?.id],
    queryFn: async (): Promise<Wallet | null> => {
      if (!user) return null;

      const { data, error } = await supabase
        .from("wallets")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // No wallet found - this shouldn't happen due to trigger but handle it
          return null;
        }
        throw error;
      }

      return data as Wallet;
    },
    enabled: !!user,
  });
};

export const useTransactions = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["transactions", user?.id],
    queryFn: async (): Promise<Transaction[]> => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;

      return (data || []) as Transaction[];
    },
    enabled: !!user,
  });
};

export const useCreateCheckoutSession = () => {
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (amount: number) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: { amount, userId: user.id },
      });

      if (error) throw error;
      return data as { url: string };
    },
  });
};
