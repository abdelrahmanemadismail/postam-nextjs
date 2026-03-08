import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Briefcase, MapPin, Clock, ArrowRight, Users } from "lucide-react";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/landing/footer-section";
import { defaultLocale } from "@/lib/i18n";
import { resolveStr } from "@/lib/resolve-str";
import { sanityFetch } from "@/sanity/lib/live";
import { getOpenJobPostingsQuery } from "@/sanity/lib/queries";

export async function generateMetadata() {
  const t = await getTranslations("careers");
  return {
    title: `Careers — Postam`,
    description: t("heroDescription"),
  };
}

const TYPE_LABELS: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  remote: "Remote",
};

export default async function CareersPage() {
  const locale = await getLocale();
  const t = await getTranslations("careers");

  const { data: jobs } = await sanityFetch({
    query: getOpenJobPostingsQuery,
    params: { locale, defaultLocale },
  });

  const jobList = jobs ?? [];

  // Group jobs by department
  const grouped: Record<string, typeof jobList> = {};
  for (const job of jobList) {
    const dept = job.department ?? "Other";
    if (!grouped[dept]) grouped[dept] = [];
    grouped[dept]!.push(job);
  }

  const departments = Object.keys(grouped).sort();

  const perks = t.raw("perks") as Array<{ title: string; description: string }>;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70 py-24 text-primary-foreground">
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

        {/* ── Why Join Us ─────────────────────────────────────────────── */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold">{t("perksTitle")}</h2>
              <p className="mt-3 text-muted-foreground">{t("perksSubtitle")}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {perks.map((perk, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-semibold">{perk.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Open Positions ──────────────────────────────────────────── */}
        <section className="bg-muted/40 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold">{t("openPositionsTitle")}</h2>
              <p className="mt-3 text-muted-foreground">{t("openPositionsSubtitle")}</p>
            </div>

            {departments.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-12 text-center">
                <Briefcase className="mx-auto mb-4 h-10 w-10 text-muted-foreground/50" />
                <p className="text-muted-foreground">{t("noOpenings")}</p>
              </div>
            ) : (
              <div className="space-y-12">
                {departments.map((dept) => (
                  <div key={dept}>
                    <h3 className="mb-5 text-lg font-bold text-primary">{dept}</h3>
                    <div className="space-y-3">
                      {grouped[dept]!.map((job) => (
                        <Link
                          key={job._id}
                          href={`/careers/${job.slug}`}
                          className="group flex flex-col gap-3 rounded-2xl border border-border bg-card px-6 py-5 shadow-sm transition hover:border-primary/40 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex-1">
                            <p className="font-semibold transition group-hover:text-primary">
                              {resolveStr(job.title)}
                            </p>
                            {resolveStr(job.summary) && (
                              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                {resolveStr(job.summary)}
                              </p>
                            )}
                            <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                              {job.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3.5 w-3.5" />
                                  {resolveStr(job.location)}
                                </span>
                              )}
                              {job.type && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5" />
                                  {TYPE_LABELS[job.type] ?? job.type}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-2 text-sm font-medium text-primary">
                            {t("applyNow")}
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold">{t("ctaTitle")}</h2>
            <p className="mt-4 text-muted-foreground">{t("ctaDescription")}</p>
            <a
              href="mailto:careers@postam.com"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90"
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
