"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock3 } from "lucide-react";
import { useRouter } from "next/navigation";

type BlogCardProps = {
  post: {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    publishedAt: string;
    bodyText: string;
    mainImage?: unknown;
    categories: Array<{
      _id: string;
      title: string;
      slug: string;
    }>;
  };
  imageUrl: string | null;
  readTime: number;
  locale: string;
  minReadLabel: string;
};

function formatDate(
  dateString: string | null | undefined,
  locale: string,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!dateString) {
    return "";
  }

  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleDateString(locale, options);
  } catch {
    return "";
  }
}

export function BlogCard({
  post,
  imageUrl,
  readTime,
  locale,
  minReadLabel,
}: BlogCardProps) {
  const router = useRouter();

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const categorySlug = post.categories[0]?.slug;
    if (categorySlug) {
      router.push(`/blog?category=${categorySlug}`);
    }
  };

  return (
    <Link
      href={post.slug ? `/blog/${post.slug}` : "#"}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-video bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title || "Post image"}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        ) : null}

        {post.categories[0]?.title && post.categories[0]?.slug ? (
          <button
            onClick={handleCategoryClick}
            className="absolute left-3 top-3 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-semibold transition hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            {post.categories[0].title}
          </button>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-xl font-bold leading-tight">
          {post.title}
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
          <time>
            {formatDate(post.publishedAt, locale, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          <span className="inline-flex items-center gap-1">
            <Clock3 className="h-3.5 w-3.5" />
            {readTime} {minReadLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}
