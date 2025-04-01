"use client";

import {
  Box,
  Button,
  Grid2 as Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
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
import { grey } from "@mui/material/colors";
import { useState } from "react";

export default function Home() {
  const [tab_idx, set_tab_idx] = useState(0);

  const handle_download = async (file_path: string, file_name: string) => {
    try {
      const response = await fetch(file_path);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = file_name || "download.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
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
            Hi, I'm Ray
          </Typography>
          <FaExclamation
            style={{ marginTop: "6px", display: "inline" }}
            size={20}
          />
        </Box>
        <Box pt={2}>
          <Typography fontSize={12} className="dark:text-gray-400">
            Full Stack Developer passionate about designing efficient and
            minimal applications.
          </Typography>
          <Typography pt={1}>
            From writing my first 'Hello, World!' program to building
            cutting-edge software for the top 1% atheletes, I've always enjoyed
            tackling new challenges in the ever-evolving world of technology.
          </Typography>
          <Typography pt={2}>
            When I'm not coding, you'll probably find me lifting weights or at
            the local rink -- I recently started playing hockey and it's been a
            humbling experience! I've definitely learned the value of picking
            yourself up and trying harder (and wearing good padding).
          </Typography>
        </Box>
        <Box pt={1} display="flex" sx={{ gap: "clamp(1px, 8vw, 64px)" }}>
          <Button
            variant="outlined"
            onClick={() =>
              handle_download("/portfolio/Resume.pdf", "ray_resume.pdf")
            }
          >
            Resume
            <MdOutlineCloudDownload style={{ marginLeft: "4px" }} size={25} />
          </Button>

          <Box
            display="flex"
            alignItems="center"
            gap={2}
            sx={{ gap: "clamp(1px, 2vw, 16px)" }}
          >
            <HRefButton url="https://www.linkedin.com/in/loktokwan/">
              <SlSocialLinkedin size={23} className="text-gray-400" />
            </HRefButton>
            <HRefButton url="https://github.com/kwanlokto">
              <SlSocialGithub size={23} className="text-gray-400" />
            </HRefButton>
            <EmailButton />
          </Box>
        </Box>
      </Grid>
      <Grid size={12}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tab_idx}
            onChange={(event: React.SyntheticEvent, new_idx: number) => {
              set_tab_idx(new_idx);
            }}
          >
            <Tab
              label="Work"
              sx={{
                color: "gray",
                "&:hover": { color: grey[400] },
                "&.Mui-selected": { color: "white" },
              }}
            />
            <Tab
              label="Education"
              sx={{
                color: "gray",
                "&:hover": { color: grey[400] },
                "&.Mui-selected": { color: "white" },
              }}
            />
          </Tabs>
        </Box>
        {tab_idx == 0 && <Experience experience_list={work} />}
        {tab_idx == 1 && <Experience experience_list={education} />}
      </Grid>
      <Grid size={12}>
        <TechStack />
      </Grid>
      <Grid size={12} pt={2}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" className="dark:white" mb={1} pl={3.5}>
            Featured Projects
          </Typography>
          <Link href="/project">
            <Button> view more </Button>
          </Link>
        </Box>
        <Projects total_featured_projects={2} />
      </Grid>
    </Grid>
  );
}
