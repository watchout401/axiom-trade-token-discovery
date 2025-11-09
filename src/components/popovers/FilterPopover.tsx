"use client";

import { useEffect, useMemo, useState } from "react";
import { Funnel, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectFilterModalState,
  selectFilters,
} from "@/store/selectors";
import {
  applyFilters,
  resetFilters,
  setModalOpen,
  setStatusFilter,
} from "@/store/uiSlice";
import type { TokenPlatform, TokenStatusFilter } from "@/types/token";

const platformOptions: Array<{ value: TokenPlatform; label: string }> = [
  { value: "raydium", label: "Raydium" },
  { value: "pump.fun", label: "Pump.fun" },
  { value: "meteora", label: "Meteora" },
];

const statusOptions: Array<{ value: TokenStatusFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "paid", label: "Paid" },
  { value: "unpaid", label: "Unpaid" },
];

export function FilterPopover() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const modalState = useAppSelector(selectFilterModalState);

  const [minMarketCap, setMinMarketCap] = useState<number>(filters.minMarketCap);
  const [platforms, setPlatforms] = useState<Record<TokenPlatform, boolean>>({
    raydium: filters.platforms.raydium,
    "pump.fun": filters.platforms["pump.fun"],
    meteora: filters.platforms.meteora,
  });
  const [status, setStatus] = useState<TokenStatusFilter>(filters.status);

  const sliderValue = useMemo(() => [minMarketCap], [minMarketCap]);

  useEffect(() => {
    if (modalState.isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing popover controls with persisted filters happens at open time
      setMinMarketCap(filters.minMarketCap);
      setPlatforms({
        raydium: filters.platforms.raydium,
        "pump.fun": filters.platforms["pump.fun"],
        meteora: filters.platforms.meteora,
      });
      setStatus(filters.status);
    }
  }, [filters, modalState.isOpen]);

  const closePopover = () => dispatch(setModalOpen({ modal: "filter", value: false }));

  const handleApply = () => {
    dispatch(applyFilters({ minMarketCap, platforms }));
    dispatch(setStatusFilter(status));
    closePopover();
  };

  const handleReset = () => {
    dispatch(resetFilters());
    closePopover();
  };

  return (
    <Popover open={modalState.isOpen} onOpenChange={(open) => dispatch(setModalOpen({ modal: "filter", value: open }))}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="flex items-center gap-2 rounded-full border-border/60 bg-muted/20 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-all hover:bg-muted/30 hover:text-foreground"
        >
          <Funnel className="h-4 w-4" aria-hidden />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 rounded-2xl border border-border/60 bg-surface/95 p-5 shadow-[0_18px_45px_rgba(8,12,32,0.45)]">
        <div className="flex flex-col gap-5">
          <section className="flex flex-col gap-3">
            <header className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Market Cap</span>
              <span className="text-xs font-semibold text-foreground">${minMarketCap.toLocaleString()}</span>
            </header>
            <Slider
              value={sliderValue}
              min={0}
              max={1_000_000}
              step={10_000}
              onValueChange={([value]) => setMinMarketCap(value)}
              className="py-2"
            />
          </section>

          <section className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Platforms</span>
            <div className="flex flex-col gap-2">
              {platformOptions.map((option) => (
                <label key={option.value} className="flex items-center gap-3 text-sm text-foreground">
                  <Checkbox
                    checked={platforms[option.value]}
                    onCheckedChange={(checked) =>
                      setPlatforms((previous) => ({
                        ...previous,
                        [option.value]: Boolean(checked),
                      }))
                    }
                    className="border-border/60"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Status</span>
            <div className="flex gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setStatus(option.value)}
                  className={cn(
                    "rounded-full border border-border/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all",
                    status === option.value
                      ? "bg-primary/20 text-primary border-primary/60"
                      : "bg-muted/20 text-muted-foreground hover:bg-muted/30 hover:text-foreground",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground"
              onClick={handleReset}
            >
              <RefreshCcw className="h-4 w-4" aria-hidden />
              Reset
            </Button>
            <Button
              type="button"
              className="bg-primary text-xs font-semibold uppercase tracking-wide text-primary-foreground hover:bg-button-hover"
              onClick={handleApply}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

