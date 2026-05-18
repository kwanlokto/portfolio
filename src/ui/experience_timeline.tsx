import * as React from "react";

import {
  Box,
  Button,
  Collapse,
  Divider,
  Icon,
  List,
  ListItem,
  useTheme,
} from "@mui/material";
import { ExperienceType, Role } from "@/lib/experience";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

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
  collapsed_item_count: number;
}

export const ExperienceTimeline = ({
  experience_list,
  collapsed_item_count,
}: ExperienceParams) => {
  const theme = useTheme();

  const [expanded, set_expanded] = React.useState(false);

  return (
    <Box>
      <Timeline sx={{ width: "100%" }}>
        {experience_list.map((experience, experience_idx) => (
          <Collapse
            key={experience_idx}
            in={expanded || experience_idx < collapsed_item_count}
            timeout={400}
            easing={{
              enter: "cubic-bezier(0.4, 0, 0.2, 1)",
              exit: "cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <TimelineItem
              key={experience_idx}
              position="right"
              sx={{ display: "flex", alignItems: "flex-start" }}
            >
              {/* --- Timeline Icon / Logo --- */}
              <TimelineSeparator>
                {experience_idx !== 0 && <TimelineConnector />}
                <TimelineDot
                  sx={{
                    bgcolor: "background.default",
                    boxShadow: 0,
                    p: 0.5,
                    pt: 0.75,
                  }}
                >
                  <Icon sx={{ position: "relative", width: 30, height: 30 }}>
                    <Image
                      src={
                        theme.palette.mode === "dark" &&
                        experience.dark_mode_icon_url
                          ? experience.dark_mode_icon_url
                          : experience.icon_url
                      }
                      alt={experience.company}
                      fill
                      style={{ objectFit: "contain" }}
                      priority
                    />
                  </Icon>
                </TimelineDot>
                {experience_idx !== experience_list.length - 1 && (
                  <TimelineConnector />
                )}
              </TimelineSeparator>

              {/* --- Company Content --- */}
              <TimelineContent
                sx={{
                  pt: 2,
                  px: 2,
                  mb: 0,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Company Header */}
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ mb: 0.5 }}
                >
                  <Typography
                    component="h3"
                    sx={{
                      fontSize: "1.1875rem",
                      fontWeight: 600,
                      letterSpacing: "-0.012em",
                      color: "text.primary",
                    }}
                  >
                    {experience.company}
                  </Typography>
                </Box>

                {/* Nested Roles Timeline */}
                <Timeline
                  sx={{
                    mt: -1,
                    ml: -2,
                    pl: 0,
                    [`& .${timelineOppositeContentClasses.root}`]: { flex: 0 },
                  }}
                >
                  {experience.roles?.map((role: Role, role_idx: number) => (
                    <TimelineItem key={role_idx} position="right">
                      {/* TODO: This doesn't work as intended for some reason? */}
                      {/* {experience.roles.length > 1 && (
                      <TimelineSeparator>
                        {role_idx !== 0 && (
                          <TimelineConnector sx={{ ml: -5.5 }} />
                        )}
                        <TimelineDot
                          color={
                            role_idx === 0
                              ? "primary"
                              : role_idx === experience.roles.length - 1
                              ? "grey"
                              : "secondary"
                          }
                          sx={{ p: 0.25, ml: -3.25 }}
                        />
                        {role_idx !== experience.roles.length - 1 && (
                          <TimelineConnector sx={{ ml: -5.5 }} />
                        )}
                      </TimelineSeparator>
                    )} */}
                      <TimelineContent>
                        <Typography
                          sx={{
                            fontSize: "1rem",
                            fontWeight: 600,
                            letterSpacing: "-0.008em",
                            color: "text.primary",
                          }}
                        >
                          {role.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.8125rem",
                            color: "text.secondary",
                            mb: 1,
                            letterSpacing: "-0.003em",
                          }}
                        >
                          {role.timeline}
                        </Typography>

                        {role.achievements.length > 0 && (
                          <List sx={{ listStyleType: "disc", pl: 2 }}>
                            {role.achievements.map(
                              (achievement, achievement_idx) => (
                                <ListItem
                                  key={achievement_idx}
                                  sx={{ display: "list-item", p: 0 }}
                                >
                                  <Typography
                                    sx={{
                                      fontSize: "0.9375rem",
                                      lineHeight: 1.55,
                                      color: "text.primary",
                                      pl: 1,
                                    }}
                                  >
                                    {achievement}
                                  </Typography>
                                </ListItem>
                              ),
                            )}
                          </List>
                        )}

                        {role_idx < experience.roles.length - 1 && (
                          <Divider sx={{ mt: 1 }} />
                        )}
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </TimelineContent>
            </TimelineItem>
          </Collapse>
        ))}
      </Timeline>

      {/* Show more / less button */}
      {experience_list.length > collapsed_item_count && (
        <Box textAlign="center" mb={1}>
          <Button
            size="small"
            endIcon={
              expanded ? (
                <MdExpandLess fontSize="small" />
              ) : (
                <MdExpandMore fontSize="small" />
              )
            }
            onClick={() => set_expanded(!expanded)}
            sx={{
              textTransform: "none",
              color: "primary.main",
              fontSize: "0.8125rem",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "transparent",
                textDecoration: "underline",
              },
            }}
          >
            {expanded ? "Show less" : "Show more"}
          </Button>
        </Box>
      )}
    </Box>
  );
};
