import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ChevronRight, ArrowLeft, FileText } from "lucide-react";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/landing/footer-section";
import { MarkdownContent } from "@/components/markdown-content";
import { CategoryIcon } from "@/components/help-center/category-icon";
import { ArticleFeedback } from "@/components/help-center/article-feedback";
import { defaultLocale } from "@/lib/i18n";
import { sanityFetch } from "@/sanity/lib/live";
import {
  getHelpArticleBySlugQuery,
  getHelpCategoryBySlugQuery,
  getHelpArticlesByCategoryQuery,
  getSiteSettingsQuery,
} from "@/sanity/lib/queries";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export default async function HelpArticlePage({ params }: PageProps) {
  const { category: categorySlug, slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("helpCenter");

  const [
    { data: article },
    { data: category },
    { data: categoryArticles },
    { data: settings },
  ] = await Promise.all([
    sanityFetch({
      query: getHelpArticleBySlugQuery,
      params: { slug, locale, defaultLocale },
    }),
    sanityFetch({
      query: getHelpCategoryBySlugQuery,
      params: { slug: categorySlug, locale, defaultLocale },
    }),
    sanityFetch({
      query: getHelpArticlesByCategoryQuery,
      params: { categorySlug, locale, defaultLocale },
    }),
    sanityFetch({ query: getSiteSettingsQuery }),
  ]);

  if (!article) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <div className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col gap-12 px-4 py-8 md:flex-row md:px-10 lg:px-16">
        {/* ── Sidebar ─────────────────────────────────────────── */}
        <aside className="w-full flex-shrink-0 md:w-64">
          <div className="sticky top-24 space-y-6">
            {/* Back link */}
            <Link
              href={`/help-center/${categorySlug}`}
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              {category?.title ?? t("backToCategory")}
            </Link>

            {/* Category article list */}
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {t("inThisCategory")}
              </p>
              <nav className="flex flex-col gap-1">
                {categoryArticles?.map(
                  (a: {
                    _id: string;
                    title: string | null;
                    slug: string | null;
                  }) => {
                    const isActive = a.slug === slug;
                    return (
                      <Link
                        key={a._id}
                        href={`/help-center/${categorySlug}/${a.slug}`}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                          isActive
                            ? "bg-primary/10 font-semibold text-primary"
                            : "font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <FileText className="h-4 w-4 flex-shrink-0" />
                        {a.title}
                      </Link>
                    );
                  }
                )}
              </nav>
            </div>

            {/* Need more help card */}
            <div className="rounded-xl border border-primary/10 bg-primary/5 p-4">
              <p className="mb-1 text-sm font-semibold text-primary">
                {t("needMoreHelp")}
              </p>
              <p className="mb-3 text-xs text-muted-foreground">
                {t("cantFind")}
              </p>
              <a
                href={settings?.whatsapp ?? "https://wa.me/"}
                className="block w-full rounded-lg bg-primary py-2 text-center text-xs font-bold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t("chatWithUs")}
              </a>
            </div>
          </div>
        </aside>

        {/* ── Article ─────────────────────────────────────────── */}
        <article className="min-w-0 flex-1">
          {/* Breadcrumbs */}
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/help-center" className="hover:text-primary">
              {t("backToHelp")}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              href={`/help-center/${categorySlug}`}
              className="hover:text-primary"
            >
              {category?.title ?? categorySlug}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{article.title}</span>
          </nav>

          {/* Title & excerpt */}
          <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-4xl">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
              {article.excerpt}
            </p>
          )}

          {/* Content */}
          {article.content ? (
            <MarkdownContent content={article.content} />
          ) : (
            <p className="text-muted-foreground">{t("noContent")}</p>
          )}

          {/* Feedback */}
          <div className="mt-12">
            <ArticleFeedback
              helpfulCount={article.helpfulCount ?? 0}
              helpfulQuestion={t("helpfulQuestion")}
              helpfulYes={t("helpfulYes")}
              helpfulNo={t("helpfulNo")}
            />
          </div>

          {/* Support CTA */}
          <div className="relative mt-12 overflow-hidden rounded-2xl bg-foreground p-8">
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative z-10 flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
              <div>
                <h2 className="mb-2 text-2xl font-bold text-background">
                  {t("stillHaveQuestions")}
                </h2>
                <p className="text-muted-foreground">{t("supportCta")}</p>
              </div>
              <a
                href={settings?.whatsapp ?? "https://wa.me/"}
                className="flex-shrink-0 rounded-xl bg-primary px-8 py-4 font-bold text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:bg-primary/90"
              >
                {t("contactSupport")}
              </a>
            </div>
          </div>

          {/* Related articles */}
          {article.relatedArticles && article.relatedArticles.length > 0 && (
            <div className="mt-16">
              <h3 className="mb-6 text-lg font-bold text-foreground">
                {t("relatedArticles")}
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {article.relatedArticles.map(
                  (rel: {
                    _id: string;
                    title: string | null;
                    slug: string | null;
                    excerpt: string | null;
                  }) => (
                    <Link
                      key={rel._id}
                      href={`/help-center/${article.category?.slug ?? categorySlug}/${rel.slug}`}
                      className="group rounded-xl border border-border p-4 transition-all hover:border-primary/50"
                    >
                      <h4 className="mb-1 font-semibold text-foreground transition-colors group-hover:text-primary">
                        {rel.title}
                      </h4>
                      {rel.excerpt && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {rel.excerpt}
                        </p>
                      )}
                    </Link>
                  )
                )}
              </div>
            </div>
          )}
        </article>
      </div>

      <FooterSection />
    </div>
  );
}
