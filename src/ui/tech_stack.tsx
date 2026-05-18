import { Box, Grid, Typography } from "@mui/material";
import { TechStackType, TECH_STACK } from "@/lib/tech_stack";

import { SectionHeader } from "@/ui/section_header";

export const TechStack = () => {
  return (
    <Box>
      <SectionHeader title="Tech stack" />

      <Box component="section" aria-label="Tech stack">
        <Grid container spacing={1}>
          {TECH_STACK.map((tech: TechStackType, index: number) => (
            <Grid size={12} key={index}>
              {tech.category && (
                <Typography
                  sx={{
                    mb: 1,
                    letterSpacing: "0.08em",
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
                columnGap={2}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  mb: 2.5,
                }}
              >
                {tech.items.map((tech_item, tech_item_index) => (
                  <Box
                    key={tech_item_index}
                    role="button"
                    tabIndex={0}
                    sx={{
                      px: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 2,
                      bgcolor: "transparent",
                      transition: "transform 160ms ease",
                      "&:hover, &:focus-visible": {
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
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
                          textAlign: "center",
                          fontWeight: 500,
                          color: "text.secondary",
                          fontSize: "0.75rem",
                          letterSpacing: "-0.005em",
                        }}
                      >
                        {tech_item.name}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
