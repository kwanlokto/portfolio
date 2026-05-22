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
      <Timeline sx={{ width: "100%", px: { xs: 0, sm: 2 }, py: { xs: 0, sm: 1 } }}>
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
              sx={{
                display: "flex",
                alignItems: "flex-start",
                minHeight: 0,
              }}
            >
              {/* --- Timeline Icon / Logo --- */}
              <TimelineSeparator>
                {experience_idx !== 0 && <TimelineConnector />}
                <TimelineDot
                  sx={{
                    bgcolor: "background.default",
                    boxShadow: 0,
                    mt: 0
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
                  px: { xs: 1.25, sm: 2 },
                  pb: 0,
                  mb: 0,
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 0,
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
                    variant="body1"
                    sx={{ color: "text.primary", fontWeight: 600, pt: 0.75 }}
                  >
                    {experience.company}
                  </Typography>
                </Box>

                {/* Nested Roles Timeline */}
                <Timeline
                  sx={{
                    mt: -1,
                    ml: { xs: -1.5, sm: -2 },
                    pl: 0,
                    pr: 0,
                    [`& .${timelineOppositeContentClasses.root}`]: { flex: 0 },
                  }}
                >
                  {experience.roles?.map((role: Role, role_idx: number) => (
                    <TimelineItem
                      key={role_idx}
                      position="right"
                      sx={{ minHeight: 0 }}
                    >
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
                      <TimelineContent sx={{ px: { xs: 1, sm: 2 }, py: 0.5 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: { xs: "1rem", sm: "1.125rem" },
                            color: "text.primary",
                          }}
                        >
                          {role.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            display: "block",
                            mb: 1,
                          }}
                        >
                          {role.timeline}
                        </Typography>

                        {role.achievements.length > 0 && (
                          <List
                            sx={{
                              listStyleType: "disc",
                              pl: { xs: 1.75, sm: 2 },
                              py: 0,
                            }}
                          >
                            {role.achievements.map(
                              (achievement, achievement_idx) => (
                                <ListItem
                                  key={achievement_idx}
                                  sx={{
                                    display: "list-item",
                                    p: 0,
                                    mb: 0.5,
                                    "&::marker": { color: "text.secondary" },
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: "text.secondary",
                                      pl: 0.5,
                                      lineHeight: 1.55,
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
                          <Divider sx={{ mt: 1.5, mb: 0.5 }} />
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
