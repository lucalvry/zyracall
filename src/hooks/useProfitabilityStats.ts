import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfMonth, endOfMonth, subMonths, format } from "date-fns";

export interface ProfitabilitySummary {
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  marginPercentage: number;
  totalCalls: number;
  avgProfitPerCall: number;
}

export interface DailyProfitData {
  date: string;
  revenue: number;
  cost: number;
  profit: number;
  calls: number;
}

export interface CountryProfitData {
  country: string;
  revenue: number;
  cost: number;
  profit: number;
  calls: number;
  margin: number;
}

export interface RegionProfitData {
  region: string;
  profit: number;
  percentage: number;
}

export const useProfitabilityStats = (dateRange: { start: Date; end: Date }) => {
  const startDate = format(dateRange.start, "yyyy-MM-dd");
  const endDate = format(dateRange.end, "yyyy-MM-dd");

  // Summary stats
  const summaryQuery = useQuery({
    queryKey: ["profitability-summary", startDate, endDate],
    queryFn: async (): Promise<ProfitabilitySummary> => {
      const { data, error } = await supabase
        .from("call_logs")
        .select("cost, provider_cost, profit")
        .gte("started_at", `${startDate}T00:00:00`)
        .lte("started_at", `${endDate}T23:59:59`);

      if (error) throw error;

      const totalRevenue = data?.reduce((sum, row) => sum + (row.cost || 0), 0) || 0;
      const totalCost = data?.reduce((sum, row) => sum + (row.provider_cost || 0), 0) || 0;
      const totalProfit = data?.reduce((sum, row) => sum + (row.profit || 0), 0) || 0;
      const totalCalls = data?.length || 0;

      return {
        totalRevenue,
        totalCost,
        totalProfit,
        marginPercentage: totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0,
        totalCalls,
        avgProfitPerCall: totalCalls > 0 ? totalProfit / totalCalls : 0,
      };
    },
  });

  // Daily trends
  const dailyTrendsQuery = useQuery({
    queryKey: ["profitability-daily", startDate, endDate],
    queryFn: async (): Promise<DailyProfitData[]> => {
      const { data, error } = await supabase
        .from("call_logs")
        .select("started_at, cost, provider_cost, profit")
        .gte("started_at", `${startDate}T00:00:00`)
        .lte("started_at", `${endDate}T23:59:59`)
        .order("started_at", { ascending: true });

      if (error) throw error;

      // Group by date
      const grouped: Record<string, DailyProfitData> = {};
      data?.forEach((row) => {
        const date = format(new Date(row.started_at), "yyyy-MM-dd");
        if (!grouped[date]) {
          grouped[date] = { date, revenue: 0, cost: 0, profit: 0, calls: 0 };
        }
        grouped[date].revenue += row.cost || 0;
        grouped[date].cost += row.provider_cost || 0;
        grouped[date].profit += row.profit || 0;
        grouped[date].calls += 1;
      });

      return Object.values(grouped).sort((a, b) => a.date.localeCompare(b.date));
    },
  });

  // Top countries by profit
  const topCountriesQuery = useQuery({
    queryKey: ["profitability-countries", startDate, endDate],
    queryFn: async (): Promise<CountryProfitData[]> => {
      const { data, error } = await supabase
        .from("call_logs")
        .select("destination_country, cost, provider_cost, profit")
        .gte("started_at", `${startDate}T00:00:00`)
        .lte("started_at", `${endDate}T23:59:59`);

      if (error) throw error;

      // Group by country
      const grouped: Record<string, CountryProfitData> = {};
      data?.forEach((row) => {
        const country = row.destination_country;
        if (!grouped[country]) {
          grouped[country] = { country, revenue: 0, cost: 0, profit: 0, calls: 0, margin: 0 };
        }
        grouped[country].revenue += row.cost || 0;
        grouped[country].cost += row.provider_cost || 0;
        grouped[country].profit += row.profit || 0;
        grouped[country].calls += 1;
      });

      // Calculate margin and sort
      return Object.values(grouped)
        .map((c) => ({
          ...c,
          margin: c.revenue > 0 ? (c.profit / c.revenue) * 100 : 0,
        }))
        .sort((a, b) => b.profit - a.profit)
        .slice(0, 10);
    },
  });

  // Low margin alerts
  const lowMarginQuery = useQuery({
    queryKey: ["profitability-low-margin", startDate, endDate],
    queryFn: async (): Promise<CountryProfitData[]> => {
      const { data, error } = await supabase
        .from("call_logs")
        .select("destination_country, cost, provider_cost, profit")
        .gte("started_at", `${startDate}T00:00:00`)
        .lte("started_at", `${endDate}T23:59:59`);

      if (error) throw error;

      // Group by country
      const grouped: Record<string, CountryProfitData> = {};
      data?.forEach((row) => {
        const country = row.destination_country;
        if (!grouped[country]) {
          grouped[country] = { country, revenue: 0, cost: 0, profit: 0, calls: 0, margin: 0 };
        }
        grouped[country].revenue += row.cost || 0;
        grouped[country].cost += row.provider_cost || 0;
        grouped[country].profit += row.profit || 0;
        grouped[country].calls += 1;
      });

      // Filter low margin (< 25%) with at least 5 calls
      return Object.values(grouped)
        .map((c) => ({
          ...c,
          margin: c.revenue > 0 ? (c.profit / c.revenue) * 100 : 0,
        }))
        .filter((c) => c.margin < 25 && c.calls >= 5)
        .sort((a, b) => a.margin - b.margin);
    },
  });

  return {
    summary: summaryQuery.data,
    dailyTrends: dailyTrendsQuery.data,
    topCountries: topCountriesQuery.data,
    lowMarginAlerts: lowMarginQuery.data,
    isLoading: summaryQuery.isLoading || dailyTrendsQuery.isLoading || topCountriesQuery.isLoading,
  };
};

export const useDefaultDateRange = () => {
  const now = new Date();
  return {
    start: startOfMonth(subMonths(now, 1)),
    end: endOfMonth(now),
  };
};
