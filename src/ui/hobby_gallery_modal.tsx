"use client";

import { HobbyItemType, HobbyType } from "@/lib/hobby";

import { BackButton } from "@/ui/back_button";
import { BookCard } from "@/ui/card/book_card";
import { Box } from "@mui/material";
import { MDReader } from "@/ui/markdown/reader";
import { Masonry } from "@mui/lab";
import { Modal } from "@/ui/modal";
import { PhotoTile } from "@/ui/photo_tile";
import { useState } from "react";

interface HobbyGalleryModalProps {
  hobby: HobbyType | null;
  on_close: () => void;
}

export const HobbyGalleryModal = ({
  hobby,
  on_close,
}: HobbyGalleryModalProps) => {
  // Scoped to the modal: selecting a review is meaningless once it closes.
  const [selected_md, set_selected_md] = useState<string | null>(null);

  const close = () => {
    set_selected_md(null);
    on_close();
  };

  return (
    <Modal
      open={hobby !== null}
      onClose={close}
      sx={{ borderRadius: 3, boxShadow: 10, p: 5, pr: 3, pb: 3 }}
    >
      <Box sx={{ display: "flex", gap: 2, position: "relative" }}>
        <Masonry columns={{ xs: 2, sm: 2, md: 3, lg: 4 }} spacing={2}>
          {(hobby?.images ?? []).map((item: HobbyItemType) =>
            item.type === "review" ? (
              <BookCard
                key={item.title}
                title={item.title}
                src={item.src}
                aspect_ratio={item.aspect_ratio}
                rating={item.rating}
                on_open={() => set_selected_md(item.md)}
              />
            ) : (
              <PhotoTile key={item.title} item={item} />
            ),
          )}
        </Masonry>

        <Box
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            width: { xs: "100%", sm: "50%" },
            height: "100%",
            bgcolor: "background.default",
            boxShadow: 3,
            overflow: "auto",
            px: 3,
            zIndex: (theme) => theme.zIndex.drawer,
            transition: "transform 0.3s ease, visibility 0.3s ease",
            transform: selected_md ? "translateX(0)" : "translateX(100%)",
            // Without this the panel stays in the tab order while off-screen,
            // so keyboard users land on a Back button they cannot see.
            visibility: selected_md ? "visible" : "hidden",
          }}
        >
          <BackButton on_click={() => set_selected_md(null)} />
          {selected_md && <MDReader path={selected_md} />}
        </Box>
      </Box>
    </Modal>
  );
};
