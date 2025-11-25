import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";

import ArchitectureDiagram from "./system_design/architecture_diagram";
import { DataModels } from "@/ui/system_design/data_models";
import { NotificationSystem } from "./system_design/notification_system";
import { WorkflowDiagram } from "./system_design/workflow_diagram";

export default function RideHailingSystem() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (e: React.SyntheticEvent, value: number) => {
    setActiveTab(value);
  };

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
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 2, md: 6 },
        bgcolor: "background.default",
      }}
    >
      <Box maxWidth="1200px" mx="auto">
        <Box sx={{ textAlign: "center", mb: 4 }}>
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
