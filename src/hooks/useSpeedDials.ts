import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface SpeedDial {
  id: string;
  user_id: string;
  name: string;
  phone_number: string;
  country_code: string;
  country_name: string | null;
  created_at: string;
  updated_at: string;
}

interface CreateSpeedDialInput {
  name: string;
  phone_number: string;
  country_code: string;
  country_name?: string;
}

interface UpdateSpeedDialInput {
  id: string;
  name?: string;
  phone_number?: string;
  country_code?: string;
  country_name?: string;
}

export const useSpeedDials = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["speed-dials", user?.id],
    queryFn: async (): Promise<SpeedDial[]> => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("speed_dials")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (data || []) as SpeedDial[];
    },
    enabled: !!user,
  });
};

export const useCreateSpeedDial = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateSpeedDialInput) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("speed_dials")
        .insert({
          user_id: user.id,
          name: input.name,
          phone_number: input.phone_number,
          country_code: input.country_code,
          country_name: input.country_name || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data as SpeedDial;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["speed-dials"] });
    },
  });
};

export const useUpdateSpeedDial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateSpeedDialInput) => {
      const { id, ...updates } = input;

      const { data, error } = await supabase
        .from("speed_dials")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as SpeedDial;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["speed-dials"] });
    },
  });
};

export const useDeleteSpeedDial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("speed_dials")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["speed-dials"] });
    },
  });
};
