import * as React from "react";

import { Icon, List, ListItem } from "@mui/material";

import Image from "next/image";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import Typography from "@mui/material/Typography";
import { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";

export const Experience = ({ experience_list }) => {
  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      {experience_list.map((experience, idx) => {
        return (
          <TimelineItem
            key={idx}
            position="right"
            sx={{
              display: "flex", // Ensure the timeline items are in flex layout
              alignItems: "flex-start", // Align items at the same height
            }}
          >
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot>
                <Icon sx={{ position: "relative" }}>
                  <Image
                    src={experience.icon_url}
                    alt="Next.js logo"
                    fill
                    objectFit="contain"
                    priority
                  />
                </Icon>
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Typography variant="body2" fontWeight="bold">
                {experience.timeline}
              </Typography>
              <Typography variant="h6">{experience.company}</Typography>
              <Typography fontSize="0.75rem">{experience.role}</Typography>
              <List sx={{ listStyleType: "disc" }}>
                {experience.achievements.length > 0 &&
                  experience.achievements.map(
                    (achievement: string, achievement_idx: number) => {
                      return (
                        <ListItem
                          key={achievement_idx}
                          sx={{ display: "list-item", p: 0 }}
                        >
                          <Typography variant="body2">{achievement}</Typography>
                        </ListItem>
                      );
                    }
                  )}
              </List>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};
