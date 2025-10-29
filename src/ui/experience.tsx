import * as React from "react";

import { Icon, List, ListItem } from "@mui/material";

import { ExperienceType } from "@/lib/experience";
import Image from "next/image";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import Typography from "@mui/material/Typography";
import { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";

interface ExperienceParams {
  experience_list: ExperienceType[];
}

export const Experience = ({ experience_list }: ExperienceParams) => {
  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      {experience_list.map((experience: ExperienceType, idx: number) => {
        return (
          <TimelineItem
            key={idx}
            position="right"
            sx={{
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot>
                <Icon sx={{ position: "relative", width: 24, height: 24 }}>
                  <Image
                    src={experience.icon_url}
                    alt={experience.icon_url.slice(1)}
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </Icon>
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[500]
                      : theme.palette.text.secondary,
                }}
              >
                {experience.timeline}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                {experience.company}
              </Typography>

              <Typography
                fontSize="0.75rem"
                fontWeight="bold"
                sx={{
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[500]
                      : theme.palette.text.secondary,
                }}
              >
                {experience.role}
              </Typography>
              {experience.achievements.length > 0 && (
                <List sx={{ listStyleType: "disc", pl: 2 }}>
                  {experience.achievements.map(
                    (achievement: React.ReactNode, achievement_idx: number) => (
                      <ListItem
                        key={achievement_idx}
                        sx={{ display: "list-item", p: 0 }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: (theme) =>
                              theme.palette.mode === "dark"
                                ? theme.palette.grey[300]
                                : theme.palette.text.secondary,
                          }}
                        >
                          {achievement}
                        </Typography>
                      </ListItem>
                    )
                  )}
                </List>
              )}
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};
