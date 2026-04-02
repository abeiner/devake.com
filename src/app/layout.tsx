import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import PasswordGate from "@/components/shared/PasswordGate";
import DemoBanner from "@/components/shared/DemoBanner";
import Navbar from "@/components/shared/Navbar";
import NavOverlay from "@/components/shared/NavOverlay";
import { NavProvider } from "@/components/shared/NavContext";
import LenisProvider from "@/components/shared/LenisProvider";
import Preloader from "@/components/preloader/Preloader";
import { PreloaderProvider } from "@/components/preloader/PreloaderContext";
import CoordinateTracker from "@/components/shared/CoordinateTracker";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "DEVAKE. | Geospatial Intelligence. Engineered.",
  description:
    "Geospatial software studio turning satellite imagery, LIDAR point clouds, and spatial data into intelligent platforms.",
  robots: {
    index: false,
    follow: false,
  },
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
        <PasswordGate>
          <PreloaderProvider>
            <Preloader />
            <LenisProvider>
              <NavProvider>
                <a href="#main-content" className="skip-to-content">
                  Skip to content
                </a>
                <DemoBanner />
                <Navbar />
                <NavOverlay />
                {children}
              </NavProvider>
            </LenisProvider>
          </PreloaderProvider>
          <CoordinateTracker />
        </PasswordGate>
      </body>
    </html>
  );
}
