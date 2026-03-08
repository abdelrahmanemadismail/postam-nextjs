"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  _id: string;
  question: string | null;
  answer: string | null;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item._id;
        return (
          <div
            key={item._id}
            className="overflow-hidden rounded-lg border border-border bg-card"
          >
            <button
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-muted/50"
              onClick={() => setOpenId(isOpen ? null : item._id)}
            >
              <span className="font-semibold text-card-foreground">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            {isOpen && item.answer && (
              <div className="border-t border-border bg-muted/30 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
