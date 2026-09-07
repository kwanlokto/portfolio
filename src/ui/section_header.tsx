import { Box, Divider, Typography } from "@mui/material";

interface SectionHeaderProps {
  title: string;
  variant?: "page" | "section";
  trailing?: React.ReactNode;
  mb?: number;
}

export const SectionHeader = ({
  title,
  variant = "section",
  trailing,
  mb = 2,
}: SectionHeaderProps) => {
  const is_page = variant === "page";

  return (
    <Box sx={{ mb }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography
          variant={is_page ? "h5" : "h6"}
          // Visual size stays; the element level keeps the outline valid
          // (the hero owns <h1>, every section header is an <h2>).
          component="h2"
          sx={{ color: "text.primary" }}
        >
          {title}
        </Typography>
        {trailing}
      </Box>
      {is_page && (
        <Divider
          sx={{
            width: 48,
            borderBottomWidth: 3,
            borderColor: "primary.main",
            mt: 0.5,
          }}
        />
      )}
    </Box>
  );
};
