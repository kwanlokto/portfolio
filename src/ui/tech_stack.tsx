import { TECH_STACK, TechStackType } from "@/lib/tech_stack";
import { Box, Typography } from "@mui/material";

import { SectionHeader } from "./section_header";

const ICON_SIZE = 22;

export const TechStack = () => {
  return (
    <Box>
      <SectionHeader title="Tech Stack" />

      <Box
        component="section"
        aria-label="Tech stack"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {TECH_STACK.map((tech: TechStackType) => (
          <Box key={tech.category}>
            {tech.category && (
              <Typography
                sx={{
                  mb: 1,
                  letterSpacing: "0.06em",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  color: "text.secondary",
                  fontSize: "0.6875rem",
                }}
              >
                {tech.category}
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1.5,
              }}
            >
              {tech.items.map((tech_item) => {
                const Icon = tech_item.icon;
                return (
                  // Not interactive: no role/tabIndex, since there is nothing
                  // to activate. Hover styling only.
                  <Box
                    key={tech_item.name}
                    sx={{
                      px: 1.25,
                      py: 1,
                      minWidth: 64,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 1.25,
                      transition:
                        "transform 180ms ease, background-color 180ms ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        bgcolor: "action.hover",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "text.primary",
                      }}
                    >
                      <Icon size={ICON_SIZE} aria-hidden />
                    </Box>

                    <Typography
                      sx={{
                        mt: 0.5,
                        textAlign: "center",
                        fontWeight: 500,
                        color: "text.secondary",
                        fontSize: "0.75rem",
                      }}
                    >
                      {tech_item.name}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
