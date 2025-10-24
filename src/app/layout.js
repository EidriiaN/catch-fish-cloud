import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/auth-context";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Providers } from "@/lib/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  applicationName: "Pește Prins",
  title: {
    default: "Pește Prins — Găsește locul de pescuit perfect",
    template: "%s | Pește Prins",
  },
  description: "Conectează-te cu bălți și lacuri private, rezervă heleșteie și bucură-te de experiențe premium la pescuit.",
  keywords: ["pescuit", "bălți pescuit", "lacuri private", "rezervare heleșteu", "locuri de pescuit", "Pește Prins"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  metadataBase: new URL("https://pesteprins.ro"),
  alternates: {
    canonical: "/",
    languages: {
      "ro-RO": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://pesteprins.ro/",
    siteName: "Pește Prins",
    title: "Pește Prins — Găsește locul de pescuit perfect",
    description: "Conectează-te cu bălți și lacuri private, rezervă heleșteie și bucură-te de experiențe premium la pescuit.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pește Prins — Găsește locul de pescuit perfect",
    description: "Conectează-te cu bălți și lacuri private, rezervă heleșteie și bucură-te de experiențe premium la pescuit.",
    creator: "@pesteprins",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <AuthProvider>
            <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
              <Navbar />
              <main style={{ flexGrow: 1, paddingTop: "4rem" }}>{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
