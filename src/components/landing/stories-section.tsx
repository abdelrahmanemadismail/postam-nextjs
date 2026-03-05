"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Star, StarHalf, ArrowLeft, ArrowRight } from "lucide-react";

const testimonialImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB9nurP1VxeSHjZlAs_EiFE9umtYgIle6fMXH3SvVRuKkpq1sgAjmRooWZ7upeSfAkoEEDhbDtqNw65K4ooEz5DUm2Jo3H787_lPLi8t5niWgNnqIMfR1-3OIinmS8EpHQaiMtOUlcr6S0HbXQTmll2gxVk-uNNRrdnwxmsVQ3D5Ewp92XEU9VfxX0omGDzLxhPt6QR3h8v2p0RNzAqH0CBrkohr7andsgPG0mPUWkZUStzuXae1zbVVHnxl36APQGLAAenQucIaqlt",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCNsBEh8OinFRgG3vuh_wKLcI2Jgq6Pg_OHld6SCtBFjhGY5ilhPPCnHMxNoyYeEa_tLRqW6DIYJhSJb3g34R4Gyicc5Z2h_rR4aQuCwykbbfGQuNvxWeT6wyFbpKTd8jSvV3Quc9vjxQEJfH3QqTRptvijM6XJvt-owNiB2Ep3V3tSfHTE4gMEY7HsRkwX438TJUBPq0dCV2JMLQkrIL6qpAdXVwEOMG6lDnOFzCJXu1NCUovRCrt2OH_0fmPENziK4b4lmqGnm3ZA",
  "",
];

export function StoriesSection() {
  const t = useTranslations();
  const testimonials = t.raw("testimonials") as Array<{
    quote: string;
    name: string;
    city: string;
  }>;
  const testimonialsWithImages = testimonials.map((testimonial, index) => ({
    ...testimonial,
    image: testimonialImages[index] ?? "",
  }));

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              {t("stories.title")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {t("stories.subtitle")}
            </p>
          </div>
          <div className="hidden gap-2 md:flex">
            <button className="rounded-full border border-border p-2 text-muted-foreground transition hover:bg-accent">
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            </button>
            <button className="rounded-full border border-border p-2 text-muted-foreground transition hover:bg-accent">
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonialsWithImages.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-1 text-amber-400">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <StarHalf className="h-4 w-4 fill-current" />
              </div>
              <p className="mb-6 text-sm text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                {testimonial.image ? (
                  <Image
                    alt={t("stories.portraitAlt", { name: testimonial.name })}
                    src={testimonial.image}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                    MK
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
          ))}
        </div>
      </div>
    </section>
  );
}
