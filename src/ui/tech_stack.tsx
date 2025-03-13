import { Box, Typography } from "@mui/material";
import { TechStackType, tech_stack } from "@/lib/tech_stack";

export const TechStack = () => {
  return (
    <Box className="px-6 pt-4 pb-6 border border-gray-300 dark:border-gray-800 rounded-lg">
      <Typography variant="h6" mb={1}>
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
