import { AlertItem, NotificationChannel } from "@/lib/system_design";
import {
  Box,
  Divider,
  Grid2 as Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

interface NotificationSystemProps {
  alerts: AlertItem[];
  notification_channels: NotificationChannel[];
}

export const NotificationSystem = ({
  alerts,
  notification_channels,
}: NotificationSystemProps) => {
  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      {/* Alerts Section */}
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
        Key Alert Scenarios
      </Typography>

      <Stack spacing={2}>
        {alerts.map((alert, idx) => (
          <Paper
            key={idx}
            sx={{
              p: 2,
              borderLeft: 4,
              borderColor: `${alert.color}.main`,
              bgcolor: `${alert.color}.lighter`,
            }}
          >
            <Stack direction="column" spacing={2} alignItems="flex-start">
              <Stack direction="row" spacing={1} alignItems="center">
                <Box sx={{ mt: "4px", color: `${alert.color}.main` }}>
                  {alert.icon}
                </Box>

                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, color: `${alert.color}.dark` }}
                >
                  {alert.title}
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {alert.description}
              </Typography>

              <Paper variant="outlined" sx={{ mt: 1, p: 1, borderRadius: 1 }}>
                {alert.messages.map((msg, i) => (
                  <Typography
                    key={i}
                    component="code"
                    variant="caption"
                    display="block"
                  >
                    {msg}
                  </Typography>
                ))}
              </Paper>
            </Stack>
          </Paper>
        ))}
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* Notification Channels */}
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
        Notification Channels
      </Typography>

      <Grid container spacing={2}>
        {notification_channels.map((channel, idx) => (
          <Grid key={idx} size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2, borderRadius: 1 }}>
              <Stack spacing={1} alignItems="flex-start">
                <Box sx={{ fontSize: 36 }}>{channel.icon}</Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {channel.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {channel.description}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};
