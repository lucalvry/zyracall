import { useState, useMemo } from "react";
import { CountryCompatibility, ReliabilityLevel, VerdictLevel, PrimaryRecommendation } from "@/data/2fa-platforms";
import ReliabilityBadge from "./ReliabilityBadge";
import VerdictBadge from "./VerdictBadge";
import FeedbackButton from "./FeedbackButton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertTriangle, Search, Filter, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompatibilityTableProps {
  compatibility: CountryCompatibility[];
  platformId: string;
  platformName: string;
  verdicts?: {
    mobile: VerdictLevel;
    voip: VerdictLevel;
    virtual: VerdictLevel;
  };
  primaryRecommendation?: PrimaryRecommendation;
  className?: string;
}

type FilterLevel = ReliabilityLevel | "all";

const verdictTooltips: Record<VerdictLevel, string> = {
  recommended: 'This number type is recommended for verification',
  caution: 'This number type may work but use with caution',
  avoid: 'This number type should be avoided for verification',
};

const CompatibilityTable = ({ 
  compatibility, 
  platformId, 
  platformName, 
  verdicts,
  primaryRecommendation,
  className 
}: CompatibilityTableProps) => {
  const [search, setSearch] = useState("");
  const [mobileFilter, setMobileFilter] = useState<FilterLevel>("all");
  const [voipFilter, setVoipFilter] = useState<FilterLevel>("all");
  const [virtualFilter, setVirtualFilter] = useState<FilterLevel>("all");

  const filteredData = useMemo(() => {
    return compatibility.filter(country => {
      const matchesSearch = country.country.toLowerCase().includes(search.toLowerCase()) ||
                           country.countryCode.toLowerCase().includes(search.toLowerCase());
      const matchesMobile = mobileFilter === "all" || country.mobile === mobileFilter;
      const matchesVoip = voipFilter === "all" || country.voip === voipFilter;
      const matchesVirtual = virtualFilter === "all" || country.virtual === virtualFilter;
      
      return matchesSearch && matchesMobile && matchesVoip && matchesVirtual;
    });
  }, [compatibility, search, mobileFilter, voipFilter, virtualFilter]);

  const hasActiveFilters = mobileFilter !== "all" || voipFilter !== "all" || virtualFilter !== "all" || search !== "";

  // Check if a country is the primary recommendation
  const isPrimaryRecommended = (countryCode: string) => {
    return primaryRecommendation?.countryCode === countryCode;
  };

  return (
    <TooltipProvider>
      <div className={cn("space-y-4", className)}>
        {/* Verdict Header Row */}
        {verdicts && (
          <div className="flex flex-wrap items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/30">
            <span className="text-sm font-medium text-muted-foreground">Overall Verdicts:</span>
            <div className="flex flex-wrap gap-2">
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground">Mobile:</span>
                    <VerdictBadge verdict={verdicts.mobile} size="sm" showLabel={false} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{verdictTooltips[verdicts.mobile]}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground">VoIP:</span>
                    <VerdictBadge verdict={verdicts.voip} size="sm" showLabel={false} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{verdictTooltips[verdicts.voip]}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground">Virtual:</span>
                    <VerdictBadge verdict={verdicts.virtual} size="sm" showLabel={false} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{verdictTooltips[verdicts.virtual]}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-muted/50 border-border/50"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={mobileFilter} onValueChange={(v) => setMobileFilter(v as FilterLevel)}>
              <SelectTrigger className="w-[130px] bg-muted/50 border-border/50">
                <SelectValue placeholder="Mobile" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Mobile</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={voipFilter} onValueChange={(v) => setVoipFilter(v as FilterLevel)}>
              <SelectTrigger className="w-[130px] bg-muted/50 border-border/50">
                <SelectValue placeholder="VoIP" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All VoIP</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={virtualFilter} onValueChange={(v) => setVirtualFilter(v as FilterLevel)}>
              <SelectTrigger className="w-[130px] bg-muted/50 border-border/50">
                <SelectValue placeholder="Virtual" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Virtual</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing {filteredData.length} of {compatibility.length} countries
            {hasActiveFilters && " (filtered)"}
          </span>
          {hasActiveFilters && (
            <button 
              onClick={() => {
                setSearch("");
                setMobileFilter("all");
                setVoipFilter("all");
                setVirtualFilter("all");
              }}
              className="text-accent hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border/50 overflow-hidden bg-card/30">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-muted-foreground">Country</TableHead>
                <TableHead className="text-muted-foreground text-center">Mobile</TableHead>
                <TableHead className="text-muted-foreground text-center">VoIP</TableHead>
                <TableHead className="text-muted-foreground text-center">Virtual</TableHead>
                <TableHead className="text-muted-foreground">Warnings</TableHead>
                <TableHead className="text-muted-foreground text-center w-24">Feedback</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    <Filter className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    No countries match your filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((country) => {
                  const isRecommended = isPrimaryRecommended(country.countryCode);
                  return (
                    <TableRow 
                      key={country.countryCode} 
                      className={cn(
                        "border-border/50",
                        isRecommended && "bg-emerald-500/5 border-l-2 border-l-emerald-500"
                      )}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{country.flag}</span>
                          <span className="font-medium">{country.country}</span>
                          <span className="text-xs text-muted-foreground">({country.countryCode})</span>
                          {isRecommended && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Star className="w-4 h-4 text-emerald-400 fill-emerald-400/30" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Primary recommended country for {platformName}</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <ReliabilityBadge level={country.mobile} size="sm" />
                      </TableCell>
                      <TableCell className="text-center">
                        <ReliabilityBadge level={country.voip} size="sm" />
                      </TableCell>
                      <TableCell className="text-center">
                        <ReliabilityBadge level={country.virtual} size="sm" />
                      </TableCell>
                      <TableCell>
                        {country.warnings && country.warnings.length > 0 ? (
                          <div className="flex items-start gap-1.5 text-sm text-amber-400">
                            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>{country.warnings.join(", ")}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <FeedbackButton
                            platformId={platformId}
                            platformName={platformName}
                            countryCode={country.countryCode}
                            countryName={country.country}
                            countryFlag={country.flag}
                            numberType="mobile"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CompatibilityTable;
