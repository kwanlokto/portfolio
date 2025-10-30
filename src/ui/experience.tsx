import * as React from "react";
import { Box, Button, Icon, List, ListItem, Divider } from "@mui/material";
import Image from "next/image";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import Typography from "@mui/material/Typography";
import { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { ExperienceType, Role } from "@/lib/experience";

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
          [`& .${timelineOppositeContentClasses.root}`]: { flex: 0.2 },
        }}
      >
        {experience_list.slice(0, visible_count).map((exp, idx) => (
          <TimelineItem
            key={idx}
            position="right"
            sx={{ display: "flex", alignItems: "flex-start" }}
          >
            {/* --- Timeline Icon / Logo --- */}
            <TimelineSeparator>
              {idx !== 0 && <TimelineConnector />}
              <TimelineDot
                sx={{ bgcolor: "background.paper", boxShadow: 0, p: 0.5, pt: 0.75 }}
              >
                <Icon sx={{ position: "relative", width: 30, height: 30 }}>
                  <Image
                    src={exp.icon_url}
                    alt={exp.company}
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </Icon>
              </TimelineDot>
              {idx !== experience_list.length - 1 && <TimelineConnector />}
            </TimelineSeparator>

            {/* --- Company Content --- */}
            <TimelineContent
              sx={{
                py: 2,
                px: 2,
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
                <Typography variant="h6" sx={{ color: "text.primary" }}>
                  {exp.company}
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
                {exp.roles?.map((role: Role, role_idx: number) => (
                  <TimelineItem key={role_idx} position="right">
                    {/* {exp.roles.length > 1 && (
                      <TimelineSeparator>
                        {role_idx !== 0 && (
                          <TimelineConnector sx={{ ml: -5.5 }} />
                        )}
                        <TimelineDot
                          color={
                            role_idx === 0
                              ? "primary"
                              : role_idx === exp.roles.length - 1
                              ? "grey"
                              : "secondary"
                          }
                          sx={{ p: 0.5, ml: -3.5 }}
                        />
                        {role_idx !== exp.roles.length - 1 && (
                          <TimelineConnector sx={{ ml: -5.5 }} />
                        )}
                      </TimelineSeparator>
                    )} */}
                    <TimelineContent>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {role.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
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

                      {role_idx < exp.roles.length - 1 && (
                        <Divider sx={{ my: 1 }} />
                      )}
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      {/* Show more / less button */}
      {experience_list.length > 2 && (
        <Box textAlign="center" mb={1}>
          <Button
            size="small"
            endIcon={
              show_all ? (
                <MdExpandLess fontSize="small" />
              ) : (
                <MdExpandMore fontSize="small" />
              )
            }
            onClick={() => set_show_all(!show_all)}
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
            {show_all ? "Show less" : "Show more"}
          </Button>
        </Box>
      )}
    </Box>
  );
};
