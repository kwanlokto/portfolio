import { Box, Modal as MuiModal, Paper, SxProps } from "@mui/material";

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
        component={Paper}
        elevation={8} // You can adjust the elevation level (8 is a good starting point)
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          outline: "none",
          borderRadius: 2,
          p: 3,
          ...sx,
        }}
      >
        {children}
      </Box>
    </MuiModal>
  );
};
