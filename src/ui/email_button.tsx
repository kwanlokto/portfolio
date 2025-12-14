import { IconButton, useTheme } from "@mui/material";

import { CiMail } from "react-icons/ci";

export const EmailButton = () => {
  const theme = useTheme();
  const handle_email_click = () => {
    window.location.href = "mailto:lokto.kwan@gmail.com";
  };

  return (
    <IconButton onClick={handle_email_click}>
      <CiMail size={23} color={theme.palette.text.secondary} />
    </IconButton>
  );
};
