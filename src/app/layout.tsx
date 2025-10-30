import "./globals.css";

import type { Metadata } from "next";
import React from "react";
import RootLayoutClientWrapper from "@/ui/root_client_wrapper";

export const metadata: Metadata = {
  title: "Ray's Portfolio",
  description: "Ray's Portfolio",
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
