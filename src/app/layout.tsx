import "./globals.css";

import { SITE_URL, asset } from "@/lib/site";

import type { Metadata } from "next";
import React from "react";
import RootLayoutClientWrapper from "@/ui/root_client_wrapper";

const TITLE = "Ray Kwan — Software Engineer";
const DESCRIPTION =
  "Toronto software engineer with 7 years across full-stack, cloud, and hardware-integrated systems. Currently building the automated skate tuning platform used by 6+ NHL teams.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: TITLE,
    images: [asset("/Profile Picture.jpg")],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [asset("/Profile Picture.jpg")],
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
