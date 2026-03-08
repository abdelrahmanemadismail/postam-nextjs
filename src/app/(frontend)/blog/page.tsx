import Link from "next/link";
import { Search, ChevronDown, Mail } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/landing/footer-section";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog-card";
import { defaultLocale } from "@/lib/i18n";
import { estimateReadTime } from "@/lib/read-time";
import { buildSearchPattern } from "@/lib/search-utils";
import { formatDate } from "@/lib/date-utils";
import {
  getAllPostsQuery,
  getBlogCategoriesQuery,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";

type SearchParams = Promise<{
  q?: string;
  category?: string;
}>;

type BlogCategory = {
  _id: string;
  title: string;
  slug: string;
};

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  bodyText: string;
  mainImage?: unknown;
  categories: BlogCategory[];
};

const buildQueryString = (params: { q?: string; category?: string }) => {
  const query = new URLSearchParams();

  if (params.q) {
    query.set("q", params.q);
  }

  if (params.category) {
    query.set("category", params.category);
  }

  const value = query.toString();
  return value ? `?${value}` : "";
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const locale = await getLocale();
  const t = await getTranslations("blog");
  const resolvedSearchParams = await searchParams;

  const search = resolvedSearchParams.q?.trim() || "";
  const category = resolvedSearchParams.category?.trim() || "";
  const searchPattern = buildSearchPattern(search);

  const [{ data: postsData }, { data: categoriesData }] = await Promise.all([
    sanityFetch({
      query: getAllPostsQuery,
      params: {
        locale,
        defaultLocale,
        searchPattern,
        category,
      },
    }),
    sanityFetch({
      query: getBlogCategoriesQuery,
      params: {
        locale,
        defaultLocale,
      },
    }),
  ]);

  const categories = ((categoriesData ?? []) as Array<{
    _id: string;
    title?: unknown;
    slug?: unknown;
  }>)
    .map((item) => ({
      _id: item._id,
      title: typeof item.title === "string" ? item.title : "",
      slug: typeof item.slug === "string" ? item.slug : "",
    }))
    .filter((item) => Boolean(item.slug));

  const posts = ((postsData ?? []) as Array<{
    _id: string;
    title?: unknown;
    slug?: unknown;
    excerpt?: unknown;
    publishedAt?: unknown;
    bodyText?: unknown;
    mainImage?: unknown;
    categories?: Array<{
      _id: string;
      title?: unknown;
      slug?: unknown;
    }>;
  }>).map((item) => ({
    _id: item._id,
    title: typeof item.title === "string" ? item.title : "",
    slug: typeof item.slug === "string" ? item.slug : "",
    excerpt: typeof item.excerpt === "string" ? item.excerpt : "",
    publishedAt: typeof item.publishedAt === "string" ? item.publishedAt : "",
    bodyText: typeof item.bodyText === "string" ? item.bodyText : "",
    mainImage: item.mainImage,
    categories: (item.categories ?? [])
      .map((categoryItem) => ({
        _id: categoryItem._id,
        title: typeof categoryItem.title === "string" ? categoryItem.title : "",
        slug: typeof categoryItem.slug === "string" ? categoryItem.slug : "",
      }))
      .filter((categoryItem) => Boolean(categoryItem.slug)),
  }));

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border/70 py-16 sm:py-20">
          <div className="absolute inset-x-0 top-0 h-72 bg-primary/10 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              {t("badge")}
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {t("titlePrefix")} <span className="text-primary">{t("titleHighlight")}</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground sm:text-lg">
              {t("description")}
            </p>
          </div>
        </section>

        <section className="sticky top-16 z-30 border-y border-border bg-background/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
              <Link
                href={`/blog${buildQueryString({ q: search || undefined })}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  !category
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("allPosts")}
              </Link>
              {categories.map((item) => {
                const isActive = category === item.slug;
                return (
                  <Link
                    key={item._id}
                    href={`/blog${buildQueryString({ q: search || undefined, category: item.slug })}`}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>

            <form action="/blog" method="get" className="relative w-full max-w-sm">
              {category ? <input type="hidden" name="category" value={category} /> : null}
              <input
                type="text"
                name="q"
                defaultValue={search}
                placeholder={t("searchPlaceholder")}
                className="w-full rounded-full border border-input bg-card py-2 pl-4 pr-10 text-sm outline-none transition focus-visible:ring-[3px] focus-visible:ring-ring/50"
              />
              <button
                type="submit"
                aria-label={t("search")}
                className="absolute right-3 top-2.5 text-muted-foreground"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="mb-6 text-sm text-muted-foreground">
            {posts.length} {posts.length === 1 ? t("result") : t("results")}
          </p>

          {posts.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
              {t("noResults")}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const imageUrl = post.mainImage
                  ? urlFor(post.mainImage).width(960).height(540).fit("crop").url()
                  : null;
                const readTime = estimateReadTime(post.bodyText);

                return (
                  <BlogCard
                    key={post._id}
                    post={post}
                    imageUrl={imageUrl}
                    readTime={readTime}
                    locale={locale}
                    minReadLabel={t("minRead")}
                  />
                );
              })}
            </div>
          )}

          <div className="mt-14 text-center">
            <Button variant="outline" className="rounded-xl px-7">
              {t("loadMore")}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </section>

        <section className="border-y border-border bg-card">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="text-3xl font-bold">{t("newsletterTitle")}</h3>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {t("newsletterDescription")}
            </p>
            <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder={t("newsletterPlaceholder")}
                className="min-h-11 flex-1 rounded-lg border border-input bg-background px-4 text-sm outline-none transition focus-visible:ring-[3px] focus-visible:ring-ring/50"
              />
              <Button type="submit" className="min-h-11 px-6">
                {t("newsletterButton")}
              </Button>
            </form>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
