import type { Metadata } from "next";
import { Instrument_Sans, Geist_Mono, Raleway } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal"],
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
      className={`${instrumentSans.variable} ${geistMono.variable} ${raleway.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 bg-(--page-background)"
        />
        <ConvexClientProvider>
          <SiteHeader />
          <SmoothScrollProvider>
            {children}
            <SiteFooter />
          </SmoothScrollProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
