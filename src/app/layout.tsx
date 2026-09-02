import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import DemoBanner from "@/components/shared/DemoBanner";
import Navbar from "@/components/shared/Navbar";
import NavOverlay from "@/components/shared/NavOverlay";
import { NavProvider } from "@/components/shared/NavContext";
import LenisProvider from "@/components/shared/LenisProvider";
import Preloader from "@/components/preloader/Preloader";
import { PreloaderProvider } from "@/components/preloader/PreloaderContext";
import CoordinateTracker from "@/components/shared/CoordinateTracker";
import SkipToContent from "@/components/shared/SkipToContent";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "DEVAKE. | Geospatial Software Development",
  description:
    "Geospatial software development services for companies around the world, including web, mobile, and desktop solutions for geospatial analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <PreloaderProvider>
          <Preloader />
          <LenisProvider>
            <NavProvider>
              <SkipToContent />
              <DemoBanner />
              <Navbar />
              <NavOverlay />
              {children}
            </NavProvider>
          </LenisProvider>
        </PreloaderProvider>
        <CoordinateTracker />
      </body>
    </html>
  );
}
