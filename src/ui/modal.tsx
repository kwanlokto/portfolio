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
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#FEFEFA",
          border: "1px solid grey",
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
