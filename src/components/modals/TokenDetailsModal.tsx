"use client";

import Image from "next/image";
import { useMemo } from "react";
import { ExternalLink, Globe, Twitter } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TokenQuickStats } from "@/components/tokens/TokenQuickStats";
import { TokenMetricsList } from "@/components/tokens/TokenMetricsList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectSelectedTokenId,
  selectTokenById,
  selectTokenDetailsModalState,
} from "@/store/selectors";
import { setModalOpen } from "@/store/uiSlice";
import { formatAge } from "@/lib/format";

const mockTransactions = [
  { hash: "0x91a...bf19", action: "Buy", amount: "4,200", counterparty: "Navigator Labs" },
  { hash: "0xa23...9981", action: "Sell", amount: "1,050", counterparty: "Velocity Desk" },
  { hash: "0xff2...11ac", action: "Buy", amount: "8,600", counterparty: "Axiom Prime" },
];

const mockHistory = [
  { label: "Listed", value: "46 hours ago" },
  { label: "Peak Market Cap", value: "$162M" },
  { label: "Highest Volume", value: "$51M" },
];

export function TokenDetailsModal() {
  const dispatch = useAppDispatch();
  const modalState = useAppSelector(selectTokenDetailsModalState);
  const selectedTokenId = useAppSelector(selectSelectedTokenId);
  const token = useAppSelector((state) =>
    selectedTokenId ? selectTokenById(selectedTokenId)(state) : undefined,
  );

  const isOpen = modalState.isOpen && Boolean(token);

  const handleClose = () => {
    dispatch(setModalOpen({ modal: "tokenDetails", value: false }));
  };

  const openQuickBuy = () => {
    if (!token) return;
    dispatch(setModalOpen({ modal: "tokenDetails", value: false }));
    dispatch(setModalOpen({ modal: "quickBuy", value: true }));
  };

  const socialLinks = useMemo(() => {
    if (!token) return [] as Array<{ icon: React.ReactElement; label: string; href: string }>;

    return ([
      token.socialLinks.website && {
        icon: <Globe className="h-4 w-4" aria-hidden />,
        label: "Website",
        href: token.socialLinks.website,
      },
      token.socialLinks.twitter && {
        icon: <Twitter className="h-4 w-4" aria-hidden />,
        label: "X (Twitter)",
        href: token.socialLinks.twitter,
      },
      token.socialLinks.contract && {
        icon: <ExternalLink className="h-4 w-4" aria-hidden />,
        label: "Contract",
        href: token.socialLinks.contract,
      },
    ].filter(Boolean) as Array<{ icon: React.ReactElement; label: string; href: string }>);
  }, [token]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? handleClose() : undefined)}>
      <DialogContent className="max-w-4xl border-border/60 bg-surface/98">
        {token ? (
          <div className="flex flex-col gap-6">
            <DialogHeader className="flex flex-row items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <Image
                  src={token.logo}
                  alt={token.name}
                  width={72}
                  height={72}
                  className="h-16 w-16 rounded-xl border border-border/50 object-cover"
                />
                <div className="flex flex-col gap-1">
                  <DialogTitle className="text-2xl font-semibold text-foreground">
                    {token.name}
                  </DialogTitle>
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {token.ticker} · Listed {formatAge(token.ageInSeconds)} ago
                  </span>
                </div>
              </div>
              <Button
                variant="default"
                className="bg-primary px-5 text-xs font-semibold uppercase tracking-wide text-primary-foreground hover:bg-button-hover"
                onClick={openQuickBuy}
              >
                Buy Token
              </Button>
            </DialogHeader>

            <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
              <div className="rounded-2xl border border-border/40 bg-card/90 p-5 shadow-inner">
                <TokenQuickStats token={token} layout="column" />
                <div className="mt-5">
                  <TokenMetricsList token={token} />
                </div>
              </div>

              <div className="flex flex-col gap-5 rounded-2xl border border-border/40 bg-card/90 p-5">
                <span className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Social</span>
                <div className="flex flex-col gap-3 text-sm">
                  {socialLinks.length ? (
                    socialLinks.map((link) => (
                      <a
                        key={link?.label}
                        href={link?.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 rounded-lg border border-border/30 bg-muted/20 px-4 py-3 text-foreground transition-colors hover:border-border/50 hover:bg-muted/30"
                      >
                        {link?.icon}
                        <span>{link?.label}</span>
                      </a>
                    ))
                  ) : (
                    <span className="text-muted-foreground">No social links available.</span>
                  )}
                </div>

                <div className="rounded-xl border border-border/30 bg-muted/15 px-4 py-3 text-xs">
                  <span className="text-muted-foreground">
                    Pro Traders: {token.proTraders.toLocaleString()} · Platform: {token.platform}
                  </span>
                </div>
              </div>
            </div>

            <Tabs defaultValue="overview" className="mt-2">
              <TabsList className="grid w-full grid-cols-3 bg-muted/20 text-muted-foreground">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="rounded-2xl border border-border/40 bg-card/90 p-6">
                <div className="grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
                  <div>
                    <span className="text-xs uppercase tracking-[0.3em]">Description</span>
                    <p className="mt-3 leading-relaxed text-foreground/80">
                      {token.name} is currently in the spotlight as part of the Axiom Trade ecosystem. Metrics
                      indicate strong developer traction and consistent buy-side momentum.
                    </p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-[0.3em]">Platform Notes</span>
                    <p className="mt-3 leading-relaxed text-foreground/80">
                      Active on {token.platform}. Liquidity monitors show maintained depth across primary pools with
                      measured volatility.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="transactions" className="rounded-2xl border border-border/40 bg-card/90 p-6">
                <div className="flex flex-col gap-4">
                  {mockTransactions.map((transaction) => (
                    <div
                      key={transaction.hash}
                      className="flex flex-col gap-2 rounded-xl border border-border/30 bg-muted/10 p-4 text-sm"
                    >
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
                        <span>{transaction.action}</span>
                        <span>{transaction.hash}</span>
                      </div>
                      <div className="flex items-center justify-between text-foreground">
                        <span>{transaction.counterparty}</span>
                        <span>{transaction.amount} USD</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="history" className="rounded-2xl border border-border/40 bg-card/90 p-6">
                <div className="grid gap-4 text-sm">
                  {mockHistory.map((event) => (
                    <div
                      key={event.label}
                      className="flex items-center justify-between rounded-xl border border-border/30 bg-muted/10 px-4 py-3"
                    >
                      <span className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                        {event.label}
                      </span>
                      <span className="font-medium text-foreground">{event.value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

