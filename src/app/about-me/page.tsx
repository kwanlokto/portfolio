"use client";

import { Box, Link as MuiLink, Typography } from "@mui/material";

import { BoldText } from "@/ui/bold_text";
import { CONTACT_EMAIL } from "@/lib/contact";
import { HOBBIES } from "@/lib/hobby";
import { HobbyGalleryModal } from "@/ui/hobby_gallery_modal";
import { HobbyMarquee } from "@/ui/hobby_marquee";
import { HobbyType } from "@/lib/hobby";
import { SectionHeader } from "@/ui/section_header";
import { TextSection } from "@/ui/text_section";
import { mailto_url } from "@/lib/contact";
import { useState } from "react";

const HOCKEY_START_YEAR = 2021;

export default function Page() {
  const current_year = new Date().getFullYear();

  // `open` used to be tracked separately, but it was always exactly
  // `selected_hobby !== null` — one fact, one source of truth.
  const [selected_hobby, set_selected_hobby] = useState<HobbyType | null>(null);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: { xs: 4, sm: 5 } }}
    >
      {/* About Section */}
      <Box>
        <SectionHeader title="About Me" variant="page" mb={2.5} />
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          I&apos;m a Chief Technology Officer and engineer specializing in{" "}
          <BoldText>React</BoldText> and <BoldText>Python</BoldText>, with a
          focus on building maintainable systems and intuitive user interfaces.
          <br />
          <br />
          My first project in high school was a recommendation program with
          exponential space complexity — it barely worked, but I was hooked.
          That feeling of building something useful has stuck with me ever
          since. These days, I&apos;m still chasing it, just with better
          algorithms and (hopefully) fewer bugs.
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
        When I&apos;m not coding, I&apos;m often out playing hockey, which I
        picked up {current_year - HOCKEY_START_YEAR} years ago. It&apos;s been
        fun, frustrating, and humbling. I&apos;ve spent plenty of time falling,
        but every fall has been a small reminder to get back up, keep trying,
        and keep improving.
        <br />
        <br />I also love trying new cuisines and experiencing different
        cultures. These experiences keep me curious and help bring a fresh
        perspective to my work.
      </TextSection>

      <HobbyMarquee
        hobbies={HOBBIES}
        on_select={(hobby) => set_selected_hobby(hobby)}
      />

      <Box textAlign="center">
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Want to connect? Reach me at{" "}
          <MuiLink
            href={mailto_url()}
            sx={{
              color: "primary.main",
              fontWeight: 500,
              fontSize: "inherit",
              textDecorationColor: "inherit",
            }}
          >
            {CONTACT_EMAIL}
          </MuiLink>
        </Typography>
      </Box>

      <HobbyGalleryModal
        hobby={selected_hobby}
        on_close={() => set_selected_hobby(null)}
      />
    </Box>
  );
}
