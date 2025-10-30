"use client";

import { Box, Button, Divider, Tab, Tabs, Typography } from "@mui/material";
import { SlSocialGithub, SlSocialLinkedin } from "react-icons/sl";
import { education, work } from "@/lib/experience";

import { EmailButton } from "@/ui/email_button";
import { Experience } from "@/ui/experience";
import { FaExclamation } from "react-icons/fa";
import { HRefButton } from "@/ui/href_button";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineCloudDownload } from "react-icons/md";
import { PiHandWavingBold } from "react-icons/pi";
import Projects from "@/ui/projects";
import { TechStack } from "@/ui/tech_stack";
import { handle_download } from "@/utils/download";
import { useState } from "react";

export default function Home() {
  const [tab_idx, set_tab_idx] = useState(0);

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
            maxWidth: "40vw",
            maxHeight: "24vh",
          }}
        />
        <Box display="flex">
          <PiHandWavingBold
            style={{ display: "inline", marginRight: "8px" }}
            size={30}
          />
          <Typography variant="h6" pl={1}>
            Hi, I&apos;m Ray
          </Typography>
          <FaExclamation
            style={{ marginTop: "6px", display: "inline" }}
            size={20}
          />
        </Box>
        <Box pt={2}>
          <Typography>
            I&apos;m a Senior Software Developer with experience leading
            cross-functional teams and delivering high-precision,
            performance-driven applications. Skilled in full-stack development,
            software design, and collaborating with stakeholders to turn complex
            problems into impactful solutions.
          </Typography>
          <Typography pt={2}>
            Recently, I&apos;ve been developing an automated skate sharpening
            and profiling technology now endorsed by multiple NHL teams and
            recognized for greatly improving workflow efficiency and accuracy.
          </Typography>
        </Box>

        <Box pt={2} display="flex" flexWrap="wrap" gap={2}>
          <Button
            variant="outlined"
            onClick={() =>
              handle_download("/portfolio/Resume.pdf", "ray_resume.pdf")
            }
          >
            Resume
            <MdOutlineCloudDownload style={{ marginLeft: "4px" }} size={25} />
          </Button>

          <Box display="flex" alignItems="center" gap={2}>
            <HRefButton url="https://www.linkedin.com/in/loktokwan/">
              <SlSocialLinkedin size={23} className="text-gray-400" />
            </HRefButton>
            <HRefButton url="https://github.com/kwanlokto">
              <SlSocialGithub size={23} className="text-gray-400" />
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
      {tab_idx === 0 && <Experience experience_list={work} />}
      {tab_idx === 1 && <Experience experience_list={education} />}

      <Divider sx={{ my: 1 }} />

      {/* Tech Stack Section */}
      <TechStack />

      <Divider sx={{ my: 1 }} />

      {/* Featured Projects */}
      <Box pt={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold" mb={1} pl={3.5}>
            Featured Projects
          </Typography>
          <Link href="/project">
            <Button>View More</Button>
          </Link>
        </Box>
        <Projects total_featured_projects={{ xs: 1, sm: 2, md: 3 }} />
      </Box>
    </Box>
  );
}
