"use client";

import { SystemDesignStudy } from "@/lib/system_design";
import ArchitectureDiagram from "@/ui/system_design/architecture_diagram";
import { DataModels } from "@/ui/system_design/data_models";
import { NotificationSystem } from "@/ui/system_design/notification_system";
import { TechnicalDetails } from "@/ui/system_design/technical_details";
import { WorkflowDiagram } from "@/ui/system_design/workflow_diagram";
import { Box, Divider, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";

export default function SystemDesignClient({
  system_design_study,
}: {
  system_design_study: SystemDesignStudy;
}) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (e: React.SyntheticEvent, value: number) => {
    setActiveTab(value);
  };

  const tabConfig = [
    { id: 0, label: "Architecture" },
    { id: 1, label: "Workflow" },
    { id: 2, label: "Notifications" },
    { id: 3, label: "Data Models" },
    { id: 4, label: "Technical" },
  ];

  return (
    <Box>
      <Box mb={2}>
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          {system_design_study.name}
        </Typography>
        <Divider sx={{ width: 60, borderBottomWidth: 3, mb: 1 }} />

        <Typography variant="body1" color="text.secondary">
          {system_design_study.description}
        </Typography>
      </Box>

      <Paper sx={{ mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="system design tabs"
        >
          {tabConfig.map((t) => (
            <Tab key={t.id} label={t.label} />
          ))}
        </Tabs>
      </Paper>

      <Box>
        {activeTab === 0 && (
          <ArchitectureDiagram
            layers={system_design_study.architecture_diagram || []}
          />
        )}
        {activeTab === 1 && (
          <WorkflowDiagram steps={system_design_study.steps || []} />
        )}
        {activeTab === 2 && (
          <NotificationSystem
            alerts={system_design_study.alerts || []}
            notification_channels={
              system_design_study.notification_channels || []
            }
          />
        )}
        {activeTab === 3 && (
          <DataModels
            schema_definitions={system_design_study.schema_definitions || []}
          />
        )}
        {activeTab === 4 && (
          <TechnicalDetails
            scalability_items={system_design_study.scalability_items || []}
            technical_sections={system_design_study.technical_sections || []}
          />
        )}
      </Box>
    </Box>
  );
}
