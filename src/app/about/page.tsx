"use client";

import {
  Box,
  Button,
  Grid2 as Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { education, work } from "@/lib/experience";

import { Experience } from "@/ui/experience";
import { MdOutlineCloudDownload } from "react-icons/md";
import { PiHandWaving } from "react-icons/pi";
import { useState } from "react";

export default function Page() {
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
    <Box justifyContent="center" display="flex">
      <Grid container pt={4} sx={{ width: "825px" }} spacing={2}>
        <Grid size={8}>
          <Box display="flex">
            <PiHandWaving style={{ display: "inline" }} size={25} />
            <Typography pl={1}>I'm Ray a Software Developer</Typography>
          </Box>
          <Box pt={1}>
            <Typography>
              I like to code, play video games, watch TV shows and stay active.
              I am always excited to take on new challenges!
            </Typography>
          </Box>
          <Box pt={1}>
            <Button
              variant="outlined"
              onClick={() => handle_download("/Resume.pdf", "ray_resume.pdf")}
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
              <Tab label="Work" className="dark:invert" />
              <Tab label="Education" className="dark:invert" />
            </Tabs>
          </Box>
          {tab_idx == 0 && <Experience experience_list={work} />}
          {tab_idx == 1 && <Experience experience_list={education}/>}
        </Grid>
      </Grid>
    </Box>
  );
}
