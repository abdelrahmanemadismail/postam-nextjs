import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ChevronRight } from "lucide-react";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/landing/footer-section";
import { FaqAccordion } from "@/components/help-center/faq-accordion";
import { defaultLocale } from "@/lib/i18n";
import { sanityFetch } from "@/sanity/lib/live";
import { getAllFaqsQuery, getSiteSettingsQuery } from "@/sanity/lib/queries";

type FaqItem = {
  _id: string;
  question: string | null;
  answer: string | null;
  featured: boolean | null;
  order: number | null;
  category: {
    _id: string;
    title: string | null;
    slug: string | null;
  } | null;
};

export default async function AllFaqsPage() {
  const locale = await getLocale();
  const t = await getTranslations("helpCenter");

  const [{ data: faqs }, { data: settings }] = await Promise.all([
    sanityFetch({
      query: getAllFaqsQuery,
      params: { locale, defaultLocale },
    }),
    sanityFetch({ query: getSiteSettingsQuery }),
  ]);

  // Group FAQs by category
  const grouped = new Map<string, { label: string; slug: string | null; items: FaqItem[] }>();
  const uncategorized: FaqItem[] = [];

  for (const faq of (faqs ?? []) as FaqItem[]) {
    if (faq.category) {
      const key = faq.category._id;
      if (!grouped.has(key)) {
        grouped.set(key, {
          label: faq.category.title ?? "",
          slug: faq.category.slug,
          items: [],
        });
      }
      grouped.get(key)!.items.push(faq);
    } else {
      uncategorized.push(faq);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="mx-auto w-full max-w-[960px] flex-1 px-4 py-10">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/help-center" className="hover:text-primary">
            {t("backToHelp")}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">
            {t("topFaqs")}
          </span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            {t("topFaqs")}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {t("heroDescription")}
          </p>
        </div>

        {faqs && faqs.length === 0 && (
          <p className="text-muted-foreground">{t("noFaqs")}</p>
        )}

        {/* Grouped by category */}
        {Array.from(grouped.entries()).map(([, group]) => (
          <section key={group.label} className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">
                {group.label}
              </h2>
              {group.slug && (
                <Link
                  href={`/help-center/${group.slug}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Browse articles →
                </Link>
              )}
            </div>
            <FaqAccordion items={group.items} />
          </section>
        ))}

        {/* Uncategorized */}
        {uncategorized.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-bold text-foreground">General</h2>
            <FaqAccordion items={uncategorized} />
          </section>
        )}

        {/* Contact CTA */}
        <div className="mt-8 rounded-xl border border-border bg-muted/40 p-8 text-center">
          <h3 className="mb-2 text-lg font-bold text-foreground">
            {t("stillNeedHelp")}
          </h3>
          <p className="mb-6 text-sm text-muted-foreground">
            {t("supportDescription")}
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={settings?.whatsapp ?? "https://wa.me/"}
              className="flex h-11 min-w-[160px] items-center justify-center gap-2 rounded-lg bg-[#25d366] font-semibold text-white transition-opacity hover:opacity-90"
            >
              {t("whatsappSupport")}
            </a>
            <a
              href={settings?.supportEmail ? `mailto:${settings.supportEmail}` : "mailto:support@postam.com"}
              className="flex h-11 min-w-[160px] items-center justify-center gap-2 rounded-lg border border-border bg-card font-semibold text-foreground transition-colors hover:bg-muted"
            >
              {t("emailSupport")}
            </a>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
