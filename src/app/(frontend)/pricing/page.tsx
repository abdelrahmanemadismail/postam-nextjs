import { Check, Minus } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/landing/footer-section";
import { defaultLocale } from "@/lib/i18n";
import { sanityFetch } from "@/sanity/lib/live";
import { getPricingPageQuery } from "@/sanity/lib/queries";

type PricingPlan = {
  name?: string | null;
  description?: string | null;
  price?: number | null;
  currency?: string | null;
  billingPeriod?: string | null;
  features?: Array<{ text?: string | null } | null> | null;
  ctaText?: string | null;
  ctaHref?: string | null;
  highlighted?: boolean | null;
};

type ComparisonRow = {
  feature?: string | null;
  values?:
    | Array<{
      planIndex?: number | null;
      value?: string | null;
      isIncluded?: boolean | null;
    } | null>
    | null;
};

export async function generateMetadata() {
  const t = await getTranslations("pricing");
  return {
    title: `Pricing — Postam`,
    description: t("metaDescription"),
  };
}

export default async function PricingPage() {
  const locale = await getLocale();
  const t = await getTranslations("pricing");

  const { data } = await sanityFetch({
    query: getPricingPageQuery,
    params: { locale, defaultLocale },
  });

  const plans: PricingPlan[] = data?.plans ?? [];
  const comparisonRows: ComparisonRow[] = data?.comparisonTable?.rows ?? [];

  const getCellForPlan = (row: ComparisonRow, planIdx: number) =>
    (row.values ?? []).find((value) => value?.planIndex === planIdx);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70 py-12 text-primary-foreground sm:py-20 lg:py-24">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary-foreground/5" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-primary-foreground/5" />

          <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <span className="mb-4 inline-block rounded-full bg-primary-foreground/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
              {t("badge")}
            </span>
            <h1 className="text-2xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {data?.heroHeading ?? t("heroFallbackTitle")}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/80 sm:mt-6 sm:text-lg">
              {data?.heroSubheading ?? t("heroFallbackDescription")}
            </p>
          </div>
        </section>

        <section className="py-10 sm:py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold sm:mb-12 sm:text-3xl">
              {t("plansTitle")}
            </h2>

            {plans.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground sm:p-12">
                {t("noPlans")}
              </div>
            ) : (
              <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
                {plans.map((plan, idx) => (
                  <article
                    key={`${plan.name ?? "plan"}-${idx}`}
                    className={`rounded-2xl border bg-card p-5 sm:p-6 shadow-sm transition hover:shadow-md ${
                      plan.highlighted ? "border-primary ring-1 ring-primary/20" : "border-border"
                    }`}
                  >
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    {plan.description && (
                      <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                    )}

                    <div className="mt-5 flex items-end gap-1">
                      <span className="text-3xl font-extrabold text-primary">
                        {typeof plan.price === "number"
                          ? `${plan.currency ?? "$"}${plan.price}`
                          : t("customPrice")}
                      </span>
                      {plan.billingPeriod && (
                        <span className="pb-1 text-sm text-muted-foreground">{plan.billingPeriod}</span>
                      )}
                    </div>

                    <ul className="mt-5 space-y-2">
                      {(plan.features ?? []).map((feature, featureIdx) => (
                        <li key={featureIdx} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span className="text-muted-foreground">{feature?.text}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={plan.ctaHref ?? "#"}
                      className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                    >
                      {plan.ctaText ?? t("defaultPlanCta")}
                    </a>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="border-y border-border bg-muted/40 py-10 sm:py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold sm:mb-12 sm:text-3xl">
              {data?.comparisonTable?.title ?? t("comparisonTitle")}
            </h2>

            {plans.length === 0 || comparisonRows.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground sm:p-12">
                {t("noComparison")}
              </div>
            ) : (
              <>
                <div className="space-y-4 md:hidden">
                  {comparisonRows.map((row, rowIdx) => (
                    <article
                      key={`mobile-${row.feature ?? "row"}-${rowIdx}`}
                      className="rounded-2xl border border-border bg-card p-4 shadow-sm"
                    >
                      <h3 className="mb-3 text-sm font-semibold">{row.feature}</h3>
                      <div className="space-y-2">
                        {plans.map((plan, planIdx) => {
                          const cell = getCellForPlan(row, planIdx);

                          return (
                            <div
                              key={`mobile-row-${rowIdx}-plan-${planIdx}`}
                              className="flex items-center justify-between gap-3 rounded-lg border border-border/70 px-3 py-2"
                            >
                              <span className="text-xs font-medium text-muted-foreground">{plan.name}</span>
                              <span className="text-sm text-foreground">
                                {cell?.isIncluded ? (
                                  <Check className="h-4 w-4 text-primary" />
                                ) : cell?.value ? (
                                  cell.value
                                ) : (
                                  <Minus className="h-4 w-4 text-muted-foreground" />
                                )}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </article>
                  ))}
                </div>

                <div className="hidden overflow-x-auto rounded-2xl border border-border bg-card shadow-sm md:block">
                  <table className="min-w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border bg-background/60">
                        <th className="px-4 py-3 text-start font-semibold">{t("featureColumn")}</th>
                        {plans.map((plan, idx) => (
                          <th key={`${plan.name ?? "plan-col"}-${idx}`} className="px-4 py-3 text-center font-semibold">
                            {plan.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row, rowIdx) => (
                        <tr key={`${row.feature ?? "row"}-${rowIdx}`} className="border-b border-border/70 last:border-0">
                          <td className="px-4 py-3 font-medium">{row.feature}</td>
                          {plans.map((_, planIdx) => {
                            const cell = getCellForPlan(row, planIdx);

                            return (
                              <td key={`row-${rowIdx}-plan-${planIdx}`} className="px-4 py-3 text-center text-muted-foreground">
                                {cell?.isIncluded ? (
                                  <Check className="mx-auto h-4 w-4 text-primary" />
                                ) : cell?.value ? (
                                  <span>{cell.value}</span>
                                ) : (
                                  <Minus className="mx-auto h-4 w-4" />
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </section>

        <section className="py-10 sm:py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold sm:text-3xl">
              {data?.ctaSection?.heading ?? t("ctaFallbackHeading")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {data?.ctaSection?.description ?? t("ctaFallbackDescription")}
            </p>
            <a
              href={data?.ctaSection?.buttonLink ?? "/contact"}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90 sm:w-auto"
            >
              {data?.ctaSection?.buttonText ?? t("ctaFallbackButton")}
            </a>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}