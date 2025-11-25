import { Paper } from "@mui/material";

export default function CardSection({
  children,
  padding = 3,
}: {
  children: React.ReactNode;
  padding?: number;
}) {
  return (
    <Paper
      sx={{
        p: padding,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
    >
      {children}
    </Paper>
  );
}
