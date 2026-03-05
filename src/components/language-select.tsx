"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Globe, Check } from "lucide-react";

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
        <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 bg-card text-foreground hover:bg-accent hover:text-accent-foreground active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1">
          <Globe className="h-4 w-4" />
          <span className="hidden xs:inline">{languageLabels[selectedLocale]}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-48">
          {locales.map((value) => (
            <DropdownMenuItem
              key={value}
              onClick={() => handleChange(value)}
              className="cursor-pointer flex items-center justify-between transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <span className={selectedLocale === value ? "font-semibold" : ""}>
                {languageLabels[value]}
              </span>
              {selectedLocale === value && (
                <Check className="ms-3 h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="w-full space-y-3">
      {showLabel && (
        <label className="block text-sm font-semibold text-foreground">
          {languageLabels[selectedLocale]}
        </label>
      )}
      <Select value={selectedLocale} onValueChange={(value) => handleChange(value as Locale)}>
        <SelectTrigger
          className="w-full mb-0 px-4 rounded-lg border border-border bg-card text-foreground shadow-sm transition-all duration-200 hover:border-border hover:bg-card focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
          aria-label={languageLabels[selectedLocale]}
        >
          <div className="flex items-center gap-3 justify-between w-full">
            <div className="flex items-center gap-3 flex-1">
              <div className="p-1.5 rounded-md bg-accent">
                <Globe className="h-4 w-4 text-accent-foreground" />
              </div>
              <SelectValue className="text-sm font-medium" />
            </div>
          </div>
        </SelectTrigger>
        <SelectContent className="min-w-56 bg-background">
          {locales.map((value) => (
            <SelectItem
              key={value}
              value={value}
              className="cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <div className="flex items-center gap-3">
                <span className={selectedLocale === value ? "font-semibold text-primary" : "font-medium"}>
                  {languageLabels[value]}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
