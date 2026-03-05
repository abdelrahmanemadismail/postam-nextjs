"use client";

import { useTranslations } from "next-intl";
import { ShoppingBag, Link2 } from "lucide-react";

export function BuyForMeSection() {
  const t = useTranslations();

  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-primary/5" />
      <div className="relative z-10 mx-auto max-w-4xl px-4">
        <div className="rounded-2xl border border-border bg-background p-8 text-center shadow-2xl md:p-12">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            {t("buyForMe.title")}
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-muted-foreground">
            {t("buyForMe.description")}
          </p>
          <div className="mx-auto flex max-w-2xl flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Link2 className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("buyForMe.placeholder")}
                className="w-full rounded-lg border border-input bg-background py-4 ps-10 pe-3 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button className="whitespace-nowrap rounded-lg bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary/90">
              {t("buyForMe.button")}
            </button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            {t("buyForMe.supportedStores")}
          </p>
        </div>
      </div>
    </section>
  );
}
