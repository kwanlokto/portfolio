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
  icon?: React.ReactNode;
}
export interface ArchitectureLayer {
  title: string;
  color: string;
  content: ArchitectureContent[];
}

export interface AlertItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: "primary" | "secondary" | "success" | "warning" | "error";
  messages: string[];
}

export interface ChannelItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface WorkFlowItem {
  step: number;
  title: string;
  desc: string;
  color: string;
}

export interface ScalabilityItem {
  icon: React.ReactNode;
  text: string;
}

export interface TechnicalSectionItem {
  title: string;
  text: string;
  code?: string; // optional because not all items have code
}

export interface TechnicalSection {
  title: string;
  color: string; // e.g. "info.main", "success.main"
  items: TechnicalSectionItem[];
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

    notification_system: {
      alerts: [
        {
          title: "Driver Arrived",
          description: "Triggered when driver is within 50m of pickup location",
          color: "success",
          icon: <MdCheckCircle />,
          messages: [
            `Push: "Your driver has arrived!"`,
            `SMS: "Driver John in Toyota Camry (ABC123) is here"`,
          ],
        },
        {
          title: "Driver Running Late",
          description:
            "Triggered when ETA exceeds original estimate by 5+ minutes",
          color: "warning",
          icon: <MdAccessTime />,
          messages: [
            `Push: "Your driver is running 7 minutes late"`,
            `In-app: Updated ETA with option to cancel`,
          ],
        },
        {
          title: "Driver En Route",
          description: "Continuous updates as driver approaches",
          color: "primary",
          icon: <MdDriveEta />,
          messages: [
            `Push: "Driver is 2 minutes away"`,
            "Real-time map tracking in app",
          ],
        },
      ],
      channels: [
        {
          title: "Push Notifications",
          description: "Primary channel via FCM / APNs",
          icon: <MdNotifications />,
        },
        {
          title: "In-App Updates",
          description: "WebSocket for real-time tracking",
          icon: <MdPlace />,
        },
        {
          title: "SMS Fallback",
          description: "Critical alerts via Twilio",
          icon: <MdReportProblem />,
        },
      ],
    },

    steps: [
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
    ],

    scalability_items: [
      {
        icon: <MdMemory color="error" />,
        text: "Use Redis for caching driver locations and active ride states",
      },
      {
        icon: <MdGridOn color="error" />,
        text: "Implement database sharding by geographic region",
      },
      {
        icon: <MdSyncAlt color="error" />,
        text: "Use message queues (Kafka/RabbitMQ) for asynchronous notification delivery",
      },
      {
        icon: <MdGpsFixed color="error" />,
        text: "WebSocket servers for real-time location updates with horizontal scaling",
      },
      {
        icon: <MdQueryBuilder color="error" />,
        text: "CDN for static assets, separate read replicas for analytics",
      },
    ],

    technical_sections: [
      {
        title: "ETA Calculation & Delay Detection",
        color: "info.main",
        items: [
          {
            title: "Initial ETA",
            text: "Use Google Maps / Mapbox routing API for accurate drive time based on real-time traffic",
          },
          {
            title: "Continuous Monitoring",
            text: "Recalculate ETA every 30 seconds using current location and traffic conditions",
          },
          {
            title: "Delay Threshold",
            text: `If new ETA exceeds original by 5+ minutes, trigger "running late" notification`,
          },
        ],
      },
      {
        title: "Geospatial & Proximity Detection",
        color: "success.main",
        items: [
          {
            title: "Driver Matching",
            text: "Use PostGIS or MongoDB geospatial index for finding nearby drivers:",
            code: `SELECT * FROM drivers 
WHERE ST_DWithin(location, customer_location, 5000)`,
          },
          {
            title: "Arrival Detection",
            text: "Calculate distance between driver and pickup using Haversine formula, trigger notification at 50m threshold",
          },
        ],
      },
    ],
  },
];
