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
                : theme.palette.grey[400]
            }`,
          borderRadius: 2,
        }}
      >
        {tech_stack.map((tech: TechStackType, index: number) => (
          <Box key={index} gap={2} display="flex" sx={{ width: "100%" }}>
            {tech.items.map((tech_item, tech_item_index) => (
              <Box
                key={tech_item_index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[700]
                      : theme.palette.grey[300],
                  boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                      ? "0 1px 4px rgba(0,0,0,0.4)"
                      : "0 1px 4px rgba(0,0,0,0.08)",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: (theme) =>
                      theme.palette.mode === "dark"
                        ? "0 4px 10px rgba(0,0,0,0.5)"
                        : "0 4px 12px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {tech_item.icon}
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    color: (theme) =>
                      theme.palette.mode === "dark"
                        ? theme.palette.grey[300]
                        : theme.palette.text.secondary,
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  {tech_item.name}
                </Typography>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
