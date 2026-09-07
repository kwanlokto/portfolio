"use client";

import { Box } from "@mui/material";
import { HobbyCard } from "@/ui/card/hobby_card";
import { HobbyType } from "@/lib/hobby";

interface HobbyMarqueeProps {
  hobbies: HobbyType[];
  on_select: (hobby: HobbyType) => void;
}

const CARD_WIDTH = 220;
const SCROLL_DURATION = "35s";

export const HobbyMarquee = ({ hobbies, on_select }: HobbyMarqueeProps) => {
  // The track is doubled so translateX(-50%) loops seamlessly. This is a
  // rendering detail, so it lives here rather than in the exported data.
  const track = [
    ...hobbies.map((hobby) => ({ hobby, copy: "a" })),
    ...hobbies.map((hobby) => ({ hobby, copy: "b" })),
  ];

  return (
    <Box sx={{ overflow: "hidden", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          width: "max-content",
          animation: `scrollX ${SCROLL_DURATION} linear infinite`,
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        }}
      >
        {track.map(({ hobby, copy }) => (
          <Box
            key={`${copy}-${hobby.title}`}
            sx={{ width: CARD_WIDTH, mx: 1, my: 2 }}
            // The second copy is a visual duplicate; don't announce it twice.
            aria-hidden={copy === "b"}
          >
            <HobbyCard hobby={hobby} on_click={() => on_select(hobby)} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
