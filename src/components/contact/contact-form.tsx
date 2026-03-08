"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("contactUs");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up to real endpoint
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card py-16 text-center shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Send className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-semibold">Message sent!</h3>
        <p className="max-w-xs text-sm text-muted-foreground">
          Thanks for reaching out. We&apos;ll get back to you within one business day.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormState({ name: "", email: "", subject: "", message: "" });
          }}
          className="mt-2 text-sm font-medium text-primary underline underline-offset-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name + Email */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            {t("labelName")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formState.name}
            onChange={handleChange}
            placeholder={t("placeholderName")}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/40 transition placeholder:text-muted-foreground focus:border-primary focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            {t("labelEmail")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formState.email}
            onChange={handleChange}
            placeholder={t("placeholderEmail")}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/40 transition placeholder:text-muted-foreground focus:border-primary focus:ring-2"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
          {t("labelSubject")}
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          value={formState.subject}
          onChange={handleChange}
          placeholder={t("placeholderSubject")}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/40 transition placeholder:text-muted-foreground focus:border-primary focus:ring-2"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          {t("labelMessage")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          value={formState.message}
          onChange={handleChange}
          placeholder={t("placeholderMessage")}
          className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/40 transition placeholder:text-muted-foreground focus:border-primary focus:ring-2"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3 font-semibold text-primary-foreground shadow transition hover:bg-primary/90 hover:shadow-md"
      >
        <Send className="h-4 w-4" />
        {t("submitButton")}
      </button>
    </form>
  );
}
