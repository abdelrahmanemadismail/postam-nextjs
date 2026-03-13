import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Quote, Star, StarHalf } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/live";
import { getFeaturedTestimonialsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { defaultLocale } from "@/lib/i18n";
import { resolveStr } from "@/lib/resolve-str";

export async function StoriesSection() {
  const t = await getTranslations();
  const locale = await getLocale();
  const { data: testimonials } = await sanityFetch({
    query: getFeaturedTestimonialsQuery,
    params: { locale, defaultLocale },
  });

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="bg-background py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            {t("stories.title")}
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {t("stories.subtitle")}
          </p>
        </div>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => {
            const rating = testimonial.rating ?? 5;
            const fullStars = Math.floor(rating);
            const hasHalf = rating % 1 >= 0.5;
            const emptyStars = Math.max(0, 5 - fullStars - (hasHalf ? 1 : 0));

            return (
              <div
                key={testimonial._id}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: fullStars }).map((_, i) => (
                      <Star key={`full-${testimonial._id}-${i}`} className="h-4 w-4 fill-current" />
                    ))}
                    {hasHalf && <StarHalf className="h-4 w-4 fill-current" />}
                    {Array.from({ length: emptyStars }).map((_, i) => (
                      <Star
                        key={`empty-${testimonial._id}-${i}`}
                        className="h-4 w-4 text-muted-foreground/40"
                      />
                    ))}
                  </div>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    {rating.toFixed(1)}
                  </span>
                </div>

                <div className="mb-3 text-primary/35">
                  <Quote className="h-5 w-5" />
                </div>

                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{resolveStr(testimonial.quote)}&rdquo;
                </p>

                <div className="mt-auto flex items-center gap-3 sm:gap-4">
                  {testimonial.image ? (
                    <Image
                      alt={t("stories.portraitAlt", { name: testimonial.name })}
                      src={urlFor(testimonial.image).width(96).height(96).url()}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover ring-1 ring-border"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary ring-1 ring-primary/25">
                      {testimonial.name?.slice(0, 2).toUpperCase() ?? "??"}
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{testimonial.name}</h4>
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
