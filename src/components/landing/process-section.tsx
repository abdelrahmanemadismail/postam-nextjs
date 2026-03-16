"use client";

import { useTranslations } from "next-intl";
import {
  User,
  Store,
  Package,
  PlaneTakeoff,
} from "lucide-react";

export function ProcessSection() {
  const t = useTranslations();

  const steps = (t.raw("process.steps") as Array<{ title: string; description: string }>).map(
    (step, index) => ({
      ...step,
      icon: [User, Store, Package, PlaneTakeoff][index],
      number: index + 1,
    })
  );

  return (
    <section className="border-y border-border bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-primary">
          {t("process.label")}
        </span>
        <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          {t("process.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
          {t("process.description")}
        </p>
        <div className="mt-10 grid gap-5 sm:mt-16 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition hover:border-primary/50 sm:p-6"
            >
              {/* background step number */}
              <span
                className={`pointer-events-none absolute -bottom-4 select-none text-[9rem] font-black leading-none text-foreground/[0.05] transition group-hover:text-primary/[0.09] ${
                  index % 2 === 1 ? "-top-4 -left-2 bottom-auto" : "-top-4 -right-2 bottom-auto"
                }`}
              >
                {step.number}
              </span>
              {/* step badge */}
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <step.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
