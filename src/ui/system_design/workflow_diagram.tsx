import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";

import { MdReportProblem } from "react-icons/md";
import { WorkFlowItem } from "@/lib/system_design";

interface WorkFlowDiagramInteface {
  steps: WorkFlowItem[];
}
export const WorkflowDiagram = ({ steps }: WorkFlowDiagramInteface) => {
  return (
    <Stack spacing={3}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
        Workflow
      </Typography>

      <Paper
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "background.paper",
          p: 3,
        }}
      >
        <Stack spacing={2}>
          {steps.map((item: WorkFlowItem) => (
            <Stack
              key={item.step}
              direction="row"
              spacing={2}
              alignItems="flex-start"
            >
              <Avatar
                sx={{
                  bgcolor: item.color,
                  width: 40,
                  height: 40,
                  fontWeight: 700,
                }}
              >
                {item.step}
              </Avatar>
              <Box flex={1}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </Box>
            </Stack>
          ))}

          <Paper
            sx={{
              mt: 2,
              p: 2,
              bgcolor: "warning.lighter",
              borderLeft: 4,
              borderColor: "warning.main",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <MdReportProblem />
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Cancellation Flow
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Customer can cancel at any time before pickup. After driver
              assignment, cancellation fee may apply. Driver notified
              immediately, ride marked as cancelled, driver returns to available
              pool.
            </Typography>
          </Paper>
        </Stack>
      </Paper>
    </Stack>
  );
};
