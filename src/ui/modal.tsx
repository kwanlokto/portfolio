import { Box, Modal as MuiModal, SxProps } from "@mui/material";

interface ModalParams {
  open: boolean;
  onClose: () => void;
  z_index?: number;
  sx?: SxProps;
  children: React.ReactNode;
}

export const Modal = ({
  open,
  onClose,
  z_index = 1300,
  sx = {},
  children,
}: ModalParams) => {
  return (
    <MuiModal open={open} onClose={onClose} sx={{ zIndex: z_index }}>
      <Box
        className="dark:bg-neutral-800"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          ...sx,
        }}
      >
        {children}
      </Box>
    </MuiModal>
  );
};
