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
  const isPage = variant === "page";

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
          variant={isPage ? "h5" : "h6"}
          sx={{ color: "text.primary" }}
        >
          {title}
        </Typography>
        {trailing}
      </Box>
      {isPage && (
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
