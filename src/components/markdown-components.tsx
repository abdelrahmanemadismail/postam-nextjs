"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import type { Components } from "react-markdown";
import type React from "react";
import { useDirection } from "@/components/ui/direction";

export function useMarkdownComponents(): Components {
  const { theme } = useTheme();
  const direction = useDirection();

  return {
    // Headings
    h1: ({ children }) => (
      <h1 className="mb-6 mt-8 scroll-m-20 text-2xl font-bold tracking-tight first:mt-0 sm:text-4xl text-start">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 scroll-m-20 border-b border-border pb-2 text-xl font-semibold tracking-tight first:mt-0 sm:text-3xl text-start">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-4 mt-6 scroll-m-20 text-lg font-semibold tracking-tight sm:text-2xl text-start">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-3 mt-6 scroll-m-20 text-xl font-semibold tracking-tight text-start">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="mb-3 mt-6 scroll-m-20 text-lg font-semibold tracking-tight text-start">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="mb-3 mt-6 scroll-m-20 text-base font-semibold tracking-tight text-start">
        {children}
      </h6>
    ),

    // Paragraphs and text
    p: ({ children }) => (
      <p className="mb-6 leading-7 text-start [&:not(:first-child)]:mt-6">{children}</p>
    ),

    // Links
    a: ({ href, children }) => (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
      >
        {children}
      </a>
    ),

    // Lists
    ul: ({ children }) => (
      <ul
        className="my-6 list-disc space-y-2 text-start [&>li]:mt-2"
        style={{ marginInlineStart: "1.5rem" }}
      >
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol
        className="my-6 list-decimal space-y-2 text-start [&>li]:mt-2"
        style={{ marginInlineStart: "1.5rem" }}
      >
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-7">{children}</li>,

    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote
        className="my-6 italic text-muted-foreground text-start"
        style={{
          borderInlineStartWidth: "4px",
          borderInlineStartStyle: "solid",
          borderInlineStartColor: "hsl(var(--primary) / 0.3)",
          paddingInlineStart: "1.5rem",
        }}
      >
        {children}
      </blockquote>
    ),

    // Code blocks
    code: ({ inline, className, children }: { inline?: boolean; className?: string; children?: React.ReactNode }) => {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";

      if (!inline && language) {
        return (
          <div className="my-6 overflow-hidden rounded-lg border border-border" dir="ltr">
            <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
              <span className="text-xs font-medium uppercase text-muted-foreground">
                {language}
              </span>
            </div>
            <SyntaxHighlighter
              style={(theme === "dark" ? oneDark : oneLight) as any}
              language={language}
              PreTag="div"
              customStyle={{
                margin: 0,
                padding: "1rem",
                background: "transparent",
                fontSize: "0.875rem",
              }}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          </div>
        );
      }

      return (
        <code
          className="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm font-semibold"
          dir="ltr"
          style={{ unicodeBidi: "isolate" }}
        >
          {children}
        </code>
      );
    },

    // Pre (for code blocks without language)
    pre: ({ children }) => (
      <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-muted p-4" dir="ltr">
        {children}
      </pre>
    ),

    // Horizontal rule
    hr: () => <hr className="my-8 border-border" />,

    // Tables
    table: ({ children }) => (
      <div className="my-6 w-full overflow-x-auto" dir={direction}>
        <table className="w-full border-collapse border border-border">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-muted">{children}</thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr className="border-b border-border transition-colors hover:bg-muted/50">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="border border-border px-4 py-2 text-start font-semibold [&[align=center]]:text-center [&[align=right]]:text-right">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-border px-4 py-2 [&[align=center]]:text-center [&[align=right]]:text-right">
        {children}
      </td>
    ),

    // Images
    img: ({ src, alt }) => (
      <span className="my-6 block">
        <img
          src={src}
          alt={alt}
          className="rounded-lg border border-border"
          loading="lazy"
        />
      </span>
    ),

    // Strikethrough (GFM)
    del: ({ children }) => (
      <del className="text-muted-foreground line-through">{children}</del>
    ),

    // Task lists (GFM)
    input: ({ type, checked, disabled }) => {
      if (type === "checkbox") {
        return (
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className="h-4 w-4 rounded border-border"
            style={{ marginInlineEnd: "0.5rem" }}
            readOnly
          />
        );
      }
      return <input type={type} />;
    },

    // Strong/Bold
    strong: ({ children }) => (
      <strong className="font-bold">{children}</strong>
    ),

    // Emphasis/Italic
    em: ({ children }) => <em className="italic">{children}</em>,
  };
}
