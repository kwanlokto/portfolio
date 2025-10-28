import {
  Box,
  IconButton,
  Modal as MuiModal,
  Paper,
  SxProps,
} from "@mui/material";

import { MdClose } from "react-icons/md";

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
        elevation={8}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          outline: "none",
          borderRadius: 2,
          p: 3,
          width: "50%",
          maxHeight: "75vh",
          overflow: "scroll",
          ...sx,
        }}
      >
        {/* Close button */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <MdClose />
        </IconButton>

        {children}
      </Box>
    </MuiModal>
  );
};
