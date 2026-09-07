"use client";

import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import {
  CAREER_START_YEAR,
  EDUCATION,
  NUMBER_OF_NHL_TEAMS,
  WORK,
} from "@/lib/experience";

import { BoldText } from "@/ui/bold_text";
import { ExperienceTimeline } from "@/ui/experience_timeline";
import { FEATURED_PROJECTS } from "@/lib/project";
import { HeroActions } from "@/ui/hero_actions";
import Image from "next/image";
import { ItemGrid } from "@/ui/item_grid";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import { PiHandWavingBold } from "react-icons/pi";
import { ProjectCard } from "@/ui/card/project_card";
import { SectionHeader } from "@/ui/section_header";
import { TechStack } from "@/ui/tech_stack";
import { asset } from "@/lib/site";
import { useState } from "react";

const EXPERIENCE_TABS = [
  { label: "Work", data: WORK },
  { label: "Education", data: EDUCATION },
];

export default function Home() {
  const [tab_idx, set_tab_idx] = useState(0);
  const current_year = new Date().getFullYear();

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: { xs: 4, sm: 4 } }}
    >
      {/* Hero */}
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: { xs: "flex-start", sm: "center" },
            textAlign: "left",
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 1,
                mb: 1,
              }}
            >
              <PiHandWavingBold
                style={{
                  animation: "wave 3s infinite",
                  transformOrigin: "70% 70%",
                }}
                size={22}
              />
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                Hi, I&apos;m Ray
              </Typography>
            </Box>

            <Typography
              variant="h4"
              component="h1"
              sx={{
                mb: { xs: 2, sm: 3 },
                fontSize: { xs: "1.5rem", sm: "1.875rem" },
              }}
            >
              Chief Technology Officer
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: 560,
              }}
            >
              {current_year - CAREER_START_YEAR} years building full-stack
              systems and leading cross-functional teams. Currently developing
              the automated skate tuning platform used by{" "}
              <BoldText>{NUMBER_OF_NHL_TEAMS}+ NHL teams</BoldText>.
            </Typography>

            {/* Desktop: buttons inside the text column */}
            <HeroActions sx={{ display: { xs: "none", sm: "flex" } }} />
          </Box>

          <Box
            sx={{
              position: "relative",
              width: { xs: 120, sm: 160 },
              height: { xs: 180, sm: 200 },
              flexShrink: 0,
            }}
          >
            <Image
              src={asset("/Profile Picture.jpg")}
              alt="Ray Kwan"
              fill
              priority
              sizes="(max-width: 600px) 120px, 160px"
              style={{
                objectFit: "cover",
                borderRadius: 16,
              }}
            />
          </Box>
        </Box>

        {/* Mobile: buttons below the row, full width */}
        <HeroActions sx={{ display: { xs: "flex", sm: "none" } }} />
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
            {EXPERIENCE_TABS.map((tab) => (
              <Tab key={tab.label} label={tab.label} />
            ))}
          </Tabs>
        </Box>
        <ExperienceTimeline
          experience_list={EXPERIENCE_TABS[tab_idx].data}
          collapsed_item_count={2}
        />
      </Box>

      {/* Tech Stack */}
      <TechStack />

      {/* Featured Projects */}
      <Box>
        <SectionHeader
          title="Featured Projects"
          trailing={
            <Button
              component={Link}
              href="/project"
              size="small"
              endIcon={<MdArrowForward size={16} />}
              sx={{ color: "text.secondary" }}
            >
              View all
            </Button>
          }
        />
        <ItemGrid>
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </ItemGrid>
      </Box>
    </Box>
  );
}
