import { Paper, Typography } from "@mui/material";

import { ReactNode } from "react";

interface CodeBlockInterface {
  children: ReactNode;
}

export const CodeBlock = ({ children }: CodeBlockInterface) => (
  <Paper variant="outlined" sx={{ p: 1 }}>
    <Typography
      component="code"
      variant="caption"
      sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}
    >
      {children}
    </Typography>
  </Paper>
);
