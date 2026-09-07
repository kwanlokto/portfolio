"use client";

import { CONTACT_EMAIL, mailto_url } from "@/lib/contact";

import { CiMail } from "react-icons/ci";
import { IconButton } from "@mui/material";

export const EmailButton = () => {
  const handle_email_click = () => {
    window.location.href = mailto_url();
  };

  return (
    <IconButton
      onClick={handle_email_click}
      aria-label={`Email ${CONTACT_EMAIL}`}
      sx={{ color: "text.secondary" }}
    >
      <CiMail size={23} color="currentColor" />
    </IconButton>
  );
};
