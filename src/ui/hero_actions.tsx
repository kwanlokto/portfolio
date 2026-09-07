"use client";

import { Box, Button, SxProps } from "@mui/material";

import { EmailButton } from "@/ui/email_button";
import { MdOutlineCloudDownload } from "react-icons/md";
import { SocialLinks } from "@/ui/social_links";
import { asset } from "@/lib/site";
import { handle_download } from "@/utils/download";

interface HeroActionsProps {
  sx?: SxProps;
}

export const HeroActions = ({ sx }: HeroActionsProps) => {
  return (
    <Box
      sx={[
        {
          pt: 2,
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
          justifyContent: "flex-start",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Button
        variant="contained"
        onClick={() =>
          handle_download(asset("/Resume.pdf"), "ray_kwan_resume.pdf")
        }
        endIcon={<MdOutlineCloudDownload size={18} />}
        sx={{ px: 2.25, py: 0.75, fontSize: "0.875rem" }}
      >
        Resume
      </Button>

      <SocialLinks>
        <EmailButton />
      </SocialLinks>
    </Box>
  );
};
