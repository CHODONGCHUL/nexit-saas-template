import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import QueryClientProviders from "../query-client-providers";
import { Toaster } from "@/components/ui/sonner"; // ✅ sonner 기반 Toaster
import "../globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "AutoNavi - 카카오맵 완전 자동화 내비게이션",
  description: "배달 라이더 전용, 카카오맵 자동 길찾기/안내 시작 자동화 솔루션",
  openGraph: {
    title: "AutoNavi",
    description: "카카오맵 완전 자동화 내비게이션",
    url: defaultUrl,
    siteName: "AutoNavi",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AutoNavi Preview",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // ✅ 비동기 params
}) {
  const { locale } = await params; // ✅ await 처리

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className="bg-background text-foreground"
      suppressHydrationWarning
    >
      <body className={`${inter.className} antialiased`}>
        <QueryClientProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider>{children}</NextIntlClientProvider>

            {/* ✅ Toast를 전역에서 띄우도록 sonner Toaster 배치 */}
            <Toaster richColors position="top-center" />
          </ThemeProvider>
        </QueryClientProviders>
      </body>
    </html>
  );
}
