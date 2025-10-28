import { Box, Typography } from "@mui/material";

interface TextSectionInterface {
  title: string;
  content: string;
}
export const TextSection = ({ title, content }: TextSectionInterface) => {
  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
        {content}
      </Typography>
    </Box>
  );
};
