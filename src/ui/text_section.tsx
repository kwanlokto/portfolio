import { Box, Typography } from "@mui/material";

import { SectionHeader } from "./section_header";

interface TextSectionProps {
  title: string;
  children: React.ReactNode;
}

export const TextSection = ({ title, children }: TextSectionProps) => {
  return (
    <Box>
      <SectionHeader title={title} mb={1} />
      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        {children}
      </Typography>
    </Box>
  );
};
