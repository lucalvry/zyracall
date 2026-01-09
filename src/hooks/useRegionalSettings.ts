import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface RegionalSetting {
  id: string;
  region: string;
  default_markup_percentage: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Region icons/emojis for display
export const regionIcons: Record<string, string> = {
  "Africa": "🌍",
  "South Asia": "🇮🇳",
  "Southeast Asia": "🌴",
  "East Asia": "🏯",
  "Middle East": "🕌",
  "Europe": "🇪🇺",
  "North America": "🇺🇸",
  "Latin America": "🌎",
  "Caribbean": "🏝️",
  "Oceania": "🦘",
  "Other": "🌐",
};

// Region colors for display
export const regionColors: Record<string, string> = {
  "Africa": "bg-amber-500/10 text-amber-500 border-amber-500/20",
  "South Asia": "bg-orange-500/10 text-orange-500 border-orange-500/20",
  "Southeast Asia": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  "East Asia": "bg-red-500/10 text-red-500 border-red-500/20",
  "Middle East": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  "Europe": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "North America": "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  "Latin America": "bg-green-500/10 text-green-500 border-green-500/20",
  "Caribbean": "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  "Oceania": "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "Other": "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

export const useRegionalSettings = () => {
  return useQuery({
    queryKey: ["regional-settings"],
    queryFn: async (): Promise<RegionalSetting[]> => {
      const { data, error } = await supabase
        .from("regional_markup_settings")
        .select("*")
        .order("region");

      if (error) throw error;
      return (data || []) as RegionalSetting[];
    },
  });
};

export const useUpdateRegionalSetting = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      default_markup_percentage,
    }: {
      id: string;
      default_markup_percentage: number;
    }) => {
      const { error } = await supabase
        .from("regional_markup_settings")
        .update({ default_markup_percentage })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["regional-settings"] });
      toast({
        title: "Regional markup updated",
        description: "The default markup for this region has been updated",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useApplyRegionalMarkups = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (region?: string) => {
      // First get the regional settings
      const { data: settings, error: settingsError } = await supabase
        .from("regional_markup_settings")
        .select("region, default_markup_percentage");

      if (settingsError) throw settingsError;

      // Create a map of region to markup
      const markupMap = new Map(
        settings?.map((s) => [s.region, s.default_markup_percentage]) || []
      );

      // Get all rates to update
      let query = supabase.from("call_rates").select("id, region, base_cost_mobile, base_cost_landline");
      if (region) {
        query = query.eq("region", region);
      }

      const { data: rates, error: ratesError } = await query;
      if (ratesError) throw ratesError;

      // Update each rate with the regional markup
      let updated = 0;
      for (const rate of rates || []) {
        const markup = markupMap.get(rate.region) || 40;
        const mobileRate = Number(rate.base_cost_mobile) * (1 + markup / 100);
        const landlineRate = Number(rate.base_cost_landline) * (1 + markup / 100);

        const { error } = await supabase
          .from("call_rates")
          .update({
            markup_percentage: markup,
            mobile_rate: Math.round(mobileRate * 10000) / 10000,
            landline_rate: Math.round(landlineRate * 10000) / 10000,
          })
          .eq("id", rate.id);

        if (!error) updated++;
      }

      return { updated, total: rates?.length || 0 };
    },
    onSuccess: (data, region) => {
      queryClient.invalidateQueries({ queryKey: ["admin-rates"] });
      queryClient.invalidateQueries({ queryKey: ["call-rates"] });
      toast({
        title: "Regional markups applied",
        description: `Updated ${data.updated} of ${data.total} countries${region ? ` in ${region}` : ""}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useRegionStats = () => {
  return useQuery({
    queryKey: ["region-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("call_rates")
        .select("region, is_active");

      if (error) throw error;

      // Group by region and count
      const stats = new Map<string, { total: number; active: number }>();
      
      for (const rate of data || []) {
        const region = rate.region || "Other";
        const current = stats.get(region) || { total: 0, active: 0 };
        current.total++;
        if (rate.is_active) current.active++;
        stats.set(region, current);
      }

      return Object.fromEntries(stats);
    },
  });
};
