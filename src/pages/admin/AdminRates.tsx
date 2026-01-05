import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus,
  MoreVertical,
  Pencil,
  Power,
  PowerOff,
  Save,
  X
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface CountryRate {
  id: string;
  country: string;
  code: string;
  flag: string;
  baseCostMobile: number;
  baseCostLandline: number;
  markupMobile: number;
  markupLandline: number;
  primaryProvider: string;
  fallbackProvider: string;
  enabled: boolean;
}

const mockCountryRates: CountryRate[] = [
  { id: "1", country: "United States", code: "+1", flag: "🇺🇸", baseCostMobile: 0.015, baseCostLandline: 0.008, markupMobile: 33, markupLandline: 25, primaryProvider: "Twilio", fallbackProvider: "Telnyx", enabled: true },
  { id: "2", country: "United Kingdom", code: "+44", flag: "🇬🇧", baseCostMobile: 0.022, baseCostLandline: 0.015, markupMobile: 36, markupLandline: 33, primaryProvider: "Telnyx", fallbackProvider: "Vonage", enabled: true },
  { id: "3", country: "Germany", code: "+49", flag: "🇩🇪", baseCostMobile: 0.028, baseCostLandline: 0.014, markupMobile: 43, markupLandline: 43, primaryProvider: "Twilio", fallbackProvider: "Telnyx", enabled: true },
  { id: "4", country: "France", code: "+33", flag: "🇫🇷", baseCostMobile: 0.028, baseCostLandline: 0.014, markupMobile: 43, markupLandline: 43, primaryProvider: "Vonage", fallbackProvider: "Twilio", enabled: true },
  { id: "5", country: "Nigeria", code: "+234", flag: "🇳🇬", baseCostMobile: 0.12, baseCostLandline: 0.08, markupMobile: 50, markupLandline: 50, primaryProvider: "Twilio", fallbackProvider: "Telnyx", enabled: false },
  { id: "6", country: "Japan", code: "+81", flag: "🇯🇵", baseCostMobile: 0.045, baseCostLandline: 0.03, markupMobile: 33, markupLandline: 33, primaryProvider: "Twilio", fallbackProvider: "Vonage", enabled: true },
  { id: "7", country: "Australia", code: "+61", flag: "🇦🇺", baseCostMobile: 0.038, baseCostLandline: 0.022, markupMobile: 32, markupLandline: 36, primaryProvider: "Telnyx", fallbackProvider: "Twilio", enabled: true },
  { id: "8", country: "India", code: "+91", flag: "🇮🇳", baseCostMobile: 0.015, baseCostLandline: 0.008, markupMobile: 33, markupLandline: 25, primaryProvider: "Twilio", fallbackProvider: "Telnyx", enabled: true },
];

const providers = ["Twilio", "Telnyx", "Vonage"];

const AdminRates = () => {
  const [search, setSearch] = useState("");
  const [countryRates, setCountryRates] = useState<CountryRate[]>(mockCountryRates);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryRate | null>(null);
  const [editForm, setEditForm] = useState({
    markupMobile: 0,
    markupLandline: 0,
    primaryProvider: "",
    fallbackProvider: "",
  });
  const { toast } = useToast();

  const filteredRates = countryRates.filter(
    (rate) =>
      rate.country.toLowerCase().includes(search.toLowerCase()) ||
      rate.code.includes(search)
  );

  const handleEdit = (country: CountryRate) => {
    setSelectedCountry(country);
    setEditForm({
      markupMobile: country.markupMobile,
      markupLandline: country.markupLandline,
      primaryProvider: country.primaryProvider,
      fallbackProvider: country.fallbackProvider,
    });
    setEditDialogOpen(true);
  };

  const handleSave = () => {
    if (!selectedCountry) return;
    
    setCountryRates(prev => prev.map(c => 
      c.id === selectedCountry.id 
        ? { ...c, ...editForm }
        : c
    ));
    
    toast({
      title: "Rate updated",
      description: `${selectedCountry.country} rates have been updated`,
    });
    
    setEditDialogOpen(false);
  };

  const handleToggleEnabled = (id: string) => {
    setCountryRates(prev => prev.map(c => 
      c.id === id ? { ...c, enabled: !c.enabled } : c
    ));
    
    const country = countryRates.find(c => c.id === id);
    toast({
      title: country?.enabled ? "Country disabled" : "Country enabled",
      description: `${country?.country} has been ${country?.enabled ? "disabled" : "enabled"}`,
    });
  };

  const calculateFinalRate = (baseCost: number, markup: number) => {
    return baseCost * (1 + markup / 100);
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Rates & Providers</h1>
          <p className="text-muted-foreground">
            Manage per-country rates and provider configuration
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Country
        </Button>
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

      {/* Rates Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Country</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Code</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Base (Mobile)</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Markup</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Final Rate</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Primary</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Fallback</th>
                <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRates.map((rate) => (
                <tr key={rate.id} className={cn(
                  "hover:bg-muted/30 transition-colors",
                  !rate.enabled && "opacity-50"
                )}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{rate.flag}</span>
                      <span className="font-medium text-foreground">{rate.country}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">
                    {rate.code}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-muted-foreground">
                    ${rate.baseCostMobile.toFixed(3)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-foreground">
                    +{rate.markupMobile}%
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-medium text-primary">
                    ${calculateFinalRate(rate.baseCostMobile, rate.markupMobile).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {rate.primaryProvider}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {rate.fallbackProvider}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {rate.enabled ? (
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">Active</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-muted text-muted-foreground border-border">Disabled</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="iconSm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(rate)}>
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit Rates
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleToggleEnabled(rate.id)}>
                          {rate.enabled ? (
                            <>
                              <PowerOff className="w-4 h-4 mr-2" />
                              Disable Country
                            </>
                          ) : (
                            <>
                              <Power className="w-4 h-4 mr-2" />
                              Enable Country
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">{selectedCountry?.flag}</span>
              Edit {selectedCountry?.country} Rates
            </DialogTitle>
            <DialogDescription>
              Adjust markup percentages and provider configuration
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="markupMobile">Mobile Markup (%)</Label>
                <Input
                  id="markupMobile"
                  type="number"
                  min="0"
                  max="200"
                  value={editForm.markupMobile}
                  onChange={(e) => setEditForm(prev => ({ ...prev, markupMobile: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="markupLandline">Landline Markup (%)</Label>
                <Input
                  id="markupLandline"
                  type="number"
                  min="0"
                  max="200"
                  value={editForm.markupLandline}
                  onChange={(e) => setEditForm(prev => ({ ...prev, markupLandline: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Primary Provider</Label>
                <Select 
                  value={editForm.primaryProvider} 
                  onValueChange={(v) => setEditForm(prev => ({ ...prev, primaryProvider: v }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {providers.map(p => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Fallback Provider</Label>
                <Select 
                  value={editForm.fallbackProvider} 
                  onValueChange={(v) => setEditForm(prev => ({ ...prev, fallbackProvider: v }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {providers.map(p => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Preview */}
            {selectedCountry && (
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground mb-2">Final Rates Preview</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Mobile: </span>
                    <span className="font-mono font-medium text-primary">
                      ${calculateFinalRate(selectedCountry.baseCostMobile, editForm.markupMobile).toFixed(2)}/min
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Landline: </span>
                    <span className="font-mono font-medium text-primary">
                      ${calculateFinalRate(selectedCountry.baseCostLandline, editForm.markupLandline).toFixed(2)}/min
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminRates;
