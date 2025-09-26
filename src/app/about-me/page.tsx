import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid2 as Grid,
} from "@mui/material";

import React from "react";

export default function Page() {
  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        px: 3,
        py: 6,
        fontFamily: "Roboto, sans-serif",
      }}
    >
      {/* Profile Header */}
      <Box display="flex" alignItems="center" mb={4}>
        <Avatar
          src="/profile.jpg" // Replace with your image
          sx={{ width: 96, height: 96, mr: 3 }}
        />
        <Box>
          <Typography variant="h4" fontWeight="500">
            Ray Kwan
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Software Engineer • Designer • Problem Solver
          </Typography>
        </Box>
      </Box>

      {/* About Section */}
      <Card variant="outlined" sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            About Me
          </Typography>
          <Typography variant="body1" color="text.secondary">
            I’m a passionate developer with experience in building scalable web
            applications, crafting clean UI, and solving complex problems. I
            love exploring new technologies, working in collaborative teams, and
            turning ideas into real products.
          </Typography>
        </CardContent>
      </Card>

      {/* Details Section */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Skills
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • JavaScript / TypeScript <br />
                • React / Next.js <br />
                • Node.js / Express <br />
                • SQL / NoSQL Databases <br />• UI/UX Design
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Interests
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Building side projects <br />
                • Hiking & outdoor adventures <br />
                • Learning about AI <br />
                • Playing the piano <br />• Photography
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Contact Section */}
      <Box textAlign="center">
        <Typography variant="body1" color="text.secondary">
          Want to connect? Reach me at{" "}
          <Typography component="span" color="primary">
            lokto.kwan@gmail.com
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
