"use client";

import { Box, Tab, Tabs } from "@mui/material";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/Projects" },
];

export default function Navbar() {
  const pathname = usePathname(); // Get current route

  return (
    <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={pathname} aria-label="Navigation Tabs">
        {tabs.map((tab) => (
          <Tab
            className="dark:invert"
            key={tab.href}
            label={tab.label}
            component={Link}
            href={tab.href}
            value={tab.href} // Match active tab with URL
          />
        ))}
      </Tabs>
    </Box>
  );
}
