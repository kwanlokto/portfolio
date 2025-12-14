import { AlertItem, NotificationChannel } from "@/lib/system_design";
import { Grid, Paper, Stack, Typography } from "@mui/material";

import { Section } from "../section";

interface NotificationSystemProps {
  alerts: AlertItem[];
  notification_channels: NotificationChannel[];
}

export const NotificationSystem = ({
  alerts,
  notification_channels,
}: NotificationSystemProps) => {
  return (
    <>
      {/* Alerts Section */}
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
        Key Alert Scenarios
      </Typography>

      <Stack spacing={3} mb={3}>
        {alerts.map((alert) => (
          <Section
            key={alert.title}
            icon={alert.icon}
            title={alert.title}
            titleColor={`${alert.color}.main`}
            sx={{
              borderLeft: 4,
              borderColor: `${alert.color}.main` || "primary.main",
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {alert.description}
            </Typography>

            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              {alert.messages.map((msg, i) => (
                <Typography key={i} variant="body2" color="text.secondary">
                  {msg}
                </Typography>
              ))}
            </Paper>
          </Section>
        ))}
      </Stack>

      {/* Notification Channels */}
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
        Notification Channels
      </Typography>

      <Grid container spacing={3}>
        {notification_channels.map((channel, idx) => (
          <Grid key={idx} size={{ xs: 12, md: 4 }}>
            <Section
              title={channel.title}
              titleColor="info.main"
              sx={{
                borderLeft: 4,
                borderColor: "info.main",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {channel.description}
              </Typography>
            </Section>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
