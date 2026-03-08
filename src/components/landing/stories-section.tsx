import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Star, StarHalf } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/live";
import { getFeaturedTestimonialsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { defaultLocale } from "@/lib/i18n";

export async function StoriesSection() {
  const t = await getTranslations();
  const locale = await getLocale();
  const { data: testimonials } = await sanityFetch({
    query: getFeaturedTestimonialsQuery,
    params: { locale, defaultLocale },
  });

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground">
            {t("stories.title")}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t("stories.subtitle")}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => {
            const rating = testimonial.rating ?? 5;
            const fullStars = Math.floor(rating);
            const hasHalf = rating % 1 >= 0.5;
            return (
              <div
                key={testimonial._id}
                className="rounded-xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md"
              >
                {/* Stars */}
                <div className="mb-4 flex items-center gap-1 text-amber-400">
                  {Array.from({ length: fullStars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  {hasHalf && <StarHalf className="h-4 w-4 fill-current" />}
                </div>
                <p className="mb-6 text-sm text-muted-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  {testimonial.image ? (
                    <Image
                      alt={t("stories.portraitAlt", { name: testimonial.name })}
                      src={urlFor(testimonial.image).width(96).height(96).url()}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                      {testimonial.name?.slice(0, 2).toUpperCase() ?? "??"}
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">{testimonial.city}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
