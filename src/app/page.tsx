"use client";

import {
  Box,
  Button,
  Divider,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { SlSocialGithub, SlSocialLinkedin } from "react-icons/sl";
import { education, work } from "@/lib/experience";

import { BoldText } from "@/ui/bold_text";
import { EmailButton } from "@/ui/email_button";
import { Experience } from "@/ui/experience";
import { HRefButton } from "@/ui/href_button";
import Image from "next/image";
import { ItemGrid } from "@/ui/item_grid";
import Link from "next/link";
import { MdOutlineCloudDownload } from "react-icons/md";
import { PiHandWavingBold } from "react-icons/pi";
import { Project } from "@/ui/project_card";
import { SiLeetcode } from "react-icons/si";
import { TechStack } from "@/ui/tech_stack";
import { handle_download } from "@/utils/download";
import { projects } from "@/lib/project";
import { useState } from "react";

export default function Home() {
  const [tab_idx, set_tab_idx] = useState(0);
  const current_year = new Date().getFullYear();

  const theme = useTheme();

  return (
    <Box>
      {/* Header Section */}
      <Box>
        <Image
          src="/portfolio/Profile Picture.jpg"
          alt="Ray's Picture"
          width={200}
          height={200}
          style={{
            objectFit: "cover",
            float: "right",
            marginLeft: "24px",
            marginBottom: "24px",
            borderRadius: "24px",
            maxWidth: "35vw",
            maxHeight: "24vh",
          }}
        />
        <Box display="flex">
          <PiHandWavingBold
            style={{
              display: "inline",
              marginRight: "8px",
              animation: "wave 3s infinite",
              transformOrigin: "70% 70%",
            }}
            size={30}
          />
          <Typography variant="h5" pl={1} fontWeight="bold">
            Hi, I&apos;m Ray!
          </Typography>
        </Box>
        <Box pt={2}>
          <Typography variant="body2">
            I&apos;m a Senior Software Engineer with
            <BoldText> {current_year - 2019} years </BoldText> of experience
            leading cross-functional teams and delivering high-precision,
            performance-driven applications. Skilled in full-stack development,
            systems design, and collaborating with stakeholders to turn complex
            problems into impactful solutions.
            <br />
            <br />
            Recently, I&apos;ve been developing an automated skate sharpening
            and profiling technology endorsed by
            <BoldText> 7+ NHL teams</BoldText>.
          </Typography>
        </Box>

        <Box pt={2} display="flex" flexWrap="wrap" gap={2}>
          <Button
            variant="outlined"
            onClick={() =>
              handle_download("/portfolio/Resume.pdf", "ray_resume.pdf")
            }
            sx={{ borderWidth: 2 }}
          >
            Resume
            <MdOutlineCloudDownload style={{ marginLeft: "4px" }} size={25} />
          </Button>

          <Box display="flex" alignItems="center" gap={2}>
            <HRefButton url="https://www.linkedin.com/in/loktokwan/">
              <SlSocialLinkedin
                size={23}
                color={theme.palette.text.secondary}
              />
            </HRefButton>
            <HRefButton url="https://github.com/kwanlokto">
              <SlSocialGithub size={23} color={theme.palette.text.secondary} />
            </HRefButton>
            <HRefButton url="https://leetcode.com/u/GyBaljomA8/">
              <SiLeetcode size={23} color={theme.palette.text.secondary} />
            </HRefButton>
            <EmailButton />
          </Box>
        </Box>
      </Box>

      {/* Tabs Section */}
      <Box pt={2} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tab_idx}
          onChange={(e: React.SyntheticEvent, new_idx: number) =>
            set_tab_idx(new_idx)
          }
        >
          <Tab
            label="Work"
            sx={{
              color: "grey",
              "&:hover": { color: "text.primary" },
              "&.Mui-selected": { color: "text.primary" },
            }}
          />
          <Tab
            label="Education"
            sx={{
              color: "grey",
              "&:hover": { color: "text.primary" },
              "&.Mui-selected": { color: "text.primary" },
            }}
          />
        </Tabs>
      </Box>
      {tab_idx === 0 && (
        <Experience experience_list={work} collapsed_item_count={1} />
      )}
      {tab_idx === 1 && (
        <Experience experience_list={education} collapsed_item_count={2} />
      )}

      <Divider sx={{ my: 1 }} />

      {/* Tech Stack Section */}
      <TechStack />

      <Divider sx={{ my: 1 }} />

      {/* Featured Projects */}
      <Box pt={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Featured Projects
          </Typography>
          <Link href="/project">
            <Button sx={{ mb: 1 }}>View More</Button>
          </Link>
        </Box>
        <ItemGrid
          items={projects}
          total_featured_items={{ xs: 1, sm: 2, md: 3 }}
          render_item={(project, index) => (
            <Project key={index} project={project} />
          )}
        />
      </Box>
      {/* TODO: showcase github graph */}
      {/* <img src="https://github-readme-activity-graph.vercel.app/graph?username=kwanlokto&theme=github" /> */}
    </Box>
  );
}
