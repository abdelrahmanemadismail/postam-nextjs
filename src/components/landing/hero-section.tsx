"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { MapPin, ShoppingCart } from "lucide-react";

export function HeroSection() {
  const t = useTranslations();

  return (
    <section className="w-full pt-8 pb-16">
      <div className="container mx-auto px-6 md:px-12 mb-16">
        {/* Hero Image with Overlay */}
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-8 shadow-lg group">
          <Image
            alt={t("hero.imageAlt")}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXfxM1xhNX8qhrdo1AJNC6kFyd54eu5GP095vCMyUDHgrcBNHuHht0j2JKEHM3vQLruVOB8dVeYIJBjgDn6WNufJ3Aat7AjR_S7ebmBryYHujeddr-CWmdFCRusoLBsAoh2SuQvtk0E_sbNwztkOJU4b5HvEPpdXcDLOWMDhGxSfRur1U4zWaVI5rnOsaoEAD1lEY_nsn0Dg6BleQafaHW7eIkhwCdu7fyeDUFE66bT2TphqCb0dFGL7GWr6b1Yyk36o27CZ3EbEig"
            fill
            sizes="100vw"
            className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-transparent flex flex-col justify-center px-12 md:px-24 text-primary-foreground">
            <span className="inline-block px-3 py-1 bg-primary/90 text-xs font-bold rounded-full mb-4 w-fit text-primary-foreground">
              {t("trending.label")}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {t("hero.titleLine1")} <br /> {t("hero.titleLine2")}
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg">
              {t("hero.description")}
            </p>
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium w-fit transition-colors">
              {t("cards.startShoppingButton")}
            </button>
          </div>
        </div>

        {/* Two-Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Get Your Free Turkey Address */}
          <div className="relative overflow-hidden rounded-xl bg-primary p-8 text-primary-foreground shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">
                {t("cards.startShoppingTitle")}
              </h3>
              <p className="text-primary-foreground/80 mb-6 max-w-xs text-sm">
                {t("cards.startShoppingDescription")}
              </p>
              <button className="bg-primary-foreground text-primary px-6 py-2 rounded-lg font-semibold text-sm hover:bg-primary-foreground/90 transition-colors">
                {t("cards.startShoppingButton")}
              </button>
            </div>
            {/* Decorative Icon */}
            <div className="absolute -bottom-4 -right-4 text-primary-foreground/10 group-hover:scale-105 transition-transform select-none">
              <MapPin className="h-32 w-32" />
            </div>
          </div>

          {/* Card 2: Concierge Order */}
          <div className="relative overflow-hidden rounded-xl bg-card p-8 text-card-foreground shadow-lg hover:shadow-xl transition-shadow group cursor-pointer border border-border">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">
                {t("cards.conciergeTitle")}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xs text-sm">
                {t("cards.conciergeDescription")}
              </p>
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-semibold text-sm transition-colors border border-transparent">
                {t("cards.conciergeButton")}
              </button>
            </div>
            {/* Decorative Icon */}
            <div className="absolute -bottom-4 -right-4 text-foreground/5 group-hover:scale-105 transition-transform select-none">
              <ShoppingCart className="h-32 w-32" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
