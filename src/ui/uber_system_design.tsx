import {
  Avatar,
  Box,
  Divider,
  Grid2 as Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
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
import React, { useState } from "react";

export default function RideHailingSystem() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (e: React.SyntheticEvent, value: number) => {
    setActiveTab(value);
  };

  /* ---------------------------
     Styles helpers (sx)
     --------------------------- */
  const containerSx = {
    minHeight: "100vh",
    p: { xs: 2, md: 6 },
    bgcolor: "background.default",
  };

  const headerSx = { textAlign: "center", mb: 4 };

  const cardSx = { borderRadius: 2, boxShadow: 3, bgcolor: "background.paper" };

  const sectionTitleSx = { mb: 2, fontWeight: 700 };

  const borderedSx = (color = "primary.main") => ({
    p: 2,
    borderRadius: 2,
    border: 2,
    borderColor: color,
  });

  /* ---------------------------
     Subcomponents (kept inline)
     --------------------------- */

  const ArchitectureDiagram = () => (
    <Stack spacing={3}>
      <Typography variant="h5" sx={sectionTitleSx}>
        System Architecture
      </Typography>

      <Paper sx={{ ...cardSx, p: 3 }}>
        <Stack spacing={3}>
          {/* Client Layer */}
          <Box sx={borderedSx("primary.main")}>
            <Typography
              variant="subtitle1"
              color="primary"
              sx={{ fontWeight: 700, mb: 1 }}
            >
              Client Layer
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper
                  sx={{ p: 2, borderRadius: 1, bgcolor: "primary.lighter" }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Customer App
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    iOS / Android / Web
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper
                  sx={{ p: 2, borderRadius: 1, bgcolor: "primary.lighter" }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Driver App
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    iOS / Android
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          {/* API Gateway */}
          <Box sx={borderedSx("success.main")}>
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
          </Box>

          {/* Core Services */}
          <Box sx={borderedSx("secondary.main")}>
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
          </Box>

          {/* Data Layer */}
          <Box sx={borderedSx("warning.main")}>
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
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 700 }}
                        >
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
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );

  const NotificationSystem = () => (
    <Stack spacing={3}>
      <Typography variant="h5" sx={sectionTitleSx}>
        Notification System
      </Typography>

      <Paper sx={{ ...cardSx, p: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
          Key Alert Scenarios
        </Typography>

        <Stack spacing={2}>
          {/* Driver Arrived */}
          <Paper
            sx={{
              p: 2,
              borderLeft: 4,
              borderColor: "success.main",
              bgcolor: "success.lighter",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <MdCheckCircle style={{ marginTop: 4, color: "success.main" }} />
              <Box>
                <Typography
                  variant="subtitle2"
                  color="success.dark"
                  sx={{ fontWeight: 700 }}
                >
                  Driver Arrived
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Triggered when driver is within 50m of pickup location
                </Typography>
                <Paper variant="outlined" sx={{ mt: 1, p: 1, borderRadius: 1 }}>
                  <Typography
                    component="code"
                    variant="caption"
                    display="block"
                  >
                    Push: &quot;Your driver has arrived!&quot;
                  </Typography>
                  <Typography
                    component="code"
                    variant="caption"
                    display="block"
                  >
                    SMS: &quot;Driver John in Toyota Camry (ABC123) is
                    here&quot;
                  </Typography>
                </Paper>
              </Box>
            </Stack>
          </Paper>

          {/* Driver Running Late */}
          <Paper
            sx={{
              p: 2,
              borderLeft: 4,
              borderColor: "warning.main",
              bgcolor: "warning.lighter",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <MdAccessTime style={{ marginTop: 4, color: "warning.main" }} />
              <Box>
                <Typography
                  variant="subtitle2"
                  color="warning.dark"
                  sx={{ fontWeight: 700 }}
                >
                  Driver Running Late
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Triggered when ETA exceeds original estimate by 5+ minutes
                </Typography>
                <Paper variant="outlined" sx={{ mt: 1, p: 1, borderRadius: 1 }}>
                  <Typography
                    component="code"
                    variant="caption"
                    display="block"
                  >
                    Push: &quot;Your driver is running 7 minutes late&quot;
                  </Typography>
                  <Typography
                    component="code"
                    variant="caption"
                    display="block"
                  >
                    In-app: Updated ETA with option to cancel
                  </Typography>
                </Paper>
              </Box>
            </Stack>
          </Paper>

          {/* Driver En Route */}
          <Paper
            sx={{
              p: 2,
              borderLeft: 4,
              borderColor: "primary.main",
              bgcolor: "primary.lighter",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <MdDriveEta style={{ marginTop: 4, color: "primary.main" }} />
              <Box>
                <Typography
                  variant="subtitle2"
                  color="primary.dark"
                  sx={{ fontWeight: 700 }}
                >
                  Driver En Route
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Continuous updates as driver approaches
                </Typography>
                <Paper variant="outlined" sx={{ mt: 1, p: 1, borderRadius: 1 }}>
                  <Typography
                    component="code"
                    variant="caption"
                    display="block"
                  >
                    Push: &quot;Driver is 2 minutes away&quot;
                  </Typography>
                  <Typography
                    component="code"
                    variant="caption"
                    display="block"
                  >
                    Real-time map tracking in app
                  </Typography>
                </Paper>
              </Box>
            </Stack>
          </Paper>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
          Notification Channels
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2 }}>
              <Stack spacing={1} alignItems="flex-start">
                <MdNotifications style={{ fontSize: 36 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  Push Notifications
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Primary channel via FCM / APNs
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2 }}>
              <Stack spacing={1} alignItems="flex-start">
                <MdPlace style={{ fontSize: 36 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  In-App Updates
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  WebSocket for real-time tracking
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2 }}>
              <Stack spacing={1} alignItems="flex-start">
                <MdReportProblem style={{ fontSize: 36 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  SMS Fallback
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Critical alerts via Twilio
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );

  const DataModels = () => (
    <Stack spacing={3}>
      <Typography variant="h5" sx={sectionTitleSx}>
        Core Data Models
      </Typography>

      <Stack spacing={2}>
        <Paper sx={{ ...cardSx, p: 2 }}>
          <Typography
            variant="subtitle1"
            color="secondary.main"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Ride
          </Typography>
          <Paper
            variant="outlined"
            sx={{ p: 2, borderRadius: 1, bgcolor: "grey.50" }}
          >
            <Typography
              component="pre"
              variant="body2"
              sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}
            >
              {`{
  ride_id: UUID,
  customer_id: UUID,
  driver_id: UUID (nullable),
  status: ENUM [
    'REQUESTED',
    'DRIVER_ASSIGNED',
    'DRIVER_EN_ROUTE',
    'DRIVER_ARRIVED',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED'
  ],
  pickup_location: { latitude, longitude, address },
  dropoff_location: { latitude, longitude, address },
  estimated_arrival_time: TIMESTAMP,
  actual_arrival_time: TIMESTAMP,
  estimated_fare: DECIMAL,
  actual_fare: DECIMAL,
  requested_at: TIMESTAMP,
  completed_at: TIMESTAMP,
  cancelled_at: TIMESTAMP,
  cancellation_reason: STRING
}`}
            </Typography>
          </Paper>
        </Paper>

        <Paper sx={{ ...cardSx, p: 2 }}>
          <Typography
            variant="subtitle1"
            color="primary.main"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            User (Customer / Driver)
          </Typography>
          <Paper
            variant="outlined"
            sx={{ p: 2, borderRadius: 1, bgcolor: "grey.50" }}
          >
            <Typography
              component="pre"
              variant="body2"
              sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}
            >
              {`{
  user_id: UUID,
  email: STRING,
  phone: STRING,
  name: STRING,
  user_type: ENUM ['CUSTOMER', 'DRIVER'],
  rating: DECIMAL,
  notification_preferences: { push_enabled, sms_enabled, email_enabled },
  created_at: TIMESTAMP,
  last_active: TIMESTAMP
}`}
            </Typography>
          </Paper>
        </Paper>

        <Paper sx={{ ...cardSx, p: 2 }}>
          <Typography
            variant="subtitle1"
            color="success.main"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Location Update
          </Typography>
          <Paper
            variant="outlined"
            sx={{ p: 2, borderRadius: 1, bgcolor: "grey.50" }}
          >
            <Typography
              component="pre"
              variant="body2"
              sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}
            >
              {`{
  location_id: UUID,
  user_id: UUID,
  ride_id: UUID,
  latitude: DECIMAL,
  longitude: DECIMAL,
  heading: INTEGER (0-359),
  speed: DECIMAL,
  accuracy: DECIMAL,
  timestamp: TIMESTAMP
}`}
            </Typography>
          </Paper>
        </Paper>
      </Stack>
    </Stack>
  );

  const WorkflowDiagram = () => {
    const steps = [
      {
        step: 1,
        title: "Customer Requests Ride",
        desc: "Customer enters pickup/dropoff, confirms request",
        color: "primary.main",
      },
      {
        step: 2,
        title: "Ride Created & Matching",
        desc: "System finds nearby available drivers using geospatial queries",
        color: "secondary.main",
      },
      {
        step: 3,
        title: "Driver Assignment",
        desc: "Driver accepts ride, customer notified with driver details + ETA",
        color: "success.main",
      },
      {
        step: 4,
        title: "Real-time Tracking",
        desc: "Driver location updates every 3-5 seconds via WebSocket",
        color: "info.main",
      },
      {
        step: 5,
        title: "ETA Monitoring",
        desc: "System continuously calculates ETA, triggers alert if delayed",
        color: "warning.main",
      },
      {
        step: 6,
        title: "Arrival Detection",
        desc: "When driver within 50m, send 'Driver Arrived' notification",
        color: "success.main",
      },
      {
        step: 7,
        title: "Ride Completion",
        desc: "Customer dropped off, payment processed, rating requested",
        color: "primary.main",
      },
    ];

    return (
      <Stack spacing={3}>
        <Typography variant="h5" sx={sectionTitleSx}>
          Ride Request Workflow
        </Typography>

        <Paper sx={{ ...cardSx, p: 3 }}>
          <Stack spacing={2}>
            {steps.map((item) => (
              <Stack
                key={item.step}
                direction="row"
                spacing={2}
                alignItems="flex-start"
              >
                <Avatar
                  sx={{
                    bgcolor: item.color,
                    width: 40,
                    height: 40,
                    fontWeight: 700,
                  }}
                >
                  {item.step}
                </Avatar>
                <Box flex={1}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.desc}
                  </Typography>
                </Box>
              </Stack>
            ))}

            <Paper
              sx={{
                mt: 2,
                p: 2,
                bgcolor: "warning.lighter",
                borderLeft: 4,
                borderColor: "warning.main",
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <MdReportProblem />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  Cancellation Flow
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Customer can cancel at any time before pickup. After driver
                assignment, cancellation fee may apply. Driver notified
                immediately, ride marked as cancelled, driver returns to
                available pool.
              </Typography>
            </Paper>
          </Stack>
        </Paper>
      </Stack>
    );
  };

  const TechnicalDetails = () => (
    <Stack spacing={3}>
      <Typography variant="h5" sx={sectionTitleSx}>
        Technical Implementation
      </Typography>

      <Stack spacing={2}>
        <Paper sx={{ ...cardSx, p: 2 }}>
          <Typography
            variant="subtitle1"
            color="info.main"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            ETA Calculation & Delay Detection
          </Typography>
          <Stack spacing={1}>
            <Paper variant="outlined" sx={{ p: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Initial ETA
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Use Google Maps / Mapbox routing API for accurate drive time
                based on real-time traffic
              </Typography>
            </Paper>

            <Paper variant="outlined" sx={{ p: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Continuous Monitoring
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Recalculate ETA every 30 seconds using current location and
                traffic conditions
              </Typography>
            </Paper>

            <Paper variant="outlined" sx={{ p: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Delay Threshold
              </Typography>
              <Typography variant="body2" color="text.secondary">
                If new ETA exceeds original by 5+ minutes, trigger &quot;running
                late&quot; notification
              </Typography>
            </Paper>
          </Stack>
        </Paper>

        <Paper sx={{ ...cardSx, p: 2 }}>
          <Typography
            variant="subtitle1"
            color="success.main"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Geospatial & Proximity Detection
          </Typography>
          <Stack spacing={1}>
            <Paper variant="outlined" sx={{ p: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Driver Matching
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Use PostGIS or MongoDB geospatial index for finding nearby
                drivers:
              </Typography>
              <Paper variant="outlined" sx={{ p: 1 }}>
                <Typography
                  component="code"
                  variant="caption"
                  sx={{ fontFamily: "monospace" }}
                >
                  SELECT * FROM drivers WHERE ST_DWithin(location,
                  customer_location, 5000)
                </Typography>
              </Paper>
            </Paper>

            <Paper variant="outlined" sx={{ p: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Arrival Detection
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Calculate distance between driver and pickup using Haversine
                formula, trigger notification at 50m threshold
              </Typography>
            </Paper>
          </Stack>
        </Paper>

        <Paper sx={{ ...cardSx, p: 2 }}>
          <Typography
            variant="subtitle1"
            color="error.main"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Scalability Considerations
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <MdMemory color="error" />
              </ListItemIcon>
              <ListItemText primary="Use Redis for caching driver locations and active ride states" />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <MdGridOn color="error" />
              </ListItemIcon>
              <ListItemText primary="Implement database sharding by geographic region" />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <MdSyncAlt color="error" />
              </ListItemIcon>
              <ListItemText primary="Use message queues (Kafka/RabbitMQ) for asynchronous notification delivery" />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <MdGpsFixed color="error" />
              </ListItemIcon>
              <ListItemText primary="WebSocket servers for real-time location updates with horizontal scaling" />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <MdQueryBuilder color="error" />
              </ListItemIcon>
              <ListItemText primary="CDN for static assets, separate read replicas for analytics" />
            </ListItem>
          </List>
        </Paper>
      </Stack>
    </Stack>
  );

  /* ---------------------------
     Tabs & Layout
     --------------------------- */

  const tabConfig = [
    { id: 0, label: "Architecture" },
    { id: 1, label: "Workflow" },
    { id: 2, label: "Notifications" },
    { id: 3, label: "Data Models" },
    { id: 4, label: "Technical" },
  ];

  return (
    <Box sx={containerSx}>
      <Box maxWidth="1200px" mx="auto">
        <Box sx={headerSx}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
            Ride-Hailing System Design
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Uber-like platform with customer notifications
          </Typography>
        </Box>

        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="ride-hailing tabs"
          >
            {tabConfig.map((t) => (
              <Tab key={t.id} label={t.label} />
            ))}
          </Tabs>
        </Paper>

        <Box>
          {activeTab === 0 && <ArchitectureDiagram />}
          {activeTab === 1 && <WorkflowDiagram />}
          {activeTab === 2 && <NotificationSystem />}
          {activeTab === 3 && <DataModels />}
          {activeTab === 4 && <TechnicalDetails />}
        </Box>
      </Box>
    </Box>
  );
}
