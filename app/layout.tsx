import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Codebridge",
    template: "%s · Codebridge",
  },
  description: "Codebridge is a digital product and brand studio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 bg-(--page-background)"
        />
        <ConvexClientProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
