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
  sx?: SxProps;
  children: React.ReactNode;
}

export const Modal = ({ open, onClose, sx = {}, children }: ModalParams) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      // html { scrollbar-gutter: stable } already reserves the gutter, so MUI's
      // scroll lock would only add a redundant padding shift.
      disableScrollLock
    >
      <Box
        component={Paper}
        elevation={8}
        sx={[
          {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            outline: "none",
            borderRadius: 2,
            p: 3,
            width: {
              xs: "90%", // mobile
              sm: "80%", // small tablets
              md: "60%", // desktop
              lg: "55%", // large screens
            },
            maxHeight: "85vh",
            overflow: "hidden",
          },
          // sx can legally be an array or a callback; spreading would drop both.
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <IconButton
          aria-label="Close"
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
