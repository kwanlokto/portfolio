"use client";

import { Box, Card, Divider, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";

import ArchitectureDiagram from "@/ui/system_design/architecture_diagram";
import { NotificationSystem } from "@/ui/system_design/notification_system";
import { SchemaDesign } from "@/ui/system_design/schema_design";
import { SystemDesignStudy } from "@/lib/system_design";
import { TechnicalDetails } from "@/ui/system_design/technical_details";
import { WorkflowDiagram } from "@/ui/system_design/workflow_diagram";

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
    { id: 0, label: "Workflow" },
    { id: 1, label: "Architecture" },
    { id: 2, label: "Notifications" },
    { id: 3, label: "Schema Design" },
    { id: 4, label: "Technical" },
  ];

  return (
    <Box>
      {/* Title + Description */}
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

      {/* Tabs */}
      <Card variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth" // ⭐ force full responsive layout
          aria-label="system design tabs"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
          }}
        >
          {tabConfig.map((t) => (
            <Tab
              key={t.id}
              label={t.label}
              sx={{
                flex: 1, // ⭐ tabs shrink evenly
                minWidth: 0, // allow compression
                padding: "6px 0", // reduce mobile height
                fontSize: "0.8rem", // optional: smaller text on mobile
              }}
            />
          ))}
        </Tabs>

        {/* Switched to Box instead of nested Card to prevent overflow on mobile */}
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          {activeTab === 0 && (
            <WorkflowDiagram steps={system_design_study.steps || []} />
          )}

          {activeTab === 1 && (
            <ArchitectureDiagram
              layers={system_design_study.architecture_diagram || []}
            />
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
            <SchemaDesign
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
      </Card>
    </Box>
  );
}
