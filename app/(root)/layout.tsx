/* app/(root)/layout.tsx */

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { ReactQueryProvider } from "@/app/ReactQueryProvider";

export const metadata = {
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : undefined,
  title: {
    default: "TradeX",
    template: `%s - TradeX`,
  },
  description:
    "Lightning Fast AI Trading Platform Live Interactive Stock Charts, Financials, News, Screeners, and More.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ReactQueryProvider>
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-col flex-1 bg-muted/50 ">{children}</main>
      </div>
    </ReactQueryProvider>
  );
}
