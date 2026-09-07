import { SlSocialGithub, SlSocialLinkedin } from "react-icons/sl";
import { SOCIAL_LINKS, SocialId } from "@/lib/contact";

import { Box } from "@mui/material";
import { HRefButton } from "@/ui/href_button";
import { IconType } from "react-icons";
import { SiLeetcode } from "react-icons/si";

const ICONS: Record<SocialId, IconType> = {
  linkedin: SlSocialLinkedin,
  github: SlSocialGithub,
  leetcode: SiLeetcode,
};

interface SocialLinksProps {
  /** Which links to show, in order. Defaults to all of them. */
  ids?: SocialId[];
  size?: number;
  children?: React.ReactNode;
}

export const SocialLinks = ({ ids, size = 20, children }: SocialLinksProps) => {
  const links = ids
    ? ids
        .map((id) => SOCIAL_LINKS.find((link) => link.id === id))
        .filter((link) => link !== undefined)
    : SOCIAL_LINKS;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
      {links.map((link) => {
        const Icon = ICONS[link.id];
        return (
          <HRefButton key={link.id} url={link.url} label={link.label}>
            <Icon size={size} color="currentColor" />
          </HRefButton>
        );
      })}
      {children}
    </Box>
  );
};
