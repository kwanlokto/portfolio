import { Box, Typography, Grid2 as Grid } from "@mui/material";
import { TechStackType, tech_stack } from "@/lib/tech_stack";

export const TechStack = () => {
  return (
    <Box pt={2}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Tech Stack
      </Typography>

      <Box component="section" aria-label="Tech stack">
        <Grid container spacing={1}>
          {tech_stack.map((tech: TechStackType, index: number) => (
            <Grid size={12} key={index}>
              {tech.category && (
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 0.5,
                    letterSpacing: 0.6,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    color: "text.secondary",
                    fontSize: 12,
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
                  mb: 2,
                }}
              >
                {tech.items.map((tech_item, tech_item_index) => (
                  <Box
                    key={tech_item_index}
                    role="button"
                    tabIndex={0}
                    sx={{
                      px: 1,
                      // card-like tile but very subtle
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",

                      borderRadius: 2,
                      bgcolor: "transparent", // keep surface clean

                      // subtle elevation only on hover/focus
                      transition: "transform 160ms ease, box-shadow 160ms ease",
                      transform: "translateY(0)",
                      boxShadow: "none",
                      "&:hover, &:focus-visible": {
                        transform: "translateY(-6px)",
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
                        mb: 0,
                        color: "text.primary",
                      }}
                    >
                      {tech_item.icon}
                    </Box>

                    {tech_item.name && (
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 0,
                          textAlign: "center",
                          fontWeight: 500,
                          color: "text.primary",
                          fontSize: 13,
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
