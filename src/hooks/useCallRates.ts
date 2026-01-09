import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CallRate {
  id: string;
  country_code: string;
  country_name: string;
  landline_rate: number;
  mobile_rate: number;
  currency: string;
  is_active: boolean;
}

// Country flag mapping based on country name
const countryFlags: Record<string, string> = {
  "United States": "🇺🇸",
  "Canada": "🇨🇦",
  "United Kingdom": "🇬🇧",
  "Germany": "🇩🇪",
  "France": "🇫🇷",
  "Australia": "🇦🇺",
  "Japan": "🇯🇵",
  "China": "🇨🇳",
  "India": "🇮🇳",
  "Brazil": "🇧🇷",
  "Mexico": "🇲🇽",
  "Spain": "🇪🇸",
  "Italy": "🇮🇹",
  "Netherlands": "🇳🇱",
  "South Korea": "🇰🇷",
  "Singapore": "🇸🇬",
  "Hong Kong": "🇭🇰",
  "United Arab Emirates": "🇦🇪",
  "Saudi Arabia": "🇸🇦",
  "South Africa": "🇿🇦",
  "Russia": "🇷🇺",
  "Poland": "🇵🇱",
  "Sweden": "🇸🇪",
  "Norway": "🇳🇴",
  "Denmark": "🇩🇰",
  "Finland": "🇫🇮",
  "Austria": "🇦🇹",
  "Switzerland": "🇨🇭",
  "Belgium": "🇧🇪",
  "Portugal": "🇵🇹",
  "Greece": "🇬🇷",
  "Ireland": "🇮🇪",
  "New Zealand": "🇳🇿",
  "Philippines": "🇵🇭",
  "Malaysia": "🇲🇾",
  "Thailand": "🇹🇭",
  "Vietnam": "🇻🇳",
  "Indonesia": "🇮🇩",
  "Pakistan": "🇵🇰",
  "Bangladesh": "🇧🇩",
};

export const getCountryFlag = (countryName: string): string => {
  return countryFlags[countryName] || "🌍";
};

export const useCallRates = (search?: string) => {
  return useQuery({
    queryKey: ["call-rates", search],
    queryFn: async (): Promise<CallRate[]> => {
      let query = supabase
        .from("call_rates")
        .select("*")
        .eq("is_active", true)
        .order("country_name");

      if (search) {
        query = query.or(`country_name.ilike.%${search}%,country_code.ilike.%${search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      return (data || []) as CallRate[];
    },
  });
};

export const useRateByCountry = (countryCode: string) => {
  return useQuery({
    queryKey: ["call-rate", countryCode],
    queryFn: async (): Promise<CallRate | null> => {
      if (!countryCode) return null;

      const { data, error } = await supabase
        .from("call_rates")
        .select("*")
        .eq("country_code", countryCode)
        .eq("is_active", true)
        .limit(1)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return data as CallRate | null;
    },
    enabled: !!countryCode,
  });
};

export const useRateByCountryName = (countryName: string) => {
  return useQuery({
    queryKey: ["call-rate-name", countryName],
    queryFn: async (): Promise<CallRate | null> => {
      if (!countryName) return null;

      const { data, error } = await supabase
        .from("call_rates")
        .select("*")
        .eq("country_name", countryName)
        .eq("is_active", true)
        .limit(1)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return data as CallRate | null;
    },
    enabled: !!countryName,
  });
};
