import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  Clock, CreditCard, ShieldCheck, Headphones,
  Instagram, Twitter, Facebook, Linkedin, Youtube, Github, Twitch, Globe,
  type LucideIcon,
} from "lucide-react";
import { sanityFetch } from "@/sanity/lib/live";
import { getSiteSettingsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

// Positional hrefs matching footer.company.links order in i18n
const COMPANY_HREFS = ["/about", "/ca", "/blog", "/contact"];
// Positional hrefs matching footer.services.links order in i18n
const SERVICES_HREFS = ["/help-center/buy-for-me", "#", "/help-center/prohibited-items", "#"];

export async function FooterSection() {
  const t = await getTranslations();
  const { data: settings } = await sanityFetch({ query: getSiteSettingsQuery });

  const companyLinks = t.raw("footer.company.links") as string[];
  const servicesLinks = t.raw("footer.services.links") as string[];

  type SocialLinkItem = { platform: string | null; href: string | null };

  const socialLinks: SocialLinkItem[] =
    settings?.socialLinks && settings.socialLinks.length > 0
      ? settings.socialLinks
      : [
          { platform: "instagram", href: "#" },
          { platform: "twitter", href: "#" },
          { platform: "facebook", href: "#" },
        ];

  const SOCIAL_ICONS: Record<string, LucideIcon> = {
    instagram: Instagram,
    twitter: Twitter,
    facebook: Facebook,
    linkedin: Linkedin,
    youtube: Youtube,
    github: Github,
    twitch: Twitch,
  };

  const offices = settings?.offices ?? [];

  return (
    <footer className="mt-auto bg-foreground pt-16 text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Trust badges */}
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

        {/* Main links + offices */}
        <div className="grid gap-12 py-12 md:grid-cols-12">
          {/* Brand + social */}
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
              {socialLinks.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform ?? ""] ?? Globe;
                return (
                  <a
                    key={social.platform ?? social.href}
                    href={social.href ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform ?? "social"}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 transition hover:bg-accent hover:text-accent-foreground"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company links */}
          <div className="md:col-span-2">
            <h4 className="mb-6 text-sm font-bold">{t("footer.company.title")}</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              {companyLinks.map((link, i) => (
                <li key={link}>
                  <Link className="transition hover:text-background" href={COMPANY_HREFS[i] ?? "#"}>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div className="md:col-span-2">
            <h4 className="mb-6 text-sm font-bold">{t("footer.services.title")}</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              {servicesLinks.map((link, i) => (
                <li key={link}>
                  <Link className="transition hover:text-background" href={SERVICES_HREFS[i] ?? "#"}>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div className="md:col-span-4">
            <h4 className="mb-6 text-sm font-bold">{t("footer.offices.title")}</h4>
            {offices.length > 0 ? (
              <div className="space-y-6">
                {offices.map((office) => (
                  <div key={office.name} className="flex gap-4">
                    {office.image ? (
                      <div className="h-12 w-16 flex-shrink-0 overflow-hidden rounded bg-background/40">
                        <Image
                          alt={office.name ?? ""}
                          src={urlFor(office.image).width(64).height(48).url()}
                          width={64}
                          height={48}
                          className="h-full w-full object-cover opacity-70"
                        />
                      </div>
                    ) : (
                      <div className="h-12 w-16 flex-shrink-0 rounded bg-background/20" />
                    )}
                    <div>
                      <h5 className="text-sm font-semibold">{office.name}</h5>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {office.addressLine1}
                        {office.addressLine2 && (
                          <>
                            <br />
                            {office.addressLine2}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">—</p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-background/20 py-8 text-xs text-muted-foreground md:flex-row">
          <p>{t("footer.legal.copyright")}</p>
          <div className="flex flex-wrap gap-6">
            <Link className="transition hover:text-background" href="/about">
              {companyLinks[0] ?? "About Us"}
            </Link>
            <Link className="transition hover:text-background" href="/contact">
              {companyLinks[3] ?? "Contact"}
            </Link>
            <Link className="transition hover:text-background" href="/blog">
              {t("nav.blog")}
            </Link>
            <Link className="transition hover:text-background" href="/help-center">
              {t("footer.legal.helpCenter")}
            </Link>
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
