import * as React from "react";

import { Box, Icon, List, ListItem } from "@mui/material";

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
  const [show_all, set_show_all] = React.useState(false);
  const visible_count = show_all ? experience_list.length : 2;

  return (
    <Box>
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
        }}
      >
        {experience_list
          .slice(0, visible_count)
          .map((experience: ExperienceType, idx: number) => (
            <TimelineItem
              key={idx}
              position="right"
              sx={{ display: "flex", alignItems: "flex-start" }}
            >
              <TimelineSeparator>
                {idx !== 0 && <TimelineConnector />}
                <TimelineDot>
                  <Icon sx={{ position: "relative", width: 24, height: 24 }}>
                    <Image
                      src={experience.icon_url}
                      alt={experience.company}
                      fill
                      style={{ objectFit: "contain" }}
                      priority
                    />
                  </Icon>
                </TimelineDot>
                {idx !== experience_list.length - 1 && <TimelineConnector />}
              </TimelineSeparator>

              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ color: "text.secondary" }}
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
                  fontSize={12}
                  textTransform="uppercase"
                  fontWeight="bold"
                  sx={{ color: "text.secondary" }}
                >
                  {experience.role}
                </Typography>

                {experience.achievements.length > 0 && (
                  <List sx={{ listStyleType: "disc", pl: 2 }}>
                    {experience.achievements.map(
                      (
                        achievement: React.ReactNode,
                        achievement_idx: number
                      ) => (
                        <ListItem
                          key={achievement_idx}
                          sx={{ display: "list-item", p: 0 }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: (theme) =>
                                theme.palette.mode === "dark"
                                  ? theme.palette.grey[100]
                                  : theme.palette.grey[900],
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
          ))}
      </Timeline>

      {/* Show more / less button */}
      {experience_list.length > 2 && (
        <Box textAlign="center" mb={1}>
          <Typography
            variant="body2"
            onClick={() => set_show_all(!show_all)}
            sx={{
              cursor: "pointer",
              color: "primary.main",
              fontSize: "0.8125rem",
              fontWeight: 500,
              "&:hover": { textDecoration: "underline" }, // subtle hover effect
            }}
          >
            {show_all ? "Show less" : "Show more"}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
