"use client";

import { Box, Button } from "@mui/material";

import { MdArrowForward } from "react-icons/md";

export const BackButton = ({ on_click }: { on_click: () => void }) => {
  return (
    <Box
      sx={{
        position: "sticky", // keeps it at the top when scrolling
        top: 0,
        left: 0,
        zIndex: 1300,
        display: "flex",
        py: 0.75,
        bgcolor: "background.default",
      }}
    >
      <Button
        startIcon={<MdArrowForward style={{ paddingBottom: "2px" }} />}
        variant="text"
        size="small"
        onClick={on_click}
        sx={{
          color: "primary.light",
          "&:hover": {
            bgcolor: "transparent",
            color: "primary.dark",
          },
        }}
      >
        Back
      </Button>
    </Box>
  );
};
