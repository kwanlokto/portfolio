import { system_design_blog } from "@/lib/system_design";
import ArchitectureDiagram from "@/ui/system_design/architecture_diagram";
import { DataModels } from "@/ui/system_design/data_models";
import { NotificationSystem } from "@/ui/system_design/notification_system";
import { TechnicalDetails } from "@/ui/system_design/technical_details";
import { WorkflowDiagram } from "@/ui/system_design/workflow_diagram";
import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const [activeTab, setActiveTab] = useState(0);

  const post = system_design_blog.find((post) => post.id === id);

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
          {activeTab === 0 && (
            <ArchitectureDiagram layers={post?.architecture_diagram} />
          )}
          {activeTab === 1 && <WorkflowDiagram steps={post?.steps} />}
          {activeTab === 2 && (
            <NotificationSystem
              alerts={post?.alerts}
              channels={post?.channels}
            />
          )}
          {activeTab === 3 && (
            <DataModels schema_definitions={post?.schema_definitions} />
          )}
          {activeTab === 4 && (
            <TechnicalDetails
              scalability_items={post?.scalability_items}
              technical_sections={post?.technical_sections}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
