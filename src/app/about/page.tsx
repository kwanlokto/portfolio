import { Box, Button, Grid2 as Grid, Typography } from "@mui/material";

import { Experience } from "@/ui/experience";
import { MdOutlineCloudDownload } from "react-icons/md";
import { PiHandWaving } from "react-icons/pi";
import { work_experience } from "@/lib/experience";

export default async function Page() {
  return (
    <Grid container p={2}>
      <Grid size={8}>
        <Box>
          <Typography>
            <PiHandWaving /> I'm Ray a Software Developer
          </Typography>
        </Box>
        <Box>
          <Typography>
            I like to code, play video games and stay active. I am always
            excited to take on new challenges. I recently started learning to
            play hockey, and I’ve been totally hooked on it ever since!
          </Typography>
        </Box>
        <Box>
          <Button>
            Resume <MdOutlineCloudDownload />
          </Button>
        </Box>
      </Grid>
      <Grid size={4}># Photo here</Grid>
      <Grid size={12} p={6}>
        <Experience experience_list={work_experience} />
      </Grid>
    </Grid>
  );
}
