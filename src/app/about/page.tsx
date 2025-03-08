"use client";

import {
  Box,
  Button,
  Grid2 as Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import { Experience } from "@/ui/experience";
import { MdOutlineCloudDownload } from "react-icons/md";
import { PiHandWaving } from "react-icons/pi";
import { useState } from "react";
import { work_experience } from "@/lib/experience";

export default function Page() {
  const [tab_idx, set_tab_idx] = useState(0);

  const handleDownload = async (file_path: string, file_name: string) => {
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
    <Box justifyContent="center" display="flex">
      <Grid container pt={4} sx={{ width: "700px" }} spacing={2}>
        <Grid size={8}>
          <Box display="flex">
            <PiHandWaving style={{ display: "inline" }} size={25} />
            <Typography pl={1}>I'm Ray a Software Developer</Typography>
          </Box>
          <Box pt={1}>
            <Typography>
              I like to code, play video games and stay active. I am always
              excited to take on new challenges!
            </Typography>
          </Box>
          <Box pt={1}>
            <Button
              variant="outlined"
              onClick={() =>
                handleDownload("/Resume.pdf", "ray_resume.pdf")
              }
            >
              Resume
              <MdOutlineCloudDownload style={{ marginLeft: "4px" }} size={25} />
            </Button>
          </Box>
        </Grid>
        <Grid size={4}># Photo here</Grid>
        <Grid size={12}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tab_idx}
              onChange={(event: React.SyntheticEvent, new_idx: number) => {
                set_tab_idx(new_idx);
              }}
            >
              <Tab label="Work Experience" className="dark:invert" />
              <Tab label="Education" className="dark:invert" />
            </Tabs>
          </Box>
          {tab_idx == 0 && <Experience experience_list={work_experience} />}
          {tab_idx == 1 && <></>}
        </Grid>
      </Grid>
    </Box>
  );
}
