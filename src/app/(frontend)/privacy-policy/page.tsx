import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/landing/footer-section";
import { MarkdownContent } from "@/components/markdown-content";
import { defaultLocale } from "@/lib/i18n";
import { formatDate } from "@/lib/date-utils";
import { sanityFetch } from "@/sanity/lib/live";
import { getActiveLegalDocQuery, getLegalDocVersionsQuery } from "@/sanity/lib/queries";

export default async function PrivacyPolicyPage() {
  const locale = await getLocale();
  const t = await getTranslations("legal");

  const [{ data: doc }, { data: versions }] = await Promise.all([
    sanityFetch({
      query: getActiveLegalDocQuery,
      params: { docType: "privacy-policy", locale, defaultLocale },
    }),
    sanityFetch({
      query: getLegalDocVersionsQuery,
      params: { docType: "privacy-policy", locale, defaultLocale },
    }),
  ]);

  if (!doc) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
          {/* Header */}
          <div className="mb-10 border-b border-border pb-8">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {t("legal")}
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {doc.title ?? t("privacyPolicy")}
            </h1>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>
                {t("version")} {doc.version}
              </span>
              <span>·</span>
              <span>
                {t("effectiveDate")}:{" "}
                {formatDate(doc.effectiveDate, locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Content */}
          {doc.content ? (
            <MarkdownContent content={doc.content} />
          ) : (
            <p className="text-muted-foreground">{t("noContent")}</p>
          )}

          {/* Version history */}
          {versions && versions.length > 1 && (
            <div className="mt-16 border-t border-border pt-8">
              <h2 className="mb-4 text-lg font-semibold">{t("versionHistory")}</h2>
              <ul className="space-y-3">
                {versions.map((v: { _id: string; version: string; effectiveDate: string | null; isActive: boolean | null; title: string | null; changelog: string | null }) => (
                  <li key={v._id} className="flex flex-wrap items-baseline gap-3 text-sm">
                    <span className={`font-medium${v.isActive ? " text-primary" : " text-muted-foreground"}`}>
                      v{v.version}
                      {v.isActive && (
                        <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                          {t("current")}
                        </span>
                      )}
                    </span>
                    <span className="text-muted-foreground">
                      {formatDate(v.effectiveDate, locale, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    {v.changelog && (
                      <span className="text-muted-foreground">— {v.changelog}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Back link */}
          <div className="mt-12">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← {t("backHome")}
            </Link>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
