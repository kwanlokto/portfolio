"use client";

import { Box, Button, SxProps, useTheme } from "@mui/material";
import { SlSocialGithub, SlSocialLinkedin } from "react-icons/sl";

import { EmailButton } from "@/ui/email_button";
import { HRefButton } from "@/ui/href_button";
import { MdOutlineCloudDownload } from "react-icons/md";
import { SiLeetcode } from "react-icons/si";
import { handle_download } from "@/utils/download";

interface HeroActionsProps {
  sx?: SxProps;
}

export const HeroActions = ({ sx }: HeroActionsProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: 2,
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        alignItems: "center",
        justifyContent: "flex-start",
        ...sx,
      }}
    >
      <Button
        variant="contained"
        onClick={() =>
          handle_download("/portfolio/Resume.pdf", "ray_resume.pdf")
        }
        endIcon={<MdOutlineCloudDownload size={18} />}
        sx={{ px: 2.25, py: 0.75, fontSize: "0.875rem" }}
      >
        Resume
      </Button>

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
        <HRefButton url="https://www.linkedin.com/in/loktokwan/">
          <SlSocialLinkedin size={20} color={theme.palette.text.secondary} />
        </HRefButton>
        <HRefButton url="https://github.com/kwanlokto">
          <SlSocialGithub size={20} color={theme.palette.text.secondary} />
        </HRefButton>
        <HRefButton url="https://leetcode.com/u/GyBaljomA8/">
          <SiLeetcode size={20} color={theme.palette.text.secondary} />
        </HRefButton>
        <EmailButton />
      </Box>
    </Box>
  );
};
