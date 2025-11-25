import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  MdGpsFixed,
  MdGridOn,
  MdMemory,
  MdQueryBuilder,
  MdSyncAlt,
} from "react-icons/md";

// ------------------------------
// Reusable Components
// ------------------------------
const Section = ({ title, titleColor, children, cardSx }) => (
  <Paper sx={{ ...cardSx, p: 2 }}>
    <Typography
      variant="subtitle1"
      color={titleColor}
      sx={{ fontWeight: 700, mb: 1 }}
    >
      {title}
    </Typography>
    {children}
  </Paper>
);

const SubCard = ({ title, children }) => (
  <Paper variant="outlined" sx={{ p: 1 }}>
    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
      {title}
    </Typography>
    {children}
  </Paper>
);

const CodeBlock = ({ children }) => (
  <Paper variant="outlined" sx={{ p: 1 }}>
    <Typography
      component="code"
      variant="caption"
      sx={{ fontFamily: "monospace" }}
    >
      {children}
    </Typography>
  </Paper>
);

// ------------------------------
// Data-Driven Configuration
// ------------------------------
const technicalSections = [
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
];

const scalabilityItems = [
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
];

// ------------------------------
// MAIN COMPONENT
// ------------------------------
export const TechnicalDetails = ({ cardSx, sectionTitleSx }) => (
  <Stack spacing={3}>
    <Typography variant="h5" sx={sectionTitleSx}>
      Technical Implementation
    </Typography>

    <Stack spacing={2}>
      {/* Render dynamic sections */}
      {technicalSections.map((section) => (
        <Section
          key={section.title}
          title={section.title}
          titleColor={section.color}
          cardSx={cardSx}
        >
          <Stack spacing={1}>
            {section.items.map((item) => (
              <SubCard key={item.title} title={item.title}>
                <Typography variant="body2" color="text.secondary">
                  {item.text}
                </Typography>
                {item.code && <CodeBlock>{item.code}</CodeBlock>}
              </SubCard>
            ))}
          </Stack>
        </Section>
      ))}

      {/* Scalability Section */}
      <Section
        title="Scalability Considerations"
        titleColor="error.main"
        cardSx={cardSx}
      >
        <List dense>
          {scalabilityItems.map((item, i) => (
            <ListItem key={i}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Section>
    </Stack>
  </Stack>
);
