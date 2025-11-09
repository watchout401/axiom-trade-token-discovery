"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { toast } from "sonner";

import { QuickBuyModal } from "@/components/modals/QuickBuyModal";
import { TokenDetailsModal } from "@/components/modals/TokenDetailsModal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectSelectedTokenId } from "@/store/selectors";
import { setModalOpen } from "@/store/uiSlice";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/pulse", label: "Pulse" },
  { href: "/discover", label: "Discover" },
];

export function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const selectedTokenId = useAppSelector(selectSelectedTokenId);

  const openQuickBuy = () => {
    if (!selectedTokenId) {
      toast.info("Select a token first", {
        description: "Choose any token row to enable quick buy.",
      });
      return;
    }

    dispatch(setModalOpen({ modal: "quickBuy", value: true }));
  };

  return (
    <TooltipProvider delayDuration={150} skipDelayDuration={300}>
      <div className="min-h-screen bg-background text-foreground">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1E3A8A33,#0A0E27_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#2563EB33,transparent_55%)]" />
        </div>

        <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 pb-12 pt-8 sm:px-8 lg:px-12">
          <header className="flex flex-col gap-6 rounded-3xl border border-border/40 bg-surface/70 p-6 shadow-[0_20px_60px_rgba(6,10,30,0.4)] backdrop-blur-md sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Axiom Trade</span>
                <h1 className="text-2xl font-semibold text-foreground">Token Intelligence Dashboard</h1>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="border-border/60 bg-muted/20 text-xs font-medium uppercase tracking-wide text-muted-foreground hover:bg-hover"
                >
                  Auto Refresh
                </Button>
                <Button
                  className="bg-primary px-6 text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:bg-button-hover"
                  onClick={openQuickBuy}
                >
                  Quick Buy
                </Button>
              </div>
            </div>

            <nav className="flex items-center gap-3">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition-all",
                      isActive
                        ? "border-accent bg-accent/20 text-foreground shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                        : "border-transparent bg-muted/30 text-muted-foreground hover:border-border/50 hover:bg-muted/40 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <Separator className="bg-border/40" />

            <div className="grid gap-4 text-xs text-muted-foreground sm:grid-cols-3">
              <div className="rounded-xl border border-border/40 bg-muted/20 px-3 py-3">
                <span className="text-muted-foreground">Realtime Feed</span>
                <p className="text-sm font-semibold text-foreground">Live price deltas ±5%</p>
              </div>
              <div className="rounded-xl border border-border/40 bg-muted/20 px-3 py-3">
                <span className="text-muted-foreground">Performance Budget</span>
                <p className="text-sm font-semibold text-foreground">Interactions &lt; 100ms</p>
              </div>
              <div className="rounded-xl border border-border/40 bg-muted/20 px-3 py-3">
                <span className="text-muted-foreground">Viewport</span>
                <p className="text-sm font-semibold text-foreground">320px - 2560px adaptive</p>
              </div>
            </div>
          </header>

          <main className="mt-8 flex-1">{children}</main>
        </div>
      </div>

      <QuickBuyModal />
      <TokenDetailsModal />
    </TooltipProvider>
  );
}

