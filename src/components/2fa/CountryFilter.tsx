import { useState, useMemo } from "react";
import { getAllCountries } from "@/data/2fa-platforms";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountryFilterProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const CountryFilter = ({ value, onChange, className }: CountryFilterProps) => {
  const [open, setOpen] = useState(false);
  const countries = useMemo(() => getAllCountries(), []);
  
  const selectedCountry = countries.find(c => c.countryCode === value);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[250px] justify-between bg-muted/50 border-border/50"
          >
            {selectedCountry ? (
              <span className="flex items-center gap-2">
                <span>{selectedCountry.flag}</span>
                <span>{selectedCountry.country}</span>
              </span>
            ) : (
              <span className="text-muted-foreground">Filter by country...</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.countryCode}
                    value={country.country}
                    onSelect={() => {
                      onChange(country.countryCode === value ? "" : country.countryCode);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === country.countryCode ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="mr-2">{country.flag}</span>
                    {country.country}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      
      {value && (
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onChange("")}
          className="h-9 w-9"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default CountryFilter;
