import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/client";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  variable: "--font-inter",
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  userScalable: true,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "Creative Nepal - Digital Creative Agency",
    template: "%s | Creative Nepal",
  },
  description:
    "Creative Nepal is a leading digital creative agency in Nepal, offering innovative solutions in web development, design, and digital marketing. We help businesses transform their digital presence.",
  keywords: [
    "Creative Nepal",
    "Digital Agency Nepal",
    "Web Development Nepal",
    "Digital Marketing Nepal",
    "Creative Agency Kathmandu",
    "Web Design Nepal",
    "Digital Solutions Nepal",
    "Branding Nepal",
    "UI/UX Design Nepal",
    "Software Development Nepal",
  ],
  authors: [{ name: "Creative Nepal Team" }],
  creator: "Creative Nepal",
  publisher: "Creative Nepal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${inter.className} bg-background text-foreground antialiased`}
      >
        <NuqsAdapter>
          <TRPCReactProvider>
            <Toaster
              position="bottom-right"
              expand={true}
              richColors
              closeButton
              aria-label="Notifications"
            />
            <div>{children}</div>
          </TRPCReactProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
