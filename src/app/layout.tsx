import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: ReactNode;
};

// Root layout — provides the HTML shell, fonts, and global CSS.
// Locale-specific layout (app/[locale]/layout.tsx) handles providers, nav, footer.
export default function RootLayout({ children }: Props) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
