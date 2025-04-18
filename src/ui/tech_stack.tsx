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
        className="p-4 border border-gray-300 dark:border-gray-800 rounded-lg"
        gap={2}
      >
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
