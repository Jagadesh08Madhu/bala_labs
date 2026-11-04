import { Outfit, Figtree } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Bala Labs | Digital Solutions",
    template: "%s | Bala Labs",
  },

  description:
    "Bala Labs helps businesses grow through innovative digital solutions and technology services.",

  icons: {
    icon: "/favicon.ico",
  },
  applicationName: "Bala Labs",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Bala Labs | Digital Solutions",
    description:
      "Discover digital solutions designed to help businesses grow.",
    url: "/",
    siteName: "Bala Labs",
    locale: "en_IN",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${figtree.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}