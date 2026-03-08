"use client";

import { useState, useTransition } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface HelpSearchBoxProps {
  placeholder: string;
  searchLabel: string;
  popularLabel: string;
  popularLinks: { label: string; query: string }[];
}

export function HelpSearchBox({
  placeholder,
  searchLabel,
  popularLabel,
  popularLinks,
}: HelpSearchBoxProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleSearch = () => {
    if (!query.trim()) return;
    startTransition(() => {
      router.push(`/help-center?q=${encodeURIComponent(query.trim())}`);
    });
  };

  return (
    <div className="mx-auto max-w-[640px]">
      <div className="flex h-14 w-full items-stretch rounded-xl border border-border bg-card shadow-xl shadow-primary/5 transition-all focus-within:border-primary md:h-16">
        <div className="flex items-center justify-center pl-5 text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>
        <input
          className="flex-1 border-none bg-transparent px-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0"
          placeholder={placeholder}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <div className="flex items-center pr-2">
          <button
            className="flex h-10 items-center gap-2 rounded-lg bg-primary px-6 font-bold text-primary-foreground transition-all hover:bg-primary/90 md:h-12"
            onClick={handleSearch}
          >
            {searchLabel}
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
        <span>{popularLabel}</span>
        {popularLinks.map((link) => (
          <button
            key={link.query}
            className="text-primary hover:underline"
            onClick={() =>
              router.push(`/help-center?q=${encodeURIComponent(link.query)}`)
            }
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
}
