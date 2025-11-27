import { AlertItem, NotificationChannel } from "@/lib/system_design";
import {
  Divider,
  Grid2 as Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

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
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      {/* Alerts Section */}
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
        Key Alert Scenarios
      </Typography>

      <Stack spacing={2}>
        {alerts.map((alert, idx) => (
          <Section
            key={idx}
            icon={alert.icon}
            title={alert.title}
            titleColor={`${alert.color}.main`}
            cardSx={{ borderLeft: 4, borderColor: `${alert.color}.main` }}
            titleVariant="subtitle2"
          >
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
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
          </Section>
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
            <Section title={channel.title}>
              <Typography variant="body2" color="text.secondary">
                {channel.description}
              </Typography>
            </Section>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};
