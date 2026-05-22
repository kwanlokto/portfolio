import { Box, Typography } from "@mui/material";

interface TextSectionInterface {
  title: string;
  // Margin props
  m?: number | string;
  mt?: number | string;
  mb?: number | string;
  ml?: number | string;
  mr?: number | string;
  mx?: number | string;
  my?: number | string;
  // Padding props
  p?: number | string;
  pt?: number | string;
  pb?: number | string;
  pl?: number | string;
  pr?: number | string;
  px?: number | string;
  py?: number | string;
  children: React.ReactNode;
}

export const TextSection = ({
  title,
  children,
  ...spacingProps
}: TextSectionInterface) => {
  return (
    <Box sx={{ ...spacingProps }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2">
        {children}
      </Typography>
    </Box>
  );
};
