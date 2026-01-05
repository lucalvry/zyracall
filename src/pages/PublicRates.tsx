import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Globe, Info } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

interface CountryRate {
  country: string;
  code: string;
  flag: string;
  mobile: number;
  landline: number;
}

// Mock rates data
const mockRates: CountryRate[] = [
  { country: "United States", code: "+1", flag: "🇺🇸", mobile: 0.02, landline: 0.01 },
  { country: "United Kingdom", code: "+44", flag: "🇬🇧", mobile: 0.03, landline: 0.02 },
  { country: "Germany", code: "+49", flag: "🇩🇪", mobile: 0.04, landline: 0.02 },
  { country: "France", code: "+33", flag: "🇫🇷", mobile: 0.04, landline: 0.02 },
  { country: "Canada", code: "+1", flag: "🇨🇦", mobile: 0.02, landline: 0.01 },
  { country: "Australia", code: "+61", flag: "🇦🇺", mobile: 0.05, landline: 0.03 },
  { country: "Japan", code: "+81", flag: "🇯🇵", mobile: 0.06, landline: 0.04 },
  { country: "China", code: "+86", flag: "🇨🇳", mobile: 0.03, landline: 0.02 },
  { country: "India", code: "+91", flag: "🇮🇳", mobile: 0.02, landline: 0.01 },
  { country: "Brazil", code: "+55", flag: "🇧🇷", mobile: 0.08, landline: 0.04 },
  { country: "Mexico", code: "+52", flag: "🇲🇽", mobile: 0.05, landline: 0.03 },
  { country: "Spain", code: "+34", flag: "🇪🇸", mobile: 0.04, landline: 0.02 },
  { country: "Italy", code: "+39", flag: "🇮🇹", mobile: 0.05, landline: 0.02 },
  { country: "Netherlands", code: "+31", flag: "🇳🇱", mobile: 0.04, landline: 0.02 },
  { country: "South Korea", code: "+82", flag: "🇰🇷", mobile: 0.05, landline: 0.03 },
];

const PublicRates = () => {
  const [search, setSearch] = useState("");
  const [rates] = useState<CountryRate[]>(mockRates);

  const filteredRates = rates.filter(
    (rate) =>
      rate.country.toLowerCase().includes(search.toLowerCase()) ||
      rate.code.includes(search)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Global Calling Rates
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparent, pay-as-you-go pricing. No hidden fees, no subscriptions.
            </p>
          </div>

          {/* Info Banner */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20 mb-6 max-w-3xl mx-auto">
            <Info className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-foreground">
                <strong>Simple billing.</strong> Per-minute rates with per-second billing after the first minute. What you see is what you pay.
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6 max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by country or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Rates Table */}
          <div className="max-w-3xl mx-auto rounded-xl border border-border overflow-hidden">
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
                  {filteredRates.map((rate) => (
                    <tr key={rate.country} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{rate.flag}</span>
                          <span className="font-medium text-foreground">{rate.country}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground font-mono">
                        {rate.code}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-foreground">
                        ${rate.mobile.toFixed(2)}/min
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-foreground">
                        ${rate.landline.toFixed(2)}/min
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredRates.length === 0 && (
            <div className="text-center py-12">
              <Globe className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No countries found</h3>
              <p className="text-muted-foreground">
                Try a different search term
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PublicRates;
