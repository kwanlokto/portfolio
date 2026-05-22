import { Box, Typography } from "@mui/material";
import { TechStackType, TECH_STACK } from "@/lib/tech_stack";

import { SectionHeader } from "./section_header";

export const TechStack = () => {
  return (
    <Box>
      <SectionHeader title="Tech Stack" />

      <Box
        component="section"
        aria-label="Tech stack"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {TECH_STACK.map((tech: TechStackType, index: number) => (
          <Box key={index}>
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
              {tech.items.map((tech_item, tech_item_index) => (
                <Box
                  key={tech_item_index}
                  role="button"
                  tabIndex={0}
                  sx={{
                    px: 1.25,
                    py: 1,
                    minWidth: 64,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 1.25,
                    transition: "transform 180ms ease, background-color 180ms ease",
                    "&:hover, &:focus-visible": {
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
                    {tech_item.icon}
                  </Box>

                  {tech_item.name && (
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
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
