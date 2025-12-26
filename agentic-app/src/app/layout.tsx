import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://agentic-78bbb024.vercel.app"),
  title: "Mission Prosperous India | Farmer Advisory Command Centre",
  description:
    "Bilingual agent console delivering rapid agronomy, irrigation, and market guidance for Mission Prosperous India farmers.",
  keywords: [
    "mission prosperous india",
    "farmer helpline",
    "agri advisory",
    "farming support",
    "call centre",
  ],
  openGraph: {
    title: "Mission Prosperous India – Farmer Advisory Agent",
    description:
      "Resolve farming queries in under three minutes with knowledge capsules, escalation playbooks, and bilingual guidance.",
    url: "https://agentic-78bbb024.vercel.app",
    siteName: "Mission Prosperous India Agent",
    images: [
      {
        url: "/og-mission-prosperous-india.svg",
        width: 1200,
        height: 630,
        alt: "Mission Prosperous India Advisory Console",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mission Prosperous India Advisory Agent",
    description:
      "Consultation console for farmers seeking agronomy, irrigation, and market guidance.",
    images: ["/og-mission-prosperous-india.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#f6fff8] antialiased dark:bg-slate-950`}
      >
        {children}
      </body>
    </html>
  );
}
