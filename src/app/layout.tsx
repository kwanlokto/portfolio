import "./globals.css";

import { CAREER_START_YEAR } from "@/lib/experience";
import type { Metadata } from "next";
import React from "react";
import RootLayoutClientWrapper from "@/ui/root_client_wrapper";
import { SITE_URL } from "@/lib/site";

const TITLE = "Ray Kwan — Software Engineer";

const YEARS_EXPERIENCE = new Date().getFullYear() - CAREER_START_YEAR;

const DESCRIPTION = `Toronto software engineer with ${YEARS_EXPERIENCE} years across full-stack, cloud, and hardware-integrated systems. Currently building the automated skate tuning platform used by 6+ NHL teams.`;

// Relative to metadataBase, which already ends in /portfolio/. Passing an
// asset()-prefixed path here would resolve to /portfolio/portfolio/... and 404.
const OG_IMAGE = "og-image.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: TITLE,
    images: [OG_IMAGE],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RootLayoutClientWrapper>{children}</RootLayoutClientWrapper>
      </body>
    </html>
  );
}
