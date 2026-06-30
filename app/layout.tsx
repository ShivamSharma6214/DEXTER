import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dexter.ai"),
  title: "dexter — Your AI Right Hand",
  description:
    "An open-source AI desktop companion that understands your screen, your apps, and your workflow. One intelligence. Every application.",
  keywords: [
    "AI",
    "desktop assistant",
    "open source",
    "automation",
    "productivity",
    "dexter",
  ],
  authors: [{ name: "dexter" }],
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  openGraph: {
    title: "dexter — Your AI Right Hand",
    description:
      "An open-source AI desktop companion that understands your screen, your apps, and your workflow.",
    type: "website",
    url: "https://dexter.ai",
    images: [
      {
        url: "https://dexter.ai/og.png",
        width: 1200,
        height: 630,
        alt: "dexter — Your AI Right Hand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "dexter — Your AI Right Hand",
    description:
      "An open-source AI desktop companion that understands your screen, your apps, and your workflow.",
    images: ["https://dexter.ai/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-[#050505] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
