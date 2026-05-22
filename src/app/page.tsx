"use client";

import {
  Box,
  Button,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { NUMBER_OF_NHL_TEAMS, WORK, EDUCATION } from "@/lib/experience";
import { SlSocialGithub, SlSocialLinkedin } from "react-icons/sl";

import { BoldText } from "@/ui/bold_text";
import { EmailButton } from "@/ui/email_button";
import { ExperienceTimeline } from "@/ui/experience_timeline";
import { HRefButton } from "@/ui/href_button";
import Image from "next/image";
import { ItemGrid } from "@/ui/item_grid";
import Link from "next/link";
import { MdOutlineCloudDownload } from "react-icons/md";
import { PROJECTS } from "@/lib/project";
import { PiHandWavingBold } from "react-icons/pi";
import { Project } from "@/ui/card/project_card";
import { SectionHeader } from "@/ui/section_header";
import { SiLeetcode } from "react-icons/si";
import { TechStack } from "@/ui/tech_stack";
import { handle_download } from "@/utils/download";
import { useState } from "react";

export default function Home() {
  const [tab_idx, set_tab_idx] = useState(0);
  const current_year = new Date().getFullYear();
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 5, sm: 6 } }}>
      {/* Hero */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          gap: { xs: 3, sm: 4 },
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <PiHandWavingBold
              style={{
                animation: "wave 3s infinite",
                transformOrigin: "70% 70%",
              }}
              size={22}
            />
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontWeight: 500 }}
            >
              Hi, I&apos;m Ray
            </Typography>
          </Box>

          <Typography variant="h4" sx={{ mb: 1.5 }}>
            Senior Software Engineer
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: "text.secondary", maxWidth: 560 }}
          >
            {current_year - 2019} years building full-stack systems and leading
            cross-functional teams. Currently developing automated skate
            sharpening technology endorsed by{" "}
            <BoldText>{NUMBER_OF_NHL_TEAMS}+ NHL teams</BoldText>.
          </Typography>

          <Box
            sx={{
              pt: 2.5,
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={() =>
                handle_download("/portfolio/Resume.pdf", "ray_resume.pdf")
              }
              endIcon={<MdOutlineCloudDownload size={18} />}
              sx={{ px: 2.25, py: 0.75 }}
            >
              Resume
            </Button>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
              <HRefButton url="https://www.linkedin.com/in/loktokwan/">
                <SlSocialLinkedin
                  size={20}
                  color={theme.palette.text.secondary}
                />
              </HRefButton>
              <HRefButton url="https://github.com/kwanlokto">
                <SlSocialGithub size={20} color={theme.palette.text.secondary} />
              </HRefButton>
              <HRefButton url="https://leetcode.com/u/GyBaljomA8/">
                <SiLeetcode size={20} color={theme.palette.text.secondary} />
              </HRefButton>
              <EmailButton />
            </Box>
          </Box>
        </Box>

        <Image
          src="/portfolio/Profile Picture.jpg"
          alt="Ray's Picture"
          width={180}
          height={180}
          style={{
            objectFit: "cover",
            borderRadius: 16,
            flexShrink: 0,
          }}
        />
      </Box>

      {/* Experience */}
      <Box>
        <SectionHeader title="Experience" mb={1.5} />
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 1 }}>
          <Tabs
            value={tab_idx}
            onChange={(e: React.SyntheticEvent, new_idx: number) =>
              set_tab_idx(new_idx)
            }
            sx={{
              minHeight: 36,
              "& .MuiTab-root": {
                minHeight: 36,
                py: 1,
                fontSize: "0.875rem",
                color: "text.secondary",
                "&.Mui-selected": { color: "text.primary" },
              },
            }}
          >
            <Tab label="Work" />
            <Tab label="Education" />
          </Tabs>
        </Box>
        {tab_idx === 0 && (
          <ExperienceTimeline experience_list={WORK} collapsed_item_count={2} />
        )}
        {tab_idx === 1 && (
          <ExperienceTimeline
            experience_list={EDUCATION}
            collapsed_item_count={2}
          />
        )}
      </Box>

      {/* Tech Stack */}
      <TechStack />

      {/* Featured Projects */}
      <Box>
        <SectionHeader
          title="Featured Projects"
          trailing={
            <Link href="/project" style={{ textDecoration: "none" }}>
              <Button size="small" sx={{ color: "text.secondary" }}>
                View all →
              </Button>
            </Link>
          }
        />
        <ItemGrid
          items={PROJECTS}
          total_featured_items={{ xs: 1, sm: 2, md: 3 }}
          render_item={(project, index) => (
            <Project key={index} project={project} />
          )}
        />
      </Box>
    </Box>
  );
}
