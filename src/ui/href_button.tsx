import { IconButton } from "@mui/material";

interface HRefButtonParams {
  url: string;
  className?: string;
  children: React.ReactNode;
}
export const HRefButton = ({
  url,
  className = "",
  children,
}: HRefButtonParams) => {
  const open_new_tab = () => {
    window.open(url, "_blank");
  };

  return (
    <IconButton onClick={open_new_tab} className={className}>
      {children}
    </IconButton>
  );
};
