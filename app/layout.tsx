import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { EmergencyBar } from "@/components/EmergencyBar";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "24/7 Emergency Plumbing Services | Cave Spring & Roanoke, VA",
  description: "Fast, reliable plumbing services in Cave Spring, Roanoke, Salem, Hollins, and Vinton. 16+ years experience. Licensed master plumber. Same-day service. Call now for emergency plumbing!",
  keywords: "plumber, plumbing, emergency plumbing, Cave Spring VA, Roanoke VA, water heater, drain cleaning, leak detection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <LocalBusinessSchema />
      </head>
      <body className={inter.className}>
        <EmergencyBar />
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

