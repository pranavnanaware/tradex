/* app/layout.tsx */

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "@/app/globals.css";
import { cn } from "@/lib/utils";
// import { ThemeToggle } from '@/components/theme-toggle'
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/app/ReactQueryProvider"; // Ensure correct path

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "font-sans antialiased dark",
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <Toaster position="top-center" />

        <div className="flex flex-col">
          {/* Wrap children with ReactQueryProvider */}
          <ReactQueryProvider>
            <main className="flex flex-col flex-1 bg-muted/50 ">
              {children}
            </main>
          </ReactQueryProvider>
        </div>
      </body>
    </html>
  );
}
