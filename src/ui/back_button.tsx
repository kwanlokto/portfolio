"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

export const BackButton = ({ href }: { href: string }) => {
  return (
    <Button
      variant="outlined"
      startIcon={<MdArrowBack size={18} />}
      component={Link}
      href={href}
      sx={{
        textTransform: "none",
        borderRadius: 2,
        px: 1.5,
        py: 0.5,
        mb: 2,
        fontSize: "0.875rem",
        borderColor: "divider",
        color: "text.primary",
        backgroundColor: "background.paper",
        "&:hover": {
          backgroundColor: "action.hover",
          borderColor: "text.secondary",
        },
      }}
    >
      Back
    </Button>
  );
};
