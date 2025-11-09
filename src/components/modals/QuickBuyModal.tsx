"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectQuickBuyModalState,
  selectSelectedTokenId,
  selectTokenById,
} from "@/store/selectors";
import { setModalOpen } from "@/store/uiSlice";
import { formatCompactCurrency } from "@/lib/format";

export function QuickBuyModal() {
  const dispatch = useAppDispatch();
  const quickBuyModal = useAppSelector(selectQuickBuyModalState);
  const selectedTokenId = useAppSelector(selectSelectedTokenId);
  const token = useAppSelector((state) =>
    selectedTokenId ? selectTokenById(selectedTokenId)(state) : undefined,
  );

  const [amount, setAmount] = useState("1.0");
  const [slippage, setSlippage] = useState("0.5");

  const isOpen = quickBuyModal.isOpen && Boolean(token);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset modal controlled inputs when dialog opens
      setAmount("1.0");
      setSlippage("0.5");
    }
  }, [isOpen]);

  const closeModal = () => {
    dispatch(setModalOpen({ modal: "quickBuy", value: false }));
  };

  const handleConfirm = () => {
    if (!token) return;

    toast.success(`${token.ticker} order submitted`, {
      description: `Buying ${amount} SOL worth with ${slippage}% slippage.`,
    });

    closeModal();
  };

  const marketCapLabel = useMemo(
    () => (token ? formatCompactCurrency(token.marketCap) : ""),
    [token],
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? closeModal() : undefined)}>
      <DialogContent className="max-w-md border-border/60 bg-surface/95">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-lg font-semibold text-foreground">
            {token ? (
              <>
                <Image
                  src={token.logo}
                  alt={token.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-lg border border-border/40 object-cover"
                />
                <span className="flex flex-col">
                  <span>{token.name}</span>
                  <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    {token.ticker}
                  </span>
                </span>
              </>
            ) : null}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Provide order details. This is a simulated confirmation flow with no on-chain execution.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <div className="rounded-xl border border-border/50 bg-muted/20 p-4">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Market Cap</span>
              <span>{marketCapLabel}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="uppercase tracking-[0.2em] text-[11px]">Amount (SOL)</span>
              <Input
                inputMode="decimal"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="h-11 rounded-lg border-border/50 bg-background/80 text-foreground"
                placeholder="1.0"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="uppercase tracking-[0.2em] text-[11px]">Slippage (%)</span>
              <Input
                inputMode="decimal"
                value={slippage}
                onChange={(event) => setSlippage(event.target.value)}
                className="h-11 rounded-lg border-border/50 bg-background/80 text-foreground"
                placeholder="0.5"
              />
            </label>
          </div>
        </div>

        <DialogFooter className="mt-6 flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="w-full border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/40 sm:w-auto"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="w-full bg-primary text-primary-foreground hover:bg-button-hover sm:w-auto"
            onClick={handleConfirm}
            disabled={!token}
          >
            Confirm Buy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

