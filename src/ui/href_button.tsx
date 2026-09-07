import { IconButton } from "@mui/material";

interface HRefButtonParams {
  url: string;
  /** Accessible name — required because the button's only content is an icon. */
  label: string;
  children: React.ReactNode;
}

export const HRefButton = ({ url, label, children }: HRefButtonParams) => {
  return (
    <IconButton
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      sx={{ color: "text.secondary" }}
    >
      {children}
    </IconButton>
  );
};
