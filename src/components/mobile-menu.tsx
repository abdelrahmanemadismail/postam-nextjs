"use client";

import { useTranslations } from "next-intl";
import {
  Heart,
  ShoppingBag,
  User,
  BookOpen,
  Zap,
  Newspaper,
  ArrowRight,
} from "lucide-react";

import { LanguageSelect } from "@/components/language-select";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface MobileMenuProps {
  onClose: () => void;
  isOpen: boolean;
}

export function MobileMenu({ onClose, isOpen }: MobileMenuProps) {
  const t = useTranslations();

  const MenuItem = ({ icon: Icon, label, isPrimary = false, ...props }: any) => (
    <a
      onClick={onClose}
      className={`group relative flex items-center gap-3 px-4 py-4 text-sm font-medium transition-all duration-250 overflow-hidden ${
        isPrimary
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground"
      }`}
      {...props}
    >
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 transition-all duration-250 ${
        isPrimary
          ? "bg-gradient-to-r from-primary/8 to-primary/4"
          : "bg-gradient-to-r from-accent/0 group-hover:from-accent/50"
      }`} />

      {/* Content */}
      <div className="relative z-10 flex items-center gap-3 flex-1">
        {Icon && (
          <div className={`relative ${isPrimary ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
            <Icon className="h-5 w-5 transition-all duration-250 group-hover:scale-110" />
            {isPrimary && (
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
            )}
          </div>
        )}
        <span className="flex-1">{label}</span>
      </div>

      {/* Right accent */}
      {isPrimary && (
        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-250 translate-x-1 group-hover:translate-x-0" />
      )}

      {/* Bottom border accent on hover */}
      <div className={`absolute bottom-0 left-4 right-4 h-0.5 transition-all duration-250 ${
        isPrimary
          ? "bg-gradient-to-r from-primary/60 to-primary/20 scale-x-0 group-hover:scale-x-100 origin-left"
          : "bg-border scale-x-0 group-hover:scale-x-100 origin-left"
      }`} />
    </a>
  );

  const SectionHeader = ({ title, icon: Icon }: { title: string; icon?: any }) => (
    <div className="px-3 py-2 flex items-center gap-3">
      {Icon && (
        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      )}
      <div className="flex-1">
        <p className="text-xs font-black uppercase tracking-widest text-foreground">
          {title}
        </p>
      </div>
      <div className="flex-shrink-0 h-0.5 w-8 bg-gradient-to-r from-primary/60 to-primary/20" />
    </div>
  );

  const SectionCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`rounded-xl border transition-all duration-250 shadow-sm hover:shadow-md ${className}`}>
      {children}
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <SheetContent side="top" className="w-full border-none bg-gradient-to-b from-background to-background/98 p-0 max-h-[90vh] overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5 pb-44">
          {/* Quick Actions */}
          <div className="space-y-3">
            <SectionHeader title={t("nav.quick")} icon={ShoppingBag} />
            <SectionCard className="bg-gradient-to-br from-primary/12 via-primary/6 to-transparent border-primary/25 divide-y divide-primary/15 space-y-0 overflow-hidden">
              <MenuItem icon={ShoppingBag} label={t("nav.orders")} href="#" isPrimary />
              <MenuItem icon={Heart} label={t("nav.favorites")} href="#" isPrimary />
            </SectionCard>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3 pt-2">
            <SectionHeader title={t("nav.explore")} icon={BookOpen} />
            <SectionCard className="bg-gradient-to-br from-card to-card/80 border-border divide-y divide-border space-y-0 overflow-hidden">
              <MenuItem icon={BookOpen} label={t("nav.howItWorks")} href="#" />
              <MenuItem icon={Zap} label={t("nav.pricing")} href="#" />
              <MenuItem icon={Newspaper} label={t("nav.blog")} href="#" />
            </SectionCard>
          </div>

          {/* Settings */}
          <div className="space-y-3 pt-4">
            <SectionHeader title={t("nav.settings")} icon={Zap} />
            <SectionCard className="bg-gradient-to-br from-card to-card/80 border-border p-0 overflow-hidden">
              <div className="divide-y divide-border">
                <div className="px-4 py-4 flex items-center justify-between hover:bg-accent/50 transition-colors duration-250">
                  <span className="text-sm font-semibold text-foreground">
                    {t("nav.theme")}
                  </span>
                  <ThemeToggle />
                </div>
                <div className="px-4 py-4 space-y-3">
                  <label className="block text-xs font-black uppercase tracking-widest text-foreground">
                    {t("nav.languageLabel")}
                  </label>
                  <LanguageSelect />
                </div>
              </div>
            </SectionCard>
          </div>
        </div>

        {/* Fixed Bottom Auth Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/99 to-transparent px-4 sm:px-6 py-5 space-y-3 pointer-events-none border-t border-border">
          <div className="pointer-events-auto space-y-2.5">
            <Button
              variant="outline"
              className="w-full justify-center gap-2 py-6 h-auto font-semibold text-sm transition-all duration-250 hover:bg-accent hover:text-accent-foreground hover:shadow-md active:scale-95"
              onClick={onClose}
            >
              <User className="h-5 w-5" />
              {t("nav.login")}
            </Button>
            <Button
              className="w-full justify-center gap-2 py-6 h-auto font-semibold text-sm bg-gradient-to-r from-primary to-primary/80 hover:shadow-xl hover:shadow-primary/50 transition-all duration-250 hover:-translate-y-1 active:translate-y-0 text-primary-foreground"
              onClick={onClose}
            >
              {t("nav.signUp")}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
