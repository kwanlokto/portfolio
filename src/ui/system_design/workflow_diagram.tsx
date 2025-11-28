import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";

import { MdReportProblem } from "react-icons/md";
import { Section } from "../section";
import { WorkFlowItem } from "@/lib/system_design";

interface WorkFlowDiagramInteface {
  steps: WorkFlowItem[];
}
export const WorkflowDiagram = ({ steps }: WorkFlowDiagramInteface) => {
  return (
    <Paper
      sx={{
        borderRadius: 2,
        boxShadow: 3,
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

        <Section
          title="Cancellation Handling"
          titleColor="warning.main"
          icon={<MdReportProblem />}
          sx={{
            mt: 2,
            p: 2,
            border: 0,
            borderLeft: 4,
            borderColor: "warning.main",
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Customer can cancel at any time before pickup. After driver
            assignment, cancellation fee may apply. Driver notified immediately,
            ride marked as cancelled, driver returns to available pool.
          </Typography>
        </Section>
      </Stack>
    </Paper>
  );
};
