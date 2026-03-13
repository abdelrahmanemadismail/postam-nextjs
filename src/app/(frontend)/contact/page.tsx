import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/landing/footer-section";
import { ContactForm } from "@/components/contact/contact-form";
import { sanityFetch } from "@/sanity/lib/live";
import { getSiteSettingsQuery } from "@/sanity/lib/queries";

export async function generateMetadata() {
  const t = await getTranslations("contactUs");
  return {
    title: `Contact Us — Postam`,
    description: t("heroDescription"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contactUs");
  const { data: settings } = await sanityFetch({ query: getSiteSettingsQuery });

  type Office = { name?: string | null; addressLine1?: string | null; addressLine2?: string | null };
  const offices: Office[] = settings?.offices ?? [];
  const channelDefs = [
    {
      key: "whatsapp",
      Icon: MessageCircle,
      titleKey: "channels.0.title",
      descKey: "channels.0.description",
      actionKey: "channels.0.action",
      href: settings?.whatsapp ?? "https://wa.me/",
    },
    {
      key: "email",
      Icon: Mail,
      titleKey: "channels.1.title",
      descKey: "channels.1.description",
      actionKey: "channels.1.action",
      href: settings?.supportEmail ? `mailto:${settings.supportEmail}` : "mailto:support@postam.com",
      displayAction: settings?.supportEmail,
    },
    {
      key: "phone",
      Icon: Phone,
      titleKey: "channels.2.title",
      descKey: "channels.2.description",
      actionKey: "channels.2.action",
      href: settings?.phone ? `tel:${settings.phone.replace(/\s+/g, "")}` : "tel:",
      displayAction: settings?.phone,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {/* ── Hero ───────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70 py-14 sm:py-20 lg:py-24 text-primary-foreground">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary-foreground/5" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-primary-foreground/5" />
          <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <span className="mb-4 inline-block rounded-full bg-primary-foreground/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
              {t("badge")}
            </span>
            <h1 className="text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {t("heroTitle")}
            </h1>
            <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-primary-foreground/80">
              {t("heroDescription")}
            </p>
          </div>
        </section>

        {/* ── Contact Channels ───────────────────────────────────────── */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 sm:mb-10 text-center text-2xl font-bold sm:text-3xl">
              {t("channelsTitle")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {channelDefs.map(({ key, Icon, titleKey, descKey, actionKey, href, displayAction }) => (
                <a
                  key={key}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-1 font-semibold">{t(titleKey as Parameters<typeof t>[0])}</h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {t(descKey as Parameters<typeof t>[0])}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {displayAction ?? t(actionKey as Parameters<typeof t>[0])}
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Form + Offices ─────────────────────────────────────────── */}
        <section className="border-t border-border bg-muted/40 py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-5">
              {/* Form */}
              <div className="lg:col-span-3">
                <h2 className="mb-1 text-2xl font-bold">{t("formTitle")}</h2>
                <p className="mb-8 text-muted-foreground">{t("formSubtitle")}</p>
                <ContactForm />
              </div>

              {/* Offices + FAQ CTA */}
              <div className="flex flex-col gap-8 lg:col-span-2">
                {offices.length > 0 && (
                  <div>
                    <h2 className="mb-6 text-2xl font-bold">{t("officesTitle")}</h2>
                    <div className="flex flex-col gap-4">
                      {offices.map((office) => (
                        <div
                          key={office.name}
                          className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
                        >
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <MapPin className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{office.name}</h3>
                            <p className="text-sm text-muted-foreground">{office.addressLine1}</p>
                            {office.addressLine2 && (
                              <p className="text-sm text-muted-foreground">{office.addressLine2}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* FAQ CTA */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <p className="mb-2 font-semibold">{t("faqCta")}</p>
                  <Link
                    href="/help-center"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    {t("faqCtaLink")}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
