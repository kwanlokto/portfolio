import { CiMail } from "react-icons/ci";
import { IconButton } from "@mui/material";
import React from "react";

export const EmailButton = () => {
  const handle_email_click = () => {
    window.location.href = "mailto:lokto.kwan@gmail.com";
  };

  return (
    <IconButton onClick={handle_email_click}>
      <CiMail size={23} className="text-gray-400" />
    </IconButton>
  );
};
