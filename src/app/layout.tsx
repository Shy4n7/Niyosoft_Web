import type { Metadata, Viewport } from "next";
import { Inter, Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import { FloatingActions } from "@/components/FloatingActions";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "800"], variable: "--font-montserrat" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Software, Apps & IT Services in Pollachi`, template: `%s | ${site.name}` },
  description: site.description,
  keywords: [
    "Niyosoft Technologies",
    "software company Pollachi",
    "mobile app development Coimbatore",
    "website development Pollachi",
    "online ordering app",
    "payment gateway integration",
    "IT support Pollachi",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_IN", siteName: site.name, url: "/", title: site.name, description: site.description },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0b1a5c" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${montserrat.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');history.scrollRestoration='manual'" }} />
      </head>
      <body className="font-sans">
        <JsonLd />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
