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
import { handle_download } from "@/utils/download";

export default function Home() {
  const [tab_idx, set_tab_idx] = useState(0);

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
            Hi, I&apos;m Ray
          </Typography>
          <FaExclamation
            style={{ marginTop: "6px", display: "inline" }}
            size={20}
          />
        </Box>
        <Box pt={2}>
          <Typography pt={1}>
            I’m a Senior developer who is passionate about learning new technologies
            and creating efficient, minimalistic applications. Most of my time lately
            has been spent been developing software used by professional athletes in the NHL. 
          </Typography>
          <Typography pt={2}>
            When I&apos;m not coding, you&apos;ll probably find me lifting weights or at
            the local rink – I recently started playing hockey and it&apos;s been a
            humbling experience! I&apos;ve definitely learned the value of picking
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
