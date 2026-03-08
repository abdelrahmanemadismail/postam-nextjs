import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ChevronRight, FileText } from "lucide-react";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/landing/footer-section";
import { CategoryIcon } from "@/components/help-center/category-icon";
import { defaultLocale } from "@/lib/i18n";
import { sanityFetch } from "@/sanity/lib/live";
import {
  getHelpCategoryBySlugQuery,
  getHelpArticlesByCategoryQuery,
} from "@/sanity/lib/queries";

interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function HelpCategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("helpCenter");

  const [{ data: category }, { data: articles }] = await Promise.all([
    sanityFetch({
      query: getHelpCategoryBySlugQuery,
      params: { slug: categorySlug, locale, defaultLocale },
    }),
    sanityFetch({
      query: getHelpArticlesByCategoryQuery,
      params: { categorySlug, locale, defaultLocale },
    }),
  ]);

  if (!category) notFound();

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
          <span className="text-foreground font-medium">{category.title}</span>
        </nav>

        {/* Category header */}
        <div className="mb-10 flex items-start gap-5">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CategoryIcon icon={category.icon} className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-foreground">
              {category.title}
            </h1>
            {category.description && (
              <p className="mt-2 text-muted-foreground">
                {category.description}
              </p>
            )}
          </div>
        </div>

        {/* Articles list */}
        {!articles || articles.length === 0 ? (
          <p className="text-muted-foreground">{t("noArticles")}</p>
        ) : (
          <div className="space-y-3">
            {articles.map(
              (article: {
                _id: string;
                title: string | null;
                slug: string | null;
                excerpt: string | null;
                featured: boolean | null;
              }) => (
                <Link
                  key={article._id}
                  href={`/help-center/${categorySlug}/${article.slug}`}
                  className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary hover:shadow-md"
                >
                  <div className="mt-0.5 flex-shrink-0 text-muted-foreground group-hover:text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                  <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
                </Link>
              )
            )}
          </div>
        )}
      </main>

      <FooterSection />
    </div>
  );
}
