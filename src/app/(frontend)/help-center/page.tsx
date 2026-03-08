import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/landing/footer-section";
import { CategoryIcon } from "@/components/help-center/category-icon";
import { FaqAccordion } from "@/components/help-center/faq-accordion";
import { HelpSearchBox } from "@/components/help-center/help-search-box";
import { defaultLocale } from "@/lib/i18n";
import { sanityFetch } from "@/sanity/lib/live";
import {
  getHelpCategoriesQuery,
  getFeaturedFaqsQuery,
  getSiteSettingsQuery,
} from "@/sanity/lib/queries";

export default async function HelpCenterPage() {
  const locale = await getLocale();
  const t = await getTranslations("helpCenter");

  const [{ data: categories }, { data: faqs }, { data: settings }] = await Promise.all([
    sanityFetch({
      query: getHelpCategoriesQuery,
      params: { locale, defaultLocale },
    }),
    sanityFetch({
      query: getFeaturedFaqsQuery,
      params: { locale, defaultLocale },
    }),
    sanityFetch({ query: getSiteSettingsQuery }),
  ]);

  const popularLinks = [
    { label: t("popularLinks.0.label"), query: t("popularLinks.0.query") },
    { label: t("popularLinks.1.label"), query: t("popularLinks.1.query") },
    { label: t("popularLinks.2.label"), query: t("popularLinks.2.query") },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 bg-primary/5" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/10 to-transparent" />

          <div className="relative mx-auto max-w-[960px] px-4 text-center">
            <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
              {t("heroTitle")}
            </h1>
            <p className="mx-auto mb-10 max-w-xl text-base text-muted-foreground md:text-lg">
              {t("heroDescription")}
            </p>

            <HelpSearchBox
              placeholder={t("searchPlaceholder")}
              searchLabel={t("searchButton")}
              popularLabel={t("popularLabel")}
              popularLinks={popularLinks}
            />
          </div>
        </section>

        {/* ── Categories ────────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-[960px] px-4 py-16">
          <h2 className="mb-8 text-2xl font-bold text-foreground">
            {t("browseCategories")}
          </h2>

          {!categories || categories.length === 0 ? (
            <p className="text-muted-foreground">{t("noCategories")}</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map(
                (cat: {
                  _id: string;
                  title: string | null;
                  slug: string | null;
                  description: string | null;
                  icon: string | null;
                }) => (
                  <Link
                    key={cat._id}
                    href={`/help-center/${cat.slug}`}
                    className="group flex cursor-pointer flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                      <CategoryIcon icon={cat.icon} />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-card-foreground">
                      {cat.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {cat.description}
                    </p>
                  </Link>
                )
              )}
            </div>
          )}
        </section>

        {/* ── Top FAQs ──────────────────────────────────────────── */}
        {faqs && faqs.length > 0 && (
          <section className="border-y border-border bg-card py-16">
            <div className="mx-auto max-w-[960px] px-4">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  {t("topFaqs")}
                </h2>
                <Link
                  href="/help-center/faqs"
                  className="text-sm font-bold text-primary hover:underline"
                >
                  {t("viewAllFaqs")}
                </Link>
              </div>

              <FaqAccordion
                items={faqs.map(
                  (f: {
                    _id: string;
                    question: string | null;
                    answer: string | null;
                  }) => f
                )}
              />
            </div>
          </section>
        )}

        {/* ── Contact ───────────────────────────────────────────── */}
        <section className="bg-background py-16">
          <div className="mx-auto max-w-[960px] px-4 text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              {t("stillNeedHelp")}
            </h2>
            <p className="mb-8 text-muted-foreground">
              {t("supportDescription")}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={settings?.whatsapp ?? "https://wa.me/"}
                className="flex h-14 w-full min-w-[200px] items-center justify-center gap-3 rounded-xl bg-[#25d366] font-bold text-white transition-all hover:opacity-90 sm:w-auto"
              >
                <MessageCircle className="h-6 w-6" />
                {t("whatsappSupport")}
              </a>
              <a
                href={settings?.supportEmail ? `mailto:${settings.supportEmail}` : "mailto:support@postam.com"}
                className="flex h-14 w-full min-w-[200px] items-center justify-center gap-3 rounded-xl border border-border bg-card font-bold text-foreground transition-all hover:bg-muted sm:w-auto"
              >
                <Mail className="h-5 w-5 text-primary" />
                {t("emailSupport")}
              </a>
            </div>

          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
