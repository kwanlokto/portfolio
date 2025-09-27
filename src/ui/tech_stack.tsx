import { Box, Typography } from "@mui/material";
import { TechStackType, tech_stack } from "@/lib/tech_stack";

export const TechStack = () => {
  return (
    <Box>
      <Typography variant="h6" mb={1} pl={3.5}>
        Tech Stack
      </Typography>

      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        sx={{
          p: 2,
          border: (theme) =>
            `1px solid ${
              theme.palette.mode === "dark"
                ? theme.palette.grey[800]
                : theme.palette.grey[300]
            }`,
          borderRadius: 2,
        }}
      >
        {tech_stack.map((tech: TechStackType, index: number) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              p: 1.34,
              borderRadius: 1,
              boxShadow: 1,
              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.grey[700]
                  : theme.palette.grey[200],
            }}
          >
            {tech.icon}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
