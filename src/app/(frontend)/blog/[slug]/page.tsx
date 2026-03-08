import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock3 } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";


import { Header } from "@/components/header";
import { FooterSection } from "@/components/landing/footer-section";
import { Button } from "@/components/ui/button";
import { MarkdownContent } from "@/components/markdown-content";
import { defaultLocale } from "@/lib/i18n";
import { estimateReadTime } from "@/lib/read-time";
import { formatDate } from "@/lib/date-utils";
import { urlFor } from "@/sanity/lib/image";
import { getPostBySlugQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

type BlogPostDetail = {
  _id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  publishedAt?: string;
  bodyText?: string;
  body?: string;
  mainImage?: unknown;
  categories?: { _id: string; title?: string; slug?: string }[];
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const locale = await getLocale();
  const t = await getTranslations("blog");
  const { slug } = await params;

  const { data } = await sanityFetch({
    query: getPostBySlugQuery,
    params: {
      slug,
      locale,
      defaultLocale,
    },
  });

  const post = data as BlogPostDetail | null;

  if (!post) {
    notFound();
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1440).height(810).fit("crop").url()
    : null;
  const readTime = estimateReadTime(post.bodyText ?? "");

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <article className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
          <Button asChild variant="ghost" className="mb-6 px-0 text-muted-foreground">
            <Link href="/blog">← {t("backToBlog")}</Link>
          </Button>

          <div className="mb-5 flex flex-wrap gap-2">
            {post.categories?.map((item) =>
              item.slug ? (
                <Link
                  key={item._id}
                  href={`/blog?category=${item.slug}`}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {item.title}
                </Link>
              ) : null
            )}
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
          {post.excerpt ? <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p> : null}

          <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
            <time>
              {formatDate(post.publishedAt, locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-4 w-4" />
              {readTime} {t("minRead")}
            </span>
          </div>

          {imageUrl ? (
            <div className="relative mt-8 aspect-video overflow-hidden rounded-xl border border-border">
              <Image src={imageUrl} alt={post.title ?? "Post image"} fill className="object-cover" />
            </div>
          ) : null}

          <MarkdownContent content={post.body ?? ""} />
        </article>
      </main>
      <FooterSection />
    </div>
  );
}
