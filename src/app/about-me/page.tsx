"use client";

import { Box, Typography } from "@mui/material";
import { HobbyItemType, HobbyType, SCROLLING_HOBBIES } from "@/lib/hobby";

import { BackButton } from "@/ui/back_button";
import { BoldText } from "@/ui/bold_text";
import { HobbyCard } from "@/ui/card/hobby_card";
import { HobbyItemCard } from "@/ui/card/hobby_item_card";
import { MDReader } from "@/ui/md_reader";
import { Masonry } from "@mui/lab";
import { Modal } from "@/ui/modal";
import { SectionHeader } from "@/ui/section_header";
import { TextSection } from "@/ui/text_section";
import { useState } from "react";

export default function Page() {
  const current_year = new Date().getFullYear();

  const [open, set_open] = useState<boolean>(false);
  const [selected_hobby, set_selected_hobby] = useState<HobbyType | null>(null);
  const [selected_md, set_selected_md] = useState<string | null>(null);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 4, sm: 5 } }}>
      {/* About Section */}
      <Box>
        <SectionHeader title="About Me" variant="page" mb={2.5} />
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          I&apos;m a Senior Software Engineer specializing in
          <BoldText> React</BoldText> and <BoldText>Python</BoldText>, with a
          focus on building maintainable systems and intuitive user interfaces.
          <br />
          <br />
          My first project in high school was a recommendation program with
          O(m^n) space complexity — it barely worked, but I was hooked. That
          feeling of building something useful has stuck with me ever since.
          These days, I&apos;m still chasing it, just with better algorithms and
          (hopefully) fewer bugs.
        </Typography>
      </Box>

      <TextSection title="How I Work">
        I&apos;m convinced that the best code is boring code. When I&apos;m
        building something, I&apos;d rather spend time making it obvious than
        clever. I&apos;ve learned that the real challenge isn&apos;t solving the
        problem once, it&apos;s building something that the next person (usually
        future me) can understand six months later.
      </TextSection>

      <TextSection title="Outside of Work">
        When I&apos;m not coding, I&apos;m often out playing hockey, which is
        something I picked up {current_year - 2021} years ago. It&apos;s been
        fun, frustrating, and humbling. I&apos;ve spent plenty of time falling,
        but every fall has been a small reminder to get back up to keep trying
        and improving.
        <br />
        <br />I also love trying new cuisines and experiencing different
        cultures. These experiences keep me curious and help bring a fresh
        perspective to my work.
      </TextSection>

      <Box
        sx={{
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "max-content",
            animation: "scrollX 35s linear infinite",
            "@keyframes scrollX": {
              "0%": {
                transform: "translateX(0)",
              },
              "100%": {
                transform: "translateX(-50%)",
              },
            },
          }}
        >
          {SCROLLING_HOBBIES.map((hobby, index) => (
            <Box key={index} sx={{ width: 220, mx: 1, my: 2 }}>
              <HobbyCard
                hobby={hobby}
                on_click={async () => {
                  // If the images we have isn't empty then continue
                  if (hobby.images.length > 0) {
                    set_selected_hobby(hobby);
                    set_open(true);
                  }
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <Box textAlign="center">
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Want to connect? Reach me at{" "}
          <Typography
            component="span"
            sx={{ color: "primary.main", fontWeight: 500, fontSize: "inherit" }}
          >
            lokto.kwan@gmail.com
          </Typography>
        </Typography>
      </Box>

      {/* Masonry Modal */}
      <Modal
        open={open}
        onClose={() => {
          set_open(false);
          set_selected_hobby(null);
          set_selected_md(null);
        }}
        sx={{
          borderRadius: 3,
          boxShadow: 10,
          p: 5,
          pr: 3,
          pb: 3,
        }}
      >
        <Box sx={{ display: "flex", gap: 2, position: "relative" }}>
          <Masonry columns={{ xs: 2, sm: 2, md: 3, lg: 4 }} spacing={2}>
            {selected_hobby !== null &&
              selected_hobby.images.map(
                (hobby_item: HobbyItemType, idx: number) => (
                  <HobbyItemCard
                    key={idx}
                    hobby_item={hobby_item}
                    set_selected_md={set_selected_md}
                  />
                ),
              )}
          </Masonry>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              right: 0,
              width: { xs: "100%", sm: "50%", md: "50%" },
              height: "100%",
              bgcolor: "background.default",
              boxShadow: 3,
              overflow: "auto",
              px: 3,
              zIndex: 1200,

              // Transition & slide
              transition: "transform 0.3s ease",
              transform: selected_md ? "translateX(0)" : "translateX(100%)",
            }}
          >
            {/* Back button pinned to top-left */}
            <BackButton on_click={() => set_selected_md(null)} />

            {/* MD content */}
            {selected_md && <MDReader path={selected_md} />}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
