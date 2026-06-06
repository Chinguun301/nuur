import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnalyticsTracker } from "@/lib/analytics";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Common" });

  return {
    title: {
      default: t("siteTitle"),
      template: `%s | ${t("siteTitle")}`,
    },
    description: t("siteDescription"),
    keywords: [
      "frontend developer",
      "react developer",
      "next.js",
      "typescript",
      "portfolio",
      "web development",
    ],
    authors: [{ name: "Chinguun Vanchinsuren" }],
    openGraph: {
      title: t("siteTitle"),
      description: t("siteDescription"),
      type: "website",
      locale: locale === "mn" ? "mn_MN" : "en_US",
      siteName: t("siteName"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteTitle"),
      description: t("siteDescription"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <AnalyticsTracker />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
