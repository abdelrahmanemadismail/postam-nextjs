"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { MapPin, ShoppingCart } from "lucide-react";

export function HeroSection() {
  const t = useTranslations();

  return (
    <section className="w-full pt-6 pb-12 sm:pt-8 sm:pb-16">
      <div className="container mx-auto mb-10 px-4 sm:px-6 md:mb-16 md:px-12">
        {/* Hero Image with Overlay */}
        <div className="group relative mb-6 h-[320px] w-full overflow-hidden rounded-xl shadow-lg sm:mb-8 sm:h-[360px] md:h-[400px] md:rounded-2xl">
          <Image
            alt={t("hero.imageAlt")}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXfxM1xhNX8qhrdo1AJNC6kFyd54eu5GP095vCMyUDHgrcBNHuHht0j2JKEHM3vQLruVOB8dVeYIJBjgDn6WNufJ3Aat7AjR_S7ebmBryYHujeddr-CWmdFCRusoLBsAoh2SuQvtk0E_sbNwztkOJU4b5HvEPpdXcDLOWMDhGxSfRur1U4zWaVI5rnOsaoEAD1lEY_nsn0Dg6BleQafaHW7eIkhwCdu7fyeDUFE66bT2TphqCb0dFGL7GWr6b1Yyk36o27CZ3EbEig"
            fill
            sizes="100vw"
            className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-foreground/80 to-transparent px-4 text-primary-foreground sm:px-6 md:px-24">
            <span className="mb-3 inline-block w-fit rounded-full bg-primary/90 px-3 py-1 text-xs font-bold text-primary-foreground sm:mb-4">
              {t("trending.label")}
            </span>
            <h1 className="mb-3 text-2xl font-bold leading-tight sm:mb-4 sm:text-3xl md:text-5xl">
              {t("hero.titleLine1")} <span className="block md:inline">{t("hero.titleLine2")}</span>
            </h1>
            <p className="mb-6 max-w-md text-sm text-primary-foreground/80 sm:text-base md:mb-8 md:max-w-lg md:text-lg">
              {t("hero.description")}
            </p>
            <button className="w-fit max-w-full rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:px-8 sm:py-3 sm:text-base">
              {t("cards.startShoppingButton")}
            </button>
          </div>
        </div>

        {/* Two-Column Cards */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {/* Card 1: Get Your Free Turkey Address */}
          <div className="group relative cursor-pointer overflow-hidden rounded-xl bg-primary p-5 text-primary-foreground shadow-lg transition-shadow hover:shadow-xl sm:p-6 md:p-8">
            <div className="relative z-10">
              <h3 className="mb-2 text-xl font-bold md:text-2xl">
                {t("cards.startShoppingTitle")}
              </h3>
              <p className="mb-5 max-w-full text-sm text-primary-foreground/80 sm:mb-6 sm:max-w-xs">
                {t("cards.startShoppingDescription")}
              </p>
              <button className="w-full rounded-lg bg-primary-foreground px-6 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary-foreground/90 sm:w-auto">
                {t("cards.startShoppingButton")}
              </button>
            </div>
            {/* Decorative Icon */}
            <div className="absolute -bottom-4 -right-4 text-primary-foreground/10 group-hover:scale-105 transition-transform select-none">
              <MapPin className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32" />
            </div>
          </div>

          {/* Card 2: Concierge Order */}
          <div className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card p-5 text-card-foreground shadow-lg transition-shadow hover:shadow-xl sm:p-6 md:p-8">
            <div className="relative z-10">
              <h3 className="mb-2 text-xl font-bold md:text-2xl">
                {t("cards.conciergeTitle")}
              </h3>
              <p className="mb-5 max-w-full text-sm text-muted-foreground sm:mb-6 sm:max-w-xs">
                {t("cards.conciergeDescription")}
              </p>
              <button className="w-full rounded-lg border border-transparent bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto">
                {t("cards.conciergeButton")}
              </button>
            </div>
            {/* Decorative Icon */}
            <div className="absolute -bottom-4 -right-4 text-foreground/5 group-hover:scale-105 transition-transform select-none">
              <ShoppingCart className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
