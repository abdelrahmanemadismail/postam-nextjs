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
    })
  );

  return (
    <section className="border-y border-border bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-primary">
          {t("process.label")}
        </span>
        <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
          {t("process.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          {t("process.description")}
        </p>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.title}
              className="group rounded-2xl border border-border bg-card p-6 transition hover:border-primary/50"
            >
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
