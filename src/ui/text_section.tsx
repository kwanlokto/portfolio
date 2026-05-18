import { Box, Typography } from "@mui/material";

interface TextSectionInterface {
  title: string;
  children: React.ReactNode;
}

export const TextSection = ({ title, children }: TextSectionInterface) => {
  return (
    <Box>
      <Typography
        component="h3"
        sx={{
          fontSize: "1.1875rem",
          fontWeight: 600,
          letterSpacing: "-0.012em",
          color: "text.primary",
          mb: 1.5,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "1rem", sm: "1.0625rem" },
          color: "text.primary",
          lineHeight: 1.65,
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};
