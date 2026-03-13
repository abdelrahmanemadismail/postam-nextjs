"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Heart,
  ShoppingBag,
  User,
  BookOpen,
  Zap,
  Newspaper,
  ArrowRight,
  X,
} from "lucide-react";

import { LanguageSelect } from "@/components/language-select";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle } from "@/components/ui/sheet";

interface MobileMenuProps {
  onClose: () => void;
  isOpen: boolean;
}

interface MenuItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isPrimary?: boolean;
  href: string;
  onClose: () => void;
}

function MenuItem({ icon: Icon, label, isPrimary = false, href, onClose }: MenuItemProps) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className={`group relative flex items-center gap-3 px-4 py-4 text-sm font-medium transition-all duration-200 overflow-hidden ${
        isPrimary
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {/* Background on hover */}
      <div className={`absolute inset-0 transition-all duration-200 ${
        isPrimary
          ? "bg-gradient-to-r from-primary/8 to-primary/4"
          : "opacity-0 group-hover:opacity-100 bg-accent/50"
      }`} />

      {/* Content */}
      <div className="relative z-10 flex items-center gap-3 flex-1">
        {Icon && (
          <div className={`relative ${isPrimary ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
            <Icon className="h-5 w-5 transition-all duration-200 group-hover:scale-110" />
            {isPrimary && (
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            )}
          </div>
        )}
        <span className="flex-1">{label}</span>
      </div>

      {/* Right accent */}
      {isPrimary && (
        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0" />
      )}

      {/* Bottom border accent on hover */}
      <div className={`absolute bottom-0 left-4 right-4 h-0.5 transition-all duration-200 ${
        isPrimary
          ? "bg-gradient-to-r from-primary/60 to-primary/20 scale-x-0 group-hover:scale-x-100 origin-left"
          : "bg-border scale-x-0 group-hover:scale-x-100 origin-left"
      }`} />
    </Link>
  );
}

function SectionHeader({
  title,
  icon: Icon,
}: {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
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
}

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border transition-all duration-200 shadow-sm hover:shadow-md ${className}`}>
      {children}
    </div>
  );
}

export function MobileMenu({ onClose, isOpen }: MobileMenuProps) {
  const t = useTranslations();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <SheetContent
        side="top"
        showCloseButton={false}
        className="w-full border-none bg-background p-0 max-h-[90vh] flex flex-col gap-0"
      >
        {/* Header with title and close button */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border">
          <SheetTitle className="text-base font-semibold text-foreground">Menu</SheetTitle>
          <SheetClose
            onClick={onClose}
            className="flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-5">
          {/* Quick Actions */}
          <div className="space-y-3">
            <SectionHeader title={t("nav.quick")} icon={ShoppingBag} />
            <SectionCard className="bg-gradient-to-br from-primary/12 via-primary/6 to-transparent border-primary/25 divide-y divide-primary/15 overflow-hidden">
              <MenuItem icon={ShoppingBag} label={t("nav.orders")} href="#" isPrimary onClose={onClose} />
              {/* <MenuItem icon={Heart} label={t("nav.favorites")} href="#" isPrimary onClose={onClose} /> */}
            </SectionCard>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3 pt-2">
            <SectionHeader title={t("nav.explore")} icon={BookOpen} />
            <SectionCard className="bg-gradient-to-br from-card to-card/80 border-border divide-y divide-border overflow-hidden">
              <MenuItem icon={BookOpen} label={t("nav.howItWorks")} href="/help-center" onClose={onClose} />
              <MenuItem icon={Zap} label={t("nav.pricing")} href="#" onClose={onClose} />
              <MenuItem icon={Newspaper} label={t("nav.blog")} href="/blog" onClose={onClose} />
            </SectionCard>
          </div>

          {/* Settings */}
          <div className="space-y-3 pt-4">
            <SectionHeader title={t("nav.settings")} icon={Zap} />
            <SectionCard className="bg-gradient-to-br from-card to-card/80 border-border p-0 overflow-hidden">
              <div className="divide-y divide-border">
                <div className="px-4 py-4 flex items-center justify-between hover:bg-accent/50 transition-colors duration-200">
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

        {/* Auth Actions — pinned to the bottom of the sheet */}
        <div className="border-t border-border px-4 sm:px-6 py-5 space-y-2.5 bg-background">
          <Button
            variant="outline"
            className="w-full justify-center gap-2 py-6 h-auto font-semibold text-sm transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:shadow-md active:scale-95"
            onClick={onClose}
          >
            <User className="h-5 w-5" />
            {t("nav.login")}
          </Button>
          <Button
            className="w-full justify-center gap-2 py-6 h-auto font-semibold text-sm bg-gradient-to-r from-primary to-primary/80 hover:shadow-xl hover:shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-primary-foreground"
            onClick={onClose}
          >
            {t("nav.signUp")}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
