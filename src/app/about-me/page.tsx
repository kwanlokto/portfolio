import { AboutMeContent } from "./about_me_content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Ray Kwan",
  description:
    "How I approach building software, and what I get up to when I'm not writing it.",
};

export default function Page() {
  return <AboutMeContent />;
}
