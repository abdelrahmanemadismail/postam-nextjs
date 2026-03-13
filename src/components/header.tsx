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
          <div className="flex h-14 items-center justify-between gap-2 sm:h-20 sm:gap-4">
            {/* Logo */}
            <Link href="/" className="flex flex-shrink-0 items-center gap-2 transition-opacity hover:opacity-80 sm:gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-base font-bold text-primary-foreground shadow-lg sm:h-10 sm:w-10 sm:text-lg">
                P
              </div>
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-lg font-bold tracking-tight text-transparent sm:text-2xl">
                Postam
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <Button
                asChild
                variant="ghost"
                className="text-sm font-medium text-muted-foreground hover:text-primary gap-2"
              >
                <Link href="/help-center">
                  <BookOpen className="h-4 w-4" />
                  {t("nav.howItWorks")}
                </Link>
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
            <div className="flex items-center gap-1.5 sm:gap-3">
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
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
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
