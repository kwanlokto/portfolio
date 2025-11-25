import {
  Avatar,
  Box,
  Grid2 as Grid,
  Paper,
  Stack,
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

const borderedSx = (color = "primary.main") => ({
  p: 2,
  borderRadius: 2,
  border: 2,
  borderColor: color,
});

interface ArchitectureContent {
  title: string;
  body?: string;
  desc?: string;
}
export interface ArchitectureLayer {
  title: string;
  color: string;
  content: ArchitectureContent[];
}

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

    architecture_diagram: [
      // ---------------------------------------------------------
      // Client Layer
      // ---------------------------------------------------------
      {
        title: "Client Layer",
        color: "primary.main",
        content: [
          { title: "Customer App", body: "iOS / Android / Web" },
          { title: "Driver App", body: "iOS / Android" },
        ],
        content_bg: "primary.lighter",
      },

      // ---------------------------------------------------------
      // API Gateway
      // ---------------------------------------------------------
      {
        title: "API Gateway / Load Balancer",
        color: "success.main",
        content: (
          <Typography variant="body2" color="text.secondary">
            Route requests, authentication, rate limiting
          </Typography>
        ),
      },

      // ---------------------------------------------------------
      // Core Services
      // ---------------------------------------------------------
      {
        title: "Core Services",
        color: "secondary.main",
        content: [
          { title: "User Service", desc: "Authentication, profiles" },
          { title: "Ride Service", desc: "Request, cancel, status" },
          { title: "Matching Service", desc: "Driver-customer pairing" },
          { title: "Location Service", desc: "Real-time tracking" },
          { title: "Notification Service", desc: "Push, SMS, email" },
          { title: "Payment Service", desc: "Transactions, billing" },
        ],
      },

      // ---------------------------------------------------------
      // Data & Storage
      // ---------------------------------------------------------
      {
        title: "Data & Storage Layer",
        color: "warning.main",
        content: [
          { title: "PostgreSQL", desc: "User, ride data", icon: <MdStorage /> },
          { title: "Redis", desc: "Caching, sessions", icon: <MdMemory /> },
          { title: "MongoDB", desc: "Location history", icon: <MdGridOn /> },
          { title: "Kafka", desc: "Event streaming", icon: <MdSyncAlt /> },
        ],
      },
    ],
  },
];
