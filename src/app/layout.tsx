import type { Metadata } from "next";
import { Inter, Space_Mono, Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

import { DirectionProvider } from "@/components/ui/direction"
import {NextIntlClientProvider} from 'next-intl';
import { getMessages, getLocale } from "next-intl/server";
import { getDirection } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const cairoArabic = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Postam - Premium Parcel Forwarding",
  description:
    "Shop Turkey with a local address, consolidated shipping, and fast delivery.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale() as Locale;
  const messages = await getMessages();
  const direction = getDirection(locale);

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceMono.variable} ${cairoArabic.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <DirectionProvider dir={direction}>
              {children}
            </DirectionProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
