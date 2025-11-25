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

import ArchitectureDiagram from "./system_design/architecture_diagram";
import { NotificationSystem } from "./system_design/notification_system";
import { WorkflowDiagram } from "./system_design/workflow_diagram";

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
