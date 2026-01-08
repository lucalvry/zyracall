import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Search, Globe, Info, Loader2 } from "lucide-react";
import { useCallRates, getCountryFlag } from "@/hooks/useCallRates";

const Rates = () => {
  const [search, setSearch] = useState("");
  const { data: rates = [], isLoading, error } = useCallRates(search);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">Calling Rates</h1>
          <p className="text-muted-foreground">
            Transparent per-minute rates for all destinations
          </p>
        </div>

        {/* Info Banner */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20 mb-6">
          <Info className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm text-foreground">
              <strong>No hidden fees.</strong> Rates are charged per minute with per-second billing after the first minute.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by country or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 text-destructive">
            <p>Failed to load rates. Please try again.</p>
          </div>
        )}

        {/* Rates Table */}
        {!isLoading && !error && rates.length > 0 && (
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                      Country
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                      Code
                    </th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">
                      Mobile
                    </th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">
                      Landline
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rates.map((rate) => (
                    <tr key={rate.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{getCountryFlag(rate.country_name)}</span>
                          <span className="font-medium text-foreground">{rate.country_name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground font-mono">
                        {rate.country_code}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-foreground">
                        ${Number(rate.mobile_rate).toFixed(2)}/min
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-foreground">
                        ${Number(rate.landline_rate).toFixed(2)}/min
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!isLoading && !error && rates.length === 0 && (
          <div className="text-center py-12">
            <Globe className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No countries found</h3>
            <p className="text-muted-foreground">
              Try a different search term
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Rates;
