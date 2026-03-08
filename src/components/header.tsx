"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ShoppingBag,
  Menu,
  X,
  User,
  BookOpen,
  Zap,
  Newspaper,
} from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelect } from "@/components/language-select";
import { MobileMenu } from "@/components/mobile-menu";
import { Button } from "@/components/ui/button";

export function Header() {
  const t = useTranslations();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar - Desktop Only */}
      <div className="hidden sm:block border-b border-border bg-gradient-to-r from-primary/8 via-primary/4 to-transparent py-3 text-xs font-medium text-muted-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <a
              className="inline-flex items-center gap-2 transition-all duration-200 hover:text-primary hover:gap-2.5 group"
              href="#"
            >
              <ShoppingBag className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="hidden sm:inline">{t("nav.orders")}</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <LanguageSelect />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 hover:opacity-80 transition-opacity">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-lg font-bold text-primary-foreground shadow-lg">
                P
              </div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Postam
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <Button
                variant="ghost"
                className="text-sm font-medium text-muted-foreground hover:text-primary gap-2"
                onClick={() => {}}
              >
                <BookOpen className="h-4 w-4" />
                {t("nav.howItWorks")}
              </Button>
              <Button
                variant="ghost"
                className="text-sm font-medium text-muted-foreground hover:text-primary gap-2"
                onClick={() => {}}
              >
                <Zap className="h-4 w-4" />
                {t("nav.pricing")}
              </Button>
              <Button
                asChild
                variant="ghost"
                className="text-sm font-medium text-muted-foreground hover:text-primary gap-2"
              >
                <Link href="/blog">
                  <Newspaper className="h-4 w-4" />
                  {t("nav.blog")}
                </Link>
              </Button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop Login Button */}
              <Button
                variant="ghost"
                className="hidden md:inline-flex text-sm font-medium text-muted-foreground hover:text-primary gap-2"
                onClick={() => {}}
              >
                <User className="h-4 w-4" />
                {t("nav.login")}
              </Button>

              {/* Desktop Sign Up */}
              <Button
                className="hidden md:inline-flex bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/25 transition-all hover:scale-105"
                onClick={() => {}}
              >
                {t("nav.signUp")}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden"
                aria-label="Open menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
