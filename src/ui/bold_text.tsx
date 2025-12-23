import { Typography } from "@mui/material";

export const BoldText = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography
      component="span"
      fontWeight="700"
      variant="inherit"
      color="text.primary"
    >
      {children}
    </Typography>
  );
};
