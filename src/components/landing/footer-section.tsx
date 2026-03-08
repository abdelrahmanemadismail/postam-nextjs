"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Clock,
  CreditCard,
  ShieldCheck,
  Headphones,
} from "lucide-react";

export function FooterSection() {
  const t = useTranslations();
  const companyLinks = t.raw("footer.company.links") as string[];
  const servicesLinks = t.raw("footer.services.links") as string[];
  const officeLocations = t.raw("footer.offices.locations") as Array<{
    name: string;
    addressLines: [string, string];
    imageAlt: string;
  }>;

  return (
    <footer className="mt-auto bg-foreground pt-16 text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-background/20 pb-12 md:grid-cols-4">
          <div className="flex flex-col items-center text-center">
            <Clock className="mb-3 h-8 w-8 text-accent" />
            <h4 className="text-sm font-semibold">{t("footer.badges.onTime")}</h4>
          </div>
          <div className="flex flex-col items-center text-center">
            <CreditCard className="mb-3 h-8 w-8 text-accent" />
            <h4 className="text-sm font-semibold">{t("footer.badges.singlePrice")}</h4>
          </div>
          <div className="flex flex-col items-center text-center">
            <ShieldCheck className="mb-3 h-8 w-8 text-accent" />
            <h4 className="text-sm font-semibold">{t("footer.badges.secure")}</h4>
          </div>
          <div className="flex flex-col items-center text-center">
            <Headphones className="mb-3 h-8 w-8 text-accent" />
            <h4 className="text-sm font-semibold">{t("footer.badges.support")}</h4>
          </div>
        </div>

        <div className="grid gap-12 py-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-accent text-lg font-bold text-accent-foreground">
                P
              </div>
              <span className="text-xl font-bold">Postam</span>
            </div>
            <p className="mb-6 text-sm text-muted-foreground">
              {t("footer.about.description")}
            </p>
            <div className="flex gap-4">
              {[
                { label: "IG" },
                { label: "TW" },
                { label: "FB" },
              ].map((social) => (
                <a
                  key={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 text-xs font-semibold transition hover:bg-accent hover:text-accent-foreground"
                  href="#"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-6 text-sm font-bold">{t("footer.company.title")}</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a className="transition hover:text-background" href="#">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-6 text-sm font-bold">{t("footer.services.title")}</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              {servicesLinks.map((link) => (
                <li key={link}>
                  <a className="transition hover:text-background" href="#">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="mb-6 text-sm font-bold">{t("footer.offices.title")}</h4>
            <div className="space-y-6">
              {officeLocations.map((location, index) => (
                <div key={location.name} className="flex gap-4">
                  <div className="h-12 w-16 overflow-hidden rounded bg-background/40">
                    <Image
                      alt={location.imageAlt}
                      src={
                        index === 0
                          ? "https://lh3.googleusercontent.com/aida-public/AB6AXuCRkCzLLVSd7zW8mWYBsWbIEfz-gauupyLrhbiyXBFTjRK3I5vndCIpOcFoCmwYdTaFeWL3wu755w-wLTxKtcMsSr1KOgm655s76RiuSjXK_8-YJJlYGW-Dhhd_RDBIr2T6aYzzwYvncQhopKq_t9DbjNsE7Xf1QnK0YQapzm5t28SnAOf33FWtsgm9dnN4YY4Cqh0pxGhEtUr49S-Vba5_GNNP_px8OKn6y9UMr5RKSEvUOA-KaC3_XkyKggxvz1-hkYSLz4hannh0"
                          : "https://lh3.googleusercontent.com/aida-public/AB6AXuB-IWNteufxFOgZCgF_s2wv5t2yKuF7ikRPqZ3l46LUvRvYEkDLvIG479Q9rt8litRGmwMl1oOYi78tsR1RBZalHnTNrgMlfqx-3s5nGr1m7sZ8NJKfrVahK9ecZ8Dlmk_ouInN7AD9HP410qXKb7GqE5bmiz9YwCA_Mm2O56uNyPJ1YTKzsN0_6EOiz5NhIGZfIYgmc9SqVmki2wchpS7UZtbyS-SBUHRFKkJoZ91syJezJMv6HBj1nJi7Xn5e8YE-GN3FHP-cAKJo"
                      }
                      width={64}
                      height={48}
                      className="h-full w-full object-cover opacity-70"
                    />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold">{location.name}</h5>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {location.addressLines[0]}
                      <br />
                      {location.addressLines[1]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-background/20 py-8 text-xs text-muted-foreground md:flex-row">
          <p>{t("footer.legal.copyright")}</p>
          <div className="flex gap-6">
            <Link className="transition hover:text-background" href="/privacy-policy">
              {t("footer.legal.privacy")}
            </Link>
            <Link className="transition hover:text-background" href="/terms-of-service">
              {t("footer.legal.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
