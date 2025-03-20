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

  return (
    <IconButton href={url} target="_blank" className={className}>
      {children}
    </IconButton>
  );
};
