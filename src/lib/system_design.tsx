import { Avatar, Box, Grid2 as Grid, Paper, Stack, Typography } from "@mui/material";
import {
  MdAccessTime,
  MdCheckCircle,
  MdDriveEta,
  MdGpsFixed,
  MdGridOn,
  MdMemory,
  MdNotifications,
  MdPlace,
  MdQueryBuilder,
  MdReportProblem,
  MdStorage,
  MdSyncAlt,
} from "react-icons/md";

const borderedSx = (color = "primary.main") => ({
  p: 2,
  borderRadius: 2,
  border: 2,
  borderColor: color,
});

export const system_design_blog = [
  {
    name: "Uber System Design Case Study",
    description: (
      <>
        A comprehensive case study on the system design of Uber, covering key
        components such as ride matching, real-time tracking, and scalability
        considerations.
      </>
    ),
    system_architecture: [
      // Client Layer
      <Box key="client" sx={borderedSx("primary.main")}>
        <Typography
          variant="subtitle1"
          color="primary"
          sx={{ fontWeight: 700, mb: 1 }}
        >
          Client Layer
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ p: 2, borderRadius: 1, bgcolor: "primary.lighter" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Customer App
              </Typography>
              <Typography variant="body2" color="text.secondary">
                iOS / Android / Web
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ p: 2, borderRadius: 1, bgcolor: "primary.lighter" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Driver App
              </Typography>
              <Typography variant="body2" color="text.secondary">
                iOS / Android
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>,
      //API Gateway
      <Box key="api_gateway" sx={borderedSx("success.main")}>
        <Typography
          variant="subtitle1"
          color="success.main"
          sx={{ fontWeight: 700, mb: 1 }}
        >
          API Gateway / Load Balancer
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Route requests, authentication, rate limiting
        </Typography>
      </Box>,
      // Core Services
      <Box key="core_services" sx={borderedSx("secondary.main")}>
        <Typography
          variant="subtitle1"
          color="secondary.main"
          sx={{ fontWeight: 700, mb: 1 }}
        >
          Core Services
        </Typography>

        <Grid container spacing={2}>
          {[
            ["User Service", "Authentication, profiles"],
            ["Ride Service", "Request, cancel, status"],
            ["Matching Service", "Driver-customer pairing"],
            ["Location Service", "Real-time tracking"],
            ["Notification Service", "Push, SMS, email"],
            ["Payment Service", "Transactions, billing"],
          ].map(([title, desc], idx) => (
            <Grid key={idx} size={{ xs: 12, sm: 6, md: 4 }}>
              <Paper sx={{ p: 1.5, borderRadius: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>,
      // Data Layer
      <Box key="data" sx={borderedSx("warning.main")}>
        <Typography
          variant="subtitle1"
          color="warning.main"
          sx={{ fontWeight: 700, mb: 1 }}
        >
          Data & Storage Layer
        </Typography>
        <Grid container spacing={2}>
          {[
            ["PostgreSQL", "User, ride data", <MdStorage key="psql" />],
            ["Redis", "Caching, sessions", <MdMemory key="redis" />],
            ["MongoDB", "Location history", <MdGridOn key="mongoDB" />],
            ["Kafka", "Event streaming", <MdSyncAlt key="kafka" />],
          ].map(([title, desc, icon], idx) => (
            <Grid key={idx} size={{ xs: 12, sm: 4, md: 3 }}>
              <Paper sx={{ p: 1.5, borderRadius: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar sx={{ bgcolor: "transparent" }}>{icon}</Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {desc}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>,
    ],
  },
];
