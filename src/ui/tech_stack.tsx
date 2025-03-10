import { Box, Typography } from "@mui/material";
import { TechStackType, tech_stack } from "@/lib/tech_stack";

export const TechStack = () => {
  return (
    <Box className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <Typography variant="h5" mb={1}>
        Tech Stack
      </Typography>
      <Box display="flex" className="flex-wrap" gap={2}>
        {tech_stack.map((tech: TechStackType, index: number) => (
          <Box
            key={index}
            className="flex p-3 bg-white dark:bg-gray-700 rounded-md shadow"
          >
            {tech.icon}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
