import { getTranslations } from "next-intl/server";
import { MapPin, Zap, ShieldCheck, Headphones, Target, Eye } from "lucide-react";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/landing/footer-section";
import { sanityFetch } from "@/sanity/lib/live";
import { getSiteSettingsQuery } from "@/sanity/lib/queries";

export async function generateMetadata() {
  const t = await getTranslations("aboutUs");
  return {
    title: `About Us — Postam`,
    description: t("heroDescription"),
  };
}

export default async function AboutPage() {
  const t = await getTranslations("aboutUs");
  const { data: settings } = await sanityFetch({ query: getSiteSettingsQuery });

  const stats = t.raw("stats") as Array<{ value: string; label: string }>;
  const values = t.raw("values") as Array<{ title: string; description: string }>;
  type Office = { name?: string | null; addressLine1?: string | null; addressLine2?: string | null };
  const offices: Office[] = settings?.offices ?? [];

  const valueIcons = [MapPin, Zap, ShieldCheck, Headphones];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {/* ── Hero ───────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70 py-24 text-primary-foreground">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary-foreground/5" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-primary-foreground/5" />

          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary-foreground/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
              {t("badge")}
            </span>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {t("heroTitle")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80 leading-relaxed">
              {t("heroDescription")}
            </p>
          </div>
        </section>

        {/* ── Mission & Vision ───────────────────────────────────────── */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Mission */}
              <div className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:shadow-md">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Target className="h-6 w-6" />
                </div>
                <h2 className="mb-3 text-xl font-bold">{t("missionTitle")}</h2>
                <p className="leading-relaxed text-muted-foreground">
                  {t("missionDescription")}
                </p>
              </div>

              {/* Vision */}
              <div className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:shadow-md">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Eye className="h-6 w-6" />
                </div>
                <h2 className="mb-3 text-xl font-bold">{t("visionTitle")}</h2>
                <p className="leading-relaxed text-muted-foreground">
                  {t("visionDescription")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ──────────────────────────────────────────────────── */}
        <section className="bg-foreground py-20 text-background">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-2xl font-bold sm:text-3xl">
              {t("statsTitle")}
            </h2>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl font-extrabold text-accent sm:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm font-medium text-background/70">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Values ─────────────────────────────────────────────────── */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-2xl font-bold sm:text-3xl">
              {t("valuesTitle")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, idx) => {
                const Icon = valueIcons[idx % valueIcons.length];
                return (
                  <div
                    key={value.title}
                    className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 font-semibold">{value.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Offices ────────────────────────────────────────────────── */}
        <section className="border-t border-border bg-muted/40 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-2xl font-bold sm:text-3xl">
              {t("officesTitle")}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2">
              {offices.map((office) => (
                <div
                  key={office.name}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
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
        </section>

        {/* ── CTA ────────────────────────────────────────────────────── */}
        <section className="py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold sm:text-4xl">{t("ctaTitle")}</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              {t("ctaDescription")}
            </p>
            <a
              href="#"
              className="mt-8 inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground shadow transition hover:bg-primary/90 hover:shadow-md"
            >
              {t("ctaButton")}
            </a>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
