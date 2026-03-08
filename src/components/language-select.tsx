"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Check, ChevronDown } from "lucide-react";

import {
  defaultLocale,
  languageLabels,
  localeCookie,
  locales,
  Locale,
  rtlLocales,
} from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const localeCodes: Record<Locale, string> = {
  en: "EN",
  ar: "AR",
  tr: "TR",
};

interface LanguageSelectProps {
  showLabel?: boolean;
  compact?: boolean;
}

export function LanguageSelect({ showLabel = false, compact = false }: LanguageSelectProps) {
  const router = useRouter();
  const locale = useLocale() as Locale;
  const selectedLocale = locales.includes(locale) ? locale : defaultLocale;

  const handleChange = (nextLocale: Locale) => {
    document.cookie = `${localeCookie}=${nextLocale}; path=/; max-age=31536000`;
    document.documentElement.lang = nextLocale;
    document.documentElement.dir = rtlLocales.has(nextLocale) ? "rtl" : "ltr";
    router.refresh();
  };

  if (compact) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1.5 text-sm font-medium shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-accent hover:shadow-md active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1">
          <ChevronDown className="h-3 w-3 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="min-w-44 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-xl"
        >
          <div className="px-2 py-1.5 mb-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Language
            </p>
          </div>
          {locales.map((value) => {
            const isSelected = selectedLocale === value;
            return (
              <DropdownMenuItem
                key={value}
                onClick={() => handleChange(value)}
                className={`cursor-pointer flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition-all duration-150 focus:bg-accent ${
                  isSelected
                    ? "bg-primary/8 text-primary font-semibold"
                    : "text-foreground hover:bg-accent"
                }`}
              >
                <span className="flex-1">{languageLabels[value]}</span>
                <span className="text-[10px] font-bold tracking-wider text-muted-foreground/70">
                  {localeCodes[value]}
                </span>
                {isSelected && (
                  <Check className="h-3.5 w-3.5 text-primary" />
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="w-full space-y-2">
      {showLabel && (
        <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Language
        </label>
      )}
      <Select value={selectedLocale} onValueChange={(value) => handleChange(value as Locale)}>
        <SelectTrigger
          className="w-full rounded-xl border border-border bg-card px-4 text-foreground shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
          aria-label={languageLabels[selectedLocale]}
        >
          <div className="flex items-center gap-3 flex-1">
            <SelectValue className="text-sm font-medium" />
          </div>
        </SelectTrigger>
        <SelectContent className="min-w-52 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-xl">
          <div className="px-2 py-1.5 mb-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Language
            </p>
          </div>
          {locales.map((value) => {
            const isSelected = selectedLocale === value;
            return (
              <SelectItem
                key={value}
                value={value}
                className={`cursor-pointer rounded-lg transition-all duration-150 focus:bg-accent ${
                  isSelected ? "bg-primary/8 text-primary" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isSelected ? "font-semibold" : "font-medium"}>
                    {languageLabels[value]}
                  </span>
                  <span className="ms-1 text-[10px] font-bold tracking-widest text-muted-foreground/60">
                    {localeCodes[value]}
                  </span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
