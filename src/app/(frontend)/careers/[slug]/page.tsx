import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Clock, Briefcase, ArrowLeft, ExternalLink } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/landing/footer-section";
import { MarkdownContent } from "@/components/markdown-content";
import { defaultLocale } from "@/lib/i18n";
import { sanityFetch } from "@/sanity/lib/live";
import { getJobPostingBySlugQuery } from "@/sanity/lib/queries";

const TYPE_LABELS: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  remote: "Remote",
};

export default async function JobPostingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const locale = await getLocale();
  const t = await getTranslations("careers");
  const { slug } = await params;

  const { data: job } = await sanityFetch({
    query: getJobPostingBySlugQuery,
    params: { slug, locale, defaultLocale },
  });

  if (!job) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {/* ── Header ────────────────────────────────────────────────── */}
        <section className="border-b border-border bg-card py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/careers"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("backToCareers")}
            </Link>

            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                {job.department && (
                  <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
                    {job.department}
                  </p>
                )}
                <h1 className="text-3xl font-bold sm:text-4xl">{job.title}</h1>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {job.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                  )}
                  {job.type && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {TYPE_LABELS[job.type] ?? job.type}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4" />
                    {job.department}
                  </span>
                </div>
              </div>

              {job.applyUrl && (
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  {t("applyNow")}
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ── Content ───────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            <div className="space-y-10">
              {job.description && (
                <div>
                  <h2 className="mb-4 text-xl font-bold">{t("aboutRole")}</h2>
                  <MarkdownContent content={job.description} />
                </div>
              )}

              {job.requirements && (
                <div>
                  <h2 className="mb-4 text-xl font-bold">{t("requirements")}</h2>
                  <MarkdownContent content={job.requirements} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-4 font-semibold">{t("jobDetails")}</h3>
                <dl className="space-y-3 text-sm">
                  {job.department && (
                    <div>
                      <dt className="text-muted-foreground">{t("department")}</dt>
                      <dd className="font-medium">{job.department}</dd>
                    </div>
                  )}
                  {job.location && (
                    <div>
                      <dt className="text-muted-foreground">{t("location")}</dt>
                      <dd className="font-medium">{job.location}</dd>
                    </div>
                  )}
                  {job.type && (
                    <div>
                      <dt className="text-muted-foreground">{t("employmentType")}</dt>
                      <dd className="font-medium">{TYPE_LABELS[job.type] ?? job.type}</dd>
                    </div>
                  )}
                </dl>

                {job.applyUrl && (
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-semibold text-primary-foreground transition hover:bg-primary/90"
                  >
                    {t("applyNow")}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-2 font-semibold">{t("notRightRole")}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{t("notRightRoleDescription")}</p>
                <Link
                  href="/careers"
                  className="text-sm font-medium text-primary transition hover:underline"
                >
                  {t("viewAllRoles")} →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
