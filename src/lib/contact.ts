export const CONTACT_EMAIL = "lokto.kwan@gmail.com";
export const MAILTO_SUBJECT = "Hi Ray — saw your portfolio";
export const MAILTO_BODY = "Hey Ray,\n\n";

export const mailto_url = (): string =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    MAILTO_SUBJECT,
  )}&body=${encodeURIComponent(MAILTO_BODY)}`;

export type SocialId = "linkedin" | "github" | "leetcode";

export interface SocialLink {
  id: SocialId;
  label: string;
  url: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/loktokwan/",
  },
  { id: "github", label: "GitHub", url: "https://github.com/kwanlokto" },
  {
    id: "leetcode",
    label: "LeetCode",
    url: "https://leetcode.com/u/GyBaljomA8/",
  },
];
